<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/ChannelLissajous/ -->

# ChannelLissajous

`Visualize` フォルダのパレットです。

## 説明

CHOP の 1 番目のチャンネルを x、2 番目を y にして点を線で結んだ図（XY スコープ）を描く。タイムスライスを Samples 個に間引いてから描く。オーディオのステレオ信号なら、L を横・R を縦にしたリサジュー図形になる。

入力: in1 CHOP（1 番目 = x、2 番目 = y。−Range〜Range が画面の短い辺に収まる）
出力: out1 Resolution の画像（黒の透明地に線）

パラメータ

- Samples: 描く点の数（タイムスライスをこの数に間引く）
- Thickness: 線の太さ
- Color: 線の色（RGBA）
- Range: 画面に収める値の範囲（−Range〜Range、既定 1 = オーディオの ±1）
- Resolution: 出力の解像度（既定 1280×720）

## ダウンロード

[ChannelLissajous.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/ChannelLissajous.tox) [使用例 ChannelLissajousExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/ChannelLissajousExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any / 1 番目 = x、2 番目 = y（−Range〜Range が画面内） |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Samples` | Samples | Parameter | Int | `1000` | 1.0 … 3000.0 |
| `Thickness` | Thickness | Parameter | Float | `1` | 0.0 … 10.0 |
| `Colorr` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Colorg` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Colorb` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Colora` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Range` | Range | Parameter | Float | `1` | 0.0 … 4.0 |
| `Resolutionw` | Resolution | Parameter | WH | `0` | 0.0 … 1.0 |
| `Resolutionh` | Resolution | Parameter | WH | `0` | 0.0 … 1.0 |

## 使用例

### 2 つの波の XY スコープ

![2 つの波の XY スコープ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Visualize-ChannelLissajous-example.png)

3 周期と 4 周期の正弦波をそれぞれ x, y にした例です。オーディオのステレオ信号をつなぐと、左右の関係が図形で見えます。

ネットワーク: `x` (patternCHOP: `channelname=x`, `wavetype=sin`, `length=2000`, `numcycles=3`, `amp=0.9`) → `y` (patternCHOP: `channelname=y`, `wavetype=sin`, `length=2000`, `numcycles=4`, `amp=0.9`) → `in0` (mergeCHOP) → `ChannelLissajous` (パレット: `Samples=2000`, `Thickness=3`, `Color=[0.4, 0.9, 1, 1]`) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=1280`, `resolutionh=720`) → `on_black` (overTOP) → `out1`

[ChannelLissajousExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/ChannelLissajousExample.toe)

??? note "手順(Visualize/ChannelLissajous.example.py)"

    ```python
    """2 つの波の XY スコープ

    3 周期と 4 周期の正弦波をそれぞれ x, y にした例です。オーディオのステレオ信号をつなぐと、左右の関係が図形で見えます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    def build(ex, tox):
        x = ex.op("patternCHOP", name="x", channelname="x", wavetype="sin", length=2000, numcycles=3, amp=0.9)
        y = ex.op("patternCHOP", name="y", channelname="y", wavetype="sin", length=2000, numcycles=4, amp=0.9)
        xy = ex.input("mergeCHOP", input=[x, y])
        on_black(ex, ex.palette(tox, xy, Samples=2000, Thickness=3, Color=(0.4, 0.9, 1, 1)))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

13 個のオペレータ。sha256: `b5672d0cac3c7738…`
