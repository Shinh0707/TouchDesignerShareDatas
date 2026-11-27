<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/VU/ -->

# VU

`Audio/Feature` フォルダのパレットです。

## 説明

VU メーター。整流した信号を 2 次のフィルタ（減衰比 Dump、固有角周波数 Angf：VU 規格の約 300 ms の動き）に通し、基準レベル Vu0 dBFS を 0 VU として出す。

入力: in1 オーディオ CHOP（タイムスライス）
出力

- vu: VU 値 dB（0 = 基準レベル）
- vunorm: 基準レベルに対する比（リニア）

パラメータ

- Vu0: 0 VU に当たるレベル dBFS（既定 -18）
- Dump: 減衰比（既定 0.82）
- Angf: 固有角周波数 rad/s（既定 8.8）

## ダウンロード

[VU.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/VU.tox) [使用例 VUExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/VUExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Audio |
| 出力 0 | CHOP | `vunorm` | Envelope / 基準レベルに対するリニア比, channels: same as in1, samples: 1, rate: fps, range: [0, null] |
| 出力 1 | CHOP | `vu` | Envelope / 0 = 基準レベル Vu0, channels: same as in1, samples: 1, rate: fps |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Vu0` | Vu0 | Parameter | Float | `-18` | -30.0 … 0.0 |
| `Dump` | DampingRatio | Parameter | Float | `0.82` | 0.0 … 1.0 |
| `Angf` | NaturalAngularFrequency | Parameter | Float | `8.8` | 0.0 … 1.0 |

## 使用例

### サンプル音声の VU メーター

![サンプル音声の VU メーター](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Feature-VU-example.svg)

TouchDesigner 付属のサンプル音声を VU に通した例です。vu は基準レベル(-18 dBFS)を 0 とした dB の値です。

ネットワーク: `in0` (audiofileinCHOP) → `VU2` (パレット) → `out1`

[VUExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/VUExample.toe)

??? note "手順(Audio/Feature/VU.example.py)"

    ```python
    """サンプル音声の VU メーター

    TouchDesigner 付属のサンプル音声を VU に通した例です。vu は基準レベル(-18 dBFS)を 0 とした dB の値です。
    """

    def build(ex, tox):
        audio = ex.input("audiofileinCHOP")
        ex.palette(tox, audio)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

35 個のオペレータ。sha256: `9453258347799d8e…`
