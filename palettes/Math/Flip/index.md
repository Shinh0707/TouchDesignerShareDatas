<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Flip/ -->

# Flip

`Math` フォルダのパレットです。

## 説明

サンプルの順番を逆にする（[a, b, c] → [c, b, a]）。

入力: in1 CHOP
出力: out1 同じ形

## ダウンロード

[Flip.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Flip.tox) [使用例 FlipExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/FlipExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## 使用例

### サンプルの順番を逆に

![サンプルの順番を逆に](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-Flip-example.svg)

0→1 のランプ(x)の順番を逆にした例です(y、1→0)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=50`, `torange=[0, 1]`) → `Flip` (パレット) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[FlipExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/FlipExample.toe)

??? note "手順(Math/Flip.example.py)"

    ```python
    """サンプルの順番を逆に

    0→1 のランプ(x)の順番を逆にした例です(y、1→0)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="ramp", length=50, torange=(0, 1))
        in_out(ex, tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

6 個のオペレータ。sha256: `32931e6de5efc9d7…`
