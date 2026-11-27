<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/MagnitudeDb/ -->

# MagnitudeDb

`Audio/Spectrum` フォルダのパレットです。

## 説明

スペクトル振幅をデシベル y_k = 20·log10(|X_k|) に変換する。振幅は 0.001 で下限クランプ（-60 dB が床）。SpectralSlope の縦軸。

入力: なし（Audiospect で Audio Spectrum CHOP を参照）
出力: out1 ビン数サンプルの dB 値

パラメータ

- Audiospect: Audio Spectrum CHOP

## ダウンロード

[MagnitudeDb.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MagnitudeDb.tox) [使用例 MagnitudeDbExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MagnitudeDbExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | CHOP | `out1` | Spectrum(dB) |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Audiospect` | Audiospect | Parameter | CHOP |  |  |

## 使用例

### スペクトルをデシベルに

![スペクトルをデシベルに](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-MagnitudeDb-example.svg)

440 Hz の正弦波のスペクトルをデシベルにした例です。440 Hz のビンに山ができ、ほかは −60 dB の床に近くなります。
スペクトルは BaseAudioSpect で作り、その中の Audio Spectrum CHOP を Audiospect で参照しています。

ネットワーク: `sound` (audiooscillatorCHOP: `frequency=440`) → `BaseAudioSpect` (パレット) → `yk1` (パレット: `Audiospect=audiospect1`) → `out1`

[MagnitudeDbExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MagnitudeDbExample.toe)

??? note "手順(Audio/Spectrum/MagnitudeDb.example.py)"

    ```python
    """スペクトルをデシベルに

    440 Hz の正弦波のスペクトルをデシベルにした例です。440 Hz のビンに山ができ、ほかは −60 dB の床に近くなります。
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

11 個のオペレータ。sha256: `dd8487b8f4b04e65…`
