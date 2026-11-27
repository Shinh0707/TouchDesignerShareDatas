<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameTOP/ -->

# Life Game (LifeGameTOP)

## 概要

ライフゲームとその仲間(まわりの生きたマスの数で生死が決まるセルオートマトン)を画像として進めます。
1 ピクセルが 1 マスで、白が生きているマス、黒が死んでいるマスです。
進める速さ、ルール、最初の盤面、乱数の種をパラメータで決められ、画像から盤面を読み込んだり、画像で盤面に描いたりできます。
パラメータは [LifeGameCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameCHOP/) と同じ名前です。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Lgame` |
| ラベル | Life Game |
| 種類 | TOP |
| 入力数 | 0 – 3 |
| バージョン | 1.0 |
| 作者 | Shinh0707 |
| Execute mode | CPUMem |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=LifeGameTOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 256x256, every frame | TOP 1280x720 | 0.127 ms<br>60→59.5 fps | 0.653 ms<br>60→57.7 fps 🔻 |
| 512x512, every frame | TOP 1280x720 | 0.342 ms<br>60→58.8 fps | 2.15 ms<br>60→53.2 fps 🔻 |
| 512x512, no chance | TOP 1280x720 | 0.319 ms<br>60→58.9 fps | 1.97 ms<br>60→53.7 fps 🔻 |
| default 128x128 | TOP 1280x720 | 0.011 ms<br>60→60.0 fps | 0.076 ms<br>60→59.7 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `LifeGameTOP` の `examples/` にある手順(Python)から自動で作っています。

#### ライフゲームの画像

![ライフゲームの画像](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/LifeGameTOP-default.png)

128x128 の盤面を 1 ピクセル 1 マスで出します。白が生きているマス、黒が死んでいるマスです。
小さい画像なので、Fit TOP で拡大(補間は Nearest)して見ます。

ネットワーク: `plugin` (CPlusPlus TOP: `Edgemode=Torus`, `Seed=1`) → `fit1` (fitTOP: `outputresolution=custom`, `resolutionw=512`, `resolutionh=512`, `inputfiltertype=nearest`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.070 ms** — 余裕の無い 60 fps のプロジェクトなら **59.8 fps**(-0.2)。

ファイル: `LifeGameTOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """ライフゲームの画像

    128x128 の盤面を 1 ピクセル 1 マスで出します。白が生きているマス、黒が死んでいるマスです。
    小さい画像なので、Fit TOP で拡大(補間は Nearest)して見ます。
    """

    def build(ex):
        life = ex.plugin(Edgemode="Torus", Seed=1)
        ex.out(ex.op("fitTOP", input=life, outputresolution="custom", resolutionw=512, resolutionh=512,
                     inputfiltertype="nearest"))
    ```

#### 画像から始める

![画像から始める](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/LifeGameTOP-from_image.png)

Initial State を Input 1 にすると、入力 1 の画像の明るいところが生きたマスになり、盤面の大きさも画像に合います。
ここでは Text TOP の文字を最初の盤面にしています。Reset Grid を押すと、また文字からやり直します。

ネットワーク: `in0` (textTOP: `text=LIFE`, `outputresolution=custom`, `resolutionw=160`, `resolutionh=90`, `fontsizex=48`) → `plugin` (CPlusPlus TOP: `Initmode=Input`, `Edgemode=Torus`, `Rule=B36/S23`) → `fit1` (fitTOP: `outputresolution=custom`, `resolutionw=640`, `resolutionh=360`, `inputfiltertype=nearest`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.073 ms** — 余裕の無い 60 fps のプロジェクトなら **59.7 fps**(-0.3)。

ファイル: `LifeGameTOPExample_from_image.toe`

??? note "手順(examples/from_image.py)"

    ```python
    """画像から始める

    Initial State を Input 1 にすると、入力 1 の画像の明るいところが生きたマスになり、盤面の大きさも画像に合います。
    ここでは Text TOP の文字を最初の盤面にしています。Reset Grid を押すと、また文字からやり直します。
    """

    def build(ex):
        text = ex.input("textTOP", text="LIFE", outputresolution="custom", resolutionw=160, resolutionh=90,
                        fontsizex=48)
        life = ex.plugin(text, Initmode="Input", Edgemode="Torus", Rule="B36/S23")
        ex.out(ex.op("fitTOP", input=life, outputresolution="custom", resolutionw=640, resolutionh=360,
                     inputfiltertype="nearest"))
    ```

#### 3 つの入力を使う(最初の盤面・描き込み・マスク)

![3 つの入力を使う(最初の盤面・描き込み・マスク)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/LifeGameTOP-mask.png)

入力 1 のノイズが最初の盤面、入力 2 の小さい円が動きながらマスを描き込み、入力 3 の大きい円がマスクです。
マスクの明るいところだけが盤面として動き、外はいつも空です。マスクは盤面の大きさに引き伸ばされます。
入力 2 は不透明なところだけが書き込まれるので、円の外(透明)は盤面に触りません。

ネットワーク: `in0` (noiseTOP: `outputresolution=custom`, `resolutionw=128`, `resolutionh=128`, `mono=True`, `seed=3`) → `in1` (circleTOP: `outputresolution=custom`, `resolutionw=128`, `resolutionh=128`, `radiusx=0.06`, `radiusy=0.06`, `centerx={'expr': '0.3 * math.cos(absTime.seconds)'}`, `centery={'expr': '0.3 * math.sin(absTime.seconds)'}`) → `in2` (circleTOP: `outputresolution=custom`, `resolutionw=256`, `resolutionh=256`, `radiusx=0.45`, `radiusy=0.45`) → `plugin` (CPlusPlus TOP: `Initmode=Input`, `Simrate=20`) → `fit1` (fitTOP: `outputresolution=custom`, `resolutionw=512`, `resolutionh=512`, `inputfiltertype=nearest`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.348 ms** — 余裕の無い 60 fps のプロジェクトなら **58.8 fps**(-1.2)。

ファイル: `LifeGameTOPExample_mask.toe`

??? note "手順(examples/mask.py)"

    ```python
    """3 つの入力を使う(最初の盤面・描き込み・マスク)

    入力 1 のノイズが最初の盤面、入力 2 の小さい円が動きながらマスを描き込み、入力 3 の大きい円がマスクです。
    マスクの明るいところだけが盤面として動き、外はいつも空です。マスクは盤面の大きさに引き伸ばされます。
    入力 2 は不透明なところだけが書き込まれるので、円の外(透明)は盤面に触りません。
    """

    def build(ex):
        start = ex.input("noiseTOP", outputresolution="custom", resolutionw=128, resolutionh=128, mono=True, seed=3)
        brush = ex.input("circleTOP", outputresolution="custom", resolutionw=128, resolutionh=128,
                         radiusx=0.06, radiusy=0.06,
                         centerx={"expr": "0.3 * math.cos(absTime.seconds)"},
                         centery={"expr": "0.3 * math.sin(absTime.seconds)"})
        mask = ex.input("circleTOP", outputresolution="custom", resolutionw=256, resolutionh=256,
                        radiusx=0.45, radiusy=0.45)
        life = ex.plugin(start, brush, mask, Initmode="Input", Simrate=20)
        ex.out(ex.op("fitTOP", input=life, outputresolution="custom", resolutionw=512, resolutionh=512,
                     inputfiltertype="nearest"))
    ```

**TouchDesigner テスト: 5 / 5 件合格**(test_initial_state_and_size_come_from_the_input_image, test_same_seed_gives_the_same_board, test_size_follows_parameters_and_cells_are_black_or_white, test_a_changed_mask_is_read_again, test_nothing_lives_outside_the_mask)

### パラメータ: Game

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Width` | Width | Int | 128 | 1 … 4096 | 1 … 512 |
| `Height` | Height | Int | 128 | 1 … 4096 | 1 … 512 |
| `Simrate` | Speed (Generations / Second) | Float | 10 | 0 … ∞ | 0 … 60 |
| `Maxsteps` | Max Generations per Frame | Int | 8 | 1 … ∞ | 1 … 32 |
| `Play` | Play | Toggle | On |  |  |
| `Step` | Step One Generation | Pulse |  |  |  |
| `Edgemode` | Edge Handling | Menu | `Wall` | `Wall` Wall (Dead Edge) / `Torus` Torus (Wrap) / `Repeat` Repeat (Clamp) |  |
| `Initmode` | Initial State | Menu | `Random` | `Random` / `Empty` / `Input` Input 1 |  |
| `Density` | Initial Density | Float | 0.2 | 0 … 1 | 0 … 1 |
| `Seed` | Seed | Int | 0 | 0 … ∞ | 0 … 100 |
| `Maskmode` | Outside the Mask | Menu | `Dead` | `Dead` / `Freeze` Keeps Its State |  |
| `Reset` | Reset Grid | Pulse |  |  |  |

### パラメータ: Rules

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Rule` | Rule | String | `B3/S23` |  |  |
| `Neighborhood` | Neighborhood | Menu | `Moore` | `Moore` Moore (8 Cells) / `Vonneumann` Von Neumann (4 Cells) |  |
| `Spawnprob` | Spawn Prob (Log10) | Float | -5 | −∞ … ∞ | -6 … 0 |
| `Deathprob` | Death Prob (Log10) | Float | -5 | −∞ … ∞ | -6 … 0 |

### 出典・参考

- M. Gardner (1970). [Mathematical Games: The fantastic combinations of John Conway's new solitaire game "life"](https://doi.org/10.1038/scientificamerican1070-120). Scientific American 223(4), 120-123. — ライフゲームのルール(誕生 3、生存 2・3)

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

## 使い方

入力なしでも動きます。出力は Width × Height の 8 bit 画像です。小さいので、Fit TOP などで拡大して使います
(補間を Nearest にするとマスがぼけません)。

- **入力 1(省略可)**: 最初の盤面。**Initial State** を *Input 1* にすると、明るいピクセル(RGB の平均が半分以上)が
  生きたマスになり、盤面の大きさもこの画像に合います。
- **入力 2(省略可)**: 毎フレーム描き込む画像。不透明なピクセル(アルファが半分以上)だけが書き込まれ、明るければ生かし、
  暗ければ消します。透明なところは何もしません。止めている間も描けます。
- **入力 3(省略可)**: マスク。明るいピクセル(RGB の平均が半分以上)のマスだけが盤面として動きます。マスクは盤面の大きさに引き伸ばされるので、
  大きさを合わせる必要はありません。マスクの外の扱いは **Outside the Mask** で選びます。*Dead* はいつも死んだマス
  (壁と同じで、最初の盤面や入力 2 で書いても消えます)、*Keeps Its State* は今の状態のまま止まり、中のマスからは
  まわりのマスとして数えられます。
- **Width / Height**: 盤面の大きさ(Initial State が Input 1 のときは画像の大きさが優先)。
- **Speed (Generations / Second)**: 1 秒あたりに進める世代の数です。フレームレートより大きくすると 1 フレームに何世代も進みます
  (上限は **Max Generations per Frame**)。0 にすると止まります。
- **Play / Step One Generation**: Play をオフにすると止まります。止めたまま Step を押すと 1 世代だけ進みます。
- **Reset Grid**: 盤面を最初の状態に戻します。大きさを変えたときも作り直します。
- **Initial State**: 最初の盤面の作り方です。*Random* は **Initial Density** の割合のマスをランダムに生かします
  (**Seed** が同じなら毎回同じ並びです)。*Empty* は空の盤面、*Input 1* は入力 1 から読みます。
- **Edge Handling**: 盤面の端の扱い。*Wall* は外側を死んだマスとみなし、*Torus* は反対側の端につながり、*Repeat* は端のマスが外側にも続いているとみなします。
- **Rule**: ルールを `B3/S23` の形で書きます。B の後ろが「死んだマスが生まれる、まわりの生きたマスの数」、S の後ろが
  「生きたマスが生き残る数」です。`B36/S23`(HighLife)、`B2/S`(Seeds)、`B3678/S34678`(Day & Night)など。
  3 つ目に状態の数を書くと(`B2/S/C3` = Brian's Brain)、生き残れなかったマスがすぐには消えず、その数だけ段階を踏んで消えます。
  消えかけのマスは 0 と 1 の間の値で出ます。読めない文字列のときは警告を出して B3/S23 で動きます。
- **Neighborhood**: まわりのマスの数え方。*Moore* は斜めを含む 8 マス、*Von Neumann* は上下左右の 4 マスです。
- **Spawn Prob / Death Prob (Log10)**: 毎世代、死んでいるマスが勝手に生まれる確率と、生きているマスが勝手に死ぬ確率。
  **10 の何乗か**で指定します(−5 なら 0.001 %、−2 なら 1 %、0 なら 100 %)。止まってしまった盤面を動かし続けるのに使います。
  完全にルールどおりにしたいときは −30 などの小さい値にします。

Info CHOP をつなぐと、`generation`(今の世代)と `population`(生きているマスの数)が読めます。

CPU で計算する TOP です。512×512 で 1 世代 0.4 ms ほど(Mac、単体ベンチ)です。
