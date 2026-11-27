<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/SimpleNN/ -->

# SimpleNN

`AutoDiff/NN` フォルダのパレットです。

## 説明

その場で学習する小さな 2 層のニューラルネット（全結合 → L2 正規化 → Leaky ReLU → 全結合）。in1 から target を当てるように、毎フレーム AdamW で学習する。

入力

- in1: 入力（C チャンネル × 入力サイズのサンプル。各チャンネルが 1 つのデータ）
- target: 正解（C チャンネル × 出力サイズのサンプル）

出力

- estimated: 推定値（target と同じ形）
- loss: 平均二乗誤差
- outD1: in1 についての勾配（さらに前の層へ逆伝播するとき）
- outvis1, outvis2: 1 層目・2 層目の重み。outvis3: 1 層目の出力

パラメータ

- L1size: 中間層の大きさ（既定 16）
- Lr / Lambda: AdamW の学習率と重み減衰
- Reset: オンの間、重みを初期化し直す
- Freeze: オンの間、学習を止める（推定だけする）

## ダウンロード

[SimpleNN.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/SimpleNN.tox) [使用例 SimpleNNExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/SimpleNNExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Matrix |
| 入力 1 | CHOP | `target` | Matrix |
| 出力 0 | CHOP | `estimated` | Matrix |
| 出力 1 | CHOP | `loss` | Any |
| 出力 2 | CHOP | `outD1` | Matrix / in1 についての勾配 |
| 出力 3 | CHOP | `outvis1` | Matrix / 1 層目の重み |
| 出力 4 | CHOP | `outvis3` | Matrix / 1 層目の出力 |
| 出力 5 | CHOP | `outvis2` | Matrix / 2 層目の重み |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `L1size` | L1size | Parameter | Int | `3` | 1.0 … 30.0 |
| `Lr` | Learning Rate | Parameter | Float | `0.001` | 0.0 … 1.0 |
| `Lambda` | Lambda | Parameter | Float | `0.01` | 0.0 … 1.0 |
| `Reset` | Reset | Action | Toggle | `False` |  |
| `Freeze` | Freeze | Action | Toggle | `False` |  |

## 使用例

### 円の上の点から波を当てる

![円の上の点から波を当てる](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-NN-SimpleNN-example.svg)

円の上の 32 個の点 (cos θ, sin θ)(各チャンネルが 1 つのデータ、2 サンプル)から y = sin 3θ を当てるように、SimpleNN(中間層 16)を 1200 フレーム学習させた例です。図は正解(target)と推定(estimated)を θ の順に並べたものです。Freeze で学習を止めて推定だけにできます。

ネットワーク: `cos` (patternCHOP: `channelname=c`, `wavetype=cos`, `length=32`) → `sin` (patternCHOP: `channelname=s`, `wavetype=sin`, `length=32`) → `ys` (patternCHOP: `channelname=y`, `wavetype=sin`, `length=32`, `numcycles=3`) → `points` (mergeCHOP) → `in0` (shuffleCHOP: `method=swap`) → `in1` (shuffleCHOP: `method=swap`) → `SimpleNN` (パレット: `L1size=16`, `Lr=0.03`) → `target_curve` (shuffleCHOP: `method=swap`) → `target` (renameCHOP: `renamefrom=*`, `renameto=target`) → `estimated_curve` (shuffleCHOP: `method=swap`) → `estimated` (renameCHOP: `renamefrom=*`, `renameto=estimated`) → `curves` (mergeCHOP) → `out1`

[SimpleNNExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/SimpleNNExample.toe)

??? note "手順(AutoDiff/NN/SimpleNN.example.py)"

    ```python
    """円の上の点から波を当てる

    円の上の 32 個の点 (cos θ, sin θ)(各チャンネルが 1 つのデータ、2 サンプル)から y = sin 3θ を当てるように、SimpleNN(中間層 16)を 1200 フレーム学習させた例です。図は正解(target)と推定(estimated)を θ の順に並べたものです。Freeze で学習を止めて推定だけにできます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import curves  # noqa: E402

    FRAMES = 1200

    def build(ex, tox):
        c = ex.op("patternCHOP", name="cos", channelname="c", wavetype="cos", length=32)
        s = ex.op("patternCHOP", name="sin", channelname="s", wavetype="sin", length=32)
        ys = ex.op("patternCHOP", name="ys", channelname="y", wavetype="sin", length=32, numcycles=3)
        x = ex.input("shuffleCHOP", input=ex.op("mergeCHOP", name="points", input=[c, s]), method="swap")
        target = ex.input("shuffleCHOP", input=ys, method="swap")
        nn = ex.palette(tox, x, target, L1size=16, Lr=0.03)
        curves(ex, [("target", target), ("estimated", nn)])
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

389 個のオペレータ。sha256: `cd9085edd53223e5…`
