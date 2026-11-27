<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/ZCR/ -->

# ZCR

`Audio/Feature` フォルダのパレットです。

## 説明

ゼロ交差率（隣り合うサンプルで符号が変わる割合）。ノイズや高い音ほど大きく、低い音ほど小さい。

入力: in1 オーディオ CHOP
出力: out1 1 サンプル（チャンネルごと、0〜1）

## ダウンロード

[ZCR.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/ZCR.tox) [使用例 ZCRExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/ZCRExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Audio |
| 出力 0 | CHOP | `out1` | Feature |

## 使用例

### 低い音・高い音・ノイズのゼロ交差率

![低い音・高い音・ノイズのゼロ交差率](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Feature-ZCR-example.svg)

2000 サンプルの中で 10 周期の低い正弦波、200 周期の高い正弦波、ノイズを比べた例です。高い音ほど、ノイズほど大きくなります。

ネットワーク: `in0` (patternCHOP: `wavetype=sin`, `length=2000`, `numcycles=10`) → `in1` (patternCHOP: `wavetype=sin`, `length=2000`, `numcycles=200`) → `in2` (patternCHOP: `wavetype=random`, `length=2000`, `fromrange=[0, 1]`, `torange=[-1, 1]`) → `ZCR` (パレット) → `low` (renameCHOP: `renamefrom=*`, `renameto=low`) → `ZCR1` (パレット) → `high` (renameCHOP: `renamefrom=*`, `renameto=high`) → `ZCR2` (パレット) → `noise` (renameCHOP: `renamefrom=*`, `renameto=noise`) → `results` (mergeCHOP) → `out1`

[ZCRExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/ZCRExample.toe)

??? note "手順(Audio/Feature/ZCR.example.py)"

    ```python
    """低い音・高い音・ノイズのゼロ交差率

    2000 サンプルの中で 10 周期の低い正弦波、200 周期の高い正弦波、ノイズを比べた例です。高い音ほど、ノイズほど大きくなります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import compare  # noqa: E402

    def build(ex, tox):
        low = ex.input("patternCHOP", wavetype="sin", length=2000, numcycles=10)
        high = ex.input("patternCHOP", wavetype="sin", length=2000, numcycles=200)
        noise = ex.input("patternCHOP", wavetype="random", length=2000, fromrange=(0, 1), torange=(-1, 1))
        compare(ex, tox, [("low", low), ("high", high), ("noise", noise)])
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

11 個のオペレータ。sha256: `eef57bcb1265f964…`
