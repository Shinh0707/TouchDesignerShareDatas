<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Matrix/SpectralRadius/ -->

# SpectralRadius

`Math/Matrix` フォルダのパレットです。

## 説明

行列 W のスペクトル半径（いちばん大きい固有値の絶対値）を求める（numpy で正確に計算。W が変わったときだけ計算し直す）。リザバー計算などで、重み行列の大きさをそろえるのに使う。正方でない行列には、最大特異値を返して警告を出す。

入力: in1 行列の CHOP（チャンネル = 行）
出力: out1 1 サンプル: スペクトル半径

パラメータ

- Reset: 互換のために残しているパラメータ（W が変われば自動で計算し直す）

## ダウンロード

[SpectralRadius.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/SpectralRadius.tox) [使用例 SpectralRadiusExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/SpectralRadiusExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `inW` |  |
| 出力 0 | CHOP | `out1` | Feature |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### スペクトル半径

![スペクトル半径](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Math-Matrix-SpectralRadius-example.svg)

2 × 2 の行列 [[2, 1], [1, 2]](固有値 3 と 1)のスペクトル半径を求めた例です。3 になります。

ネットワーク: `zeros` (patternCHOP: `channelname=r0 r1`, `wavetype=const`, `length=2`, `amp=0`) → `in0` (expressionCHOP: `expr0expr={'expr': '2 if me.chanIndex == me.sampleIndex else 1'}`) → `SpectralRadius` (パレット) → `out1`

[SpectralRadiusExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/SpectralRadiusExample.toe)

??? note "手順(Math/Matrix/SpectralRadius.example.py)"

    ```python
    """スペクトル半径

    2 × 2 の行列 [[2, 1], [1, 2]](固有値 3 と 1)のスペクトル半径を求めた例です。3 になります。
    """

    def build(ex, tox):
        base = ex.op("patternCHOP", name="zeros", channelname="r0 r1", wavetype="const", length=2, amp=0)
        w = ex.input("expressionCHOP", input=base, expr0expr={"expr": "2 if me.chanIndex == me.sampleIndex else 1"})
        ex.palette(tox, w)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

7 個のオペレータ。sha256: `3793b8951088a0d2…`
