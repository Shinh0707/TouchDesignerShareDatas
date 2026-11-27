<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Digamma/ -->

# Digamma

`Math` フォルダのパレットです。

## 説明

ディガンマ関数 ψ(x)（ln Γ の微分）の近似 ln(x − ½)。x が大きいほど正確（x = 11 で 2.3514、正しい値は 2.3518。x = 1 では −0.69、正しい値は −0.58）。

入力: in1 CHOP（x > ½）
出力: out1 同じ形

## ダウンロード

[Digamma.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Digamma.tox) [使用例 DigammaExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/DigammaExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## 使用例

### ディガンマ関数の近似

![ディガンマ関数の近似](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-Digamma-example.svg)

1〜12 の値(x)のディガンマ関数 ψ(x) の近似 ln(x − ½) です(y、x が大きいほど正確)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=200`, `torange=[1, 12]`) → `Digamma` (パレット) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[DigammaExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/DigammaExample.toe)

??? note "手順(Math/Digamma.example.py)"

    ```python
    """ディガンマ関数の近似

    1〜12 の値(x)のディガンマ関数 ψ(x) の近似 ln(x − ½) です(y、x が大きいほど正確)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="ramp", length=200, torange=(1, 12))
        in_out(ex, tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

6 個のオペレータ。sha256: `10ae6c065a0806ac…`
