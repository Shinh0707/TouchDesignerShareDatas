<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/AutoVJ/AutoVJS/ -->

# AutoVJS

`Learning/AutoVJ` フォルダのパレットです。

## 説明

映像と音のスペクトルから、VJ のパラメータ Nump 個（0〜1）を出し、その場で学習し続けるネット。AutoVJ の改良版で、「変化の量」の代わりに「驚き（予測できなかった量）」で音と映像を比べ、出力ごとの重みに下限を付けて止まらないようにしたもの（設計メモ AutoVJ_theory.md の 14 節）。出力は決定的（ランダムには動かない）。離散にしたいパラメータは使用側で段に丸める。

目的

- 音の驚きの大きさと、映像の驚きの大きさを同期させる（相対的に扱い、符号は問わない）。
- それを、できるだけ少ない「予測できない映像の変化」で実現する（費用 Cost）。

仕組み

- 音: in2 のスペクトルの log10 → OnlineGHA（オンライン PCA ＋ 白色化、Embeddim 成分）。
- 映像: in1 を 16×16 に縮小 → 画素ごとに 1σ（OnlineStandardize）→ 畳み込みネット（3×3・ストライド 2 で 16→7→3、8 チャンネル、LeakyReLU → 3×3 全体の畳み込みで Embeddim 成分）→ L2 正規化。線形のデコーダで元の画素を再構成し、その誤差で畳み込みが学ぶ（自己符号化器、学習率 Imglr）。
- 驚き: 成分ごとに増分の AR(1) 予測 ε = Δx_t − ρΔx_{t−1} を作る。ρ は移動平均で推定し、速さは Rhorate、範囲は 0〜Rhomax。ε を 1σ にそろえた二乗の平均を驚き I_a・I_v とする（そろえる速さは Infoalpha）。
- 出力の驚き: 実際に出した過去の出力から ŷ_t = y_{t−1} + ρ(y_{t−1} − y_{t−2}) と予測し、u = y_t − ŷ_t を出力の驚きとする。過去は定数なので、勾配は今の出力にだけ流れる。
- 寄与モデル: I_v ≈ Σ g_i u_i² ＋ g0 を OnlineRLS で推定する（g_i = 出力 i の見た目の効き）。
- actor: 音の埋め込み → NNLinear → シグモイド → ベータ分布の最頻値（κ 固定）。重みの列ごとに ‖w_i‖×Inputgain ≥ Gainfloor へ射影する（下限）。
- 損失（D 部品で逆伝播）: Σ_i (log(Q_{≤i} + g0) − log I_a')² ＋ Cost · log(1 + Q/g0)。Q = Σ g_i u_i²、Q_{≤i} は出力 0〜i の寄与（Sanger 則）、I_a' は移動平均でそろえた相対値（Relative）。費用は情報の速さ（ビット）で、驚きの物差しとそろっている。

入力

- in1: 映像 TOP。出力 out1 で動かしている映像を、そのフレームのまま戻す。
- in2: 振幅スペクトルの CHOP（0 以上、サンプル数は自由、複数チャンネルは平均）。例: Audio Spectrum CHOP → Resample CHOP で 125 サンプル程度にしたもの。オーディオの波形そのものではない。

出力

- out1: Nump チャンネル（y0, y1, …）× 1 サンプル、0〜1。
- out2: ベータ分布の a, b（2 チャンネル × Nump サンプル）。使用側で段にするときに使える。
- out3: ネットの図（1280×720 の TOP）。左から スペクトル → 音の埋め込み → 出力 y、y のバイアス、RLS 重み（出力ごとの見た目の効き g_i）、情報量（音 / 映像の驚き）、画素、画像の埋め込み → 再構成。点の明るさと大きさは今の値、線は学習している重み（赤 = 正、青 = 負）: スペクトル→音の埋め込み は OnlineGHA の W、音の埋め込み→出力 y は actor の重み、画像の埋め込み→再構成 はデコーダの重み。各列の下に名前と値の数を出す。Nump や Embeddim を変えても自動で描き直す（中の NetGraph。描く層は graph_layers / graph_edges の表で変えられ、alpha 列で線の濃さを変えられる）。
- out4: 映像の畳み込みの 3D 表示（1280×720 の TOP）。左から 入力（3 × 16 × 16）→ 畳み込み 1（8 × 7 × 7）→ 畳み込み 2（8 × 3 × 3）→ 画像の埋め込み。特徴マップはチャンネルを横に重ねた立体で、線は畳み込みの重み（今の入力の値でも光る）。ゆっくり左右に振る。

パラメータ

- Nump: 出力するパラメータの数。
- Learn: オフで学習を止める（出力は今の重みのまま）。
- Lr / Lambda: actor の AdamW の学習率と重み減衰。
- Cost: 予測できない映像の変化への費用 β。大きいほど少ない変化で説明しようとし、0 で費用なし。
- Gainfloor: 出力ごとの重みの大きさの下限。出力の標準偏差はおよそ 下限 / 4 より小さくならず、静かな区間のあとでも止まらない。0 で下限なし。
- Rhorate / Rhomax: 予測の係数 ρ を推定する速さと上限。Rhomax 0 で、予測を使わず差分そのもので測る（元の AutoVJ に近い）。
- Infoalpha: 驚きを 1σ にそろえる移動平均の速さ。
- Imgfloorlog: 映像の驚きの分散の下限（log10）。上げると細かいちらつきを驚きと見なさない。
- Kappa: ベータ分布の鋭さ κ = a + b（固定。最頻値には効かない）。
- Delay: 出力を変えてから in1 の映像が変わるまでのフレーム数（そのまま戻すなら 0）。
- Smooth: actor に入れる音の特徴のならし（1 でならさない）。
- Inputgain: actor の入力の倍率。
- Embeddim: 音と映像の埋め込みの成分の数。
- Imglr: 映像の埋め込み（畳み込み）とデコーダの学習率。

… (more: inspect_output(path, start=40))… (more: inspect_output(path, start=40))- Sanger: 出力 i は出力 0〜i の寄与で学ぶ（オフで全部の和）。

- Relative / Levelalpha: log I をそれぞれの移動平均からのずれで比べる、その移動平均の速さ。
- Reset: オンの間、すべての学習を初めに戻す。

設定の目安（2026-10-31 の試験、AutoVJ_theory.md 14-3〜14-6）

- 既定（Gainfloor 0.4、Lr 0.002、Cost 1）: 曲の展開になめらかに追従し、静かなところでは小さく、ビートで大きく動く。4 曲続けても崩れなかった。
- 派手（Gainfloor 2、Lr 0.02、Cost 0）: 出力が 0 と 1 の端を飛び移る。17 出力・フィードバック付きの映像で見た目は好評だった。
- 17 出力、フィードバックのある映像（出力の効きが何フレームにも分かれて遅れる）でも止まらない。

注意

- 段・トグル・速度（積分）のパラメータのことは学習が知らない。トグルや段は境目で 1 秒に数回切り替わることがある。全画面の反転・白フラッシュに割り当てると、光の点滅として強すぎることがある（3〜30 Hz）。
- 音が鳴っている間、すべての出力が同じように激しく動きやすい（14-3 の観察）。
- 中の TOP to CHOP は Download Type = Immediate（遅れを決定的にするため）。GPU を待つので、TD の 1 フレームが数 ms 長くなる。

Nump や Embeddim を変えると、actor の重みと音の特徴のならしは形の合う初期値から自動でやり直す（Reset は要らない）。

## ダウンロード

[AutoVJS.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/AutoVJ/AutoVJS.tox) [使用例 AutoVJSExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/AutoVJ/AutoVJSExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 入力 1 | CHOP | `in2` | Spectrum / 振幅スペクトル（0 以上、サンプル数は自由） |
| 出力 0 | CHOP | `out1` | Control |
| 出力 1 | CHOP | `out2` | Matrix / ベータ分布の a と b |
| 出力 2 | TOP | `out3` | Image / ネットの図 |
| 出力 3 | TOP | `out4` | Image / 映像の畳み込みの 3D 表示 |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Nump` | Nump | AutoVJ | Int | `8` | 1.0 … 64.0 |
| `Kappa` | Kappa | AutoVJ | Float | `6` | 2.01 … 100.0 |
| `Reset` | Reset | AutoVJ | Toggle | `False` |  |
| `Relative` | Relative | AutoVJ | Toggle | `True` |  |
| `Levelalpha` | Levelalpha | AutoVJ | Float | `0.01` | 0.0 … 1.0 |
| `Embeddim` | Embeddim | AutoVJ | Int | `8` | 1.0 … 64.0 |
| `Learn` | Learn | AutoVJ | Toggle | `True` |  |
| `Lr` | Lr | AutoVJ | Float | `0.002` | 0.0 … 0.1 |
| `Lambda` | Lambda | AutoVJ | Float | `0.01` | 0.0 … 0.1 |
| `Delay` | Delay | AutoVJ | Int | `0` | 0.0 … 3.0 |
| `Smooth` | Smooth | AutoVJ | Float | `1` | 0.0 … 1.0 |
| `Inputgain` | Inputgain | AutoVJ | Float | `1` | 0.0 … 4.0 |
| `Gainfloor` | Gainfloor | AutoVJ | Float | `0.4` | 0.0 … 4.0 |
| `Cost` | Cost | AutoVJ | Float | `1` | 0.0 … 10.0 |
| `Sanger` | Sanger | AutoVJ | Toggle | `True` |  |
| `Rhorate` | Rhorate | AutoVJ | Float | `0.01` | 0.0 … 0.1 |
| `Rhomax` | Rhomax | AutoVJ | Float | `0.99` | 0.0 … 0.999 |
| `Infoalpha` | Infoalpha | AutoVJ | Float | `0.01` | 0.0 … 0.1 |
| `Imgfloorlog` | Imgfloorlog | AutoVJ | Float | `-4` | -12.0 … 0.0 |
| `Imglr` | Imglr | AutoVJ | Float | `0.005` | 0.0 … 0.05 |

## 使用例

### 映像と音でパラメータを動かす

![映像と音でパラメータを動かす](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-AutoVJ-AutoVJS-example.png)

付属のサンプル音声のスペクトルと、AutoVJS の出力(y0〜y3)で動かしたノイズ映像を入れて、300 フレーム学習させた例です。y0〜y3 でノイズの速さ・細かさ・明るさ・色を動かし、その映像を in1 に戻しています。画像はネットの図(out3)です。

ネットワーク: `audio` (audiofileinCHOP) → `in0` (audiospectrumCHOP) → `in1` (noiseTOP: `resolutionw=256`, `resolutionh=256`, `mono=False`, `tz={'expr': "absTime.seconds * (0.2 + op('params')['y0'] * 2)"}`, `period={'expr': "0.2 + op('params')['y1'] * 2"}`, `amp={'expr': "0.3 + op('params')['y2']"}`, `offset={'expr': "op('params')['y3'] - 0.5"}`) → `A` (パレット: `Nump=4`) → `params` (nullCHOP) → `netgraph` (selectTOP: `top=out3`) → `out1`

[AutoVJSExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/AutoVJ/AutoVJSExample.toe)

??? note "手順(Learning/AutoVJ/AutoVJS.example.py)"

    ```python
    """映像と音でパラメータを動かす

    付属のサンプル音声のスペクトルと、AutoVJS の出力(y0〜y3)で動かしたノイズ映像を入れて、300 フレーム学習させた例です。y0〜y3 でノイズの速さ・細かさ・明るさ・色を動かし、その映像を in1 に戻しています。画像はネットの図(out3)です。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import output  # noqa: E402

    FRAMES = 300

    def build(ex, tox):
        audio = ex.op("audiofileinCHOP", name="audio")
        spect = ex.input("audiospectrumCHOP", input=audio)
        video = ex.input("noiseTOP", resolutionw=256, resolutionh=256, mono=False,
                         tz={"expr": "absTime.seconds * (0.2 + op('params')['y0'] * 2)"},
                         period={"expr": "0.2 + op('params')['y1'] * 2"},
                         amp={"expr": "0.3 + op('params')['y2']"},
                         offset={"expr": "op('params')['y3'] - 0.5"})
        vj = ex.palette(tox, video, spect, Nump=4)
        ex.op("nullCHOP", name="params", input=vj)  # y0, y1, ... read by the video above
        ex.out(output(ex, vj, "out3", "netgraph"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

中で使っている Custom オペレータです。先にプラグインを入れておいてください([プラグインの導入](https://shinh0707.github.io/TouchDesignerShareDatas/install/))。

| オペレータ | プラグイン | ダウンロード |
|---|---|---|
| `CHOP:Col2im` | [Col2Im (Col2ImCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) |
| `CHOP:Dot` | [DotProduct (DotCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) |
| `CHOP:Im2col` | [Im2Col (Im2ColCHOP)](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | [プラグインのページからダウンロード](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) |

1657 個のオペレータ。sha256: `e15b732b0b3cc592…`
