<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/TimeLayerNorm/ -->

# TimeLayerNorm

`Math` フォルダのパレットです。

## 説明

時間方向のレイヤー正規化: 直近 10 フレームの、チャンネル平均の平均と標準偏差で入力を標準化する（だいたい −1〜1 に収まる z スコア）。

時間方向の平均は、チャンネルとサンプルを入れ替えてから Math CHOP でまとめて計算する（チャンネルが多いときに速い）。

入力: in1 CHOP
出力: out1 同じ形

## ダウンロード

[TimeLayerNorm.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/TimeLayerNorm.tox) [使用例 TimeLayerNormExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/TimeLayerNormExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## 使用例

### 時間方向のレイヤー正規化

![時間方向のレイヤー正規化](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-TimeLayerNorm-example.svg)

平均 3、振れ幅 ±5 で毎フレーム変わる乱数(x)を、直近 10 フレームの平均と標準偏差で標準化した例です(y)。y は 0 を中心にそろい、もとの平均 3 のずれが消えます。

ネットワーク: `in0` (patternCHOP: `channelname=x`, `wavetype=random`, `length=64`, `amp=10`, `offset=-2`, `seed={'expr': 'absTime.frame'}`) → `TimeLayerNorm` (パレット) → `x` (renameCHOP: `renamefrom=*`, `renameto=x`) → `y` (renameCHOP: `renamefrom=*`, `renameto=y`) → `x_and_y` (mergeCHOP) → `out1`

[TimeLayerNormExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/TimeLayerNormExample.toe)

??? note "手順(Math/TimeLayerNorm.example.py)"

    ```python
    """時間方向のレイヤー正規化

    平均 3、振れ幅 ±5 で毎フレーム変わる乱数(x)を、直近 10 フレームの平均と標準偏差で標準化した例です(y)。y は 0 を中心にそろい、もとの平均 3 のずれが消えます。
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

26 個のオペレータ。sha256: `9b0a16c2b2c3307c…`
