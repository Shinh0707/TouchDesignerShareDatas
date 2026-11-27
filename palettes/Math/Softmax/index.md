<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Softmax/ -->

# Softmax

`Math` フォルダのパレットです。

## 説明

サンプルの列 x のソフトマックス: exp((x − max)/T) / Σ exp((x − max)/T)。合計が 1 の確率の列になる（max を引いてから exp するので大きな値でも溢れない）。

入力: in1 CHOP（各チャンネルのサンプルの列をベクトルとして扱う）
出力: out1 同じ形（0〜1、合計 1）

パラメータ

- Tempature: 温度 T（大きいほど平らに、小さいほど最大値に集中）

## ダウンロード

[Softmax.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Softmax.tox) [使用例 SoftmaxExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/SoftmaxExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Vector |
| 出力 0 | CHOP | `out1` | Vector |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Tempature` | Tempature | Parameter | Float | `1` | 0.0001 … 1.0 |

## 使用例

### ソフトマックス

![ソフトマックス](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-Softmax-example.svg)

振幅 3 の正弦波 32 サンプル(x)をソフトマックスにした例です(y、合計 1)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=sin`, `length=32`, `numcycles=1`, `amp=3`) → `Softmax` (パレット) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[SoftmaxExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/SoftmaxExample.toe)

??? note "手順(Math/Softmax.example.py)"

    ```python
    """ソフトマックス

    振幅 3 の正弦波 32 サンプル(x)をソフトマックスにした例です(y、合計 1)。
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

9 個のオペレータ。sha256: `d6bd0c5cd62a458d…`
