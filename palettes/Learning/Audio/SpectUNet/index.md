<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Audio/SpectUNet/ -->

# SpectUNet

`Learning/Audio` フォルダのパレットです。

## 説明

スペクトルを bin ごとに移動平均・分散で正規化し、1 次元の UNet(畳み込み)で自分自身を再構成するよう、毎フレーム学習します。入力への勾配 |dL/dx| を総和 1 にしたものが「どの bin が効いているか」(寄与率)です。

- 入力: in1 = スペクトル(チャンネル × bin)。何もつながっていない間は、内蔵の 64 bin のテストパターンを使います
- `norm`: log1p のあと、bin・チャンネルごとの EMA 平均と分散で z-score にします(Alpha)
- `toIm`: 画像の形(画素 = bin、特徴 = チャンネル)にします
- UNet: enc1(幅 3、8 ch) → down(幅 2、間隔 2、16 ch) → mid(幅 3、16 ch)= `encoded` → up(2 倍) → upconv(幅 3、8 ch)+ skip → outconv(1 × 1)
- 逆伝播: 各畳み込みの勾配を `*_bw`(DIm2Col / Col2im)で画素に戻します。up の逆は `upBack`
- 重みは各層 He 正規分布(層ごとに別シード)で初期化し、AdamW で更新します
- 出力: out1 = 寄与率(入力と同じ形)、out2 = encoded、out3 = 損失

## パラメータ(Learn ページ)

- Lr: 学習率(既定 0.001)/ Lambda: 重み減衰(既定 0.01)
- Alpha: 入力の正規化の追従の速さ(0〜1)
- Reset: オンの間、重みを初期値に戻したままにします(オン→オフで学習し直し)

## 入力の大きさと速さ(ベストプラクティス)
Audio Spectrum CHOP の出力(22050 bin)はそのままでは大きすぎます。Resample CHOP で小さくしてから入れてください:
Method = New Interval、Sample Rate = 60、Start = 0 / End = N−1(単位 Samples)、Time Slice = オフ(オンのままだと 1 サンプルになります)。低い周波数を細かく見たいときは、先に LogRemap で対数周波数にします。

重さはサンプル数(bin 数)にほぼ比例し、チャンネル数にはほとんどよりません(畳み込みの重みは bin の間で共有)。Mac の背景 TD で測った 1 フレームあたりの処理時間:

| チャンネル × サンプル | 処理時間 | fps |
|---|---|---|
| 1 × 64 | 4.3 ms | 60 |
| 1 × 256 | 8.6 ms | 59 |
| 4 × 256 | 9.3 ms | 57 |
| 1 × 512 | 19 ms | 36 |
| 1 × 1024 | 54 ms | 16 |

学習はどの大きさでも安定しています。2 つの音を 0.5 秒ごとに切り替えた入力で 25 秒学習したときの損失は、1 × 64 で 0.005、1 × 256 で 0.002(何も学習しないときの目安は約 0.2)です。

- 推奨: サンプル数 ≤ 256(チャンネルは 4 くらいまで増やしても速さはほぼ同じ)
- 512 以上は 60 fps を割ります

## ダウンロード

[SpectUNet.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Audio/SpectUNet.tox) [使用例 SpectUNetExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Audio/SpectUNetExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Spectrum / スペクトル(チャンネル × bin)。Resample CHOP で 256 サンプル以下にしてから |
| 出力 0 | CHOP | `out1` | Spectrum / 寄与率(入力と同じ形、総和 1) |
| 出力 1 | CHOP | `out2` | Feature / UNet の中間表現(encoded) |
| 出力 2 | CHOP | `out3` | Any / 再構成の損失 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Lr` | Learning Rate | Learn | Float | `0.001` | 0.0 … 0.01 |
| `Lambda` | Weight Decay | Learn | Float | `0.01` | 0.0 … 0.1 |
| `Alpha` | Norm EMA Alpha | Learn | Float | `0.05` | 0.0 … 1.0 |
| `Reset` | Reset | Learn | Toggle | `False` |  |

## 使用例

### 2 つの音を学習して、効いている bin を見る(256 bin)

![2 つの音を学習して、効いている bin を見る(256 bin)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Audio-SpectUNet-example.svg)

ノコギリ波を 220 Hz と 330 Hz で 0.5 秒ごとに切り替え、Audio Spectrum CHOP のスペクトルを Resample CHOP(New Interval、Sample Rate 60、0〜255 サンプル、Time Slice オフ)で 256 サンプルにして入れ、10 秒学習した寄与率(1 × 256、総和 1)です。畳み込みなので 256 サンプルでも 60 fps で学習できます。

ネットワーク: `in0` (audiooscillatorCHOP: `wavetype=ramp`, `amp=0.5`, `frequency={'expr': '220 if int(absTime.seconds*2) % 2 else 330'}`) → `spectrum` (audiospectrumCHOP) → `resample256` (resampleCHOP: `method=newint`, `rate=60`, `relative=abs`, `start=0`, `startunit=samples`, `end=255`, `endunit=samples`, `timeslice=False`) → `SpectUNet` (パレット) → `out1`

[SpectUNetExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Audio/SpectUNetExample.toe)

??? note "手順(Learning/Audio/SpectUNet.example.py)"

    ```python
    """2 つの音を学習して、効いている bin を見る(256 bin)

    ノコギリ波を 220 Hz と 330 Hz で 0.5 秒ごとに切り替え、Audio Spectrum CHOP のスペクトルを Resample CHOP(New Interval、Sample Rate 60、0〜255 サンプル、Time Slice オフ)で 256 サンプルにして入れ、10 秒学習した寄与率(1 × 256、総和 1)です。畳み込みなので 256 サンプルでも 60 fps で学習できます。
    """

    FRAMES = 600

    def build(ex, tox):
        osc = ex.input("audiooscillatorCHOP", wavetype="ramp", amp=0.5,
                       frequency={"expr": "220 if int(absTime.seconds*2) % 2 else 330"})
        spect = ex.op("audiospectrumCHOP", name="spectrum", input=osc)
        small = ex.op("resampleCHOP", name="resample256", input=spect, method="newint", rate=60, relative="abs",
                      start=0, startunit="samples", end=255, endunit="samples", timeslice=False)
        ex.palette(tox, small)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Col2im` | [Col2Im (Col2ImCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) |
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |
| `CHOP:Im2col` | [Im2Col (Im2ColCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) |

645 個のオペレータ。sha256: `879a4f1c62c9e0d3…`
