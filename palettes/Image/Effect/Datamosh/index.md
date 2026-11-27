<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/Datamosh/ -->

# Datamosh

`Image/Effect` フォルダのパレットです。

## 説明

データモッシュ（mp4 の処理落ちで、前の映像が部分的に残ったまま動きに引きずられる乱れ）をリアルタイムで作る。動画の圧縮と同じ考え方で、保持している絵をブロックごとの動きでずらし、変化の小さいブロックだけ差分で更新する。変化の大きいブロック（場面の切り替わりなど）は更新されないので、古い絵が残って新しい映像の動きで流れる。キーフレームを送ると正常な絵に戻る。

入力: in1 画像 TOP
出力: out1 同じ解像度の画像

パラメータ

- Block: ブロックの大きさ（ピクセル）
- Range: 動きを探す範囲（ピクセル。1 フレームでこれより大きく動くと追えない）
- Motion: 動きの倍率（0 で動かさない、1 で映像の動きどおり）
- Residual: 差分で更新する割合（0 で動きだけ、1 で差分をそのまま足す）
- Limit: これより大きく変化したブロックは更新しない（0〜1。小さいほど古い絵が残る。1 ですべて更新）
- Quantize: これより小さい差分は捨てる（0 で捨てない。大きいほど色のずれが残る）
- Bloom: オンの間、今の動きと差分を止めて毎フレームかけ続ける（同じ動きが重なってにじむ）
- Refresh: オンの間、キーフレームを送り続ける（入力がそのまま出る）
- Keyframe: 押すとキーフレームを 1 回送る（正常な絵に戻る）
- Interval: キーフレームを自動で送る間隔（秒。0 で送らない）

Limit = 1、Residual = 1、Quantize = 0 にしてキーフレームを送ると、出力は入力と同じになる。動きの検出は中の GLSL TOP で行う（Optical Flow TOP は macOS で動かないため）。

## ダウンロード

[Datamosh.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/Datamosh.tox) [使用例 DatamoshExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/DatamoshExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Block` | Block Size | Datamosh | Int | `16` | 2.0 … 64.0 |
| `Range` | Search Range | Datamosh | Float | `16` | 0.0 … 64.0 |
| `Motion` | Motion | Datamosh | Float | `1` | 0.0 … 2.0 |
| `Residual` | Residual | Datamosh | Float | `1` | 0.0 … 1.0 |
| `Limit` | Update Limit | Datamosh | Float | `0.1` | 0.0 … 1.0 |
| `Quantize` | Quantize | Datamosh | Float | `0.03` | 0.0 … 0.25 |
| `Bloom` | Bloom | Datamosh | Toggle | `False` |  |
| `Refresh` | Refresh | Datamosh | Toggle | `False` |  |
| `Keyframe` | Keyframe | Datamosh | Pulse | `False` |  |
| `Interval` | Keyframe Interval | Datamosh | Float | `0` | 0.0 … 10.0 |

## 使用例

### 場面が切り替わっても前の絵が残る

![場面が切り替わっても前の絵が残る](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Effect-Datamosh-example.png)

ゆっくり動く 2 枚の写真を 2 秒ごとに切り替え、Datamosh をかけた例です。切り替わった瞬間は変化が大きいので更新されず、前の写真が新しい写真の動きで流れ、新しい写真の色が少しずつにじんで入ります。Keyframe を押すと正常な絵に戻ります。

ネットワーク: `watch` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Mettler.1.jpg'"}`) → `watch_move` (transformTOP: `sx=1.5`, `sy=1.5`, `extend=mirror`, `outputresolution=custom`, `resolutionw=640`, `resolutionh=360`, `tx={'expr': 'math.sin(absTime.seconds * 1.5) * 0.12'}`, `rotate={'expr': 'math.sin(absTime.seconds * 0.8) * 3'}`) → `beans` (moviefileinTOP: `file={'expr': "app.samplesFolder + '/Map/Jellybeans.1.jpg'"}`) → `beans_move` (transformTOP: `sx=1.5`, `sy=1.5`, `extend=mirror`, `outputresolution=custom`, `resolutionw=640`, `resolutionh=360`, `tx={'expr': 'math.sin(absTime.seconds * 2.0) * 0.12'}`, `rotate={'expr': 'math.sin(absTime.seconds * 0.8) * -4'}`) → `in0` (switchTOP: `index={'expr': 'int(absTime.seconds / 2) % 2'}`) → `Datamosh` (パレット) → `out1`

[DatamoshExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/DatamoshExample.toe)

??? note "手順(Image/Effect/Datamosh.example.py)"

    ```python
    """場面が切り替わっても前の絵が残る

    ゆっくり動く 2 枚の写真を 2 秒ごとに切り替え、Datamosh をかけた例です。切り替わった瞬間は変化が大きいので更新されず、前の写真が新しい写真の動きで流れ、新しい写真の色が少しずつにじんで入ります。Keyframe を押すと正常な絵に戻ります。
    """

    FRAMES = 200

    def build(ex, tox):
        def scene(name, image, speed, angle):
            photo = ex.op("moviefileinTOP", name=name, file={"expr": "app.samplesFolder + '/Map/%s'" % image})
            return ex.op("transformTOP", name=name + "_move", input=photo, sx=1.5, sy=1.5, extend="mirror",
                         outputresolution="custom", resolutionw=640, resolutionh=360,
                         tx={"expr": "math.sin(absTime.seconds * %s) * 0.12" % speed},
                         rotate={"expr": "math.sin(absTime.seconds * 0.8) * %s" % angle})

        a = scene("watch", "Mettler.1.jpg", 1.5, 3)
        b = scene("beans", "Jellybeans.1.jpg", 2.0, -4)
        cut = ex.input("switchTOP", input=[a, b], index={"expr": "int(absTime.seconds / 2) % 2"})
        ex.palette(tox, cut)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

32 個のオペレータ。sha256: `c07040c4f1eec14a…`
