<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/ZigZag/ -->

# ZigZag

`Image/Compression` フォルダのパレットです。

## 説明

ブロックの中をジグザグ順に並べ替える（JPEG のジグザグスキャン）と、その逆。Block × Block 画素のブロックごとに、左上から斜めに往復する順（(0,0) → 右 → 左下 → 下 → 右上 → …）で画素を読み、ブロックの中に左から右・上から下の順で置き直す。解像度は変わらない。

ブロック DCT の係数にかけると、低い周波数がブロックの上の行、高い周波数が下の行に集まる。量子化（DCTQuantize）のあとなら、下の行はほとんど 0 になり、画像を行ごとに読んだとき 0 が長く続く。これが 0 の連続をまとめる符号化（Huffman CHOP の Zero Runs）によく効く。

Inverse をオンにすると、元の 2 次元の位置に戻す。

入力: in1 画像・係数
出力: out1 並べ替えた画像（入力と同じ解像度・同じピクセル形式）

パラメータ

- Block: ブロックの 1 辺の画素数（既定 8）
- Inverse: 逆の並べ替え

右端・下端の半端なブロックは並べ替えずにそのまま通す。

## ダウンロード

[ZigZag.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/ZigZag.tox) [使用例 ZigZagExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/ZigZagExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Data |
| 出力 0 | TOP | `out1` | Data |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Block` | Block Size | Parameter | Int | `8` | 1.0 … 64.0 |
| `Inverse` | Inverse | Parameter | Toggle | `False` |  |

## 使用例

### 量子化した係数をジグザグ順に並べる

![量子化した係数をジグザグ順に並べる](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Compression-ZigZag-example.png)

BlockDCT → DCTQuantize → ZigZag とつないだ例です。各ブロックの中で、低い周波数の係数が上の行、高い周波数の係数が下の行に
集まるので、ブロックの下のほうはほとんど 0(黒)になります。画像を行ごとに読むと 0 が長く続き、0 の連続をまとめる符号化がよく効く並びです。
見やすいように絶対値を 0.2 倍にし、バナナの縁のあたり(128 × 72 画素)を 10 倍に拡大しています。

ネットワーク: `in0` (moviefileinTOP) → `BlockDCT` (パレット: `Block=8`) → `DCTQuantize` (パレット: `Block=8`) → `ZigZag` (パレット: `Block=8`) → `abs` (functionTOP: `funcrgba=abs`) → `level` (levelTOP: `brightness1=0.2`) → `part` (cropTOP: `cropleft=0.4`, `cropright=0.5`, `cropbottom=0.35`, `croptop=0.45`) → `view` (resolutionTOP: `outputresolution=custom`, `resolution=[1280, 720]`, `inputfiltertype=nearest`, `filtertype=nearest`) → `out1`

[ZigZagExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/ZigZagExample.toe)

??? note "手順(Image/Compression/ZigZag.example.py)"

    ```python
    """量子化した係数をジグザグ順に並べる

    BlockDCT → DCTQuantize → ZigZag とつないだ例です。各ブロックの中で、低い周波数の係数が上の行、高い周波数の係数が下の行に
    集まるので、ブロックの下のほうはほとんど 0(黒)になります。画像を行ごとに読むと 0 が長く続き、0 の連続をまとめる符号化がよく効く並びです。
    見やすいように絶対値を 0.2 倍にし、バナナの縁のあたり(128 × 72 画素)を 10 倍に拡大しています。
    """

    def build(ex, tox):
        here = tox.rsplit("/", 1)[0]
        img = ex.input("moviefileinTOP")
        coef = ex.palette(here + "/BlockDCT.tox", img, Block=8)
        q = ex.palette(here + "/DCTQuantize.tox", coef, Block=8)
        z = ex.palette(tox, q, Block=8)
        mag = ex.op("functionTOP", name="abs", input=z, funcrgba="abs")
        lvl = ex.op("levelTOP", name="level", input=mag, brightness1=0.2)
        part = ex.op("cropTOP", name="part", input=lvl, cropleft=0.4, cropright=0.5, cropbottom=0.35, croptop=0.45)
        ex.out(ex.op("resolutionTOP", name="view", input=part, outputresolution="custom", resolution=(1280, 720),
                     inputfiltertype="nearest", filtertype="nearest"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## 出典・参考

- G. K. Wallace (1992). [The JPEG still picture compression standard](https://doi.org/10.1109/30.125072). IEEE Transactions on Consumer Electronics 38(1), xviii-xxxiv. — ジグザグスキャンの順番

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

5 個のオペレータ。sha256: `68e2fdf118955d2a…`
