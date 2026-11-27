<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/MelSpectrum/ -->

# MelSpectrum

`Audio/Spectrum` フォルダのパレットです。

## 説明

オーディオの最新のフレームを、メル尺度の帯域パワー（メルスペクトル）にする。低い音は細かく、高い音は粗く分けるので、耳の聞こえ方に近い。最新の Fftsize サンプルに Hann 窓を掛けて FFT し、パワー |X|² をメルフィルタバンク（三角形、Slaney 尺度、面積で正規化）で Nmels 帯域にまとめる。44.1 kHz・Fftsize 2048・128 帯域で、librosa.feature.melspectrogram の既定と同じ値になる（1 フレーム分）。

入力: in1 オーディオ CHOP（タイムスライス。複数チャンネルは平均してモノラルにする）
出力: out1 メル帯域のパワー（1 チャンネル `mel` × Nmels サンプル、低い帯域から）

パラメータ

- Fftsize: フレームの長さ（サンプル）。2048 が librosa の既定
- Nmels: メル帯域の数
- Fmin / Fmax: フィルタバンクの下限・上限（Hz）。Fmax = 0 でサンプルレートの半分

フィルタバンクの表だけは Script CHOP で作る（サンプルレートかパラメータが変わったときに 1 回だけ計算する定数の表）。毎フレームの計算（窓・FFT・行列の積）は標準の OP と DotCHOP。

## ダウンロード

[MelSpectrum.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MelSpectrum.tox) [使用例 MelSpectrumExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MelSpectrumExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` |  |
| 出力 0 | CHOP | `out1` |  |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Fftsize` | FFT Size | Parameter | Menu | `2048` | `512` / `1024` / `2048` / `4096` / `8192` |
| `Nmels` | Mel Bands | Parameter | Int | `128` | 8.0 … 256.0 |
| `Fmin` | Min Frequency | Parameter | Float | `0` | 0.0 … 2000.0 |
| `Fmax` | Max Frequency | Parameter | Float | `0` | 0.0 … 24000.0 |

## 使用例

### 2 つの音のメルスペクトル

![2 つの音のメルスペクトル](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-MelSpectrum-example.svg)

440 Hz と 3000 Hz の正弦波を混ぜた音のメルスペクトル(128 帯域)です。山が 2 つ出ます。メル尺度では低い音ほど細かく分けるので、440 Hz の山は左寄り、3000 Hz の山は中央より右に出ます。

ネットワーク: `a440` (audiooscillatorCHOP: `frequency=440`, `amp=0.5`) → `a3000` (audiooscillatorCHOP: `frequency=3000`, `amp=0.3`) → `in0` (mathCHOP: `chopop=add`) → `MelSpectrum` (パレット) → `out1`

[MelSpectrumExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MelSpectrumExample.toe)

??? note "手順(Audio/Spectrum/MelSpectrum.example.py)"

    ```python
    """2 つの音のメルスペクトル

    440 Hz と 3000 Hz の正弦波を混ぜた音のメルスペクトル(128 帯域)です。山が 2 つ出ます。メル尺度では低い音ほど細かく分けるので、440 Hz の山は左寄り、3000 Hz の山は中央より右に出ます。
    """
    FRAMES = 30

    def build(ex, tox):
        a = ex.op("audiooscillatorCHOP", name="a440", frequency=440, amp=0.5)
        b = ex.op("audiooscillatorCHOP", name="a3000", frequency=3000, amp=0.3)
        mix = ex.input("mathCHOP", input=[a, b], chopop="add")
        ex.palette(tox, mix)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

## 出典・参考

- B. McFee, C. Raffel, D. Liang, D. P. W. Ellis, M. McVicar, E. Battenberg, O. Nieto (2015). [librosa: Audio and Music Signal Analysis in Python](https://doi.org/10.25080/Majora-7b98e3ed-003). Proc. 14th Python in Science Conference, 18-25. — メルフィルタバンク（Slaney 尺度、面積で正規化）と既定値。librosa.feature.melspectrogram と同じ値になるようにしてある

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

17 個のオペレータ。sha256: `c9af0b7d59eb91e2…`
