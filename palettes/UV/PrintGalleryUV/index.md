<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/PrintGalleryUV/ -->

# PrintGalleryUV

`UV` フォルダのパレットです。

## 説明

エッシャー「版画画廊」風の、ドロステ効果（無限に入れ子になる渦）の UV マップ。対数極座標で画像をらせん状に繰り返す。Remap TOP で画像に当てると、画像が渦を巻きながら自分の中に無限に入れ子になる。

入力: なし
出力: out1 UV マップ 1024×1024（32 bit float）

パラメータ

- R: 1 周するごとの拡大率（入れ子 1 段ごとの倍率。1 より大きい値、既定 1.3）
- Rotate: 渦の回転（位相）

## ダウンロード

[PrintGalleryUV.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/PrintGalleryUV.tox) [使用例 PrintGalleryUVExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/PrintGalleryUVExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 出力 0 | TOP | `out1` | UV |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Rotate` | Rotate | Parameters | Float | `0` | 0.0 … 1.0 |
| `R` | R | Parameters | Float | `2` | -12.0 … 32.0 |

## 使用例

### バナナの版画画廊

![バナナの版画画廊](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/UV-PrintGalleryUV-example.png)

青い背景に置いたバナナの画像に PrintGalleryUV を Remap TOP で当てたものです。画像が渦を巻きながら、自分の中に無限に入れ子になります。
R で入れ子 1 段ごとの倍率を、Rotate で渦の位相を変えられます(Rotate を時間で動かすと、無限に吸い込まれていく動きになります)。

ネットワーク: `in0` (moviefileinTOP) → `constant1` (constantTOP: `colorr=0.15`, `colorg=0.3`, `colorb=0.6`, `alpha=1`, `resolutionw=1024`, `resolutionh=1024`) → `transform1` (transformTOP: `sx=0.45`, `sy=0.45`, `extend=zero`) → `over1` (overTOP) → `PrintGalleryUV` (パレット: `R=2.0`, `Rotate=0.15`) → `remap1` (remapTOP) → `out1`

[PrintGalleryUVExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/PrintGalleryUVExample.toe)

??? note "手順(UV/PrintGalleryUV.example.py)"

    ```python
    """バナナの版画画廊

    青い背景に置いたバナナの画像に PrintGalleryUV を Remap TOP で当てたものです。画像が渦を巻きながら、自分の中に無限に入れ子になります。
    R で入れ子 1 段ごとの倍率を、Rotate で渦の位相を変えられます(Rotate を時間で動かすと、無限に吸い込まれていく動きになります)。
    """

    def build(ex, tox):
        banana = ex.input("moviefileinTOP")
        bg = ex.op("constantTOP", colorr=0.15, colorg=0.3, colorb=0.6, alpha=1, resolutionw=1024, resolutionh=1024)
        small = ex.op("transformTOP", input=banana, sx=0.45, sy=0.45, extend="zero")
        img = ex.op("overTOP", input=[small, bg])
        uv = ex.palette(tox, R=2.0, Rotate=0.15)
        ex.out(ex.op("remapTOP", input=[img, uv]))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

31 個のオペレータ。sha256: `6a3633399316aa90…`
