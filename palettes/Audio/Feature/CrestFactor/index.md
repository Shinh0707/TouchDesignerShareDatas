<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/CrestFactor/ -->

# CrestFactor

`Audio/Feature` フォルダのパレットです。

## 説明

クレストファクター（ピーク ÷ RMS）。音のとがり具合（打撃音ほど大きく、正弦波で √2 ≈ 1.41、矩形波で 1）。

入力: in1 オーディオ CHOP
出力: out1 1 サンプル（チャンネルごと）

## ダウンロード

[CrestFactor.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/CrestFactor.tox) [使用例 CrestFactorExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/CrestFactorExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Audio |
| 出力 0 | CHOP | `out1` | Feature |

## 使用例

### 3 つの波のクレストファクター

![3 つの波のクレストファクター](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Feature-CrestFactor-example.svg)

正弦波・矩形波・ノイズに CrestFactor をかけて比べた例です。正弦波で √2 ≈ 1.41、矩形波で 1、ノイズはそれより大きくなります。

ネットワーク: `in0` (patternCHOP: `wavetype=sin`, `length=2000`, `numcycles=20`) → `in1` (patternCHOP: `wavetype=square`, `length=2000`, `numcycles=20`) → `in2` (patternCHOP: `wavetype=random`, `length=2000`, `fromrange=[0, 1]`, `torange=[-1, 1]`) → `CrestFactor` (パレット) → `sine` (renameCHOP: `renamefrom=*`, `renameto=sine`) → `CrestFactor1` (パレット) → `square` (renameCHOP: `renamefrom=*`, `renameto=square`) → `CrestFactor2` (パレット) → `noise` (renameCHOP: `renamefrom=*`, `renameto=noise`) → `results` (mergeCHOP) → `out1`

[CrestFactorExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/CrestFactorExample.toe)

??? note "手順(Audio/Feature/CrestFactor.example.py)"

    ```python
    """3 つの波のクレストファクター

    正弦波・矩形波・ノイズに CrestFactor をかけて比べた例です。正弦波で √2 ≈ 1.41、矩形波で 1、ノイズはそれより大きくなります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import compare  # noqa: E402

    def build(ex, tox):
        sine = ex.input("patternCHOP", wavetype="sin", length=2000, numcycles=20)
        square = ex.input("patternCHOP", wavetype="square", length=2000, numcycles=20)
        noise = ex.input("patternCHOP", wavetype="random", length=2000, fromrange=(0, 1), torange=(-1, 1))
        compare(ex, tox, [("sine", sine), ("square", square), ("noise", noise)])
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

14 個のオペレータ。sha256: `74fb0b6651f5086d…`
