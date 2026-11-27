<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/ShiftRGB/ -->

# ShiftRGB

`Image/Effect` フォルダのパレットです。

## 説明

RGB を別々にずらして重ねる（色収差・RGB ずれのグリッチ）。R・G・B をそれぞれ Shift の x, y だけ平行移動し、z を強さとして掛けてから加算合成する。

入力: in1 画像 TOP
出力: out1 同じ解像度の画像

パラメータ

- ShiftR / ShiftG / ShiftB (x, y, z): その色の移動量 x, y（Transform TOP の translate 単位）と強さ z（既定 1）

## ダウンロード

[ShiftRGB.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ShiftRGB.tox) [使用例 ShiftRGBExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ShiftRGBExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Shiftrx` | ShiftR | Parameters | XYZW | `0` | -1.0 … 1.0 |
| `Shiftry` | ShiftR | Parameters | XYZW | `0` | -1.0 … 1.0 |
| `Shiftrz` | ShiftR | Parameters | XYZW | `1` | 0.0 … 1.0 |
| `Shiftgx` | ShiftG | Parameters | XYZW | `0` | -1.0 … 1.0 |
| `Shiftgy` | ShiftG | Parameters | XYZW | `0` | -1.0 … 1.0 |
| `Shiftgz` | ShiftG | Parameters | XYZW | `1` | 0.0 … 1.0 |
| `Shiftbx` | ShiftB | Parameters | XYZW | `0` | -1.0 … 1.0 |
| `Shiftby` | ShiftB | Parameters | XYZW | `0` | -1.0 … 1.0 |
| `Shiftbz` | ShiftB | Parameters | XYZW | `1` | 0.0 … 1.0 |

## 使用例

### バナナの色収差

![バナナの色収差](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-ShiftRGB-example.png)

R を右上に、B を左下にずらして重ねた例です。Shift の z は色ごとの強さです。

ネットワーク: `in0` (moviefileinTOP) → `ShiftRGB` (パレット: `Shiftr=[0.015, 0.008, 1]`, `Shiftb=[-0.015, -0.008, 1]`) → `out1`

[ShiftRGBExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ShiftRGBExample.toe)

??? note "手順(Image/Effect/ShiftRGB.example.py)"

    ```python
    """バナナの色収差

    R を右上に、B を左下にずらして重ねた例です。Shift の z は色ごとの強さです。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        ex.palette(tox, img, Shiftr=(0.015, 0.008, 1), Shiftb=(-0.015, -0.008, 1))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

14 個のオペレータ。sha256: `ce85fa0e7bae8878…`
