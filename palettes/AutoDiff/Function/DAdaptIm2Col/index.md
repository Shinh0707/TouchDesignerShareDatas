<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DAdaptIm2Col/ -->

# DAdaptIm2Col

`AutoDiff/Function` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。出力の大きさ（Outw × Outh）から、カーネルとストライドを自動で決めて im2col する（アダプティブプーリング用）。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1 についての勾配 dL/dx を outD1 に出す（逆伝播）。

入力: in1 画像の CHOP（H·W チャンネル × 色数サンプル）
出力

- out1: Outw·Outh チャンネル × (パッチの画素数·色数) サンプル
- outD1: dL/dx = dL/dy を元の画素に足し戻したもの

パラメータ

- D1: out1 についての勾配の CHOP（逆伝播を使わないなら空でよい）
- Win: 入力画像の幅
- Outw / Outh: 出力のパッチの並び

## ダウンロード

[DAdaptIm2Col.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DAdaptIm2Col.tox) [使用例 DAdaptIm2ColExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DAdaptIm2ColExample.toe)

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

### 決まった数のパッチに分ける

![決まった数のパッチに分ける](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Function-DAdaptIm2Col-example.svg)

16 × 16 の画像の CHOP を、出力 4 × 4(Outw, Outh)になるように自動で決めたカーネルとストライドでパッチに並べた例です。out1 は 16 チャンネル(パッチ) × 48 サンプル(4 × 4 画素 × 3 色)で、図はそのうち最初のいくつかのパッチの値です。

ネットワーク: `banana` (moviefileinTOP) → `banana_16` (fitTOP: `outputresolution=custom`, `resolutionw=16`, `resolutionh=16`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `TOPRGB2ImCHOP` (パレット) → `DAdaptIm2Col` (パレット: `Win=16`, `Outw=4`, `Outh=4`) → `out1`

[DAdaptIm2ColExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DAdaptIm2ColExample.toe)

??? note "手順(AutoDiff/Function/DAdaptIm2Col.example.py)"

    ```python
    """決まった数のパッチに分ける

    16 × 16 の画像の CHOP を、出力 4 × 4(Outw, Outh)になるように自動で決めたカーネルとストライドでパッチに並べた例です。out1 は 16 チャンネル(パッチ) × 48 サンプル(4 × 4 画素 × 3 色)で、図はそのうち最初のいくつかのパッチの値です。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import image_chop  # noqa: E402

    def build(ex, tox):
        ex.palette(tox, image_chop(ex, 16), Win=16, Outw=4, Outh=4)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Col2im` | [Col2Im (Col2ImCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) |
| `CHOP:Im2col` | [Im2Col (Im2ColCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) |

20 個のオペレータ。sha256: `f0b105da7114420a…`
