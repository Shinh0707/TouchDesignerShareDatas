<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/BlackFrame/ -->

# BlackFrame

`Image/Effect` フォルダのパレットです。

## 説明

画像の縁を黒くぼかして落とす（額縁・周辺減光）。中央の四角（大きさ 1 − Borderwidth）だけを残し、その外側を Softness のぼかしで黒にする（Rectangle TOP を掛け合わせる）。アルファも一緒に落ちるので、縁は透明な黒になる（不透明な背景に重ねると黒い枠に見える）。

入力: in1 画像 TOP
出力: out1 同じ解像度の画像

パラメータ

- Borderwidth: 黒い縁の幅（画面に対する割合、既定 0.02）
- Softness: 縁のぼかし（0 でくっきり、既定 0.5）

## ダウンロード

[BlackFrame.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/BlackFrame.tox) [使用例 BlackFrameExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/BlackFrameExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Borderwidth` | BorderWidth | Parameter | Float | `0.02` | 0.0 … 1.0 |
| `Softness` | Softness | Parameter | Float | `0.5` | 0.0 … 1.0 |

## 使用例

### 縁を黒く落とす

![縁を黒く落とす](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-BlackFrame-example.png)

バナナの画像に、Borderwidth=0.15・Softness=0.6 の BlackFrame をかけ、黒い背景に重ねた例です。縁がやわらかく暗くなります(アルファも一緒に落ちるので、透明な部分のある画像は背景の上で見ます)。

ネットワーク: `in0` (moviefileinTOP) → `gray` (constantTOP: `colorr=0.55`, `colorg=0.6`, `colorb=0.7`, `alpha=1`, `resolutionw=1280`, `resolutionh=720`) → `photo` (overTOP) → `BlackFrame` (パレット: `Borderwidth=0.15`, `Softness=0.6`) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=1280`, `resolutionh=720`) → `on_black` (overTOP) → `out1`

[BlackFrameExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/BlackFrameExample.toe)

??? note "手順(Image/Effect/BlackFrame.example.py)"

    ```python
    """縁を黒く落とす

    バナナの画像に、Borderwidth=0.15・Softness=0.6 の BlackFrame をかけ、黒い背景に重ねた例です。縁がやわらかく暗くなります(アルファも一緒に落ちるので、透明な部分のある画像は背景の上で見ます)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        bg = ex.op("constantTOP", name="gray", colorr=0.55, colorg=0.6, colorb=0.7, alpha=1, resolutionw=1280,
                   resolutionh=720)
        on_black(ex, ex.palette(tox, ex.op("overTOP", name="photo", input=[img, bg]), Borderwidth=0.15, Softness=0.6))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

5 個のオペレータ。sha256: `61f1bbe4afd83ac8…`
