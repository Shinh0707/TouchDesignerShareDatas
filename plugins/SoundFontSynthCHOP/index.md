<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/SoundFontSynthCHOP/ -->

# SoundFont Synth (SoundFontSynthCHOP)

## 概要

SoundFontファイルを再生します.`MIDIFileInCHOP`と一緒に使うことを想定しています.

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Sfsynth` |
| ラベル | SoundFont Synth |
| 種類 | CHOP |
| 入力数 | 1 – 1 |
| バージョン | 0.1 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=SoundFontSynthCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| default | CHOP 2ch x 1000 | 0.000 ms<br>60→60.0 fps | 0.001 ms<br>60→60.0 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `SoundFontSynthCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### ノートのチャンネルを音にする

![ノートのチャンネルを音にする](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/SoundFontSynthCHOP-default.svg)

入力は 128 チャンネル(チャンネルの順番 = ノート番号)で、値が 0 より大きくなるとノートオン(値がベロシティ)、
0 に戻るとノートオフです。ここでは 60(ド)を 0.5 秒おきにオン/オフしています。出力は `left` / `right` の音声(44100 Hz)です。図は Trail CHOP で 1.5 秒ぶんを並べたものです。
サンプルは、開いたときに正弦波 1 つだけの小さな SoundFont を .toe と同じフォルダに書き出して読み込みます。
手持ちの .sf2 を **Soundfont File** に指定すれば、その音色で鳴ります。音を聞くには出力を Audio Device Out CHOP につなぎます。

ネットワーク: `write_soundfont_file` (executeDAT: `start=True`) → `in0` (constantCHOP) → `plugin` (CPlusPlus CHOP: `Soundfontfile={'expr': "project.folder + '/SoundFontSynthExample.sf2'"}`) → `trail1` (trailCHOP: `wlength=1.5`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.012 ms** — 余裕の無い 60 fps のプロジェクトなら **60.0 fps**(-0.0)。

ファイル: `SoundFontSynthCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """ノートのチャンネルを音にする

    入力は 128 チャンネル(チャンネルの順番 = ノート番号)で、値が 0 より大きくなるとノートオン(値がベロシティ)、
    0 に戻るとノートオフです。ここでは 60(ド)を 0.5 秒おきにオン/オフしています。出力は `left` / `right` の音声(44100 Hz)です。図は Trail CHOP で 1.5 秒ぶんを並べたものです。
    サンプルは、開いたときに正弦波 1 つだけの小さな SoundFont を .toe と同じフォルダに書き出して読み込みます。
    手持ちの .sf2 を **Soundfont File** に指定すれば、その音色で鳴ります。音を聞くには出力を Audio Device Out CHOP につなぎます。
    """

    WRITER = '''import math
    import os
    import struct

    def write_soundfont(path, rate=44100, cycle=169, cycles=20):
        """ループする正弦波(中央のド)1 つだけの SoundFont 2 を書く。"""
        def chunk(tag, data):
            return tag + struct.pack("<I", len(data)) + data + (b"\\0" if len(data) % 2 else b"")

        def name(s):
            return s.encode("ascii").ljust(20, b"\\0")

        def gen(oper, amount):
            return struct.pack("<Hh", oper, amount)

        n = cycle * cycles
        pcm = b"".join(struct.pack("<h", int(20000 * math.sin(2 * math.pi * i / cycle))) for i in range(n))
        info = chunk(b"ifil", struct.pack("<HH", 2, 1)) + chunk(b"isng", b"EMU8000\\0") + chunk(b"INAM", b"Sine\\0\\0")
        sdta = chunk(b"smpl", pcm + b"\\0" * 92)
        pdta = (chunk(b"phdr", name("Sine") + struct.pack("<HHHIII", 0, 0, 0, 0, 0, 0)
                      + name("EOP") + struct.pack("<HHHIII", 0, 0, 1, 0, 0, 0))
                + chunk(b"pbag", struct.pack("<HH", 0, 0) + struct.pack("<HH", 1, 0))
                + chunk(b"pmod", b"\\0" * 10)
                + chunk(b"pgen", gen(41, 0) + gen(0, 0))
                + chunk(b"inst", name("Sine") + struct.pack("<H", 0) + name("EOI") + struct.pack("<H", 1))
                + chunk(b"ibag", struct.pack("<HH", 0, 0) + struct.pack("<HH", 4, 0))
                + chunk(b"imod", b"\\0" * 10)
                # アタック 30 ms、リリース 0.25 s、ループ再生、サンプル 0
                + chunk(b"igen", gen(34, -6000) + gen(38, -2400) + gen(54, 1) + gen(53, 0) + gen(0, 0))
                + chunk(b"shdr", name("Sine") + struct.pack("<IIIIIBbHH", 0, n, cycle, n - cycle, rate, 60, 0, 0, 1)
                        + name("EOS") + b"\\0" * 26))
        body = b"sfbk" + chunk(b"LIST", b"INFO" + info) + chunk(b"LIST", b"sdta" + sdta) + chunk(b"LIST", b"pdta" + pdta)
        with open(path, "wb") as f:
            f.write(b"RIFF" + struct.pack("<I", len(body)) + body)

    def onStart():
        path = project.folder + "/SoundFontSynthExample.sf2"
        if not os.path.exists(path):
            write_soundfont(path)
    '''

    def build(ex):
        writer = ex.op("executeDAT", name="write_soundfont_file", x=-220, y=160, start=True)
        writer.text = WRITER
        writer.module.onStart()
        notes = ex.input("constantCHOP")
        notes.seq.const.numBlocks = 3
        for i, (name, value) in enumerate((("n[0-59]", 0), ("n60", None), ("n[61-127]", 0))):
            notes.par["const%dname" % i] = name
            if value is None:
                notes.par["const%dvalue" % i].expr = "0.8 if int(absTime.seconds * 2) % 2 == 0 else 0"
            else:
                notes.par["const%dvalue" % i] = value
        audio = ex.plugin(notes, Soundfontfile={"expr": "project.folder + '/SoundFontSynthExample.sf2'"})
        ex.out(ex.op("trailCHOP", input=audio, wlength=1.5))
    ```

### パラメータ: Synth

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Soundfontfile` | Soundfont File | File |  |  |  |

### 出典・参考

- B. Schelling. [TinySoundFont: SoundFont2 synthesizer library in a single C/C++ file](https://github.com/schellingb/TinySoundFont). GitHub. — SoundFont の読み込みと発音に使っているライブラリ(MIT)

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

## 使い方

1. **Soundfont File** に `.sf2` を指定します。
2. 入力に、ノートを表す CHOP をつなぎます。**チャンネルの順番がノート番号**(1 番目が 0、61 番目が中央のド = 60)で、
   値が 0 より大きくなった瞬間にノートオン(その値がベロシティ、0〜1)、0 以下に戻った瞬間にノートオフです。
   [MidiFileInCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/MidiFileInCHOP/) の出力はこの形なので、そのままつなげます。
3. 出力は `left` / `right` の 2 チャンネル、44100 Hz の音声です。Audio Device Out CHOP につなぐと鳴ります。

- 使う音色は SoundFont の**最初のプリセット**です。別の音色を使いたいときは、その音色だけの SoundFont を用意します。
- ノートの判定は 1 フレームに 1 回(入力の最初のサンプル)なので、発音のタイミングはフレーム単位です。
- 入力のチャンネルが 128 より少ないときは、足りないノートは鳴りません。Constant CHOP や Keyboard In CHOP の値を
  目的のノート番号の位置に並べれば、MIDI ファイルなしでも鳴らせます。

SoundFont は配布していません。フリーのものを探すか、サンプルに入っている正弦波の SoundFont(開いたときに自動で作られます)で動作を確かめてください。
