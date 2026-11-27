<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/LogRemap/ -->

# LogRemap

`Audio/Spectrum` フォルダのパレットです。

## 説明

サンプルの横軸を対数にとり直す（等間隔の周波数ビン → 対数の周波数軸）。出力の横位置 t (0〜1) が元の列の位置 Minratio^(1 − t) に対応するので、低い側が引き伸ばされ、1 オクターブがどこでも同じ幅になる。

入力: in1 CHOP（スペクトルなど）
出力: out1 同じ長さの、横軸を対数にした列（右端 = 元の右端、左端 = 元の長さ × Minratio の位置）

パラメータ

- Min Ratio: 左端に来る位置（元の長さに対する割合、既定 0.001。上端 22 kHz なら約 22 Hz）

## ダウンロード

[LogRemap.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/LogRemap.tox) [使用例 LogRemapExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/LogRemapExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Minratio` | Min Ratio | LogRemap | Float | `0.001` | 0.0001 … 0.1 |

## 使用例

### 横軸を対数に

![横軸を対数に](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Audio-Spectrum-LogRemap-example.svg)

110 Hz と 880 Hz の音のスペクトル(Audio Spectrum CHOP の Frequency Log を 0 にした、等間隔の周波数ビン)を、対数の周波数軸にとり直した例です。

Min Ratio 0.001 では 1 オクターブが出力の幅のおよそ 1/10 になります。3 オクターブ離れた 2 つの山は、元の列では幅の 0.5% と 4% の位置に詰まっていますが、出力では 0.22 と 0.53 の位置に離れて並びます。

ネットワーク: `a110` (audiooscillatorCHOP: `frequency=110`, `amp=0.5`) → `a880` (audiooscillatorCHOP: `frequency=880`, `amp=0.3`) → `mix` (mathCHOP: `chopop=add`) → `in0` (audiospectrumCHOP: `frequencylog=0`) → `LogRemap` (パレット) → `out1`

[LogRemapExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/LogRemapExample.toe)

??? note "手順(Audio/Spectrum/LogRemap.example.py)"

    ```python
    """横軸を対数に

    110 Hz と 880 Hz の音のスペクトル(Audio Spectrum CHOP の Frequency Log を 0 にした、等間隔の周波数ビン)を、対数の周波数軸にとり直した例です。

    Min Ratio 0.001 では 1 オクターブが出力の幅のおよそ 1/10 になります。3 オクターブ離れた 2 つの山は、元の列では幅の 0.5% と 4% の位置に詰まっていますが、出力では 0.22 と 0.53 の位置に離れて並びます。
    """

    def build(ex, tox):
        a = ex.op("audiooscillatorCHOP", name="a110", frequency=110, amp=0.5)
        b = ex.op("audiooscillatorCHOP", name="a880", frequency=880, amp=0.3)
        mix = ex.op("mathCHOP", name="mix", input=[a, b], chopop="add")
        spect = ex.input("audiospectrumCHOP", input=mix, frequencylog=0)
        ex.palette(tox, spect)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

7 個のオペレータ。sha256: `39a7b04d25ca1cb5…`
