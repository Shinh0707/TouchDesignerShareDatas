<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/ -->

# Pixel Sorter (PixcelSorterGlitchTOP)

## 概要

!!! warning "非推奨(Deprecated)"
    新しく作るときは [Pixel Arg Sorter](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/)(点数を入れると UV マップが出る TOP)と Remap TOP を使ってください。
    同じ並べ替えが 3〜4 割短い時間で済みます。パレットの PixelSorter は、その 2 つを組んで、この TOP と同じパラメータを持たせたものです。
    この TOP は今後も動き、削除はしません(保存済みのプロジェクトはそのまま使えます)。ノードの情報(中クリック)にも同じ案内が出ます。

Kim Asendorf氏の[ASDFPixelSort](https://github.com/kimasendorf/ASDFPixelSort)を参考に, PixcelSortingをTouchDesignerのプラグイン化したものです.(Black,Brightness,R,G,B,RGBMaxのモードを選択できます)
使用例: [PixcelSorterGlitchTOPExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/blob/main/Projects/PixcelSorterGlitchTOPExample.toe)
![PixcelSorterGlitchTOPの適用後](https://github.com/Shinh0707/TouchDesignerShareDatas/blob/main/doc/PixcelSorterGlitchTOPExample.png "PixcelSorterGlitchTOP適用後")

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Pixelsorter` |
| ラベル | Pixel Sorter (Deprecated) |
| 種類 | TOP |
| 入力数 | 1 – 1 |
| バージョン | 0.1 |
| 作者 | Shinh0707 |
| Execute mode | CPUMem |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=PixcelSorterGlitchTOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 1080p | TOP 1920x1080 | 0.562 ms<br>60→58.0 fps | 5.03 ms<br>60→46.1 fps 🔻 |
| 720p UV map 0.25 | TOP 1280x720 | 0.067 ms<br>60→59.8 fps | 0.437 ms<br>60→58.5 fps |
| 720p UV map 1.0 | TOP 1280x720 | 0.345 ms<br>60→58.8 fps | 3.94 ms<br>60→48.5 fps 🔻 |
| 720p angle 110 | TOP 1280x720 | 0.845 ms<br>60→57.1 fps 🔻 | 4.20 ms<br>60→47.9 fps 🔻 |
| 720p angle 20 | TOP 1280x720 | 0.843 ms<br>60→57.1 fps 🔻 | 3.83 ms<br>60→48.8 fps 🔻 |
| 720p angle 45 | TOP 1280x720 | 0.900 ms<br>60→56.9 fps 🔻 | 3.62 ms<br>60→49.3 fps 🔻 |
| 720p down | TOP 1280x720 | 0.919 ms<br>60→56.9 fps 🔻 | 4.08 ms<br>60→48.2 fps 🔻 |
| 720p left | TOP 1280x720 | 0.678 ms<br>60→57.7 fps 🔻 | 3.59 ms<br>60→49.4 fps 🔻 |
| 720p vertical | TOP 1280x720 | 0.874 ms<br>60→57.0 fps 🔻 | 2.73 ms<br>60→51.6 fps 🔻 |
| 720p whole line | TOP 1280x720 | 0.441 ms<br>60→58.5 fps | 3.37 ms<br>60→49.9 fps 🔻 |
| default | TOP 1280x720 | 0.267 ms<br>60→59.1 fps | 2.96 ms<br>60→50.9 fps 🔻 |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `PixcelSorterGlitchTOP` の `examples/` にある手順(Python)から自動で作っています。

#### 斜めに流す(Direction = Angle)

![斜めに流す(Direction = Angle)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/PixcelSorterGlitchTOP-angle_diagonal.png)

Direction を Angle にすると、Angle の向き(右から反時計回り、ここでは 30 度)にスコアが大きくなるように並べ替えます。
画像を斜めの線に切り分けて、線ごとに並べ替えます。どのピクセルもちょうど 1 本の線に入るので、色は元の画像のままで位置だけが変わります。
Angle Unit で度・ラジアン・回転数(1 で 1 周)を選べます。

ネットワーク: `in0` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Mettler.3.jpg'"}`, `outputresolution=half`) → `plugin` (CPlusPlus TOP: `Mode=Brightness`, `Direction=Angle`, `Angle=30`, `Threshold=0.3`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.704 ms** — 余裕の無い 60 fps のプロジェクトなら **57.6 fps**(-2.4)。

!!! warning "フレームレートへの影響が大きめです"
    この使用例では 60 fps から 2 fps 以上落ちます。入力の解像度やパラメータに注意してください。

ファイル: `PixcelSorterGlitchTOPExample.toe`

??? note "手順(examples/angle_diagonal.py)"

    ```python
    """斜めに流す(Direction = Angle)

    Direction を Angle にすると、Angle の向き(右から反時計回り、ここでは 30 度)にスコアが大きくなるように並べ替えます。
    画像を斜めの線に切り分けて、線ごとに並べ替えます。どのピクセルもちょうど 1 本の線に入るので、色は元の画像のままで位置だけが変わります。
    Angle Unit で度・ラジアン・回転数(1 で 1 周)を選べます。
    """

    IMAGE = {"expr": "app.samplesFolder + '/Map/Mettler.3.jpg'"}

    def build(ex):
        img = ex.input("moviefileinTOP", file=IMAGE, outputresolution="half")   # 640×360
        ex.plugin(img, Mode="Brightness", Direction="Angle", Angle=30, Threshold=0.3)
    ```

#### 暗い部分を横に流す

![暗い部分を横に流す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/PixcelSorterGlitchTOP-default.png)

既定の設定です。Mode が Black のときは「暗さ」(1 − 明るさ)で比べるので、暗さが Threshold(0.25)を超える
ピクセルが続く区間を、行ごとに暗さの順に並べ替えます。画像は TouchDesigner に付属のサンプル
(Samples/Map/Mettler.3.jpg)です。

ネットワーク: `in0` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Mettler.3.jpg'"}`, `outputresolution=half`) → `plugin` (CPlusPlus TOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.709 ms** — 余裕の無い 60 fps のプロジェクトなら **57.5 fps**(-2.5)。

!!! warning "フレームレートへの影響が大きめです"
    この使用例では 60 fps から 2 fps 以上落ちます。入力の解像度やパラメータに注意してください。

ファイル: `PixcelSorterGlitchTOPExample_default.toe`

??? note "手順(examples/default.py)"

    ```python
    """暗い部分を横に流す

    既定の設定です。Mode が Black のときは「暗さ」(1 − 明るさ)で比べるので、暗さが Threshold(0.25)を超える
    ピクセルが続く区間を、行ごとに暗さの順に並べ替えます。画像は TouchDesigner に付属のサンプル
    (Samples/Map/Mettler.3.jpg)です。
    """

    IMAGE = {"expr": "app.samplesFolder + '/Map/Mettler.3.jpg'"}

    def build(ex):
        img = ex.input("moviefileinTOP", file=IMAGE, outputresolution="half")   # 640×360: 並べ替える画素が多いほど重くなります
        ex.plugin(img)
    ```

#### 中間の明るさだけを流す(Threshold Max と Range)

![中間の明るさだけを流す(Threshold Max と Range)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/PixcelSorterGlitchTOP-range_band.png)

明るさが Threshold(0.35)より大きく Threshold Max(0.7)以下のピクセルだけを並べ替えます(Range = Include)。
暗い部分と明るい部分は動かず、区間の切れ目になります。Range を Exclude にすると逆に、
この範囲の外(暗い部分と明るい部分)だけが並べ替えられます。

ネットワーク: `in0` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Mettler.3.jpg'"}`, `outputresolution=half`) → `plugin` (CPlusPlus TOP: `Mode=Brightness`, `Threshold=0.35`, `Thresholdmax=0.7`, `Range=Include`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.636 ms** — 余裕の無い 60 fps のプロジェクトなら **57.8 fps**(-2.2)。

!!! warning "フレームレートへの影響が大きめです"
    この使用例では 60 fps から 2 fps 以上落ちます。入力の解像度やパラメータに注意してください。

ファイル: `PixcelSorterGlitchTOPExample_range_band.toe`

??? note "手順(examples/range_band.py)"

    ```python
    """中間の明るさだけを流す(Threshold Max と Range)

    明るさが Threshold(0.35)より大きく Threshold Max(0.7)以下のピクセルだけを並べ替えます(Range = Include)。
    暗い部分と明るい部分は動かず、区間の切れ目になります。Range を Exclude にすると逆に、
    この範囲の外(暗い部分と明るい部分)だけが並べ替えられます。
    """

    IMAGE = {"expr": "app.samplesFolder + '/Map/Mettler.3.jpg'"}

    def build(ex):
        img = ex.input("moviefileinTOP", file=IMAGE, outputresolution="half")
        ex.plugin(img, Mode="Brightness", Threshold=0.35, Thresholdmax=0.7, Range="Include")
    ```

#### 小さい UV マップで並べ替えて、もとの解像度で描く(Output = UV Map)

![小さい UV マップで並べ替えて、もとの解像度で描く(Output = UV Map)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/PixcelSorterGlitchTOP-uv_remap.png)

Output を UV Map にすると、絵の代わりに「並べ替えたあとの各ピクセルがもとのどこから来たか」の UV マップ
(32 bit float、r = u、g = v)が出ます。Resolution Scale(ここでは 0.25)で入力より小さいマップにすると、
並べ替える画素が減るので軽くなります。Remap TOP の 1 番目にもとの画像、2 番目にこのマップを入れると、
もとの解像度の絵になります。動かなかった部分はもとの画像のままの細かさで、流れた部分は粗くなります。

ネットワーク: `in0` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Mettler.3.jpg'"}`) → `plugin` (CPlusPlus TOP: `Output=Uv`, `Resolutionscale=0.25`) → `remap` (remapTOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.542 ms** — 余裕の無い 60 fps のプロジェクトなら **58.1 fps**(-1.9)。

ファイル: `PixcelSorterGlitchTOPExample_uv_remap.toe`

??? note "手順(examples/uv_remap.py)"

    ```python
    """小さい UV マップで並べ替えて、もとの解像度で描く(Output = UV Map)

    Output を UV Map にすると、絵の代わりに「並べ替えたあとの各ピクセルがもとのどこから来たか」の UV マップ
    (32 bit float、r = u、g = v)が出ます。Resolution Scale(ここでは 0.25)で入力より小さいマップにすると、
    並べ替える画素が減るので軽くなります。Remap TOP の 1 番目にもとの画像、2 番目にこのマップを入れると、
    もとの解像度の絵になります。動かなかった部分はもとの画像のままの細かさで、流れた部分は粗くなります。
    """

    IMAGE = {"expr": "app.samplesFolder + '/Map/Mettler.3.jpg'"}

    def build(ex):
        img = ex.input("moviefileinTOP", file=IMAGE)   # 1280×720
        uv = ex.plugin(img, Output="Uv", Resolutionscale=0.25)   # 320×180 の UV マップ
        remap = ex.op("remapTOP", name="remap", input=[img, uv])
        ex.out(remap)
    ```

#### 明るい部分を縦に流す

![明るい部分を縦に流す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/PixcelSorterGlitchTOP-vertical_brightness.png)

明るさが Threshold(0.3)を超えるピクセルが続く区間を、列ごとに明るさの順に並べ替えます。
しきい値より暗いピクセルは動かないので、暗い輪郭が区間の切れ目になります。

ネットワーク: `in0` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Mettler.3.jpg'"}`, `outputresolution=half`) → `plugin` (CPlusPlus TOP: `Mode=Brightness`, `Direction=Vertical`, `Threshold=0.3`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.704 ms** — 余裕の無い 60 fps のプロジェクトなら **57.6 fps**(-2.4)。

!!! warning "フレームレートへの影響が大きめです"
    この使用例では 60 fps から 2 fps 以上落ちます。入力の解像度やパラメータに注意してください。

ファイル: `PixcelSorterGlitchTOPExample_vertical_brightness.toe`

??? note "手順(examples/vertical_brightness.py)"

    ```python
    """明るい部分を縦に流す

    明るさが Threshold(0.3)を超えるピクセルが続く区間を、列ごとに明るさの順に並べ替えます。
    しきい値より暗いピクセルは動かないので、暗い輪郭が区間の切れ目になります。
    """

    IMAGE = {"expr": "app.samplesFolder + '/Map/Mettler.3.jpg'"}

    def build(ex):
        img = ex.input("moviefileinTOP", file=IMAGE, outputresolution="half")   # 640×360: 並べ替える画素が多いほど重くなります
        ex.plugin(img, Mode="Brightness", Direction="Vertical", Threshold=0.3)
    ```

#### 行全体でまとめて並べ替える(Sort = Whole Line)

![行全体でまとめて並べ替える(Sort = Whole Line)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/PixcelSorterGlitchTOP-whole_line.png)

Sort が Each Interval(既定)のときは、対象のピクセルが続く区間ごとに並べ替えます。Whole Line にすると、
1 行の中の対象のピクセルを全部まとめて並べ替え、対象だった位置に順に戻します。対象でないピクセルを
飛び越えて色が移るので、区間ごとよりも大きく崩れます。

ネットワーク: `in0` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Mettler.3.jpg'"}`, `outputresolution=half`) → `plugin` (CPlusPlus TOP: `Mode=Brightness`, `Threshold=0.35`, `Sort=Line`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.668 ms** — 余裕の無い 60 fps のプロジェクトなら **57.7 fps**(-2.3)。

!!! warning "フレームレートへの影響が大きめです"
    この使用例では 60 fps から 2 fps 以上落ちます。入力の解像度やパラメータに注意してください。

ファイル: `PixcelSorterGlitchTOPExample_whole_line.toe`

??? note "手順(examples/whole_line.py)"

    ```python
    """行全体でまとめて並べ替える(Sort = Whole Line)

    Sort が Each Interval(既定)のときは、対象のピクセルが続く区間ごとに並べ替えます。Whole Line にすると、
    1 行の中の対象のピクセルを全部まとめて並べ替え、対象だった位置に順に戻します。対象でないピクセルを
    飛び越えて色が移るので、区間ごとよりも大きく崩れます。
    """

    IMAGE = {"expr": "app.samplesFolder + '/Map/Mettler.3.jpg'"}

    def build(ex):
        img = ex.input("moviefileinTOP", file=IMAGE, outputresolution="half")
        ex.plugin(img, Mode="Brightness", Threshold=0.35, Sort="Line")
    ```

**TouchDesigner テスト: 8 / 8 件合格**(test_angle_only_moves_pixels_and_quarter_turns_match_the_menu, test_exclude_keeps_the_range_in_place, test_left_and_down_are_the_mirror_images, test_modes_r_and_b_use_their_own_channel, test_resolution_scale_sizes_the_uv_map_only, test_threshold_one_changes_nothing, test_uv_map_through_remap_is_the_picture, test_whole_line_sorts_every_row)

### パラメータ: (no page)

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Mode` | Mode | Menu | `0` | `Black` / `Brightness` / `R` / `G` / `B` / `Rgbmax` RGBMax |  |
| `Direction` | Direction | Menu | `0` | `Horizontal` Right / `Vertical` Up / `Left` / `Down` / `Angle` |  |
| `Angleunit` | Angle Unit | Menu | `Degrees` | `Degrees` / `Radians` / `Cycles` |  |
| `Angle` | Angle | Float | 0 | −∞ … ∞ | 0 … 360 |
| `Threshold` | Threshold | Float | 0.25 | −∞ … ∞ | 0 … 1 |
| `Thresholdmax` | Threshold Max | Float | 1 | −∞ … ∞ | 0 … 1 |
| `Range` | Range | Menu | `Include` | `Include` / `Exclude` |  |
| `Sort` | Sort | Menu | `Interval` | `Interval` Each Interval / `Line` Whole Line |  |
| `Output` | Output | Menu | `Image` | `Image` / `Uv` UV Map |  |
| `Resolutionscale` | Resolution Scale | Float | 0.5 | 0 … 1 | 0 … 1 |

### 出典・参考

- K. Asendorf (2010). [ASDFPixelSort](https://github.com/kimasendorf/ASDFPixelSort). GitHub (Processing). — しきい値で区切った区間ごとにピクセルを並べ替える方法のもと

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

## 使い方

TOP を 1 つつなぎます。Output が Image(既定)のとき、出力は入力と同じ解像度です。

線(行・列・斜めの線)ごとに、**対象のピクセル**を点数の順に並べ替えます。対象でないピクセルは動きません。

- **Mode**: 点数の付け方。*Brightness* は明るさ(R・G・B の平均)、*Black* は暗さ(1 − 明るさ)、*R / G / B* はその色の強さ、*RGBMax* は R・G・B の最大値です。
- **Direction**: 点数が大きくなっていく向きです。*Right* は行ごとに右へ、*Left* は左へ、*Up* は列ごとに上へ、*Down* は下へ。*Angle* は Angle の向きの斜めの線ごとに並べ替えます。Right と Up は以前の Horizontal と Vertical で、内部名(`Horizontal`、`Vertical`)も絵も変わりません。
- **Angle / Angle Unit**(Direction が Angle のときだけ有効): 右から反時計回りの角度です(0 = Right、90 度 = Up、180 度 = Left、270 度 = Down)。単位は Angle Unit で *Degrees*(度)、*Radians*(ラジアン)、*Cycles*(1 で 1 周)から選びます。
- **Threshold / Threshold Max / Range**: 対象の決め方です。*Include*(既定)では、点数が Threshold より大きく Threshold Max 以下のピクセルが対象です。*Exclude* ではその範囲の外が対象になります。既定(Threshold Max = 1、Include)は「Threshold を超えるピクセル」です。Threshold が小さいほど対象が増え、大きく流れます。
- **Sort**: *Each Interval*(既定)は、対象のピクセルが続いている区間ごとに並べ替えます。対象でないピクセルが区間の切れ目になり、色は区間の外へ出ません。*Whole Line* は、1 行(1 列)の対象を全部まとめて並べ替え、対象だった位置に順に戻します。
- **Output**: *Image* は並べ替えた絵。*UV Map* は、並べ替えたあとの各ピクセルがもとのどこから来たかの UV マップ(32 bit float、r = u、g = v、b = 0、a = 1)です。
- **Resolution Scale**(UV Map のときだけ有効): UV マップの大きさ(入力に対する倍率)。入力はこの大きさで読まれるので、小さくすると並べ替える画素が減ります。

### 斜めの線の決め方

Angle では、画像を同じ向きの斜めの線に切り分けます。横寄りの角度なら、線は x が 1 進むごとに傾きの分だけ y がずれていく階段状の線で、どのピクセルもちょうど 1 本の線に入ります(縦寄りの角度では x と y が入れ替わります)。
補間はしないので、出力は入力のピクセルを並べ替えただけのものです。UV Map 出力も同じ線で作られます。
画像の角を通る線は短くなり、1 ピクセルだけの線は動きません。

### 溶けたように見えるわけ

区間の中は点数の順に並ぶので、区間の端には Threshold に近い色が、反対の端には Threshold から遠い色が集まります。
区間のすぐ外(対象でないピクセル)も Threshold に近い色なので、境目がなだらかにつながり、そこから色が伸びたように見えます。
Whole Line では色が区間を飛び越えるので、このつながりは弱くなります。

## 重さの目安と軽くする方法

時間は**対象のピクセル数**にほぼ比例します。下は 1280×720 の写真(Samples/Map/Mettler.3.jpg)を TouchDesigner の中で測った値です(Apple M シリーズ、ms)。

| 設定 | 対象の割合 | v0.3.2 まで | この版 |
|---|---|---|---|
| Threshold 1(対象なし。画像の受け渡しだけ) | 0 % | 0.66 | 0.67 |
| Black、Threshold 0.6 | 31 % | 1.34 | 0.99 |
| Brightness、Threshold 0.3 | 76 % | 2.48 | 1.21 |
| Black、Threshold 0.25(既定) | 93 % | 2.83 | 1.47 |
| Black、Threshold 0 | 100 % | 3.28 | 1.52 |

Direction による違いは小さく、斜めでもほぼ同じです(同じ写真、ms)。

| Direction | Black、Threshold 0.25(既定) | Brightness、Threshold 0.3 |
|---|---|---|
| Right | 1.45 | 1.19 |
| Up | 1.50 | 1.27 |
| Left | 1.39 | 1.21 |
| Down | 1.58 | 1.30 |
| Angle 20 度 | 1.48 | 1.40 |
| Angle 45 度 | 1.54 | 1.30 |
| Angle 110 度 | 1.45 | 1.25 |
| Angle 225 度 | 1.57 | 1.30 |

軽くするには、次のどれかで並べ替える画素を減らします。

1. **Threshold / Threshold Max で対象を絞る**。対象が少ないほど軽くなります。
2. **入力を小さくする**(Resolution TOP などで半分にしてから入れる)。画素数が 1/4 になります。
3. **Output = UV Map と Resolution Scale を使う**。小さい UV マップを作り、Remap TOP(1 番目にもとの画像、2 番目に UV マップ)でもとの解像度の絵にします。動かなかった部分はもとの細かさのまま残り、流れた部分だけが粗くなります。使用例「小さい UV マップで並べ替えて、もとの解像度で描く」がこのつなぎ方です。

UV マップ + Remap TOP の時間(同じ写真、既定の設定、ms。Remap TOP の分を含む):

| Resolution Scale | UV マップ | 時間 |
|---|---|---|
| Image 出力(比較用) | — | 1.4〜1.8 |
| 1 | 1280×720 | 1.55 |
| 0.5 | 640×360 | 0.67 |
| 0.25 | 320×180 | 0.47 |
| 0.125 | 160×90 | 0.45 |

Resolution Scale 1 の UV マップを Remap TOP(Input Smoothness = Nearest)に通すと、Image 出力と同じ絵になります。
0.25 より小さくしても、入力画像を CPU に受け取る時間(約 0.4 ms)が残るので、ほとんど変わりません。

!!! note
    並べ替えは CPU で行います(8 bit RGBA)。
