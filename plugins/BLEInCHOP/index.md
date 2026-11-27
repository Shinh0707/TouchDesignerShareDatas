<!-- https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BLEInCHOP/ -->

# BLE In (BLEInCHOP)

## 概要

BLE（Bluetooth Low Energy）デバイスからカンマ区切りの数値列（例: `123,0.5,3.212`）としてフォーマットされた
ASCII文字列を受信し、それらをCHOPチャンネルとして出力します.
[SimpleBLE](https://github.com/simpleble/simpleble)ライブラリを使用しています.

## リファレンス

| 項目 | 値 |
|---|---|
| OP Type | `Blein` |
| ラベル | BLE In |
| 種類 | CHOP |
| 入力数 | 0 – 0 |
| バージョン | 0.1 |
| 作者 | Shinh0707 |

### ダウンロード

[リリース一覧](https://github.com/Shinh0707/TouchDesignerShareDatas/releases?q=BLEInCHOP)

### 使用例

どれもダウンロードした zip に `.toe` で入っていて、プラグインと同じフォルダにあればインストールしなくても開けます。ネットワークは `BLEInCHOP` の `examples/` にある手順(Python)から自動で作っています。

#### BLE デバイスから数値を受け取る

カンマ区切りの数値(例: "123,0.5,3.212")を送ってくる Bluetooth Low Energy デバイスにつなぎ、チャンネルとして出力します。

TouchDesigner での自動確認はしていません(starts a real Bluetooth scan when it cooks)。

ファイル: `BLEInCHOPExample.toe`

??? note "手順(examples/default.py)"

    ```python
    """BLE デバイスから数値を受け取る

    カンマ区切りの数値(例: "123,0.5,3.212")を送ってくる Bluetooth Low Energy デバイスにつなぎ、チャンネルとして出力します。
    """

    RUN_IN_TD = "starts a real Bluetooth scan when it cooks"

    def build(ex):
        ex.plugin()
    ```

### パラメータ: BLE

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Connect` | Connect | Toggle | Off |  |  |
| `Adapter` | Adapter | DynamicStrMenu | `-1` |  |  |
| `Peripheral` | Peripheral | DynamicStrMenu | `-1` |  |  |
| `Characteristicuuid` | Characteristic UUID | DynamicStrMenu | `-1` |  |  |
| `Resetchans` | Reset Channels | Pulse |  |  |  |
| `Read` | Read | Toggle | On |  |  |

### パラメータ: BLESetting

| Name | Label | Type | Default | Range / Menu | Slider |
|---|---|---|---|---|---|
| `Scantimeout` | Scan Timeout | Float | 3 | 0.1 … 10 | 0.1 … 10 |
| `Readmode` | Read Mode | StrMenu | `ascii` | `ascii` |  |

### 出典・参考

- SimpleBLE. [SimpleBLE: cross-platform Bluetooth Low Energy library](https://github.com/simpleble/simpleble). GitHub. — BLE の通信に使っているライブラリ

[すべての出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)

## 使い方

1. **Adapter** で Bluetooth アダプターを選びます。
2. **Connect** をオンにすると、**Scan Timeout** 秒だけ周辺機器を探します。見つかった機器が **Peripheral** に並ぶので選び、
   **Characteristic UUID** で値を読み出す特性(read できるもの)を選びます。
3. 機器からは `123,0.5,3.212` のように、**カンマ区切りの数値を ASCII 文字列で**送ります。先頭から順にチャンネルになります。

- **はじめはチャンネルが 0 個**です。値が届くようになったら **Reset Channels** を押すと、届いた値の個数に合わせてチャンネルを作ります。
  送る値の個数を変えたときも、もう一度押します。
- **Read** をオフにすると、接続したまま値の更新だけ止めます。
- 数値として読めない文字列が届くと `Decode Error` を出し、その回の残りは読みません。
- 値は cook のたびに読みに行きます(通知を待つ方式ではありません)。送る側は、特性の値を最新の文字列に書き換え続けます。

!!! note "macOS の権限"
    はじめて使うとき、TouchDesigner に Bluetooth の使用を許可する必要があります(システム設定 > プライバシーとセキュリティ > Bluetooth)。
