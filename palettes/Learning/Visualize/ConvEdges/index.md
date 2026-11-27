<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/ConvEdges/ -->

# ConvEdges

`Learning/Visualize` フォルダのパレットです。

## 説明

畳み込み層（NNConv2d、パディングなし）のつながりを、3 次元の線の POP にする。出力の各画素・各チャンネルから、カーネルが見ている入力のパッチ（K × K × Cin）の各点へ線を 1 本ずつ引く（線の数 = 出力の画素数 × Cout × Cin × K²）。重みは位置で共有されるので、同じカーネルの重みが全部の位置で使われる。ConvVolume と同じ並べ方。

- 色 = 重みの符号（赤 = 正、青 = 負）、太さ・不透明度 = |w|（Autonorm オンなら今の |w| の最大で割る）
- 光らせ方（Glow）: in2 に入力の層の特徴マップ（ConvVolume の in1 と同じもの）をつなぐと、太さ・不透明度にその線の出ている入力の点の今の値（0〜1 にそろえたもの）も掛ける = いまその線を流れている信号の大きさ |w|·|a|。色は重みの符号のまま
- パッチの中の並び（im2col）は「色ごとにまとまった並び」: f = 入力チャンネル × K² + ky × K + kx、入力の画素 = (oy·S + ky) × Win + (ox·S + kx)
- 線ごとの重みと入力の値は Lookup CHOP で毎フレーム引く（ネイティブ）。線の位置と引く番号はパラメータが変わったときだけ計算する（c1 の 1 万本で一度 0.3 秒ほど）

入力

- in1: 重み W（Cin·K² チャンネル × Cout サンプル。NNConv2d の中の NNLinear の outvis1）
- in2: 入力の層の特徴マップ（任意。画素 Win² チャンネル × Cin サンプル）

出力: out1 POP（線）

パラメータ

- Cin / Win: 入力のチャンネル数と幅
- Cout: 出力のチャンネル数
- K / S: カーネルの大きさとストライド（出力の幅 = (Win − K) // S + 1）
- Xfrom / Yfrom / Hfrom / Dcin: 入力の層の置き方（ConvVolume の X / Y / H / Dc と同じにする）
- Xto / Yto / Hto / Dcout: 出力の層の置き方
- Linewidth / Alpha / Autonorm / Wscale: 線の太さ・不透明度・重みの正規化
- Glow / Actmode: 入力の値に合わせて光らせる度合いと、値を 0〜1 にする方法

## ダウンロード

[ConvEdges.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/ConvEdges.tox) [使用例 ConvEdgesExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/ConvEdgesExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Matrix / 畳み込みの重み（パッチの要素 × 出力チャンネル） |
| 入力 1 | CHOP | `in2` | Matrix / 入力の層の特徴マップ（任意） |
| 出力 0 | POP | `out1` | Geometry |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Xfrom` | Xfrom | Edges | Float | `-1` | -10.0 … 10.0 |
| `Xto` | Xto | Edges | Float | `1` | -10.0 … 10.0 |
| `Yfrom` | Yfrom | Edges | Float | `0` | -10.0 … 10.0 |
| `Yto` | Yto | Edges | Float | `0` | -10.0 … 10.0 |
| `Hfrom` | Hfrom | Edges | Float | `1` | 0.0 … 10.0 |
| `Hto` | Hto | Edges | Float | `1` | 0.0 … 10.0 |
| `Linewidth` | Linewidth | Edges | Float | `3` | 0.0 … 50.0 |
| `Alpha` | Alpha | Edges | Float | `1` | 0.0 … 1.0 |
| `Autonorm` | Autonorm | Edges | Toggle | `True` |  |
| `Wscale` | Wscale | Edges | Float | `1` | 0.0001 … 100.0 |
| `Cin` | Cin | Edges | Int | `3` | 1.0 … 1.0 |
| `Win` | Win | Edges | Int | `16` | 1.0 … 1.0 |
| `Cout` | Cout | Edges | Int | `8` | 1.0 … 1.0 |
| `K` | K | Edges | Int | `3` | 1.0 … 1.0 |
| `S` | S | Edges | Int | `2` | 1.0 … 1.0 |
| `Dcin` | Dcin | Edges | Float | `0.15` | 0.0 … 1.0 |
| `Dcout` | Dcout | Edges | Float | `0.15` | 0.0 … 1.0 |
| `Glow` | Glow | Edges | Float | `1` | 0.0 … 1.0 |
| `Actmode` | Activation Mode | Edges | Menu | `abs` | `abs` / `minmax` / `unit` |

## 使用例

### 畳み込みのつながり

![畳み込みのつながり](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Visualize-ConvEdges-example.png)

8 × 8 の 3 チャンネルの入力を、3 × 3 のカーネル・ストライド 2 で 8 チャンネル(3 × 3 画素)にする畳み込みの、乱数の重み(27 チャンネル × 8 サンプル)を線にした例です。出力の各画素・各チャンネルから、カーネルが見ている入力のパッチの各点へ線が 1 本ずつ出ます(3·3·8·27 = 1944 本)。入力の層(ConvVolume)と重ねています。Glow = 0 にして、入力の明るさを掛けずに重みだけで描いています(バナナの背景は黒いので、Glow = 1 では明るい画素から出る線だけが見えます)。

ネットワーク: `in0` (patternCHOP: `channelname=w[0-26]`, `wavetype=random`, `length=8`, `amp=2`, `offset=-1`, `seed=3`) → `banana` (moviefileinTOP) → `banana_8` (fitTOP: `outputresolution=custom`, `resolutionw=8`, `resolutionh=8`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `TOPRGB2ImCHOP` (パレット) → `fx` (パレット: `Cin=3`, `Win=8`, `Cout=8`, `K=3`, `S=2`, `Alpha=0.3`, `Glow=0`) → `fx1` (パレット: `C=3`, `W=8`, `Mode=unit`, `X=-1.5`, `H=1.2`, `Dc=0.2`) → `geo` (geometryCOMP) → `lines` (lineMAT: `drawpoints=True`, `pointsizemultiplier=100`) → `cam` (cameraCOMP: `tz=5`) → `render` (renderTOP: `camera=cam`, `geometry=geo`, `resolutionw=720`, `resolutionh=720`, `bgcolora=1`) → `out1`

[ConvEdgesExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/ConvEdgesExample.toe)

??? note "手順(Learning/Visualize/ConvEdges.example.py)"

    ```python
    """畳み込みのつながり

    8 × 8 の 3 チャンネルの入力を、3 × 3 のカーネル・ストライド 2 で 8 チャンネル(3 × 3 画素)にする畳み込みの、乱数の重み(27 チャンネル × 8 サンプル)を線にした例です。出力の各画素・各チャンネルから、カーネルが見ている入力のパッチの各点へ線が 1 本ずつ出ます(3·3·8·27 = 1944 本)。入力の層(ConvVolume)と重ねています。Glow = 0 にして、入力の明るさを掛けずに重みだけで描いています(バナナの背景は黒いので、Glow = 1 では明るい画素から出る線だけが見えます)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES, image_chop, render_lines  # noqa: E402

    def build(ex, tox):
        w = ex.input("patternCHOP", channelname="w[0-26]", wavetype="random", length=8, amp=2, offset=-1, seed=3)
        img = image_chop(ex, 8)
        e = ex.palette(tox, w, img, Cin=3, Win=8, Cout=8, K=3, S=2, Alpha=0.3, Glow=0)
        vol = ex.palette(PALETTES + "/Learning/Visualize/ConvVolume.tox", img, C=3, W=8, Mode="unit", X=-1.5, H=1.2,
                         Dc=0.2)
        render_lines(ex, [e, vol], tz=5)
        ex.root.op("geo").par.ry = -40
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

45 個のオペレータ。sha256: `8523e8d5c2c0f7b6…`
