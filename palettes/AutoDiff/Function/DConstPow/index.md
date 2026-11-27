<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DConstPow/ -->

# DConstPow

`AutoDiff/Function` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。定数乗 y = x^Exponent。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1 についての勾配 dL/dx を outD1 に出す（逆伝播）。

負の入力も扱う: 整数の指数なら普通のべき乗（(−2)² = 4、(−2)³ = −8）。小数の指数で x < 0 のときは sign(x)·|x|^Exponent（奇関数として延長）を返す。

入力: in1 CHOP（何チャンネル × 何サンプルでもよい）
出力

- out1: f(x)（in1 と同じ形）
- outD1: dL/dx = Exponent · x^(Exponent−1) · dL/dy

パラメータ

- D1: out1 についての勾配の CHOP（逆伝播を使わないなら空でよい）
- Exponent: 指数（既定 2）

## ダウンロード

[DConstPow.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DConstPow.tox) [使用例 DConstPowExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DConstPowExample.toe)

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
| `Exponent` | Exponent | Parameter | Float | `2` | -4.0 … 4.0 |
| `D1` | D1 | D | CHOP | `outD1` |  |

## 使用例

### 定数乗とその勾配

![定数乗とその勾配](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Function-DConstPow-example.svg)

−2〜2 の値の 3 乗(Exponent=3、y)と、D1 に 1 を入れて逆伝播した勾配(grad = 3x²)を並べた例です。負の値でも普通のべき乗になります((−2)³ = −8、勾配 12)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=200`, `torange=[-2, 2]`) → `DConstPow` (パレット: `Exponent=3`) → `out1_raw` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `grad` (selectCHOP: `chops=outD1`) → `grad_named` (renameCHOP: `renamefrom=*`, `renameto=grad`) → `y_and_grad` (mergeCHOP) → `out1`

[DConstPowExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DConstPowExample.toe)

??? note "手順(AutoDiff/Function/DConstPow.example.py)"

    ```python
    """定数乗とその勾配

    −2〜2 の値の 3 乗(Exponent=3、y)と、D1 に 1 を入れて逆伝播した勾配(grad = 3x²)を並べた例です。負の値でも普通のべき乗になります((−2)³ = −8、勾配 12)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import forward_and_gradient  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="ramp", length=200, torange=(-2, 2))
        forward_and_gradient(ex, tox, x, Exponent=3)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

15 個のオペレータ。sha256: `189baa9e3367a8a2…`
