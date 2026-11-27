<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/PSGRatio/ -->

# PSGRatio

`Audio/Pitch` フォルダのパレットです。

## 説明

倍音のうち奇数次の占める割合（矩形波・PSG らしさ）。F0 を推定し、スペクトルの各ビンが何次の倍音に近いかを求めて、奇数次と偶数次のエネルギー |X|² を合計し、奇数比 r = 奇数 / (奇数 + 偶数) を 2r − 1 に変換して出す（−1〜1）。1 = 奇数倍音だけ（矩形波・三角波）、のこぎり波で約 0.5、倍音が均等な細いパルスで約 0。

倍音に数える幅は次数の 3%（F0 の誤差は次数倍に広がるため）で、最低 1.5 ビン、最大で倍音間隔の 1/4。ビン幅はスペクトルから計算するので、FFT サイズや出力の長さに依らない。

入力: なし（Audiospect で Audio Spectrum CHOP を参照）
出力: out1 1 サンプル（チャンネルごと）: −1〜1

パラメータ

- Audiospect: Audio Spectrum CHOP（BaseAudioSpect の Out など）
- Fmin / Fmax: F0 を探す範囲 Hz（既定 50〜440）

注意: F0 の推定が外れる音（F0 の既知の制限）では値も外れる。tests に波形ごとのテストあり。

## ダウンロード

[PSGRatio.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/PSGRatio.tox) [使用例 PSGRatioExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/PSGRatioExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | CHOP | `out1` |  |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Audiospect` | Audiospect | Parameter | CHOP |  |  |
| `Fmin` | Fmin | Parameter | Float | `20` | 0.0 … 22000.0 |
| `Fmax` | Fmax | Parameter | Float | `500` | 0.0 … 22000.0 |

## 使用例

### 矩形波らしさ

![矩形波らしさ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Pitch-PSGRatio-example.svg)

220 Hz の矩形波・三角波(奇数次の倍音だけ)と、のこぎり波(全部の倍音)の、奇数次の倍音の割合(2r − 1、−1〜1)を比べた例です。矩形波・三角波は 1、のこぎり波は約 0.4〜0.5 になります。中で F0 を推定するので、F0 が外れる音(正弦波など)では値も外れます。

ネットワーク: `square_sound` (audiooscillatorCHOP: `wavetype=square`, `frequency=220`) → `BaseAudioSpect` (パレット) → `PSGRatio` (パレット: `Audiospect=audiospect1`) → `square` (renameCHOP: `renamefrom=*`, `renameto=square`) → `saw_sound` (audiooscillatorCHOP: `wavetype=ramp`, `frequency=220`) → `BaseAudioSpect1` (パレット) → `PSGRatio1` (パレット: `Audiospect=audiospect1`) → `saw` (renameCHOP: `renamefrom=*`, `renameto=saw`) → `triangle_sound` (audiooscillatorCHOP: `wavetype=tri`, `frequency=220`) → `BaseAudioSpect2` (パレット) → `PSGRatio2` (パレット: `Audiospect=audiospect1`) → `triangle` (renameCHOP: `renamefrom=*`, `renameto=triangle`) → `results` (mergeCHOP) → `out1`

[PSGRatioExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/PSGRatioExample.toe)

??? note "手順(Audio/Pitch/PSGRatio.example.py)"

    ```python
    """矩形波らしさ

    220 Hz の矩形波・三角波(奇数次の倍音だけ)と、のこぎり波(全部の倍音)の、奇数次の倍音の割合(2r − 1、−1〜1)を比べた例です。矩形波・三角波は 1、のこぎり波は約 0.4〜0.5 になります。中で F0 を推定するので、F0 が外れる音(正弦波など)では値も外れます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import compare_spectra  # noqa: E402

    def build(ex, tox):
        compare_spectra(ex, tox, [("square", {"wavetype": "square", "frequency": 220}),
                                  ("saw", {"wavetype": "ramp", "frequency": 220}),
                                  ("triangle", {"wavetype": "tri", "frequency": 220})])
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

46 個のオペレータ。sha256: `e3d4c207a34aa010…`
