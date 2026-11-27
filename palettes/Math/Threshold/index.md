<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Threshold/ -->

# Threshold

`Math` フォルダのパレットです。

## 説明

しきい値より上（Lower で下）を 1、それ以外を 0 にする。Inclusive でしきい値ちょうども含める。

入力: in1 CHOP
出力: out1 同じ形（0/1）

パラメータ

- Threshold: しきい値
- Inclusive: しきい値ちょうどを含める
- Lower: しきい値より下を 1 にする

## ダウンロード

[Threshold.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Threshold.tox) [使用例 ThresholdExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/ThresholdExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Gate |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Threshold` | Threshold | Parameter | Float | `0` | 0.0 … 1.0 |
| `Inclusive` | Inclusive | Parameter | Toggle | `False` |  |
| `Lower` | Lower | Parameter | Toggle | `False` |  |

## 使用例

### しきい値で 0/1

![しきい値で 0/1](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-Threshold-example.svg)

正弦波(x)を Threshold=0.3 で 0/1 にした例です(y)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=sin`, `length=200`, `numcycles=2`, `amp=1`) → `Threshold` (パレット: `Threshold=0.3`) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[ThresholdExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/ThresholdExample.toe)

??? note "手順(Math/Threshold.example.py)"

    ```python
    """しきい値で 0/1

    正弦波(x)を Threshold=0.3 で 0/1 にした例です(y)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="sin", length=200, numcycles=2, amp=1)
        in_out(ex, tox, x, Threshold=0.3)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

8 個のオペレータ。sha256: `7990c6299e25fabc…`
