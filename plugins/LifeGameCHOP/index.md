<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameCHOP/ -->

# Life Game (LifeGameCHOP)

## 概要

ライフゲームとその仲間(まわりの生きたマスの数で生死が決まるセルオートマトン)を CHOP の中で進めます。
出力の 1 チャンネルが盤面の 1 行、1 サンプルが 1 マスで、生きているマスが 1、死んでいるマスが 0 です。
進める速さ、ルール、最初の盤面、乱数の種をパラメータで決められ、入力から盤面を読み込んだり書き込んだりできます。
画像として使いたいときは [LifeGameTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameTOP/) が同じパラメータで動きます。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Lgame` |
| ラベル | Life Game |
| 種類 | CHOP |
| 入力数 | 0 – 3 |
| バージョン | 0.1 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=LifeGameCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 100x100, every frame | CHOP 2ch x 1000 | 0.054 ms<br>60→59.8 fps | 0.184 ms<br>60→59.3 fps |
| 256x256, every frame | CHOP 2ch x 1000 | 0.115 ms<br>60→59.6 fps | 0.662 ms<br>60→57.7 fps 🔻 |
| default | CHOP 2ch x 1000 | 0.001 ms<br>60→60.0 fps | 0.005 ms<br>60→60.0 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `LifeGameCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### ライフゲームの盤面

![ライフゲームの盤面](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/LifeGameCHOP-default.svg)

トーラス状につながった 32x24 の盤面です。出力の各チャンネルが盤面の 1 行(0 か 1 のセル)です。

ネットワーク: `plugin` (CPlusPlus CHOP: `Width=32`, `Height=24`, `Edgemode=Torus`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.017 ms** — 余裕の無い 60 fps のプロジェクトなら **59.9 fps**(-0.1)。

ファイル: `LifeGameCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """ライフゲームの盤面

    トーラス状につながった 32x24 の盤面です。出力の各チャンネルが盤面の 1 行(0 か 1 のセル)です。
    """

    def build(ex):
        ex.plugin(Width=32, Height=24, Edgemode="Torus")
    ```

#### ルールを変える(Day & Night)

![ルールを変える(Day & Night)](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/LifeGameCHOP-rule.svg)

Rule に B3678/S34678 を入れた 48x32 の盤面です。生きているマスと死んでいるマスを入れ替えても同じように動くルールで、
ライフゲーム(B3/S23)とは違う模様になります。Seed を変えると最初の並びが変わります。

ネットワーク: `plugin` (CPlusPlus CHOP: `Width=48`, `Height=32`, `Edgemode=Torus`, `Rule=B3678/S34678`, `Density=0.5`, `Seed=7`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.018 ms** — 余裕の無い 60 fps のプロジェクトなら **59.9 fps**(-0.1)。

ファイル: `LifeGameCHOPExample_rule.toe`

??? note "手順(examples/rule.py)"

    ```python
    """ルールを変える(Day & Night)

    Rule に B3678/S34678 を入れた 48x32 の盤面です。生きているマスと死んでいるマスを入れ替えても同じように動くルールで、
    ライフゲーム(B3/S23)とは違う模様になります。Seed を変えると最初の並びが変わります。
    """

    def build(ex):
        ex.plugin(Width=48, Height=32, Edgemode="Torus", Rule="B3678/S34678", Density=0.5, Seed=7)
    ```

**TouchDesigner テスト: 4 / 4 件合格**(test_board_size_follows_parameters, test_cells_are_zero_or_one, test_initial_state_comes_from_the_input_and_step_advances_it, test_rule_string_changes_the_automaton)

### パラメータ: Game

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Height` | Height (Channels) | Int | 10 | 1 … ∞ | 1 … 100 |
| `Width` | Width (Samples) | Int | 20 | 1 … ∞ | 1 … 100 |
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

入力なしでも動きます。

- **入力 1(省略可)**: 最初の盤面。**Initial State** を *Input 1* にすると、0.5 より大きいサンプルが生きたマスになり、
  盤面の大きさもこの CHOP(チャンネル数 × サンプル数)に合います。
- **入力 2(省略可)**: 毎フレーム書き込むマス。0.5 以上のサンプルはそのマスを生かし、−0.5 以下は消し、その間は何もしません。
  止めている間も書き込めるので、外から盤面を描くのに使えます。
- **入力 3(省略可)**: マスク。0.5 より大きいサンプルのマスだけが盤面として動きます。マスクは盤面の大きさに引き伸ばされるので、
  大きさを合わせる必要はありません。マスクの外の扱いは **Outside the Mask** で選びます。*Dead* はいつも死んだマス
  (壁と同じで、最初の盤面や入力 2 で書いても消えます)、*Keeps Its State* は今の状態のまま止まり、中のマスからは
  まわりのマスとして数えられます。
- **Height (Channels) / Width (Samples)**: 盤面の大きさ(Initial State が Input 1 のときは入力の大きさが優先)。
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

出力のサンプルレートはタイムラインのレートです(サンプルは時間ではなくマスの並びなので、速さとは関係ありません)。
絵にするには CHOP to TOP をつなぐか、LifeGameTOP を使います。

!!! note "以前の版からの変更"
    以前は Simulation Rate (Hz) が出力のサンプルレートになっていて、cook 1 回で必ず 1 世代進んでいました。
    今は同じパラメータ(`Simrate`)が 1 秒あたりの世代数です。以前と同じ「毎フレーム 1 世代」にするには、
    プロジェクトのフレームレートと同じ値(60 など)を入れます。最初の盤面は Seed で決まるようになりました。
