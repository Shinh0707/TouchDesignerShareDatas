<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Sobel/ -->

# Sobel

`Image/Filter` フォルダのパレットです。

## 説明

Sobel フィルタで縁（明るさの勾配）を出す。Sobelx で横方向の勾配 Gx、Sobely で縦方向の勾配 Gy、両方オンで縁の強さ |Gx| + |Gy|（向きによらず全部の縁）。どちらもオフなら入力をそのまま通す。32 bit float で計算するので、片方だけのときは符号付き（暗くなる側の縁は負）で、白黒の段差 1 に対して ±4（両方で最大 8）になる。

入力: in1 画像 TOP
出力: out1 同じ解像度の画像（32 bit float、アルファ 1）

パラメータ

- Sobelx / Sobely: 横 / 縦の勾配を出すか（両方オンで |Gx| + |Gy|）
- Flipx / Flipy: 片方だけのときの符号を反転するか

## ダウンロード

[Sobel.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/Sobel.tox) [使用例 SobelExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/SobelExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image / Gx、Gy（符号付き）または \|Gx\|+\|Gy\| |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Sobelx` | SobelX | Parameter | Toggle | `False` |  |
| `Flipx` | FlipX | Parameter | Toggle | `False` |  |
| `Sobely` | SobelY | Parameter | Toggle | `False` |  |
| `Flipy` | FlipY | Parameter | Toggle | `False` |  |

## 使用例

### バナナの輪郭

![バナナの輪郭](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Filter-Sobel-example.png)

Sobelx と Sobely を両方オンにして、向きによらない縁の強さ |Gx| + |Gy| を出した例です。値が大きいので Level TOP で 0.6 倍にしています。

ネットワーク: `in0` (moviefileinTOP) → `Sobel` (パレット: `Sobelx=True`, `Sobely=True`) → `level1` (levelTOP: `brightness1=0.6`) → `out1`

[SobelExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/SobelExample.toe)

??? note "手順(Image/Filter/Sobel.example.py)"

    ```python
    """バナナの輪郭

    Sobelx と Sobely を両方オンにして、向きによらない縁の強さ |Gx| + |Gy| を出した例です。値が大きいので Level TOP で 0.6 倍にしています。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        edges = ex.palette(tox, img, Sobelx=True, Sobely=True)
        ex.out(ex.op("levelTOP", input=edges, brightness1=0.6))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

18 個のオペレータ。sha256: `f4b58f108df7cf56…`
