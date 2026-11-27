<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/NormalizeRGB/ -->

# NormalizeRGB

`Image/Math` フォルダのパレットです。

## 説明

各画素の RGB ベクトルを長さ 1 にする（長さは 0.0001 で下限を付けて割るので、0 ベクトルでも発散しない）。長さも別の出力で出す。

入力: in1 TOP（RGB = ベクトル）
出力

- normalized: 長さ 1 にした RGB（アルファには 1/長さ が入る）
- magnitude: 長さ（32 bit float の 1 チャンネル）

## ダウンロード

[NormalizeRGB.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/NormalizeRGB.tox) [使用例 NormalizeRGBExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/NormalizeRGBExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Data |
| 出力 0 | TOP | `normalized` | Data / 長さ 1 の RGB |
| 出力 1 | TOP | `magnitude` | Data / 長さ |

## 使用例

### RGB を長さ 1 に

![RGB を長さ 1 に](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Math-NormalizeRGB-example.png)

色のノイズの各画素の RGB を、向きを保ったまま長さ 1 にした例です(normalized の出力)。暗い画素も明るい画素も同じ明るさの色になります。

ネットワーク: `in0` (noiseTOP: `resolutionw=256`, `resolutionh=144`, `mono=False`) → `NormalizeRGB` (パレット) → `normalized` (selectTOP: `top=normalized`) → `out1`

[NormalizeRGBExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/NormalizeRGBExample.toe)

??? note "手順(Image/Math/NormalizeRGB.example.py)"

    ```python
    """RGB を長さ 1 に

    色のノイズの各画素の RGB を、向きを保ったまま長さ 1 にした例です(normalized の出力)。暗い画素も明るい画素も同じ明るさの色になります。
    """

    def build(ex, tox):
        a = ex.input("noiseTOP", resolutionw=256, resolutionh=144, mono=False)
        n = ex.palette(tox, a)
        ex.out(ex.op("selectTOP", name="normalized", top=n.op("normalized")))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

13 個のオペレータ。sha256: `2f17f378c17aeee8…`
