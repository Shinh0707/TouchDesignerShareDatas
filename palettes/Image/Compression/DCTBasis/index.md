<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/DCTBasis/ -->

# DCTBasis

`Image/Compression` フォルダのパレットです。

## 説明

ブロック DCT の基底パターンの一覧（JPEG の教科書に出てくる 8 × 8 = 64 枚の模様の表）。左上が一様な面（DC）で、右へ行くほど横方向に、下へ行くほど縦方向に細かい縞になる。ブロック DCT は、ブロックの絵をこの模様の足し合わせで表し、その重みが係数になる。

「係数が 1 つだけ 1」のブロックを Block × Block 個並べた画像を作り、BlockDCT の逆変換にかけて描いている（係数 (u, v) だけが 1 のブロックの逆変換が、(u, v) 番目の基底パターン）。

入力: なし
出力: out1 基底パターンの表（灰色 0.5 が 0、白が正、黒が負。解像度は Block × Block × Scale の正方形）

パラメータ

- Block: ブロックの 1 辺の画素数（既定 8）
- Scale: 1 画素を何倍に拡大して描くか（既定 8。Block = 8 なら 512 × 512）

## ダウンロード

[DCTBasis.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTBasis.tox) [使用例 DCTBasisExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTBasisExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Block` | Block Size | Parameter | Int | `8` | 1.0 … 16.0 |
| `Scale` | Scale | Parameter | Int | `8` | 1.0 … 32.0 |

## 使用例

### 8 × 8 の基底パターン 64 枚

![8 × 8 の基底パターン 64 枚](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Compression-DCTBasis-example.png)

Block = 8 の基底パターンの表です。左上が一様な面(DC)、右へ行くほど横方向に、下へ行くほど縦方向に細かい縞になります。
JPEG は、8 × 8 画素のブロックをこの 64 枚の重ね合わせで表し、細かい模様(右下のほう)の重みを粗く丸めることで小さくしています。

ネットワーク: `DCTBasis` (パレット) → `out1`

[DCTBasisExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTBasisExample.toe)

??? note "手順(Image/Compression/DCTBasis.example.py)"

    ```python
    """8 × 8 の基底パターン 64 枚

    Block = 8 の基底パターンの表です。左上が一様な面(DC)、右へ行くほど横方向に、下へ行くほど縦方向に細かい縞になります。
    JPEG は、8 × 8 画素のブロックをこの 64 枚の重ね合わせで表し、細かい模様(右下のほう)の重みを粗く丸めることで小さくしています。
    """

    def build(ex, tox):
        ex.out(ex.palette(tox))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## 出典・参考

- N. Ahmed, T. Natarajan, K. R. Rao (1974). [Discrete Cosine Transform](https://doi.org/10.1109/T-C.1974.223784). IEEE Transactions on Computers C-23(1), 90-93. — DCT の基底

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

13 個のオペレータ。sha256: `483e47c021557ed7…`
