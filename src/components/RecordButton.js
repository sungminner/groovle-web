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

class RecordButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
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
      this.state.onRecordPlay();
    });
  };

  onStop = () => {
    // Stop recording
    recorder.stop();
    this.setState({ isRecording: false });
    this.state.onRecordStop();
    // Remove “recording” icon from browser tab
    recorder.stream.getTracks().forEach((i) => i.stop());
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.blob !== prevState.blob) {
      this.props.navigate(
        `/studio/${this.props.params.randomKey}/editor/${this.props.params.sessionid}`,
        { replace: true, state: { data: this.state.blob } }
      );
    }
  }

  render() {
    return (
      <>
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

export default withRouter(RecordButton);
