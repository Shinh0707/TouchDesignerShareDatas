<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/LimitMagnitudeRGB/ -->

# LimitMagnitudeRGB

`Image/Math` フォルダのパレットです。

## 説明

RGB ベクトルの長さを Magnitude 以下に抑える（長いものだけ向きを保って Magnitude に縮め、短いものはそのまま）。力や速度の上限に使う。

入力: in1 TOP（RGB = ベクトル）
出力: out1 長さを抑えた RGB

パラメータ

- Magnitude: 長さの上限

## ダウンロード

[LimitMagnitudeRGB.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/LimitMagnitudeRGB.tox) [使用例 LimitMagnitudeRGBExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/LimitMagnitudeRGBExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Data |
| 出力 0 | TOP | `out1` | Data |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Magnitude` | TargetMagnitude | Parameter | Float | `1` | 1.0 … 3.0 |

## 使用例

### RGB の長さに上限

![RGB の長さに上限](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Math-LimitMagnitudeRGB-example.png)

色のノイズの RGB の長さを 0.6 以下に抑えた例です。長い(明るい)画素だけが向きを保って縮み、暗い画素はそのままです。

ネットワーク: `in0` (noiseTOP: `resolutionw=256`, `resolutionh=144`, `mono=False`) → `LimitMagnitudeRGB` (パレット: `Magnitude=0.6`) → `out1`

[LimitMagnitudeRGBExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/LimitMagnitudeRGBExample.toe)

??? note "手順(Image/Math/LimitMagnitudeRGB.example.py)"

    ```python
    """RGB の長さに上限

    色のノイズの RGB の長さを 0.6 以下に抑えた例です。長い(明るい)画素だけが向きを保って縮み、暗い画素はそのままです。
    """

    def build(ex, tox):
        a = ex.input("noiseTOP", resolutionw=256, resolutionh=144, mono=False)
        ex.palette(tox, a, Magnitude=0.6)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

31 個のオペレータ。sha256: `02ef0f562f918517…`
