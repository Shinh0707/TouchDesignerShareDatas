<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/AbsClamp/ -->

# AbsClamp

`Math` フォルダのパレットです。

## 説明

値を −Scale〜Scale に抑える（はみ出したサンプルは ±Scale に、内側はそのまま）。

入力: in1 CHOP
出力: out1 同じ形

パラメータ

- Scale: 絶対値の上限（既定 1）

## ダウンロード

[AbsClamp.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/AbsClamp.tox) [使用例 AbsClampExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/AbsClampExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Scale` | Scale | Parameter | Float | `0` | 0.0 … 1.0 |

## 使用例

### ±Scale に抑える

![±Scale に抑える](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-AbsClamp-example.svg)

振幅 2 の正弦波(x)を、Scale=1 で −1〜1 に抑えた例です(y)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=sin`, `length=200`, `numcycles=2`, `amp=2`) → `AbsClamp` (パレット: `Scale=1`) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[AbsClampExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/AbsClampExample.toe)

??? note "手順(Math/AbsClamp.example.py)"

    ```python
    """±Scale に抑える

    振幅 2 の正弦波(x)を、Scale=1 で −1〜1 に抑えた例です(y)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="sin", length=200, numcycles=2, amp=2)
        in_out(ex, tox, x, Scale=1)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

5 個のオペレータ。sha256: `36ad7cf84f65a12c…`
