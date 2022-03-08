import sys

# from synthesizer import GroovleSynthesizer


# class Groovle:
#     def __init__(self):
#         self.synthesizer = GroovleSynthesizer()

#     # 합성
#     def synthesize(self):
#         self.synthesizer.setTracks(self.tracks)
#         self.synthesizer.synthesize()
#         self.synthesizer.saveAsFile()
#         self.connector.uploadSynthResult(sys.argv[2])
#         self.connector.deleteTmp()


# groovle = Groovle()
if sys.argv[1] == "synthesize":
    print("synthesize connected!!!", sys.argv[2])
    # groovle.synthesize()
