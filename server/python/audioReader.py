import os
import numpy as np

import pydub
import librosa

SAMPLE_RATE = 44100


def audioReader(filename):
    _, ext = os.path.splitext(filename)
    if ext == ".wav" or ext == ".mp3":
        a = pydub.AudioSegment.from_file("NAS/session/"+filename)
        y = np.array(a.get_array_of_samples(), dtype=np.float32)
        sr = a.frame_rate
        ch_len = a.channels
    else:
        return "error"

    if ch_len == 2:
        y = y.reshape((-1, 2))
        y1 = y[:, 0]
        # y2 = y[:, 1]
        # 일단 스테레오면 왼쪽 음원만 활용 (평균 x)
        y = y1  # (y1 + y2) / 2

    if sr != SAMPLE_RATE:
        y = librosa.resample(y, sr, SAMPLE_RATE)
        sr = SAMPLE_RATE

    return y, sr


# if __name__ == "__main__":
    # url = ""
    # ext = "m4a"

    # y, sr = audioReader(url, ext)
    # write("audio/igrY/result/result.wav", 44100, y)
