<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/ -->

# DotProduct (DotCHOP)

## 概要

2 つの CHOP の行列積を計算します。単精度の BLAS(Mac は Accelerate)を使うので、ニューラルネットワークのような大きな積でも速く計算できます。
倍精度で足し合わせる版が要るときは [DotDoubleCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotDoubleCHOP/) を使います。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Dot` |
| ラベル | DotProduct |
| 種類 | CHOP |
| 入力数 | 2 – 2 |
| バージョン | 0.1 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=DotCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 16x16x16 | CHOP 16ch x 16 + CHOP 16ch x 16 | 0.001 ms<br>60→60.0 fps | 0.007 ms<br>60→60.0 fps |
| 1x64x1 | CHOP 1ch x 64 + CHOP 64ch x 1 | 0.000 ms<br>60→60.0 fps | 0.001 ms<br>60→60.0 fps |
| 256x1024x256 | CHOP 256ch x 1024 + CHOP 1024ch x 256 | 0.137 ms<br>60→59.5 fps | 2.68 ms<br>60→51.7 fps 🔻 |
| 256x1024x256 T0 | CHOP 1024ch x 256 + CHOP 1024ch x 256 | 0.119 ms<br>60→59.6 fps | 3.73 ms<br>60→49.0 fps 🔻 |
| 256x1024x256 T0T1 | CHOP 1024ch x 256 + CHOP 256ch x 1024 | 0.130 ms<br>60→59.5 fps | 2.53 ms<br>60→52.1 fps 🔻 |
| 256x1024x256 T1 | CHOP 256ch x 1024 + CHOP 256ch x 1024 | 0.147 ms<br>60→59.5 fps | 1.20 ms<br>60→56.0 fps 🔻 |
| 64x256x64 | CHOP 64ch x 256 + CHOP 256ch x 64 | 0.008 ms<br>60→60.0 fps | 0.566 ms<br>60→58.0 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `DotCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### 2 つの CHOP の行列積

![2 つの CHOP の行列積](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/DotCHOP-default.svg)

64x256(64 チャンネル × 256 サンプル)と 256x64 の積で、64x64 の結果になります。
入力 0 のサンプル数と入力 1 のチャンネル数をそろえてください。

ネットワーク: `in0` (noiseCHOP: `channelname=a[1-64]`, `startunit=samples`, `start=0`, `endunit=samples`, `end=255`) → `in1` (noiseCHOP: `channelname=b[1-256]`, `startunit=samples`, `start=0`, `endunit=samples`, `end=63`, `seed=2`) → `plugin` (CPlusPlus CHOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.036 ms** — 余裕の無い 60 fps のプロジェクトなら **59.9 fps**(-0.1)。

ファイル: `DotCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """2 つの CHOP の行列積

    64x256(64 チャンネル × 256 サンプル)と 256x64 の積で、64x64 の結果になります。
    入力 0 のサンプル数と入力 1 のチャンネル数をそろえてください。
    """

    def build(ex):
        a = ex.input("noiseCHOP", channelname="a[1-64]", startunit="samples", start=0, endunit="samples", end=255)
        b = ex.input("noiseCHOP", channelname="b[1-256]", startunit="samples", start=0, endunit="samples", end=63,
                     seed=2)
        ex.plugin(a, b)
    ```

#### 入力を転置して掛ける

![入力を転置して掛ける](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/DotCHOP-transpose.svg)

Transpose0 で入力 0 を転置すると、同じ形(64 チャンネル × 64 サンプル)の CHOP 同士を A^T × B として掛けられます。

ネットワーク: `in0` (noiseCHOP: `channelname=a[1-64]`, `startunit=samples`, `start=0`, `endunit=samples`, `end=63`) → `in1` (noiseCHOP: `channelname=b[1-64]`, `startunit=samples`, `start=0`, `endunit=samples`, `end=63`, `seed=3`) → `plugin` (CPlusPlus CHOP: `Transpose0=True`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.030 ms** — 余裕の無い 60 fps のプロジェクトなら **59.9 fps**(-0.1)。

ファイル: `DotCHOPExample_transpose.toe`

??? note "手順(examples/transpose.py)"

    ```python
    """入力を転置して掛ける

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

- 入力 1 の**サンプル数**と、入力 2 の**チャンネル数**をそろえます。合わないときはエラーになり、両方の大きさが表示されます。
- 出力は「入力 1 のチャンネル数 × 入力 2 のサンプル数」です。
- **Transpose Input 1 / 2**: 掛ける前にその入力を転置します。同じ形の CHOP 同士を `Aᵀ × B` で掛けたいときや、
  1 チャンネル × N サンプルのベクトル同士の内積(片方を転置)に使います。
- チャンネルが無い入力をつなぐと、エラーではなく空の出力になります。

### 精度と速さ

- 計算は単精度(32 ビット)です。Mac では Accelerate の BLAS、Windows では自前のループで計算します。
- 0.2.2 までは倍精度で足し合わせていました。0.3.0 から単精度になり、結果の下の桁(相対で 1e-6 前後)が変わります。
  以前と同じ値が要るときは [DotDoubleCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotDoubleCHOP/) を使います。

!!! warning "Time Slice はオフのまま使う"
    行列として扱うので、入力はサンプル数が決まった CHOP(Time Slice オフ)にします。
    音声のような Time Slice の入力は、Trail CHOP などで長さを固定してからつなぎます。
