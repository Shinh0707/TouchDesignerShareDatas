<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CurlNoise/ -->

# CurlNoise

`Image/Effect` フォルダのパレットです。

## 説明

カールノイズの流れで画像を流す（液体・煙のように渦を巻いて流れる歪み）。ポテンシャル（ノイズ画像）の勾配を 90° 回した速度場で、各ピクセルの位置を毎フレーム少しずつ動かしてためていく（フィードバック）。流れた位置の UV と、それで Source を Remap した画像を出す。位置には毎フレーム軽く blur をかけている（計算誤差で流れが止まるのを防ぐため。細かい渦は少しずつぼける）。位置は 32 bit float でためる。

入力

- inPotential: ポテンシャル TOP（r を使う）。省略時は中の Perlin 4D ノイズ（時間で変化）
- inSource: 流す画像。省略時はサンプル画像（Mettler）。UV の解像度もこれで決まる

出力

- outRemapped: 流れた画像（inSource と同じ解像度）
- outUV: たまった位置の UV マップ（0〜1 でループ）

パラメータ

- Scale: 流れる速さ（1 フレームの移動量の倍率。既定 1.131125 は調整して決めた値）
- Reset: オンの間、位置を初期状態（恒等 UV）に戻す

## ダウンロード

[CurlNoise.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CurlNoise.tox) [使用例 CurlNoiseExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CurlNoiseExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `inSource` | Image / 流す画像。省略時はサンプル画像(省略可) |
| 入力 1 | TOP | `inPotential` | Data / ポテンシャル（r）。省略時は Perlin 4D ノイズ(省略可) |
| 出力 0 | TOP | `outRemapped` | Image |
| 出力 1 | TOP | `outUV` | UV |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Scale` | Scale | Parameter | Float | `1.13112` | 0.0 … 5.0 |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### 画像が渦を巻いて流れる

![画像が渦を巻いて流れる](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-CurlNoise-example.png)

入力をつながず、中のノイズ(ポテンシャル)とサンプル画像で 180 フレーム流した例です。inSource に好きな画像を、inPotential にノイズや映像をつなぐと、その形で流れます。Reset で元に戻ります。

ネットワーク: `CurlNoise` (パレット) → `out1`

[CurlNoiseExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CurlNoiseExample.toe)

??? note "手順(Image/Effect/CurlNoise.example.py)"

    ```python
    """画像が渦を巻いて流れる

    入力をつながず、中のノイズ(ポテンシャル)とサンプル画像で 180 フレーム流した例です。inSource に好きな画像を、inPotential にノイズや映像をつなぐと、その形で流れます。Reset で元に戻ります。
    """

    FRAMES = 180

    def build(ex, tox):
        ex.palette(tox)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

32 個のオペレータ。sha256: `cf1e6e47b15876f4…`
