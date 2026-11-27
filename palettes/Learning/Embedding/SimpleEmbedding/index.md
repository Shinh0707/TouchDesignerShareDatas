<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Embedding/SimpleEmbedding/ -->

# SimpleEmbedding

`Learning/Embedding` フォルダのパレットです。

## 説明

オーディオを Echo State Network（リザバー）に通して、埋め込みベクトルにする。入力の各チャンネルを、毎フレームの音で更新されるリザバーの状態（Outsamples 次元、0〜1）にする。重みは Seed から作る乱数で、学習はしない。リザバーの重みはスペクトル半径 0.9 にそろえる（SpectralRadius）。

中の行列の積は、出力のチャンネル数がサンプル数より多いとき転置して計算してから戻す（結果は同じで、チャンネルが多いときに速い）。

入力: in1 オーディオ CHOP
出力: out1 入力のチャンネル数 × Outsamples サンプル（0〜1）

パラメータ

- Outsamples: リザバーの大きさ（埋め込みの次元）
- Lr: リーク率（大きいほど新しい音にすぐ反応する）
- Seed: 重みの乱数の種（変えると別のリザバーになる）
- Reset: オンの間、リザバーの状態を 0 に戻す

入力のチャンネル数や長さ、Outsamples を変えても、状態は自動で新しい形に合わせ直す。

## ダウンロード

[SimpleEmbedding.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/SimpleEmbedding.tox) [使用例 SimpleEmbeddingExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/SimpleEmbeddingExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Audio |
| 出力 0 | CHOP | `out1` | Feature |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Outsamples` | Output Samples | Parameter | Int | `12` | 1.0 … 50.0 |
| `Lr` | Learning Rate | Parameter | Float | `0.1` | 0.0 … 1.0 |
| `Seed` | Seed | Parameter | Int | `0` | 0.0 … 100.0 |
| `Reset` | Reset | Action | Toggle | `False` |  |

## 使用例

### 音のリザバー埋め込み

![音のリザバー埋め込み](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Embedding-SimpleEmbedding-example.svg)

左に三角波 220 Hz、右にノコギリ波 330 Hz を入れて、2 秒ほど回したリザバーの状態(各チャンネル 14 次元、0〜1)の例です。音の違いで、別のベクトルになります。

ネットワーク: `tri220` (audiooscillatorCHOP: `wavetype=tri`, `frequency=220`, `amp=0.5`) → `ramp330` (audiooscillatorCHOP: `wavetype=ramp`, `frequency=330`, `amp=0.5`) → `in0` (mergeCHOP) → `SimpleEmbedding` (パレット) → `out1`

[SimpleEmbeddingExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/SimpleEmbeddingExample.toe)

??? note "手順(Learning/Embedding/SimpleEmbedding.example.py)"

    ```python
    """音のリザバー埋め込み

    左に三角波 220 Hz、右にノコギリ波 330 Hz を入れて、2 秒ほど回したリザバーの状態(各チャンネル 14 次元、0〜1)の例です。音の違いで、別のベクトルになります。
    """

    FRAMES = 120

    def build(ex, tox):
        a = ex.op("audiooscillatorCHOP", name="tri220", wavetype="tri", frequency=220, amp=0.5)
        b = ex.op("audiooscillatorCHOP", name="ramp330", wavetype="ramp", frequency=330, amp=0.5)
        st = ex.input("mergeCHOP", input=[a, b])
        ex.palette(tox, st)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

39 個のオペレータ。sha256: `b06db0a3c1d6e69c…`
