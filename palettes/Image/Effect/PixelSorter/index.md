<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/PixelSorter/ -->

# PixelSorter

`Image/Effect` フォルダのパレットです。

## 説明

ピクセルソート。画像の線(行・列・斜めの線)ごとに、対象のピクセルを点数の順に並べ替える。対象でないピクセルは動かない。
点数を GLSL TOP で作り、Pixel Arg Sorter(点数から UV マップを作るカスタム OP)と Remap TOP で並べ替える。Pixel Sorter TOP(非推奨)と同じ使い方で、3〜4 割軽い。

入力: in1 画像 TOP
出力: out1 並べ替えた画像(in1 と同じ解像度) / out2 UV マップ(並べ替えたあとの各ピクセルがもとのどこから来たか。32 bit float、r = u、g = v)

パラメータ

- Mode: 点数の付け方。Black は暗さ(1 − 明るさ)、Brightness は明るさ(R・G・B の平均)、R / G / B はその色、RGBMax は R・G・B の最大値
- Angle Unit / Angle: 点数が大きくなっていく向き。右から反時計回り(0 = 右、90 度 = 上、180 度 = 左、270 度 = 下)。単位は Degrees / Radians / Cycles(1 で 1 周)。1 周を超える値は余りを使う
- Threshold / Threshold Max / Range: 対象の決め方。Include では点数が Threshold より大きく Threshold Max 以下のピクセル、Exclude ではその範囲の外
- Sort: Each Interval は対象が続いている区間ごと、Whole Line は 1 本の線の対象を全部まとめて並べ替える
- Resolution Scale: 並べ替えを行う解像度(in1 に対する倍率)。小さくすると軽くなり、流れた部分だけが粗くなる(動かなかった部分は in1 のまま)

同じ点数のピクセルは、線の上でのもとの順番のまま(Pixel Sorter TOP は色の値の順なので、同じ点数どうしの色の並びだけが違う)。
点数は 8 bit で比べる。並べ替えは CPU(Pixel Arg Sorter)、点数作りと描画は GPU。

## ダウンロード

[PixelSorter.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/PixelSorter.tox) [使用例 PixelSorterExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/PixelSorterExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |
| 出力 1 | TOP | `out2` | UV |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Mode` | Mode | Parameter | Menu | `Black` | `Black` / `Brightness` / `R` / `G` / `B` / `Rgbmax` |
| `Angleunit` | Angle Unit | Parameter | Menu | `Degrees` | `Degrees` / `Radians` / `Cycles` |
| `Angle` | Angle | Parameter | Float | `0` | 0.0 … 360.0 |
| `Threshold` | Threshold | Parameter | Float | `0.25` | 0.0 … 1.0 |
| `Thresholdmax` | Threshold Max | Parameter | Float | `1` | 0.0 … 1.0 |
| `Range` | Range | Parameter | Menu | `Include` | `Include` / `Exclude` |
| `Sort` | Sort | Parameter | Menu | `Interval` | `Interval` / `Line` |
| `Resolutionscale` | Resolution Scale | Parameter | Float | `1` | 0.0 … 1.0 |

## 使用例

### 写真の暗い部分を斜めに流す

![写真の暗い部分を斜めに流す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-PixelSorter-example.png)

Mode = Black(暗さ)で、暗さが Threshold(0.3)を超えるピクセルが続く区間を、30 度の向きに暗さの順で並べ替えた例です。
画像は TouchDesigner に付属のサンプル(Samples/Map/Mettler.3.jpg)です。

ネットワーク: `in0` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Mettler.3.jpg'"}`, `outputresolution=half`) → `PixelSorter` (パレット: `Angle=30`, `Threshold=0.3`) → `out1`

[PixelSorterExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/PixelSorterExample.toe)

??? note "手順(Image/Effect/PixelSorter.example.py)"

    ```python
    """写真の暗い部分を斜めに流す

    Mode = Black(暗さ)で、暗さが Threshold(0.3)を超えるピクセルが続く区間を、30 度の向きに暗さの順で並べ替えた例です。
    画像は TouchDesigner に付属のサンプル(Samples/Map/Mettler.3.jpg)です。
    """

    IMAGE = {"expr": "app.samplesFolder + '/Map/Mettler.3.jpg'"}

    def build(ex, tox):
        img = ex.input("moviefileinTOP", file=IMAGE, outputresolution="half")
        ex.palette(tox, img, Angle=30, Threshold=0.3)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `TOP:Pixelargsorter` | [Pixel Arg Sorter (PixelArgSorterTOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) |

11 個のオペレータ。sha256: `33c04f1e6d335e06…`
