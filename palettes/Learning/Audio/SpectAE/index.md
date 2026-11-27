<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Audio/SpectAE/ -->

# SpectAE

`Learning/Audio` フォルダのパレットです。

## 説明

スペクトルを bin ごとに移動平均・分散で正規化してから 1 本のベクトルに並べ、MLP のオートエンコーダで自分自身を再構成するよう、毎フレーム学習します。入力への勾配 |dL/dx| を総和 1 にしたものが「どの bin が効いているか」(寄与率)です。

- 入力: in1 = スペクトル(チャンネル × bin)。何もつながっていない間は、内蔵の 64 bin のテストパターンを使います
- `norm`: log1p のあと、bin・チャンネルごとの EMA 平均と分散で z-score にします(Alpha)
- `flat` (1 × チャンネル数·bin 数) → enc1 (→32) → LeakyReLU → enc2 (→8) = 埋め込み → dec1 (→32) → LeakyReLU → dec2 (→元の長さ)
- 損失: 正規化した入力と再構成の二乗誤差。重みは各層 He 正規分布で初期化し、AdamW で更新します
- 出力: out1 = 寄与率(入力と同じ形、総和 1)、out2 = 埋め込み(8 個)、out3 = 損失

## パラメータ(Learn ページ)

- Lr: 学習率(既定 0.001)/ Lambda: 重み減衰(既定 0.01)
- Alpha: 入力の正規化の追従の速さ(0〜1)
- Reset: オンの間、重みを初期値に戻したままにします(オン→オフで学習し直し)

## 入力の大きさと速さ(ベストプラクティス)
Audio Spectrum CHOP の出力(22050 bin)はそのままでは大きすぎます。Resample CHOP で小さくしてから入れてください:
Method = New Interval、Sample Rate = 60、Start = 0 / End = N−1(単位 Samples)、Time Slice = オフ(オンのままだと 1 サンプルになります)。低い周波数を細かく見たいときは、先に LogRemap で対数周波数にします。

重さは「チャンネル数 × サンプル数」(= 入力ベクトルの長さ)にほぼ比例します(enc1 の重みの勾配が主)。Mac の背景 TD で測った 1 フレームあたりの処理時間:

| チャンネル × サンプル | 処理時間 | fps |
|---|---|---|
| 1 × 64 | 1.7 ms | 60 |
| 1 × 256 | 2.3 ms | 60 |
| 1 × 1024 | 6.2 ms | 60 |
| 2 × 512 | 6.3 ms | 60 |
| 2 × 1024 | 15 ms | 43 |
| 4 × 1024 | 44 ms | 19 |

学習のしやすさは、速さよりも早く限界が来ます。2 つの音を 0.5 秒ごとに切り替えた入力で 25 秒学習したときの損失(何も学習しないときの目安は約 0.19):
1 × 64 で 0.025(よく学習)、1 × 256 で 0.08(まだ下がっている途中)、2 × 1024 では 0.6 で不安定です(Lr を下げても 25 秒では学習が進みません)。

- 推奨: チャンネル × サンプル ≤ 128(例: 1 × 64、2 × 64)。256 までは使えますが学習が遅くなります
- 大きな入力でどの bin が効くかを見たいときは、SpectUNet の方が向いています

## ダウンロード

[SpectAE.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Audio/SpectAE.tox) [使用例 SpectAEExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Audio/SpectAEExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Spectrum / スペクトル(チャンネル × bin)。Resample CHOP で 64 サンプル程度にしてから |
| 出力 0 | CHOP | `out1` | Spectrum / 寄与率(入力と同じ形、総和 1) |
| 出力 1 | CHOP | `out2` | Feature / 埋め込み(8 個) |
| 出力 2 | CHOP | `out3` | Any / 再構成の損失 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Lr` | Learning Rate | Learn | Float | `0.001` | 0.0 … 0.01 |
| `Lambda` | Weight Decay | Learn | Float | `0.01` | 0.0 … 0.1 |
| `Alpha` | Norm EMA Alpha | Learn | Float | `0.05` | 0.0 … 1.0 |
| `Reset` | Reset | Learn | Toggle | `False` |  |

## 使用例

### 2 つの音を学習して、効いている bin を見る

![2 つの音を学習して、効いている bin を見る](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Audio-SpectAE-example.svg)

ノコギリ波を 220 Hz と 330 Hz で 0.5 秒ごとに切り替え、Audio Spectrum CHOP のスペクトルを Resample CHOP(New Interval、Sample Rate 60、0〜63 サンプル、Time Slice オフ)で 64 サンプルにして入れ、10 秒学習した寄与率(1 × 64、総和 1)です。入力が小さい(チャンネル × サンプル ≤ 128)ほど、早く安定して学習します。

ネットワーク: `in0` (audiooscillatorCHOP: `wavetype=ramp`, `amp=0.5`, `frequency={'expr': '220 if int(absTime.seconds*2) % 2 else 330'}`) → `spectrum` (audiospectrumCHOP) → `resample64` (resampleCHOP: `method=newint`, `rate=60`, `relative=abs`, `start=0`, `startunit=samples`, `end=63`, `endunit=samples`, `timeslice=False`) → `SpectAE` (パレット) → `out1`

[SpectAEExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Audio/SpectAEExample.toe)

??? note "手順(Learning/Audio/SpectAE.example.py)"

    ```python
    """2 つの音を学習して、効いている bin を見る

    ノコギリ波を 220 Hz と 330 Hz で 0.5 秒ごとに切り替え、Audio Spectrum CHOP のスペクトルを Resample CHOP(New Interval、Sample Rate 60、0〜63 サンプル、Time Slice オフ)で 64 サンプルにして入れ、10 秒学習した寄与率(1 × 64、総和 1)です。入力が小さい(チャンネル × サンプル ≤ 128)ほど、早く安定して学習します。
    """

    FRAMES = 600

    def spectrum_64(ex):
        osc = ex.input("audiooscillatorCHOP", wavetype="ramp", amp=0.5,
                       frequency={"expr": "220 if int(absTime.seconds*2) % 2 else 330"})
        spect = ex.op("audiospectrumCHOP", name="spectrum", input=osc)
        return ex.op("resampleCHOP", name="resample64", input=spect, method="newint", rate=60, relative="abs",
                     start=0, startunit="samples", end=63, endunit="samples", timeslice=False)

    def build(ex, tox):
        ex.palette(tox, spectrum_64(ex))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

539 個のオペレータ。sha256: `4b9d9a1b2827d848…`
