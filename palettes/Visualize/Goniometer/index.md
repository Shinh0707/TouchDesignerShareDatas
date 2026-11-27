<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/Goniometer/ -->

# Goniometer

`Visualize` フォルダのパレットです。

## 説明

ゴニオメーター（ステレオの位相・広がりを見るスコープ）。L−R を横、L+R を縦にして（1/√2 倍で 45° 回した形）点で描く。モノラルの音は縦の線、逆相は横の線、広がった音は丸く散らばる。

入力: in1 ステレオのオーディオ CHOP（L, R）
出力: out1 Resolution の画像（黒の透明地に丸い点）

パラメータ

- Samples: 描く点の数（タイムスライスをこの数に間引く）
- Thickness: 点の大きさ
- Color: 点の色
- Resolution: 出力の解像度（既定 1280×720）

## ダウンロード

[Goniometer.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/Goniometer.tox) [使用例 GoniometerExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/GoniometerExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Audio |
| 出力 0 | TOP | `out1` | Image |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Samples` | Samples | Parameter | Int | `1000` | 1.0 … 3000.0 |
| `Thickness` | Thickness | Parameter | Float | `1` | 0.0 … 10.0 |
| `Colorr` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Colorg` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Colorb` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Colora` | Color | Parameter | RGBA | `1` | 0.0 … 1.0 |
| `Resolutionw` | Resolution | Parameter | WH | `0` | 0.0 … 1.0 |
| `Resolutionh` | Resolution | Parameter | WH | `0` | 0.0 … 1.0 |

## 使用例

### 音楽のステレオの広がり

![音楽のステレオの広がり](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Visualize-Goniometer-example.png)

TouchDesigner 付属のサンプル音声(ステレオ)をつないだ例です。左右で共通の成分は縦の線に、広がった成分は丸い散らばりになります。

ネットワーク: `in0` (audiofileinCHOP) → `Goniometer` (パレット: `Samples=2000`, `Thickness=2`, `Color=[0.5, 1, 0.6, 1]`) → `black` (constantTOP: `colorr=0`, `colorg=0`, `colorb=0`, `alpha=1`, `resolutionw=1280`, `resolutionh=720`) → `on_black` (overTOP) → `out1`

[GoniometerExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/GoniometerExample.toe)

??? note "手順(Visualize/Goniometer.example.py)"

    ```python
    """音楽のステレオの広がり

    TouchDesigner 付属のサンプル音声(ステレオ)をつないだ例です。左右で共通の成分は縦の線に、広がった成分は丸い散らばりになります。
    """
    import sys

    sys.path.insert(0, __file__.split("/palettes/")[0] + "/palettes")
    from _examples import on_black  # noqa: E402

    def build(ex, tox):
        audio = ex.input("audiofileinCHOP")
        on_black(ex, ex.palette(tox, audio, Samples=2000, Thickness=2, Color=(0.5, 1, 0.6, 1)))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

17 個のオペレータ。sha256: `4ffce81bdbba86ed…`
