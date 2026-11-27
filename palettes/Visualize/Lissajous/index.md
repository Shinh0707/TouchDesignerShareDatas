<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/Lissajous/ -->

# Lissajous

`Visualize` フォルダのパレットです。

## 説明

2 つの値を x と y の周波数比にしたリサジュー図形を描く: x = cos(2π·a·t)、y = sin(2π·b·t)（t = 0〜1）。a は in1 の値、b は in2 の値（の 1 サンプル目。繋いでいなければ 1）。a:b が整数比なら閉じた図形になる（3:2 で 8 の字に似た形）。

入力

- in1: x の周波数（回数）の CHOP（1 チャンネル目の 1 サンプル目を使う）
- in2: y の周波数（回数）の CHOP

出力: out1 1280×720 の画像（黒の透明地に線）

パラメータ

- Samples: 線の点の数（多いほどなめらか）
- Thickness: 線の太さ
- Color: 線の色

## ダウンロード

[Lissajous.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/Lissajous.tox) [使用例 LissajousExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/LissajousExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Control / x の周波数（周期の数） |
| 入力 1 | CHOP | `in2` | Control / y の周波数（周期の数） |
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

## 使用例

### 3:2 のリサジュー図形

![3:2 のリサジュー図形](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Visualize-Lissajous-example.png)

x に 3、y に 2 の周波数を入れた例です。整数比なので閉じた図形になります。

ネットワーク: `in0` (constantCHOP: `name0=a`, `value0=3`) → `in1` (constantCHOP: `name0=b`, `value0=2`) → `Lissajous` (パレット: `Thickness=3`, `Color=[1, 0.8, 0.3, 1]`) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=1280`, `resolutionh=720`) → `on_black` (overTOP) → `out1`

[LissajousExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/LissajousExample.toe)

??? note "手順(Visualize/Lissajous.example.py)"

    ```python
    """3:2 のリサジュー図形

    x に 3、y に 2 の周波数を入れた例です。整数比なので閉じた図形になります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    def build(ex, tox):
        a = ex.input("constantCHOP", name0="a", value0=3)
        b = ex.input("constantCHOP", name0="b", value0=2)
        on_black(ex, ex.palette(tox, a, b, Thickness=3, Color=(1, 0.8, 0.3, 1)))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

16 個のオペレータ。sha256: `313cdaeb57ac5af5…`
