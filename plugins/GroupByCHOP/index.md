<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/GroupByCHOP/ -->

# Group By (GroupByCHOP)

## 概要

サンプルを「キー」(グループの番号)ごとにまとめて、合計・平均・最小・最大・個数などを出します。
出力は 1 サンプルが 1 グループで、キー k のグループが k 番目のサンプルになります。

表計算の「グループごとの集計」、配列の「同じ添字へ足し込む」(scatter-add)にあたる処理です。
Lookup CHOP の逆向き(添字ごとに値を集める)として、Lookup を使った計算の勾配を作るのにも使えます。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Groupby` |
| ラベル | Group By |
| 種類 | CHOP |
| 入力数 | 1 – 2 |
| バージョン | 1.0 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=GroupByCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 1M samples, mean | CHOP 4ch x 1000000 + CHOP 1ch x 1000000 | 9.37 ms<br>60→38.4 fps 🔻 | 19.20 ms<br>60→27.9 fps 🔻 |
| default | CHOP 4ch x 1000 + CHOP 1ch x 1000 | 0.011 ms<br>60→60.0 fps | 0.020 ms<br>60→59.9 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `GroupByCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### 区間ごとの平均

![区間ごとの平均](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/GroupByCHOP-default.svg)

400 サンプルのノイズを、キー(0〜7 の番号)ごとにまとめて平均した例です。入力 2 に「各サンプルがどの
グループか」を渡すと、出力は 1 サンプルが 1 グループ(ここでは 8 サンプル)になります。
ここのキーは 50 サンプルごとに 1 ずつ増えるので、区間ごとの平均になっています。

ネットワーク: `in0` (noiseCHOP: `type=sparse`, `amp=1`, `period=0.3`, `startunit=samples`, `start=0`, `endunit=samples`, `end=399`, `channelname=value`) → `in1` (patternCHOP: `wavetype=ramp`, `length=400`, `fromrange=[0, 1]`, `torange=[-0.49, 7.49]`, `channelname=key`) → `plugin` (CPlusPlus CHOP: `Function=Mean`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.014 ms** — 余裕の無い 60 fps のプロジェクトなら **60.0 fps**(-0.1)。

ファイル: `GroupByCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """区間ごとの平均

    400 サンプルのノイズを、キー(0〜7 の番号)ごとにまとめて平均した例です。入力 2 に「各サンプルがどの
    グループか」を渡すと、出力は 1 サンプルが 1 グループ(ここでは 8 サンプル)になります。
    ここのキーは 50 サンプルごとに 1 ずつ増えるので、区間ごとの平均になっています。
    """

    def build(ex):
        data = ex.input("noiseCHOP", type="sparse", amp=1, period=0.3, startunit="samples", start=0,
                        endunit="samples", end=399, channelname="value")
        # 0, 0, ... 1, 1, ... 7: a ramp from -0.5 to 7.5 is rounded to the nearest whole number
        keys = ex.input("patternCHOP", wavetype="ramp", length=400, fromrange=(0, 1), torange=(-0.49, 7.49),
                        channelname="key")
        ex.plugin(data, keys, Function="Mean")
    ```

**TouchDesigner テスト: 2 / 2 件合格**(test_key_channel_and_functions, test_missing_key_is_an_error)

### パラメータ: Group By

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Keychannel` | Key Channel | String | `key` |  |  |
| `Function` | Function | Menu | `Sum` | `Sum` / `Mean` / `Min` Minimum / `Max` Maximum / `Count` / `First` / `Last` |  |
| `Groups` | Groups (0 = from keys) | Int | 0 | 0 … 4194304 | 0 … 256 |
| `Emptyvalue` | Empty Group Value | Float | 0 | −∞ … ∞ | -1 … 1 |
| `Countchannel` | Add Count Channel | Toggle | Off |  |  |

## 使い方

### 入力

- 入力 1: まとめる値。チャンネルはいくつあってもよく、それぞれ別々にまとめます。
- 入力 2(省略可): キー。1 チャンネル目を使います。つながないときは、入力 1 の中の `Key Channel` という名前のチャンネルをキーにします(そのチャンネルは出力から外れます)。

キーは一番近い整数に丸めます。0 より小さいもの、グループ数以上のもの、数でないものは、どのグループにも入りません。

### パラメータ

- `Function`: Sum(合計)、Mean(平均)、Minimum、Maximum、Count(個数)、First(最初の値)、Last(最後の値)。
- `Groups`: グループ数(= 出力のサンプル数)。0 のときは、キーの最大値 + 1 になります。出力の長さを固定したいときは数を入れます。
- `Empty Group Value`: サンプルが 1 つもないグループの値(Count では 0)。
- `Add Count Channel`: 各グループのサンプル数を `count` チャンネルとして足します。

### 注意

- 合計と平均は倍精度で足してから float に戻すので、サンプルが多くても誤差がたまりません。
- 出力の CHOP は 0 サンプルにできないので、有効なキーが 1 つもないときは空のグループが 1 つ出ます。
