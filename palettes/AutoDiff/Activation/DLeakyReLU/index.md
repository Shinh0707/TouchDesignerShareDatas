<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Activation/DLeakyReLU/ -->

# DLeakyReLU

`AutoDiff/Activation` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。Leaky ReLU y = x（x > 0）/ Slope · x（x ≤ 0）。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1 についての勾配 dL/dx を outD1 に出す（逆伝播）。

入力: in1 CHOP（何チャンネル × 何サンプルでもよい）
出力

- out1: f(x)（in1 と同じ形）
- outD1: dL/dx = 1 または Slope · dL/dy

パラメータ

- D1: out1 についての勾配の CHOP（逆伝播を使わないなら空でよい）
- Slope: 負の側の傾き（既定 0 = ReLU）

## ダウンロード

[DLeakyReLU.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DLeakyReLU.tox) [使用例 DLeakyReLUExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DLeakyReLUExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |
| 出力 1 | CHOP | `outD1` | Any / in1 についての勾配 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `D1` | D1 | D | CHOP | `outD1` |  |
| `Slope` | Slope | Parameter | Float | `0` | 0.0 … 1.0 |

## 使用例

### Leaky ReLU とその勾配

![Leaky ReLU とその勾配](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Activation-DLeakyReLU-example.svg)

−2〜2 の値を Slope=0.1 の Leaky ReLU に通し(y)、D1 に 1 を入れて逆伝播した勾配(grad)を並べた例です。勾配は正の側で 1、負の側で 0.1 になります。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=200`, `torange=[-2, 2]`) → `DLeakyReLU` (パレット: `Slope=0.1`) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad` (selectCHOP: `chops=outD1`) → `grad_named` (renameCHOP: `renamefrom=*`, `renameto=grad`) → `y_and_grad` (mergeCHOP) → `out1`

[DLeakyReLUExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DLeakyReLUExample.toe)

??? note "手順(AutoDiff/Activation/DLeakyReLU.example.py)"

    ```python
    """Leaky ReLU とその勾配

    −2〜2 の値を Slope=0.1 の Leaky ReLU に通し(y)、D1 に 1 を入れて逆伝播した勾配(grad)を並べた例です。勾配は正の側で 1、負の側で 0.1 になります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import forward_and_gradient  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="ramp", length=200, torange=(-2, 2))
        forward_and_gradient(ex, tox, x, Slope=0.1)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

12 個のオペレータ。sha256: `20d65e4b8e5d1527…`
