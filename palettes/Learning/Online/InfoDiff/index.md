<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/InfoDiff/ -->

# InfoDiff

`Learning/Online` フォルダのパレットです。

## 説明

入力の「情報の差分」の大きさ。各要素（チャンネル × サンプルのそれぞれ）の 1 フレームの差分 Δx を、その要素のオンラインの平均・分散で 1σ に正規化し（OnlineStandardize）、2 乗の平均 I = mean(z²) を出す。差分をガウスのランダムウォークとみなすと、I は新しいフレームの驚き（−log p）に比例し、いつもどおりの揺れなら 1 前後、大きな変化で大きくなる。画素ごと・帯域ごとに正規化するので、絶対量に依らない相対的な量になる。学習の外側で使う部品（逆伝播はしない）。

入力: in1 CHOP（画像の行列、スペクトルなど。Time Slice はオフで、全サンプルを要素として扱う）
出力: out1 2 チャンネル × 1 サンプル

- info: I = mean(z²)
- loginfo: ln(I + 10^Epslog)

パラメータ

- Alpha: 差分の平均・分散の移動平均の速さ（1 フレームの重み）
- Floorlog: 差分の分散の下限の log10。8 bit の画像なら −4.2（(2/255)²）くらい
- Initvar: リセット時の差分の分散
- Epslog: loginfo の小さな値の log10
- Reset: オンの間、統計を初めに戻す

## ダウンロード

[InfoDiff.tox をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/InfoDiff.tox) [使用例 InfoDiffExample.toe](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/InfoDiffExample.toe)

`.tox` はネットワークにドラッグ & ドロップするか、Palette の My Components に入れて使います([使い方](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/))。

## 入力と出力

| | 種類 | 名前 | 内容 |
|---|---|---|---|
| 入力 0 | CHOP | `in1` | Any |
| 出力 0 | CHOP | `out1` | Feature |

## パラメータ

| Name | Label | Page | Type | Default | Menu / Range |
|---|---|---|---|---|---|
| `Alpha` | Alpha | InfoDiff | Float | `0.01` | 0.0 … 1.0 |
| `Floorlog` | Floorlog | InfoDiff | Float | `-6` | -12.0 … 0.0 |
| `Initvar` | Initvar | InfoDiff | Float | `1` | 0.0 … 10.0 |
| `Epslog` | Epslog | InfoDiff | Float | `-6` | -12.0 … 0.0 |
| `Reset` | Reset | InfoDiff | Toggle | `False` |  |

## 使用例

### 急な変化で跳ね上がる

![急な変化で跳ね上がる](https://shinh0707.github.io/TouchDesignerShareDatas/assets/palettes/Learning-Online-InfoDiff-example.svg)

いつもは小さく揺れ、2 秒ごとに急に跳ぶ 16 個の値を InfoDiff に通し、info の推移を Trail CHOP で記録した例です。いつもどおりの揺れなら 1 前後、跳んだ瞬間に大きくなります。

ネットワーク: `wobble` (patternCHOP: `channelname=v`, `wavetype=random`, `length=16`, `fromrange=[0, 1]`, `torange=[-0.05, 0.05]`, `seed={'expr': 'absTime.frame + 1000'}`) → `jump` (patternCHOP: `channelname=v`, `wavetype=random`, `length=16`, `seed={'expr': 'int(absTime.seconds / 2)'}`) → `in0` (mathCHOP: `chopop=add`) → `InfoDiff` (パレット) → `info` (selectCHOP: `channames=info`) → `history` (trailCHOP: `wlength=360`, `wlengthunit=samples`) → `out1`

[InfoDiffExample.toe をダウンロード](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/InfoDiffExample.toe)

??? note "手順(Learning/Online/InfoDiff.example.py)"

    ```python
    """急な変化で跳ね上がる

    いつもは小さく揺れ、2 秒ごとに急に跳ぶ 16 個の値を InfoDiff に通し、info の推移を Trail CHOP で記録した例です。いつもどおりの揺れなら 1 前後、跳んだ瞬間に大きくなります。
    """

    FRAMES = 360

    def build(ex, tox):
        wobble = ex.op("patternCHOP", name="wobble", channelname="v", wavetype="random", length=16,
                       fromrange=(0, 1), torange=(-0.05, 0.05), seed={"expr": "absTime.frame + 1000"})
        jump = ex.op("patternCHOP", name="jump", channelname="v", wavetype="random", length=16,
                     seed={"expr": "int(absTime.seconds / 2)"})
        x = ex.input("mathCHOP", input=[wobble, jump], chopop="add")
        info = ex.palette(tox, x)
        pick = ex.op("selectCHOP", name="info", input=info, channames="info")
        ex.out(ex.op("trailCHOP", name="history", input=pick, wlength=360, wlengthunit="samples"))
    ```

TouchDesigner で読み込んでエラーが出ないことを確認済み(2026-11-27)。

## 依存プラグイン

このパレットは TouchDesigner 標準のオペレータだけでできています。追加のプラグインは要りません。

34 個のオペレータ。sha256: `8f6986b436fdbeea…`
