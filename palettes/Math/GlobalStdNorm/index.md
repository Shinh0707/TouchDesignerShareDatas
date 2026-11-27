<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/GlobalStdNorm/ -->

# GlobalStdNorm

`Math` フォルダのパレットです。

## 説明

フレームをまたいだ移動平均と移動分散（Alpha の指数移動平均）で、入力を標準化する: (x − 平均) / √分散。値の大きさが時間で変わる入力を、だいたい平均 0・標準偏差 1 にそろえる。

入力: in1 CHOP
出力: out1 同じ形

パラメータ

- Alpha: 前のフレームの統計を残す割合（大きいほどゆっくり追う）

## ダウンロード

[GlobalStdNorm.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/GlobalStdNorm.tox) [使用例 GlobalStdNormExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/GlobalStdNormExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Alpha` | Alpha | Parameter | Float | `0.4` | 0.0 … 1.0 |

## 使用例

### 移動統計での標準化

![移動統計での標準化](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-GlobalStdNorm-example.svg)

平均 3、振れ幅 ±5 で毎フレーム変わる乱数(x)を、フレームをまたいだ平均と分散で標準化した例です(y)。1 秒ほどで、y はだいたい平均 0・標準偏差 1 の範囲に収まります。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=random`, `length=64`, `amp=10`, `offset=-2`, `seed={'expr': 'absTime.frame'}`) → `GlobalStdNorm` (パレット) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[GlobalStdNormExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/GlobalStdNormExample.toe)

??? note "手順(Math/GlobalStdNorm.example.py)"

    ```python
    """移動統計での標準化

    平均 3、振れ幅 ±5 で毎フレーム変わる乱数(x)を、フレームをまたいだ平均と分散で標準化した例です(y)。1 秒ほどで、y はだいたい平均 0・標準偏差 1 の範囲に収まります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import in_out  # noqa: E402

    FRAMES = 90

    def build(ex, tox):
        x = ex.input("patternCHOP", channelname="x", wavetype="random", length=64, amp=10, offset=-2,
                     seed={"expr": "absTime.frame"})
        in_out(ex, tox, x)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

12 個のオペレータ。sha256: `cbffea8e95173dea…`
