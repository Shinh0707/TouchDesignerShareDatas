<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/DCTQuantize/ -->

# DCTQuantize

`Image/Compression` フォルダのパレットです。

## 説明

ブロック DCT の係数の量子化（粗く丸める）と、その逆。圧縮で情報を捨てる段にあたる。係数を「きざみ幅」で割って整数に丸める: q = round(c ÷ step)。高い周波数ほどきざみ幅を広くするので、細かい模様の係数はほとんど 0 になる。0 が並ぶほど、あとのハフマン符号化（Huffman CHOP）でよく縮む。

きざみ幅は step(u, v) = Step × (1 + Slope × 8 × (u + v) ÷ Block)。(u, v) はブロックの左上（DC）から数えた位置で、Block = 8 なら Step × (1 + Slope × (u + v))。

Inverse をオンにすると、整数にきざみ幅を掛けて係数に戻す（逆量子化）。丸めた分は戻らないので、Step が大きいほど画像は荒れる。

入力: in1 BlockDCT の係数（Inverse のときは量子化した整数）
出力: out1 量子化した整数（32 bit float に入った整数。Inverse のときは係数）。アルファはそのまま通す

パラメータ

- Block: 係数を作った BlockDCT と同じブロックの大きさ
- Step: いちばん低い周波数のきざみ幅（画像の値 0〜1 に対して。既定 0.04）。大きいほど粗く、データは小さくなる
- Slope: 周波数が上がるときのきざみ幅の増え方（既定 0.5。0 で全部同じきざみ幅）
- Inverse: 逆量子化

## ダウンロード

[DCTQuantize.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTQuantize.tox) [使用例 DCTQuantizeExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTQuantizeExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Data |
| 出力 0 | TOP | `out1` | Data |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Block` | Block Size (0 = whole image) | Parameter | Int | `8` | 0.0 … 64.0 |
| `Step` | Step | Parameter | Float | `0.04` | 0.0001 … 0.5 |
| `Slope` | High Frequency Slope | Parameter | Float | `0.5` | 0.0 … 4.0 |
| `Inverse` | Inverse | Parameter | Toggle | `False` |  |

## 使用例

### 粗く量子化して戻す(JPEG のような荒れ)

![粗く量子化して戻す(JPEG のような荒れ)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Compression-DCTQuantize-example.png)

BlockDCT → DCTQuantize(Step = 0.15) → DCTQuantize(Inverse) → BlockDCT(Inverse) とつないだ例です。
係数を粗いきざみ幅で整数に丸めるので、細かい模様が消え、8 × 8 のブロックの境目が見える JPEG らしい荒れになります。
Step を小さくすると元の画像に近づき、大きくするとブロックごとの平らな色になっていきます。

ネットワーク: `in0` (moviefileinTOP) → `BlockDCT` (パレット: `Block=8`) → `DCTQuantize` (パレット: `Block=8`, `Step=0.15`, `Slope=0.5`) → `DCTQuantize1` (パレット: `Block=8`, `Step=0.15`, `Slope=0.5`, `Inverse=True`) → `BlockDCT1` (パレット: `Block=8`, `Inverse=True`) → `out1`

[DCTQuantizeExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTQuantizeExample.toe)

??? note "手順(Image/Compression/DCTQuantize.example.py)"

    ```python
    """粗く量子化して戻す(JPEG のような荒れ)

    BlockDCT → DCTQuantize(Step = 0.15) → DCTQuantize(Inverse) → BlockDCT(Inverse) とつないだ例です。
    係数を粗いきざみ幅で整数に丸めるので、細かい模様が消え、8 × 8 のブロックの境目が見える JPEG らしい荒れになります。
    Step を小さくすると元の画像に近づき、大きくするとブロックごとの平らな色になっていきます。
    """

    def build(ex, tox):
        dct = tox.replace("DCTQuantize.tox", "BlockDCT.tox")
        img = ex.input("moviefileinTOP")
        coef = ex.palette(dct, img, Block=8)
        q = ex.palette(tox, coef, Block=8, Step=0.15, Slope=0.5)
        dq = ex.palette(tox, q, Block=8, Step=0.15, Slope=0.5, Inverse=True)
        back = ex.palette(dct, dq, Block=8, Inverse=True)
        ex.out(back)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## 出典・参考

- G. K. Wallace (1992). [The JPEG still picture compression standard](https://doi.org/10.1109/30.125072). IEEE Transactions on Consumer Electronics 38(1), xviii-xxxiv. — 周波数ごとにきざみ幅を変える量子化

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

5 個のオペレータ。sha256: `a6919fe739952ea4…`
