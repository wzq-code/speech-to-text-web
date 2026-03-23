const toggleButton = document.getElementById("toggleButton");
const clearButton = document.getElementById("clearButton");
const statusText = document.getElementById("status");
const transcript = document.getElementById("transcript");
const placeholder = document.getElementById("placeholder");
const supportMessage = document.getElementById("supportMessage");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let isRecording = false;
let finalTranscript = "";
let interimTranscript = "";

function renderTranscript() {
  const combinedText = [finalTranscript, interimTranscript].filter(Boolean).join("");

  if (combinedText) {
    transcript.textContent = combinedText;
    transcript.classList.add("has-content");
    placeholder.hidden = true;
  } else {
    transcript.textContent = "";
    transcript.classList.remove("has-content");
    placeholder.hidden = false;
  }
}

function setRecordingState(recording) {
  isRecording = recording;
  toggleButton.textContent = recording ? "停止录音" : "开始录音";
  toggleButton.classList.toggle("recording", recording);
  statusText.textContent = recording ? "录音中" : "未录音";
  statusText.classList.toggle("recording", recording);
}

function showUnsupported(message) {
  toggleButton.disabled = true;
  clearButton.disabled = true;
  supportMessage.hidden = false;
  supportMessage.textContent = message;
}

function setupRecognition() {
  if (!SpeechRecognition) {
    showUnsupported("当前浏览器不支持语音识别。建议使用最新版 Chrome 或 Edge 打开。");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-CN";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    setRecordingState(true);
  };

  recognition.onresult = (event) => {
    interimTranscript = "";

    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const result = event.results[index];
      const text = result[0].transcript;

      if (result.isFinal) {
        finalTranscript += text;
      } else {
        interimTranscript += text;
      }
    }

    renderTranscript();
  };

  recognition.onerror = (event) => {
    if (event.error === "not-allowed") {
      supportMessage.hidden = false;
      supportMessage.textContent = "麦克风权限被拒绝，请允许浏览器访问麦克风后重试。";
    } else if (event.error !== "no-speech") {
      supportMessage.hidden = false;
      supportMessage.textContent = `识别过程中出现问题：${event.error}`;
    }

    setRecordingState(false);
  };

  recognition.onend = () => {
    if (isRecording) {
      recognition.start();
      return;
    }

    setRecordingState(false);
  };
}

toggleButton.addEventListener("click", () => {
  supportMessage.hidden = true;

  if (!recognition) {
    return;
  }

  if (isRecording) {
    isRecording = false;
    recognition.stop();
    return;
  }

  try {
    recognition.start();
  } catch (error) {
    supportMessage.hidden = false;
    supportMessage.textContent = "语音识别启动失败，请稍后重试。";
  }
});

clearButton.addEventListener("click", () => {
  finalTranscript = "";
  interimTranscript = "";
  renderTranscript();
});

setupRecognition();
renderTranscript();
