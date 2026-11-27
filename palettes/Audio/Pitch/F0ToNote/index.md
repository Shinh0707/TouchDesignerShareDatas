<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/F0ToNote/ -->

# F0ToNote

`Audio/Pitch` フォルダのパレットです。

## 説明

周波数 Hz を MIDI ノート番号（小数）に変換する: 69 + 12·log2(f / 440)。A4 = 440 Hz = 69。8.18 Hz（ノート 0）未満、たとえば無音の 0 Hz は 0 にする。

入力: in1 周波数 Hz の CHOP
出力: out1 ノート番号（丸めなし）

## ダウンロード

[F0ToNote.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0ToNote.tox) [使用例 F0ToNoteExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0ToNoteExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Feature / 周波数, channels: any, samples: any, rate: any, accept: [0, null] |
| 出力 0 | CHOP | `out1` | Note / 小数のノート番号（丸めなし）, channels: same as in1, samples: same as in1, rate: same as in1 |

## 使用例

### 周波数をノート番号に

![周波数をノート番号に](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Pitch-F0ToNote-example.svg)

220 Hz・440 Hz・880 Hz を MIDI ノート番号(小数)に変換した例です(57、69、81)。

ネットワーク: `in0` (constantCHOP: `name0=a3`, `value0=220`, `name1=a4`, `value1=440`, `name2=a5`, `value2=880`) → `F0ToNote` (パレット) → `out1`

[F0ToNoteExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0ToNoteExample.toe)

??? note "手順(Audio/Pitch/F0ToNote.example.py)"

    ```python
    """周波数をノート番号に

    220 Hz・440 Hz・880 Hz を MIDI ノート番号(小数)に変換した例です(57、69、81)。
    """

    def build(ex, tox):
        hz = ex.input("constantCHOP", name0="a3", value0=220, name1="a4", value1=440, name2="a5", value2=880)
        ex.palette(tox, hz)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

7 個のオペレータ。sha256: `e06033b7cb850215…`
