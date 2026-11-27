<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/BaseAudioSpect/ -->

# BaseAudioSpect

`Audio/Spectrum` フォルダのパレットです。

## 説明

オーディオ CHOP を Audio Spectrum CHOP でスペクトルに変換する土台。ほかの AudioSpectrum 部品は、この中の Audio Spectrum CHOP を Audiospect パラメータで参照して使う。

入力: in1 オーディオ CHOP（タイムスライス）
出力: out1 スペクトル（リニア周波数、高域ブーストなし、Fftsize/2 サンプル）

パラメータ

- Fftsize: FFT サイズ（0=64 … 8=16384）。出力は 2^(Fftsize+5) サンプル
- Out: 中の Audio Spectrum CHOP へのパス（読み取り用）。ほかの部品の Audiospect にはこれを指定する

## ダウンロード

[BaseAudioSpect.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/BaseAudioSpect.tox) [使用例 BaseAudioSpectExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/BaseAudioSpectExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` |  |
| 出力 0 | CHOP | `out1` |  |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Fftsize` | FFT Size | Parameter | Menu | `7` | `0` / `1` / `2` / `3` / `4` / `5` / `6` / `7` / `8` |
| `Out` | Out | Parameter | CHOP |  |  |

## 使用例

### オーディオをスペクトルに

![オーディオをスペクトルに](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-BaseAudioSpect-example.svg)

付属のサンプル音声を BaseAudioSpect でスペクトルにした例です。ほかの AudioSpectrum の部品は、これ(または Audio Spectrum CHOP)を参照して使います。

ネットワーク: `in0` (audiofileinCHOP) → `BaseAudioSpect` (パレット) → `out1`

[BaseAudioSpectExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/BaseAudioSpectExample.toe)

??? note "手順(Audio/Spectrum/BaseAudioSpect.example.py)"

    ```python
    """オーディオをスペクトルに

    付属のサンプル音声を BaseAudioSpect でスペクトルにした例です。ほかの AudioSpectrum の部品は、これ(または Audio Spectrum CHOP)を参照して使います。
    """

    def build(ex, tox):
        audio = ex.input("audiofileinCHOP")
        ex.palette(tox, audio)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

4 個のオペレータ。sha256: `1681207a65d0dd3b…`
