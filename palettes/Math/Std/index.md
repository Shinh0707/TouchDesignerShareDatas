<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Std/ -->

# Std

`Math` フォルダのパレットです。

## 説明

サンプルの列の標準偏差（母標準偏差 √(平均((x − 平均)²))）を 1 サンプルで出す。

入力: in1 CHOP
出力: out1 1 サンプル（チャンネルごと）

## ダウンロード

[Std.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Std.tox) [使用例 StdExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/StdExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Feature |

## 使用例

### 標準偏差

![標準偏差](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-Std-example.svg)

振幅 1 の正弦波(x)の標準偏差です(y、1 つの値で 1/√2 ≈ 0.707)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=sin`, `length=200`, `numcycles=2`, `amp=1`) → `Std` (パレット) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[StdExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/StdExample.toe)

??? note "手順(Math/Std.example.py)"

    ```python
    """標準偏差

    振幅 1 の正弦波(x)の標準偏差です(y、1 つの値で 1/√2 ≈ 0.707)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="sin", length=200, numcycles=2, amp=1)
        in_out(ex, tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

8 個のオペレータ。sha256: `19c60abddabe3849…`
