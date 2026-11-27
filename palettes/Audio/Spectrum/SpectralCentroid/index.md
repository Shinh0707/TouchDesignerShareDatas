<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralCentroid/ -->

# SpectralCentroid

`Audio/Spectrum` フォルダのパレットです。

## 説明

スペクトル重心（明るさの指標）を Hz で出す。重心 = Σ E_k f_k / Σ E_k、E_k = |X_k|²。高域成分が多いほど大きい。

入力: なし（Audiospect で Audio Spectrum CHOP を参照）
出力: out1 1 サンプル（スペクトルのチャンネルごと）: 重心周波数 Hz

パラメータ

- Audiospect: Audio Spectrum CHOP

## ダウンロード

[SpectralCentroid.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralCentroid.tox) [使用例 SpectralCentroidExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralCentroidExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | CHOP | `out1` |  |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Audiospect` | Audiospect | Parameter | CHOP |  |  |

## 使用例

### 低い音・高い音・ノイズの明るさ

![低い音・高い音・ノイズの明るさ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-SpectralCentroid-example.svg)

220 Hz と 3000 Hz の正弦波、ホワイトノイズのスペクトル重心(Hz)を比べた例です。純音ではその周波数に近く、ノイズは高くなります。

ネットワーク: `low_sound` (audiooscillatorCHOP: `frequency=220`) → `BaseAudioSpect` (パレット) → `SpectralCentroid` (パレット: `Audiospect=audiospect1`) → `low` (renameCHOP: `renamefrom=*`, `renameto=low`) → `high_sound` (audiooscillatorCHOP: `frequency=3000`) → `BaseAudioSpect1` (パレット) → `SpectralCentroid1` (パレット: `Audiospect=audiospect1`) → `high` (renameCHOP: `renamefrom=*`, `renameto=high`) → `noise_sound` (audiooscillatorCHOP: `wavetype=whitenoise`) → `BaseAudioSpect2` (パレット) → `SpectralCentroid2` (パレット: `Audiospect=audiospect1`) → `noise` (renameCHOP: `renamefrom=*`, `renameto=noise`) → `results` (mergeCHOP) → `out1`

[SpectralCentroidExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralCentroidExample.toe)

??? note "手順(Audio/Spectrum/SpectralCentroid.example.py)"

    ```python
    """低い音・高い音・ノイズの明るさ

    220 Hz と 3000 Hz の正弦波、ホワイトノイズのスペクトル重心(Hz)を比べた例です。純音ではその周波数に近く、ノイズは高くなります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import compare_spectra  # noqa: E402

    def build(ex, tox):
        compare_spectra(ex, tox, [("low", {"frequency": 220}), ("high", {"frequency": 3000}),
                                  ("noise", {"wavetype": "whitenoise"})])
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

18 個のオペレータ。sha256: `dd93816db1d70619…`
