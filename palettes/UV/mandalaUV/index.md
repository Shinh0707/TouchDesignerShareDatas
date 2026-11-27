<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/mandalaUV/ -->

# mandalaUV

`UV` フォルダのパレットです。

## 説明

万華鏡（マンダラ）状の UV マップ。角度を鏡映しながら N 回くり返した値を r に、中心からの距離を折り返した値を g に入れる。Remap TOP で画像に当てると N 回対称の万華鏡模様になる（鏡映込みなので、くさび形の画像のコピーは 2N 枚）。

入力: in1 TOP（省略可。繋ぐとその解像度、繋がないと Resolution の解像度。中身は使わない）
出力: out1 UV マップ（r = 折り返した角度、g = 折り返した半径、32 bit float）

パラメータ

- N: 回転対称の数（N=3 で 3 方向にくり返す）
- Biasx: 角度のずらし（回転）
- Biasy: 半径のずらし（模様の内外へのずらし）
- Resolution: 入力がないときの解像度（既定 512×512、h は w に連動）

## ダウンロード

[mandalaUV.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/mandalaUV.tox) [使用例 mandalaUVExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/mandalaUVExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Any / 解像度だけを使う(省略可) |
| 出力 0 | TOP | `out1` | UV / r = 折り返した角度、g = 折り返した半径 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `N` | N | Parameters | Int | `1` | 1.0 … 20.0 |
| `Biasx` | Biasx | Parameters | Float | `0` | 0.0 … 8.0 |
| `Biasy` | Biasy | Parameters | Float | `0` | 0.0 … 1.0 |
| `Resolutionw` | Resolution | Parameters | WH | `0` | 0.0 … 1.0 |
| `Resolutionh` | Resolution | Parameters | WH | `0` | 0.0 … 1.0 |

## 使用例

### バナナの万華鏡

![バナナの万華鏡](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/UV-mandalaUV-example.png)

バナナの画像に、N=6 の mandalaUV を Remap TOP で当てたものです。6 回対称の万華鏡模様になります。

ネットワーク: `in0` (moviefileinTOP) → `mandalaUV` (パレット: `N=6`, `Resolution=[720, 720]`) → `remap1` (remapTOP) → `out1`

[mandalaUVExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/mandalaUVExample.toe)

??? note "手順(UV/mandalaUV.example.py)"

    ```python
    """バナナの万華鏡

    バナナの画像に、N=6 の mandalaUV を Remap TOP で当てたものです。6 回対称の万華鏡模様になります。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        uv = ex.palette(tox, None, N=6, Resolution=(720, 720))
        remap = ex.op("remapTOP", input=[img, uv])
        ex.out(remap)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## ほかの使用例

- [MandalaExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Projects/MandalaExample.toe)(手作りのサンプルプロジェクト)

12 個のオペレータ。sha256: `32d6949add002599…`
