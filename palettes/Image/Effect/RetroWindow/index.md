<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/RetroWindow/ -->

# RetroWindow

`Image/Effect` フォルダのパレットです。

## 説明

画像を昔のパソコン風のウィンドウの枠に入れる。角の丸い青いタイトルバーの枠と、右上の赤い閉じるボタン（×）を重ねる。

入力: in1 画像 TOP（ウィンドウの中身）
出力: out1 同じ解像度の画像

## ダウンロード

[RetroWindow.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/RetroWindow.tox) [使用例 RetroWindowExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/RetroWindowExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |

## 使用例

### ウィンドウの中のバナナ

![ウィンドウの中のバナナ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-RetroWindow-example.png)

バナナの画像を RetroWindow に入れた例です。中身は流れるノイズや映像でも構いません。

ネットワーク: `in0` (moviefileinTOP) → `RetroWindow` (パレット) → `out1`

[RetroWindowExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/RetroWindowExample.toe)

??? note "手順(Image/Effect/RetroWindow.example.py)"

    ```python
    """ウィンドウの中のバナナ

    バナナの画像を RetroWindow に入れた例です。中身は流れるノイズや映像でも構いません。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        ex.palette(tox, img)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

12 個のオペレータ。sha256: `cb3f7276c429b826…`
