<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/identifyUV/ -->

# identifyUV

`UV` フォルダのパレットです。

## 説明

恒等 UV マップ（各ピクセルに自分の座標を入れた画像）を作る。r = u（左 0 → 右 1）、g = v（下 0 → 上 1）、b = 0、a = 1。Remap TOP の 2 番目の入力に入れると元の画像がそのまま出るので、これを変形したものが UV 変形の出発点になる。

入力: in1 TOP（省略可。繋ぐとその解像度、繋がないと Resolution の解像度）
出力: out1 UV マップ（入力と同じ解像度）

パラメータ

- Resolution: 入力がないときの解像度（既定 256×256、h は w に連動）

## ダウンロード

[identifyUV.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/identifyUV.tox) [使用例 identifyUVExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/identifyUVExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Any / 解像度だけを使う（中身は使わない）(省略可) |
| 出力 0 | TOP | `out1` | UV / r = u、g = v、b = 0、a = 1 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Resolutionw` | Resolution | Parameters | WH | `256` | 1.0 … 1000.0 |
| `Resolutionh` | Resolution | Parameters | WH | `256` | 1.0 … 1000.0 |

## 使用例

### 恒等 UV マップを回してから当てる

![恒等 UV マップを回してから当てる](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/UV-identifyUV-example.png)

identifyUV の出力を Transform TOP で 20 度回してから Remap TOP に入れると、画像も回ります。
UV マップを加工すると画像の変形になる、という UV 変形の基本です。

ネットワーク: `in0` (moviefileinTOP) → `identifyUV` (パレット) → `transform1` (transformTOP: `rotate=20`, `extend=mirror`) → `remap1` (remapTOP) → `out1`

[identifyUVExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/identifyUVExample.toe)

??? note "手順(UV/identifyUV.example.py)"

    ```python
    """恒等 UV マップを回してから当てる

    identifyUV の出力を Transform TOP で 20 度回してから Remap TOP に入れると、画像も回ります。
    UV マップを加工すると画像の変形になる、という UV 変形の基本です。
    """

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        uv = ex.palette(tox, img)
        turned = ex.op("transformTOP", input=uv, rotate=20, extend="mirror")
        remap = ex.op("remapTOP", input=[img, turned])
        ex.out(remap)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

12 個のオペレータ。sha256: `18434ae0c488f58c…`
