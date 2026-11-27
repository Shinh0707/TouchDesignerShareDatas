<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/MFCC/ -->

# MFCC

`Audio/Spectrum` フォルダのパレットです。

## 説明

メル周波数ケプストラム係数（MFCC）。音色（スペクトルのおおまかな形）を、少ない数の値で表す。MelSpectrum のメル帯域パワーを dB にし（10·log10、一番大きい帯域から Topdb より下は切り上げ）、DCT（type 2、直交）で Nmfcc 個の係数にする。c0 は全体の大きさ、c1〜c4 はスペクトルの傾きや大まかなバランス、それより上は細かい形。44.1 kHz で既定のパラメータなら、librosa.feature.mfcc(y, sr=44100) の 1 フレームと同じ値になる。

2 つの音の MFCC の差（MFCCDistance）は、聴いたときの音色の違いによく合う（Wright ほか, JAES 2026）。

入力: in1 オーディオ CHOP（タイムスライス。複数チャンネルは平均してモノラルにする）
出力: out1 MFCC（Nmfcc チャンネル `c0`, `c1`, … × 1 サンプル、フレームごと）

パラメータ

- Nmfcc: 係数の数
- Topdb: 一番大きい帯域からこの dB より下の帯域は、その下限に切り上げる（無音に近い帯域の暴れを防ぐ）
- Fftsize / Nmels / Fmin / Fmax: 中の MelSpectrum と同じ

DCT の表だけは Script CHOP で作る（Nmfcc か Nmels が変わったときに 1 回だけ計算する定数の表）。毎フレームの計算は標準の OP と DotCHOP。

## ダウンロード

[MFCC.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MFCC.tox) [使用例 MFCCExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MFCCExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` |  |
| 出力 0 | CHOP | `out1` |  |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Nmfcc` | Coefficients | Parameter | Int | `20` | 1.0 … 64.0 |
| `Topdb` | Dynamic Range dB | Parameter | Float | `80` | 20.0 … 120.0 |
| `Fftsize` | FFT Size | Parameter | Menu | `2048` | `512` / `1024` / `2048` / `4096` / `8192` |
| `Nmels` | Mel Bands | Parameter | Int | `128` | 8.0 … 256.0 |
| `Fmin` | Min Frequency | Parameter | Float | `0` | 0.0 … 2000.0 |
| `Fmax` | Max Frequency | Parameter | Float | `0` | 0.0 … 24000.0 |

## 使用例

### 3 つの音の MFCC

![3 つの音の MFCC](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-MFCC-example.svg)

220 Hz の正弦波・矩形波とホワイトノイズの MFCC(横軸が係数 c0〜c19)です。左端の c0 は全体の大きさ、c1 以降がスペクトルの形(音色)で、音によって曲線の形が変わります。

ネットワーク: `sine_sound` (audiooscillatorCHOP: `amp=0.5`, `wavetype=sin`, `frequency=220`) → `MFCC` (パレット) → `square_sound` (audiooscillatorCHOP: `amp=0.5`, `wavetype=square`, `frequency=220`) → `MFCC1` (パレット) → `noise_sound` (audiooscillatorCHOP: `amp=0.5`, `wavetype=whitenoise`) → `MFCC2` (パレット) → `sine_curve` (shuffleCHOP: `method=swap`) → `sine` (renameCHOP: `renamefrom=*`, `renameto=sine`) → `square_curve` (shuffleCHOP: `method=swap`) → `square` (renameCHOP: `renamefrom=*`, `renameto=square`) → `noise_curve` (shuffleCHOP: `method=swap`) → `noise` (renameCHOP: `renamefrom=*`, `renameto=noise`) → `curves` (mergeCHOP) → `out1`

[MFCCExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MFCCExample.toe)

??? note "手順(Audio/Spectrum/MFCC.example.py)"

    ```python
    """3 つの音の MFCC

    220 Hz の正弦波・矩形波とホワイトノイズの MFCC(横軸が係数 c0〜c19)です。左端の c0 は全体の大きさ、c1 以降がスペクトルの形(音色)で、音によって曲線の形が変わります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import curves  # noqa: E402

    FRAMES = 30

    def build(ex, tox):
        cases = []
        for label, pars in (("sine", {"wavetype": "sin", "frequency": 220}),
                            ("square", {"wavetype": "square", "frequency": 220}),
                            ("noise", {"wavetype": "whitenoise"})):
            sound = ex.op("audiooscillatorCHOP", name=label + "_sound", amp=0.5, **pars)
            cases.append((label, ex.palette(tox, sound)))
        curves(ex, cases)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

## 出典・参考

- S. B. Davis, P. Mermelstein (1980). [Comparison of parametric representations for monosyllabic word recognition in continuously spoken sentences](https://doi.org/10.1109/TASSP.1980.1163420). IEEE Trans. Acoustics, Speech, and Signal Processing 28(4), 357-366. — MFCC（メル帯域の対数エネルギーの DCT）のもとの論文
- B. McFee, C. Raffel, D. Liang, D. P. W. Ellis, M. McVicar, E. Battenberg, O. Nieto (2015). [librosa: Audio and Music Signal Analysis in Python](https://doi.org/10.25080/Majora-7b98e3ed-003). Proc. 14th Python in Science Conference, 18-25. — 計算方法と既定値（librosa.feature.mfcc と同じ値になるようにしてある）
- A. Wright, G. Dal Santo, S. J. Schlecht (2026). [Predicting Subjective Ratings of Guitar Amplifier Emulations](https://doi.org/10.17743/jaes.2026.0304). J. Audio Eng. Soc. 74(10), 762-772. — MFCC の差が聴いたときの音色の違いによく合うこと

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

32 個のオペレータ。sha256: `07c5e8588ff86f37…`
