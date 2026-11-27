<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BoxTrackCHOP/ -->

# Box Track (BoxTrackCHOP)

## 概要

画像の中の「しきい値より明るいところ」を箱(バウンディングボックス)で囲み、箱の一覧を CHOP で出します。
箱はフレームをまたいで追いかけるので、同じものには同じ番号(`id`)と同じ場所(サンプル)が付き続けます。
検出枠やデータ表示の演出で、枠・ラベル・数値を描くもとのデータとして使います。

何を囲むかは、プラグインに渡す画像で決めます。明るいもの、動いたもの(前のフレームとの差)、ある色に近いもの、
輪郭など、TOP で「囲みたいところが明るい画像」を作って `TOP` パラメータに指定します。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Boxtrack` |
| ラベル | Box Track |
| 種類 | CHOP |
| 入力数 | 0 – 0 |
| バージョン | 1.0 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=BoxTrackCHOP)

### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `BoxTrackCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### 明るいところを箱で囲む

![明るいところを箱で囲む](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/BoxTrackCHOP-default.svg)

ゆっくり動くノイズの明るい部分を見つけて、箱の一覧にします。1 サンプルが 1 つの箱で、
`tx` `ty` が中心、`w` `h` が大きさ(0〜1)、`id` は箱ごとに付く番号で、動いても同じ番号のままです。
図は 16 個ぶんの場所それぞれの `active`(箱があるか)、`tx`、`ty`、`w`、`h` です。

ネットワーク: `noise1` (noiseTOP: `type=sparse`, `mono=True`, `period=0.6`, `harmon=0`, `exp=1.5`, `outputresolution=custom`, `resolutionw=320`, `resolutionh=180`, `tz={'expr': 'absTime.seconds * 0.1'}`) → `plugin` (CPlusPlus CHOP: `Top=noise1`, `Threshold=0.6`, `Cellsize=4`, `Maxboxes=16`, `Minage=1`) → `select1` (selectCHOP: `channames=active tx ty w h`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.333 ms** — 余裕の無い 60 fps のプロジェクトなら **58.8 fps**(-1.2)。

ファイル: `BoxTrackCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """明るいところを箱で囲む

    ゆっくり動くノイズの明るい部分を見つけて、箱の一覧にします。1 サンプルが 1 つの箱で、
    `tx` `ty` が中心、`w` `h` が大きさ(0〜1)、`id` は箱ごとに付く番号で、動いても同じ番号のままです。
    図は 16 個ぶんの場所それぞれの `active`(箱があるか)、`tx`、`ty`、`w`、`h` です。
    """

    FRAMES = 30

    def build(ex):
        image = ex.source("noiseTOP", type="sparse", mono=True, period=0.6, harmon=0, exp=1.5,
                          outputresolution="custom", resolutionw=320, resolutionh=180,
                          tz={"expr": "absTime.seconds * 0.1"})
        boxes = ex.plugin(Top=image, Threshold=0.6, Cellsize=4, Maxboxes=16, Minage=1)
        ex.out(ex.op("selectCHOP", input=boxes, channames="active tx ty w h"))
    ```

**TouchDesigner テスト: 4 / 4 件合格**(test_box_of_a_rectangle, test_coordinates, test_moving_rectangle_keeps_its_id, test_no_top_is_a_warning_not_an_error)

### パラメータ: Detect

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Top` | TOP | TOP |  |  |  |
| `Channel` | Channel | Menu | `Luminance` | `Luminance` / `Red` / `Green` / `Blue` / `Alpha` |  |
| `Threshold` | Threshold | Float | 0.5 | 0 … 1 | 0 … 1 |
| `Invert` | Invert | Toggle | Off |  |  |
| `Cellsize` | Cell Size (pixels) | Int | 8 | 1 … 256 | 1 … 32 |
| `Mergegap` | Merge Gap (cells) | Int | 1 | 0 … 64 | 0 … 8 |
| `Minarea` | Min Area | Float | 0.001 | 0 … 1 | 0 … 1 |
| `Maxarea` | Max Area | Float | 0.9 | 0 … 1 | 0 … 1 |
| `Maxboxes` | Max Boxes | Int | 32 | 1 … 4096 | 1 … 128 |

### パラメータ: Track

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Maxmove` | Max Move | Float | 0.1 | 0 … 1 | 0 … 1 |
| `Minage` | Min Age (frames) | Int | 2 | 1 … 600 | 1 … 30 |
| `Hold` | Hold (frames) | Int | 5 | 0 … 600 | 0 … 60 |
| `Smooth` | Smooth | Float | 0.5 | 0 … 0.99 | 0 … 0.99 |
| `Coordinates` | Coordinates | Menu | `Uv` | `Uv` 0 to 1 (UV) / `Centered` Centered (width = 1) / `Pixels` |  |
| `Order` | Order | Menu | `Slots` | `Slots` Keep Place (slots) / `Activefirst` Shown First (oldest first) |  |
| `Reset` | Reset | Pulse |  |  |  |

## 使い方

### 出力

1 サンプルが 1 つの箱です(サンプル数は `Max Boxes`)。箱のない場所は全部 0 です。

| チャンネル | 内容 |
|---|---|
| `active` | 箱があれば 1 |
| `id` | 箱の番号(1 から。消えた番号は Reset まで使い回さない) |
| `age` | 現れてからのフレーム数 |
| `tx` `ty` | 箱の中心 |
| `w` `h` | 箱の幅と高さ |
| `vx` `vy` | 中心の 1 フレームあたりの動き |
| `area` | 箱の中で「明るい」ピクセルが画像全体に占める割合 |
| `value` | そのピクセルの値の平均(0〜1) |
| `r` `g` `b` | そのピクセルの色の平均(0〜1) |
| `lost` | 見失ってからのフレーム数(見えていれば 0) |

位置と大きさの単位は `Coordinates` で選びます。

- `0 to 1 (UV)`: 左下が (0, 0)、右上が (1, 1)。TOP の UV と同じです。
- `Centered (width = 1)`: 画像の中心が 0、幅が 1(高さは 高さ ÷ 幅)。幅 1 の平面にインスタンシングで枠を置くときに、そのまま使えます。
- `Pixels`: 入力画像のピクセル。

Info CHOP には `boxes`(今ある箱の数)、`detections`(今のフレームで見つかった数)、画像の大きさが出ます。

### 検出の調整

- `Channel` / `Threshold` / `Invert`: どのピクセルを「明るい」とみなすか。
- `Cell Size`: 画像をこの大きさのマス目で見ます。大きいほど軽く、細かい粒がまとまります。箱の端はピクセル単位で正確です。
- `Merge Gap`: 間に空のマスがこの数以下なら、1 つの箱にまとめます。
- `Min Area` / `Max Area`: 箱の面積(画像全体に対する割合)がこの範囲のものだけ残します。
- `Max Boxes`: 出力のサンプル数。多すぎるときは大きい箱が残ります。

### 追跡の調整

- `Max Move`: 1 フレームでこれ以上動いたものは別の箱とみなします(画像の長い辺に対する割合)。前の箱と重なっていれば、これより動いていても同じ箱です。
- `Min Age`: このフレーム数だけ続けて見えた箱から出します。一瞬だけ出るノイズを消せます。
- `Hold`: 見失った箱を、このフレーム数だけその場に残します。ちらつきを抑えます。
- `Smooth`: 箱の動きと大きさをなめらかにします(0 でそのまま)。
- `Order`: `Keep Place` は箱が消えるまで同じサンプルに居続けます(インスタンシング向き)。`Shown First` は今ある箱を古い順に前へ詰めます(一覧表示向き)。

### 注意

- 画像は毎フレーム GPU から読み出すので、入力は小さいほうが軽くなります。検出用には Resolution TOP で幅 320 程度に落とした画像で十分なことが多いです(位置は 0〜1 で出るので、元の解像度の絵にそのまま重ねられます)。
- 追跡は 1 フレームに 1 回進みます。同じフレームで同じ画像を 2 回 cook しても進みません。
- 画像の大きさが変わると、追跡は最初からやり直します。
