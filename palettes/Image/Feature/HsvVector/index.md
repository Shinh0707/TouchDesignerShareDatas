<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Feature/HsvVector/ -->

# HsvVector

`Image/Feature` フォルダのパレットです。

## 説明

画像を HSV にして、各画素を円錐の座標 (s·v·cos h, s·v·sin h, v) にした点の列を CHOP（x, y, z）で出す。色の分布を 3D の点群で見せる・比べるのに使う。Resolution に縮めてから、全画素を点にする（既定 160×90 = 14400 点）。

入力: in1 画像 TOP
出力: out1 CHOP（x, y, z × Resolution の画素数）

パラメータ

- Resolution: 先に縮める解像度
- Roughness: 出力 CHOP のサンプルレートの倍率（プロジェクトのフレームレート × Roughness）。点の数は変わらない
- Outsize: 使われていない（Resolution の画素数 ÷ Roughness の式が入っているだけ）

## ダウンロード

[HsvVector.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Feature/HsvVector.tox) [使用例 HsvVectorExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Feature/HsvVectorExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | CHOP | `out1` | Vector / x y z |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Outsize` | Outsize | Parameters | Int | `0` | 0.0 … 1.0 |
| `Roughness` | Roughness | Parameters | Float | `1` | 1.0 … 5.0 |
| `Resolutionw` | Resolution | Parameters | WH | `258` | 1.0 … 1240.0 |
| `Resolutionh` | Resolution | Parameters | WH | `258` | 1.0 … 780.0 |

## 使用例

### 色の円錐の座標

![色の円錐の座標](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Feature-HsvVector-example.svg)

バナナの画像の各画素を、HSV の円錐の座標 (s·v·cos h, s·v·sin h, v) にした例です(既定の 160 × 90 = 14400 点)。x, y が色相と鮮やかさ、z が明るさです。

ネットワーク: `in0` (moviefileinTOP) → `HsvVector` (パレット) → `out1`

[HsvVectorExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Feature/HsvVectorExample.toe)

??? note "手順(Image/Feature/HsvVector.example.py)"

    ```python
    """色の円錐の座標

    バナナの画像の各画素を、HSV の円錐の座標 (s·v·cos h, s·v·sin h, v) にした例です(既定の 160 × 90 = 14400 点)。x, y が色相と鮮やかさ、z が明るさです。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        ex.palette(tox, img)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

17 個のオペレータ。sha256: `624a38c23668e535…`
