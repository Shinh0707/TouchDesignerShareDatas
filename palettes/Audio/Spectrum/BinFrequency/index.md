<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/BinFrequency/ -->

# BinFrequency

`Audio/Spectrum` フォルダのパレットです。

## 説明

スペクトルの各ビンの中心周波数 f_k = k · fs / N（Hz）を、スペクトルと同じ長さのチャンネルで出す。fs は Audio Spectrum CHOP に入っているオーディオのサンプルレート。

入力: なし（Audiospect で Audio Spectrum CHOP を参照）
出力: out1 ビン数サンプルの f_k（Hz）

パラメータ

- Audiospect: Audio Spectrum CHOP

## ダウンロード

[BinFrequency.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/BinFrequency.tox) [使用例 BinFrequencyExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/BinFrequencyExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | CHOP | `out1` | Sequence / 各ビンの中心周波数, channels: 1, samples: same as Audiospect, rate: same as Audiospect, range: [0, source_rate/2] |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Audiospect` | Audiospect | Parameter | CHOP |  |  |

## 使用例

### 各ビンの中心周波数

![各ビンの中心周波数](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-BinFrequency-example.svg)

440 Hz の正弦波のスペクトルを参照して、各ビンの中心周波数(Hz)を出した例です。0 Hz からナイキスト周波数まで等間隔に並びます。
スペクトルは BaseAudioSpect で作り、その中の Audio Spectrum CHOP を Audiospect で参照しています。

ネットワーク: `sound` (audiooscillatorCHOP: `frequency=440`) → `BaseAudioSpect` (パレット) → `BinFrequency` (パレット: `Audiospect=audiospect1`) → `out1`

[BinFrequencyExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/BinFrequencyExample.toe)

??? note "手順(Audio/Spectrum/BinFrequency.example.py)"

    ```python
    """各ビンの中心周波数

    440 Hz の正弦波のスペクトルを参照して、各ビンの中心周波数(Hz)を出した例です。0 Hz からナイキスト周波数まで等間隔に並びます。
    スペクトルは BaseAudioSpect で作り、その中の Audio Spectrum CHOP を Audiospect で参照しています。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import spectrum_of  # noqa: E402

    def build(ex, tox):
        sound = ex.op("audiooscillatorCHOP", name="sound", frequency=440)
        ex.palette(tox, Audiospect=spectrum_of(ex, sound))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

10 個のオペレータ。sha256: `c84c31488899ae05…`
