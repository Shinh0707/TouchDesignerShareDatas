<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/AutoVJ/AutoVJ/ -->

# AutoVJ

`Learning/AutoVJ` フォルダのパレットです。

## 説明

映像と音から、VJ のパラメータ Nump 個（0〜1）を出し、その場で学習し続けるネット。目的は「映像の情報の差分」と「音の情報の差分」の大きさの同期（相対的に扱い、符号は問わない）を、できるだけ少ない映像の変化で実現すること。出力はベータ分布の最頻値で、決定的（ランダムには動かない）。離散にしたいパラメータは使用側で段に丸める。AutoVJLite / AutoVJFull の考え方を作り直した版（設計メモ AutoVJ_theory.md の 12〜13 節）。

仕組み（学習に使うのは埋め込みだけ。128 帯域・768 画素は埋め込みを作るための入力と、再構成の正解にだけ使う）

- 音: 対数間隔 128 帯域の対数スペクトル → OnlineGHA（オンライン PCA ＋ 白色化、Embeddim 成分）。この埋め込みを actor の入力にし、その差分から音の情報の差分 I_a を出す（InfoDiff）。
- 映像（畳み込みの自己符号化器 ＋ 予測）:
  - in1 を 16×16 に縮小 → 画素ごとに 1σ（OnlineStandardize）→ NNConv2d（3×3、ストライド 2、8 ch）→ LeakyReLU → NNConv2d（同）→ LeakyReLU → NNAdaptConv2d（Embeddim ch）→ L2 正規化 = 映像の埋め込み z_t
  - 再構成: z_t → NNLinear（デコーダ）→ 768 画素。この誤差だけで畳み込みを学習する（PCA 的な埋め込み）
  - 予測: 1 フレーム前の埋め込み z_{t−1} → NNLinear → ẑ_t。z_t へは勾配を流さない（埋め込みが予測しやすさのためにつぶれないように）
  - 映像の情報の差分 I_v = 結果と予測の乖離 e = ẑ_t − z_t を成分ごとに 1σ でそろえた 2 乗の平均（予測できなかった変化の驚き）
  - actor は映像を入力に取らない。映像は I_v と寄与モデルを通してだけ学習に効く
- 寄与モデル: I_v ≈ Σ g_i Δy_i² ＋ g0 を OnlineRLS で推定（g_i = 出力 i の見た目の効き）。
- actor: [今の音の埋め込み ; 1 フレーム前の音の埋め込み]（2 行）→ NNLinear → シグモイド → κ 固定のベータ分布の a, b → 最頻値。2 行を同じ重みで通し、Δy = y_t − y_{t−1} に両方の時刻の勾配を流す。
- 損失（D 部品で逆伝播）: Σ_i (log(Q_{≤i} + g0) − log I_a')² ＋ Cost · Q / (Q̄ + g0)。Q_{≤i} は出力 0〜i の寄与（Sanger 則）、I_a' は移動平均でそろえた相対値（Relative）。

可視化

- graph（out3 / out4、2D）: 左から
  - 音の 128 帯域（入力、細い帯）→ PCA の重み（細く暗い線）→ 音の埋め込み（橙）。埋め込みから下の log I_a（黄）へ細い線
  - actor の重み → 出力 y（白）。出力のすぐ右の赤い点は寄与 g_i（出力から映像へは TD の外を通るので線はない）
  - 映像の入力画像（細い帯）→ Conv の箱（中身は 3D 表示 out6）→ 映像の埋め込み z（水色）→ デコーダの重み → 再構成した画像（細い帯）。z から下の log I_v（緑）への線は成分ごとの予測との乖離
  - 線は、線が出ているノードの今の出力値で光る（太さ・不透明度 = |w| × 出力値）。色は重みの符号（赤 正・青 負）
- conv3d（out5 / out6、3D）: 映像の畳み込みの経路を立体で。入力の画像（16×16×3）→ 1 層目（7×7×8）→ 2 層目（3×3×8）→ 埋め込み z。各層は格子をチャンネルの数だけ重ねた点の塊、線は畳み込みのつながり（色・太さ = カーネルの重み × 入力の値）。ゆっくり首を振る
- 部品は LayerNodes / LayerEdges（2D）と ConvVolume / ConvEdges（3D）

入力

- in1: 映像 TOP（出力 out1 で動かしている映像を、そのフレームのまま戻す）
- in2: オーディオ CHOP

出力

- out1: Nump チャンネル（y0, y1, …）× 1 サンプル、0〜1
- out2: ベータ分布の a, b（2 チャンネル × Nump サンプル）
- out3: 学習モデル全体のノードと重みの POP（2D）
- out4: out3 を描いた確認用の画像 TOP（1280 × 720）
- out5: 映像の畳み込みの経路の POP（3D）
- out6: out5 を描いた画像 TOP（1280 × 720、遠近法）
- out3〜out6 は、つないだときだけ cook される

パラメータ

- Nump: 出力するパラメータの数
- Learn: オフで actor の学習を止める
- Lr / Lambda: actor の AdamW の学習率と重み減衰
- Imglr: 映像側（畳み込み・デコーダ・予測）の学習率（AdamW、重み減衰なし）
- Cost: 映像の変化の量への費用 β
- Kappa: ベータ分布の鋭さ κ = a + b（固定。最頻値には効かない）
- Delay: 出力を変えてから in1 の映像が変わるまでのフレーム数
- Smooth: actor に入れる音の特徴のならし（1 でならさない）
- Inputgain: actor の入力の倍率
- Embeddim: 音と映像の埋め込みの成分の数
- Sanger: 出力 i は出力 0〜i の寄与で学ぶ（オフで全部の和）
- Relative / Levelalpha: log I をそれぞれの移動平均からのずれで比べる、その移動平均の速さ
- Reset: オンの間、すべての学習を初めに戻す（パレットから置いたら一度入れる。Embeddim を変えたときも。NNLinear は Reset 時の入力の大きさで重みを作る）

注意

- 中の TOP to CHOP は Download Type = Immediate（遅れを決定的にするため）。GPU を待つので TD の 1 フレームが数 ms 長くなる。
- 映像の自己符号化器はサンプル 1 つずつの逆伝播なので、再構成の収束は遅い（試験の映像で 3 分後も画素の分散の約 0.9）。I_v は予測との乖離なので、埋め込みが粗くても使える。
- 中の部品は埋め込みのコピー（パレットの共有版を参照していない）。
- 全体の cook は約 5〜6 ms（うち映像の畳み込みの自己符号化器が約 2.5 ms）。3D 表示の線の位置はパラメータの変更時（と読み込み時）に一度だけ計算する（約 0.5 秒）。

## ダウンロード

[AutoVJ.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/AutoVJ/AutoVJ.tox) [使用例 AutoVJExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/AutoVJ/AutoVJExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 入力 1 | CHOP | `in2` | Audio |
| 出力 0 | CHOP | `out1` | Control |
| 出力 1 | CHOP | `out2` | Matrix / ベータ分布の a と b |
| 出力 2 | POP | `out3` | Geometry / 学習モデル全体のノードと重み（2D） |
| 出力 3 | TOP | `out4` | Image / out3 の確認用の画像 |
| 出力 4 | POP | `out5` | Geometry / 映像の畳み込みの経路（3D） |
| 出力 5 | TOP | `out6` | Image / out5 の画像 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Nump` | Nump | AutoVJ | Int | `5` | 1.0 … 64.0 |
| `Kappa` | Kappa | AutoVJ | Float | `6` | 2.01 … 100.0 |
| `Reset` | Reset | AutoVJ | Toggle | `False` |  |
| `Sanger` | Sanger | AutoVJ | Toggle | `True` |  |
| `Relative` | Relative | AutoVJ | Toggle | `True` |  |
| `Levelalpha` | Levelalpha | AutoVJ | Float | `0.01` | 0.0 … 1.0 |
| `Embeddim` | Embeddim | AutoVJ | Int | `8` | 1.0 … 64.0 |
| `Cost` | Cost | AutoVJ | Float | `1` | 0.0 … 10.0 |
| `Learn` | Learn | AutoVJ | Toggle | `True` |  |
| `Lr` | Lr | AutoVJ | Float | `0.002` | 0.0 … 0.1 |
| `Lambda` | Lambda | AutoVJ | Float | `0.01` | 0.0 … 0.1 |
| `Delay` | Delay | AutoVJ | Int | `0` | 0.0 … 3.0 |
| `Smooth` | Smooth | AutoVJ | Float | `1` | 0.0 … 1.0 |
| `Inputgain` | Inputgain | AutoVJ | Float | `1` | 0.0 … 4.0 |
| `Imglr` | Image Lr | AutoVJ | Float | `0.001` | 0.0 … 0.05 |

## 使用例

### 映像と音でパラメータを動かす

![映像と音でパラメータを動かす](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-AutoVJ-AutoVJ-example.png)

付属のサンプル音声と、AutoVJ の出力(y0〜y3)で動かしたノイズ映像を入れて、300 フレーム学習させた例です。y0〜y3 でノイズの速さ・細かさ・明るさ・色を動かし、その映像を in1 に戻しています。画像は学習モデル全体の図(out4)です。

ネットワーク: `audio` (audiofileinCHOP) → `in0` (nullCHOP) → `in1` (noiseTOP: `resolutionw=256`, `resolutionh=256`, `mono=False`, `tz={'expr': "absTime.seconds * (0.2 + op('params')['y0'] * 2)"}`, `period={'expr': "0.2 + op('params')['y1'] * 2"}`, `amp={'expr': "0.3 + op('params')['y2']"}`, `offset={'expr': "op('params')['y3'] - 0.5"}`) → `AutoVJ` (パレット: `Nump=4`) → `params` (nullCHOP) → `netgraph` (selectTOP: `top=out4`) → `out1`

[AutoVJExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/AutoVJ/AutoVJExample.toe)

??? note "手順(Learning/AutoVJ/AutoVJ.example.py)"

    ```python
    """映像と音でパラメータを動かす

    付属のサンプル音声と、AutoVJ の出力(y0〜y3)で動かしたノイズ映像を入れて、300 フレーム学習させた例です。y0〜y3 でノイズの速さ・細かさ・明るさ・色を動かし、その映像を in1 に戻しています。画像は学習モデル全体の図(out4)です。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import output  # noqa: E402

    FRAMES = 300

    def build(ex, tox):
        audio = ex.op("audiofileinCHOP", name="audio")
        sound = ex.input("nullCHOP", input=audio)
        video = ex.input("noiseTOP", resolutionw=256, resolutionh=256, mono=False,
                         tz={"expr": "absTime.seconds * (0.2 + op('params')['y0'] * 2)"},
                         period={"expr": "0.2 + op('params')['y1'] * 2"},
                         amp={"expr": "0.3 + op('params')['y2']"},
                         offset={"expr": "op('params')['y3'] - 0.5"})
        vj = ex.palette(tox, video, sound, Nump=4)
        ex.op("nullCHOP", name="params", input=vj)  # y0, y1, ... read by the video above
        ex.out(output(ex, vj, "out4", "netgraph"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Col2im` | [Col2Im (Col2ImCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) |
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |
| `CHOP:Im2col` | [Im2Col (Im2ColCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) |

2122 個のオペレータ。sha256: `2dec4f2005d1c995…`
