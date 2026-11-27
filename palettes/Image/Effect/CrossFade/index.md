<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CrossFade/ -->

# CrossFade

`Image/Effect` フォルダのパレットです。

## 説明

映像の残像・なめらかさ（時間方向のクロスフェード）。前のフレームの結果と今の入力を Crsr の割合で混ぜ続ける（フィードバック）。Crsr が大きいほど動きが遅く尾を引き、1 以上で止まる。前後で明るさも変えられる。

入力: in1 画像 TOP
出力: out1 同じ解像度の画像

パラメータ

- Preb: クロスフェード前の明るさ（0 以下で真っ黒、1 で元のまま、1 より上で白飛び）
- Crsr: クロスフェード率（0 以下で入力そのまま、0〜1 で大きいほど遅く、1 以上で静止。既定 0.5）
- Postb: クロスフェード後の明るさ（Preb と同じ）

## ダウンロード

[CrossFade.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CrossFade.tox) [使用例 CrossFadeExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CrossFadeExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Preb` | Pre Show | Parameter | Float | `1` | 0.0 … 1.0 |
| `Crsr` | Crossfade Rate | Parameter | Float | `1` | 0.0 … 1.0 |
| `Postb` | Post Show | Parameter | Float | `1` | 0.0 … 1.0 |

## 使用例

### 動く円の残像

![動く円の残像](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-CrossFade-example.png)

左右に動く白い円に、Crsr=0.9 の CrossFade をかけた例です。前のフレームの結果を 9 割残すので、尾を引いて見えます。

ネットワーク: `in0` (circleTOP: `radiusx=0.08`, `radiusy=0.08`, `resolutionw=720`, `resolutionh=360`, `bgalpha=1`, `centerx={'expr': 'math.sin(absTime.seconds * 3) * 0.35'}`, `centery={'expr': 'math.sin(absTime.seconds * 5) * 0.25'}`) → `CrossFade` (パレット: `Crsr=0.9`) → `out1`

[CrossFadeExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CrossFadeExample.toe)

??? note "手順(Image/Effect/CrossFade.example.py)"

    ```python
    """動く円の残像

    左右に動く白い円に、Crsr=0.9 の CrossFade をかけた例です。前のフレームの結果を 9 割残すので、尾を引いて見えます。
    """

    FRAMES = 120

    def build(ex, tox):
        dot = ex.input("circleTOP", radiusx=0.08, radiusy=0.08, resolutionw=720, resolutionh=360, bgalpha=1,
                       centerx={"expr": "math.sin(absTime.seconds * 3) * 0.35"},
                       centery={"expr": "math.sin(absTime.seconds * 5) * 0.25"})
        ex.palette(tox, dot, Crsr=0.9)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

9 個のオペレータ。sha256: `5c9f49ea82f972d5…`
