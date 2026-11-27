<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/BetaDist/DBetaModeLL/ -->

# DBetaModeLL

`AutoDiff/BetaDist` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。ベータ分布 Beta(a, b) の最頻値での確率密度の対数（ピークの高さ = 分布の鋭さ）。ln B(a, b) はスターリングの近似。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1・in2 についての勾配を outD1・outD2 に出す（逆伝播）。 a, b は 0.001〜10 に抑える。

入力

- in1: in1 a
- in2: in2 b

出力

- out1: f(a, b)
- outD1: dL/da = ∂y/∂a · dL/dy
- outD2: dL/db = ∂y/∂b · dL/dy

パラメータ

- D1: out1 についての勾配の CHOP

## ダウンロード

[DBetaModeLL.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/BetaDist/DBetaModeLL.tox) [使用例 DBetaModeLLExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/BetaDist/DBetaModeLLExample.toe)

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

### 最頻値での確率密度の対数

![最頻値での確率密度の対数](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-BetaDist-DBetaModeLL-example.svg)

a を 1.5〜6、b を 3 にしたときの、最頻値での確率密度の対数(ピークの高さ、y)と、D1 に 1 を入れたときの a・b への勾配を並べた例です。

ネットワーク: `in0` (patternCHOP: `channelname=v`, `wavetype=ramp`, `length=200`, `torange=[1.5, 6]`) → `in1` (patternCHOP: `channelname=v`, `wavetype=const`, `length=200`, `amp=3`) → `DBetaModeLL` (パレット) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad_a` (selectCHOP: `chops=outD1`) → `grad_a_named` (renameCHOP: `renamefrom=*`, `renameto=grad_a`) → `grad_b` (selectCHOP: `chops=outD2`) → `grad_b_named` (renameCHOP: `renamefrom=*`, `renameto=grad_b`) → `y_and_grad` (mergeCHOP) → `out1`

[DBetaModeLLExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/BetaDist/DBetaModeLLExample.toe)

??? note "手順(AutoDiff/BetaDist/DBetaModeLL.example.py)"

    ```python
    """最頻値での確率密度の対数

    a を 1.5〜6、b を 3 にしたときの、最頻値での確率密度の対数(ピークの高さ、y)と、D1 に 1 を入れたときの a・b への勾配を並べた例です。
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

33 個のオペレータ。sha256: `347c1b0ca57dd494…`
