<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralSlope/ -->

# SpectralSlope

`Audio/Spectrum` フォルダのパレットです。

## 説明

スペクトル傾斜。横軸 log2(f)（xk）、縦軸 dB（yk）の最小二乗直線の傾きを dB/オクターブで出す。負に大きいほど高域が弱い（暗い音）。

入力: なし（Audiospect で Audio Spectrum CHOP を参照）
出力: out1 1 サンプル（チャンネルごと）: dB/oct

パラメータ

- Audiospect: Audio Spectrum CHOP

## ダウンロード

[SpectralSlope.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralSlope.tox) [使用例 SpectralSlopeExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralSlopeExample.toe)

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

### 音の暗さ・明るさの傾き

![音の暗さ・明るさの傾き](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-SpectralSlope-example.svg)

正弦波・三角波・矩形波・ホワイトノイズ(どれも 220 Hz)のスペクトル傾斜(dB/オクターブ)を比べた例です。高い倍音が弱い音ほど負に大きく(暗く)、ノイズは 0 に近くなります。

ネットワーク: `sin_sound` (audiooscillatorCHOP: `wavetype=sin`, `frequency=220`) → `BaseAudioSpect` (パレット) → `SpectralSlope1` (パレット: `Audiospect=audiospect1`) → `sin` (renameCHOP: `renamefrom=*`, `renameto=sin`) → `tri_sound` (audiooscillatorCHOP: `wavetype=tri`, `frequency=220`) → `BaseAudioSpect1` (パレット) → `SpectralSlope2` (パレット: `Audiospect=audiospect1`) → `tri` (renameCHOP: `renamefrom=*`, `renameto=tri`) → `square_sound` (audiooscillatorCHOP: `wavetype=square`, `frequency=220`) → `BaseAudioSpect2` (パレット) → `SpectralSlope3` (パレット: `Audiospect=audiospect1`) → `square` (renameCHOP: `renamefrom=*`, `renameto=square`) → `whitenoise_sound` (audiooscillatorCHOP: `wavetype=whitenoise`, `frequency=220`) → `BaseAudioSpect3` (パレット) → `SpectralSlope4` (パレット: `Audiospect=audiospect1`) → `whitenoise` (renameCHOP: `renamefrom=*`, `renameto=whitenoise`) → `results` (mergeCHOP) → `out1`

[SpectralSlopeExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralSlopeExample.toe)

??? note "手順(Audio/Spectrum/SpectralSlope.example.py)"

    ```python
    """音の暗さ・明るさの傾き

    正弦波・三角波・矩形波・ホワイトノイズ(どれも 220 Hz)のスペクトル傾斜(dB/オクターブ)を比べた例です。高い倍音が弱い音ほど負に大きく(暗く)、ノイズは 0 に近くなります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import compare_spectra  # noqa: E402

    def build(ex, tox):
        compare_spectra(ex, tox, [(w, {"wavetype": w, "frequency": 220}) for w in ("sin", "tri", "square", "whitenoise")])
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

53 個のオペレータ。sha256: `07b1df782918a666…`
