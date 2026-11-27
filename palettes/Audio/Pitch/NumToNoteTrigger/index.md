<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/NumToNoteTrigger/ -->

# NumToNoteTrigger

`Audio/Pitch` フォルダのパレットです。

## 説明

ノート番号を 128 サンプルのワンホットに変換する。入力のノート番号と ±0.01 以内のインデックスだけが 1、ほかは 0（ノート 0〜127 のどれが鳴っているかの表）。±0.01 はわずかなぶれを許すための幅で、入力は整数のノート番号を想定。

入力: in1 ノート番号の CHOP（F0Note などの整数）
出力: out1 128 サンプル（チャンネルごと）: 0/1

## ダウンロード

[NumToNoteTrigger.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/NumToNoteTrigger.tox) [使用例 NumToNoteTriggerExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/NumToNoteTriggerExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Note / 整数のノート番号（±0.01 のぶれを許す）, channels: any, samples: 1, rate: any, accept: [0, 127] |
| 出力 0 | CHOP | `out1` | Trigger / インデックス = ノート番号が 1、ほかは 0, channels: same as in1, samples: 128, rate: same as in1, range: [0, 1] |

## 使用例

### ノート番号をワンホットに

![ノート番号をワンホットに](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Pitch-NumToNoteTrigger-example.svg)

ノート番号 60(C4)を、128 サンプルのワンホット(60 番目だけ 1)にした例です。

ネットワーク: `in0` (constantCHOP: `name0=note`, `value0=60`) → `NumToNoteTrigger` (パレット) → `out1`

[NumToNoteTriggerExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/NumToNoteTriggerExample.toe)

??? note "手順(Audio/Pitch/NumToNoteTrigger.example.py)"

    ```python
    """ノート番号をワンホットに

    ノート番号 60(C4)を、128 サンプルのワンホット(60 番目だけ 1)にした例です。
    """

    def build(ex, tox):
        note = ex.input("constantCHOP", name0="note", value0=60)
        ex.palette(tox, note)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

8 個のオペレータ。sha256: `f7872486ad2e8365…`
