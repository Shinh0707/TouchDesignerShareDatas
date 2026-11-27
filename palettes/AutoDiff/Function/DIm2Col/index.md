<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DIm2Col/ -->

# DIm2Col

`AutoDiff/Function` フォルダのパレットです。

## 説明

AutoDiff（CHOP で組んだ自動微分）の部品。画像の CHOP（画素 × 色の行列）を、畳み込み用のパッチの列（im2col）に並べ替える。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHOP）を指すと、in1 についての勾配 dL/dx を outD1 に出す（逆伝播）。

入力: in1 画像の CHOP（H·W チャンネル × 色数サンプル。TOPRGB2ImCHOP の出力）
出力

- out1: パッチ数チャンネル × (色数·Kw·Kh) サンプル（色ごとにまとまった並び）
- outD1: dL/dx = dL/dy を元の画素に足し戻したもの（col2im）

パラメータ

- D1: out1 についての勾配の CHOP（逆伝播を使わないなら空でよい）
- Win: 入力画像の幅
- Kw / Kh: カーネルの大きさ
- Sw / Sh: ストライド
- Pw / Ph: パディング

## ダウンロード

[DIm2Col.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DIm2Col.tox) [使用例 DIm2ColExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DIm2ColExample.toe)

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
| `Kw` | K | Parameter | WH | `3` | 1.0 … 5.0 |
| `Kh` | K | Parameter | WH | `3` | 1.0 … 5.0 |
| `Sw` | S | Parameter | WH | `1` | 0.0 … 5.0 |
| `Sh` | S | Parameter | WH | `1` | 0.0 … 5.0 |
| `Pw` | P | Parameter | WH | `0` | 0.0 … 5.0 |
| `Ph` | P | Parameter | WH | `0` | 0.0 … 5.0 |
| `D1` | D1 | D | CHOP |  |  |

## 使用例

### パッチの重なりを勾配で見る

![パッチの重なりを勾配で見る](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Function-DIm2Col-example.png)

16 × 16 の画像の CHOP を 3 × 3 のパッチ(ストライド 1)に並べ替え、D1 に 1 を入れて逆伝播した例です。勾配(outD1)は各画素が何個のパッチに入っているかになり(中央 9、縁 1〜6)、図はそれを 9 で割って画像にしたものです。out1 は 196 チャンネル(パッチ) × 27 サンプル(3 色 × 3 × 3)です。

ネットワーク: `banana` (moviefileinTOP) → `banana_16` (fitTOP: `outputresolution=custom`, `resolutionw=16`, `resolutionh=16`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `TOPRGB2ImCHOP` (パレット) → `DIm2Col` (パレット: `Win=16`, `Kw=3`, `Kh=3`, `Sw=1`, `Sh=1`) → `patches` (selectCHOP: `chops=out1`) → `ones` (mathCHOP: `gain=0`, `postoff=1`) → `grad` (selectCHOP: `chops=outD1`) → `per_9` (mathCHOP: `gain=0.1111111111111111`) → `ImCHOP2TOPRGB` (パレット: `Win=16`) → `enlarged` (fitTOP: `outputresolution=custom`, `resolutionw=256`, `resolutionh=256`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `out1`

[DIm2ColExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DIm2ColExample.toe)

??? note "手順(AutoDiff/Function/DIm2Col.example.py)"

    ```python
    """パッチの重なりを勾配で見る

    16 × 16 の画像の CHOP を 3 × 3 のパッチ(ストライド 1)に並べ替え、D1 に 1 を入れて逆伝播した例です。勾配(outD1)は各画素が何個のパッチに入っているかになり(中央 9、縁 1〜6)、図はそれを 9 で割って画像にしたものです。out1 は 196 チャンネル(パッチ) × 27 サンプル(3 色 × 3 × 3)です。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import image_chop, show_image_chop  # noqa: E402

    def build(ex, tox):
        im = ex.palette(tox, image_chop(ex, 16), Win=16, Kw=3, Kh=3, Sw=1, Sh=1)
        raw = ex.op("selectCHOP", name="patches", chops=im.op("out1"))
        im.par.D1 = ex.op("mathCHOP", name="ones", input=raw, gain=0, postoff=1).path
        counts = ex.op("selectCHOP", name="grad", chops=im.op("outD1"))
        show_image_chop(ex, ex.op("mathCHOP", name="per_9", input=counts, gain=1 / 9), 16)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Col2im` | [Col2Im (Col2ImCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) |
| `CHOP:Im2col` | [Im2Col (Im2ColCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) |

10 個のオペレータ。sha256: `60a6add6f66c78f2…`
