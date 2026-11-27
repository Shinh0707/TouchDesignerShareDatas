<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/IdTrackCHOP/ -->

# ID Track (IdTrackCHOP)

## 概要

フレームごとに届く「点や箱の一覧」(1 サンプルが 1 つ、並び順はばらばらでよい)を追いかけて、同じものを同じ場所(サンプル)に置き、
同じ番号(`id`)を付け続けます。

検出の方法は問いません。Blob Track TOP、センサー、学習モデルの検出結果、パーティクルなど、位置のチャンネルを持つ CHOP なら何でも入力にできます。
インスタンシングやラベルの表示で、フレームごとに対象が入れ替わってちらつくのを防ぎます。
(画像から箱を見つけるところまで 1 つで行う [BoxTrackCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BoxTrackCHOP/) は、同じ追跡を中に持っています。)

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Idtrack` |
| ラベル | ID Track |
| 種類 | CHOP |
| 入力数 | 1 – 1 |
| バージョン | 1.0 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=IdTrackCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 32 items | CHOP 4ch x 32 | 0.006 ms<br>60→60.0 fps | 0.028 ms<br>60→59.9 fps |
| 512 items | CHOP 4ch x 512 | 0.400 ms<br>60→58.6 fps | 1.64 ms<br>60→54.6 fps 🔻 |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `IdTrackCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### 動く 3 つの点に、同じ番号を付け続ける

![動く 3 つの点に、同じ番号を付け続ける](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/IdTrackCHOP-default.svg)

3 つの点(1 サンプルが 1 つの点、`tx` `ty`)がゆっくり動きます。ID Track は、前のフレームのどれが今のどれかを
決めて、同じ点を同じ場所(サンプル)に置き、同じ `id` を付け続けます。入力の並び順が変わっても、出力は変わりません。
図は 8 個ぶんの場所それぞれの `active`、`id`、`tx`、`ty` です。

ネットワーク: `point0` (constantCHOP) → `point1` (constantCHOP) → `point2` (constantCHOP) → `in0` (joinCHOP: `blendmethod=none`) → `plugin` (CPlusPlus CHOP: `Maxitems=8`, `Minage=1`, `Smooth=0`) → `select1` (selectCHOP: `channames=active id tx ty`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.013 ms** — 余裕の無い 60 fps のプロジェクトなら **60.0 fps**(-0.1)。

ファイル: `IdTrackCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """動く 3 つの点に、同じ番号を付け続ける

    3 つの点(1 サンプルが 1 つの点、`tx` `ty`)がゆっくり動きます。ID Track は、前のフレームのどれが今のどれかを
    決めて、同じ点を同じ場所(サンプル)に置き、同じ `id` を付け続けます。入力の並び順が変わっても、出力は変わりません。
    図は 8 個ぶんの場所それぞれの `active`、`id`、`tx`、`ty` です。
    """

    FRAMES = 30

    POINTS = [
        ("0.3 + 0.2 * math.sin(absTime.seconds * 0.8)", "0.7"),
        ("0.6", "0.4 + 0.2 * math.cos(absTime.seconds * 0.6)"),
        ("0.8 - 0.1 * math.sin(absTime.seconds * 0.5)", "0.8"),
    ]

    def build(ex):
        ones = []
        for i, (tx, ty) in enumerate(POINTS):
            c = ex.op("constantCHOP", name="point%d" % i, x=-660, y=-110 * i)
            c.seq.const.numBlocks = 2
            c.par.const0name, c.par.const1name = "tx", "ty"
            c.par.const0value.expr, c.par.const1value.expr = tx, ty
            ones.append(c)
        points = ex.input("joinCHOP", input=ones, blendmethod="none")
        tracked = ex.plugin(points, Maxitems=8, Minage=1, Smooth=0)
        ex.out(ex.op("selectCHOP", input=tracked, channames="active id tx ty"))
    ```

**TouchDesigner テスト: 2 / 2 件合格**(test_ids_and_channels, test_other_channel_names)

### パラメータ: ID Track

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Position` | Position Channels | String | `tx ty` |  |  |
| `Size` | Size Channels | String | `w h` |  |  |
| `Activechannel` | Active Channel | String | `active` |  |  |
| `Maxitems` | Max Items | Int | 32 | 1 … 4096 | 1 … 128 |
| `Maxmove` | Max Move | Float | 0.1 | 0 … ∞ | 0 … 1 |
| `Minage` | Min Age (frames) | Int | 2 | 1 … 600 | 1 … 30 |
| `Hold` | Hold (frames) | Int | 5 | 0 … 600 | 0 … 60 |
| `Smooth` | Smooth | Float | 0.5 | 0 … 0.99 | 0 … 0.99 |
| `Order` | Order | Menu | `Slots` | `Slots` Keep Place (slots) / `Activefirst` Shown First (oldest first) |  |
| `Reset` | Reset | Pulse |  |  |  |

## 使い方

### 入力

1 サンプルが 1 つの対象です。どのチャンネルが位置かを `Position Channels` に書きます(既定は `tx ty`。`tx ty tz` や `u v` など、いくつでも)。
ほかのチャンネル(大きさ、色、スコアなど)は、その対象の値として一緒に運ばれます。

- `Size Channels`: 位置と同じ数だけ大きさのチャンネルがあれば(既定 `w h`)、箱として扱い、前の箱と重なっていれば同じものとみなします。無ければ点として扱います。
- `Active Channel`: この名前のチャンネルが入力にあれば、値が 0.5 以上のサンプルだけを対象にします(固定長で「空き」のある一覧向け)。無ければ全サンプルが対象です。

### 出力

サンプル数は `Max Items` です。空いている場所は全部 0 です。

| チャンネル | 内容 |
|---|---|
| `active` | 対象があれば 1 |
| `id` | 番号(1 から。消えた番号は Reset まで使い回さない) |
| `age` | 現れてからのフレーム数 |
| `lost` | 見失ってからのフレーム数(見えていれば 0) |
| 入力のチャンネル | その対象の値(位置と大きさは `Smooth` でなめらかにしたもの)。見失っている間は最後の値 |
| `vx` `vy` … | 位置の 1 フレームあたりの動き(`tx` → `vx`。`t` で始まらない名前は前に `v` を付ける) |

入力に `active` `id` `age` `lost` や速度と同じ名前のチャンネルがあるときは、この OP の値で置き換わります。

### 追跡の調整

- `Max Move`: 1 フレームでこれ以上動いたものは別の対象とみなします。単位は位置のチャンネルと同じです(0〜1 の座標なら 0.1 は画面の 1 割)。進んでいた向きを考えて、次にいるはずの位置からの距離で比べます。
- `Min Age`: このフレーム数だけ続けて見えた対象から出します。一瞬だけ出るノイズを消せます。
- `Hold`: 見失った対象を、このフレーム数だけその場に残します。
- `Smooth`: 位置と大きさをなめらかにします(0 でそのまま)。
- `Order`: `Keep Place` は消えるまで同じサンプルに居続けます(インスタンシング向き)。`Shown First` は今ある対象を古い順に前へ詰めます(一覧表示向き)。

### 注意

- 追跡は 1 フレームに 1 回進みます。同じフレームで同じ入力を 2 回 cook しても進みません。
- 入力のチャンネルの名前や数が変わると、追跡は最初からやり直します。
- 対応付けは「近い組から順に決める」方法です。対象が数百を超えると、組の数(対象数 × 場所数)に比例して重くなります。
