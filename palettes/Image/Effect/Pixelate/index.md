<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/Pixelate/ -->

# Pixelate

`Image/Effect` フォルダのパレットです。

## 説明

モザイク（ピクセル化）。画像を (1 − Rate) 倍の解像度に最近傍で縮めてから、元の解像度に最近傍で戻すので、四角いブロックになる。Mix で元の画像と混ぜる。

入力: in1 画像 TOP
出力: out1 同じ解像度の画像

パラメータ

- Rate: 粗さ（0 でそのまま、1 に近いほど大きなブロック。既定 0.5 で 2 px 四方）
- Mix: モザイクの割合（0 で元の画像、1 でモザイクだけ）

## ダウンロード

[Pixelate.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/Pixelate.tox) [使用例 PixelateExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/PixelateExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Rate` | Rate | Parameter | Float | `0.5` | 0.0 … 1.0 |
| `Mix` | Mix | Parameter | Float | `1` | 0.0 … 1.0 |

## 使用例

### バナナのモザイク

![バナナのモザイク](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-Pixelate-example.png)

Rate=0.96 で 1/25 の解像度に縮めてから戻した例です。25 px 四方のブロックになります。Mix を下げると元の画像と混ざります。

ネットワーク: `in0` (moviefileinTOP) → `Pixelate` (パレット: `Rate=0.96`) → `out1`

[PixelateExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/PixelateExample.toe)

??? note "手順(Image/Effect/Pixelate.example.py)"

    ```python
    """バナナのモザイク

    Rate=0.96 で 1/25 の解像度に縮めてから戻した例です。25 px 四方のブロックになります。Mix を下げると元の画像と混ざります。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        ex.palette(tox, img, Rate=0.96)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

6 個のオペレータ。sha256: `f6663cf5b19da213…`
