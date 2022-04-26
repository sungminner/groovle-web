import sys
import json
from synthesizer import GroovleSynthesizer


class Groovle:
    def __init__(self):
        self.synthesizer = GroovleSynthesizer()

    # 합성
    def synthesize(self):
        self.synthesizer.setFiles(json.loads(sys.argv[2]))
        self.synthesizer.setVolumes(list(map(float, json.loads(sys.argv[3]))))
        self.synthesizer.setOffsets(list(map(float, json.loads(sys.argv[4]))))
        self.synthesizer.synthesize()
        self.synthesizer.saveAsFile(sys.argv[5])


groovle = Groovle()
if sys.argv[1] == "synthesize":
    print("synthesize connected!!!")
    groovle.synthesize()
