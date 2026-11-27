<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/ -->

# Pixel Arg Sorter (PixelArgSorterTOP)

## 概要

ピクセルソートの「どこへ動かすか」だけを計算する TOP です。1 チャンネルの**点数**(明るさなど)を入れると、
並べ替えたあとの各ピクセルがもとのどこから来たかの **UV マップ**(入力と同じ解像度)が出ます。
Remap TOP の 1 番目にもとの画像、2 番目にこのマップを入れると、並べ替えた絵になります。

[Pixel Sorter](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/)(非推奨)の後継です。画像そのものは GPU から出ないので、同じ並べ替えが 3〜4 割短い時間で済み、
点数の作り方は自由になります(GPU の TOP で作ります)。Kim Asendorf 氏の [ASDFPixelSort](https://github.com/kimasendorf/ASDFPixelSort) の方法がもとです。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Pixelargsorter` |
| ラベル | Pixel Arg Sorter |
| 種類 | TOP |
| 入力数 | 1 – 1 |
| バージョン | 1.0 |
| 作者 | Shinh0707 |
| Execute mode | CPUMem |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=PixelArgSorterTOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 1080p | TOP 1920x1080 | 0.897 ms<br>60→56.9 fps 🔻 | 3.76 ms<br>60→49.0 fps 🔻 |
| 720p 110 | TOP 1280x720 | 0.310 ms<br>60→58.9 fps | 2.32 ms<br>60→52.7 fps 🔻 |
| 720p 180 | TOP 1280x720 | 0.205 ms<br>60→59.3 fps | 2.06 ms<br>60→53.4 fps 🔻 |
| 720p 20 | TOP 1280x720 | 0.541 ms<br>60→58.1 fps | 2.73 ms<br>60→51.5 fps 🔻 |
| 720p 270 | TOP 1280x720 | 0.499 ms<br>60→58.3 fps | 2.28 ms<br>60→52.8 fps 🔻 |
| 720p 45 | TOP 1280x720 | 0.545 ms<br>60→58.1 fps | 2.75 ms<br>60→51.5 fps 🔻 |
| 720p 90 | TOP 1280x720 | 0.510 ms<br>60→58.2 fps | 2.60 ms<br>60→51.9 fps 🔻 |
| 720p whole line | TOP 1280x720 | 0.493 ms<br>60→58.3 fps | 2.95 ms<br>60→51.0 fps 🔻 |
| default | TOP 1280x720 | 0.380 ms<br>60→58.7 fps | 1.73 ms<br>60→54.4 fps 🔻 |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `PixelArgSorterTOP` の `examples/` にある手順(Python)から自動で作っています。

#### 斜めに流す(Angle = 30 度)

![斜めに流す(Angle = 30 度)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/PixelArgSorterTOP-angle.png)

Angle は点数が大きくなっていく向きで、右から反時計回りの角度です(0 = 右、90 度 = 上、180 度 = 左、270 度 = 下)。
90 度の倍数でない角度では、画像を斜めの線に切り分けて、線ごとに並べ替えます。
ここでは Level TOP で明るさを反転して「暗さ」を点数にしています。点数は GPU の TOP で自由に作れます。

ネットワーク: `in0` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Mettler.3.jpg'"}`, `outputresolution=quarter`) → `mono` (monochromeTOP) → `score` (levelTOP: `invert=1`) → `plugin` (CPlusPlus TOP: `Angle=30`, `Threshold=0.4`) → `remap` (remapTOP: `inputfiltertype=nearest`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.473 ms** — 余裕の無い 60 fps のプロジェクトなら **58.3 fps**(-1.7)。

ファイル: `PixelArgSorterTOPExample.toe`

??? note "手順(examples/angle.py)"

    ```python
    """斜めに流す(Angle = 30 度)

    Angle は点数が大きくなっていく向きで、右から反時計回りの角度です(0 = 右、90 度 = 上、180 度 = 左、270 度 = 下)。
    90 度の倍数でない角度では、画像を斜めの線に切り分けて、線ごとに並べ替えます。
    ここでは Level TOP で明るさを反転して「暗さ」を点数にしています。点数は GPU の TOP で自由に作れます。
    """

    IMAGE = {"expr": "app.samplesFolder + '/Map/Mettler.3.jpg'"}

    def build(ex):
        img = ex.input("moviefileinTOP", file=IMAGE, outputresolution="quarter")   # 320×180: CPU で並べ替えるので、画素数に比例して時間がかかります
        mono = ex.op("monochromeTOP", name="mono", input=img)
        score = ex.op("levelTOP", name="score", input=mono, invert=1)           # 点数 = 暗さ
        uv = ex.plugin(score, Angle=30, Threshold=0.4)
        remap = ex.op("remapTOP", name="remap", input=[img, uv], inputfiltertype="nearest")
        ex.out(remap)
    ```

#### 明るさの点数から UV マップを作り、Remap TOP で並べ替える

![明るさの点数から UV マップを作り、Remap TOP で並べ替える](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/PixelArgSorterTOP-default.png)

Monochrome TOP で作った明るさ(1 チャンネルの点数)を入れると、「並べ替えたあとの各ピクセルがもとのどこから来たか」の
UV マップが出ます。Remap TOP の 1 番目にもとの画像、2 番目にこのマップを入れると、並べ替えた絵になります。
既定では点数が Threshold(0.25)を超えるピクセルが続く区間を、行ごとに右へ点数が大きくなる順に並べ替えます。
画像は TouchDesigner に付属のサンプル(Samples/Map/Mettler.3.jpg)です。

ネットワーク: `in0` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Mettler.3.jpg'"}`, `outputresolution=quarter`) → `score` (monochromeTOP) → `plugin` (CPlusPlus TOP) → `remap` (remapTOP: `inputfiltertype=nearest`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.465 ms** — 余裕の無い 60 fps のプロジェクトなら **58.4 fps**(-1.6)。

ファイル: `PixelArgSorterTOPExample_default.toe`

??? note "手順(examples/default.py)"

    ```python
    """明るさの点数から UV マップを作り、Remap TOP で並べ替える

    Monochrome TOP で作った明るさ(1 チャンネルの点数)を入れると、「並べ替えたあとの各ピクセルがもとのどこから来たか」の
    UV マップが出ます。Remap TOP の 1 番目にもとの画像、2 番目にこのマップを入れると、並べ替えた絵になります。
    既定では点数が Threshold(0.25)を超えるピクセルが続く区間を、行ごとに右へ点数が大きくなる順に並べ替えます。
    画像は TouchDesigner に付属のサンプル(Samples/Map/Mettler.3.jpg)です。
    """

    IMAGE = {"expr": "app.samplesFolder + '/Map/Mettler.3.jpg'"}

    def build(ex):
        img = ex.input("moviefileinTOP", file=IMAGE, outputresolution="quarter")   # 320×180: CPU で並べ替えるので、画素数に比例して時間がかかります
        score = ex.op("monochromeTOP", name="score", input=img)                 # 点数 = 明るさ
        uv = ex.plugin(score)
        remap = ex.op("remapTOP", name="remap", input=[img, uv], inputfiltertype="nearest")
        ex.out(remap)
    ```

#### 出力そのもの: UV マップ

![出力そのもの: UV マップ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/PixelArgSorterTOP-uv_map.png)

出力は入力と同じ解像度の UV マップ(32 bit float、r = u、g = v)です。動かなかったピクセルは自分の位置を持つので、
なめらかなグラデーションのままです。並べ替えられた区間だけ、もとの位置がばらばらに入ります。
このマップは Remap TOP のほか、別の画像の並べ替え(同じ流れ方を別の絵にかける)にも使えます。

ネットワーク: `in0` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Mettler.3.jpg'"}`, `outputresolution=quarter`) → `score` (monochromeTOP) → `plugin` (CPlusPlus TOP: `Threshold=0.5`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.476 ms** — 余裕の無い 60 fps のプロジェクトなら **58.3 fps**(-1.7)。

ファイル: `PixelArgSorterTOPExample_uv_map.toe`

??? note "手順(examples/uv_map.py)"

    ```python
    """出力そのもの: UV マップ

    出力は入力と同じ解像度の UV マップ(32 bit float、r = u、g = v)です。動かなかったピクセルは自分の位置を持つので、
    なめらかなグラデーションのままです。並べ替えられた区間だけ、もとの位置がばらばらに入ります。
    このマップは Remap TOP のほか、別の画像の並べ替え(同じ流れ方を別の絵にかける)にも使えます。
    """

    IMAGE = {"expr": "app.samplesFolder + '/Map/Mettler.3.jpg'"}

    def build(ex):
        img = ex.input("moviefileinTOP", file=IMAGE, outputresolution="quarter")   # 320×180: CPU で並べ替えるので、画素数に比例して時間がかかります
        score = ex.op("monochromeTOP", name="score", input=img)
        ex.plugin(score, Threshold=0.5)
    ```

**TouchDesigner テスト: 4 / 4 件合格**(test_a_column_grows_upwards_at_ninety_degrees, test_angles_move_pixels_only_and_a_full_turn_is_the_same, test_the_score_is_the_red_channel_and_rows_are_sorted, test_threshold_one_gives_the_identity_map)

### パラメータ: Pixel Arg Sorter

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Angleunit` | Angle Unit | Menu | `Degrees` | `Degrees` / `Radians` / `Cycles` |  |
| `Angle` | Angle | Float | 0 | −∞ … ∞ | 0 … 360 |
| `Threshold` | Threshold | Float | 0.25 | −∞ … ∞ | 0 … 1 |
| `Thresholdmax` | Threshold Max | Float | 1 | −∞ … ∞ | 0 … 1 |
| `Range` | Range | Menu | `Include` | `Include` / `Exclude` |  |
| `Sort` | Sort | Menu | `Interval` | `Interval` Each Interval / `Line` Whole Line |  |

### 出典・参考

- K. Asendorf (2010). [ASDFPixelSort](https://github.com/kimasendorf/ASDFPixelSort). GitHub (Processing). — しきい値で区切った区間ごとにピクセルを並べ替える方法のもと

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

## 使い方

1. **点数を作る**: Monochrome TOP(明るさ)、Level TOP の Invert(暗さ)、Reorder TOP(R だけ、など)で、並べ替えの基準を 1 チャンネルにします。
   カラーの TOP をそのまま入れると **R チャンネル**が点数になります。点数は 8 bit(0〜255)で読みます。
2. **Pixel Arg Sorter** に入れる。出力は入力と同じ解像度の UV マップ(32 bit float、r = u、g = v)です。
3. **Remap TOP** の 1 番目にもとの画像、2 番目に UV マップを入れる。Input Smoothness は Nearest にします(同じ解像度なら、ピクセルを並べ替えただけの絵になります)。

線(行・列・斜めの線)ごとに、**対象のピクセル**を点数の順に並べ替えます。対象でないピクセルは動きません(自分の位置の UV を持ちます)。

- **Angle / Angle Unit**: 点数が大きくなっていく向きで、右から反時計回りの角度です(0 = 右、90 度 = 上、180 度 = 左、270 度 = 下)。
  単位は Angle Unit で *Degrees*(度)、*Radians*(ラジアン)、*Cycles*(1 で 1 周)から選びます。どんな数でもよく、1 周分の余りを使います(370 度 = 10 度、−90 度 = 270 度)。
  90 度の倍数は行または列をそのまま並べ替えるので、いちばん軽くなります(とくに 0 度と 180 度)。
- **Threshold / Threshold Max / Range**: 対象の決め方です。*Include*(既定)では、点数が Threshold より大きく Threshold Max 以下のピクセルが対象です。*Exclude* ではその範囲の外が対象になります。
- **Sort**: *Each Interval*(既定)は、対象のピクセルが続いている区間ごとに並べ替えます。*Whole Line* は、1 本の線の対象を全部まとめて並べ替え、対象だった位置に順に戻します。

### 斜めの線の決め方

90 度の倍数でない角度では、画像を同じ向きの斜めの線に切り分けます。横寄りの角度なら、線は x が 1 進むごとに傾きの分だけ y がずれていく階段状の線で、
どのピクセルもちょうど 1 本の線に入ります(縦寄りの角度では x と y が入れ替わります)。補間はしません。線の切り方は Pixel Sorter の Angle と同じです。

### Pixel Sorter との違い

- **同じ点数のピクセルの順番**: この TOP は点数だけで決めるので、同じ点数のピクセルは線の上でのもとの順番のままです。Pixel Sorter は色の値の順に並べます。
  どのピクセル位置でも点数は同じになりますが、同じ点数どうしの色の並びは変わります(写真では半分以上のピクセルで色が入れ替わります。見た目の流れ方は同じです)。
- **Mode がない**: 点数は外で作ります。Pixel Sorter の Mode と同じ点数は、*Brightness* = (R + G + B) / 3、*Black* = 1 − それ、*R / G / B* = その色、*RGBMax* = 最大値です。
  パレットの PixelSorter(この TOP と Remap TOP を組んだもの)が、Mode を含めて Pixel Sorter と同じパラメータを持ちます。
- **解像度**: UV マップの大きさは点数の TOP の大きさです。点数を小さく作れば(Resolution TOP など)、並べ替える画素が減って軽くなり、Remap TOP でもとの解像度の絵に戻せます。

## 重さの目安

1280×720 の写真(Samples/Map/Mettler.3.jpg)を TouchDesigner の中で測った値です(Apple M シリーズ、ms)。
この TOP の列は「点数を作る GLSL TOP + この TOP + Remap TOP」の合計、Pixel Sorter の列は Pixel Sorter だけの時間です。

| 向き | 暗さ、Threshold 0.25: Pixel Sorter | この TOP | 明るさ、Threshold 0.3: Pixel Sorter | この TOP |
|---|---|---|---|---|
| 0 度(右) | 1.51 | 0.80 | 1.23 | 0.73 |
| 90 度(上) | 1.56 | 1.09 | 1.34 | 1.05 |
| 180 度(左) | 1.54 | 0.83 | 1.19 | 0.80 |
| 270 度(下) | 1.45 | 1.10 | 1.32 | 1.03 |
| 20 度 | 1.52 | 0.92 | 1.31 | 0.88 |
| 45 度 | 1.51 | 0.95 | 1.35 | 0.88 |
| 110 度 | 1.43 | 0.96 | 1.44 | 0.89 |
| 225 度 | 1.47 | 0.96 | 1.43 | 0.93 |

時間の多くは並べ替えではなく、GPU と CPU の間の受け渡しです。この TOP は 1 チャンネルだけを受け取るので、その分が短くなります。
GLSL TOP と Remap TOP の cook は各 0.01 ms ほどです(GPU の中の実行時間は、この測り方には入りきっていません)。

!!! note
    並べ替えは CPU で行います(点数は 8 bit)。
