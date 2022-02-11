import React from "react";
import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
import AudioRecorder from "audio-recorder-polyfill";
import mpegEncoder from "audio-recorder-polyfill/mpeg-encoder";

AudioRecorder.encoder = mpegEncoder;
AudioRecorder.prototype.mimeType = "audio/mpeg";
window.MediaRecorder = AudioRecorder;
let recorder;

class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ...this.props.location.state,
      session: null,
      isRecording: false,
      blob: null,
      blobUrl: null,
    };
  }

  // componentDidMount() {
  //   if (this.props.location.state === undefined) {
  //     this.props.history.push({
  //       pathname: "/",
  //     });
  //   }
  // }

  onSessionChange = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({ session: value });
  };

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

  onSave = async (event) => {
    event.preventDefault();
    if (!this.state.uid) {
      alert("로그인 후 이용 가능합니다");
      return;
    }
    console.log("저장 버튼 클릭");
  };

  render() {
    return (
      <>
        <div>
          <Link to="/song">방으로</Link>
          <h3>{this.state.title}</h3>
          <p>{this.state.artist}</p>
          <p>녹음</p>
        </div>
        <form onSubmit={this.onSave}>
          <div>
            <input
              type="text"
              onChange={this.onSessionChange}
              placeholder="세션명"
              required
            />
          </div>
          {this.state.blobUrl && (
            <>
              <audio src={this.state.blobUrl} controls="controls" />
              <input type="submit" value="저장" />
            </>
          )}
        </form>
        <button onClick={this.onRecord} disabled={this.state.isRecording}>
          Record
        </button>
        <button onClick={this.onStop} disabled={!this.state.isRecording}>
          Stop
        </button>
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

export default Recorder;
