<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/ -->

# Huffman (HuffmanCHOP)

## 概要

整数の列のハフマン符号化（圧縮）と復号です。よく出る数に短い符号、めったに出ない数に長い符号を割り当てて、
数の列をバイト列に縮めます。量子化した DCT の係数のように「0 や小さい数がほとんど」の列がよく縮みます。

- **Encode**: 入力の全チャンネルを整数に丸め（−32768〜32767）、1 チャンネル `bytes`（1 サンプル = 1 バイト、0〜255）で出します。
  サンプル数が圧縮後のバイト数です
- **Decode**: Encode の出力を入れると、元のチャンネル数・サンプル数の整数の列に戻します（チャンネル名は `chan1`, `chan2`, …）
- **Zero Runs**: 0 の連続を「0 が 2^j 個」という記号にまとめてから符号化します（既定でオン）。ハフマン符号だけでは
  1 サンプルに最低 1 ビットかかりますが、これで 0 の長い並びがほぼ消えます
- **Output = Code Table**: バイト列の代わりに符号の表を出します（学習・可視化用）。使われている記号ごとに 1 サンプルで、
  `value`（その数）、`run`（0 の連続の記号なら個数）、`count`（出た回数）、`length`（符号のビット数）、`code`（符号）

バイト列は自己完結です。先頭に 20 バイト + 記号の数だけのヘッダ（大きさと各記号の符号の長さ）があり、そのあとに符号のビット列が続くので、
Decode には Encode の出力をそのままつなぐだけで済みます。

Info CHOP で次の値が読めます: `bytes`（全体のバイト数）、`header_bytes`、`payload_bits`（符号のビット数）、`samples`、`symbols`
（符号化した記号の数）、`bits_per_sample`、`ideal_bits_per_sample`（エントロピー。どんな符号でもこれより短くはできない下限）、
`invalid_codes`（Decode で、どの符号にも当たらなかったビット列の数）。

!!! note "壊して使う（グリッチ）"
    Decode はどんなバイト列でも止まらずに復号します。符号のビット列（`header_bytes` より後ろ）を 1 ビットでも変えると、
    そこから先は符号の区切りがずれて別の数の並びになります。ヘッダを壊すと符号の表ごと変わり、全体が崩れます。
    ヘッダの先頭 3 バイトが違う・大きさが異常なときだけ、エラーにして何も出しません。
    画像に使うときは、TOP to CHOP → Encode →（壊す）→ Decode → CHOP to TOP とつなぎます。

!!! note "速度"
    符号の表は毎回その入力から作り直します。処理時間は下の表のとおりで、サンプル数にほぼ比例します。画像をそのまま通すなら、
    解像度を下げるか、毎フレームではなく必要なときだけ cook させてください。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Huffman` |
| ラベル | Huffman |
| 種類 | CHOP |
| 入力数 | 1 – 1 |
| バージョン | 1.0 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=HuffmanCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 3x1000 | CHOP 3ch x 1000 | 0.012 ms<br>60→60.0 fps | 0.054 ms<br>60→59.8 fps |
| 3x100000 | CHOP 3ch x 100000 | 1.03 ms<br>60→56.5 fps 🔻 | 5.14 ms<br>60→45.9 fps 🔻 |
| 3x100000 no zero runs | CHOP 3ch x 100000 | 1.61 ms<br>60→54.7 fps 🔻 | 5.40 ms<br>60→45.3 fps 🔻 |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `HuffmanCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### 数の列をバイト列に縮める

![数の列をバイト列に縮める](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/HuffmanCHOP-default.svg)

−8〜8 くらいの整数になるノイズ 2000 サンプル（0 の近くが多い）をハフマン符号化した例です。よく出る数ほど短い符号になるので、
1 サンプルあたり 4 ビット弱（2000 サンプルが 1000 バイトほど）になります。出力の `bytes` チャンネルは 1 サンプルが 1 バイト（0〜255）で、
先頭にヘッダ（大きさと符号の表）、そのあとに符号のビット列が入っています。Info CHOP でバイト数や 1 サンプルあたりのビット数が読めます。

ネットワーク: `in0` (noiseCHOP: `type=sparse`, `amp=8`, `period=0.05`, `startunit=samples`, `start=0`, `endunit=samples`, `end=1999`, `channelname=value`) → `plugin` (CPlusPlus CHOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.025 ms** — 余裕の無い 60 fps のプロジェクトなら **59.9 fps**(-0.1)。

ファイル: `HuffmanCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """数の列をバイト列に縮める

    −8〜8 くらいの整数になるノイズ 2000 サンプル（0 の近くが多い）をハフマン符号化した例です。よく出る数ほど短い符号になるので、
    1 サンプルあたり 4 ビット弱（2000 サンプルが 1000 バイトほど）になります。出力の `bytes` チャンネルは 1 サンプルが 1 バイト（0〜255）で、
    先頭にヘッダ（大きさと符号の表）、そのあとに符号のビット列が入っています。Info CHOP でバイト数や 1 サンプルあたりのビット数が読めます。
    """

    def build(ex):
        data = ex.input("noiseCHOP", type="sparse", amp=8, period=0.05, startunit="samples", start=0,
                        endunit="samples", end=1999, channelname="value")
        ex.plugin(data)
    ```

#### ビット列を 1 か所壊して復号する（グリッチ）

![ビット列を 1 か所壊して復号する（グリッチ）](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/HuffmanCHOP-glitch.svg)

なめらかなノイズ（整数に丸められる）を符号化し、バイト列のまん中あたりの 1 バイトだけ書き換えてから復号した例です。
壊した所より前は元のままですが、そこから先は符号の区切りがずれるので、まったく別の数の並びになります
（JPEG などが壊れたときに、途中から絵が崩れるのと同じ仕組みです）。ヘッダ（先頭の header_bytes バイト）を壊すと全体が変わります。

ネットワーク: `in0` (noiseCHOP: `type=sparse`, `amp=20`, `period=3`, `startunit=samples`, `start=0`, `endunit=samples`, `end=599`, `channelname=value`) → `plugin` (CPlusPlus CHOP: `Zeroruns=False`) → `express1` (expressionCHOP) → `decode` (cplusplusCHOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.018 ms** — 余裕の無い 60 fps のプロジェクトなら **59.9 fps**(-0.1)。

ファイル: `HuffmanCHOPExample_glitch.toe`

??? note "手順(examples/glitch.py)"

    ```python
    """ビット列を 1 か所壊して復号する（グリッチ）

    なめらかなノイズ（整数に丸められる）を符号化し、バイト列のまん中あたりの 1 バイトだけ書き換えてから復号した例です。
    壊した所より前は元のままですが、そこから先は符号の区切りがずれるので、まったく別の数の並びになります
    （JPEG などが壊れたときに、途中から絵が崩れるのと同じ仕組みです）。ヘッダ（先頭の header_bytes バイト）を壊すと全体が変わります。
    """

    def build(ex):
        wave = ex.input("noiseCHOP", type="sparse", amp=20, period=3, startunit="samples", start=0,
                        endunit="samples", end=599, channelname="value")
        stream = ex.plugin(wave, Zeroruns=False)
        broken = ex.op("expressionCHOP", input=stream)
        broken.par.expr0expr.expr = "(me.inputVal + 64) % 256 if me.sampleIndex == 180 else me.inputVal"
        back = ex.op("cplusplusCHOP", name="decode", input=broken)
        back.par.plugin.expr = stream.par.plugin.expr
        back.cook(force=True)  # its parameters exist once the plugin is loaded
        back.par.Mode = "Decode"
        ex.out(back)
    ```

#### 符号の表を見る（よく出る数ほど短い）

![符号の表を見る（よく出る数ほど短い）](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/HuffmanCHOP-table.svg)

同じノイズの符号の表です（Output = Code Table）。1 サンプルが 1 つの記号で、`value` がその数、`count` が出た回数、
`length` が符号のビット数です。回数の多い 0 付近の数は 2〜3 ビット、めったに出ない数は 10 ビット前後になっています。
ここでは `count`（個数を 1/100 にしたもの）と `length` を並べています。

ネットワーク: `in0` (noiseCHOP: `type=sparse`, `amp=8`, `period=0.05`, `startunit=samples`, `start=0`, `endunit=samples`, `end=1999`, `channelname=value`) → `plugin` (CPlusPlus CHOP: `Output=Table`, `Zeroruns=False`) → `select1` (selectCHOP: `channames=count`) → `math1` (mathCHOP: `gain=0.01`) → `select2` (selectCHOP: `channames=length`) → `merge1` (mergeCHOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.028 ms** — 余裕の無い 60 fps のプロジェクトなら **59.9 fps**(-0.1)。

ファイル: `HuffmanCHOPExample_table.toe`

??? note "手順(examples/table.py)"

    ```python
    """符号の表を見る（よく出る数ほど短い）

    同じノイズの符号の表です（Output = Code Table）。1 サンプルが 1 つの記号で、`value` がその数、`count` が出た回数、
    `length` が符号のビット数です。回数の多い 0 付近の数は 2〜3 ビット、めったに出ない数は 10 ビット前後になっています。
    ここでは `count`（個数を 1/100 にしたもの）と `length` を並べています。
    """

    def build(ex):
        data = ex.input("noiseCHOP", type="sparse", amp=8, period=0.05, startunit="samples", start=0,
                        endunit="samples", end=1999, channelname="value")
        table = ex.plugin(data, Output="Table", Zeroruns=False)
        count = ex.op("selectCHOP", input=table, channames="count")
        scaled = ex.op("mathCHOP", input=count, gain=0.01)
        length = ex.op("selectCHOP", input=table, channames="length")
        ex.out(ex.op("mergeCHOP", input=[scaled, length]))
    ```

**TouchDesigner テスト: 3 / 3 件合格**(test_damaged_bytes_still_decode, test_not_a_stream_is_an_error, test_roundtrip_and_info)

### パラメータ: Huffman

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Mode` | Mode | Menu | `Encode` | `Encode` Encode (Numbers to Bytes) / `Decode` Decode (Bytes to Numbers) |  |
| `Zeroruns` | Zero Runs | Toggle | On |  |  |
| `Output` | Output | Menu | `Stream` | `Stream` Byte Stream / `Table` Code Table |  |

### 出典・参考

- D. A. Huffman (1952). [A Method for the Construction of Minimum-Redundancy Codes](https://doi.org/10.1109/JRPROC.1952.273898). Proceedings of the IRE 40(9), 1098-1101. — ハフマン符号のもとの論文
- C. E. Shannon (1948). [A Mathematical Theory of Communication](https://doi.org/10.1002/j.1538-7305.1948.tb01338.x). Bell System Technical Journal 27(3), 379-423. — エントロピー（Info CHOP の ideal_bits_per_sample。どんな符号でもこれより短くはできない）
- P. Deutsch (1996). [DEFLATE Compressed Data Format Specification version 1.3 (RFC 1951)](https://www.rfc-editor.org/rfc/rfc1951). IETF. — 符号の長さだけを送って符号を決め直す方法（canonical Huffman code）
- G. K. Wallace (1992). [The JPEG still picture compression standard](https://doi.org/10.1109/30.125072). IEEE Transactions on Consumer Electronics 38(1), xviii-xxxiv. — DCT → 量子化 → ジグザグ → 0 の連続 + ハフマン符号、という流れ

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

## 使い方

TODO: 入力・典型的な設定・注意点。
