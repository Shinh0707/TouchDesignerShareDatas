<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/RecordOutTOP/ -->

# Record Out (RecordOutTOP)

## 概要

TouchDesigner の映像(と音声)を、**TD の外のプロセス**でムービーに書き出す録画用 TOP です(macOS)。

Movie File Out TOP は TD のプロセスの中でエンコードするので、重いシーンでは録画そのものが TD の fps を下げ、
TD が遅れると「1 cook = 1 フレーム」の固定 fps で書かれるため、ムービーの時間が実際より縮みます。
Record Out は

- 入力を GPU から**非同期**で読み出し(TD のメインスレッドは待たない)、共有メモリに置くだけ
- エンコードは同梱の `tdrecorder`(別プロセス、AVFoundation / VideoToolbox のハードウェアエンコーダ)
- **TD が描いたフレームはすべて、そのフレームの時刻付きで**記録(可変フレームレート)。TD が遅れても
  ムービーの中の時間はずれず、音声とも合ったまま

で動きます。

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Recordout` |
| ラベル | Record Out |
| 種類 | TOP |
| 入力数 | 1 – 1 |
| バージョン | 1.0 |
| 作者 | Shinh0707 |
| Execute mode | CPUMem |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=RecordOutTOP)

### 処理時間

| ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|
| default | TOP 1280x720 | 0.000 ms<br>60→60.0 fps | — |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。
### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `RecordOutTOP` の `examples/` にある手順(Python)から自動で作っています。

#### 既定の入力

![既定の入力](https://shinh0707.github.io/TouchDesignerShareDatas/assets/examples/RecordOutTOP-RecordOutTOP.png)

既定の入力と既定のパラメータで使った例です(使用例が書かれていないプラグイン向けに自動で作成)。

ネットワーク: `in0` (moviefileinTOP) → `plugin` (CPlusPlus TOP) → `out1`

TouchDesigner 099.2025.33230(macOS)で開いて確認済み(2026-11-27)。TD 上の処理時間 **0.061 ms** — 余裕の無い 60 fps のプロジェクトなら **59.8 fps**(-0.2)。

ファイル: `RecordOutTOPExample.toe`

??? note "手順(examples/RecordOutTOP.py)"

    ```python
    """既定の入力

    既定の入力と既定のパラメータで使った例です(使用例が書かれていないプラグイン向けに自動で作成)。"""

    def build(ex):
        in0 = ex.input('moviefileinTOP')
        ex.plugin(in0)
    ```

**TouchDesigner テスト: 2 / 2 件合格**(test_h264_with_audio, test_prores4444)

### パラメータ: Record

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Record` | Record | Toggle | Off |  |  |
| `File` | File | File | `movies/out.mov` |  |  |
| `Codec` | Codec | Menu | `H264` | `H264` H.264 / `H265` H.265 (HEVC) / `Prores422` Apple ProRes 422 / `Prores422hq` Apple ProRes 422 HQ / `Prores4444` Apple ProRes 4444 (alpha) |  |
| `Bitrate` | Bitrate (Mbit/s) | Float | 40 | 1 … 1000 | 1 … 200 |
| `Audiochop` | Audio CHOP | CHOP |  |  |  |

### パラメータ: Advanced

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Timebase` | Timebase | Menu | `Timeline` | `Timeline` Timeline (TD frame time) / `Wallclock` Wall Clock |  |
| `Bufferframes` | Buffer Frames | Int | 16 | 2 … 600 | 2 … 120 |
| `Recorder` | Recorder App | File |  |  |  |

## 使い方

1. 録画したい TOP を入力につなぎ、**File** に `.mov` / `.mp4` のパスを指定します(同名があれば `_1`, `_2`… を付けます)。
2. 音声も入れるときは **Audio CHOP** に Time Slice の Audio CHOP(Audio Device In / Audio File In / Audio Oscillator など、
   最大 2ch)を指定します。
3. **Record** をオンにすると録画開始、オフで終了。終了後、`tdrecorder` が書き出しを終えると Info に `Saved ...` と出ます。

出力の絵は小さな状態表示です(赤 = 録画中、橙 = 書き出し中、灰 = 待機)。数値は Info CHOP の
`recording` / `finishing` / `frames_sent` / `frames_encoded` / `frames_dropped` / `buffered` / `audio_dropped` で確認できます。

| 設定 | 内容 |
|---|---|
| Codec | H.264 / H.265 は `.mov` `.mp4`、ProRes(422 / 422 HQ / 4444 アルファ付き)は `.mov` のみ。ProRes の音声は 24bit PCM、それ以外は AAC |
| Bitrate | H.264 / H.265 の平均ビットレート |
| Timebase | **Timeline**(既定): TD のフレーム時刻(`absTime.frame`)。ムービーの時間 = TD が計算したアニメーションの時間。Realtime をオフにしたオフライン書き出しでも正しい長さになります。**Wall Clock**: 実時間。TD が実時間に追いつけなかった分、ムービーも実時間どおりの長さになります |
| Buffer Frames | 共有メモリに置けるフレーム数。録画側が追いつかないときはここで吸収し、あふれた分は捨てて `frames_dropped` に数えます(TD は待ちません)。1080p で 1 枚約 8 MB |
| Recorder App | 空なら同梱の `RecordOutTOP.plugin/Contents/Resources/tdrecorder` |

!!! note "注意"
    - 録画中に入力の解像度を変えると、そのフレームは記録されません(警告が出ます)。
    - TD が録画中に落ちても、`tdrecorder` はそこまでの分を書き終えてファイルを閉じます。
    - 可変フレームレートのファイルです。編集ソフトによっては読み込み時に固定 fps へ変換されます。
