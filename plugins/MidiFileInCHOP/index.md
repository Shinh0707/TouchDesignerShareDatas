<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/MidiFileInCHOP/ -->

# MIDI File In (MidiFileInCHOP)

## 概要

MIDIファイルを手軽に読めます.(`MIDI In`より機能が少なく、簡単に使えます)

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Midifilein` |
| ラベル | MIDI File In |
| 種類 | CHOP |
| 入力数 | 0 – 0 |
| バージョン | 0.1 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=MidiFileInCHOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| default | — | 0.007 ms<br>60→60.0 fps | 0.022 ms<br>60→59.9 fps |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `MidiFileInCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### MIDI ファイルを再生してノートを取り出す

![MIDI ファイルを再生してノートを取り出す](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/MidiFileInCHOP-default.svg)

出力は 128 チャンネル(`v0`〜`v127` = ノート番号)で、鳴っている間そのノートのベロシティ(0〜1)が入ります。
サンプルは、開いたときに小さな MIDI ファイル(ドミソドのアルペジオ、2 秒)を .toe と同じフォルダに書き出して読み込みます。
図は鳴っている 4 つのノート(60, 64, 67, 72)を Trail CHOP で 4 秒ぶん並べたものです。

ネットワーク: `write_midi_file` (executeDAT: `start=True`) → `plugin` (CPlusPlus CHOP: `Midifile={'expr': "project.folder + '/MidiFileInExample.mid'"}`) → `select1` (selectCHOP: `channames=v60 v64 v67 v72`) → `trail1` (trailCHOP: `wlength=4`) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.025 ms** — 余裕の無い 60 fps のプロジェクトなら **59.9 fps**(-0.1)。

ファイル: `MidiFileInCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """MIDI ファイルを再生してノートを取り出す

    出力は 128 チャンネル(`v0`〜`v127` = ノート番号)で、鳴っている間そのノートのベロシティ(0〜1)が入ります。
    サンプルは、開いたときに小さな MIDI ファイル(ドミソドのアルペジオ、2 秒)を .toe と同じフォルダに書き出して読み込みます。
    図は鳴っている 4 つのノート(60, 64, 67, 72)を Trail CHOP で 4 秒ぶん並べたものです。
    """

    WRITER = '''import os
    import struct

    def write_midi(path):
        """ドミソドのアルペジオ(120 BPM、1 拍ずつ)を Standard MIDI File(format 0)で書く。"""
        def vlq(n):
            out = [n & 0x7F]
            while n > 0x7F:
                n >>= 7
                out.insert(0, (n & 0x7F) | 0x80)
            return bytes(out)

        track = vlq(0) + b"\\xff\\x51\\x03\\x07\\xa1\\x20"            # 500000 us / 拍 = 120 BPM
        for i, (note, vel) in enumerate(((60, 100), (64, 80), (67, 110), (72, 64))):
            track += vlq(48 if i else 0) + bytes((0x90, note, vel)) + vlq(432) + bytes((0x80, note, 0))
        track += vlq(48) + b"\\xff\\x2f\\x00"
        with open(path, "wb") as f:
            f.write(b"MThd" + struct.pack(">IHHH", 6, 0, 1, 480) + b"MTrk" + struct.pack(">I", len(track)) + track)

    def onStart():
        path = project.folder + "/MidiFileInExample.mid"
        if not os.path.exists(path):
            write_midi(path)
    '''

    def build(ex):
        writer = ex.op("executeDAT", name="write_midi_file", x=-220, y=160, start=True)
        writer.text = WRITER
        writer.module.onStart()
        notes = ex.plugin(Midifile={"expr": "project.folder + '/MidiFileInExample.mid'"})
        playing = ex.op("selectCHOP", input=notes, channames="v60 v64 v67 v72")
        ex.out(ex.op("trailCHOP", input=playing, wlength=4))
    ```

### パラメータ: Play

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Midifile` | MIDI File | File |  |  |  |
| `Active` | Active | Toggle | On |  |  |
| `Reset` | Reset | Pulse |  |  |  |
| `Queue` | Queue | Pulse |  |  |  |
| `Queuetime` | Queue Time | Float | 0 | −∞ … ∞ | 0 … 1 |
| `Speed` | Speed | Float | 1 | −∞ … ∞ | -3 … 3 |

### 出典・参考

- C. S. Sapp. [midifile: C++ classes for reading/writing Standard MIDI Files](https://github.com/craigsapp/midifile). GitHub. — MIDI ファイルの読み込みに使っているライブラリ(BSD 2-Clause)

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

## 使い方

1. **MIDI File** に `.mid` を指定します。
2. タイムラインを再生すると、ファイルの先頭から再生が始まり、最後まで行くと先頭に戻ります。

出力は 128 チャンネル(`v0`〜`v127`、番号 = ノート番号)の Time Slice の CHOP です。
鳴っているノートのチャンネルにベロシティ(0〜1)が入り、鳴っていない間は 0 です。

- **Active**: オフにすると全チャンネルが 0 になり、再生位置も進みません。
- **Reset**: 先頭に戻します。
- **Queue Time / Queue**: Queue を押すと、Queue Time(0〜1、曲全体に対する割合)の位置に飛びます。その時点で鳴っているはずのノートは鳴った状態になります。
- **Speed**: 再生の速さ。2 で倍速、負の値で逆再生です。
- Info CHOP に、今の再生位置 `time` と曲の長さ `duration`(秒)が出ます。

読むのは**ノートオン / ノートオフだけ**です(コントロールチェンジやピッチベンドは見ません)。
複数のトラックや MIDI チャンネルは区別せず、全部を 1 つにまとめて読みます。パートごとに分けたいときは、パートごとの MIDI ファイルを用意します。
音にするには、そのまま [SoundFontSynthCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/SoundFontSynthCHOP/) につなぎます。
