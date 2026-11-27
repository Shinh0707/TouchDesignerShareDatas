<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/SimpleConvNN/ -->

# SimpleConvNN

`AutoDiff/NN` フォルダのパレットです。

## 説明

画像から target（CHOP）を当てるように、その場で学習する小さな畳み込みネット（3×3 畳み込み → 色の max → 2×2 畳み込み → L2 正規化 → アダプティブ畳み込み）。出力の形は target で決まる（target の チャンネル数 = 出力の画素数（正方形）、サンプル数 = 出力のチャンネル数）。

入力

- in1: 画像 TOP
- target: 正解の CHOP

出力

- estimated: 推定値（target と同じ形）
- loss: 平均二乗誤差
- outD1: 入力画像についての勾配（TOP）

パラメータ

- Lr / Lambda: AdamW の学習率（既定 0.01）と重み減衰
- Reset: オンの間、重みを初期化し直す

16×16 のノイズ画像と 4 × 2 の target なら、600 フレーム（10 秒）で損失がほぼ 0 になる。途中の L2 正規化で画素ごとの明るさの大きさが消えるので、明るさの大きさだけが違う画像（ランプなど）は見分けにくい。

## ダウンロード

[SimpleConvNN.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/SimpleConvNN.tox) [使用例 SimpleConvNNExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/SimpleConvNNExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 入力 1 | CHOP | `target` | Matrix |
| 出力 0 | CHOP | `estimated` | Matrix |
| 出力 1 | CHOP | `loss` | Any |
| 出力 2 | TOP | `outD1` | Data / 入力画像についての勾配 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Lr` | Learning Rate | Parameter | Float | `0.001` | 0.0 … 1.0 |
| `Lambda` | Lambda | Parameter | Float | `0.01` | 0.0 … 1.0 |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### 画像から値を当てる学習

![画像から値を当てる学習](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-NN-SimpleConvNN-example.svg)

16 × 16 のノイズ画像から、4 × 2 の値(target)を当てるように SimpleConvNN を 600 フレーム学習させ、損失(loss)の推移を Trail CHOP で記録した例です。損失がほぼ 0 まで下がっていきます。

ネットワーク: `in0` (noiseTOP: `resolutionw=16`, `resolutionh=16`, `mono=False`, `period=0.3`) → `in1` (patternCHOP: `channelname=t[0-3]`, `wavetype=random`, `length=2`, `seed=3`) → `SimpleConvNN` (パレット) → `loss` (selectCHOP: `chops=loss`) → `history` (trailCHOP: `wlength=600`, `wlengthunit=samples`) → `out1`

[SimpleConvNNExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/SimpleConvNNExample.toe)

??? note "手順(AutoDiff/NN/SimpleConvNN.example.py)"

    ```python
    """画像から値を当てる学習

    16 × 16 のノイズ画像から、4 × 2 の値(target)を当てるように SimpleConvNN を 600 フレーム学習させ、損失(loss)の推移を Trail CHOP で記録した例です。損失がほぼ 0 まで下がっていきます。
    """

    FRAMES = 600

    def build(ex, tox):
        img = ex.input("noiseTOP", resolutionw=16, resolutionh=16, mono=False, period=0.3)
        target = ex.input("patternCHOP", channelname="t[0-3]", wavetype="random", length=2, seed=3)
        nn = ex.palette(tox, img, target)
        loss = ex.op("selectCHOP", name="loss", chops=nn.op("loss"))
        ex.out(ex.op("trailCHOP", name="history", input=loss, wlength=600, wlengthunit="samples"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Col2im` | [Col2Im (Col2ImCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) |
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |
| `CHOP:Im2col` | [Im2Col (Im2ColCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) |

597 個のオペレータ。sha256: `d112acbc9d5b2698…`
