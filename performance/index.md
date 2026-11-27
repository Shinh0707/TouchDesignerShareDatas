<!-- https://shinh0707.github.io/TouchDesignerShareDatas/performance/ -->

# 処理時間

各プラグインの cook 1 回あたりの処理時間(中央値)です。TouchDesigner の外で、
プラグインの CPU 処理だけを同じ入力で繰り返し実行して計っています(`tools/bench.py`)。
GPU とのやり取りなどは含まないので、**設定や版ごとの比較の目安**として見てください。

## tdmock 上の CPU 時間

| プラグイン | ケース | 入力 | Mac<br>Apple M4 Pro | Windows<br>AMD Ryzen 9 7940HS w/ Radeon 780M Graphics |
|---|---|---|---|---|
| [BitFlipCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BitFlipCHOP/) | 1x10000, 8 flips | CHOP 1ch x 10000 | 0.004 ms<br>60→60.0 fps | 0.072 ms<br>60→59.7 fps |
| [BitFlipCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BitFlipCHOP/) | 1x1000000, 1000 flips | CHOP 1ch x 1000000 | 0.985 ms<br>60→56.7 fps 🔻 | 5.56 ms<br>60→45.0 fps 🔻 |
| [Col2ImCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | 128x128 img | CHOP 15876ch x 27 | 0.682 ms<br>60→57.6 fps 🔻 | 4.36 ms<br>60→47.6 fps 🔻 |
| [Col2ImCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | 128x128 img Tin Tout | CHOP 27ch x 15876 | 0.213 ms<br>60→59.2 fps | 1.19 ms<br>60→56.0 fps 🔻 |
| [Col2ImCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | 32x32 img | CHOP 900ch x 27 | 0.106 ms<br>60→59.6 fps | 0.299 ms<br>60→58.9 fps |
| [DctCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DctCHOP/) | 2x1024 | CHOP 2ch x 1024 | 0.009 ms<br>60→60.0 fps | 0.032 ms<br>60→59.9 fps |
| [DctCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DctCHOP/) | 2x4096 | CHOP 2ch x 4096 | 0.043 ms<br>60→59.8 fps | 0.175 ms<br>60→59.4 fps |
| [DctCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DctCHOP/) | 2x4096 DCT-IV | CHOP 2ch x 4096 | 0.083 ms<br>60→59.7 fps | 0.374 ms<br>60→58.7 fps |
| [DctCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DctCHOP/) | 2x735 (not a power of 2) | CHOP 2ch x 735 | 0.036 ms<br>60→59.9 fps | 0.136 ms<br>60→59.5 fps |
| [DctCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DctCHOP/) | latest 2048 of 2x735 | CHOP 2ch x 735 | 0.020 ms<br>60→59.9 fps | 0.071 ms<br>60→59.7 fps |
| [DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | 16x16x16 | CHOP 16ch x 16 + CHOP 16ch x 16 | 0.001 ms<br>60→60.0 fps | 0.007 ms<br>60→60.0 fps |
| [DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | 1x64x1 | CHOP 1ch x 64 + CHOP 64ch x 1 | 0.000 ms<br>60→60.0 fps | 0.001 ms<br>60→60.0 fps |
| [DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | 256x1024x256 | CHOP 256ch x 1024 + CHOP 1024ch x 256 | 0.137 ms<br>60→59.5 fps | 2.68 ms<br>60→51.7 fps 🔻 |
| [DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | 256x1024x256 T0 | CHOP 1024ch x 256 + CHOP 1024ch x 256 | 0.119 ms<br>60→59.6 fps | 3.73 ms<br>60→49.0 fps 🔻 |
| [DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | 256x1024x256 T0T1 | CHOP 1024ch x 256 + CHOP 256ch x 1024 | 0.130 ms<br>60→59.5 fps | 2.53 ms<br>60→52.1 fps 🔻 |
| [DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | 256x1024x256 T1 | CHOP 256ch x 1024 + CHOP 256ch x 1024 | 0.147 ms<br>60→59.5 fps | 1.20 ms<br>60→56.0 fps 🔻 |
| [DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | 64x256x64 | CHOP 64ch x 256 + CHOP 256ch x 64 | 0.008 ms<br>60→60.0 fps | 0.566 ms<br>60→58.0 fps |
| [DotDoubleCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotDoubleCHOP/) | 16x16x16 | CHOP 16ch x 16 + CHOP 16ch x 16 | 0.002 ms<br>60→60.0 fps | 0.010 ms<br>60→60.0 fps |
| [DotDoubleCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotDoubleCHOP/) | 1x64x1 | CHOP 1ch x 64 + CHOP 64ch x 1 | 0.000 ms<br>60→60.0 fps | 0.001 ms<br>60→60.0 fps |
| [DotDoubleCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotDoubleCHOP/) | 256x1024x256 | CHOP 256ch x 1024 + CHOP 1024ch x 256 | 0.888 ms<br>60→57.0 fps 🔻 | 6.93 ms<br>60→42.4 fps 🔻 |
| [DotDoubleCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotDoubleCHOP/) | 256x1024x256 T0 | CHOP 1024ch x 256 + CHOP 1024ch x 256 | 0.912 ms<br>60→56.9 fps 🔻 | 6.28 ms<br>60→43.6 fps 🔻 |
| [DotDoubleCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotDoubleCHOP/) | 256x1024x256 T0T1 | CHOP 1024ch x 256 + CHOP 256ch x 1024 | 3.82 ms<br>60→48.8 fps 🔻 | 6.92 ms<br>60→42.4 fps 🔻 |
| [DotDoubleCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotDoubleCHOP/) | 256x1024x256 T1 | CHOP 256ch x 1024 + CHOP 256ch x 1024 | 1.23 ms<br>60→55.9 fps 🔻 | 1.83 ms<br>60→54.1 fps 🔻 |
| [DotDoubleCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotDoubleCHOP/) | 64x256x64 | CHOP 64ch x 256 + CHOP 256ch x 64 | 0.074 ms<br>60→59.7 fps | 0.199 ms<br>60→59.3 fps |
| [GranularCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/GranularCHOP/) | 1 s, 32 grains | CHOP 2ch x 44100 | 0.040 ms<br>60→59.9 fps | 0.145 ms<br>60→59.5 fps |
| [GranularCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/GranularCHOP/) | default | CHOP 2ch x 1000 | 0.016 ms<br>60→59.9 fps | 0.042 ms<br>60→59.8 fps |
| [GroupByCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/GroupByCHOP/) | 1M samples, mean | CHOP 4ch x 1000000 + CHOP 1ch x 1000000 | 9.37 ms<br>60→38.4 fps 🔻 | 19.20 ms<br>60→27.9 fps 🔻 |
| [GroupByCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/GroupByCHOP/) | default | CHOP 4ch x 1000 + CHOP 1ch x 1000 | 0.011 ms<br>60→60.0 fps | 0.020 ms<br>60→59.9 fps |
| [HistogramCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HistogramCHOP/) | 100k samples | CHOP 2ch x 100000 | 0.358 ms<br>60→58.7 fps | 0.562 ms<br>60→58.0 fps |
| [HistogramCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HistogramCHOP/) | default | CHOP 2ch x 1000 | 0.004 ms<br>60→60.0 fps | 0.006 ms<br>60→60.0 fps |
| [HuffmanCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/) | 3x1000 | CHOP 3ch x 1000 | 0.012 ms<br>60→60.0 fps | 0.054 ms<br>60→59.8 fps |
| [HuffmanCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/) | 3x100000 | CHOP 3ch x 100000 | 1.03 ms<br>60→56.5 fps 🔻 | 5.14 ms<br>60→45.9 fps 🔻 |
| [HuffmanCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/) | 3x100000 no zero runs | CHOP 3ch x 100000 | 1.61 ms<br>60→54.7 fps 🔻 | 5.40 ms<br>60→45.3 fps 🔻 |
| [IdTrackCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/IdTrackCHOP/) | 32 items | CHOP 4ch x 32 | 0.006 ms<br>60→60.0 fps | 0.028 ms<br>60→59.9 fps |
| [IdTrackCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/IdTrackCHOP/) | 512 items | CHOP 4ch x 512 | 0.400 ms<br>60→58.6 fps | 1.64 ms<br>60→54.6 fps 🔻 |
| [Im2ColCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | 128x128 img | CHOP 16384ch x 3 | 0.726 ms<br>60→57.5 fps 🔻 | 5.55 ms<br>60→45.0 fps 🔻 |
| [Im2ColCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | 128x128 img Tin Tout | CHOP 3ch x 16384 | 0.194 ms<br>60→59.3 fps | 1.31 ms<br>60→55.6 fps 🔻 |
| [Im2ColCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | 128x128 img Tout | CHOP 16384ch x 3 | 0.168 ms<br>60→59.4 fps | 1.32 ms<br>60→55.6 fps 🔻 |
| [Im2ColCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | 32x32 img | CHOP 1024ch x 3 | 0.101 ms<br>60→59.6 fps | 0.339 ms<br>60→58.8 fps |
| [LifeGameCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameCHOP/) | 100x100, every frame | CHOP 2ch x 1000 | 0.054 ms<br>60→59.8 fps | 0.184 ms<br>60→59.3 fps |
| [LifeGameCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameCHOP/) | 256x256, every frame | CHOP 2ch x 1000 | 0.115 ms<br>60→59.6 fps | 0.662 ms<br>60→57.7 fps 🔻 |
| [LifeGameCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameCHOP/) | default | CHOP 2ch x 1000 | 0.001 ms<br>60→60.0 fps | 0.005 ms<br>60→60.0 fps |
| [MidiFileInCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/MidiFileInCHOP/) | default | — | 0.007 ms<br>60→60.0 fps | 0.022 ms<br>60→59.9 fps |
| [SoundFontSynthCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/SoundFontSynthCHOP/) | default | CHOP 2ch x 1000 | 0.000 ms<br>60→60.0 fps | 0.001 ms<br>60→60.0 fps |
| [BasicBlockGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BasicBlockGlitchTOP/) | 1080p | TOP 1920x1080 | 0.290 ms<br>60→59.0 fps | 0.936 ms<br>60→56.8 fps 🔻 |
| [BasicBlockGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BasicBlockGlitchTOP/) | default | TOP 1280x720 | 0.105 ms<br>60→59.6 fps | 0.418 ms<br>60→58.5 fps |
| [BitCrushTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BitCrushTOP/) | 1080p | TOP 1920x1080 | 0.100 ms<br>60→59.6 fps | 0.266 ms<br>60→59.1 fps |
| [BitCrushTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BitCrushTOP/) | 720p | TOP 1280x720 | 0.060 ms<br>60→59.8 fps | 0.116 ms<br>60→59.6 fps |
| [BlockNoiseTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BlockNoiseTOP/) | 1080p | TOP 1920x1080 | 0.115 ms<br>60→59.6 fps | 1.04 ms<br>60→56.5 fps 🔻 |
| [BlockNoiseTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BlockNoiseTOP/) | amount 0 | TOP 1280x720 | 0.049 ms<br>60→59.8 fps | 0.101 ms<br>60→59.6 fps |
| [BlockNoiseTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BlockNoiseTOP/) | amount 0.5 colour | TOP 1280x720 | 0.166 ms<br>60→59.4 fps | 1.86 ms<br>60→54.0 fps 🔻 |
| [BlockNoiseTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BlockNoiseTOP/) | default | TOP 1280x720 | 0.078 ms<br>60→59.7 fps | 0.598 ms<br>60→57.9 fps 🔻 |
| [FlipnoteTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/FlipnoteTOP/) | 1080p 3DS | TOP 1920x1080 | 0.407 ms<br>60→58.6 fps | 2.25 ms<br>60→52.9 fps 🔻 |
| [FlipnoteTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/FlipnoteTOP/) | default | TOP 1280x720 | 0.198 ms<br>60→59.3 fps | 1.25 ms<br>60→55.8 fps 🔻 |
| [InstanceTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/InstanceTOP/) | 100 inst | TOP 1280x720 | 7.07 ms<br>60→42.1 fps 🔻 | 18.20 ms<br>60→28.7 fps 🔻 |
| [InstanceTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/InstanceTOP/) | 1000 inst | TOP 1280x720 | 71.19 ms<br>60→11.4 fps 🔻 | 202 ms<br>60→4.6 fps 🔻 |
| [InstanceTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/InstanceTOP/) | 1000 small inst | TOP 48x48 | 1.71 ms<br>60→54.4 fps 🔻 | 8.83 ms<br>60→39.2 fps 🔻 |
| [LifeGameTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameTOP/) | 256x256, every frame | TOP 1280x720 | 0.127 ms<br>60→59.5 fps | 0.653 ms<br>60→57.7 fps 🔻 |
| [LifeGameTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameTOP/) | 512x512, every frame | TOP 1280x720 | 0.342 ms<br>60→58.8 fps | 2.15 ms<br>60→53.2 fps 🔻 |
| [LifeGameTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameTOP/) | 512x512, no chance | TOP 1280x720 | 0.319 ms<br>60→58.9 fps | 1.97 ms<br>60→53.7 fps 🔻 |
| [LifeGameTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameTOP/) | default 128x128 | TOP 1280x720 | 0.011 ms<br>60→60.0 fps | 0.076 ms<br>60→59.7 fps |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | 1080p | TOP 1920x1080 | 0.562 ms<br>60→58.0 fps | 5.03 ms<br>60→46.1 fps 🔻 |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | 720p UV map 0.25 | TOP 1280x720 | 0.067 ms<br>60→59.8 fps | 0.437 ms<br>60→58.5 fps |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | 720p UV map 1.0 | TOP 1280x720 | 0.345 ms<br>60→58.8 fps | 3.94 ms<br>60→48.5 fps 🔻 |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | 720p angle 110 | TOP 1280x720 | 0.845 ms<br>60→57.1 fps 🔻 | 4.20 ms<br>60→47.9 fps 🔻 |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | 720p angle 20 | TOP 1280x720 | 0.843 ms<br>60→57.1 fps 🔻 | 3.83 ms<br>60→48.8 fps 🔻 |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | 720p angle 45 | TOP 1280x720 | 0.900 ms<br>60→56.9 fps 🔻 | 3.62 ms<br>60→49.3 fps 🔻 |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | 720p down | TOP 1280x720 | 0.919 ms<br>60→56.9 fps 🔻 | 4.08 ms<br>60→48.2 fps 🔻 |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | 720p left | TOP 1280x720 | 0.678 ms<br>60→57.7 fps 🔻 | 3.59 ms<br>60→49.4 fps 🔻 |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | 720p vertical | TOP 1280x720 | 0.874 ms<br>60→57.0 fps 🔻 | 2.73 ms<br>60→51.6 fps 🔻 |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | 720p whole line | TOP 1280x720 | 0.441 ms<br>60→58.5 fps | 3.37 ms<br>60→49.9 fps 🔻 |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | default | TOP 1280x720 | 0.267 ms<br>60→59.1 fps | 2.96 ms<br>60→50.9 fps 🔻 |
| [PixelArgSorterTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) | 1080p | TOP 1920x1080 | 0.897 ms<br>60→56.9 fps 🔻 | 3.76 ms<br>60→49.0 fps 🔻 |
| [PixelArgSorterTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) | 720p 110 | TOP 1280x720 | 0.310 ms<br>60→58.9 fps | 2.32 ms<br>60→52.7 fps 🔻 |
| [PixelArgSorterTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) | 720p 180 | TOP 1280x720 | 0.205 ms<br>60→59.3 fps | 2.06 ms<br>60→53.4 fps 🔻 |
| [PixelArgSorterTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) | 720p 20 | TOP 1280x720 | 0.541 ms<br>60→58.1 fps | 2.73 ms<br>60→51.5 fps 🔻 |
| [PixelArgSorterTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) | 720p 270 | TOP 1280x720 | 0.499 ms<br>60→58.3 fps | 2.28 ms<br>60→52.8 fps 🔻 |
| [PixelArgSorterTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) | 720p 45 | TOP 1280x720 | 0.545 ms<br>60→58.1 fps | 2.75 ms<br>60→51.5 fps 🔻 |
| [PixelArgSorterTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) | 720p 90 | TOP 1280x720 | 0.510 ms<br>60→58.2 fps | 2.60 ms<br>60→51.9 fps 🔻 |
| [PixelArgSorterTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) | 720p whole line | TOP 1280x720 | 0.493 ms<br>60→58.3 fps | 2.95 ms<br>60→51.0 fps 🔻 |
| [PixelArgSorterTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) | default | TOP 1280x720 | 0.380 ms<br>60→58.7 fps | 1.73 ms<br>60→54.4 fps 🔻 |
| [RecordOutTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/RecordOutTOP/) | default | TOP 1280x720 | 0.000 ms<br>60→60.0 fps | — |

cook 1 回の中央値(Release ビルド、TouchDesigner 外での CPU 処理時間)。「60→N fps」は、フレームに余裕の無い 60 fps のプロジェクトに足したときのフレームレート(最悪の場合)。🔻 は 2 fps 以上落ちるケース。計測日: Mac 2026-11-27, Windows 2026-11-27。⚠ はその入力でエラー表示が出たケース。

## TouchDesigner 上の cook 時間

各プラグインのサンプル(`<名前>Example.toe`)を TouchDesigner 099.2025.33230(macOS)で開き、プラグインの OP を繰り返し cook した 1 回あたりの時間(中央値)です(GPU とのやり取りを含みます)。

「60 fps のとき」は、フレームに余裕の無い 60 fps のプロジェクトにこのプラグインを 1 つ足したときのフレームレートです(最悪の場合)。🔻 は 2 fps 以上落ちるもの。

| プラグイン | 出力 | cook | 60 fps のとき |
|---|---|---|---|
| [Col2ImCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Col2ImCHOP/) | 1024ch × 3 | 1.931 ms | 53.8 fps 🔻 |
| [Im2ColCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/Im2ColCHOP/) | 900ch × 27 | 1.634 ms | 54.6 fps 🔻 |
| [InstanceTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/InstanceTOP/) | 512x512 | 1.385 ms | 55.4 fps 🔻 |
| [PixcelSorterGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixcelSorterGlitchTOP/) | 640x360 | 0.704 ms | 57.6 fps 🔻 |
| [BlockNoiseTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BlockNoiseTOP/) | 1280x720 | 0.610 ms | 57.9 fps 🔻 |
| [FlipnoteTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/FlipnoteTOP/) | 256x192 | 0.531 ms | 58.1 fps |
| [BasicBlockGlitchTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BasicBlockGlitchTOP/) | 640x360 | 0.475 ms | 58.3 fps |
| [PixelArgSorterTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/PixelArgSorterTOP/) | 320x180 | 0.473 ms | 58.3 fps |
| [BoxTrackCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BoxTrackCHOP/) | 5ch × 16 | 0.333 ms | 58.8 fps |
| [BitCrushTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BitCrushTOP/) | 640x360 | 0.311 ms | 58.9 fps |
| [DotDoubleCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotDoubleCHOP/) | 64ch × 64 | 0.088 ms | 59.7 fps |
| [LifeGameTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameTOP/) | 512x512 | 0.070 ms | 59.8 fps |
| [RecordOutTOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/RecordOutTOP/) | 16x9 | 0.061 ms | 59.8 fps |
| [DotCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DotCHOP/) | 64ch × 64 | 0.036 ms | 59.9 fps |
| [MidiFileInCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/MidiFileInCHOP/) | 4ch × 240 | 0.025 ms | 59.9 fps |
| [HuffmanCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HuffmanCHOP/) | 1ch × 868 | 0.025 ms | 59.9 fps |
| [LifeGameCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/LifeGameCHOP/) | 24ch × 32 | 0.017 ms | 59.9 fps |
| [DctCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/DctCHOP/) | 1ch × 1024 | 0.015 ms | 59.9 fps |
| [GroupByCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/GroupByCHOP/) | 1ch × 8 | 0.014 ms | 60.0 fps |
| [HistogramCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/HistogramCHOP/) | 1ch × 40 | 0.013 ms | 60.0 fps |
| [IdTrackCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/IdTrackCHOP/) | 4ch × 8 | 0.013 ms | 60.0 fps |
| [SoundFontSynthCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/SoundFontSynthCHOP/) | 2ch × 66150 | 0.012 ms | 60.0 fps |
| [BitFlipCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/BitFlipCHOP/) | 1ch × 600 | 0.010 ms | 60.0 fps |
| [GranularCHOP](https://shinh0707.github.io/TouchDesignerShareDatas/plugins/GranularCHOP/) | 4ch × 22050 | 0.010 ms | 60.0 fps |
