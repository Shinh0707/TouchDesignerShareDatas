<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/AllAnalyze/ -->

# AllAnalyze

`Math` フォルダのパレットです。

## 説明

全チャンネル・全サンプルをまとめて 1 つの値にする（Operation で合計・平均・最大・最小）。Analyze CHOP（サンプル方向）と Math CHOP（チャンネル方向）を続けてかけたもの。

入力: in1 CHOP
出力: out1 1 チャンネル × 1 サンプル

パラメータ

- Operation: Sum / Average / Maximum（既定）/ Minimum

## ダウンロード

[AllAnalyze.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/AllAnalyze.tox) [使用例 AllAnalyzeExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/AllAnalyzeExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Feature |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Operation` | Operation | Parameter | Menu | `maximum` | `sum` / `average` / `maximum` / `minimum` |

## 使用例

### 全部をまとめて 1 つの値に

![全部をまとめて 1 つの値に](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-AllAnalyze-example.svg)

正弦波(x)の全サンプルの最大値です(y、Operation で合計・平均・最小も選べます)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=sin`, `length=200`, `numcycles=2`, `amp=1`) → `AllAnalyze` (パレット) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[AllAnalyzeExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/AllAnalyzeExample.toe)

??? note "手順(Math/AllAnalyze.example.py)"

    ```python
    """全部をまとめて 1 つの値に

    正弦波(x)の全サンプルの最大値です(y、Operation で合計・平均・最小も選べます)。
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

13 個のオペレータ。sha256: `0af099bcfccfec22…`
