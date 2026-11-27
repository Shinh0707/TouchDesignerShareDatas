<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/MaskedAverage/ -->

# MaskedAverage

`Image/Math` フォルダのパレットです。

## 説明

マスク付きの平均: Σ(target × マスク) ÷ Σ(マスク)。Scope で、画像全体・行ごと・列ごとのどれで平均するかを選ぶ（N×N のペアの画像なら、列ごとで各点の仲間の平均になる）。ボイドの「近くの仲間の平均位置」などに使う。

入力

- target: 平均する値
- maskAlpha: 重み（アルファ）

出力: out1 平均（Scope で決まる大きさ）

パラメータ

- Scope: Whole Image（1 画素）/ Each Row（1×高さ）/ Each Column（幅×1、既定）

## ダウンロード

[MaskedAverage.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MaskedAverage.tox) [使用例 MaskedAverageExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MaskedAverageExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `target` | Data |
| 入力 1 | TOP | `maskAlpha` | Mask |
| 出力 0 | TOP | `out1` | Data |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Scope` | Scope | Parameter | Menu | `columns` | `image` / `rows` / `columns` |

## 使用例

### マスク付きの平均

![マスク付きの平均](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Math-MaskedAverage-example.svg)

左半分が赤 (1, 0, 0)、右半分が青 (0, 0, 1) の画像を、左の 1/4 だけアルファ 1 のマスクで平均した例です(Scope = Whole Image)。マスクの中は赤だけなので、平均は (1, 0, 0) になります。結果は 1 画素の画像なので、CHOP にして値を見せています。

ネットワーク: `half` (rampTOP: `type=horizontal`, `resolutionw=64`, `resolutionh=16`, `extendleft=hold`) → `in0` (nullTOP) → `quarter` (rampTOP: `type=horizontal`, `resolutionw=64`, `resolutionh=16`) → `in1` (nullTOP) → `MaskedAverage` (パレット: `Scope=image`) → `average` (toptoCHOP: `top=out1`) → `out1`

[MaskedAverageExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MaskedAverageExample.toe)

??? note "手順(Image/Math/MaskedAverage.example.py)"

    ```python
    """マスク付きの平均

    左半分が赤 (1, 0, 0)、右半分が青 (0, 0, 1) の画像を、左の 1/4 だけアルファ 1 のマスクで平均した例です(Scope = Whole Image)。マスクの中は赤だけなので、平均は (1, 0, 0) になります。結果は 1 画素の画像なので、CHOP にして値を見せています。
    """

    def build(ex, tox):
        ramp = ex.op("rampTOP", name="half", type="horizontal", resolutionw=64, resolutionh=16, extendleft="hold")
        keys = ramp.par.dat.eval()
        keys.clear()
        keys.appendRow(["pos", "r", "g", "b", "a"])
        keys.appendRow([0.0, 1, 0, 0, 1])
        keys.appendRow([0.5, 1, 0, 0, 1])
        keys.appendRow([0.5001, 0, 0, 1, 1])
        keys.appendRow([1.0, 0, 0, 1, 1])
        target = ex.input("nullTOP", input=ramp)
        mramp = ex.op("rampTOP", name="quarter", type="horizontal", resolutionw=64, resolutionh=16)
        mk = mramp.par.dat.eval()
        mk.clear()
        mk.appendRow(["pos", "r", "g", "b", "a"])
        mk.appendRow([0.0, 1, 1, 1, 1])
        mk.appendRow([0.25, 1, 1, 1, 1])
        mk.appendRow([0.2501, 0, 0, 0, 0])
        mk.appendRow([1.0, 0, 0, 0, 0])
        mask = ex.input("nullTOP", input=mramp)
        avg = ex.palette(tox, target, mask, Scope="image")
        ex.out(ex.op("toptoCHOP", name="average", top=avg.op("out1")))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

33 個のオペレータ。sha256: `b59d5b05155c3061…`
