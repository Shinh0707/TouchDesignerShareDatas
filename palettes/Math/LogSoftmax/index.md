<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/LogSoftmax/ -->

# LogSoftmax

`Math` フォルダのパレットです。

## 説明

ソフトマックスの対数: (x − max)/T − ln Σ exp((x − max)/T)。確率の対数が要る学習の損失（交差エントロピー）に使う。

入力: in1 CHOP（サンプルの列）
出力: out1 同じ形（0 以下）

パラメータ

- Tempature: 温度 T（softmax と同じ）

## ダウンロード

[LogSoftmax.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/LogSoftmax.tox) [使用例 LogSoftmaxExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/LogSoftmaxExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Vector |
| 出力 0 | CHOP | `out1` | Vector |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Tempature` | Tempature | Parameter | Float | `1` | 0.0 … 1.0 |

## 使用例

### 対数ソフトマックス

![対数ソフトマックス](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-LogSoftmax-example.svg)

振幅 3 の正弦波 32 サンプル(x)の対数ソフトマックスです(y)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=sin`, `length=32`, `numcycles=1`, `amp=3`) → `LogSoftmax` (パレット) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[LogSoftmaxExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/LogSoftmaxExample.toe)

??? note "手順(Math/LogSoftmax.example.py)"

    ```python
    """対数ソフトマックス

    振幅 3 の正弦波 32 サンプル(x)の対数ソフトマックスです(y)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="sin", length=32, numcycles=1, amp=3)
        in_out(ex, tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

10 個のオペレータ。sha256: `e0e1d59dd71321d0…`
