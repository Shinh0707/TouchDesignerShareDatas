<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Image/DTOPRGB2ImCHOP/ -->

# DTOPRGB2ImCHOP

`AutoDiff/Image` フォルダのパレットです。

## 説明

画像 TOP を画像の CHOP にする（TOPRGB2ImCHOP）。逆伝播では、D1 に入れた勾配（画像の CHOP）を画像 TOP に戻して outD1 に出す（どこを変えると損失が減るかを画像で見られる）。

入力: in1 画像 TOP
出力

- out1: H·W チャンネル × 3 サンプル
- outD1: 入力画像についての勾配の TOP

パラメータ

- D1: out1 についての勾配の CHOP

## ダウンロード

[DTOPRGB2ImCHOP.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/DTOPRGB2ImCHOP.tox) [使用例 DTOPRGB2ImCHOPExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/DTOPRGB2ImCHOPExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | CHOP | `out1` | Matrix |
| 出力 1 | TOP | `outD1` | Data / 入力画像についての勾配 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `D1` | D1 | D | CHOP |  |  |

## 使用例

### 画像を画像の CHOP にして、勾配を画像に戻す

![画像を画像の CHOP にして、勾配を画像に戻す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/AutoDiff-Image-DTOPRGB2ImCHOP-example.png)

16 × 16 に縮めたバナナを画像の CHOP(256 チャンネル × 3 サンプル)にし、D1 に out1 そのものを入れて逆伝播した例です。勾配は画像の TOP(outD1)に戻るので、元のバナナの絵になります(拡大して表示)。学習では、損失を減らすにはどこの色をどう変えればよいかが、この画像で見えます。

ネットワーク: `banana` (moviefileinTOP) → `in0` (fitTOP: `outputresolution=custom`, `resolutionw=16`, `resolutionh=16`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `DTOPRGB2ImCHOP` (パレット) → `grad_of_out1` (selectCHOP: `chops=out1`) → `outD1` (selectTOP: `top=outD1`) → `enlarged` (fitTOP: `outputresolution=custom`, `resolutionw=256`, `resolutionh=256`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `out1`

[DTOPRGB2ImCHOPExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/DTOPRGB2ImCHOPExample.toe)

??? note "手順(AutoDiff/Image/DTOPRGB2ImCHOP.example.py)"

    ```python
    """画像を画像の CHOP にして、勾配を画像に戻す

    16 × 16 に縮めたバナナを画像の CHOP(256 チャンネル × 3 サンプル)にし、D1 に out1 そのものを入れて逆伝播した例です。勾配は画像の TOP(outD1)に戻るので、元のバナナの絵になります(拡大して表示)。学習では、損失を減らすにはどこの色をどう変えればよいかが、この画像で見えます。
    """

    def build(ex, tox):
        img = ex.op("moviefileinTOP", name="banana")
        small = ex.input("fitTOP", input=img, outputresolution="custom", resolutionw=16, resolutionh=16, fit="fitbest",
                         inputfiltertype="nearest", filtertype="nearest")
        comp = ex.palette(tox, small)
        grad = ex.op("selectCHOP", name="grad_of_out1", chops=comp.op("out1"))
        comp.par.D1 = grad.path
        g = ex.op("selectTOP", name="outD1", top=comp.op("outD1"))
        ex.out(ex.op("fitTOP", name="enlarged", input=g, outputresolution="custom", resolutionw=256, resolutionh=256,
                     fit="fitbest", inputfiltertype="nearest", filtertype="nearest"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

18 個のオペレータ。sha256: `e624b579a3d8cda8…`
