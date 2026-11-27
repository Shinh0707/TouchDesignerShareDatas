<!-- https://shinh0707.github.io/TouchDesignerShareDatas/palettes/ -->

# パレット

TouchDesigner で作った、ネットワークにそのまま入れて使えるコンポーネント(`.tox`)です。

## 使い方

1. 一覧から `.tox` をダウンロードします。
2. TouchDesigner のネットワークにドラッグ & ドロップすると、そのまま使えます。
3. よく使うものは、左の **Palette** の **My Components** に入れておくと、いつでも取り出せます(フォルダに `.tox` を置くか、Palette ブラウザにドラッグします)。
4. Custom オペレータを使うパレットは、先にそのプラグインを入れてください(各ページの「依存プラグイン」)。

*詳しくは [Palette](https://docs.derivative.ca/Palette) を参照してください。*

もとにした論文・書籍・ライブラリは[出典・参考](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/references/)にまとめています。

## 一覧

### Audio/Feature

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [AudioQuantizeRate](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/AudioQuantizeRate/) | オーディオが Q ビットの段（±1 を 2^Q − 1 段に分けた格子）にどれだけ乗っているか（ビットクラッシュ・ローファイらしさ）を 0〜1 で出す。各サンプ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/AudioQuantizeRate.tox) |
| [CrestFactor](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/CrestFactor/) | クレストファクター（ピーク ÷ RMS）。音のとがり具合（打撃音ほど大きく、正弦波で √2 ≈ 1.41、矩形波で 1）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/CrestFactor.tox) |
| [MFCCDistance](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/MFCCDistance/) | 2 つの音の音色の違いを 1 つの数で出す（MFCC の L1 距離）。2 つの MFCC の差の絶対値を、係数について平均し、さらに直近 Window 秒のフ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/MFCCDistance.tox) |
| [PerceptualSimilarity](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/PerceptualSimilarity/) | 2 つの音が、聴いてどれだけ似ているかを 0〜100 で出す（知覚類似度）。100 = 聞き分けられない、70 未満 = はっきり違う、30 前後 = 別の音。 | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/PerceptualSimilarity.tox) |
| [RMSNorm](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/RMSNorm/) | RMS で割って大きさをそろえる（x / RMS(x)）。音量によらない波形の形を比べたいときに使う。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/RMSNorm.tox) |
| [SimilarityRating](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/SimilarityRating/) | MFCC の距離を、聴取実験（MUSHRA）の評価の予測 0〜100 に変換する。100 = 基準と聞き分けられない、70 未満 = はっきり違う、30 前後  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/SimilarityRating.tox) |
| [VU](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/VU/) | VU メーター。整流した信号を 2 次のフィルタ（減衰比 Dump、固有角周波数 Angf：VU 規格の約 300 ms の動き）に通し、基準レベル Vu0 d | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/VU.tox) |
| [ZCR](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/ZCR/) | ゼロ交差率（隣り合うサンプルで符号が変わる割合）。ノイズや高い音ほど大きく、低い音ほど小さい。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Feature/ZCR.tox) |

### Audio/Pitch

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [F0](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/F0/) | 基本周波数（音の高さ）を Hz で推定する。参照したスペクトルの上で、Fmin〜Fmax の候補ごとに、その 1〜12 倍の位置の振幅（平方根で圧縮）を、高い倍 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0.tox) |
| [F0Note](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/F0Note/) | F0 で推定した音の高さを、整数の MIDI ノート番号で出す（F0 → F0ToNote → 四捨五入）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0Note.tox) |
| [F0ToNote](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/F0ToNote/) | 周波数 Hz を MIDI ノート番号（小数）に変換する: 69 + 12·log2(f / 440)。A4 = 440 Hz = 69。8.18 Hz（ノート | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/F0ToNote.tox) |
| [NumToNoteTrigger](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/NumToNoteTrigger/) | ノート番号を 128 サンプルのワンホットに変換する。入力のノート番号と ±0.01 以内のインデックスだけが 1、ほかは 0（ノート 0〜127 のどれが鳴っ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/NumToNoteTrigger.tox) |
| [PSGRatio](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/PSGRatio/) | 倍音のうち奇数次の占める割合（矩形波・PSG らしさ）。F0 を推定し、スペクトルの各ビンが何次の倍音に近いかを求めて、奇数次と偶数次のエネルギー \|X\|² を | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Pitch/PSGRatio.tox) |

### Audio/Spectrum

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [BaseAudioSpect](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/BaseAudioSpect/) | オーディオ CHOP を Audio Spectrum CHOP でスペクトルに変換する土台。ほかの AudioSpectrum 部品は、この中の Audio  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/BaseAudioSpect.tox) |
| [BinFrequency](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/BinFrequency/) | スペクトルの各ビンの中心周波数 f_k = k · fs / N（Hz）を、スペクトルと同じ長さのチャンネルで出す。fs は Audio Spectrum CH | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/BinFrequency.tox) |
| [FFTSize](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/FFTSize/) | 参照した Audio Spectrum CHOP の FFT サイズ N（= 2^(fftsize+6)）を定数で出す。fk などの周波数計算に使う下請け部品。 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/FFTSize.tox) |
| [LogBinFrequency](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/LogBinFrequency/) | ビン周波数を対数（オクターブ）軸に変換した x_k = log2(f_k) を出す。log2 の前に f_k を Fclamp Hz で、後に Xmin で下限 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/LogBinFrequency.tox) |
| [LogRemap](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/LogRemap/) | サンプルの横軸を対数にとり直す（等間隔の周波数ビン → 対数の周波数軸）。出力の横位置 t (0〜1) が元の列の位置 Minratio^(1 − t) に対応 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/LogRemap.tox) |
| [MFCC](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/MFCC/) | メル周波数ケプストラム係数（MFCC）。音色（スペクトルのおおまかな形）を、少ない数の値で表す。MelSpectrum のメル帯域パワーを dB にし（10·l | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MFCC.tox) |
| [MagnitudeDb](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/MagnitudeDb/) | スペクトル振幅をデシベル y_k = 20·log10(\|X_k\|) に変換する。振幅は 0.001 で下限クランプ（-60 dB が床）。SpectralSl | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MagnitudeDb.tox) |
| [MelSpectrum](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/MelSpectrum/) | オーディオの最新のフレームを、メル尺度の帯域パワー（メルスペクトル）にする。低い音は細かく、高い音は粗く分けるので、耳の聞こえ方に近い。最新の Fftsize  | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/MelSpectrum.tox) |
| [PowerSpectrum](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/PowerSpectrum/) | 各サンプルの 2 乗 \|x\|²（振幅スペクトル → パワースペクトル）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/PowerSpectrum.tox) |
| [SpectralCentroid](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralCentroid/) | スペクトル重心（明るさの指標）を Hz で出す。重心 = Σ E_k f_k / Σ E_k、E_k = \|X_k\|²。高域成分が多いほど大きい。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralCentroid.tox) |
| [SpectralCentroidNorm](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralCentroidNorm/) | スペクトル重心をナイキスト周波数で割って 0〜1 に正規化したもの: (Σ E_k f_k / Σ E_k) / (fs/2)、E_k = \|X_k\|²。0 = | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralCentroidNorm.tox) |
| [SpectralFlatness](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralFlatness/) | スペクトル平坦度（ノイズらしさ）。エネルギー E_k = \|X_k\|² の幾何平均 ÷ 算術平均で、0（純音・音程感が強い）〜1（ホワイトノイズ）。E_k は  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralFlatness.tox) |
| [SpectralFlux](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralFlux/) | スペクトルフラックス（立ち上がり・オンセットの強さ）。前フレームからの増加分だけを二乗して合計: Σ max(0, X_k(t) − X_k(t−1))²。音が | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralFlux.tox) |
| [SpectralSlope](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralSlope/) | スペクトル傾斜。横軸 log2(f)（xk）、縦軸 dB（yk）の最小二乗直線の傾きを dB/オクターブで出す。負に大きいほど高域が弱い（暗い音）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Spectrum/SpectralSlope.tox) |

### Audio/Stereo

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [3DSphereMap](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/3DSphereMap/) | ステレオ信号を 3D の点列にする（ゴニオメーターの 3D 版）。各サンプルを、z = 区間内の位置（−1〜1）、y = √(1−z²)·L、x = √(1−y | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/3DSphereMap.tox) |
| [MultiChannelPreTrail](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/MultiChannelPreTrail/) | タイムスライスの全サンプルを、1 サンプルずつ別のチャンネルに並べ替える（Shuffle: チャンネルとサンプルを入れ替え → 全部を分割）。N チャンネル × | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/MultiChannelPreTrail.tox) |
| [PanAngle](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/PanAngle/) | ステレオ信号の定位（左右どちらに寄っているか）を −1〜1 で出す。左右の RMS の角度 atan2(L, R)（0° = 右だけ、45° = 中央、90°  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PanAngle.tox) |
| [PanAngleStereo](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/PanAngleStereo/) | PanAngle の、L と R を別々の CHOP で受ける版。2 つのモノラル信号のどちらが大きいかを −1〜1 で出す（−1 = in1 だけ、+1 =  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PanAngleStereo.tox) |
| [PhaseCorrelation](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/PhaseCorrelation/) | 位相相関計（コリレーションメーター）。左右がどれだけ同じ形かを −1〜1 で出す: Σ L·R / √(Σ L² · Σ R²)（1 フレーム分の区間）。+1  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/PhaseCorrelation.tox) |
| [StereoWidth](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/StereoWidth/) | ステレオの広がり。Side（L−R）と Mid（L+R）のエネルギーから ΣS² / (ΣS² + ΣM²) を出す。0 = モノラル（左右が同じ）、0.5 = | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Audio/Stereo/StereoWidth.tox) |

### AutoDiff/Activation

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [DLeakyReLU](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Activation/DLeakyReLU/) | AutoDiff（CHOP で組んだ自動微分）の部品。Leaky ReLU y = x（x > 0）/ Slope · x（x ≤ 0）。D1 に「out1 に | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DLeakyReLU.tox) |
| [DSigmoid](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Activation/DSigmoid/) | AutoDiff（CHOP で組んだ自動微分）の部品。シグモイド y = 1 / (1 + e^(−Gain·x))。D1 に「out1 についての損失の勾配  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DSigmoid.tox) |
| [DSoftmax](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Activation/DSoftmax/) | AutoDiff（CHOP で組んだ自動微分）の部品。ソフトマックス y = softmax(x / Tempature)（各チャンネルのサンプルについて。和が | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Activation/DSoftmax.tox) |

### AutoDiff/BetaDist

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [DBetaMode](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/BetaDist/DBetaMode/) | AutoDiff（CHOP で組んだ自動微分）の部品。ベータ分布 Beta(a, b) の最頻値 y = (a − 1)/(a + b − 2)。D1 に「ou | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/BetaDist/DBetaMode.tox) |
| [DBetaModeLL](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/BetaDist/DBetaModeLL/) | AutoDiff（CHOP で組んだ自動微分）の部品。ベータ分布 Beta(a, b) の最頻値での確率密度の対数（ピークの高さ = 分布の鋭さ）。ln B(a | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/BetaDist/DBetaModeLL.tox) |

### AutoDiff

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [DAdd](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DAdd/) | AutoDiff（CHOP で組んだ自動微分）の部品。足し算 y = a + b。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DAdd.tox) |
| [DDiv](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DDiv/) | AutoDiff（CHOP で組んだ自動微分）の部品。割り算 y = a / b。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DDiv.tox) |
| [DDot](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DDot/) | AutoDiff（CHOP で組んだ自動微分）の部品。行列の積 Y = A · B（チャンネルが行、サンプルが列）。D1 に「out1 についての損失の勾配 d | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DDot.tox) |
| [DMul](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DMul/) | AutoDiff（CHOP で組んだ自動微分）の部品。掛け算（要素ごと）y = a · b。D1 に「out1 についての損失の勾配 dL/dy」（out1 と | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DMul.tox) |
| [DPow](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DPow/) | AutoDiff（CHOP で組んだ自動微分）の部品。べき乗 y = aᵇ。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHO | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DPow.tox) |
| [DSign](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DSign/) | AutoDiff（CHOP で組んだ自動微分）の部品。符号 y = sign(x)（−1 / 0 / 1）。D1 に「out1 についての損失の勾配 dL/dy | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DSign.tox) |
| [DSquaredDiff](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DSquaredDiff/) | AutoDiff（CHOP で組んだ自動微分）の部品。要素ごとの差の 2 乗 y = (a − b)²。D1 に「out1 についての損失の勾配 dL/dy」（ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DSquaredDiff.tox) |
| [DSub](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DSub/) | AutoDiff（CHOP で組んだ自動微分）の部品。引き算 y = a − b。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/DSub.tox) |

### AutoDiff/Function

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [DAbs](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DAbs/) | AutoDiff（CHOP で組んだ自動微分）の部品。絶対値 y = \|x\|。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CH | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DAbs.tox) |
| [DAdaptIm2Col](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DAdaptIm2Col/) | AutoDiff（CHOP で組んだ自動微分）の部品。出力の大きさ（Outw × Outh）から、カーネルとストライドを自動で決めて im2col する（アダプ | Col2ImCHOP, Im2ColCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DAdaptIm2Col.tox) |
| [DAdaptMax](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DAdaptMax/) | AutoDiff（CHOP で組んだ自動微分）の部品。アダプティブ max プーリング（PyTorch の AdaptiveMaxPool2d と同じく色ごと） | Col2ImCHOP, Im2ColCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DAdaptMax.tox) |
| [DAvg](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DAvg/) | AutoDiff（CHOP で組んだ自動微分）の部品。各チャンネルのサンプルの平均 y = mean(x)。D1 に「out1 についての損失の勾配 dL/dy | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DAvg.tox) |
| [DConstAdd](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DConstAdd/) | AutoDiff（CHOP で組んだ自動微分）の部品。定数を足す y = x + Value。D1 に「out1 についての損失の勾配 dL/dy」（out1  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DConstAdd.tox) |
| [DConstPow](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DConstPow/) | AutoDiff（CHOP で組んだ自動微分）の部品。定数乗 y = x^Exponent。D1 に「out1 についての損失の勾配 dL/dy」（out1 と | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DConstPow.tox) |
| [DCos](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DCos/) | AutoDiff（CHOP で組んだ自動微分）の部品。余弦 y = cos x。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の C | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DCos.tox) |
| [DDuplicate](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DDuplicate/) | AutoDiff（CHOP で組んだ自動微分）の部品。1 つの値を 2 か所で使うための分岐。out1・out2 に in1 をそのまま出し、逆伝播では 2 つ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DDuplicate.tox) |
| [DExp](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DExp/) | AutoDiff（CHOP で組んだ自動微分）の部品。指数関数 y = eˣ。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CH | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DExp.tox) |
| [DFullAvg](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DFullAvg/) | AutoDiff（CHOP で組んだ自動微分）の部品。全チャンネル・全サンプルの平均 y = mean(x)。D1 に「out1 についての損失の勾配 dL/d | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DFullAvg.tox) |
| [DIm2Col](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DIm2Col/) | AutoDiff（CHOP で組んだ自動微分）の部品。画像の CHOP（画素 × 色の行列）を、畳み込み用のパッチの列（im2col）に並べ替える。D1 に「o | Col2ImCHOP, Im2ColCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DIm2Col.tox) |
| [DInv](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DInv/) | AutoDiff（CHOP で組んだ自動微分）の部品。逆数 y = 1/x。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHO | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DInv.tox) |
| [DL2Norm](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DL2Norm/) | AutoDiff（CHOP で組んだ自動微分）の部品。各チャンネルを長さ 1 にそろえる（L2 正規化）y = x / (‖x‖ + 0.0001)。‖x‖ は | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DL2Norm.tox) |
| [DLGamma](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DLGamma/) | AutoDiff（CHOP で組んだ自動微分）の部品。ガンマ関数の対数 y = ln Γ(x)（スターリングの近似: (x − ½) ln x − x + ½  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DLGamma.tox) |
| [DLn](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DLn/) | AutoDiff（CHOP で組んだ自動微分）の部品。自然対数 y = ln x。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DLn.tox) |
| [DLogSoftmax](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DLogSoftmax/) | AutoDiff（CHOP で組んだ自動微分）の部品。対数ソフトマックス y = (x − max)/Tempature − ln Σ exp((x − max | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DLogSoftmax.tox) |
| [DMax](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DMax/) | AutoDiff（CHOP で組んだ自動微分）の部品。各チャンネルのサンプルの最大値 y = max(x)。D1 に「out1 についての損失の勾配 dL/dy | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DMax.tox) |
| [DNeg](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DNeg/) | AutoDiff（CHOP で組んだ自動微分）の部品。符号反転 y = −x。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CH | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DNeg.tox) |
| [DSin](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DSin/) | AutoDiff（CHOP で組んだ自動微分）の部品。正弦 y = sin x。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の C | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DSin.tox) |
| [DSquare](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DSquare/) | AutoDiff（CHOP で組んだ自動微分）の部品。2 乗 y = x²。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の CHO | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DSquare.tox) |
| [DTan](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DTan/) | AutoDiff（CHOP で組んだ自動微分）の部品。正接 y = tan x。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ形の C | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DTan.tox) |
| [DTanh](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DTanh/) | AutoDiff（CHOP で組んだ自動微分）の部品。双曲線正接 y = tanh x。D1 に「out1 についての損失の勾配 dL/dy」（out1 と同じ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DTanh.tox) |
| [DTranspose](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DTranspose/) | AutoDiff（CHOP で組んだ自動微分）の部品。転置（チャンネルとサンプルを入れ替える）。D1 に「out1 についての損失の勾配 dL/dy」（out1 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/DTranspose.tox) |
| [RowMul](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/RowMul/) | 2 つの CHOP をチャンネルごとに掛けて、サンプルについて足す（行ごとの内積）。y_c = Σ_s a_cs · b_cs。DL2Norm などの中で使う。 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Function/RowMul.tox) |

### AutoDiff/Image

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [DTOPRGB2ImCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Image/DTOPRGB2ImCHOP/) | 画像 TOP を画像の CHOP にする（TOPRGB2ImCHOP）。逆伝播では、D1 に入れた勾配（画像の CHOP）を画像 TOP に戻して outD1  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/DTOPRGB2ImCHOP.tox) |
| [ImCHOP2TOPRGB](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Image/ImCHOP2TOPRGB/) | 画像の CHOP（H·W チャンネル × 3 サンプル）を、幅 Win の画像 TOP に戻す（TOPRGB2ImCHOP の逆）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/ImCHOP2TOPRGB.tox) |
| [TOPRGB2ImCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Image/TOPRGB2ImCHOP/) | 画像 TOP を、AutoDiff で使う画像の CHOP（画素 × 色の行列）にする。H·W チャンネル（画素、左下から行ごと）× 3 サンプル（R, G,  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/Image/TOPRGB2ImCHOP.tox) |

### AutoDiff/NN

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [InitPattern](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/InitPattern/) | ニューラルネットの重みの初期値（乱数の行列 Chans × Samples）。Mode で初期化の方法を選ぶ: He（ReLU 向け、正規分布、分散 2/入力数 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/InitPattern.tox) |
| [NNAdamW](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNAdamW/) | AdamW の 1 ステップ: 学習するパラメータ（target）を、その勾配（deriv）で更新した値を出す。外の Feedback CHOP で out1  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNAdamW.tox) |
| [NNAdaptConv2d](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNAdaptConv2d/) | 出力の大きさ（Outw × Outh）を決めて畳み込む層。入力の大きさからカーネルとストライドを自動で決め（DAdaptIm2Col）、NNLinear で O | Col2ImCHOP, DotCHOP, Im2ColCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNAdaptConv2d.tox) |
| [NNConv2d](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNConv2d/) | 学習する 2 次元畳み込み層。画像の CHOP を im2col でパッチの列にし、NNLinear で Outchan チャンネルの特徴にする。逆伝播では c | Col2ImCHOP, DotCHOP, Im2ColCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNConv2d.tox) |
| [NNL2Loss](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNL2Loss/) | 平均二乗誤差（L2 損失）L = mean((estimated − target)²) と、estimated についての勾配 dL/d(estimated) | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNL2Loss.tox) |
| [NNLinear](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNLinear/) | 学習する全結合層 y = x · W + b。重み W（入力のサンプル数 × Outsize）は He の初期化、バイアス b は 0 から始め、D1 に入れた | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/NNLinear.tox) |
| [SimpleConvNN](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/SimpleConvNN/) | 画像から target（CHOP）を当てるように、その場で学習する小さな畳み込みネット（3×3 畳み込み → 色の max → 2×2 畳み込み → L2 正規 | Col2ImCHOP, DotCHOP, Im2ColCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/SimpleConvNN.tox) |
| [SimpleNN](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/SimpleNN/) | その場で学習する小さな 2 層のニューラルネット（全結合 → L2 正規化 → Leaky ReLU → 全結合）。in1 から target を当てるように、 | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/AutoDiff/NN/SimpleNN.tox) |

### Geometry

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [4DTorus](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/4DTorus/) | 4 次元のトーラス（クリフォードトーラス風）を 3 次元に射影した点群。4D の 2 つの面（xw と zw）で回転させてから、透視投影（Projection  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/4DTorus.tox) |
| [CubeRender](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/CubeRender/) | 立方体（Box SOP、1 辺 1）を、ライト付きのカメラで描いた画像を出す。回転・大きさ・カメラの位置と視野角をパラメータで変えられる。3D の向きや投影の確 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/CubeRender.tox) |
| [InverseStereographicProjection](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/InverseStereographicProjection/) | 3 次元の点を 3 次元球面 S³（4 次元の単位球面）の上に持ち上げる（逆立体射影）: (2x, \|x\|² − 1) / (\|x\|² + 1)。4D で回転さ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/InverseStereographicProjection.tox) |
| [Loxodrome](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/Loxodrome/) | ロクソドローム（球面上の等角航路のらせん）をもとにした曲線の座標を出す。半径 R、経度の角度 T、傾き A から、x = R·cos T / cosh(A·T) | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/Loxodrome.tox) |
| [LoxodromeDirection](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/LoxodromeDirection/) | 球面上の各点で、経線と一定の角度 α をなす方向（ロクソドローム・等角航路の向き）の単位ベクトルを出す。Center を中心、Axis を極とする球面で考える。 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/LoxodromeDirection.tox) |
| [SquarePyramid](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/SquarePyramid/) | 正四角錐の SOP（底面の 1 辺 A、高さ H、底面の中心が原点、頂点が下向き）。インスタンスの元の形に使う。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/SquarePyramid.tox) |
| [StereographicProjection](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/StereographicProjection/) | 4 次元の点（3 次元球面 S³ の上）を、北極 w = 1 から 3 次元へ立体射影する: P = xyz / (1 − w)。InverseStereogr | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/StereographicProjection.tox) |

### Geometry/TriangleTile

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [BigsiteTriangles](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/TriangleTile/BigsiteTriangles/) | 東京ビッグサイトの三角ドームのような、三角形を三角形に敷き詰めた面の、各小三角形の位置・回転・向き（上向き / 下向き）を出す。インスタンスでパネルを並べるのに | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/BigsiteTriangles.tox) |
| [InverseTriangleTriangleTileIdx](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/TriangleTile/InverseTriangleTriangleTileIdx/) | 三角形の中の三角形タイルの (j, i) から通し番号を出す: idx = (N + 1 − j)·j + i。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/InverseTriangleTriangleTileIdx.tox) |
| [TriangleRowIdx](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/TriangleTile/TriangleRowIdx/) | 大きな三角形を小さな三角形で敷き詰めたときの、通し番号 i から行の番号 j を出す。行 j には N − 2j 個の三角形があり（0 行目に N 個、1 行目 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleRowIdx.tox) |
| [TriangleTriangleTileIdx](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/TriangleTile/TriangleTriangleTileIdx/) | 三角形の中の三角形タイルの通し番号を、(j, i)（j = 段、i = 段の中の位置）に変える。InverseTriangleTriangleTileIdx の | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleTriangleTileIdx.tox) |
| [TriangleTriangleTilesNeighbors](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/TriangleTile/TriangleTriangleTilesNeighbors/) | 三角形の中の三角形タイルで、各タイル (j, i) の隣（左右と、上か下の 3 つ）の通し番号を出す。上向き（i が偶数）の三角形は 1 つ下の段の i + 1 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Geometry/TriangleTile/TriangleTriangleTilesNeighbors.tox) |

### Image/Color

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [ColorConvert](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Color/ColorConvert/) | 画像の色空間を変換する。RGB / HSV / YCbCr / L\*a\*b\* のどれからどれへでも、From と To で選ぶ。変換はすべて RGB を経 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Color/ColorConvert.tox) |

### Image/Compression

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [BlockDCT](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/BlockDCT/) | 画像のブロック DCT（離散コサイン変換）と、その逆変換。画像を Block × Block 画素のブロックに分け、ブロックごとに 2 次元の DCT-II（直 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/BlockDCT.tox) |
| [DCTBasis](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/DCTBasis/) | ブロック DCT の基底パターンの一覧（JPEG の教科書に出てくる 8 × 8 = 64 枚の模様の表）。左上が一様な面（DC）で、右へ行くほど横方向に、下へ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTBasis.tox) |
| [DCTCompress](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/DCTCompress/) | 画像を JPEG と同じ流れで圧縮して、バイト列にする。画像 → 色空間の変換（ColorConvert、RGB → YCbCr。Cb, Cr は 0.5 を引 | HuffmanCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTCompress.tox) |
| [DCTDecompress](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/DCTDecompress/) | DCTCompress のバイト列を画像に戻す。ハフマン復号（Huffman CHOP）→ ジグザグの逆（ZigZag）→ 逆量子化（DCTQuantize）→ | HuffmanCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTDecompress.tox) |
| [DCTQuantize](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/DCTQuantize/) | ブロック DCT の係数の量子化（粗く丸める）と、その逆。圧縮で情報を捨てる段にあたる。係数を「きざみ幅」で割って整数に丸める: q = round(c ÷ s | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/DCTQuantize.tox) |
| [ZigZag](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Compression/ZigZag/) | ブロックの中をジグザグ順に並べ替える（JPEG のジグザグスキャン）と、その逆。Block × Block 画素のブロックごとに、左上から斜めに往復する順（(0 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Compression/ZigZag.tox) |

### Image/Effect

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [BlackFrame](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/BlackFrame/) | 画像の縁を黒くぼかして落とす（額縁・周辺減光）。中央の四角（大きさ 1 − Borderwidth）だけを残し、その外側を Softness のぼかしで黒にする | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/BlackFrame.tox) |
| [CrossFade](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CrossFade/) | 映像の残像・なめらかさ（時間方向のクロスフェード）。前のフレームの結果と今の入力を Crsr の割合で混ぜ続ける（フィードバック）。Crsr が大きいほど動きが | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CrossFade.tox) |
| [CurlNoise](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CurlNoise/) | カールノイズの流れで画像を流す（液体・煙のように渦を巻いて流れる歪み）。ポテンシャル（ノイズ画像）の勾配を 90° 回した速度場で、各ピクセルの位置を毎フレーム | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CurlNoise.tox) |
| [CurlNoiseFlow](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CurlNoiseFlow/) | カールノイズの流れで画像を流す（Image/Effect/CurlNoise の発展版）。ポテンシャルを 0〜1 に正規化し、その勾配を 90° 回した速度場で | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/CurlNoiseFlow.tox) |
| [Datamosh](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/Datamosh/) | データモッシュ（mp4 の処理落ちで、前の映像が部分的に残ったまま動きに引きずられる乱れ）をリアルタイムで作る。動画の圧縮と同じ考え方で、保持している絵をブロッ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/Datamosh.tox) |
| [HuffmanGlitch](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/HuffmanGlitch/) | 圧縮データを壊して復号するグリッチ（壊れた JPEG のような崩れ）。画像を JPEG と同じ流れで（既定では YCbCr にしてから）圧縮し（DCTCompr | BitFlipCHOP, HuffmanCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/HuffmanGlitch.tox) |
| [ImagePopup](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/ImagePopup/) | 画像を何枚も、ランダムな位置にポップアップさせる。in2 の y0 チャンネルの各サンプルが画像 1 枚にあたり、その値が画像の大きさになる（0 で見えない）。 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ImagePopup.tox) |
| [PixelSorter](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/PixelSorter/) | ピクセルソート。画像の線(行・列・斜めの線)ごとに、対象のピクセルを点数の順に並べ替える。対象でないピクセルは動かない。   | PixelArgSorterTOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/PixelSorter.tox) |
| [Pixelate](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/Pixelate/) | モザイク（ピクセル化）。画像を (1 − Rate) 倍の解像度に最近傍で縮めてから、元の解像度に最近傍で戻すので、四角いブロックになる。Mix で元の画像と混 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/Pixelate.tox) |
| [RetroWindow](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/RetroWindow/) | 画像を昔のパソコン風のウィンドウの枠に入れる。角の丸い青いタイトルバーの枠と、右上の赤い閉じるボタン（×）を重ねる。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/RetroWindow.tox) |
| [ScanLine](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/ScanLine/) | ブラウン管風の走査線。黒から白への縦のグラデーションを細かく繰り返した縞を、画像に掛け合わせる。Time で縞の明暗を入れ替える（毎フレーム 0 と 1 を切り | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ScanLine.tox) |
| [ShiftRGB](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/ShiftRGB/) | RGB を別々にずらして重ねる（色収差・RGB ずれのグリッチ）。R・G・B をそれぞれ Shift の x, y だけ平行移動し、z を強さとして掛けてから加 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/ShiftRGB.tox) |
| [SoftFade](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/SoftFade/) | 残像のエフェクト。画面の変化したところだけ（重ねた結果との差が大きい所）を、残像のようにやわらかく重ねていく。Freeze で今の状態を止める。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Effect/SoftFade.tox) |

### Image/Feature

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [HsvVector](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Feature/HsvVector/) | 画像を HSV にして、各画素を円錐の座標 (s·v·cos h, s·v·sin h, v) にした点の列を CHOP（x, y, z）で出す。色の分布を 3 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Feature/HsvVector.tox) |
| [ImgFeat](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Feature/ImgFeat/) | 画像の小さな特徴ベクトル（75 個の値）。5×3 に縮めた画像の色を、色相の円の上の点 (s·v·sin h, s·v·cos h) にしたもの（15 画素 × | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Feature/ImgFeat.tox) |

### Image/Filter

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [Dilation](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Dilation/) | 2 値画像の膨張（モルフォロジー）。白い部分を 1 px 太らせる（3×3 の近くに白があれば白）。マスクの穴埋めや、細い線を太くするのに使う。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/Dilation.tox) |
| [Erosion](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Erosion/) | 2 値画像の収縮（モルフォロジー）。白い部分を 1 px 細らせる（3×3 がすべて白のときだけ白）。マスクの小さなゴミを消したり、縁を内側に寄せるのに使う。8 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/Erosion.tox) |
| [Sobel](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Sobel/) | Sobel フィルタで縁（明るさの勾配）を出す。Sobelx で横方向の勾配 Gx、Sobely で縦方向の勾配 Gy、両方オンで縁の強さ \|Gx\| + \|Gy | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Filter/Sobel.tox) |

### Image/Math

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [Alpha2RGBA](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/Alpha2RGBA/) | アルファを RGBA の全チャンネルに写す（1 チャンネルの値を、ほかの画像に掛けられる形にする）。32 bit float。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/Alpha2RGBA.tox) |
| [DotRGB](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/DotRGB/) | 2 つの画像の画素ごとの内積 r₁r₂ + g₁g₂ + b₁b₂ を出す（アルファは使わない）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/DotRGB.tox) |
| [LimitMagnitudeRGB](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/LimitMagnitudeRGB/) | RGB ベクトルの長さを Magnitude 以下に抑える（長いものだけ向きを保って Magnitude に縮め、短いものはそのまま）。力や速度の上限に使う。  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/LimitMagnitudeRGB.tox) |
| [MagnitudeRGB](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/MagnitudeRGB/) | 各画素の RGB をベクトルとみた長さ √(r² + g² + b²) を出す（アルファは使わない）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MagnitudeRGB.tox) |
| [MaskAlpha](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/MaskAlpha/) | target に maskAlpha のアルファを掛ける（アルファ = 0〜1 の重みやマスク）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MaskAlpha.tox) |
| [MaskedAverage](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/MaskedAverage/) | マスク付きの平均: Σ(target × マスク) ÷ Σ(マスク)。Scope で、画像全体・行ごと・列ごとのどれで平均するかを選ぶ（N×N のペアの画像なら | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/MaskedAverage.tox) |
| [NormalizeRGB](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/NormalizeRGB/) | 各画素の RGB ベクトルを長さ 1 にする（長さは 0.0001 で下限を付けて割るので、0 ベクトルでも発散しない）。長さも別の出力で出す。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/NormalizeRGB.tox) |
| [PositionsPairDist](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/PositionsPairDist/) | 1 行 N 画素の点（RGB = 位置）から、全ペアの差を N×N の画像で出す。画素 (i, j) に点 i と点 j の差を入れる。 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/PositionsPairDist.tox) |
| [SafeDivide](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/SafeDivide/) | in1 ÷ in2 をチャンネルごとに、0 で割らないように出す（in1 × SafeInverse(in2)）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeDivide.tox) |
| [SafeDivideAlpha](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/SafeDivideAlpha/) | in1 の RGBA 全部を、in2 のアルファで割る（0 で割らない）。重みの合計で割って平均にするときに使う。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeDivideAlpha.tox) |
| [SafeInverse](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Math/SafeInverse/) | 各チャンネルの逆数 1/x を、0 で割らないように出す: sign(x) / max(\|x\|, Eps)。0 は 0 のまま。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Image/Math/SafeInverse.tox) |

### Learning/Audio

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [SpectAE](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Audio/SpectAE/) | スペクトルを bin ごとに移動平均・分散で正規化してから 1 本のベクトルに並べ、MLP のオートエンコーダで自分自身を再構成するよう、毎フレーム学習します。 | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Audio/SpectAE.tox) |
| [SpectUNet](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Audio/SpectUNet/) | スペクトルを bin ごとに移動平均・分散で正規化し、1 次元の UNet(畳み込み)で自分自身を再構成するよう、毎フレーム学習します。入力への勾配 \|dL/d | Col2ImCHOP, DotCHOP, Im2ColCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Audio/SpectUNet.tox) |

### Learning/AutoVJ

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [AutoVJ](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/AutoVJ/AutoVJ/) | 映像と音から、VJ のパラメータ Nump 個（0〜1）を出し、その場で学習し続けるネット。目的は「映像の情報の差分」と「音の情報の差分」の大きさの同期（相対的 | Col2ImCHOP, DotCHOP, Im2ColCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/AutoVJ/AutoVJ.tox) |
| [AutoVJS](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/AutoVJ/AutoVJS/) | 映像と音のスペクトルから、VJ のパラメータ Nump 個（0〜1）を出し、その場で学習し続けるネット。AutoVJ の改良版で、「変化の量」の代わりに「驚き（ | Col2ImCHOP, DotCHOP, Im2ColCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/AutoVJ/AutoVJS.tox) |

### Learning/Classify

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [DigitClassifier](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Classify/DigitClassifier/) | 手書きの数字(0〜9)を当てる、学習済みの小さなニューラルネット。BoxCrop で切り出した箱の中身(out2)をそのままつなぐと、箱ごとに数字と確からしさを | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Classify/DigitClassifier.tox) |

### Learning/Embedding

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [SimpleEmbedding](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Embedding/SimpleEmbedding/) | オーディオを Echo State Network（リザバー）に通して、埋め込みベクトルにする。入力の各チャンネルを、毎フレームの音で更新されるリザバーの状態（ | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/SimpleEmbedding.tox) |
| [SimpleImageEmbedding](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Embedding/SimpleImageEmbedding/) | 画像の各画素の色（R, G, B）を毎フレーム、小さなリザバー（SimpleEmbedding、3 次元）に通して、画素ごとの埋め込みを色にした画像を作る（時間 | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/SimpleImageEmbedding.tox) |
| [UMAPEmbedding](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Embedding/UMAPEmbedding/) | Online parametric UMAP built from the AutoDiff components. Each input channel is | DotCHOP | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Embedding/UMAPEmbedding.tox) |

### Learning/Online

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [InfoDiff](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/InfoDiff/) | 入力の「情報の差分」の大きさ。各要素（チャンネル × サンプルのそれぞれ）の 1 フレームの差分 Δx を、その要素のオンラインの平均・分散で 1σ に正規化し | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/InfoDiff.tox) |
| [OnlineGHA](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/OnlineGHA/) | 入力をオンライン PCA（Sanger 則 / 一般化ヘブ則 GHA）で k 個の主成分に埋め込む。y = W(x − μ)、W ← W + η(y xᵀ −  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineGHA.tox) |
| [OnlineRLS](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/OnlineRLS/) | 線形回帰 y ≈ θ · [f, 1] を、忘却つきの逐次最小二乗（RLS）で毎フレーム更新する。最後の係数がバイアス。新しいデータほど重く、実効的な窓は 1/ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineRLS.tox) |
| [OnlineStandardize](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/OnlineStandardize/) | 入力の各要素（チャンネル × サンプルのそれぞれ）を、その要素のオンラインの平均と分散で標準化する: z = (x − μ)/√(v + 10^Floorlog | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Online/OnlineStandardize.tox) |

### Learning/Visualize

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [ConvEdges](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/ConvEdges/) | 畳み込み層（NNConv2d、パディングなし）のつながりを、3 次元の線の POP にする。出力の各画素・各チャンネルから、カーネルが見ている入力のパッチ（K  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/ConvEdges.tox) |
| [ConvVolume](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/ConvVolume/) | 畳み込みネットの 1 つの層の特徴マップ（高さ × 幅 × チャンネル）を、3 次元の点の POP にする（値 1 つにつき点 1 つ）。各チャンネルの W × | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/ConvVolume.tox) |
| [LayerEdges](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/LayerEdges/) | ネットの層と層の間の重みを、線の POP にする（重み 1 つにつき線 1 本）。前の層のノード（x = Xfrom、y = Yfrom ± Hfrom に並ぶ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/LayerEdges.tox) |
| [LayerNodes](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/LayerNodes/) | ネットの 1 つの層のノードを、点の POP にする（値 1 つにつき点 1 つ）。x = X、y = Y ± H に縦に並べ、活性で明るさと大きさを変える。L | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/LayerNodes.tox) |
| [NNLinearView](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/NNLinearView/) | 全結合層（NNLinear）のノードと重みを、POP でリアルタイムに描く。左に入力のノード、右に出力のノードを縦に並べ、入力 i と出力 j を結ぶ線を重み  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/NNLinearView.tox) |
| [NetGraph](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Visualize/NetGraph/) | ネットの層と重みを、表に書くだけで自動で並べて描く（ニューラルネットの可視化）。layers の行ごとに層のノード（LayerNodes）を、edges の行ご | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Learning/Visualize/NetGraph.tox) |

### Math

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [AbsClamp](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/AbsClamp/) | 値を −Scale〜Scale に抑える（はみ出したサンプルは ±Scale に、内側はそのまま）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/AbsClamp.tox) |
| [AllAnalyze](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/AllAnalyze/) | 全チャンネル・全サンプルをまとめて 1 つの値にする（Operation で合計・平均・最大・最小）。Analyze CHOP（サンプル方向）と Math CH | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/AllAnalyze.tox) |
| [ColRowToIdx](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/ColRowToIdx/) | 列と行の番号から、1 次元の通し番号を出す: idx = 列 + 行 × Colmax。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/ColRowToIdx.tox) |
| [Digamma](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Digamma/) | ディガンマ関数 ψ(x)（ln Γ の微分）の近似 ln(x − ½)。x が大きいほど正確（x = 11 で 2.3514、正しい値は 2.3518。x =  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Digamma.tox) |
| [Flip](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Flip/) | サンプルの順番を逆にする（[a, b, c] → [c, b, a]）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Flip.tox) |
| [GaussianAffinity](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/GaussianAffinity/) | サンプルどうしの似ている度合いの行列（ガウス類似度）: 行列の (i, j) = exp(−(xᵢ − xⱼ)² / std(x))。N サンプルから N チャ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/GaussianAffinity.tox) |
| [GlobalStdNorm](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/GlobalStdNorm/) | フレームをまたいだ移動平均と移動分散（Alpha の指数移動平均）で、入力を標準化する: (x − 平均) / √分散。値の大きさが時間で変わる入力を、だいたい | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/GlobalStdNorm.tox) |
| [HoldFeedback](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/HoldFeedback/) | in1 を Rate の間隔でサンプル＆ホールドし、in2 を初期値にしてフィードバックで回す（一定間隔で状態を進めるシミュレーションのクロック）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/HoldFeedback.tox) |
| [LGamma](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/LGamma/) | ガンマ関数の対数 ln Γ(x) の近似（スターリングの公式 (x − ½)·ln x − x + ½·ln 2π + 1/(12x)）。x が大きいほど正確（ | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/LGamma.tox) |
| [LogSoftmax](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/LogSoftmax/) | ソフトマックスの対数: (x − max)/T − ln Σ exp((x − max)/T)。確率の対数が要る学習の損失（交差エントロピー）に使う。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/LogSoftmax.tox) |
| [MinClamp](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/MinClamp/) | 下限でクリップする: max(x, Min)。0 で割る・log(0) を避けるための下限に使う。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/MinClamp.tox) |
| [Mod](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Mod/) | 床関数の余り x − floor(x/m)·m と商 floor(x/m)。余りは常に 0〜m（負の数でも正の余り）。割る数 m は in2 の CHOP で与 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Mod.tox) |
| [PeriodicTanh](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/PeriodicTanh/) | 角度の列を、なめらかな矩形波 tanh(k·sin θ) / tanh(k) にする（k = Constk が大きいほど矩形に近く、小さいほど正弦波に近い）。入 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/PeriodicTanh.tox) |
| [Random](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Random/) | 乱数の行列（Sizeh チャンネル × Sizew サンプル。TOP と同じく w が横 = サンプル、h が縦 = チャンネル）。Mode 0 で一様乱数（M | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Random.tox) |
| [Sigmoid](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Sigmoid/) | シグモイド 1 / (1 + exp(−Gain·x))。0〜1 のなめらかなスイッチ（x = 0 で 0.5）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Sigmoid.tox) |
| [Softmax](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Softmax/) | サンプルの列 x のソフトマックス: exp((x − max)/T) / Σ exp((x − max)/T)。合計が 1 の確率の列になる（max を引いて | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Softmax.tox) |
| [Std](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Std/) | サンプルの列の標準偏差（母標準偏差 √(平均((x − 平均)²))）を 1 サンプルで出す。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Std.tox) |
| [Threshold](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Threshold/) | しきい値より上（Lower で下）を 1、それ以外を 0 にする。Inclusive でしきい値ちょうども含める。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Threshold.tox) |
| [TimeLayerNorm](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/TimeLayerNorm/) | 時間方向のレイヤー正規化: 直近 10 フレームの、チャンネル平均の平均と標準偏差で入力を標準化する（だいたい −1〜1 に収まる z スコア）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/TimeLayerNorm.tox) |
| [TorusMod](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/TorusMod/) | 値を 0〜Max の範囲にループさせる（トーラス状の巻き戻し: ((x mod Max) + Max) mod Max）。Max は in2 で与えるか、繋がな | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/TorusMod.tox) |

### Math/Matrix

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [RotMatrix2D](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Matrix/RotMatrix2D/) | 2 次元の回転行列を 2×2 の表（Table DAT）で出す: [[cos θ, sin θ], [−sin θ, cos θ]]。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/RotMatrix2D.tox) |
| [SobelKernel](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Matrix/SobelKernel/) | Sobel フィルタの 3×3 の係数の表。outX = [[−1, 0, 1], [−2, 0, 2], [−1, 0, 1]]（横方向の勾配）、outY は | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/SobelKernel.tox) |
| [SpectralRadius](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Matrix/SpectralRadius/) | 行列 W のスペクトル半径（いちばん大きい固有値の絶対値）を求める（numpy で正確に計算。W が変わったときだけ計算し直す）。リザバー計算などで、重み行列の | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Math/Matrix/SpectralRadius.tox) |

### Sequence

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [BeatBase](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Sequence/BeatBase/) | ドラムのステップシーケンサーの 1 パート。時間（in1、秒）から、拍子・細分化・スウィング・ユークリッドリズムで決まるタイミングに 0/1 のゲートを出す。E | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Sequence/BeatBase.tox) |
| [ValueToTrigger](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Sequence/ValueToTrigger/) | 値を Bins 個のビン（Min〜Max を等間隔に分けた点）のうち、いちばん近いもののワンホットにする。値をノートやボタンの番号に振り分けるのに使う。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Sequence/ValueToTrigger.tox) |

### Simulation/Boid

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [Boid](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Boid/Boid/) | ボイド（群れのシミュレーション）。Points 個の点を円の上に置き、ランダムな速度を与えて、フィードバックで毎フレーム次の 4 つの力を足して動かす。鳥や魚の | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/Boid.tox) |
| [BoidOut](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Boid/BoidOut/) | CHOP の位置・速度から、BoidSimulationStep をフィードバックで回して、ボイドの位置を CHOP（x, y, z）で出す。Reset がオン | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/BoidOut.tox) |
| [BoidSimulationStep](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Boid/BoidSimulationStep/) | GPU（TOP）のボイドの 1 ステップ。全ペアの距離を正規化して、距離の帯ごとに力を切り替える。近い（< Septhres）と分離、中くらい（< Alithr | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/BoidSimulationStep.tox) |
| [SteerRGB](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Boid/SteerRGB/) | 舵取りの力（Reynolds の steering）: 目標の速度 dst − 今の速度 src を、長さ Max 以下に抑えて出す。ボイドなどで「向きたい方向 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Boid/SteerRGB.tox) |

### Simulation/Galaxy

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [GalaxyBase](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/GalaxyBase/) | 銀河の初期状態の点群。中心のバルジ（球状、全体の Bulgerate の割合）と、ThinDisk で作る円盤から成る。円盤の点には、中心の重力とつり合う回転速 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/GalaxyBase.tox) |
| [SoftenCenterGravityAcc](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/SoftenCenterGravityAcc/) | 点群の重心に向かう重力の加速度を、各点に書き込む（ソフトニング付き: a = −Gm·(P−c) / (\|P−c\|² + Soft²)^(3/2)、c = 全点 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/SoftenCenterGravityAcc.tox) |
| [SoftenCenterGravityVel](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/SoftenCenterGravityVel/) | 点群の重心のまわりを回る円軌道の速度を、各点に書き込む: Vel = (Up × d) · √(Gm / (\|d\|² + Soft²)^(3/2))（d = P | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/SoftenCenterGravityVel.tox) |
| [ThinDisk](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/ThinDisk/) | 薄い円盤状の点群（銀河の円盤など）。半径方向は指数分布（中心ほど密）、厚みは Height で、外側ほど厚くなる（Flare）。   | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Galaxy/ThinDisk.tox) |

### Simulation/LifeGame

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [NeighborLifeGame](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/LifeGame/NeighborLifeGame/) | ライフゲームの 1 世代分。状態（0/1 の列）と、各セルの近傍の番号の表から、次の状態を出す。近傍が Under 以下か Over 以上で死、死んだセルは近傍 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/NeighborLifeGame.tox) |
| [RawNeighborLifeGame](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/LifeGame/RawNeighborLifeGame/) | ライフゲームの 1 世代の計算の中身。各セルの近傍の生きている数（環境）を数え、外から与えたルールで次の状態を作る: 次 = 生 × (1 − 死のルール) + | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/RawNeighborLifeGame.tox) |
| [SimpleLifeGame](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/LifeGame/SimpleLifeGame/) | ライフゲームの 1 世代の計算の中身。各セルの近傍の生きている数（環境）を数え、外から与えたルールで次の状態を作る: 次 = 生 × 生存のルール + 死 ×  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/SimpleLifeGame.tox) |
| [SquareLifeGame](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/LifeGame/SquareLifeGame/) | 正方格子のライフゲーム（Sizew × Sizeh）。ランダムな初期状態から、Hz の速さで世代を進める。8 近傍（自分は数えない）で、近傍が Under 以下 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/SquareLifeGame.tox) |
| [SquareLifeGameNeighborIdx](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/LifeGame/SquareLifeGameNeighborIdx/) | 正方格子（Sizew × Sizeh）の各セルの 8 近傍の番号の表を作る（NeighborLifeGame の inNeighborIdx 用）。端の扱いを  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/LifeGame/SquareLifeGameNeighborIdx.tox) |

### Simulation/Population

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [BirthDistribution](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Population/BirthDistribution/) | 年齢の属性から、その年齢の出生率（1 年あたり、年齢別出生率）を点ごとに出す（人口シミュレーション用）。曲線は Range1 歳から始まるガンマ分布の形で、平均 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Population/BirthDistribution.tox) |
| [MarriageDistribution](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Population/MarriageDistribution/) | 年齢の属性から、その年齢の初婚率（1 年あたり）を点ごとに出す（人口シミュレーション用）。Coale–McNeil の標準的な初婚の曲線: g(a) = Mra | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/Population/MarriageDistribution.tox) |

### Simulation/ReactionDiffusion

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [GrayScott](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/ReactionDiffusion/GrayScott/) | Gray-Scott 反応拡散のシミュレーション。2 種類の物質 u, v が拡散しながら反応する式（∂u/∂t = Du∇²u − uv² + F(1−u)、 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/ReactionDiffusion/GrayScott.tox) |

### Simulation

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [SpeedUpdate](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/SpeedUpdate/) | 速度と位置を 1 ステップ進める（シンプレクティック・オイラー法: Vel += Acc·Dt、P += Vel·Dt）。中にフィードバックはないので、Feed | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Simulation/SpeedUpdate.tox) |

### UV

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [PrintGalleryUV](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/PrintGalleryUV/) | エッシャー「版画画廊」風の、ドロステ効果（無限に入れ子になる渦）の UV マップ。対数極座標で画像をらせん状に繰り返す。Remap TOP で画像に当てると、画 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/PrintGalleryUV.tox) |
| [RTheta](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/RTheta/) | 極座標マップ。r チャンネルに中心からの距離、g チャンネルに角度（0〜1 で一周）を入れた画像を作る。Remap に使うと画像を極座標に展開でき、ramp や | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/RTheta.tox) |
| [identifyUV](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/identifyUV/) | 恒等 UV マップ（各ピクセルに自分の座標を入れた画像）を作る。r = u（左 0 → 右 1）、g = v（下 0 → 上 1）、b = 0、a = 1。Re | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/identifyUV.tox) |
| [lineDrawer](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/lineDrawer/) | 点列 CHOP を折れ線として画像の上に描く（GLSL）。Start〜End で線全体の長さのどの区間を描くかを決めるので、0→1 にアニメーションすると線が伸 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/lineDrawer.tox) |
| [mandalaUV](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/mandalaUV/) | 万華鏡（マンダラ）状の UV マップ。角度を鏡映しながら N 回くり返した値を r に、中心からの距離を折り返した値を g に入れる。Remap TOP で画像 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/mandalaUV.tox) |
| [pinholeRadtan](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/pinholeRadtan/) | カメラのレンズ歪み（Brown-Conrady モデル: 半径方向 k1, k2 と接線方向 p1, p2）をかけた UV マップを作る。Remap TOP で | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/UV/pinholeRadtan.tox) |

### Utility

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [FrameDelay](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Utility/FrameDelay/) | 入力の CHOP を Frames フレーム遅らせて出す（形・チャンネル名はそのまま）。「1 フレーム前の値」が要るときに使う（差分、時刻をそろえる、など）。  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Utility/FrameDelay.tox) |

### Visualize

| パレット | 内容 | 依存プラグイン | ダウンロード |
|---|---|---|---|
| [BoxCrop](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/BoxCrop/) | 箱の一覧(CHOP)が指す場所を画像から切り出して、同じ大きさのマスに並べる。検出したものを小さく並べて見せる表示や、箱の中身を分類器(ニューラルネットなど)に | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/BoxCrop.tox) |
| [BoxOverlay](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/BoxOverlay/) | 箱の一覧(CHOP)を、枠・ラベルとして画像に重ねて描く。検出枠やデータ表示の演出の「描く」部分で、箱をどう見つけたかには関係しない(BoxTrackCHOP  | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/BoxOverlay.tox) |
| [ChannelLissajous](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/ChannelLissajous/) | CHOP の 1 番目のチャンネルを x、2 番目を y にして点を線で結んだ図（XY スコープ）を描く。タイムスライスを Samples 個に間引いてから描く | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/ChannelLissajous.tox) |
| [Goniometer](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/Goniometer/) | ゴニオメーター（ステレオの位相・広がりを見るスコープ）。L−R を横、L+R を縦にして（1/√2 倍で 45° 回した形）点で描く。モノラルの音は縦の線、逆相 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/Goniometer.tox) |
| [HzLissajous3D](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/HzLissajous3D/) | Lissajous を奥行き方向に伸ばした 3D の線。t に沿って z を 0 → −Depth に進め、手前から奥へ色（Color → ColorEnd）と | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/HzLissajous3D.tox) |
| [HzLissajousAnimated](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/HzLissajousAnimated/) | Lissajous の、位相が時間で回る版。x と y の位相を、それぞれの周波数（in1, in2 の値）の速さで進めるので、図形が回転・変形して動き続ける。 | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/HzLissajousAnimated.tox) |
| [Lissajous](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/Lissajous/) | 2 つの値を x と y の周波数比にしたリサジュー図形を描く: x = cos(2π·a·t)、y = sin(2π·b·t)（t = 0〜1）。a は in | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/Lissajous.tox) |
| [PlanckianLocus](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/PlanckianLocus/) | 黒体放射の色（色温度）の横グラデーション。横軸は 1667 K（左端）〜 25000 K（右端）の等間隔で、6500 K（昼光の白）が 0.207 の位置。色は | — | [.tox](https://github.com/Shinh0707/TouchDesignerShareDatas/raw/main/Palettes/Visualize/PlanckianLocus.tox) |
