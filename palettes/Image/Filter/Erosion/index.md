<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Erosion/ -->

# Erosion

`Image/Filter` フォルダのパレットです。

## 説明

2 値画像の収縮（モルフォロジー）。白い部分を 1 px 細らせる（3×3 がすべて白のときだけ白）。マスクの小さなゴミを消したり、縁を内側に寄せるのに使う。8 bit でも float の画像でも同じように動く。

入力: in1 白黒のマスク画像（RGB の最大を見る）
出力: out1 同じ解像度の 0/1 の画像（アルファも同じ）

## ダウンロード

[Erosion.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/Erosion.tox) [使用例 ErosionExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/ErosionExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Mask |
| 出力 0 | TOP | `out1` | Mask |

## 使用例

### マスクの細かいゴミを消す

![マスクの細かいゴミを消す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Filter-Erosion-example.png)

ノイズをしきい値で白黒にしたマスクに Erosion を 2 回かけた例です。小さな白い点が消え、大きな塊だけが少し細って残ります。

ネットワーク: `in0` (noiseTOP: `resolutionw=720`, `resolutionh=360`, `period=0.15`, `harmon=3`, `amp=1`) → `thresh1` (thresholdTOP: `threshold=0.62`) → `Erosion` (パレット) → `Erosion1` (パレット) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=720`, `resolutionh=360`) → `on_black` (overTOP) → `out1`

[ErosionExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/ErosionExample.toe)

??? note "手順(Image/Filter/Erosion.example.py)"

    ```python
    """マスクの細かいゴミを消す

    ノイズをしきい値で白黒にしたマスクに Erosion を 2 回かけた例です。小さな白い点が消え、大きな塊だけが少し細って残ります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    def build(ex, tox):
        noise = ex.input("noiseTOP", resolutionw=720, resolutionh=360, period=0.15, harmon=3, amp=1)
        mask = ex.op("thresholdTOP", input=noise, threshold=0.62)
        a = ex.palette(tox, mask)
        on_black(ex, ex.palette(tox, a))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

7 個のオペレータ。sha256: `4cad6c78c413618f…`
