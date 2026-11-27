<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Embedding/SimpleImageEmbedding/ -->

# SimpleImageEmbedding

`Learning/Embedding` フォルダのパレットです。

## 説明

画像の各画素の色（R, G, B）を毎フレーム、小さなリザバー（SimpleEmbedding、3 次元）に通して、画素ごとの埋め込みを色にした画像を作る（時間で正規化してから tanh で −1〜1）。動きや変化のパターンが色になる。

入力: in1 画像 TOP
出力: out1 画像 TOP（入力と同じ大きさ、32 bit float）

## ダウンロード

[SimpleImageEmbedding.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/SimpleImageEmbedding.tox) [使用例 SimpleImageEmbeddingExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/SimpleImageEmbeddingExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | TOP | `out1` | Image |

## 使用例

### 画素ごとのリザバー埋め込み

![画素ごとのリザバー埋め込み](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Embedding-SimpleImageEmbedding-example.png)

ゆっくり動くノイズ(64 × 36)の各画素の色の変化を、小さなリザバーに通して色にした例です(1.5 秒回したところ)。

ネットワーク: `in0` (noiseTOP: `resolutionw=64`, `resolutionh=36`, `mono=False`, `period=0.5`, `tz={'expr': 'absTime.seconds * 0.5'}`) → `SimpleImageEmbedding` (パレット) → `enlarged` (fitTOP: `outputresolution=custom`, `resolutionw=640`, `resolutionh=360`, `fit=fitbest`, `inputfiltertype=nearest`, `filtertype=nearest`) → `out1`

[SimpleImageEmbeddingExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/SimpleImageEmbeddingExample.toe)

??? note "手順(Learning/Embedding/SimpleImageEmbedding.example.py)"

    ```python
    """画素ごとのリザバー埋め込み

    ゆっくり動くノイズ(64 × 36)の各画素の色の変化を、小さなリザバーに通して色にした例です(1.5 秒回したところ)。
    """

    FRAMES = 90

    def build(ex, tox):
        img = ex.input("noiseTOP", resolutionw=64, resolutionh=36, mono=False, period=0.5,
                       tz={"expr": "absTime.seconds * 0.5"})
        emb = ex.palette(tox, img)
        ex.out(ex.op("fitTOP", name="enlarged", input=emb, outputresolution="custom", resolutionw=640,
                     resolutionh=360, fit="fitbest", inputfiltertype="nearest", filtertype="nearest"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

79 個のオペレータ。sha256: `2500a3c7e0d3e6e5…`
