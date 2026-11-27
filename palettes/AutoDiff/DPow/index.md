<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DPow/ -->

# DPow

`AutoDiff` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。べき乗 y = aᵇ。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1・in2 についての勾配を outD1・outD2 に出す（逆伝播）。 a は正の値にする。

入力

- in1: in1 CHOP
- in2: in2 CHOP（in1 と同じ形）

出力

- out1: f(a, b)
- outD1: dL/da = b · aᵇ⁻¹ · dL/dy
- outD2: dL/db = aᵇ · ln a · dL/dy

パラメータ

- D1: out1 についての勾配の CHOP

## ダウンロード

[DPow.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DPow.tox) [使用例 DPowExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DPowExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 入力 1 | CHOP | `in2` | Any |
| 出力 0 | CHOP | `out1` | Any |
| 出力 1 | CHOP | `outD1` | Any / in1 についての勾配 |
| 出力 2 | CHOP | `outD2` | Any / in2 についての勾配 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `D1` | D1 | D | CHOP | `outD1` |  |

## 使用例

### べき乗とその勾配

![べき乗とその勾配](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-DPow-example.svg)

a(0.1〜2)の b(=2)乗(y)と、D1 に 1 を入れたときの勾配(grad_a = b·a^(b−1)、grad_b = aᵇ ln a)を並べた例です。

ネットワーク: `in0` (patternCHOP: `channelname=v`, `wavetype=ramp`, `length=200`, `torange=[0.1, 2]`) → `in1` (patternCHOP: `channelname=v`, `wavetype=const`, `length=200`, `amp=2`) → `DPow` (パレット) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad_a` (selectCHOP: `chops=outD1`) → `grad_a_named` (renameCHOP: `renamefrom=*`, `renameto=grad_a`) → `grad_b` (selectCHOP: `chops=outD2`) → `grad_b_named` (renameCHOP: `renamefrom=*`, `renameto=grad_b`) → `y_and_grad` (mergeCHOP) → `out1`

[DPowExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DPowExample.toe)

??? note "手順(AutoDiff/DPow.example.py)"

    ```python
    """べき乗とその勾配

    a(0.1〜2)の b(=2)乗(y)と、D1 に 1 を入れたときの勾配(grad_a = b·a^(b−1)、grad_b = aᵇ ln a)を並べた例です。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import forward_and_gradient  # noqa: E402

    def build(ex, tox):
        a = ex.input("patternCHOP", channelname="v", wavetype="ramp", length=200, torange=(0.1, 2))
        b = ex.input("patternCHOP", channelname="v", wavetype="const", length=200, amp=2)
        forward_and_gradient(ex, tox, a, b)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

15 個のオペレータ。sha256: `6f7ee6ffafe1f8fa…`
