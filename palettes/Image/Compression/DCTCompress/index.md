<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/DCTCompress/ -->

# DCTCompress

`Image/Compression` フォルダのパレットです。

## 説明

画像を JPEG と同じ流れで圧縮して、バイト列にする。画像 → 色空間の変換（ColorConvert、RGB → YCbCr。Cb, Cr は 0.5 を引いて 0 中心にする）→ ブロック DCT（BlockDCT）→ 色差の係数を Chroma で割る → 量子化（DCTQuantize）→ ジグザグ（ZigZag）→ ハフマン符号化（Huffman CHOP）。出力の `bytes` チャンネルは 1 サンプルが 1 バイトで、サンプル数が圧縮後の大きさになる。DCTDecompress に同じ Block / Step / Slope / Colorspace / Chroma を入れてつなぐと、画像に戻る。

間に Bit Flip CHOP を入れてバイト列を壊すと、復号した画像が途中から崩れる（グリッチ）。まとめて使うなら Image/Effect/HuffmanGlitch。

入力: in1 画像（RGB を使う。アルファは捨てる）
出力: out1 圧縮したバイト列（`bytes`、0〜255）
出力: out2 大きさの情報（Huffman CHOP の Info CHOP: `bytes`, `header_bytes`, `payload_bits`, `samples`, `bits_per_sample`, `ideal_bits_per_sample` など）

パラメータ

- Block: ブロックの 1 辺の画素数（既定 8）
- Step: 量子化のきざみ幅（既定 0.04）。大きいほど小さく・荒くなる
- Slope: 高い周波数ほどきざみ幅を広げる度合い（既定 0.5）
- Colorspace: YCbCr（既定）= JPEG と同じく、明るさ（Y）と色差（Cb, Cr）に分けてから圧縮する。RGB = R, G, B をそのまま圧縮する（2026-11-26 版の動き）。320×184 のバナナ、Step 0.04 で RGB 4501 バイト → YCbCr（Chroma 2）2783 バイト。同じバイト数どうしで比べても、RGB で測った PSNR が Chroma 1〜2 で約 1.3 dB、Chroma 4 で約 0.5 dB よい
- Chroma: Cb と Cr のきざみ幅を Step の何倍にするか（既定 2、1 以上）。人の目は色の細かさに鈍いので、色差を粗くしてデータを減らす。RGB のときは効かない
- Zeroruns: 0 の連続をまとめて符号化する（既定オン。オフにすると 1 画素に最低 1 ビットかかる）

画像は上の行から順に符号化する（バイト列の前のほうが画像の上）。画像全体を毎フレーム CHOP に読み出して符号化するので、大きい画像は重い（320×180 で数 ms）。解像度を下げてから入れるとよい。

## ダウンロード

[DCTCompress.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTCompress.tox) [使用例 DCTCompressExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTCompressExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | CHOP | `out1` | Sequence |
| 出力 1 | CHOP | `out2` | Feature |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Block` | Block Size | Parameter | Int | `8` | 1.0 … 64.0 |
| `Step` | Step | Parameter | Float | `0.04` | 0.0001 … 0.5 |
| `Slope` | High Frequency Slope | Parameter | Float | `0.5` | 0.0 … 4.0 |
| `Colorspace` | Color Space | Parameter | Menu | `YCbCr` | `YCbCr` / `RGB` |
| `Chroma` | Chroma Step | Parameter | Float | `2` | 1.0 … 8.0 |
| `Zeroruns` | Zero Runs | Parameter | Toggle | `True` |  |

## 使用例

### バナナを 1/60 のバイト列にする

![バナナを 1/60 のバイト列にする](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Compression-DCTCompress-example.svg)

バナナの画像を 320 × 184 に縮めてから DCTCompress に入れた例です(既定の YCbCr、Chroma = 2、Step = 0.04)。
出力の `bytes` は約 2800 サンプル(= 2800 バイト)で、8 bit の RGB そのまま(320 × 184 × 3 = 176640 バイト)の約 1/60 です。
Colorspace を RGB にすると約 4500 バイト(1/40)になります。先頭の数百バイトがヘッダ(符号の表)、そのあとが符号のビット列で、
乱数のように見えます(よく縮んだデータほど、でたらめな並びに見えます)。

ネットワーク: `in0` (moviefileinTOP) → `small` (resolutionTOP: `outputresolution=custom`, `resolution=[320, 184]`, `format=rgba32float`) → `DCTCompress` (パレット) → `out1`

[DCTCompressExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTCompressExample.toe)

??? note "手順(Image/Compression/DCTCompress.example.py)"

    ```python
    """バナナを 1/60 のバイト列にする

    バナナの画像を 320 × 184 に縮めてから DCTCompress に入れた例です(既定の YCbCr、Chroma = 2、Step = 0.04)。
    出力の `bytes` は約 2800 サンプル(= 2800 バイト)で、8 bit の RGB そのまま(320 × 184 × 3 = 176640 バイト)の約 1/60 です。
    Colorspace を RGB にすると約 4500 バイト(1/40)になります。先頭の数百バイトがヘッダ(符号の表)、そのあとが符号のビット列で、
    乱数のように見えます(よく縮んだデータほど、でたらめな並びに見えます)。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        small = ex.op("resolutionTOP", name="small", input=img, outputresolution="custom", resolution=(320, 184),
                      format="rgba32float")
        ex.out(ex.palette(tox, small))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Huffman` | [Huffman (HuffmanCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/) |

## 出典・参考

- G. K. Wallace (1992). [The JPEG still picture compression standard](https://doi.org/10.1109/30.125072). IEEE Transactions on Consumer Electronics 38(1), xviii-xxxiv. — DCT → 量子化 → ジグザグ → ハフマン符号、という流れ
- D. A. Huffman (1952). [A Method for the Construction of Minimum-Redundancy Codes](https://doi.org/10.1109/JRPROC.1952.273898). Proceedings of the IRE 40(9), 1098-1101. — ハフマン符号

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

36 個のオペレータ。sha256: `41f751efe4a1fb71…`
