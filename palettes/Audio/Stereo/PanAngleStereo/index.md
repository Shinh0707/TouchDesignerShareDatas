<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/PanAngleStereo/ -->

# PanAngleStereo

`Audio/Stereo` フォルダのパレットです。

## 説明

PanAngle の、L と R を別々の CHOP で受ける版。2 つのモノラル信号のどちらが大きいかを −1〜1 で出す（−1 = in1 だけ、+1 = in2 だけ）。

入力

- in1: L のオーディオ CHOP
- in2: R のオーディオ CHOP

出力: out1 1 サンプル: −1（in1 側）〜 +1（in2 側）

## ダウンロード

[PanAngleStereo.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PanAngleStereo.tox) [使用例 PanAngleStereoExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PanAngleStereoExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Audio / L |
| 入力 1 | CHOP | `in2` | Audio / R |
| 出力 0 | CHOP | `out1` | Feature |

## 使用例

### どちらが大きいか

![どちらが大きいか](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Stereo-PanAngleStereo-example.svg)

in1(L)を音量 1、in2(R)を音量 0.3 にした例です。L 側に寄っているので負の値になります。

ネットワーク: `in0` (patternCHOP: `channelname=l`, `wavetype=sin`, `length=2000`, `numcycles=20`) → `in1` (patternCHOP: `channelname=r`, `wavetype=sin`, `length=2000`, `numcycles=20`, `amp=0.3`) → `PanAngleStereo` (パレット) → `out1`

[PanAngleStereoExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PanAngleStereoExample.toe)

??? note "手順(Audio/Stereo/PanAngleStereo.example.py)"

    ```python
    """どちらが大きいか

    in1(L)を音量 1、in2(R)を音量 0.3 にした例です。L 側に寄っているので負の値になります。
    """

    def build(ex, tox):
        left = ex.input("patternCHOP", channelname="l", wavetype="sin", length=2000, numcycles=20)
        right = ex.input("patternCHOP", channelname="r", wavetype="sin", length=2000, numcycles=20, amp=0.3)
        ex.palette(tox, left, right)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

12 個のオペレータ。sha256: `5ec200eca81edc91…`
