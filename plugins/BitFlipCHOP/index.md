<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BitFlipCHOP/ -->

# Bit Flip (BitFlipCHOP)

## 概要

バイト列(1 サンプル = 1 バイト、0〜255)のランダムな場所を壊します。圧縮したデータをわざと壊してから復号する
グリッチのための部品で、[Huffman CHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/) の Encode と Decode の間に入れて使います。

- **Method**: Flip One Bit(1 ビット反転)/ Random Byte(ランダムなバイトに置き換え)/ Zero Byte(0 にする)
- **Count**: 壊す数。0 なら何も壊さず、入力をバイト(整数に丸めて 0〜255)にするだけです
- **Seed**: 壊す場所を決める乱数の種。同じ Seed なら毎回同じ場所で、Count を増やしても今までの場所は変わりません
- **Start**: 先頭から何バイトを守るか。Huffman CHOP の Info CHOP の `header_bytes` を入れると、ヘッダを守って符号のビット列だけを壊せます
- **Length**: 壊す範囲の長さ(Start から。0 で最後まで)。範囲を前のほうに寄せるほど、復号したデータの広い範囲が崩れます

出力は入力と同じチャンネル名・同じ長さです。チャンネルが複数あるときは、チャンネルごとに別の場所を壊します。

!!! note "ハフマン符号を壊したときの見え方"
    符号のビット列は、1 ビット変わるとそこから先の区切りがずれます。そのため「壊した場所から後ろが全部崩れる」のが基本で、
    場所(Start / Length / Seed)が崩れ始める位置を、数(Count)が崩れ方の激しさを決めます。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Bitflip` |
| ラベル | Bit Flip |
| 種類 | CHOP |
| 入力数 | 1 – 1 |
| バージョン | 1.0 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=BitFlipCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| 1x10000, 8 flips | CHOP 1ch x 10000 | 0.004 ms<br>60→60.0 fps | 0.072 ms<br>60→59.7 fps |
| 1x1000000, 1000 flips | CHOP 1ch x 1000000 | 0.985 ms<br>60→56.7 fps 🔻 | 5.56 ms<br>60→45.0 fps 🔻 |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `BitFlipCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### バイト列の 8 か所を壊す

![バイト列の 8 か所を壊す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/BitFlipCHOP-default.svg)

0〜255 を行き来するバイト列(600 サンプル)のうち、先頭 100 バイトを守って(Start = 100)、残りのランダムな 8 か所を
ランダムなバイトに置き換えた例です(Method = Random Byte)。Seed を変えると壊れる場所が変わり、Count で数を決めます。
Huffman CHOP の Encode と Decode の間に入れると、壊れた圧縮データを復号したときの崩れ(グリッチ)になります。
そのときは Start に Info CHOP の header_bytes を入れると、ヘッダを守って中身だけを壊せます。

ネットワーク: `in0` (patternCHOP: `wavetype=tri`, `length=600`, `numcycles=3`, `amp=127`, `offset=127.5`, `channelname=bytes`) → `plugin` (CPlusPlus CHOP: `Method=Random`, `Count=8`, `Start=100`, `Seed=3`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.010 ms** — 余裕の無い 60 fps のプロジェクトなら **60.0 fps**(-0.0)。

ファイル: `BitFlipCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """バイト列の 8 か所を壊す

    0〜255 を行き来するバイト列(600 サンプル)のうち、先頭 100 バイトを守って(Start = 100)、残りのランダムな 8 か所を
    ランダムなバイトに置き換えた例です(Method = Random Byte)。Seed を変えると壊れる場所が変わり、Count で数を決めます。
    Huffman CHOP の Encode と Decode の間に入れると、壊れた圧縮データを復号したときの崩れ(グリッチ)になります。
    そのときは Start に Info CHOP の header_bytes を入れると、ヘッダを守って中身だけを壊せます。
    """

    def build(ex):
        data = ex.input("patternCHOP", wavetype="tri", length=600, numcycles=3, amp=127, offset=127.5, channelname="bytes")
        ex.plugin(data, Method="Random", Count=8, Start=100, Seed=3)
    ```

**TouchDesigner テスト: 1 / 1 件合格**(test_flip_count_start_and_seed)

### パラメータ: Bit Flip

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Method` | Method | Menu | `Flip` | `Flip` Flip One Bit / `Random` Random Byte / `Zero` Zero Byte |  |
| `Count` | Count | Int | 1 | 0 … 1000000 | 0 … 32 |
| `Seed` | Seed | Int | 1 | −∞ … ∞ | 0 … 100 |
| `Start` | Start (Bytes Kept) | Int | 0 | 0 … ∞ | 0 … 1024 |
| `Length` | Length (0 = to the End) | Int | 0 | 0 … ∞ | 0 … 1024 |

## 使い方

TODO: 入力・典型的な設定・注意点。
