<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/BoxOverlay/ -->

# BoxOverlay

`Visualize` フォルダのパレットです。

## 説明

箱の一覧(CHOP)を、枠・ラベルとして画像に重ねて描く。検出枠やデータ表示の演出の「描く」部分で、箱をどう見つけたかには関係しない(BoxTrackCHOP の出力をそのままつなげる。同じ形式の CHOP なら何でもよい)。

入力

- in1: TOP 下に敷く画像(省略可。つなぐと出力はその解像度になる)
- in2: CHOP 箱の一覧。1 サンプルが 1 つの箱。チャンネル `active tx ty w h`(位置と大きさは 0〜1、左下が原点)が必須で、`id age lost r g b value` などがあれば色やラベルに使える

出力

- out1: 画像の上に枠とラベルを重ねたもの
- out2: 枠とラベルだけ(背景は透明)

パラメータ

- Style: Box(四角い枠)/ Corners(四隅だけ)
- Linewidth: 線の太さ(ピクセル)
- Cornerlength: Corners のときの角の長さ(短い辺に対する割合、0〜0.5)
- Fill: 箱の内側の不透明度
- Cross: 中心の十字の長さ(ピクセル、0 で無し)
- Colormode: Color の 1 色 / 箱の色(r g b チャンネル)/ id ごとの色
- Color: 枠の色と不透明度
- Fadein: 新しい箱が現れるのにかけるフレーム数(age チャンネルを使う)
- Lostopacity: 見失っている箱(lost > 0)の不透明度
- Label / Labeltext / Labelsize / Labelcolor: ラベルを出すか、文、文字の大きさ、色。文は Python の書式で、チャンネル名を `{id:03d}` `{value:.2f}` のように書く。ほかに `{index}`(CHOP の中の場所)、`{px_w}` `{px_h}`(ピクセルでの大きさ)が使える
- Showimage: out1 に in1 の画像を敷くか
- Dim: 敷く画像を暗くする量(0〜1)
- Resolution: in1 をつながないときの解像度

枠は GLSL TOP 1 つ(中の `frames_pixel`)で描いている。線の形を変えたいときはそこを書き換える。ラベルの位置は中の `labels_callbacks` で決めている。

## ダウンロード

[BoxOverlay.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/BoxOverlay.tox) [使用例 BoxOverlayExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/BoxOverlayExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image / 下に敷く画像。出力の解像度もこれに合わせる(省略可) |
| 入力 1 | CHOP | `in2` | Any / 箱の一覧。1 サンプル = 1 箱、active tx ty w h(0〜1)が必須 |
| 出力 0 | TOP | `out1` | Image / 画像 + 枠 + ラベル |
| 出力 1 | TOP | `out2` | Image / 枠とラベルだけ(透明な背景) |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Style` | Style | Frame | Menu | `Corners` | `Box` / `Corners` |
| `Linewidth` | Line Width (pixels) | Frame | Float | `2` | 0.0 … 10.0 |
| `Cornerlength` | Corner Length | Frame | Float | `0.25` | 0.0 … 0.5 |
| `Fill` | Fill | Frame | Float | `0` | 0.0 … 1.0 |
| `Cross` | Centre Cross (pixels) | Frame | Float | `0` | 0.0 … 40.0 |
| `Colormode` | Colour From | Frame | Menu | `Fixed` | `Fixed` / `Box` / `Id` |
| `Colorr` | Colour | Frame | RGBA | `0.2` | 0.0 … 1.0 |
| `Colorg` | Colour | Frame | RGBA | `1` | 0.0 … 1.0 |
| `Colorb` | Colour | Frame | RGBA | `0.4` | 0.0 … 1.0 |
| `Colora` | Colour | Frame | RGBA | `1` | 0.0 … 1.0 |
| `Fadein` | Fade In (frames) | Frame | Float | `6` | 0.0 … 60.0 |
| `Lostopacity` | Lost Opacity | Frame | Float | `0.4` | 0.0 … 1.0 |
| `Label` | Label | Label | Toggle | `True` |  |
| `Labeltext` | Label Text | Label | Str | `ID {id:03d}  {value:.2f}` |  |
| `Labelsize` | Label Size (pixels) | Label | Float | `14` | 6.0 … 48.0 |
| `Labelcolorr` | Label Colour | Label | RGBA | `0.2` | 0.0 … 1.0 |
| `Labelcolorg` | Label Colour | Label | RGBA | `1` | 0.0 … 1.0 |
| `Labelcolorb` | Label Colour | Label | RGBA | `0.4` | 0.0 … 1.0 |
| `Labelcolora` | Label Colour | Label | RGBA | `1` | 0.0 … 1.0 |
| `Showimage` | Show Image | Output | Toggle | `True` |  |
| `Dim` | Dim Image | Output | Float | `0` | 0.0 … 1.0 |
| `Resolutionw` | Resolution (no image) | Output | WH | `1280` | 0.0 … 1.0 |
| `Resolutionh` | Resolution (no image) | Output | WH | `720` | 0.0 … 1.0 |

## 使用例

### 箱の一覧を枠とラベルで描く

![箱の一覧を枠とラベルで描く](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Visualize-BoxOverlay-example.png)

4 つの箱を CHOP で作って(1 サンプルが 1 つの箱。`active tx ty w h id value`)、画像の上に重ねた例です。
箱の位置と大きさは 0〜1(左下が原点)です。BoxTrackCHOP の出力はこの形式なので、そのままつなげます。
ここでは箱を手で作っているので、検出のしかたに関係なく使えることが分かります。

ネットワーク: `in0` (noiseTOP: `type=sparse`, `mono=False`, `period=0.6`, `exp=1.4`, `outputresolution=custom`, `resolutionw=960`, `resolutionh=540`, `tz={'expr': 'absTime.seconds * 0.1'}`) → `box1` (constantCHOP) → `box2` (constantCHOP) → `box3` (constantCHOP) → `box4` (constantCHOP) → `boxes` (joinCHOP: `blendmethod=none`) → `BoxOverlay` (パレット: `Style=Corners`, `Linewidth=3`, `Fill=0.08`, `Cross=6`, `Dim=0.4`, `Labeltext=ID {id:02d}  {value:.2f}  {px_w}x{px_h}`, `Labelsize=18`) → `out1`

[BoxOverlayExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/BoxOverlayExample.toe)

??? note "手順(Visualize/BoxOverlay.example.py)"

    ```python
    """箱の一覧を枠とラベルで描く

    4 つの箱を CHOP で作って(1 サンプルが 1 つの箱。`active tx ty w h id value`)、画像の上に重ねた例です。
    箱の位置と大きさは 0〜1(左下が原点)です。BoxTrackCHOP の出力はこの形式なので、そのままつなげます。
    ここでは箱を手で作っているので、検出のしかたに関係なく使えることが分かります。
    """

    # (id, tx, ty, w, h, value): tx / ty move slowly so the picture is not static
    BOXES = [
        (1, "0.25 + 0.05 * math.sin(absTime.seconds * 0.7)", "0.70", 0.22, 0.30, 0.91),
        (2, "0.62", "0.35 + 0.06 * math.sin(absTime.seconds * 0.9)", 0.30, 0.34, 0.76),
        (3, "0.80", "0.78", 0.14, 0.18, 0.58),
        (4, "0.20 + 0.04 * math.cos(absTime.seconds * 0.5)", "0.22", 0.12, 0.16, 0.42),
    ]

    def build(ex, tox):
        image = ex.input("noiseTOP", type="sparse", mono=False, period=0.6, exp=1.4, outputresolution="custom",
                         resolutionw=960, resolutionh=540, tz={"expr": "absTime.seconds * 0.1"})
        ones = []
        for i, (bid, tx, ty, w, h, value) in enumerate(BOXES):
            c = ex.op("constantCHOP", name="box%d" % bid, x=-660, y=-130 - 110 * i)
            chans = (("active", 1), ("id", bid), ("tx", {"expr": tx}), ("ty", {"expr": ty}), ("w", w), ("h", h),
                     ("value", value), ("age", 100))
            c.seq.const.numBlocks = len(chans)
            for k, (name, v) in enumerate(chans):
                c.par["const%dname" % k] = name
                if isinstance(v, dict):
                    c.par["const%dvalue" % k].expr = v["expr"]
                else:
                    c.par["const%dvalue" % k] = v
            ones.append(c)
        # one sample per box: the four one-sample CHOPs one after the other
        boxes = ex.op("joinCHOP", name="boxes", input=ones, x=-440, y=-240, blendmethod="none")
        ex.palette(tox, image, boxes, Style="Corners", Linewidth=3, Fill=0.08, Cross=6, Dim=0.4,
                   Labeltext="ID {id:02d}  {value:.2f}  {px_w}x{px_h}", Labelsize=18)
    ```

### 検出から描画まで(BoxTrackCHOP → BoxOverlay)

![検出から描画まで(BoxTrackCHOP → BoxOverlay)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Visualize-BoxOverlay-example_track.png)

動く絵の明るいところを BoxTrackCHOP で箱にして、BoxOverlay で枠とラベルを重ねた例です。
検出には、絵を幅 320 に縮めたものを渡しています(位置は 0〜1 で出るので、元の解像度の絵にそのまま重なります)。
何を囲むかは BoxTrackCHOP に渡す画像で決まります。ここでは明るさですが、前のフレームとの差(動き)や、
ある色との近さを TOP で作って渡せば、それを囲みます。
この例を開くには BoxTrackCHOP プラグインが要ります。

ネットワーク: `in0` (noiseTOP: `type=simplex3d`, `mono=False`, `period=1.1`, `harmon=0`, `exp=1.6`, `outputresolution=custom`, `resolutionw=960`, `resolutionh=540`, `tz={'expr': 'absTime.seconds * 0.12'}`) → `small` (resolutionTOP: `outputresolution=custom`, `resolutionw=320`, `resolutionh=180`) → `BoxOverlay` (パレット: `Style=Corners`, `Linewidth=2`, `Cornerlength=0.2`, `Cross=5`, `Dim=0.35`, `Labeltext=OBJ {id:03d}  {px_w}x{px_h}`, `Labelsize=14`) → `out1`

[BoxOverlayExample_track.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/BoxOverlayExample_track.toe)

??? note "手順(Visualize/BoxOverlay.example_track.py)"

    ```python
    """検出から描画まで(BoxTrackCHOP → BoxOverlay)

    動く絵の明るいところを BoxTrackCHOP で箱にして、BoxOverlay で枠とラベルを重ねた例です。
    検出には、絵を幅 320 に縮めたものを渡しています(位置は 0〜1 で出るので、元の解像度の絵にそのまま重なります)。
    何を囲むかは BoxTrackCHOP に渡す画像で決まります。ここでは明るさですが、前のフレームとの差(動き)や、
    ある色との近さを TOP で作って渡せば、それを囲みます。
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
        track.par.Mergegap = 0
        track.par.Cellsize = 4
        track.par.Minarea = 0.004
        track.par.Maxboxes = 24
        ex.palette(tox, image, track, Style="Corners", Linewidth=2, Cornerlength=0.2, Cross=5, Dim=0.35,
                   Labeltext="OBJ {id:03d}  {px_w}x{px_h}", Labelsize=14)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

使用例「検出から描画まで(BoxTrackCHOP → BoxOverlay)」の .toe は、ほかに [BoxTrackCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BoxTrackCHOP/) を使っています。使用例を開くときは、こちらも入れておいてください。

27 個のオペレータ。sha256: `13c84eefd724bc97…`
