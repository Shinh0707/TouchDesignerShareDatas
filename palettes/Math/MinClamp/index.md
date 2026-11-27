<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/MinClamp/ -->

# MinClamp

`Math` フォルダのパレットです。

## 説明

下限でクリップする: max(x, Min)。0 で割る・log(0) を避けるための下限に使う。

入力: in1 CHOP
出力: out1 同じ形

パラメータ

- Min: 下限（既定 0.0001）

## ダウンロード

[MinClamp.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/MinClamp.tox) [使用例 MinClampExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/MinClampExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Min` | min | Parameter | Float | `0` | 0.0 … 1.0 |

## 使用例

### 下限でクリップ

![下限でクリップ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-MinClamp-example.svg)

正弦波(x)を Min=0 で下からクリップした例です(y、負の部分が 0 になります)。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=sin`, `length=200`, `numcycles=2`, `amp=1`) → `MinClamp` (パレット: `Min=0`) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[MinClampExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/MinClampExample.toe)

??? note "手順(Math/MinClamp.example.py)"

    ```python
    """下限でクリップ

    正弦波(x)を Min=0 で下からクリップした例です(y、負の部分が 0 になります)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="sin", length=200, numcycles=2, amp=1)
        in_out(ex, tox, x, Min=0)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

5 個のオペレータ。sha256: `29708f782bf8e237…`
