<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CurlNoiseFlow/ -->

# CurlNoiseFlow

`Image/Effect` フォルダのパレットです。

## 説明

カールノイズの流れで画像を流す（Image/Effect/CurlNoise の発展版）。ポテンシャルを 0〜1 に正規化し、その勾配を 90° 回した速度場で各ピクセルの位置を毎フレーム動かしてためる（フィードバック、32 bit float）。Image/Effect/CurlNoise との違いは次の 2 つ。

- 1 px 未満のランダムな揺らぎを、ポテンシャルの強さに合わせて足す
- 少し拡大・回転した位置を縁の帯に重ねて、外側から新しい位置を補給する（流れが止まりにくい）

入力

- inPotential: ポテンシャル TOP（r を使う）。省略時は中の Perlin 4D ノイズ（時間で変化）
- inSource: 流す画像。省略時はサンプル画像（Mettler）。UV の解像度もこれで決まる

出力

- outRemapped: 流れた画像（inSource と同じ解像度）
- outUV: たまった位置の UV マップ

パラメータ

- Dt: 流れる速さ（1 フレームの移動量と揺らぎの倍率）
- Reset: オンの間、位置を初期状態（恒等 UV）に戻す

## ダウンロード

[CurlNoiseFlow.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CurlNoiseFlow.tox) [使用例 CurlNoiseFlowExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CurlNoiseFlowExample.toe)

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
| `Dt` | Dt | Parameter | Float | `0.9` | 0.0 … 1.0 |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### 外から補給しながら流れ続ける

![外から補給しながら流れ続ける](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-CurlNoiseFlow-example.png)

入力をつながず、中のノイズ(ポテンシャル)とサンプル画像で 180 フレーム流した例です。縁から新しい位置を補給するので、長く流しても止まりにくくなっています。inSource に好きな画像を、inPotential にノイズや映像をつなぐと、その形で流れます。Reset で元に戻ります。

ネットワーク: `CurlNoiseFlow` (パレット) → `out1`

[CurlNoiseFlowExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CurlNoiseFlowExample.toe)

??? note "手順(Image/Effect/CurlNoiseFlow.example.py)"

    ```python
    """外から補給しながら流れ続ける

    入力をつながず、中のノイズ(ポテンシャル)とサンプル画像で 180 フレーム流した例です。縁から新しい位置を補給するので、長く流しても止まりにくくなっています。inSource に好きな画像を、inPotential にノイズや映像をつなぐと、その形で流れます。Reset で元に戻ります。
    """

    FRAMES = 180

    def build(ex, tox):
        ex.palette(tox)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

52 個のオペレータ。sha256: `bca59e1edd0bd7c0…`
