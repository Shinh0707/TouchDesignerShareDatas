<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Image/ImCHOP2TOPRGB/ -->

# ImCHOP2TOPRGB

`AutoDiff/Image` フォルダのパレットです。

## 説明

画像の CHOP（H·W チャンネル × 3 サンプル）を、幅 Win の画像 TOP に戻す（TOPRGB2ImCHOP の逆）。

入力: in1 画像の CHOP
出力: out1 画像 TOP（Win × H、32 bit float）

パラメータ

- Win: 画像の幅

## ダウンロード

[ImCHOP2TOPRGB.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/ImCHOP2TOPRGB.tox) [使用例 ImCHOP2TOPRGBExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/ImCHOP2TOPRGBExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Matrix |
| 出力 0 | TOP | `out1` | Data |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Win` | Win | Parameter | Int | `1` | 1.0 … 12.0 |

## 使用例

### 画素 × 色の CHOP を画像に戻す

![画素 × 色の CHOP を画像に戻す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Image-ImCHOP2TOPRGB-example.png)

TOPRGB2ImCHOP で作った 16 × 16 のバナナの画像の CHOP(256 チャンネル × 3 サンプル)を、Win=16 で画像に戻して拡大した例です。

ネットワーク: `banana` (moviefileinTOP) → `banana_16` (fitTOP: `outputresolution=custom`, `resolutionw=16`, `resolutionh=16`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `TOPRGB2ImCHOP` (パレット) → `ImCHOP2TOPRGB` (パレット: `Win=16`) → `enlarged` (fitTOP: `outputresolution=custom`, `resolutionw=256`, `resolutionh=256`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `out1`

[ImCHOP2TOPRGBExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/ImCHOP2TOPRGBExample.toe)

??? note "手順(AutoDiff/Image/ImCHOP2TOPRGB.example.py)"

    ```python
    """画素 × 色の CHOP を画像に戻す

    TOPRGB2ImCHOP で作った 16 × 16 のバナナの画像の CHOP(256 チャンネル × 3 サンプル)を、Win=16 で画像に戻して拡大した例です。
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

7 個のオペレータ。sha256: `f46e432081f3eb12…`
