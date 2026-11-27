<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/ScanLine/ -->

# ScanLine

`Image/Effect` フォルダのパレットです。

## 説明

ブラウン管風の走査線。黒から白への縦のグラデーションを細かく繰り返した縞を、画像に掛け合わせる。Time で縞の明暗を入れ替える（毎フレーム 0 と 1 を切り替えると、ちらつく走査線になる）。

入力: in1 画像 TOP
出力: out1 同じ解像度の画像

パラメータ

- Time: 0 と 1 で縞の明暗を入れ替える

## ダウンロード

[ScanLine.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ScanLine.tox) [使用例 ScanLineExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ScanLineExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Time` | Time | Parameter | Float | `0` | 0.0 … 1.0 |

## 使用例

### ブラウン管風の走査線

![ブラウン管風の走査線](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-ScanLine-example.png)

バナナの画像に走査線を掛けた例です。Time に absTime.frame % 2 のような式を入れると、毎フレーム縞が入れ替わってちらつきます。

ネットワーク: `in0` (moviefileinTOP) → `ScanLine` (パレット) → `out1`

[ScanLineExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ScanLineExample.toe)

??? note "手順(Image/Effect/ScanLine.example.py)"

    ```python
    """ブラウン管風の走査線

    バナナの画像に走査線を掛けた例です。Time に absTime.frame % 2 のような式を入れると、毎フレーム縞が入れ替わってちらつきます。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        ex.palette(tox, img)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

9 個のオペレータ。sha256: `64848580445eaa89…`
