<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNAdaptConv2d/ -->

# NNAdaptConv2d

`AutoDiff/NN` フォルダのパレットです。

## 説明

出力の大きさ（Outw × Outh）を決めて畳み込む層。入力の大きさからカーネルとストライドを自動で決め（DAdaptIm2Col）、NNLinear で Outchan チャンネルにする。どんな大きさの画像でも決まった大きさの特徴にできる（ネットの最後の層向け）。

入力: in1 画像の CHOP（H·W チャンネル × 色数サンプル）
出力

- out1: Outw·Outh チャンネル × Outchan サンプル
- outD1: in1 についての勾配

パラメータ

- Win: 入力画像の幅
- Outchan / Outw / Outh: 出力のチャンネル数と大きさ
- Bias、Lr / Lambda、D1、Reset: NNConv2d と同じ

## ダウンロード

[NNAdaptConv2d.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNAdaptConv2d.tox) [使用例 NNAdaptConv2dExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNAdaptConv2dExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Matrix |
| 出力 0 | CHOP | `out1` | Matrix |
| 出力 1 | CHOP | `outD1` | Matrix / in1 についての勾配 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Convolution` | Convolution | Parameter | Header |  |  |
| `Win` | Input Width | Parameter | Int | `1` | 1.0 … 128.0 |
| `Output` | Output | Parameter | Header |  |  |
| `Outchan` | Output Channels | Parameter | Int | `1` | 1.0 … 4.0 |
| `Outw` | Out Size | Parameter | WH | `1` | 1.0 … 128.0 |
| `Outh` | Out Size | Parameter | WH | `1` | 1.0 … 128.0 |
| `Bias` | Bias | Parameter | Toggle | `True` |  |
| `Learn` | Learn | Parameter | Header |  |  |
| `Lr` | Learning Rate | Parameter | Float | `0.001` | 0.0 … 1.0 |
| `Lambda` | Lambda | Parameter | Float | `0.01` | 0.0 … 1.0 |
| `D1` | D1 | D | CHOP |  |  |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### 決まった大きさの特徴にする

![決まった大きさの特徴にする](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-NN-NNAdaptConv2d-example.png)

16 × 16 のバナナの画像の CHOP を、出力 4 × 4・3 チャンネルの NNAdaptConv2d に通した例です(重みは初期値のまま)。入力の大きさに関係なく 4 × 4 の特徴になります。図はそれを画像に戻したものです。

ネットワーク: `banana` (moviefileinTOP) → `banana_16` (fitTOP: `outputresolution=custom`, `resolutionw=16`, `resolutionh=16`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `TOPRGB2ImCHOP` (パレット) → `NNAdaptConv2d` (パレット: `Win=16`, `Outw=4`, `Outh=4`, `Outchan=3`) → `ImCHOP2TOPRGB` (パレット: `Win=4`) → `enlarged` (fitTOP: `outputresolution=custom`, `resolutionw=256`, `resolutionh=256`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `out1`

[NNAdaptConv2dExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNAdaptConv2dExample.toe)

??? note "手順(AutoDiff/NN/NNAdaptConv2d.example.py)"

    ```python
    """決まった大きさの特徴にする

    16 × 16 のバナナの画像の CHOP を、出力 4 × 4・3 チャンネルの NNAdaptConv2d に通した例です(重みは初期値のまま)。入力の大きさに関係なく 4 × 4 の特徴になります。図はそれを画像に戻したものです。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import image_chop, show_image_chop  # noqa: E402

    def build(ex, tox):
        conv = ex.palette(tox, image_chop(ex, 16), Win=16, Outw=4, Outh=4, Outchan=3)
        show_image_chop(ex, conv, 4)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Col2im` | [Col2Im (Col2ImCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) |
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |
| `CHOP:Im2col` | [Im2Col (Im2ColCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) |

167 個のオペレータ。sha256: `7656f02c41203a5f…`
