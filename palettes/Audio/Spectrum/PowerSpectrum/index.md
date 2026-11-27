<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/PowerSpectrum/ -->

# PowerSpectrum

`Audio/Spectrum` フォルダのパレットです。

## 説明

各サンプルの 2 乗 |x|²（振幅スペクトル → パワースペクトル）。

入力: in1 CHOP
出力: out1 同じ形（0 以上）

## ダウンロード

[PowerSpectrum.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/PowerSpectrum.tox) [使用例 PowerSpectrumExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/PowerSpectrumExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## 使用例

### 振幅スペクトルをパワーに

![振幅スペクトルをパワーに](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-PowerSpectrum-example.svg)

440 Hz と 1000 Hz の正弦波を混ぜた音の振幅スペクトルを、2 乗してパワースペクトルにした例です。山が鋭くなります。

ネットワーク: `a440` (audiooscillatorCHOP: `frequency=440`, `amp=0.5`) → `a1000` (audiooscillatorCHOP: `frequency=1000`, `amp=0.3`) → `mix` (mathCHOP: `chopop=add`) → `in0` (audiospectrumCHOP: `frequencylog=0`) → `PowerSpectrum` (パレット) → `out1`

[PowerSpectrumExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/PowerSpectrumExample.toe)

??? note "手順(Audio/Spectrum/PowerSpectrum.example.py)"

    ```python
    """振幅スペクトルをパワーに

    440 Hz と 1000 Hz の正弦波を混ぜた音の振幅スペクトルを、2 乗してパワースペクトルにした例です。山が鋭くなります。
    """

    def build(ex, tox):
        a = ex.op("audiooscillatorCHOP", name="a440", frequency=440, amp=0.5)
        b = ex.op("audiooscillatorCHOP", name="a1000", frequency=1000, amp=0.3)
        mix = ex.op("mathCHOP", name="mix", input=[a, b], chopop="add")
        spect = ex.input("audiospectrumCHOP", input=mix, frequencylog=0)
        ex.palette(tox, spect)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

6 個のオペレータ。sha256: `9c5f16d644f46bac…`
