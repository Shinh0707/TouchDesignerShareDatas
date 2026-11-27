<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/DCTDecompress/ -->

# DCTDecompress

`Image/Compression` フォルダのパレットです。

## 説明

DCTCompress のバイト列を画像に戻す。ハフマン復号（Huffman CHOP）→ ジグザグの逆（ZigZag）→ 逆量子化（DCTQuantize）→ 色差の係数に Chroma を掛ける → 逆 DCT（BlockDCT）→ Cb, Cr に 0.5 を足す → 色空間を RGB に戻す（ColorConvert）。Block / Step / Slope / Colorspace / Chroma は DCTCompress と同じ値にする（違う値にすると、色や模様が変わった画像になる。それもグリッチとして使える）。

バイト列が壊れていても止まらずに画像を出す。符号のビット列が 1 ビット変わると、そこから先（画像ではそこから下）が崩れる。

入力: in1 DCTCompress の out1（`bytes`）
出力: out1 画像（32 bit float、圧縮前と同じ解像度。アルファは 1）

パラメータ

- Block / Step / Slope: DCTCompress と同じ意味。同じ値にする
- Colorspace: YCbCr（既定）/ RGB。DCTCompress と同じにする（違うと、色の入れ替わった絵になる）
- Chroma: Cb, Cr のきざみ幅の倍率（既定 2）。DCTCompress と同じにする

## ダウンロード

[DCTDecompress.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTDecompress.tox) [使用例 DCTDecompressExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTDecompressExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Sequence |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Block` | Block Size | Parameter | Int | `8` | 1.0 … 64.0 |
| `Step` | Step | Parameter | Float | `0.04` | 0.0001 … 0.5 |
| `Slope` | High Frequency Slope | Parameter | Float | `0.5` | 0.0 … 4.0 |
| `Colorspace` | Color Space | Parameter | Menu | `YCbCr` | `YCbCr` / `RGB` |
| `Chroma` | Chroma Step | Parameter | Float | `2` | 1.0 … 8.0 |

## 使用例

### 圧縮して、元に戻す

![圧縮して、元に戻す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Compression-DCTDecompress-example.png)

バナナの画像(320 × 184)を DCTCompress でバイト列にし、DCTDecompress で画像に戻した例です(どちらも既定の YCbCr、
Chroma = 2、Step = 0.04)。1/60 の大きさ(約 2800 バイト)のデータから戻していますが、見た目はほとんど変わりません
(元の画像との差は RMS で 0.014)。Step を両方とも大きくすると、データはさらに小さくなり、ブロックの境目が見える荒れた絵になっていきます。

ネットワーク: `in0` (moviefileinTOP) → `small` (resolutionTOP: `outputresolution=custom`, `resolution=[320, 184]`, `format=rgba32float`) → `DCTCompress` (パレット) → `DCTDecompress` (パレット) → `out1`

[DCTDecompressExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTDecompressExample.toe)

??? note "手順(Image/Compression/DCTDecompress.example.py)"

    ```python
    """圧縮して、元に戻す

    バナナの画像(320 × 184)を DCTCompress でバイト列にし、DCTDecompress で画像に戻した例です(どちらも既定の YCbCr、
    Chroma = 2、Step = 0.04)。1/60 の大きさ(約 2800 バイト)のデータから戻していますが、見た目はほとんど変わりません
    (元の画像との差は RMS で 0.014)。Step を両方とも大きくすると、データはさらに小さくなり、ブロックの境目が見える荒れた絵になっていきます。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        small = ex.op("resolutionTOP", name="small", input=img, outputresolution="custom", resolution=(320, 184),
                      format="rgba32float")
        data = ex.palette(tox.replace("DCTDecompress.tox", "DCTCompress.tox"), small)
        ex.out(ex.palette(tox, data))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Huffman` | [Huffman (HuffmanCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/) |

## 出典・参考

- G. K. Wallace (1992). [The JPEG still picture compression standard](https://doi.org/10.1109/30.125072). IEEE Transactions on Consumer Electronics 38(1), xviii-xxxiv. — ハフマン復号 → 逆量子化 → 逆 DCT、という流れ

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

34 個のオペレータ。sha256: `06212b0b910bdef7…`
