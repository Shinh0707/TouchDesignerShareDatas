<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/LogBinFrequency/ -->

# LogBinFrequency

`Audio/Spectrum` フォルダのパレットです。

## 説明

ビン周波数を対数（オクターブ）軸に変換した x_k = log2(f_k) を出す。log2 の前に f_k を Fclamp Hz で、後に Xmin で下限クランプする（DC ビンの -∞ を避ける）。SpectralSlope の横軸。

入力: なし（Audiospect で Audio Spectrum CHOP を参照）
出力: out1 ビン数サンプルの log2(f_k)

パラメータ

- Audiospect: Audio Spectrum CHOP
- Fclamp: log2 の前の周波数の下限 Hz（既定 0.001）
- Xmin: 出力 log2(f_k) の下限（既定 0 = 1 Hz 未満を 0 に）

## ダウンロード

[LogBinFrequency.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/LogBinFrequency.tox) [使用例 LogBinFrequencyExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/LogBinFrequencyExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | CHOP | `out1` | Sequence / log2(ビン周波数), channels: 1, samples: same as Audiospect, rate: same as Audiospect, range: [Xmin, "log2(source_rate/2)"] |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Audiospect` | Audiospect | Parameter | CHOP |  |  |
| `Fclamp` | F Floor (Hz) | Parameter | Float | `0.001` | 0.0 … 1.0 |
| `Xmin` | Output Floor | Parameter | Float | `0` | 0.0 … 1.0 |

## 使用例

### ビン周波数の対数

![ビン周波数の対数](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-LogBinFrequency-example.svg)

440 Hz の正弦波のスペクトルを参照して、各ビンの周波数の log2(オクターブ)を出した例です。
スペクトルは BaseAudioSpect で作り、その中の Audio Spectrum CHOP を Audiospect で参照しています。

ネットワーク: `sound` (audiooscillatorCHOP: `frequency=440`) → `BaseAudioSpect` (パレット) → `LogBinFrequency` (パレット: `Audiospect=audiospect1`) → `out1`

[LogBinFrequencyExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/LogBinFrequencyExample.toe)

??? note "手順(Audio/Spectrum/LogBinFrequency.example.py)"

    ```python
    """ビン周波数の対数

    440 Hz の正弦波のスペクトルを参照して、各ビンの周波数の log2(オクターブ)を出した例です。
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

26 個のオペレータ。sha256: `225a61caccf24f65…`
