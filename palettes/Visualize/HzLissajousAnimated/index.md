<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/HzLissajousAnimated/ -->

# HzLissajousAnimated

`Visualize` フォルダのパレットです。

## 説明

Lissajous の、位相が時間で回る版。x と y の位相を、それぞれの周波数（in1, in2 の値）の速さで進めるので、図形が回転・変形して動き続ける。

入力 / 出力 / パラメータ: Lissajous と同じ。追加で

- Reset: オンの間、位相を 0 に戻す

## ダウンロード

[HzLissajousAnimated.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/HzLissajousAnimated.tox) [使用例 HzLissajousAnimatedExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/HzLissajousAnimatedExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Control / x の周波数 |
| 入力 1 | CHOP | `in2` | Control / y の周波数 |
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
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### 回り続けるリサジュー図形

![回り続けるリサジュー図形](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Visualize-HzLissajousAnimated-example.png)

x に 3、y に 2 の周波数を入れた例です。位相がそれぞれの速さで進むので、図形が回転・変形し続けます(画像は 60 フレーム後)。

ネットワーク: `in0` (constantCHOP: `name0=a`, `value0=3`) → `in1` (constantCHOP: `name0=b`, `value0=2`) → `HzLissajousAnimated` (パレット: `Thickness=3`, `Color=[1, 0.5, 0.8, 1]`) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=1280`, `resolutionh=720`) → `on_black` (overTOP) → `out1`

[HzLissajousAnimatedExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/HzLissajousAnimatedExample.toe)

??? note "手順(Visualize/HzLissajousAnimated.example.py)"

    ```python
    """回り続けるリサジュー図形

    x に 3、y に 2 の周波数を入れた例です。位相がそれぞれの速さで進むので、図形が回転・変形し続けます(画像は 60 フレーム後)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    FRAMES = 60

    def build(ex, tox):
        a = ex.input("constantCHOP", name0="a", value0=3)
        b = ex.input("constantCHOP", name0="b", value0=2)
        on_black(ex, ex.palette(tox, a, b, Thickness=3, Color=(1, 0.5, 0.8, 1)))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

18 個のオペレータ。sha256: `7c5c34c98ce5e402…`
