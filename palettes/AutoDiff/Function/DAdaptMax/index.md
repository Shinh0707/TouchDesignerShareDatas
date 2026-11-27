<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DAdaptMax/ -->

# DAdaptMax

`AutoDiff/Function` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。アダプティブ max プーリング（PyTorch の AdaptiveMaxPool2d と同じく色ごと）: 画像を Outw × Outh のパッチに分け、色ごとにパッチの中の最大値を出す。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1 についての勾配 dL/dx を outD1 に出す（逆伝播）。

入力: in1 画像の CHOP（H·W チャンネル × 色数サンプル）
出力

- out1: Outw·Outh チャンネル × 色数サンプル（出力も画像の CHOP）
- outD1: dL/dx = 各色で最大の画素だけに dL/dy を流す

パラメータ

- D1: out1 についての勾配の CHOP（逆伝播を使わないなら空でよい）
- Win: 入力画像の幅
- Outw / Outh: 出力の大きさ

## ダウンロード

[DAdaptMax.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DAdaptMax.tox) [使用例 DAdaptMaxExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DAdaptMaxExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Any |
| 出力 1 | CHOP | `outD1` | Any / in1 についての勾配 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Win` | Win | Parameter | Int | `1` | 1.0 … 128.0 |
| `Outw` | Out | Parameter | WH | `1` | 1.0 … 128.0 |
| `Outh` | Out | Parameter | WH | `1` | 1.0 … 128.0 |
| `D1` | D1 | D | CHOP |  |  |

## 使用例

### 最大値プーリング

![最大値プーリング](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Function-DAdaptMax-example.png)

16 × 16 のバナナの画像の CHOP を、4 × 4 のパッチに分けて色ごとの最大値をとった例です(4 × 4 の画像になります)。図は ImCHOP2TOPRGB で画像に戻して拡大したものです。

ネットワーク: `banana` (moviefileinTOP) → `banana_16` (fitTOP: `outputresolution=custom`, `resolutionw=16`, `resolutionh=16`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `TOPRGB2ImCHOP` (パレット) → `DAdaptMax` (パレット: `Win=16`, `Outw=4`, `Outh=4`) → `ImCHOP2TOPRGB` (パレット: `Win=4`) → `enlarged` (fitTOP: `outputresolution=custom`, `resolutionw=256`, `resolutionh=256`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `out1`

[DAdaptMaxExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DAdaptMaxExample.toe)

??? note "手順(AutoDiff/Function/DAdaptMax.example.py)"

    ```python
    """最大値プーリング

    16 × 16 のバナナの画像の CHOP を、4 × 4 のパッチに分けて色ごとの最大値をとった例です(4 × 4 の画像になります)。図は ImCHOP2TOPRGB で画像に戻して拡大したものです。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import image_chop, show_image_chop  # noqa: E402

    def build(ex, tox):
        pooled = ex.palette(tox, image_chop(ex, 16), Win=16, Outw=4, Outh=4)
        show_image_chop(ex, pooled, 4)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Col2im` | [Col2Im (Col2ImCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) |
| `CHOP:Im2col` | [Im2Col (Im2ColCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) |

43 個のオペレータ。sha256: `272e78b671ed81a6…`
