<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/BlockDCT/ -->

# BlockDCT

`Image/Compression` フォルダのパレットです。

## 説明

画像のブロック DCT（離散コサイン変換）と、その逆変換。画像を Block × Block 画素のブロックに分け、ブロックごとに 2 次元の DCT-II（直交）をかける。JPEG や動画の圧縮の最初の段と同じ計算で、Block = 8 が JPEG。出力は入力と同じ解像度の 32 bit float で、各ブロックの左上の画素が DC（そのブロックの平均 × Block）、右・下へ行くほど細かい模様（高い周波数）の係数になる。

Inverse をオンにすると、係数から画像に戻す（DCT-III）。同じ Block で DCT → 逆 DCT とつなぐと、元の画像に戻る。間で係数を削る・丸める・壊すと、ブロック単位の乱れ（JPEG らしい見た目）になる。

入力: in1 画像（Inverse のときは係数）
出力: out1 係数（Inverse のときは画像）。RGB をそれぞれ変換し、アルファはそのまま通す

パラメータ

- Block: ブロックの 1 辺の画素数（既定 8）。0 は画像全体を 1 つのブロックとして変換する（1 画素あたり幅 + 高さ回の参照になるので重い）
- Inverse: 逆変換

ブロックは画像の左上から並べる。右端・下端の半端なブロックは、その大きさの DCT になる。GLSL で、横方向 → 縦方向の 2 回に分けて計算している（1 画素あたり Block × 2 回の参照）。

## ダウンロード

[BlockDCT.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/BlockDCT.tox) [使用例 BlockDCTExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/BlockDCTExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Data |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Block` | Block Size (0 = whole image) | Parameter | Int | `8` | 0.0 … 64.0 |
| `Inverse` | Inverse | Parameter | Toggle | `False` |  |

## 使用例

### バナナの DCT 係数(8 × 8 ブロック)

![バナナの DCT 係数(8 × 8 ブロック)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Compression-BlockDCT-example.png)

バナナの画像を 8 × 8 画素のブロックごとに DCT にかけた係数です。各ブロックの左上の 1 画素(DC = ブロックの平均 × 8)だけが明るく、
残りの係数は輪郭のあるブロック以外ほとんど 0 です。見やすいように絶対値を 0.5 倍にし、バナナの縁のあたり(128 × 72 画素)を 10 倍に拡大しています。

ネットワーク: `in0` (moviefileinTOP) → `BlockDCT` (パレット: `Block=8`) → `abs` (functionTOP: `funcrgba=abs`) → `level` (levelTOP: `brightness1=0.5`) → `part` (cropTOP: `cropleft=0.4`, `cropright=0.5`, `cropbottom=0.35`, `croptop=0.45`) → `view` (resolutionTOP: `outputresolution=custom`, `resolution=[1280, 720]`, `inputfiltertype=nearest`, `filtertype=nearest`) → `out1`

[BlockDCTExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/BlockDCTExample.toe)

??? note "手順(Image/Compression/BlockDCT.example.py)"

    ```python
    """バナナの DCT 係数(8 × 8 ブロック)

    バナナの画像を 8 × 8 画素のブロックごとに DCT にかけた係数です。各ブロックの左上の 1 画素(DC = ブロックの平均 × 8)だけが明るく、
    残りの係数は輪郭のあるブロック以外ほとんど 0 です。見やすいように絶対値を 0.5 倍にし、バナナの縁のあたり(128 × 72 画素)を 10 倍に拡大しています。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        coef = ex.palette(tox, img, Block=8)
        mag = ex.op("functionTOP", name="abs", input=coef, funcrgba="abs")
        lvl = ex.op("levelTOP", name="level", input=mag, brightness1=0.5)
        part = ex.op("cropTOP", name="part", input=lvl, cropleft=0.4, cropright=0.5, cropbottom=0.35, croptop=0.45)
        ex.out(ex.op("resolutionTOP", name="view", input=part, outputresolution="custom", resolution=(1280, 720),
                     inputfiltertype="nearest", filtertype="nearest"))
    ```

### DCT → 逆 DCT で元に戻る

![DCT → 逆 DCT で元に戻る](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Compression-BlockDCT-example_2.png)

同じ Block の BlockDCT を 2 つつなぎ、2 つ目を Inverse にした例です。係数に何もしなければ、出力は入力の画像と同じになります
(誤差は 32 bit float の丸め、100 万分の 1 程度)。この 2 つの間で係数を削る・丸める・壊すのが、圧縮やグリッチの基本形です。

ネットワーク: `in0` (moviefileinTOP) → `BlockDCT` (パレット: `Block=8`) → `BlockDCT1` (パレット: `Block=8`, `Inverse=True`) → `out1`

[BlockDCTExample_2.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/BlockDCTExample_2.toe)

??? note "手順(Image/Compression/BlockDCT.example_2.py)"

    ```python
    """DCT → 逆 DCT で元に戻る

    同じ Block の BlockDCT を 2 つつなぎ、2 つ目を Inverse にした例です。係数に何もしなければ、出力は入力の画像と同じになります
    (誤差は 32 bit float の丸め、100 万分の 1 程度)。この 2 つの間で係数を削る・丸める・壊すのが、圧縮やグリッチの基本形です。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        coef = ex.palette(tox, img, Block=8)
        back = ex.palette(tox, coef, Block=8, Inverse=True)
        ex.out(back)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## 出典・参考

- N. Ahmed, T. Natarajan, K. R. Rao (1974). [Discrete Cosine Transform](https://doi.org/10.1109/T-C.1974.223784). IEEE Transactions on Computers C-23(1), 90-93. — DCT のもとの論文
- G. K. Wallace (1992). [The JPEG still picture compression standard](https://doi.org/10.1109/30.125072). IEEE Transactions on Consumer Electronics 38(1), xviii-xxxiv. — 8 × 8 ブロックの DCT → 量子化 → ジグザグ → 符号化の流れ

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

6 個のオペレータ。sha256: `cb37ce3a5f9f4923…`
