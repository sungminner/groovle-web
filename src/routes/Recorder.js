import React from "react";
import AudioRecorder from "audio-recorder-polyfill";
import mpegEncoder from "audio-recorder-polyfill/mpeg-encoder";
import axios from "axios";
import withRouter from "functions/withRouter";
import base_URL from "base_URL";

AudioRecorder.encoder = mpegEncoder;
AudioRecorder.prototype.mimeType = "audio/mpeg";
window.MediaRecorder = AudioRecorder;
let recorder;

class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blob: null,
      blobUrl: null,
    };
  }

  onRecord = () => {
    // Request permissions to record audio
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      this.setState({ isRecording: true });
      recorder = new MediaRecorder(stream);

      // Set record to <audio> when recording will be finished
      recorder.addEventListener("dataavailable", (e) => {
        const blob = e.data;
        const blobUrl = URL.createObjectURL(e.data);
        this.setState({ blob, blobUrl, isRecording: false });
      });

      // Start recording
      recorder.start();
    });
  };

  onStop = () => {
    // Stop recording
    recorder.stop();
    // Remove “recording” icon from browser tab
    recorder.stream.getTracks().forEach((i) => i.stop());
  };

  onSave = async () => {
    const reader = new FileReader();
    reader.onloadend = async (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      await axios
        .post(`${base_URL}/api/uploadsessionfile`, {
          sessionID: this.props.params.sessionid,
          data: result,
          extension: "mp3",
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          this.props.navigate(-1);
        });
    };
    reader.readAsDataURL(this.state.blob);
  };

  onRerecord = () => {
    this.setState({ blob: null, blobUrl: null, isRecording: false });
  };

  render() {
    return (
      <>
        {this.state.blobUrl ? (
          <>
            <audio src={this.state.blobUrl} controls="controls" />
            <div>
              <button onClick={this.onSave}>저장</button>
              <button onClick={this.onRerecord}>삭제</button>
            </div>
          </>
        ) : (
          <>
            <button onClick={this.onRecord} disabled={this.state.isRecording}>
              Record
            </button>
            <button onClick={this.onStop} disabled={!this.state.isRecording}>
              Stop
            </button>
          </>
        )}
        {this.state.isRecording && <span>녹음중...</span>}
      </>
    );
  }
}

// const Recorder = () => {
//   AudioRecorder.encoder = mpegEncoder;
//   AudioRecorder.prototype.mimeType = "audio/mpeg";
//   window.MediaRecorder = AudioRecorder;
//   if (MediaRecorder.notSupported) {
//     console.log("MediaRecorder not supported");
//   }

//   let recorder;

//   const onRecord = () => {
//     // Request permissions to record audio
//     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
//       recorder = new MediaRecorder(stream);

//       // Set record to <audio> when recording will be finished
//       recorder.addEventListener("dataavailable", (e) => {
//         // audio.src = URL.createObjectURL(e.data);
//         console.log(e.data);
//       });

//       // Start recording
//       recorder.start();
//     });
//   };

//   const onStop = () => {
//     // Stop recording
//     recorder.stop();
//     // Remove “recording” icon from browser tab
//     recorder.stream.getTracks().forEach((i) => i.stop());
//   };
//   return (
//     <>
//       <button onClick={onRecord}>record</button>
//       <button onClick={onStop}>stop</button>
//     </>
//   );
// };

export default withRouter(Recorder);
