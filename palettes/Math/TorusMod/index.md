<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/TorusMod/ -->

# TorusMod

`Math` フォルダのパレットです。

## 説明

値を 0〜Max の範囲にループさせる（トーラス状の巻き戻し: ((x mod Max) + Max) mod Max）。Max は in2 で与えるか、繋がなければ Max パラメータ。

入力: in1、in2（省略可、Max）
出力: out1 0〜Max の値

## ダウンロード

[TorusMod.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/TorusMod.tox) [使用例 TorusModExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/TorusModExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 入力 1 | CHOP | `inMax` |  |
| 出力 0 | CHOP | `out1` | Any |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Max` | Max | Parameter | Float | `1` | 0.0 … 2.0 |

## 使用例

### 0〜Max の範囲でループ

![0〜Max の範囲でループ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-TorusMod-example.svg)

−3〜3 の値(x)を、Max=1 で 0〜1 に巻き戻した例です(y、負の値も 0〜1 に入ります)。Max は in2 でも与えられます。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=ramp`, `length=200`, `torange=[-3, 3]`) → `TorusMod` (パレット: `Max=1`) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[TorusModExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/TorusModExample.toe)

??? note "手順(Math/TorusMod.example.py)"

    ```python
    """0〜Max の範囲でループ

    −3〜3 の値(x)を、Max=1 で 0〜1 に巻き戻した例です(y、負の値も 0〜1 に入ります)。Max は in2 でも与えられます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="ramp", length=200, torange=(-3, 3))
        in_out(ex, tox, x, Max=1)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

25 個のオペレータ。sha256: `db39afa6bd5de284…`
