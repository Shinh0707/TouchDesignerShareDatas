<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/F0/ -->

# F0

`Audio/Pitch` フォルダのパレットです。

## 説明

基本周波数（音の高さ）を Hz で推定する。参照したスペクトルの上で、Fmin〜Fmax の候補ごとに、その 1〜12 倍の位置の振幅（平方根で圧縮）を、高い倍音ほど小さい重み（0.84 ずつ）で足し合わせ（subharmonic summation、Hermes 1988）、一番大きい候補を選ぶ。倍音が平らな音（細いパルス波）で整数倍の候補と同点に近いときは、自分の位置にもエネルギーがある一番低い候補をとる。最後に、その候補のはじめの倍音のスペクトルのピークを放物線補間して、細かい値を出す。

入力: なし（Audiospect で Audio Spectrum CHOP を参照）
出力: out1 1 サンプル（チャンネルごと）: F0 Hz（無音なら 0）

パラメータ

- Audiospect: Audio Spectrum CHOP（BaseAudioSpect の Out など。線形周波数、FFT サイズの半分の長さ）
- Fmin / Fmax: 探す音の高さの範囲 Hz（既定 20〜500）

純音（sine）、三角波、矩形波、ノコギリ波、パルス波の 50〜1000 Hz で、誤差は 0.05% 以内（FFT 8192、44.1 kHz）。基本周波数の成分が無い音（倍音だけの音）では、いちばん低い倍音の高さを返すことがある。

## ダウンロード

[F0.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0.tox) [使用例 F0Example.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0Example.toe)

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

### 音の高さを推定する

![音の高さを推定する](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Pitch-F0-example.svg)

正弦波 110 Hz、三角波 262 Hz、矩形波 330 Hz、パルス波 98 Hz の基本周波数(Hz)を推定した例です。

倍音の無い正弦波も、奇数次の倍音だけの矩形波も、倍音が平らに並ぶパルス波も、それぞれの高さになります(誤差 0.05% 以内)。

ネットワーク: `sin110_sound` (audiooscillatorCHOP: `wavetype=sin`, `frequency=110`) → `BaseAudioSpect` (パレット) → `F0` (パレット: `Audiospect=audiospect1`) → `sin110` (renameCHOP: `renamefrom=*`, `renameto=sin110`) → `tri262_sound` (audiooscillatorCHOP: `wavetype=tri`, `frequency=262`) → `BaseAudioSpect1` (パレット) → `F1` (パレット: `Audiospect=audiospect1`) → `tri262` (renameCHOP: `renamefrom=*`, `renameto=tri262`) → `square330_sound` (audiooscillatorCHOP: `wavetype=square`, `frequency=330`) → `BaseAudioSpect2` (パレット) → `F2` (パレット: `Audiospect=audiospect1`) → `square330` (renameCHOP: `renamefrom=*`, `renameto=square330`) → `pulse98_sound` (audiooscillatorCHOP: `wavetype=pulse`, `frequency=98`) → `BaseAudioSpect3` (パレット) → `F3` (パレット: `Audiospect=audiospect1`) → `pulse98` (renameCHOP: `renamefrom=*`, `renameto=pulse98`) → `results` (mergeCHOP) → `out1`

[F0Example.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0Example.toe)

??? note "手順(Audio/Pitch/F0.example.py)"

    ```python
    """音の高さを推定する

    正弦波 110 Hz、三角波 262 Hz、矩形波 330 Hz、パルス波 98 Hz の基本周波数(Hz)を推定した例です。

    倍音の無い正弦波も、奇数次の倍音だけの矩形波も、倍音が平らに並ぶパルス波も、それぞれの高さになります(誤差 0.05% 以内)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import compare_spectra  # noqa: E402

    def build(ex, tox):
        compare_spectra(ex, tox, [("sin110", {"wavetype": "sin", "frequency": 110}),
                                  ("tri262", {"wavetype": "tri", "frequency": 262}),
                                  ("square330", {"wavetype": "square", "frequency": 330}),
                                  ("pulse98", {"wavetype": "pulse", "frequency": 98})])
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## 出典・参考

- D. J. Hermes (1988). [Measurement of pitch by subharmonic summation](https://doi.org/10.1121/1.396427). J. Acoust. Soc. Am. 83(1), 257-264. — 方法（subharmonic summation。倍音の位置の振幅を重みをつけて足し合わせる）

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

7 個のオペレータ。sha256: `ff0a50fae6b4f535…`
