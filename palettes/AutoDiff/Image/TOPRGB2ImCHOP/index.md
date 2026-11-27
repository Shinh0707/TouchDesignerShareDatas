<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Image/TOPRGB2ImCHOP/ -->

# TOPRGB2ImCHOP

`AutoDiff/Image` フォルダのパレットです。

## 説明

画像 TOP を、AutoDiff で使う画像の CHOP（画素 × 色の行列）にする。H·W チャンネル（画素、左下から行ごと）× 3 サンプル（R, G, B）。

入力: in1 画像 TOP
出力: out1 H·W チャンネル × 3 サンプル

## ダウンロード

[TOPRGB2ImCHOP.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/TOPRGB2ImCHOP.tox) [使用例 TOPRGB2ImCHOPExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/TOPRGB2ImCHOPExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | CHOP | `out1` | Matrix / 画素 × RGB |

## 使用例

### 画像を画素 × 色の CHOP にする

![画像を画素 × 色の CHOP にする](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Image-TOPRGB2ImCHOP-example.png)

バナナの画像を 16 × 16 に縮めて、256 チャンネル(画素) × 3 サンプル(R, G, B)の CHOP にした例です。図は、それを ImCHOP2TOPRGB で画像に戻して拡大したものです(行き来しても同じ画像になります)。

ネットワーク: `banana` (moviefileinTOP) → `banana_16` (fitTOP: `outputresolution=custom`, `resolutionw=16`, `resolutionh=16`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `TOPRGB2ImCHOP` (パレット) → `ImCHOP2TOPRGB` (パレット: `Win=16`) → `enlarged` (fitTOP: `outputresolution=custom`, `resolutionw=256`, `resolutionh=256`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `out1`

[TOPRGB2ImCHOPExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/TOPRGB2ImCHOPExample.toe)

??? note "手順(AutoDiff/Image/TOPRGB2ImCHOP.example.py)"

    ```python
    """画像を画素 × 色の CHOP にする

    バナナの画像を 16 × 16 に縮めて、256 チャンネル(画素) × 3 サンプル(R, G, B)の CHOP にした例です。図は、それを ImCHOP2TOPRGB で画像に戻して拡大したものです(行き来しても同じ画像になります)。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import image_chop, show_image_chop  # noqa: E402

    def build(ex, tox):
        show_image_chop(ex, image_chop(ex, 16), 16)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

7 個のオペレータ。sha256: `ad65152f84f8a7bf…`
