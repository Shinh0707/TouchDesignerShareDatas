<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/SoftFade/ -->

# SoftFade

`Image/Effect` フォルダのパレットです。

## 説明

残像のエフェクト。画面の変化したところだけ（重ねた結果との差が大きい所）を、残像のようにやわらかく重ねていく。Freeze で今の状態を止める。

入力: in1 画像 TOP
出力: out1 同じ解像度の画像

パラメータ

- Freeze: オンの間、マスクを止める

## ダウンロード

[SoftFade.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/SoftFade.tox) [使用例 SoftFadeExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/SoftFadeExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Freeze` | Freeze | Custom | Toggle | `False` |  |

## 使用例

### 動いたところだけ残像にする

![動いたところだけ残像にする](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-SoftFade-example.png)

流れるノイズの画像に SoftFade をかけた例です。変化した部分だけがやわらかく重なっていきます。

ネットワーク: `in0` (noiseTOP: `resolutionw=720`, `resolutionh=360`, `period=0.4`, `mono=False`, `tx={'expr': 'absTime.seconds * 0.3'}`) → `SoftFade` (パレット) → `out1`

[SoftFadeExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/SoftFadeExample.toe)

??? note "手順(Image/Effect/SoftFade.example.py)"

    ```python
    """動いたところだけ残像にする

    流れるノイズの画像に SoftFade をかけた例です。変化した部分だけがやわらかく重なっていきます。
    """

    FRAMES = 120

    def build(ex, tox):
        noise = ex.input("noiseTOP", resolutionw=720, resolutionh=360, period=0.4, mono=False,
                         tx={"expr": "absTime.seconds * 0.3"})
        ex.palette(tox, noise)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

15 個のオペレータ。sha256: `83c5cf8994e9e8e0…`
