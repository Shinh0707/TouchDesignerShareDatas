日本語 | [English](./README.en.md)

# Touch Designer Plugins  
自作したTouchDesigner用の追加機能などを置いてます.  

**プラグインのダウンロード・説明・パラメータ一覧はサイトにまとめています → [TouchDesigner Plugins](https://shinh0707.github.io/TouchDesignerShareDatas/)**  
- [Palette](#palette)  
- [Plugin](#plugin)  
	- [導入](#plugin導入)  
	- [説明](#plugin説明)  
		- [CHOP](#chop)
		- [TOP](#top)
  
## Palette  
TouchDesignerの左側のタブにあるプリセットみたいなやつです.  
![Paletteタブ](doc/Palette.png "Paletteの画像")  
  
<!-- tdp:palettes:begin (tools/palettes.py) -->
[サイトのパレット一覧](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/)に、説明・パラメータ・使用例・依存プラグインがあります。
`.tox` をネットワークにドラッグ & ドロップして使います。*詳細は[https://derivative.ca/UserGuide/Palette](https://derivative.ca/UserGuide/Palette)を確認してください*

- [AudioQuantizeRate](Palettes/Audio/Feature/AudioQuantizeRate.tox) — オーディオが Q ビットの段（±1 を 2^Q − 1 段に分けた格子）にどれだけ乗っているか（ビットクラッシュ・ローフ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/AudioQuantizeRate/), [使用例](Palettes/Audio/Feature/AudioQuantizeRateExample.toe))
- [CrestFactor](Palettes/Audio/Feature/CrestFactor.tox) — クレストファクター（ピーク ÷ RMS）。音のとがり具合（打撃音ほど大きく、正弦波で √2 ≈ 1.41、矩形波で 1）… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/CrestFactor/), [使用例](Palettes/Audio/Feature/CrestFactorExample.toe))
- [RMSNorm](Palettes/Audio/Feature/RMSNorm.tox) — RMS で割って大きさをそろえる（x / RMS(x)）。音量によらない波形の形を比べたいときに使う。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/RMSNorm/), [使用例](Palettes/Audio/Feature/RMSNormExample.toe))
- [VU](Palettes/Audio/Feature/VU.tox) — VU メーター。整流した信号を 2 次のフィルタ（減衰比 Dump、固有角周波数 Angf：VU 規格の約 300 ms… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/VU/), [使用例](Palettes/Audio/Feature/VUExample.toe))
- [ZCR](Palettes/Audio/Feature/ZCR.tox) — ゼロ交差率（隣り合うサンプルで符号が変わる割合）。ノイズや高い音ほど大きく、低い音ほど小さい。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Feature/ZCR/), [使用例](Palettes/Audio/Feature/ZCRExample.toe))
- [F0](Palettes/Audio/Pitch/F0.tox) — 基本周波数（音の高さ）を Hz で推定する。参照したスペクトルをもう一度 Audio Spectrum（FFT 1638… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/F0/), [使用例](Palettes/Audio/Pitch/F0Example.toe))
- [F0Note](Palettes/Audio/Pitch/F0Note.tox) — F0 で推定した音の高さを、整数の MIDI ノート番号で出す（F0 → F0ToNote → 四捨五入）。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/F0Note/), [使用例](Palettes/Audio/Pitch/F0NoteExample.toe))
- [F0ToNote](Palettes/Audio/Pitch/F0ToNote.tox) — 周波数 Hz を MIDI ノート番号（小数）に変換する: 69 + 12·log2(f / 440)。A4 = 440… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/F0ToNote/), [使用例](Palettes/Audio/Pitch/F0ToNoteExample.toe))
- [NumToNoteTrigger](Palettes/Audio/Pitch/NumToNoteTrigger.tox) — ノート番号を 128 サンプルのワンホットに変換する。入力のノート番号と ±0.01 以内のインデックスだけが 1、ほか… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/NumToNoteTrigger/), [使用例](Palettes/Audio/Pitch/NumToNoteTriggerExample.toe))
- [PSGRatio](Palettes/Audio/Pitch/PSGRatio.tox) — 倍音のうち奇数次の占める割合（矩形波・PSG らしさ）。F0 を推定し、スペクトルの各ビンが何次の倍音に近いかを求めて、… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Pitch/PSGRatio/), [使用例](Palettes/Audio/Pitch/PSGRatioExample.toe))
- [BaseAudioSpect](Palettes/Audio/Spectrum/BaseAudioSpect.tox) — オーディオ CHOP を Audio Spectrum CHOP でスペクトルに変換する土台。ほかの AudioSpec… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/BaseAudioSpect/), [使用例](Palettes/Audio/Spectrum/BaseAudioSpectExample.toe))
- [BinFrequency](Palettes/Audio/Spectrum/BinFrequency.tox) — スペクトルの各ビンの中心周波数 f_k = k · fs / N（Hz）を、スペクトルと同じ長さのチャンネルで出す。fs… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/BinFrequency/), [使用例](Palettes/Audio/Spectrum/BinFrequencyExample.toe))
- [FFTSize](Palettes/Audio/Spectrum/FFTSize.tox) — 参照した Audio Spectrum CHOP の FFT サイズ N（= 2^(fftsize+6)）を定数で出す。… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/FFTSize/), [使用例](Palettes/Audio/Spectrum/FFTSizeExample.toe))
- [LogBinFrequency](Palettes/Audio/Spectrum/LogBinFrequency.tox) — ビン周波数を対数（オクターブ）軸に変換した x_k = log2(f_k) を出す。log2 の前に f_k を Fcl… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/LogBinFrequency/), [使用例](Palettes/Audio/Spectrum/LogBinFrequencyExample.toe))
- [MagnitudeDb](Palettes/Audio/Spectrum/MagnitudeDb.tox) — スペクトル振幅をデシベル y_k = 20·log10(|X_k|) に変換する。振幅は 0.001 で下限クランプ（-… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/MagnitudeDb/), [使用例](Palettes/Audio/Spectrum/MagnitudeDbExample.toe))
- [PowerSpectrum](Palettes/Audio/Spectrum/PowerSpectrum.tox) — 各サンプルの 2 乗 |x|²（振幅スペクトル → パワースペクトル）。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/PowerSpectrum/), [使用例](Palettes/Audio/Spectrum/PowerSpectrumExample.toe))
- [SpectralCentroid](Palettes/Audio/Spectrum/SpectralCentroid.tox) — スペクトル重心（明るさの指標）を Hz で出す。重心 = Σ E_k f_k / Σ E_k、E_k = |X_k|²。… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralCentroid/), [使用例](Palettes/Audio/Spectrum/SpectralCentroidExample.toe))
- [SpectralCentroidNorm](Palettes/Audio/Spectrum/SpectralCentroidNorm.tox) — スペクトル重心をナイキスト周波数で割って 0〜1 に正規化したもの: (Σ E_k f_k / Σ E_k) / (fs… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralCentroidNorm/), [使用例](Palettes/Audio/Spectrum/SpectralCentroidNormExample.toe))
- [SpectralFlatness](Palettes/Audio/Spectrum/SpectralFlatness.tox) — スペクトル平坦度（ノイズらしさ）。エネルギー E_k = |X_k|² の幾何平均 ÷ 算術平均で、0（純音・音程感が強… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralFlatness/), [使用例](Palettes/Audio/Spectrum/SpectralFlatnessExample.toe))
- [SpectralSlope](Palettes/Audio/Spectrum/SpectralSlope.tox) — スペクトル傾斜。横軸 log2(f)（xk）、縦軸 dB（yk）の最小二乗直線の傾きを dB/オクターブで出す。負に大き… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Spectrum/SpectralSlope/), [使用例](Palettes/Audio/Spectrum/SpectralSlopeExample.toe))
- [3DSphereMap](Palettes/Audio/Stereo/3DSphereMap.tox) — ステレオ信号を 3D の点列にする（ゴニオメーターの 3D 版）。各サンプルを、z = 区間内の位置（−1〜1）、y =… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/3DSphereMap/), [使用例](Palettes/Audio/Stereo/3DSphereMapExample.toe))
- [PanAngle](Palettes/Audio/Stereo/PanAngle.tox) — ステレオ信号の定位（左右どちらに寄っているか）を −1〜1 で出す。左右の RMS の角度 atan2(L, R)（0°… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/PanAngle/), [使用例](Palettes/Audio/Stereo/PanAngleExample.toe))
- [PanAngleStereo](Palettes/Audio/Stereo/PanAngleStereo.tox) — PanAngle の、L と R を別々の CHOP で受ける版。2 つのモノラル信号のどちらが大きいかを −1〜1 で… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/PanAngleStereo/), [使用例](Palettes/Audio/Stereo/PanAngleStereoExample.toe))
- [PhaseCorrelation](Palettes/Audio/Stereo/PhaseCorrelation.tox) — 位相相関計（コリレーションメーター）。左右がどれだけ同じ形かを −1〜1 で出す: Σ L·R / √(Σ L² · Σ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/PhaseCorrelation/), [使用例](Palettes/Audio/Stereo/PhaseCorrelationExample.toe))
- [StereoWidth](Palettes/Audio/Stereo/StereoWidth.tox) — ステレオの広がり。Side（L−R）と Mid（L+R）のエネルギーから ΣS² / (ΣS² + ΣM²) を出す。0… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Audio/Stereo/StereoWidth/), [使用例](Palettes/Audio/Stereo/StereoWidthExample.toe))
- [DLeakyReLU](Palettes/AutoDiff/Activation/DLeakyReLU.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。Leaky ReLU y = x（x > 0）/ Slope · … ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Activation/DLeakyReLU/), [使用例](Palettes/AutoDiff/Activation/DLeakyReLUExample.toe))
- [DSigmoid](Palettes/AutoDiff/Activation/DSigmoid.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。シグモイド y = 1 / (1 + e^(−Gain·x))。D… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Activation/DSigmoid/), [使用例](Palettes/AutoDiff/Activation/DSigmoidExample.toe))
- [DSoftmax](Palettes/AutoDiff/Activation/DSoftmax.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。ソフトマックス y = softmax(x / Tempature… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Activation/DSoftmax/), [使用例](Palettes/AutoDiff/Activation/DSoftmaxExample.toe))
- [DBetaMode](Palettes/AutoDiff/BetaDist/DBetaMode.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。ベータ分布 Beta(a, b) の最頻値 y = (a − 1)… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/BetaDist/DBetaMode/), [使用例](Palettes/AutoDiff/BetaDist/DBetaModeExample.toe))
- [DBetaModeLL](Palettes/AutoDiff/BetaDist/DBetaModeLL.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。ベータ分布 Beta(a, b) の最頻値での確率密度の対数（ピー… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/BetaDist/DBetaModeLL/), [使用例](Palettes/AutoDiff/BetaDist/DBetaModeLLExample.toe))
- [DAdd](Palettes/AutoDiff/DAdd.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。足し算 y = a + b。D1 に「out1 についての損失の勾… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DAdd/), [使用例](Palettes/AutoDiff/DAddExample.toe))
- [DDiv](Palettes/AutoDiff/DDiv.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。割り算 y = a / b。D1 に「out1 についての損失の勾… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DDiv/), [使用例](Palettes/AutoDiff/DDivExample.toe))
- [DDot](Palettes/AutoDiff/DDot.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。行列の積 Y = A · B（チャンネルが行、サンプルが列）。D1… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DDot/), [使用例](Palettes/AutoDiff/DDotExample.toe))
- [DMul](Palettes/AutoDiff/DMul.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。掛け算（要素ごと）y = a · b。D1 に「out1 について… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DMul/), [使用例](Palettes/AutoDiff/DMulExample.toe))
- [DPow](Palettes/AutoDiff/DPow.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。べき乗 y = aᵇ。D1 に「out1 についての損失の勾配 d… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DPow/), [使用例](Palettes/AutoDiff/DPowExample.toe))
- [DSign](Palettes/AutoDiff/DSign.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。符号 y = sign(x)（−1 / 0 / 1）。D1 に「o… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DSign/), [使用例](Palettes/AutoDiff/DSignExample.toe))
- [DSquaredDiff](Palettes/AutoDiff/DSquaredDiff.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。要素ごとの差の 2 乗 y = (a − b)²。D1 に「out… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DSquaredDiff/), [使用例](Palettes/AutoDiff/DSquaredDiffExample.toe))
- [DSub](Palettes/AutoDiff/DSub.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。引き算 y = a − b。D1 に「out1 についての損失の勾… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/DSub/), [使用例](Palettes/AutoDiff/DSubExample.toe))
- [DAbs](Palettes/AutoDiff/Function/DAbs.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。絶対値 y = |x|。D1 に「out1 についての損失の勾配 … ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DAbs/), [使用例](Palettes/AutoDiff/Function/DAbsExample.toe))
- [DAdaptIm2Col](Palettes/AutoDiff/Function/DAdaptIm2Col.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。出力の大きさ（Outw × Outh）から、カーネルとストライドを… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DAdaptIm2Col/), [使用例](Palettes/AutoDiff/Function/DAdaptIm2ColExample.toe))
- [DAdaptMax](Palettes/AutoDiff/Function/DAdaptMax.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。アダプティブ max プーリング（PyTorch の Adapti… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DAdaptMax/), [使用例](Palettes/AutoDiff/Function/DAdaptMaxExample.toe))
- [DAvg](Palettes/AutoDiff/Function/DAvg.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。各チャンネルのサンプルの平均 y = mean(x)。D1 に「o… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DAvg/), [使用例](Palettes/AutoDiff/Function/DAvgExample.toe))
- [DConstAdd](Palettes/AutoDiff/Function/DConstAdd.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。定数を足す y = x + Value。D1 に「out1 につい… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DConstAdd/), [使用例](Palettes/AutoDiff/Function/DConstAddExample.toe))
- [DConstPow](Palettes/AutoDiff/Function/DConstPow.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。定数乗 y = x^Exponent。D1 に「out1 について… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DConstPow/), [使用例](Palettes/AutoDiff/Function/DConstPowExample.toe))
- [DCos](Palettes/AutoDiff/Function/DCos.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。余弦 y = cos x。D1 に「out1 についての損失の勾配… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DCos/), [使用例](Palettes/AutoDiff/Function/DCosExample.toe))
- [DDuplicate](Palettes/AutoDiff/Function/DDuplicate.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。1 つの値を 2 か所で使うための分岐。out1・out2 に i… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DDuplicate/), [使用例](Palettes/AutoDiff/Function/DDuplicateExample.toe))
- [DExp](Palettes/AutoDiff/Function/DExp.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。指数関数 y = eˣ。D1 に「out1 についての損失の勾配 … ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DExp/), [使用例](Palettes/AutoDiff/Function/DExpExample.toe))
- [DFullAvg](Palettes/AutoDiff/Function/DFullAvg.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。全チャンネル・全サンプルの平均 y = mean(x)。D1 に「… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DFullAvg/), [使用例](Palettes/AutoDiff/Function/DFullAvgExample.toe))
- [DIm2Col](Palettes/AutoDiff/Function/DIm2Col.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。画像の CHOP（画素 × 色の行列）を、畳み込み用のパッチの列（… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DIm2Col/), [使用例](Palettes/AutoDiff/Function/DIm2ColExample.toe))
- [DInv](Palettes/AutoDiff/Function/DInv.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。逆数 y = 1/x。D1 に「out1 についての損失の勾配 d… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DInv/), [使用例](Palettes/AutoDiff/Function/DInvExample.toe))
- [DL2Norm](Palettes/AutoDiff/Function/DL2Norm.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。各チャンネルを長さ 1 にそろえる（L2 正規化）y = x / … ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DL2Norm/), [使用例](Palettes/AutoDiff/Function/DL2NormExample.toe))
- [DLGamma](Palettes/AutoDiff/Function/DLGamma.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。ガンマ関数の対数 y = ln Γ(x)（スターリングの近似: (… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DLGamma/), [使用例](Palettes/AutoDiff/Function/DLGammaExample.toe))
- [DLn](Palettes/AutoDiff/Function/DLn.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。自然対数 y = ln x。D1 に「out1 についての損失の勾… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DLn/), [使用例](Palettes/AutoDiff/Function/DLnExample.toe))
- [DLogSoftmax](Palettes/AutoDiff/Function/DLogSoftmax.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。対数ソフトマックス y = (x − max)/Tempature… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DLogSoftmax/), [使用例](Palettes/AutoDiff/Function/DLogSoftmaxExample.toe))
- [DMax](Palettes/AutoDiff/Function/DMax.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。各チャンネルのサンプルの最大値 y = max(x)。D1 に「o… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DMax/), [使用例](Palettes/AutoDiff/Function/DMaxExample.toe))
- [DNeg](Palettes/AutoDiff/Function/DNeg.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。符号反転 y = −x。D1 に「out1 についての損失の勾配 … ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DNeg/), [使用例](Palettes/AutoDiff/Function/DNegExample.toe))
- [DSin](Palettes/AutoDiff/Function/DSin.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。正弦 y = sin x。D1 に「out1 についての損失の勾配… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DSin/), [使用例](Palettes/AutoDiff/Function/DSinExample.toe))
- [DSquare](Palettes/AutoDiff/Function/DSquare.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。2 乗 y = x²。D1 に「out1 についての損失の勾配 d… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DSquare/), [使用例](Palettes/AutoDiff/Function/DSquareExample.toe))
- [DTan](Palettes/AutoDiff/Function/DTan.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。正接 y = tan x。D1 に「out1 についての損失の勾配… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DTan/), [使用例](Palettes/AutoDiff/Function/DTanExample.toe))
- [DTanh](Palettes/AutoDiff/Function/DTanh.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。双曲線正接 y = tanh x。D1 に「out1 についての損… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DTanh/), [使用例](Palettes/AutoDiff/Function/DTanhExample.toe))
- [DTranspose](Palettes/AutoDiff/Function/DTranspose.tox) — AutoDiff（CHOP で組んだ自動微分）の部品。転置（チャンネルとサンプルを入れ替える）。D1 に「out1 につ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/DTranspose/), [使用例](Palettes/AutoDiff/Function/DTransposeExample.toe))
- [RowMul](Palettes/AutoDiff/Function/RowMul.tox) — 2 つの CHOP をチャンネルごとに掛けて、サンプルについて足す（行ごとの内積）。y_c = Σ_s a_cs · b… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Function/RowMul/), [使用例](Palettes/AutoDiff/Function/RowMulExample.toe))
- [ImCHOP2TOPRGB](Palettes/AutoDiff/Image/ImCHOP2TOPRGB.tox) — 画像の CHOP（H·W チャンネル × 3 サンプル）を、幅 Win の画像 TOP に戻す（TOPRGB2ImCHO… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Image/ImCHOP2TOPRGB/), [使用例](Palettes/AutoDiff/Image/ImCHOP2TOPRGBExample.toe))
- [TOPRGB2ImCHOP](Palettes/AutoDiff/Image/TOPRGB2ImCHOP.tox) — 画像 TOP を、AutoDiff で使う画像の CHOP（画素 × 色の行列）にする。H·W チャンネル（画素、左下か… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/Image/TOPRGB2ImCHOP/), [使用例](Palettes/AutoDiff/Image/TOPRGB2ImCHOPExample.toe))
- [InitPattern](Palettes/AutoDiff/NN/InitPattern.tox) — ニューラルネットの重みの初期値（乱数の行列 Chans × Samples）。Mode で初期化の方法を選ぶ: He（R… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/InitPattern/), [使用例](Palettes/AutoDiff/NN/InitPatternExample.toe))
- [NNAdaptConv2d](Palettes/AutoDiff/NN/NNAdaptConv2d.tox) — 出力の大きさ（Outw × Outh）を決めて畳み込む層。入力の大きさからカーネルとストライドを自動で決め（DAdapt… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNAdaptConv2d/), [使用例](Palettes/AutoDiff/NN/NNAdaptConv2dExample.toe))
- [NNConv2d](Palettes/AutoDiff/NN/NNConv2d.tox) — 学習する 2 次元畳み込み層。画像の CHOP を im2col でパッチの列にし、NNLinear で Outchan… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNConv2d/), [使用例](Palettes/AutoDiff/NN/NNConv2dExample.toe))
- [NNL2Loss](Palettes/AutoDiff/NN/NNL2Loss.tox) — 平均二乗誤差（L2 損失）L = mean((estimated − target)²) と、estimated につい… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNL2Loss/), [使用例](Palettes/AutoDiff/NN/NNL2LossExample.toe))
- [NNLinear](Palettes/AutoDiff/NN/NNLinear.tox) — 学習する全結合層 y = x · W + b。重み W（入力のサンプル数 × Outsize）は He の初期化、バイア… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/NNLinear/), [使用例](Palettes/AutoDiff/NN/NNLinearExample.toe))
- [SimpleConvNN](Palettes/AutoDiff/NN/SimpleConvNN.tox) — 画像から target（CHOP）を当てるように、その場で学習する小さな畳み込みネット（3×3 畳み込み → 色の ma… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/SimpleConvNN/), [使用例](Palettes/AutoDiff/NN/SimpleConvNNExample.toe))
- [SimpleNN](Palettes/AutoDiff/NN/SimpleNN.tox) — その場で学習する小さな 2 層のニューラルネット（全結合 → L2 正規化 → Leaky ReLU → 全結合）。in… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/AutoDiff/NN/SimpleNN/), [使用例](Palettes/AutoDiff/NN/SimpleNNExample.toe))
- [4DTorus](Palettes/Geometry/4DTorus.tox) — 4 次元のトーラス（クリフォードトーラス風）を 3 次元に射影した点群。4D の 2 つの面（xw と zw）で回転させ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Geometry/4DTorus/), [使用例](Palettes/Geometry/4DTorusExample.toe))
- [BlackFrame](Palettes/Image/Effect/BlackFrame.tox) — 画像の縁を黒くぼかして落とす（額縁・周辺減光）。中央の四角（大きさ 1 − Borderwidth）だけを残し、その外側… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/BlackFrame/), [使用例](Palettes/Image/Effect/BlackFrameExample.toe))
- [CrossFade](Palettes/Image/Effect/CrossFade.tox) — 映像の残像・なめらかさ（時間方向のクロスフェード）。前のフレームの結果と今の入力を Crsr の割合で混ぜ続ける（フィー… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CrossFade/), [使用例](Palettes/Image/Effect/CrossFadeExample.toe))
- [CurlNoise](Palettes/Image/Effect/CurlNoise.tox) — カールノイズの流れで画像を流す（液体・煙のように渦を巻いて流れる歪み）。ポテンシャル（ノイズ画像）の勾配を 90° 回し… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CurlNoise/), [使用例](Palettes/Image/Effect/CurlNoiseExample.toe))
- [CurlNoiseFlow](Palettes/Image/Effect/CurlNoiseFlow.tox) — カールノイズの流れで画像を流す（Image/Effect/CurlNoise の発展版）。ポテンシャルを 0〜1 に正規… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/CurlNoiseFlow/), [使用例](Palettes/Image/Effect/CurlNoiseFlowExample.toe))
- [Pixelate](Palettes/Image/Effect/Pixelate.tox) — モザイク（ピクセル化）。画像を (1 − Rate) 倍の解像度に最近傍で縮めてから、元の解像度に最近傍で戻すので、四角… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/Pixelate/), [使用例](Palettes/Image/Effect/PixelateExample.toe))
- [RetroWindow](Palettes/Image/Effect/RetroWindow.tox) — 画像を昔のパソコン風のウィンドウの枠に入れる。角の丸い青いタイトルバーの枠と、右上の赤い閉じるボタン（×）を重ねる。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/RetroWindow/), [使用例](Palettes/Image/Effect/RetroWindowExample.toe))
- [ScanLine](Palettes/Image/Effect/ScanLine.tox) — ブラウン管風の走査線。黒から白への縦のグラデーションを細かく繰り返した縞を、画像に掛け合わせる。Time で縞の明暗を入… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/ScanLine/), [使用例](Palettes/Image/Effect/ScanLineExample.toe))
- [ShiftRGB](Palettes/Image/Effect/ShiftRGB.tox) — RGB を別々にずらして重ねる（色収差・RGB ずれのグリッチ）。R・G・B をそれぞれ Shift の x, y だけ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/ShiftRGB/), [使用例](Palettes/Image/Effect/ShiftRGBExample.toe))
- [SoftFade](Palettes/Image/Effect/SoftFade.tox) — 残像のエフェクト。画面の変化したところだけ（重ねた結果との差が大きい所）を、残像のようにやわらかく重ねていく。Freez… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Effect/SoftFade/), [使用例](Palettes/Image/Effect/SoftFadeExample.toe))
- [Dilation](Palettes/Image/Filter/Dilation.tox) — 2 値画像の膨張（モルフォロジー）。白い部分を 1 px 太らせる（3×3 の近くに白があれば白）。マスクの穴埋めや、細… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Dilation/), [使用例](Palettes/Image/Filter/DilationExample.toe))
- [Erosion](Palettes/Image/Filter/Erosion.tox) — 2 値画像の収縮（モルフォロジー）。白い部分を 1 px 細らせる（3×3 がすべて白のときだけ白）。マスクの小さなゴミ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Erosion/), [使用例](Palettes/Image/Filter/ErosionExample.toe))
- [Sobel](Palettes/Image/Filter/Sobel.tox) — Sobel フィルタで縁（明るさの勾配）を出す。Sobelx で横方向の勾配 Gx、Sobely で縦方向の勾配 Gy、… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Image/Filter/Sobel/), [使用例](Palettes/Image/Filter/SobelExample.toe))
- [AutoVJ](Palettes/Learning/AutoVJ/AutoVJ.tox) — 映像と音から、VJ のパラメータ Nump 個（0〜1）を出し、その場で学習し続けるネット。目的は「映像の情報の差分」と… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/AutoVJ/AutoVJ/), [使用例](Palettes/Learning/AutoVJ/AutoVJExample.toe))
- [AutoVJS](Palettes/Learning/AutoVJ/AutoVJS.tox) — 映像と音のスペクトルから、VJ のパラメータ Nump 個（0〜1）を出し、その場で学習し続けるネット。AutoVJ の… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/AutoVJ/AutoVJS/), [使用例](Palettes/Learning/AutoVJ/AutoVJSExample.toe))
- [InfoDiff](Palettes/Learning/Online/InfoDiff.tox) — 入力の「情報の差分」の大きさ。各要素（チャンネル × サンプルのそれぞれ）の 1 フレームの差分 Δx を、その要素のオ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/InfoDiff/), [使用例](Palettes/Learning/Online/InfoDiffExample.toe))
- [OnlineGHA](Palettes/Learning/Online/OnlineGHA.tox) — 入力をオンライン PCA（Sanger 則 / 一般化ヘブ則 GHA）で k 個の主成分に埋め込む。y = W(x − … ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/OnlineGHA/), [使用例](Palettes/Learning/Online/OnlineGHAExample.toe))
- [OnlineRLS](Palettes/Learning/Online/OnlineRLS.tox) — 線形回帰 y ≈ θ · [f, 1] を、忘却つきの逐次最小二乗（RLS）で毎フレーム更新する。最後の係数がバイアス。… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/OnlineRLS/), [使用例](Palettes/Learning/Online/OnlineRLSExample.toe))
- [OnlineStandardize](Palettes/Learning/Online/OnlineStandardize.tox) — 入力の各要素（チャンネル × サンプルのそれぞれ）を、その要素のオンラインの平均と分散で標準化する: z = (x − … ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Learning/Online/OnlineStandardize/), [使用例](Palettes/Learning/Online/OnlineStandardizeExample.toe))
- [AbsClamp](Palettes/Math/AbsClamp.tox) — 値を −Scale〜Scale に抑える（はみ出したサンプルは ±Scale に、内側はそのまま）。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/AbsClamp/), [使用例](Palettes/Math/AbsClampExample.toe))
- [AllAnalyze](Palettes/Math/AllAnalyze.tox) — 全チャンネル・全サンプルをまとめて 1 つの値にする（Operation で合計・平均・最大・最小）。Analyze C… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/AllAnalyze/), [使用例](Palettes/Math/AllAnalyzeExample.toe))
- [Digamma](Palettes/Math/Digamma.tox) — ディガンマ関数 ψ(x)（ln Γ の微分）の近似 ln(x − ½)。x が大きいほど正確（x = 11 で 2.35… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Digamma/), [使用例](Palettes/Math/DigammaExample.toe))
- [Flip](Palettes/Math/Flip.tox) — サンプルの順番を逆にする（[a, b, c] → [c, b, a]）。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Flip/), [使用例](Palettes/Math/FlipExample.toe))
- [LGamma](Palettes/Math/LGamma.tox) — ガンマ関数の対数 ln Γ(x) の近似（スターリングの公式 (x − ½)·ln x − x + ½·ln 2π + … ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/LGamma/), [使用例](Palettes/Math/LGammaExample.toe))
- [LogSoftmax](Palettes/Math/LogSoftmax.tox) — ソフトマックスの対数: (x − max)/T − ln Σ exp((x − max)/T)。確率の対数が要る学習の損… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/LogSoftmax/), [使用例](Palettes/Math/LogSoftmaxExample.toe))
- [MinClamp](Palettes/Math/MinClamp.tox) — 下限でクリップする: max(x, Min)。0 で割る・log(0) を避けるための下限に使う。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/MinClamp/), [使用例](Palettes/Math/MinClampExample.toe))
- [Mod](Palettes/Math/Mod.tox) — 床関数の余り x − floor(x/m)·m と商 floor(x/m)。余りは常に 0〜m（負の数でも正の余り）。割… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Mod/), [使用例](Palettes/Math/ModExample.toe))
- [Random](Palettes/Math/Random.tox) — 乱数の行列（Sizew チャンネル × Sizeh サンプル）。Mode 0 で一様乱数（Min〜Max）、Mode 1… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Random/), [使用例](Palettes/Math/RandomExample.toe))
- [Sigmoid](Palettes/Math/Sigmoid.tox) — シグモイド 1 / (1 + exp(−Gain·x))。0〜1 のなめらかなスイッチ（x = 0 で 0.5）。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Sigmoid/), [使用例](Palettes/Math/SigmoidExample.toe))
- [Softmax](Palettes/Math/Softmax.tox) — サンプルの列 x のソフトマックス: exp((x − max)/T) / Σ exp((x − max)/T)。合計が… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Softmax/), [使用例](Palettes/Math/SoftmaxExample.toe))
- [Std](Palettes/Math/Std.tox) — サンプルの列の標準偏差（母標準偏差 √(平均((x − 平均)²))）を 1 サンプルで出す。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Std/), [使用例](Palettes/Math/StdExample.toe))
- [Threshold](Palettes/Math/Threshold.tox) — しきい値より上（Lower で下）を 1、それ以外を 0 にする。Inclusive でしきい値ちょうども含める。   ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/Threshold/), [使用例](Palettes/Math/ThresholdExample.toe))
- [TorusMod](Palettes/Math/TorusMod.tox) — 値を 0〜Max の範囲にループさせる（トーラス状の巻き戻し: ((x mod Max) + Max) mod Max）… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Math/TorusMod/), [使用例](Palettes/Math/TorusModExample.toe))
- [BeatBase](Palettes/Sequence/BeatBase.tox) — ドラムのステップシーケンサーの 1 パート。時間（in1、秒）から、拍子・細分化・スウィング・ユークリッドリズムで決まる… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Sequence/BeatBase/), [使用例](Palettes/Sequence/BeatBaseExample.toe))
- [ValueToTrigger](Palettes/Sequence/ValueToTrigger.tox) — 値を Bins 個のビン（Min〜Max を等間隔に分けた点）のうち、いちばん近いもののワンホットにする。値をノートやボ… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Sequence/ValueToTrigger/), [使用例](Palettes/Sequence/ValueToTriggerExample.toe))
- [Boid](Palettes/Simulation/Boid/Boid.tox) — ボイド（群れのシミュレーション）。Points 個の点を円の上に置き、ランダムな速度を与えて、フィードバックで毎フレーム… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Boid/Boid/), [使用例](Palettes/Simulation/Boid/BoidExample.toe))
- [GalaxyBase](Palettes/Simulation/Galaxy/GalaxyBase.tox) — 銀河の初期状態の点群。中心のバルジ（球状、全体の Bulgerate の割合）と、ThinDisk で作る円盤から成る。… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/GalaxyBase/), [使用例](Palettes/Simulation/Galaxy/GalaxyBaseExample.toe))
- [ThinDisk](Palettes/Simulation/Galaxy/ThinDisk.tox) — 薄い円盤状の点群（銀河の円盤など）。半径方向は指数分布（中心ほど密）、厚みは Height で、外側ほど厚くなる（Fla… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/Galaxy/ThinDisk/), [使用例](Palettes/Simulation/Galaxy/ThinDiskExample.toe))
- [GrayScott](Palettes/Simulation/ReactionDiffusion/GrayScott.tox) — Gray-Scott 反応拡散のシミュレーション。2 種類の物質 u, v が拡散しながら反応する式（∂u/∂t = D… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Simulation/ReactionDiffusion/GrayScott/), [使用例](Palettes/Simulation/ReactionDiffusion/GrayScottExample.toe))
- [PrintGalleryUV](Palettes/UV/PrintGalleryUV.tox) — エッシャー「版画画廊」風の、ドロステ効果（無限に入れ子になる渦）の UV マップ。対数極座標で画像をらせん状に繰り返す。… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/PrintGalleryUV/), [使用例](Palettes/UV/PrintGalleryUVExample.toe))
- [RTheta](Palettes/UV/RTheta.tox) — 極座標マップ。r チャンネルに中心からの距離、g チャンネルに角度（0〜1 で一周）を入れた画像を作る。Remap に使… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/RTheta/), [使用例](Palettes/UV/RThetaExample.toe))
- [identifyUV](Palettes/UV/identifyUV.tox) — 恒等 UV マップ（各ピクセルに自分の座標を入れた画像）を作る。r = u（左 0 → 右 1）、g = v（下 0 →… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/identifyUV/), [使用例](Palettes/UV/identifyUVExample.toe))
- [lineDrawer](Palettes/UV/lineDrawer.tox) — 点列 CHOP を折れ線として画像の上に描く（GLSL）。Start〜End で線全体の長さのどの区間を描くかを決めるの… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/lineDrawer/), [使用例](Palettes/UV/lineDrawerExample.toe))
- [mandalaUV](Palettes/UV/mandalaUV.tox) — 万華鏡（マンダラ）状の UV マップ。角度を鏡映しながら N 回くり返した値を r に、中心からの距離を折り返した値を … ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/mandalaUV/), [使用例](Palettes/UV/mandalaUVExample.toe))
- [pinholeRadtan](Palettes/UV/pinholeRadtan.tox) — カメラのレンズ歪み（Brown-Conrady モデル: 半径方向 k1, k2 と接線方向 p1, p2）をかけた U… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/UV/pinholeRadtan/), [使用例](Palettes/UV/pinholeRadtanExample.toe))
- [FrameDelay](Palettes/Utility/FrameDelay.tox) — 入力の CHOP を Frames フレーム遅らせて出す（形・チャンネル名はそのまま）。「1 フレーム前の値」が要るとき… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Utility/FrameDelay/), [使用例](Palettes/Utility/FrameDelayExample.toe))
- [ChannelLissajous](Palettes/Visualize/ChannelLissajous.tox) — CHOP の 1 番目のチャンネルを x、2 番目を y にして点を線で結んだ図（XY スコープ）を描く。タイムスライス… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/ChannelLissajous/), [使用例](Palettes/Visualize/ChannelLissajousExample.toe))
- [Goniometer](Palettes/Visualize/Goniometer.tox) — ゴニオメーター（ステレオの位相・広がりを見るスコープ）。L−R を横、L+R を縦にして（1/√2 倍で 45° 回した… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/Goniometer/), [使用例](Palettes/Visualize/GoniometerExample.toe))
- [HzLissajousAnimated](Palettes/Visualize/HzLissajousAnimated.tox) — Lissajous の、位相が時間で回る版。x と y の位相を、それぞれの周波数（in1, in2 の値）の速さで進め… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/HzLissajousAnimated/), [使用例](Palettes/Visualize/HzLissajousAnimatedExample.toe))
- [Lissajous](Palettes/Visualize/Lissajous.tox) — 2 つの値を x と y の周波数比にしたリサジュー図形を描く: x = cos(2π·a·t)、y = sin(2π·… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/Lissajous/), [使用例](Palettes/Visualize/LissajousExample.toe))
- [PlanckianLocus](Palettes/Visualize/PlanckianLocus.tox) — 黒体放射の色（色温度）の横グラデーション。横軸は 1667 K（左端）〜 25000 K（右端）の等間隔で、6500 K… ([説明](https://shinh0707.github.io/TouchDesignerShareDatas/palettes/Visualize/PlanckianLocus/), [使用例](Palettes/Visualize/PlanckianLocusExample.toe))
<!-- tdp:palettes:end -->
  
  
  
  
## Plugin  
TouchDesignerのオリジナルノードみたいなやつです.  
上手く導入できるとOperatorの選択ウィンドウの`Custom`タブに追加されます.  
![プラグイン導入後のOperator選択ウィンドウ](doc/Plugin.png "Pluginの画像")  
  
### Plugin導入  
1. [ダウンロードページ](https://shinh0707.github.io/TouchDesignerShareDatas/downloads/)(または [Releases](https://github.com/Shinh0707/TouchDesignerShareDatas/releases/latest))から、使いたいプラグインの zip を OS に合わせて選びます.  
	全部まとめた `TDPlugins-<version>-<mac|windows>.zip` もあります.  
2. zip を展開して, 中の `.plugin`(Mac)/ `.dll`(Windows)を次の場所に置きます.  
	- Windows: `Documents/Derivative/Plugins`(`C:/Users/<username>/Documents/Derivative/Plugins`)  
	- Mac: `/Users/<username>/Library/Application Support/Derivative/TouchDesigner099/Plugins`  
3. TouchDesignerを再起動します.  

Mac版・Windows版とも, それぞれの OS 上でビルドし自動テストを通したものです.  
以前このリポジトリの `Plugins` フォルダに置いていた旧版は削除しました(Windows 用の DLL が実際には Mac 用で動かなかったため). 上のダウンロードページから取得してください.  
  
*詳細は[https://docs.derivative.ca/Custom_Operators](https://docs.derivative.ca/Custom_Operators)を確認してください*  
  
### Plugin説明  
#### CHOP
1. [`DotCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/)  
	CHOP同士の内積をとります.  
	使用例: [DotProductCHOPExample.toe](Projects/DotProductCHOPExample.toe "DotProductCHOP使用例")  
2. [`GranularCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/GranularCHOP/)
	CHOPに簡易的なグラニュラー効果をかけます.  
	２段階かけるといい感じになります.  
	使用例1: [TouchDesigner Plugin "Granular"](https://youtu.be/0uRVfFLauyg "TouchDesigner Plugin Granular YouTube")  
	使用例2: [GranularCHOPExample.toe](Projects/GranularCHOPExample.toe "GranularCHOP使用例")  
3. [`HistogramCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HistogramCHOP/)  
	CHOPのヒストグラムを計算します.  
	使用例: [HistogramCHOPExample.toe](Projects/HistogramCHOPExample.toe "HistogramCHOP使用例")  
4. [`MIDIFileInCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/MidiFileInCHOP/)  
	MIDIファイルを手軽に読めます.(`MIDI In`より機能が少なく、簡単に使えます)  
5. [`SoundFontSynthCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/SoundFontSynthCHOP/)  
	SoundFontファイルを再生します.`MIDIFileInCHOP`と一緒に使うことを想定しています.  
6. [`BLEInCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BLEInCHOP/)  
	BLE（Bluetooth Low Energy）デバイスからカンマ区切りの数値列（例: `123,0.5,3.212`）としてフォーマットされた
	ASCII文字列を受信し、それらをCHOPチャンネルとして出力します.  
	[SimpleBLE](https://github.com/simpleble/simpleble)ライブラリを使用しています.(Mac版のみ)
7. [`LifeGameCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameCHOP/)  
	ライフゲームを動かし, 盤面の各行をチャンネルとして出力します. ランダムな発生・消滅の確率も設定できます.  
8. [`Im2ColCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) / [`Col2ImCHOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/)  
	画像状に並べたCHOPの値を, 畳み込み用のパッチ列に並べ替えます(im2col)/ 元に戻します(col2im).  
  
#### TOP
1. [`BasicBlockGlitchTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BasicBlockGlitchTOP/)  
	画像をタイル状にバラバラにします. 逐次動かすこともできます.  
	使用例: [BasicBlockGlitchTOPExample.toe](Projects/BasicBlockGlitchTOPExample.toe)  
	![BasicBlockGlitchTOPの適用後](doc/BasicBlockGlitchTOPExample.png "BasicBlockGlitchTOP適用後")  
2. [`BlockNoiseTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BlockNoiseTOP/)  
	四角いノイズ乗っけるだけです. `TOP > Noise`でもいいと思います.  
	使用例: [BlockNoiseTOPExample.toe](Projects/BlockNoiseTOPExample.toe)  
	![BlockNoiseTOPの適用後](doc/BlockNoiseTOPExample.png "BlockNoiseTOP適用後")  
3. [`BitCrushTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BitCrushTOP/)  
	画像の色をBit単位で量子化します. 古めの映像とかを表現できます.  
	使用例: [BitCrushTOPExample.toe](Projects/BitCrushTOPExample.toe)  
	![BitCrushTOPの適用後](doc/BitCrushTOPExample.png "BitCrushTOP適用後")  
4. [`PixcelSorterGlitchTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/)  
	Kim Asendorf氏の[ASDFPixelSort](https://github.com/kimasendorf/ASDFPixelSort)を参考に, PixcelSortingをTouchDesignerのプラグイン化したものです.(Black,Brightness,R,G,B,RGBMaxのモードを選択できます)  
	使用例: [PixcelSorterGlitchTOPExample.toe](Projects/PixcelSorterGlitchTOPExample.toe)  
	![PixcelSorterGlitchTOPの適用後](doc/PixcelSorterGlitchTOPExample.png "PixcelSorterGlitchTOP適用後")  
5. [`FlipnoteTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/FlipnoteTOP/)  
	画質・アスペクト比・画像コンテンツを「うごくメモ帳」風にします. DSi/3DS版を選べます.  
	参考程度に, DitherLevelsを動かすと点々の密度, DitherLumaThresholdを動かすと鮮やかさが変わり, Edge系パラメータを動かすと輪郭の強調を制御できます. 多くの画像で共通で良い結果が得られるパラメータのセットは見つかってません.  
	Operatorのパラメータ設定画面の`Common > Viewer Smoothness`を`Nearist Pixcel`にすると, 更に見た目が「うごくメモ帳」らしくなります.  
	使用例: [FlipnoteTOPExample.toe](Projects/FlipnoteTOPExample.toe)  
	![FlipnoteTOPの適用後](doc/FlipnoteTOPExample.png "FlipnoteTOP適用後")
6. [`InstanceTOP`](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/InstanceTOP/)  
	入力画像を複製してCHOPで変形して重ねるプラグイン.  
	使用例: [InstanceTOPExample.toe](Projects/InstanceTOPExample.toe)  
	![InstanceTOPの適用後](doc/InstanceTOP.png "FlipnoteTOP適用後")