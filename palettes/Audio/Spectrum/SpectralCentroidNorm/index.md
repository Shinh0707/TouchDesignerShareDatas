<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralCentroidNorm/ -->

# SpectralCentroidNorm

`Audio/Spectrum` フォルダのパレットです。

## 説明

スペクトル重心をナイキスト周波数で割って 0〜1 に正規化したもの: (Σ E_k f_k / Σ E_k) / (fs/2)、E_k = |X_k|²。0 = 低域だけ、1 = ナイキスト付近。サンプルレートが違っても同じ尺度で比べられる。

入力: なし（Audiospect で Audio Spectrum CHOP を参照）
出力: out1 1 サンプル（チャンネルごと）: 0〜1

パラメータ

- Audiospect: Audio Spectrum CHOP

## ダウンロード

[SpectralCentroidNorm.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralCentroidNorm.tox) [使用例 SpectralCentroidNormExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralCentroidNormExample.toe)

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

![低い音・高い音・ノイズの明るさ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-SpectralCentroidNorm-example.svg)

220 Hz と 3000 Hz の正弦波、ホワイトノイズのスペクトル重心をナイキスト周波数で割った値(0〜1)を比べた例です。

ネットワーク: `low_sound` (audiooscillatorCHOP: `frequency=220`) → `BaseAudioSpect` (パレット) → `SpectralCentroidNorm` (パレット: `Audiospect=audiospect1`) → `low` (renameCHOP: `renamefrom=*`, `renameto=low`) → `high_sound` (audiooscillatorCHOP: `frequency=3000`) → `BaseAudioSpect1` (パレット) → `SpectralCentroidNorm1` (パレット: `Audiospect=audiospect1`) → `high` (renameCHOP: `renamefrom=*`, `renameto=high`) → `noise_sound` (audiooscillatorCHOP: `wavetype=whitenoise`) → `BaseAudioSpect2` (パレット) → `SpectralCentroidNorm2` (パレット: `Audiospect=audiospect1`) → `noise` (renameCHOP: `renamefrom=*`, `renameto=noise`) → `results` (mergeCHOP) → `out1`

[SpectralCentroidNormExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralCentroidNormExample.toe)

??? note "手順(Audio/Spectrum/SpectralCentroidNorm.example.py)"

    ```python
    """低い音・高い音・ノイズの明るさ

    220 Hz と 3000 Hz の正弦波、ホワイトノイズのスペクトル重心をナイキスト周波数で割った値(0〜1)を比べた例です。
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

19 個のオペレータ。sha256: `9eaf3e560b0f617b…`
