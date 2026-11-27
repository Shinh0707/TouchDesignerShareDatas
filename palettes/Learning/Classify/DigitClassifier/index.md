<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Classify/DigitClassifier/ -->

# DigitClassifier

`Learning/Classify` フォルダのパレットです。

## 説明

手書きの数字(0〜9)を当てる、学習済みの小さなニューラルネット。BoxCrop で切り出した箱の中身(out2)をそのままつなぐと、箱ごとに数字と確からしさを出す。BoxOverlay のラベルに出せば「検出した数字に答えを付ける」表示になる。

入力

- in1: CHOP 1 チャンネルが 1 枚の画像、784 サンプル(28 × 28、上の行から順、0〜1、黒地に白い数字)。BoxCrop の out2(Size 28)の形

出力

- out1: CHOP 1 サンプルが 1 枚。`digit`(0〜9、何も描かれていなければ -1)と `conf`(一番大きい出力の値、0〜1 に切る)
- out2: CHOP 1 サンプルが 1 枚。`d0`〜`d9`(各数字の出力。正解の数字が 1、ほかが 0 に近くなるように学習している)

パラメータ

- Invert: 白地に黒い数字のとき入れる
- Blank: いちばん明るいピクセルがこれ未満なら「何も描かれていない」(digit = -1)

前処理: 学習には、数字のまわりの箱を中央に置き、長い辺を 28 の 20 にそろえた画像を使った。BoxCrop なら Size 28、Margin 0.143、Square オン、Mono オンが同じになる(MNIST そのままの重心での中央寄せとは違う)。

学習: TouchDesigner の中で、SimpleNN パレット(全結合 784 → 128 → L2 正規化 → Leaky ReLU → 全結合 10、二乗誤差、AdamW)を MNIST の訓練画像で学習した。重みは中の w1・b1・w2(ロックした CHOP)に入っている。推論は DotCHOP(行列積)と標準の CHOP だけで組んでいて、Python は使わない。テスト画像 10000 枚(同じ前処理)の正解率は 96.3 %。

出典: 重みは MNIST データベース(Yann LeCun, Corinna Cortes, Christopher J. C. Burges)の訓練画像で学習した。使用例にはそのテスト画像 100 枚を入れている。使ったデータは torchvision の MNIST(https://docs.pytorch.org/vision/main/generated/torchvision.datasets.MNIST.html)で取得したもの。MNIST は Hugging Face の ylecun/mnist(https://huggingface.co/datasets/ylecun/mnist)で MIT License として配布されている。使うときは出典として作者を記してほしい。

## ダウンロード

[DigitClassifier.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Classify/DigitClassifier.tox) [使用例 DigitClassifierExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Classify/DigitClassifierExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Matrix / 1 チャンネル = 1 枚、784 サンプル(28 × 28、上の行から、0〜1) |
| 出力 0 | CHOP | `out1` | Any / 1 サンプル = 1 枚、digit と conf |
| 出力 1 | CHOP | `out2` | Any / 1 サンプル = 1 枚、d0〜d9 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Invert` | Invert | Classify | Toggle | `False` |  |
| `Blank` | Blank Below | Classify | Float | `0.2` | 0.0 … 1.0 |

## 使用例

### 動く手書き数字を見つけて、答えを付ける

![動く手書き数字を見つけて、答えを付ける](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Classify-DigitClassifier-example.png)

画面の上を動く 8 つの手書き数字を BoxTrackCHOP で見つけ、BoxCrop で 28 × 28 に切り出し、DigitClassifier で
数字を当てて、BoxOverlay のラベル(数字と確からしさ)にした例です。数字は数秒ごとに入れ替わります。
ラベルの左が答え、右がネットワークの出力の大きさです。くっついた数字は 1 つの箱になり、読み違えます。

数字の画像は MNIST データベース(Yann LeCun, Corinna Cortes, Christopher J. C. Burges)のテスト画像 100 枚で、
torchvision の MNIST(https://docs.pytorch.org/vision/main/generated/torchvision.datasets.MNIST.html)で取得しました。
MNIST は Hugging Face の ylecun/mnist(https://huggingface.co/datasets/ylecun/mnist)で MIT License として配布されています。
使うときは出典として作者を記してください。
この例を開くには BoxTrackCHOP プラグインが要ります。

ネットワーク: `store_callbacks` (textDAT) → `mnist_images` (scriptCHOP: `callbacks=store_callbacks`) → `mnist_labels` (scriptCHOP: `callbacks=store_callbacks`) → `cycle` (constantCHOP: `const0name=cycle`, `const0value={'expr': 'int(absTime.seconds / 4)'}`) → `shown_callbacks` (textDAT) → `digits` (scriptTOP: `callbacks=shown_callbacks`, `outputresolution=custom`, `resolutionw=224`, `resolutionh=28`) → `truth` (scriptCHOP: `callbacks=shown_callbacks`) → `pos` (noiseCHOP: `type=sparse`, `period=3`, `amp=0.75`, `offset=0.5`, `channelname=tx ty`, `startunit=samples`, `endunit=samples`, `start=0`, `end=7`, `rate=0.37`, `tx={'expr': 'absTime.seconds * 0.12'}`) → `onscreen` (limitCHOP: `type=clamp`, `min=0.08`, `max=0.92`) → `posdata` (choptoTOP: `chop=onscreen`, `dataformat=r`) → `canvas_pixel` (textDAT) → `in0` (glslTOP: `pixeldat=canvas_pixel`, `format=rgba8fixed`, `outputresolution=custom`, `resolutionw=1280`, `resolutionh=720`) → `small` (resolutionTOP: `outputresolution=custom`, `resolutionw=320`, `resolutionh=180`) → `BoxCrop` (パレット: `Size=28`, `Margin=0.143`, `Square=True`, `Mono=True`, `Columns=16`) → `cells` (nullCHOP) → `DigitClassifier` (パレット) → `boxes` (mergeCHOP) → `BoxOverlay` (パレット: `Style=Corners`, `Linewidth=2`, `Labeltext={digit:.0f}  {conf:.2f}`, `Labelsize=20`) → `out1`

[DigitClassifierExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Classify/DigitClassifierExample.toe)

??? note "手順(Learning/Classify/DigitClassifier.example.py)"

    ```python
    """動く手書き数字を見つけて、答えを付ける

    画面の上を動く 8 つの手書き数字を BoxTrackCHOP で見つけ、BoxCrop で 28 × 28 に切り出し、DigitClassifier で
    数字を当てて、BoxOverlay のラベル(数字と確からしさ)にした例です。数字は数秒ごとに入れ替わります。
    ラベルの左が答え、右がネットワークの出力の大きさです。くっついた数字は 1 つの箱になり、読み違えます。

    数字の画像は MNIST データベース(Yann LeCun, Corinna Cortes, Christopher J. C. Burges)のテスト画像 100 枚で、
    torchvision の MNIST(https://docs.pytorch.org/vision/main/generated/torchvision.datasets.MNIST.html)で取得しました。
    MNIST は Hugging Face の ylecun/mnist(https://huggingface.co/datasets/ylecun/mnist)で MIT License として配布されています。
    使うときは出典として作者を記してください。
    この例を開くには BoxTrackCHOP プラグインが要ります。
    """
    import sys
    from pathlib import Path

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import PALETTES  # noqa: E402

    FRAMES = 90
    DIGITS = str(Path(__file__).with_name("DigitClassifier.example-digits.npz"))
    K = 8         # digits on screen
    SCALE = 4     # a digit is 28 * SCALE pixels wide

    STORE = """# Loads the bundled digits once; the operator is then locked, so the .toe keeps them.
    import numpy as np

    def onCook(scriptOp):
        scriptOp.clear()
        d = np.load(%r)
        if scriptOp.name == 'mnist_images':
            scriptOp.copyNumpyArray((d['images'] / 255.0).astype(np.float32))   # 100 channels x 784
        else:
            scriptOp.copyNumpyArray(d['labels'].astype(np.float32).reshape(1, -1))
    """ % DIGITS

    SHOWN = """# The digits on screen: new ones every few seconds. 'digits' (TOP): the images side by side.
    # 'truth' (CHOP): the digit each of them really is.
    import numpy as np
    K = %d

    def _shown():
        # 'cycle' counts up every few seconds; reading it here makes these operators cook again when it does
        return np.random.default_rng(int(op('cycle')[0])).choice(100, K, replace=False)

    def onCook(scriptOp):
        idx = _shown()
        if scriptOp.isCHOP:
            scriptOp.clear()
            scriptOp.copyNumpyArray(op('mnist_labels').numpyArray()[:, idx])
            return
        tiles = op('mnist_images').numpyArray()[idx].reshape(-1, 28, 28)[:, ::-1, :]   # a TOP starts at the bottom row
        strip = np.concatenate(list(tiles), axis=1).astype(np.float32)
        scriptOp.copyNumpyArray(np.repeat(strip[:, :, None], 4, axis=2))
    """ % K

    CANVAS = """// The digits on screen. Input 0: the images side by side. Input 1: one column per digit, rows = tx ty (0..1).
    uniform float uCount;
    uniform float uScale;
    out vec4 fragColor;
    void main() {
        vec2 res = uTDOutputInfo.res.zw;
        vec2 p = vUV.st * res;
        float v = 0.0;
        int n = int(uCount + 0.5);
        for (int i = 0; i < n; i++) {
            vec2 c = vec2(texelFetch(sTD2DInputs[1], ivec2(i, 0), 0).r, texelFetch(sTD2DInputs[1], ivec2(i, 1), 0).r) * res;
            vec2 local = (p - c) / (28.0 * uScale) + 0.5;
            if (local.x < 0.0 || local.x > 1.0 || local.y < 0.0 || local.y > 1.0) continue;
            v = max(v, texture(sTD2DInputs[0], vec2((float(i) + local.x) / uCount, local.y)).r);
        }
        fragColor = TDOutputSwizzle(vec4(vec3(v), 1.0));
    }
    """

    def build(ex, tox):
        store = ex.op("textDAT", name="store_callbacks", x=-1100, y=300)
        store.text = STORE
        for i, name in enumerate(("mnist_images", "mnist_labels")):
            s = ex.op("scriptCHOP", name=name, x=-1100, y=150 - 120 * i, callbacks=store)
            s.cook(force=True)
            s.lock = True
        store.destroy()
        ex.op("constantCHOP", name="cycle", x=-1100, y=-120, const0name="cycle",
              const0value={"expr": "int(absTime.seconds / 4)"})
        shown = ex.op("textDAT", name="shown_callbacks", x=-900, y=300)
        shown.text = SHOWN
        digits = ex.op("scriptTOP", name="digits", x=-900, y=150, callbacks=shown, outputresolution="custom",
                       resolutionw=28 * K, resolutionh=28)
        ex.op("scriptCHOP", name="truth", x=-900, y=30, callbacks=shown)
        # where the digits are: slow noise, one sample per digit, kept on screen
        pos = ex.op("noiseCHOP", name="pos", x=-900, y=-120, type="sparse", period=3, amp=0.75, offset=0.5,
                    channelname="tx ty", startunit="samples", endunit="samples", start=0, end=K - 1, rate=0.37,
                    tx={"expr": "absTime.seconds * 0.12"})
        onscreen = ex.op("limitCHOP", name="onscreen", input=pos, x=-740, y=-120, type="clamp", min=0.08, max=0.92)
        posdata = ex.op("choptoTOP", name="posdata", x=-580, y=-120, chop=onscreen, dataformat="r")
        pix = ex.op("textDAT", name="canvas_pixel", x=-580, y=30)
        pix.text = CANVAS
        canvas = ex.input("glslTOP", input=[digits, posdata], pixeldat=pix, format="rgba8fixed",
                          outputresolution="custom", resolutionw=1280, resolutionh=720)
        canvas.seq.vec.numBlocks = 2
        canvas.par.vec0name, canvas.par.vec0valuex = "uCount", K
        canvas.par.vec1name, canvas.par.vec1valuex = "uScale", SCALE
        small = ex.op("resolutionTOP", name="small", input=canvas, x=-220, y=-260, outputresolution="custom",
                      resolutionw=320, resolutionh=180)
        track = ex.root.create("BoxtrackCHOP", "track")
        track.nodeX, track.nodeY = 0, -260
        track.par.Top = small.path
        track.par.Threshold = 0.25
        track.par.Cellsize = 2
        track.par.Minarea = 0.002
        track.par.Maxboxes = 16
        track.par.Smooth = 0.3
        crop = ex.palette(PALETTES + "/Visualize/BoxCrop.tox", canvas, track, Size=28, Margin=0.143, Square=True,
                          Mono=True, Columns=16)
        crop.nodeX, crop.nodeY = 220, -260
        cells = ex.op("nullCHOP", name="cells", x=440, y=-260)
        cells.inputConnectors[0].connect(crop.outputConnectors[1])   # out2: one channel per box
        digits_out = ex.palette(tox, cells)
        boxes = ex.op("mergeCHOP", name="boxes", input=[track, digits_out], x=660, y=-200)
        overlay = ex.palette(PALETTES + "/Visualize/BoxOverlay.tox", canvas, boxes, Style="Corners", Linewidth=2,
                             Labeltext="{digit:.0f}  {conf:.2f}", Labelsize=20)
        overlay.nodeX, overlay.nodeY = 880, -200
        ex.out(overlay)
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |

使用例「動く手書き数字を見つけて、答えを付ける」の .toe は、ほかに [BoxTrackCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BoxTrackCHOP/) を使っています。使用例を開くときは、こちらも入れておいてください。

## 出典・参考

- Y. LeCun, C. Cortes, C. J. C. Burges. [The MNIST database of handwritten digits (ylecun/mnist)](https://huggingface.co/datasets/ylecun/mnist). — 重みの学習と使用例の数字の画像。MIT License
- TorchVision maintainers and contributors. [torchvision.datasets.MNIST](https://docs.pytorch.org/vision/main/generated/torchvision.datasets.MNIST.html). — 使ったデータの取得元
- Y. LeCun, L. Bottou, Y. Bengio, P. Haffner (1998). [Gradient-based learning applied to document recognition](https://doi.org/10.1109/5.726791). Proceedings of the IEEE 86(11), 2278-2324. — MNIST を紹介した論文

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

37 個のオペレータ。sha256: `9cd216af8e8a3c55…`
