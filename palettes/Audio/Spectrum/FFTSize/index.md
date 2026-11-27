<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/FFTSize/ -->

# FFTSize

`Audio/Spectrum` フォルダのパレットです。

## 説明

参照した Audio Spectrum CHOP の FFT サイズ N（= 2^(fftsize+6)）を定数で出す。fk などの周波数計算に使う下請け部品。

入力: なし（Audiospect パラメータで Audio Spectrum CHOP を参照）
出力: out1 1ch 1 サンプル: nfft

パラメータ

- Audiospect: Audio Spectrum CHOP（BaseAudioSpect の Out など）

## ダウンロード

[FFTSize.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/FFTSize.tox) [使用例 FFTSizeExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/FFTSizeExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | CHOP | `out1` | Control / FFT サイズ N, channels: 1, samples: 1, rate: fps |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Audiospect` | Audiospect | Parameter | CHOP |  |  |

## 使用例

### FFT サイズを読む

![FFT サイズを読む](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-FFTSize-example.svg)

参照した Audio Spectrum CHOP の FFT サイズ N を出した例です(BaseAudioSpect の既定の Fftsize=7 で 8192)。
スペクトルは BaseAudioSpect で作り、その中の Audio Spectrum CHOP を Audiospect で参照しています。

ネットワーク: `sound` (audiooscillatorCHOP: `frequency=440`) → `BaseAudioSpect` (パレット) → `FFTSize` (パレット: `Audiospect=audiospect1`) → `out1`

[FFTSizeExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/FFTSizeExample.toe)

??? note "手順(Audio/Spectrum/FFTSize.example.py)"

    ```python
    """FFT サイズを読む

    参照した Audio Spectrum CHOP の FFT サイズ N を出した例です(BaseAudioSpect の既定の Fftsize=7 で 8192)。
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

3 個のオペレータ。sha256: `b446c9b22fc25cf6…`
