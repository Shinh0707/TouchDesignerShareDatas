<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DAdd/ -->

# DAdd

`AutoDiff` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。足し算 y = a + b。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1・in2 についての勾配を outD1・outD2 に出す（逆伝播）。

入力

- in1: in1 CHOP
- in2: in2 CHOP（in1 と同じ形）

出力

- out1: f(a, b)
- outD1: dL/da = dL/dy
- outD2: dL/db = dL/dy

パラメータ

- D1: out1 についての勾配の CHOP

## ダウンロード

[DAdd.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DAdd.tox) [使用例 DAddExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DAddExample.toe)

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
| `D1` | D1 | D | CHOP | `inD1` |  |

## 使用例

### 足し算とその勾配

![足し算とその勾配](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-DAdd-example.svg)

a(−2〜2)と b(正弦波)の和(y)と、D1 に 1 を入れたときの a・b への勾配(grad_a・grad_b、どちらも 1)を並べた例です。

ネットワーク: `in0` (patternCHOP: `channelname=v`, `wavetype=ramp`, `length=200`, `torange=[-2, 2]`) → `in1` (patternCHOP: `channelname=v`, `wavetype=sin`, `length=200`, `numcycles=1`, `amp=1`) → `DAdd` (パレット) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad_a` (selectCHOP: `chops=outD1`) → `grad_a_named` (renameCHOP: `renamefrom=*`, `renameto=grad_a`) → `grad_b` (selectCHOP: `chops=outD2`) → `grad_b_named` (renameCHOP: `renamefrom=*`, `renameto=grad_b`) → `y_and_grad` (mergeCHOP) → `out1`

[DAddExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DAddExample.toe)

??? note "手順(AutoDiff/DAdd.example.py)"

    ```python
    """足し算とその勾配

    a(−2〜2)と b(正弦波)の和(y)と、D1 に 1 を入れたときの a・b への勾配(grad_a・grad_b、どちらも 1)を並べた例です。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import forward_and_gradient  # noqa: E402

    def build(ex, tox):
        a = ex.input("patternCHOP", channelname="v", wavetype="ramp", length=200, torange=(-2, 2))
        b = ex.input("patternCHOP", channelname="v", wavetype="sin", length=200, numcycles=1, amp=1)
        forward_and_gradient(ex, tox, a, b)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

9 個のオペレータ。sha256: `4adabbf8d0eeb812…`
