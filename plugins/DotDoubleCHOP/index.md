<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotDoubleCHOP/ -->

# DotProduct Double (DotDoubleCHOP)

## 概要

2 つの CHOP の行列積を、**倍精度で足し合わせて**計算します。[DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) と使い方は同じで、速さより精度を取る版です。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Dotdouble` |
| ラベル | DotProduct Double |
| 種類 | CHOP |
| 入力数 | 2 – 2 |
| バージョン | 0.1 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=DotDoubleCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 16x16x16 | CHOP 16ch x 16 + CHOP 16ch x 16 | 0.002 ms<br>60→60.0 fps | 0.010 ms<br>60→60.0 fps |
| 1x64x1 | CHOP 1ch x 64 + CHOP 64ch x 1 | 0.000 ms<br>60→60.0 fps | 0.001 ms<br>60→60.0 fps |
| 256x1024x256 | CHOP 256ch x 1024 + CHOP 1024ch x 256 | 0.888 ms<br>60→57.0 fps 🔻 | 6.93 ms<br>60→42.4 fps 🔻 |
| 256x1024x256 T0 | CHOP 1024ch x 256 + CHOP 1024ch x 256 | 0.912 ms<br>60→56.9 fps 🔻 | 6.28 ms<br>60→43.6 fps 🔻 |
| 256x1024x256 T0T1 | CHOP 1024ch x 256 + CHOP 256ch x 1024 | 3.82 ms<br>60→48.8 fps 🔻 | 6.92 ms<br>60→42.4 fps 🔻 |
| 256x1024x256 T1 | CHOP 256ch x 1024 + CHOP 256ch x 1024 | 1.23 ms<br>60→55.9 fps 🔻 | 1.83 ms<br>60→54.1 fps 🔻 |
| 64x256x64 | CHOP 64ch x 256 + CHOP 256ch x 64 | 0.074 ms<br>60→59.7 fps | 0.199 ms<br>60→59.3 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `DotDoubleCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### 2 つの CHOP の行列積(倍精度)

![2 つの CHOP の行列積(倍精度)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/DotDoubleCHOP-default.svg)

64x256(64 チャンネル × 256 サンプル)と 256x64 の積で、64x64 の結果になります。
入力 0 のサンプル数と入力 1 のチャンネル数をそろえてください。

ネットワーク: `in0` (noiseCHOP: `channelname=a[1-64]`, `startunit=samples`, `start=0`, `endunit=samples`, `end=255`) → `in1` (noiseCHOP: `channelname=b[1-256]`, `startunit=samples`, `start=0`, `endunit=samples`, `end=63`, `seed=2`) → `plugin` (CPlusPlus CHOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.088 ms** — 余裕の無い 60 fps のプロジェクトなら **59.7 fps**(-0.3)。

ファイル: `DotDoubleCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """2 つの CHOP の行列積(倍精度)

    64x256(64 チャンネル × 256 サンプル)と 256x64 の積で、64x64 の結果になります。
    入力 0 のサンプル数と入力 1 のチャンネル数をそろえてください。
    """

    def build(ex):
        a = ex.input("noiseCHOP", channelname="a[1-64]", startunit="samples", start=0, endunit="samples", end=255)
        b = ex.input("noiseCHOP", channelname="b[1-256]", startunit="samples", start=0, endunit="samples", end=63,
                     seed=2)
        ex.plugin(a, b)
    ```

#### 入力を転置して掛ける(倍精度)

![入力を転置して掛ける(倍精度)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/DotDoubleCHOP-transpose.svg)

Transpose0 で入力 0 を転置すると、同じ形(64 チャンネル × 64 サンプル)の CHOP 同士を A^T × B として掛けられます。

ネットワーク: `in0` (noiseCHOP: `channelname=a[1-64]`, `startunit=samples`, `start=0`, `endunit=samples`, `end=63`) → `in1` (noiseCHOP: `channelname=b[1-64]`, `startunit=samples`, `start=0`, `endunit=samples`, `end=63`, `seed=3`) → `plugin` (CPlusPlus CHOP: `Transpose0=True`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.085 ms** — 余裕の無い 60 fps のプロジェクトなら **59.7 fps**(-0.3)。

ファイル: `DotDoubleCHOPExample_transpose.toe`

??? note "手順(examples/transpose.py)"

    ```python
    """入力を転置して掛ける(倍精度)

    Transpose0 で入力 0 を転置すると、同じ形(64 チャンネル × 64 サンプル)の CHOP 同士を A^T × B として掛けられます。
    """

    def build(ex):
        a = ex.input("noiseCHOP", channelname="a[1-64]", startunit="samples", start=0, endunit="samples", end=63)
        b = ex.input("noiseCHOP", channelname="b[1-64]", startunit="samples", start=0, endunit="samples", end=63,
                     seed=3)
        ex.plugin(a, b, Transpose0=True)
    ```

**TouchDesigner テスト: 3 / 3 件合格**(test_matches_numpy, test_transpose0, test_empty_input_is_not_an_error)

### パラメータ: Setup

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Transpose0` | Transpose Input 1 | Toggle | Off |  |  |
| `Transpose1` | Transpose Input 2 | Toggle | Off |  |  |

## 使い方

CHOP を「チャンネル = 行、サンプル = 列」の行列とみなして、入力 1 × 入力 2 の行列積を出力します。
入力のそろえ方、Transpose Input 1 / 2、エラーになる条件は [DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) と同じです。

### DotCHOP との違い

| | DotCHOP | DotDoubleCHOP |
|---|---|---|
| 足し合わせ | 単精度(BLAS) | 倍精度(1 つずつ順に足す) |
| 速さ(256×1024×256、Mac) | 0.13 ms | 0.86 ms |
| 向いている用途 | ニューラルネットワークなど、速さが要る計算 | 打ち消し合う値の和など、下の桁まで要る計算 |

- 0.2.2 までの DotCHOP はこの計算でした。0.3.0 で DotCHOP が単精度になったので、以前とまったく同じ値が要るときはこちらを使います。
- 入力 1 を転置せず入力 2 だけを転置する組み合わせ(Transpose Input 2 のみオン)は、以前から単精度の SIMD で計算しています。

!!! warning "Time Slice はオフのまま使う"
    行列として扱うので、入力はサンプル数が決まった CHOP(Time Slice オフ)にします。
