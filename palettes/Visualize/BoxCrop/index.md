<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/BoxCrop/ -->

# BoxCrop

`Visualize` フォルダのパレットです。

## 説明

箱の一覧(CHOP)が指す場所を画像から切り出して、同じ大きさのマスに並べる。検出したものを小さく並べて見せる表示や、箱の中身を分類器(ニューラルネットなど)に渡す前処理に使う。箱は BoxTrackCHOP の出力をそのままつなげる(同じ形式の CHOP なら何でもよい)。

入力

- in1: TOP 切り出すもとの画像
- in2: CHOP 箱の一覧。1 サンプルが 1 つの箱。チャンネル `active tx ty w h`(位置と大きさは 0〜1、左下が原点)

出力

- out1: TOP 切り出したマスを左上から順に並べた画像(横に Columns 個)
- out2: CHOP 1 チャンネルが 1 つの箱、Size × Size サンプル(マスの明るさを、上の行から順に左→右へ並べたもの。0〜1)。箱のない場所は 0

パラメータ

- Size: マスの 1 辺(ピクセル)
- Margin: 箱のまわりに空ける余白(マスに対する割合)。手書き数字のデータ(28 のマスの中央 20 に数字)に合わせるなら 0.143
- Square: オンで縦横同じ倍率(長い辺がマスに収まる)。オフで箱をマスいっぱいに引き伸ばす
- Mono: out1 を明るさ(白黒)にする
- Columns: out1 で横に並べる数

切り出しは GLSL TOP(中の `crop_pixel`)で行う。

## ダウンロード

[BoxCrop.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/BoxCrop.tox) [使用例 BoxCropExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/BoxCropExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image / 切り出すもとの画像 |
| 入力 1 | CHOP | `in2` | Any / 箱の一覧。1 サンプル = 1 箱、active tx ty w h(0〜1) |
| 出力 0 | TOP | `out1` | Image / 切り出したマスを並べた画像 |
| 出力 1 | CHOP | `out2` | Matrix / 1 チャンネル = 1 箱、Size × Size サンプルの明るさ(0〜1) |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Size` | Cell Size (pixels) | Crop | Int | `28` | 8.0 … 128.0 |
| `Margin` | Margin | Crop | Float | `0.1` | 0.0 … 0.45 |
| `Square` | Square | Crop | Toggle | `True` |  |
| `Mono` | Mono | Crop | Toggle | `False` |  |
| `Columns` | Columns | Crop | Int | `8` | 1.0 … 32.0 |

## 使用例

### 見つけた箱の中身を並べる(BoxTrackCHOP → BoxCrop)

![見つけた箱の中身を並べる(BoxTrackCHOP → BoxCrop)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Visualize-BoxCrop-example.png)

動く絵の明るいところを BoxTrackCHOP で箱にして、BoxCrop で箱の中身を同じ大きさのマスに切り出して並べた例です。
左上から箱の順(BoxTrackCHOP の場所の順)に並び、箱のない場所は黒です。検出したものの一覧表示や、
分類器に渡す前の切り出しに使います(out2 の CHOP は 1 チャンネルが 1 つの箱です)。
この例を開くには BoxTrackCHOP プラグインが要ります。

ネットワーク: `in0` (noiseTOP: `type=simplex3d`, `mono=False`, `period=1.1`, `harmon=0`, `exp=1.6`, `outputresolution=custom`, `resolutionw=960`, `resolutionh=540`, `tz={'expr': 'absTime.seconds * 0.12'}`) → `small` (resolutionTOP: `outputresolution=custom`, `resolutionw=320`, `resolutionh=180`) → `BoxCrop` (パレット: `Size=96`, `Margin=0.1`, `Columns=4`) → `out1`

[BoxCropExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/BoxCropExample.toe)

??? note "手順(Visualize/BoxCrop.example.py)"

    ```python
    """見つけた箱の中身を並べる(BoxTrackCHOP → BoxCrop)

    動く絵の明るいところを BoxTrackCHOP で箱にして、BoxCrop で箱の中身を同じ大きさのマスに切り出して並べた例です。
    左上から箱の順(BoxTrackCHOP の場所の順)に並び、箱のない場所は黒です。検出したものの一覧表示や、
    分類器に渡す前の切り出しに使います(out2 の CHOP は 1 チャンネルが 1 つの箱です)。
    この例を開くには BoxTrackCHOP プラグインが要ります。
    """

    FRAMES = 60

    def build(ex, tox):
        image = ex.input("noiseTOP", type="simplex3d", mono=False, period=1.1, harmon=0, exp=1.6,
                         outputresolution="custom", resolutionw=960, resolutionh=540,
                         tz={"expr": "absTime.seconds * 0.12"})
        small = ex.op("resolutionTOP", name="small", input=image, x=-220, y=-200, outputresolution="custom",
                      resolutionw=320, resolutionh=180)
        track = ex.root.create("BoxtrackCHOP", "track")
        track.nodeX, track.nodeY = 0, -200
        track.par.Top = small.path
        track.par.Threshold = 0.62
        track.par.Cellsize = 4
        track.par.Mergegap = 0
        track.par.Minarea = 0.004
        track.par.Maxboxes = 8
        ex.palette(tox, image, track, Size=96, Margin=0.1, Columns=4)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

使用例「見つけた箱の中身を並べる(BoxTrackCHOP → BoxCrop)」の .toe は、ほかに [BoxTrackCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BoxTrackCHOP/) を使っています。使用例を開くときは、こちらも入れておいてください。

19 個のオペレータ。sha256: `83204e0648271e3f…`
