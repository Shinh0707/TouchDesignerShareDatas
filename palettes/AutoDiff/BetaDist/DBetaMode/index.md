<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/BetaDist/DBetaMode/ -->

# DBetaMode

`AutoDiff/BetaDist` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。ベータ分布 Beta(a, b) の最頻値 y = (a − 1)/(a + b − 2)。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1・in2 についての勾配を outD1・outD2 に出す（逆伝播）。 a, b > 1 で意味がある。

入力

- in1: in1 a（> 1）
- in2: in2 b（> 1）

出力

- out1: f(a, b)
- outD1: dL/da = (b − 1)/(a + b − 2)² · dL/dy
- outD2: dL/db = −(a − 1)/(a + b − 2)² · dL/dy

パラメータ

- D1: out1 についての勾配の CHOP

## ダウンロード

[DBetaMode.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/BetaDist/DBetaMode.tox) [使用例 DBetaModeExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/BetaDist/DBetaModeExample.toe)

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

### ベータ分布の最頻値

![ベータ分布の最頻値](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-BetaDist-DBetaMode-example.svg)

a を 1.5〜6、b を 3 にしたときのベータ分布の最頻値 (a − 1)/(a + b − 2)(y)と、D1 に 1 を入れたときの a・b への勾配を並べた例です。

ネットワーク: `in0` (patternCHOP: `channelname=v`, `wavetype=ramp`, `length=200`, `torange=[1.5, 6]`) → `in1` (patternCHOP: `channelname=v`, `wavetype=const`, `length=200`, `amp=3`) → `DBetaMode` (パレット) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad_a` (selectCHOP: `chops=outD1`) → `grad_a_named` (renameCHOP: `renamefrom=*`, `renameto=grad_a`) → `grad_b` (selectCHOP: `chops=outD2`) → `grad_b_named` (renameCHOP: `renamefrom=*`, `renameto=grad_b`) → `y_and_grad` (mergeCHOP) → `out1`

[DBetaModeExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/BetaDist/DBetaModeExample.toe)

??? note "手順(AutoDiff/BetaDist/DBetaMode.example.py)"

    ```python
    """ベータ分布の最頻値

    a を 1.5〜6、b を 3 にしたときのベータ分布の最頻値 (a − 1)/(a + b − 2)(y)と、D1 に 1 を入れたときの a・b への勾配を並べた例です。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import forward_and_gradient  # noqa: E402

    def build(ex, tox):
        a = ex.input("patternCHOP", channelname="v", wavetype="ramp", length=200, torange=(1.5, 6))
        b = ex.input("patternCHOP", channelname="v", wavetype="const", length=200, amp=3)
        forward_and_gradient(ex, tox, a, b)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

58 個のオペレータ。sha256: `cb22f9a06a527451…`
