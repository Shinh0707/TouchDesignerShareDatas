<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Color/ColorConvert/ -->

# ColorConvert

`Image/Color` フォルダのパレットです。

## 説明

画像の色空間を変換する。RGB / HSV / YCbCr / L\*a\*b\* のどれからどれへでも、From と To で選ぶ。変換はすべて RGB を経由する（From → RGB → To）。From と To が同じなら、入力をそのまま出す（値は 1 ビットも変わらない）。

出力は 32 bit float で、範囲の外の値も切り詰めない（HSV の H だけは 0〜1 に回り込む）。変換した値を編集して（例: HSV の H をずらす、L\*a\*b\* の a\*b\* を強める）、もう 1 つの ColorConvert で RGB に戻す、という使い方を想定している。DCTCompress / DCTDecompress も、これで YCbCr にしてから圧縮している。

入力: in1 画像（From の色空間）
出力: out1 画像（To の色空間、入力と同じ解像度。アルファはそのまま通す）

各チャンネルの意味

- RGB: R, G, B
- HSV: H（色相、0〜1 で 1 周。0 = 赤、1/3 = 緑、2/3 = 青）、S（彩度 0〜1）、V（明度 = R, G, B の最大）。TouchDesigner の RGB to HSV TOP / HSV to RGB TOP と同じ値。灰色（R = G = B）の H は 0
- YCbCr: Y（明るさ 0〜1）、Cb, Cr（色差、0.5 が無彩色）。ITU-R BT.601 のフルレンジ（JPEG / JFIF と同じ式: Y = 0.299 R + 0.587 G + 0.114 B）
- L\*a\*b\*: L\*（明るさ 0〜100）、a\*（緑 − / 赤 +）、b\*（青 − / 黄 +）、どちらもおよそ −128〜127。CIE 1976 L\*a\*b\*、白色点 D65、sRGB の原色。白 = (100, 0, 0)、赤 = (53.24, 80.09, 67.20)

パラメータ

- From: 入力の色空間（既定 RGB）
- To: 出力の色空間（既定 HSV）
- Linear: オフ（既定）= RGB は sRGB のガンマがかかった普通の画像の値。オン = RGB はリニア（光の量に比例した値）。L\*a\*b\* との変換にだけ効く
- Normalize: オフ（既定）= L\*a\*b\* は本来の値（L 0〜100、a/b およそ −128〜127）。オン = 0〜1 に収めた形（L/100, (a+128)/255, (b+128)/255）で読み書きする。8 bit の TOP に入れるときや、0〜1 を前提にした処理に渡すとき用。From と To のどちらの L\*a\*b\* にも効く

GLSL TOP 1 枚（1 画素あたり 1 回の参照）。1280×720 で約 0.15〜0.2 ms（どの組み合わせでも、TD の RGB to HSV TOP とほぼ同じ）。

## ダウンロード

[ColorConvert.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Color/ColorConvert.tox) [使用例 ColorConvertExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Color/ColorConvertExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `From` | From | Parameter | Menu | `RGB` | `RGB` / `HSV` / `YCbCr` / `Lab` |
| `To` | To | Parameter | Menu | `HSV` | `RGB` / `HSV` / `YCbCr` / `Lab` |
| `Linear` | Linear RGB | Parameter | Toggle | `False` |  |
| `Normalize` | Normalize L*a*b* | Parameter | Toggle | `False` |  |

## 使用例

### L*a*b* の a* と b* の面

![L*a*b* の a* と b* の面](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Color-ColorConvert-example.png)

バナナの画像を RGB → L*a*b* に変換し、左から元の画像、a*(緑 − / 赤 +)、b*(青 − / 黄 +)を灰色の濃淡で並べた例です。
灰色(0.5)が 0、明るいほど正、暗いほど負で、見やすいように a*・b* = ±80 を 0〜1 にしています。
黄色いバナナは b* の面で明るく浮かび、a* の面ではあまり目立ちません。明るさ(L*)と色(a*, b*)が分かれるので、
色だけを強める・明るさだけを変えるといった加工に使えます。

ネットワーク: `in0` (moviefileinTOP) → `small` (resolutionTOP: `outputresolution=custom`, `resolution=[640, 360]`, `format=rgba32float`) → `ColorConvert` (パレット: `From=RGB`, `To=Lab`) → `a_star` (channelmixTOP: `red=[0, 0.00625, 0, 0]`, `green=[0, 0.00625, 0, 0]`, `blue=[0, 0.00625, 0, 0]`, `alpha=[0, 0, 0, 0]`, `constant=[0.5, 0.5, 0.5, 1]`) → `b_star` (channelmixTOP: `red=[0, 0, 0.00625, 0]`, `green=[0, 0, 0.00625, 0]`, `blue=[0, 0, 0.00625, 0]`, `alpha=[0, 0, 0, 0]`, `constant=[0.5, 0.5, 0.5, 1]`) → `side_by_side` (layoutTOP: `align=horizlr`, `scaleres=True`) → `out1`

[ColorConvertExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Color/ColorConvertExample.toe)

??? note "手順(Image/Color/ColorConvert.example.py)"

    ```python
    """L*a*b* の a* と b* の面

    バナナの画像を RGB → L*a*b* に変換し、左から元の画像、a*(緑 − / 赤 +)、b*(青 − / 黄 +)を灰色の濃淡で並べた例です。
    灰色(0.5)が 0、明るいほど正、暗いほど負で、見やすいように a*・b* = ±80 を 0〜1 にしています。
    黄色いバナナは b* の面で明るく浮かび、a* の面ではあまり目立ちません。明るさ(L*)と色(a*, b*)が分かれるので、
    色だけを強める・明るさだけを変えるといった加工に使えます。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        small = ex.op("resolutionTOP", name="small", input=img, outputresolution="custom", resolution=(640, 360),
                      format="rgba32float")
        lab = ex.palette(tox, small, From="RGB", To="Lab")
        k = 0.5 / 80  # +-80 -> 0..1
        a = ex.op("channelmixTOP", name="a_star", input=lab, red=(0, k, 0, 0), green=(0, k, 0, 0), blue=(0, k, 0, 0),
                  alpha=(0, 0, 0, 0), constant=(0.5, 0.5, 0.5, 1))
        b = ex.op("channelmixTOP", name="b_star", input=lab, red=(0, 0, k, 0), green=(0, 0, k, 0), blue=(0, 0, k, 0),
                  alpha=(0, 0, 0, 0), constant=(0.5, 0.5, 0.5, 1))
        ex.out(ex.op("layoutTOP", name="side_by_side", input=[small, a, b], align="horizlr", scaleres=True))
    ```

### HSV で色相を半周回す

![HSV で色相を半周回す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Color-ColorConvert-example_2.png)

ColorConvert を 2 つ使い、RGB → HSV に変換して H に 0.5 を足し(Channel Mix TOP)、HSV → RGB に戻した例です。
左が元の画像、右が色相を 180 度回した画像で、黄色いバナナが青っぽくなります。H は 1 で 1 周するので、
1 を超えても戻すときに回り込みます。明るさ(V)と彩度(S)はそのままです。

ネットワーク: `in0` (moviefileinTOP) → `small` (resolutionTOP: `outputresolution=custom`, `resolution=[640, 360]`, `format=rgba32float`) → `ColorConvert` (パレット: `From=RGB`, `To=HSV`) → `hue_plus_half` (channelmixTOP: `constant=[0.5, 0, 0, 0]`) → `ColorConvert1` (パレット: `From=HSV`, `To=RGB`) → `side_by_side` (layoutTOP: `align=horizlr`, `scaleres=True`) → `out1`

[ColorConvertExample_2.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Color/ColorConvertExample_2.toe)

??? note "手順(Image/Color/ColorConvert.example_2.py)"

    ```python
    """HSV で色相を半周回す

    ColorConvert を 2 つ使い、RGB → HSV に変換して H に 0.5 を足し(Channel Mix TOP)、HSV → RGB に戻した例です。
    左が元の画像、右が色相を 180 度回した画像で、黄色いバナナが青っぽくなります。H は 1 で 1 周するので、
    1 を超えても戻すときに回り込みます。明るさ(V)と彩度(S)はそのままです。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        small = ex.op("resolutionTOP", name="small", input=img, outputresolution="custom", resolution=(640, 360),
                      format="rgba32float")
        hsv = ex.palette(tox, small, From="RGB", To="HSV")
        turned = ex.op("channelmixTOP", name="hue_plus_half", input=hsv, constant=(0.5, 0, 0, 0))
        back = ex.palette(tox, turned, From="HSV", To="RGB")
        ex.out(ex.op("layoutTOP", name="side_by_side", input=[small, back], align="horizlr", scaleres=True))
    ```

### Y、Cb、Cr を並べる

![Y、Cb、Cr を並べる](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Color-ColorConvert-example_3.png)

バナナの画像を RGB → YCbCr(JPEG と同じ BT.601 フルレンジ)に変換し、左から Y(明るさ)、Cb(青の色差)、Cr(赤の色差)を
灰色の濃淡で並べた例です。Cb と Cr は 0.5 が無彩色で、見やすいように 0.5 からの差を 2 倍にしています。
絵の細かいところはほとんど Y にあり、Cb・Cr はなめらかです。JPEG が色差を粗く扱ってよい理由で、
DCTCompress もこの形にしてから圧縮しています。

ネットワーク: `in0` (moviefileinTOP) → `small` (resolutionTOP: `outputresolution=custom`, `resolution=[640, 360]`, `format=rgba32float`) → `ColorConvert` (パレット: `From=RGB`, `To=YCbCr`) → `Y` (channelmixTOP: `red=[1.0, 0, 0, 0]`, `green=[1.0, 0, 0, 0]`, `blue=[1.0, 0, 0, 0]`, `alpha=[0, 0, 0, 0]`, `constant=[0.0, 0.0, 0.0, 1]`) → `Cb` (channelmixTOP: `red=[0, 2.0, 0, 0]`, `green=[0, 2.0, 0, 0]`, `blue=[0, 2.0, 0, 0]`, `alpha=[0, 0, 0, 0]`, `constant=[-0.5, -0.5, -0.5, 1]`) → `Cr` (channelmixTOP: `red=[0, 0, 2.0, 0]`, `green=[0, 0, 2.0, 0]`, `blue=[0, 0, 2.0, 0]`, `alpha=[0, 0, 0, 0]`, `constant=[-0.5, -0.5, -0.5, 1]`) → `side_by_side` (layoutTOP: `align=horizlr`, `scaleres=True`) → `out1`

[ColorConvertExample_3.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Color/ColorConvertExample_3.toe)

??? note "手順(Image/Color/ColorConvert.example_3.py)"

    ```python
    """Y、Cb、Cr を並べる

    バナナの画像を RGB → YCbCr(JPEG と同じ BT.601 フルレンジ)に変換し、左から Y(明るさ)、Cb(青の色差)、Cr(赤の色差)を
    灰色の濃淡で並べた例です。Cb と Cr は 0.5 が無彩色で、見やすいように 0.5 からの差を 2 倍にしています。
    絵の細かいところはほとんど Y にあり、Cb・Cr はなめらかです。JPEG が色差を粗く扱ってよい理由で、
    DCTCompress もこの形にしてから圧縮しています。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        small = ex.op("resolutionTOP", name="small", input=img, outputresolution="custom", resolution=(640, 360),
                      format="rgba32float")
        ycc = ex.palette(tox, small, From="RGB", To="YCbCr")
        planes = []
        for i, name in enumerate(("Y", "Cb", "Cr")):
            g = 1.0 if i == 0 else 2.0
            row = tuple(g if j == i else 0 for j in range(4))
            off = 0.0 if i == 0 else 0.5 - 0.5 * g
            planes.append(ex.op("channelmixTOP", name=name, input=ycc, red=row, green=row, blue=row,
                                alpha=(0, 0, 0, 0), constant=(off, off, off, 1)))
        ex.out(ex.op("layoutTOP", name="side_by_side", input=planes, align="horizlr", scaleres=True))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

## 出典・参考

- A. R. Smith (1978). [Color Gamut Transform Pairs](https://doi.org/10.1145/965139.807361). Computer Graphics (SIGGRAPH '78) 12(3), 12-19. — HSV と RGB の変換
- ITU-T (2011). Information technology - Digital compression and coding of continuous-tone still images: JPEG File Interchange Format (JFIF). Recommendation ITU-T T.871. — YCbCr（BT.601 フルレンジ）の式
- CIE (2004). Colorimetry, 3rd edition. CIE 15:2004. — CIE 1976 L*a*b* の定義
- IEC (1999). Multimedia systems and equipment - Colour measurement and management - Part 2-1: Default RGB colour space - sRGB. IEC 61966-2-1:1999. — sRGB のガンマと、XYZ への行列（D65）

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

5 個のオペレータ。sha256: `2fee2c8d09630299…`
