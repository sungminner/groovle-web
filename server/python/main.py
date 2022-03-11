import sys
import json
from synthesizer import GroovleSynthesizer


class Groovle:
    def __init__(self):
        self.synthesizer = GroovleSynthesizer()

    # 합성
    def synthesize(self):
        self.synthesizer.setFiles(json.loads(sys.argv[2]))
        self.synthesizer.synthesize()
        self.synthesizer.saveAsFile(sys.argv[3])


groovle = Groovle()
if sys.argv[1] == "synthesize":
    files = json.loads(sys.argv[2])
    print("synthesize connected!!!")
    groovle.synthesize()
