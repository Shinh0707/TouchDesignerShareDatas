<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/LGamma/ -->

# LGamma

`Math` フォルダのパレットです。

## 説明

ガンマ関数の対数 ln Γ(x) の近似（スターリングの公式 (x − ½)·ln x − x + ½·ln 2π + 1/(12x)）。x が大きいほど正確（x ≥ 1 で誤差 0.01 程度、x ≥ 5 で 0.0001 程度）。

入力: in1 CHOP（x > 0）
出力: out1 同じ形

## ダウンロード

[LGamma.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/LGamma.tox) [使用例 LGammaExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/LGammaExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## 使用例

### ガンマ関数の対数

![ガンマ関数の対数](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-LGamma-example.svg)

0.5〜8 の値(x)の ln Γ(x) です(y、スターリングの近似なので x が大きいほど正確)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=200`, `torange=[0.5, 8]`) → `LGamma` (パレット) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[LGammaExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/LGammaExample.toe)

??? note "手順(Math/LGamma.example.py)"

    ```python
    """ガンマ関数の対数

    0.5〜8 の値(x)の ln Γ(x) です(y、スターリングの近似なので x が大きいほど正確)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="ramp", length=200, torange=(0.5, 8))
        in_out(ex, tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

11 個のオペレータ。sha256: `5a56925c43017788…`
