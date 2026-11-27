<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/HuffmanGlitch/ -->

# HuffmanGlitch

`Image/Effect` フォルダのパレットです。

## 説明

圧縮データを壊して復号するグリッチ（壊れた JPEG のような崩れ）。画像を JPEG と同じ流れで（既定では YCbCr にしてから）圧縮し（DCTCompress）、そのバイト列のランダムな場所を壊し（Bit Flip CHOP）、復号する（DCTDecompress）。ハフマン符号は 1 ビット変わるとそこから先の区切りがずれるので、壊した位置より下が、色のずれた縞やブロックの模様に崩れる。

入力: in1 画像
出力: out1 グリッチした画像（入力と同じ解像度。アルファは 1）

パラメータ

- Count: 壊す数（0 で壊さない = 圧縮して戻しただけの画像）
- Seed: 壊す場所を決める乱数の種。毎フレーム変えると、崩れ方が毎フレーム変わる
- Position: 壊し始める位置（0 = 画像のいちばん上、1 = いちばん下）。これより上は崩れない
- Range: Position から先の、壊す場所を選ぶ範囲（1 = 最後まで）
- Method: Flip One Bit（1 ビット反転）/ Random Byte（ランダムなバイト）/ Zero Byte（0 にする）
- Block: ブロックの 1 辺の画素数（既定 8）。崩れたときの模様の細かさが変わる
- Step / Slope: 量子化のきざみ幅と、高い周波数での広げ方。Step が大きいほど元の絵が荒くなり、圧縮データが小さくなるので 1 か所の傷が広く効く
- Colorspace: YCbCr（既定）/ RGB。YCbCr では壊れた所が、明るさと色差が別々にずれた JPEG らしい色（赤・緑・青の縞や市松模様）になる。RGB は 2026-11-26 版の動き
- Chroma: Cb と Cr のきざみ幅を Step の何倍にするか（既定 2）。RGB のときは効かない
- Resolutionscale: 圧縮する前に解像度を下げる倍率（既定 0.25）。毎フレーム画像を CHOP に読み出して符号化するので、下げるほど軽い。出力は入力の解像度に拡大して戻す

Position は圧縮後のバイト列の中での割合なので、絵の細かい所（データの多い所）ほど同じ幅でも狭い範囲にあたる。ヘッダ（符号の表）は壊さない。

## ダウンロード

[HuffmanGlitch.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/HuffmanGlitch.tox) [使用例 HuffmanGlitchExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/HuffmanGlitchExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Count` | Count | Parameter | Int | `1` | 0.0 … 32.0 |
| `Seed` | Seed | Parameter | Int | `1` | 0.0 … 100.0 |
| `Position` | Position | Parameter | Float | `0.3` | 0.0 … 1.0 |
| `Range` | Range | Parameter | Float | `1` | 0.0 … 1.0 |
| `Method` | Method | Parameter | Menu | `Flip` | `Flip` / `Random` / `Zero` |
| `Block` | Block Size | Parameter | Int | `8` | 1.0 … 64.0 |
| `Step` | Step | Parameter | Float | `0.04` | 0.0001 … 0.5 |
| `Slope` | High Frequency Slope | Parameter | Float | `0.5` | 0.0 … 4.0 |
| `Colorspace` | Color Space | Parameter | Menu | `YCbCr` | `YCbCr` / `RGB` |
| `Chroma` | Chroma Step | Parameter | Float | `2` | 1.0 … 8.0 |
| `Resolutionscale` | Resolution Scale | Parameter | Float | `0.25` | 0.05 … 1.0 |

## 使用例

### 壊れた JPEG のように崩す

![壊れた JPEG のように崩す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-HuffmanGlitch-example.png)

バナナの画像の圧縮データを 8 か所壊した例です(Count = 8、Position = 0.1)。最初の傷より上はそのままで、
そこから下が、色のずれた縞や、赤・緑・青の市松のようなブロックの模様に崩れます(既定の YCbCr では、明るさと色差が別々にずれるため)。Seed を変えると崩れ方が変わり、Count = 0 で元の絵に戻ります。

ネットワーク: `in0` (moviefileinTOP) → `HuffmanGlitch` (パレット: `Count=8`, `Seed=4`, `Position=0.1`) → `out1`

[HuffmanGlitchExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/HuffmanGlitchExample.toe)

??? note "手順(Image/Effect/HuffmanGlitch.example.py)"

    ```python
    """壊れた JPEG のように崩す

    バナナの画像の圧縮データを 8 か所壊した例です(Count = 8、Position = 0.1)。最初の傷より上はそのままで、
    そこから下が、色のずれた縞や、赤・緑・青の市松のようなブロックの模様に崩れます(既定の YCbCr では、明るさと色差が別々にずれるため)。Seed を変えると崩れ方が変わり、Count = 0 で元の絵に戻ります。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        ex.out(ex.palette(tox, img, Count=8, Seed=4, Position=0.1))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Bitflip` | [Bit Flip (BitFlipCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BitFlipCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BitFlipCHOP/) |
| `CHOP:Huffman` | [Huffman (HuffmanCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/) |

## 出典・参考

- G. K. Wallace (1992). [The JPEG still picture compression standard](https://doi.org/10.1109/30.125072). IEEE Transactions on Consumer Electronics 38(1), xviii-xxxiv. — 壊している圧縮の流れ（DCT → 量子化 → ジグザグ → ハフマン符号）

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

77 個のオペレータ。sha256: `7a6832157ea5027d…`
