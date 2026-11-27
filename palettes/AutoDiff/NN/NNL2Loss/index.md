<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNL2Loss/ -->

# NNL2Loss

`AutoDiff/NN` フォルダのパレットです。

## 説明

平均二乗誤差（L2 損失）L = mean((estimated − target)²) と、estimated についての勾配 dL/d(estimated) = 2(estimated − target)/N を出す。学習の最後に置き、outD1 を前の層の D1 に指す。

入力

- target: 正解（1 番目の入力）
- estimated: 推定値（2 番目の入力。target と同じ形）

出力

- out1: 損失（1 チャンネル 1 サンプル）
- outD1: estimated についての勾配

## ダウンロード

[NNL2Loss.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNL2Loss.tox) [使用例 NNL2LossExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNL2LossExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `target` | Any |
| 入力 1 | CHOP | `estimated` | Any |
| 出力 0 | CHOP | `out1` | Any / 損失 |
| 出力 1 | CHOP | `outD1` | Any / estimated についての勾配 |

## 使用例

### 2 乗誤差とその勾配

![2 乗誤差とその勾配](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-NN-NNL2Loss-example.svg)

正解(正弦波)と推定(少しずらした正弦波)の 2 乗誤差を出した例です。out1 が損失(1 つの値)、outD1 が推定についての勾配で、学習ではこれを前の層の D1 に指します。この図は勾配です。

ネットワーク: `in0` (patternCHOP: `channelname=v`, `wavetype=sin`, `length=64`) → `in1` (patternCHOP: `channelname=v`, `wavetype=sin`, `length=64`, `phase=0.1`, `amp=0.8`) → `NNL2Loss` (パレット) → `grad` (selectCHOP: `chops=outD1`) → `grad_named` (renameCHOP: `renamefrom=*`, `renameto=grad`) → `out1`

[NNL2LossExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNL2LossExample.toe)

??? note "手順(AutoDiff/NN/NNL2Loss.example.py)"

    ```python
    """2 乗誤差とその勾配

    正解(正弦波)と推定(少しずらした正弦波)の 2 乗誤差を出した例です。out1 が損失(1 つの値)、outD1 が推定についての勾配で、学習ではこれを前の層の D1 に指します。この図は勾配です。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import output  # noqa: E402

    def build(ex, tox):
        target = ex.input("patternCHOP", channelname="v", wavetype="sin", length=64)
        estimated = ex.input("patternCHOP", channelname="v", wavetype="sin", length=64, phase=0.1, amp=0.8)
        comp = ex.palette(tox, target, estimated)
        ex.out(output(ex, comp, "outD1", "grad"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

57 個のオペレータ。sha256: `b8eb53396bc21942…`
