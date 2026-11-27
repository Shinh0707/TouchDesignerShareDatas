<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/ImagePopup/ -->

# ImagePopup

`Image/Effect` フォルダのパレットです。

## 説明

画像を何枚も、ランダムな位置にポップアップさせる。in2 の y0 チャンネルの各サンプルが画像 1 枚にあたり、その値が画像の大きさになる（0 で見えない）。値が 0.5 を下から越えるたびに、その画像を新しいランダムな位置（x, y とも −2〜2）へ移す。ビートやオンセットの値を入れると、音に合わせて画像が飛び出す。

入力

- in1: 貼る画像 TOP
- in2: CHOP（y0 チャンネル、サンプル数 = 画像の枚数、値 0〜1）

出力: out1 画像 TOP（1280×720、背景は透明）

パラメータ

- Fov: カメラの視野角
- Seedx / Seedy: 位置の乱数の種（既定は時間で変わる式）

## ダウンロード

[ImagePopup.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ImagePopup.tox) [使用例 ImagePopupExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ImagePopupExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 入力 1 | CHOP | `in2` | Any / y0 チャンネル、サンプル = 画像 1 枚 |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Fov` | FOV Angle | Parameter | Float | `45` | 0.0 … 100.0 |
| `Seedx` | SeedX | Parameter | Float | `1` | 0.0 … 10.0 |
| `Seedy` | Seed Y | Parameter | Float | `1` | 0.0 … 10.0 |

## 使用例

### 画像のポップアップ

![画像のポップアップ](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-ImagePopup-example.png)

バナナの画像 8 枚(in2 の y0 = 8 サンプル)を、0〜1 で上下する大きさで、ランダムな位置にポップアップさせた例です。大きさが 0.5 を越えるたびに、その画像は新しい位置へ飛びます。

ネットワーク: `in0` (moviefileinTOP) → `phase` (patternCHOP: `channelname=y0`, `wavetype=rampsamples`, `length=8`) → `in1` (expressionCHOP: `expr0expr={'expr': '0.5 + 0.5 * math.sin(absTime.seconds * 3 + me.inputVal * 0.8)'}`) → `ImagePopup` (パレット) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=1280`, `resolutionh=720`) → `on_black` (overTOP) → `out1`

[ImagePopupExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ImagePopupExample.toe)

??? note "手順(Image/Effect/ImagePopup.example.py)"

    ```python
    """画像のポップアップ

    バナナの画像 8 枚(in2 の y0 = 8 サンプル)を、0〜1 で上下する大きさで、ランダムな位置にポップアップさせた例です。大きさが 0.5 を越えるたびに、その画像は新しい位置へ飛びます。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    FRAMES = 60

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        base = ex.op("patternCHOP", name="phase", channelname="y0", wavetype="rampsamples", length=8)
        size = ex.input("expressionCHOP", input=base,
                        expr0expr={"expr": "0.5 + 0.5 * math.sin(absTime.seconds * 3 + me.inputVal * 0.8)"})
        on_black(ex, ex.palette(tox, img, size))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

43 個のオペレータ。sha256: `924575eaa43ee615…`
