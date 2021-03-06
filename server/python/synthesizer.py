import numpy as np
import pydub
from audioReader import audioReader

SAMPLE_RATE = 44100


class GroovleSynthesizer:
    def __init__(self):
        self.files = []
        self.volumes = []
        self.offsets = []
        self.result = None

    def setFiles(self, list):
        self.files = list

    def setVolumes(self, list):
        self.volumes = list

    def setOffsets(self, list):
        self.offsets = list

    def synthesize(self):
        result = np.array([])
        for i in range(len(self.files)):
            y, _ = audioReader(self.files[i])
            if self.offsets[i] > 0:
                y = y[round(self.offsets[i] * 44100) :]
            else:
                y = np.hstack(
                    (np.zeros(round(self.offsets[i] * 44100), dtype=np.float32), y)
                )
            y *= self.volumes[i]
            if len(result) < len(y):
                temp = y
                temp[: len(result)] += result
            else:
                temp = result
                temp[: len(y)] += y
            result = temp
        result /= sum(self.volumes)
        result = result.astype(np.float32)
        self.result = result

    def saveAsFile(self, songID, normalized=False):
        """numpy array to MP3"""
        x = self.result
        channels = 2 if (x.ndim == 2 and x.shape[1] == 2) else 1
        if normalized:  # normalized array - each item should be a float in [-1, 1)
            y = np.int16(x * 2 ** 15)
        else:
            y = np.int16(x)
        song = pydub.AudioSegment(
            y.tobytes(), frame_rate=SAMPLE_RATE, sample_width=2, channels=channels
        )
        song.export("NAS/song/" + songID + ".mp3", format="mp3")
        print(True)


if __name__ == "__main__":
    synthesizer = GroovleSynthesizer()
    synthesizer.synthesize()
    synthesizer.saveAsFile()
