<!-- https://shinh0707.github.io/TouchDesignerShareDatas/install/ -->

# 導入

## ダウンロード

[Releases](https://github.com/Shinh0707/TouchDesignerShareDatas/releases) から取得します。

| ファイル | 中身 |
|---|---|
| `<プラグイン名>-<version>-mac.zip` / `-windows.zip` | そのプラグインだけ(`.plugin` / `.dll` + 説明の README.md) |
| `TDPlugins-<version>-mac.zip` / `-windows.zip` | 全プラグインのまとめ |

各プラグインのページの「ダウンロード」から、そのプラグインのリリースだけを一覧できます。

## インストール

使いたいプラグインを次のフォルダに置きます。

- **Mac**: `~/Library/Application Support/Derivative/TouchDesigner099/Plugins`(`.plugin`)
- **Windows**: `Documents/Derivative/Plugins`(`.dll`)

TouchDesigner を再起動すると、、OP Create ダイアログの **Custom** タブに表示されます。

!!! note "Mac で読み込めないとき"
    ダウンロードした `.plugin` に隔離属性が付いていると読み込まれないことがあります。
    ターミナルで `xattr -dr com.apple.quarantine <...>.plugin` を実行してください。

詳しくは公式の [Custom Operators](https://docs.derivative.ca/Custom_Operators) を参照してください。
