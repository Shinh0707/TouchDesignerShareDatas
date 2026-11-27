<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralFlatness/ -->

# SpectralFlatness

`Audio/Spectrum` フォルダのパレットです。

## 説明

スペクトル平坦度（ノイズらしさ）。エネルギー E_k = |X_k|² の幾何平均 ÷ 算術平均で、0（純音・音程感が強い）〜1（ホワイトノイズ）。E_k は 1e-4 で下限クランプ。

入力: なし（Audiospect で Audio Spectrum CHOP を参照）
出力: out1 1 サンプル（チャンネルごと）: 0〜1

パラメータ

- Audiospect: Audio Spectrum CHOP

## ダウンロード

[SpectralFlatness.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralFlatness.tox) [使用例 SpectralFlatnessExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralFlatnessExample.toe)

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

### 純音とノイズの平坦度

![純音とノイズの平坦度](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-SpectralFlatness-example.svg)

正弦波とホワイトノイズのスペクトルを Audiospect で参照して比べた例です。純音は 0 に近く、ノイズは大きくなります。

ネットワーク: `audioosci1` (audiooscillatorCHOP: `wavetype=sin`, `frequency=440`) → `audioosci2` (audiooscillatorCHOP: `wavetype=whitenoise`) → `audiospect1` (audiospectrumCHOP) → `audiospect2` (audiospectrumCHOP) → `SpectralFlatness` (パレット: `Audiospect=audiospect1`) → `SpectralFlatness1` (パレット: `Audiospect=audiospect2`) → `tone` (renameCHOP: `renamefrom=*`, `renameto=tone`) → `noise` (renameCHOP: `renamefrom=*`, `renameto=noise`) → `merge1` (mergeCHOP) → `out1`

[SpectralFlatnessExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralFlatnessExample.toe)

??? note "手順(Audio/Spectrum/SpectralFlatness.example.py)"

    ```python
    """純音とノイズの平坦度

    正弦波とホワイトノイズのスペクトルを Audiospect で参照して比べた例です。純音は 0 に近く、ノイズは大きくなります。
    """

    def build(ex, tox):
        tone = ex.source("audiooscillatorCHOP", wavetype="sin", frequency=440)
        noise = ex.source("audiooscillatorCHOP", wavetype="whitenoise")
        ts = ex.source("audiospectrumCHOP", input=tone)
        ns = ex.source("audiospectrumCHOP", input=noise)
        a = ex.palette(tox, Audiospect=ts)
        b = ex.palette(tox, Audiospect=ns)
        ra = ex.op("renameCHOP", name="tone", input=a, renamefrom="*", renameto="tone")
        rb = ex.op("renameCHOP", name="noise", input=b, renamefrom="*", renameto="noise")
        ex.out(ex.op("mergeCHOP", input=[ra, rb]))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

16 個のオペレータ。sha256: `fc5ba89c5d276c07…`
