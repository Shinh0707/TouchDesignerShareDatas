<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Embedding/UMAPEmbedding/ -->

# UMAPEmbedding

`Learning/Embedding` フォルダのパレットです。

## 説明

Online parametric UMAP built from the AutoDiff components. Each input channel is a point; its samples (or log spectrum) are its features.

- out1: embedding of the current input channels (channels x Outsamples), 0..1 if Normalize.
- out2: embedding of the whole buffer (Buffersize x Outsamples), for scatter plots.
- out3: UMAP cross-entropy loss (monitor).

Pipeline: buffer (replay rows + bias column) -> NNLinear1 -> DLeakyReLU -> NNLinear2 -> Y. graph builds the UMAP fuzzy kNN graph P of the buffer; umapGrad computes dL/dY of the UMAP cross-entropy and feeds it as D1 into NNLinear2, which backpropagates (dA, dH) to NNLinear1; NNAdamW inside each layer updates the weights.

buffer/graph/umapGrad/embed are numpy Script CHOPs: kNN + sigma binary search have no native CHOP equivalent, and the pairwise UMAP gradient is O(N^2) on small N.

## 入力の大きさと速さ(ベストプラクティス)
入力が長いときは、Resample CHOP で小さくしてから入れます:
Method = New Interval、Sample Rate = 60、Start = 0 / End = N−1(単位 Samples)、Time Slice = オフ(オンのままだと 1 サンプルになります)。

重さはほぼ Buffersize の 2 乗で決まります(kNN の `graph` と勾配の `umapGrad` は全ペアを計算します)。サンプル数・Featuresize はほとんど効きません。Mac の背景 TD で、16 チャンネル(16 点)× 256 サンプルを入れたときの 1 フレームあたりの処理時間:

| Buffersize | 処理時間 | fps |
|---|---|---|
| 64 | 5.9 ms | 60 |
| 128 | 7.4 ms | 60 |
| 256 | 12 ms | 48 |
| 512 | 35 ms | 23 |

サンプル数を 64 → 1024 に変えても 7.5 → 7.8 ms、Featuresize = 256 でも 8.7 ms です。

- 推奨: Buffersize = 128(60 fps を保てるのは 256 弱まで)
- バッファには毎フレーム、入力のチャンネル数ぶんの行が入ります。Buffersize ÷ チャンネル数 が「何フレーム前まで覚えているか」なので、チャンネルが多いときは Buffersize もそれに合わせます(Buffersize がチャンネル数より小さいときは、チャンネル数に広げます)
- 確認: 8 本ずつ周期の違う 2 組の正弦波(と毎フレーム変わるノイズ)を 16 チャンネルで入れると、20 秒で 2 組が分かれます(組の間の距離 ÷ 組の中の広がり: Spectrum = 0 で 52、Spectrum = 1 で 3.6)

## ダウンロード

[UMAPEmbedding.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/UMAPEmbedding.tox) [使用例 UMAPEmbeddingExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/UMAPEmbeddingExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any / 各チャンネルが 1 つの点（音なら Spectrum = 1 で対数スペクトルを特徴にする） |
| 出力 0 | CHOP | `out1` | Feature / 今の入力の埋め込み（チャンネル × Outsamples。Normalize で 0〜1） |
| 出力 1 | CHOP | `out2` | Feature / バッファ全体の埋め込み（散布図用） |
| 出力 2 | CHOP | `out3` | Any / UMAP の損失 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Outsamples` | Embedding Dim | UMAP | Int | `3` | 1.0 … 30.0 |
| `Hidden` | Hidden Size | UMAP | Int | `3` | 1.0 … 30.0 |
| `Buffersize` | Buffer Size | UMAP | Float | `0` | 0.0 … 1.0 |
| `Neighbors` | Neighbors | UMAP | Float | `0` | 0.0 … 1.0 |
| `Mindist` | Min Dist | UMAP | Float | `0` | 0.0 … 1.0 |
| `Spread` | Spread | UMAP | Float | `0` | 0.0 … 1.0 |
| `Repulsion` | Repulsion | UMAP | Float | `0` | 0.0 … 1.0 |
| `Spectrum` | Spectrum Features | UMAP | Float | `0` | 0.0 … 1.0 |
| `Featuresize` | Feature Size | UMAP | Float | `0` | 0.0 … 1.0 |
| `Standardize` | Standardize | UMAP | Float | `0` | 0.0 … 1.0 |
| `Normalize` | Normalize Output | UMAP | Float | `0` | 0.0 … 1.0 |
| `Lr` | Learning Rate | UMAP | Float | `0.001` | 0.0 … 1.0 |
| `Lambda` | Weight Decay | UMAP | Float | `0.01` | 0.0 … 1.0 |
| `Reset` | Reset | UMAP | Toggle | `False` |  |

## 使用例

### 2 組の波形を 2 次元に分ける

![2 組の波形を 2 次元に分ける](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Embedding-UMAPEmbedding-example.svg)

周期 4 の正弦波 8 本(a1〜a8)と周期 13 の正弦波 8 本(b1〜b8)に、毎フレーム変わるノイズを足した 16 チャンネルを、Resample CHOP(New Interval、Sample Rate 60、0〜255 サンプル、Time Slice オフ)で 256 サンプルにして入れた例です(Spectrum = 0、Buffersize = 128)。20 秒学習した各チャンネルの 2 次元の位置(0〜1)で、a と b が別々の場所に集まります。

ネットワーク: `sine4` (patternCHOP: `wavetype=sin`, `length=1024`, `numcycles=4`, `channelname=a[1-8]`) → `sine13` (patternCHOP: `wavetype=sin`, `length=1024`, `numcycles=13`, `channelname=b[1-8]`) → `waves` (mergeCHOP) → `noise` (noiseCHOP: `channelname=a[1-8] b[1-8]`, `type=sparse`, `amp=0.3`, `rate=60`, `start=0`, `end=1023`, `endunit=samples`, `seed={'expr': 'absTime.frame % 1000'}`) → `mix` (mathCHOP: `chopop=add`, `match=name`) → `resample256` (resampleCHOP: `method=newint`, `rate=60`, `relative=abs`, `start=0`, `startunit=samples`, `end=255`, `endunit=samples`, `timeslice=False`) → `UMAPEmbedding` (パレット: `Spectrum=0`, `Buffersize=128`) → `out1`

[UMAPEmbeddingExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/UMAPEmbeddingExample.toe)

??? note "手順(Learning/Embedding/UMAPEmbedding.example.py)"

    ```python
    """2 組の波形を 2 次元に分ける

    周期 4 の正弦波 8 本(a1〜a8)と周期 13 の正弦波 8 本(b1〜b8)に、毎フレーム変わるノイズを足した 16 チャンネルを、Resample CHOP(New Interval、Sample Rate 60、0〜255 サンプル、Time Slice オフ)で 256 サンプルにして入れた例です(Spectrum = 0、Buffersize = 128)。20 秒学習した各チャンネルの 2 次元の位置(0〜1)で、a と b が別々の場所に集まります。
    """

    FRAMES = 1200

    def build(ex, tox):
        a = ex.op("patternCHOP", name="sine4", wavetype="sin", length=1024, numcycles=4, channelname="a[1-8]")
        b = ex.op("patternCHOP", name="sine13", wavetype="sin", length=1024, numcycles=13, channelname="b[1-8]")
        waves = ex.op("mergeCHOP", name="waves", input=[a, b])
        noise = ex.op("noiseCHOP", name="noise", channelname="a[1-8] b[1-8]", type="sparse", amp=0.3, rate=60,
                      start=0, end=1023, endunit="samples", seed={"expr": "absTime.frame % 1000"})
        mix = ex.op("mathCHOP", name="mix", input=[waves, noise], chopop="add", match="name")
        small = ex.op("resampleCHOP", name="resample256", input=mix, method="newint", rate=60, relative="abs",
                      start=0, startunit="samples", end=255, endunit="samples", timeslice=False)
        ex.palette(tox, small, Spectrum=0, Buffersize=128)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

322 個のオペレータ。sha256: `97f7e0796a7e13ab…`
