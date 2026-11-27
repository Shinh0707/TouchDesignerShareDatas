<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Feature/ImgFeat/ -->

# ImgFeat

`Image/Feature` フォルダのパレットです。

## 説明

画像の小さな特徴ベクトル（75 個の値）。5×3 に縮めた画像の色を、色相の円の上の点 (s·v·sin h, s·v·cos h) にしたもの（15 画素 × 2 = 30 個）と、9×5 に縮めたエッジ + 明るさ（45 個）を並べた 1 サンプルの CHOP。画像どうしの比較や学習の入力に使う。

入力: in1 画像 TOP
出力: out1 CHOP（75 チャンネル × 1 サンプル）

## ダウンロード

[ImgFeat.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Feature/ImgFeat.tox) [使用例 ImgFeatExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Feature/ImgFeatExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | TOP | `in1` | Image |
| 出力 0 | CHOP | `out1` | Feature |

## 使用例

### 画像の小さな特徴ベクトル

![画像の小さな特徴ベクトル](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Image-Feature-ImgFeat-example.svg)

バナナの画像の 75 個の特徴(色相の円の上の 15 画素 × 2 と、エッジ + 明るさ 45 個)を、1 本の曲線に並べた例です。

ネットワーク: `in0` (moviefileinTOP) → `ImgFeat` (パレット) → `feature_curve` (shuffleCHOP: `method=swap`) → `feature` (renameCHOP: `renamefrom=*`, `renameto=feature`) → `curves` (mergeCHOP) → `out1`

[ImgFeatExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Feature/ImgFeatExample.toe)

??? note "手順(Image/Feature/ImgFeat.example.py)"

    ```python
    """画像の小さな特徴ベクトル

    バナナの画像の 75 個の特徴(色相の円の上の 15 画素 × 2 と、エッジ + 明るさ 45 個)を、1 本の曲線に並べた例です。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import curves  # noqa: E402

    def build(ex, tox):
        img = ex.input("moviefileinTOP")
        f = ex.palette(tox, img)
        curves(ex, [("feature", f)])
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

32 個のオペレータ。sha256: `0183d9ef2ec66aa4…`
