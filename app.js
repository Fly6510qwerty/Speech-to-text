const START_BTN = document.getElementById('recordBtn') //This is for the HTMLButtonElement 
const RESULTS = document.getElementById('resultBox') //This is for the HTMLDivElement


let isRecording = false //This is to create a boolean variable to check if the recording is in progress or not
let speechObj = null //This is creating a variable to hold the SpeechRecognition object and initializing it as null

const Speechregonition = window.SpeechRecognition || window.webkitSpeechRecognition
//Speech recognizion API


if (!Speechregonition) {
    START_BIN.innerText = "Microphone not enabled"
    START_BTN.disabled = true
}

START_BTN.addEventListener('click', () => {
    isRecording = !isRecording //This is to toggle the isRecording variable between true and false
    isRecording ? startRecording() : stopRecording() //This is to call the startRecording or stopRecording function based on the value of isRecording
})

function startRecording() {
    START_BTN.innerText = "Recording in progress..."
    speechObj = new SpeechRegonition() //This is to create a new instance of the SpeechRecognition object
    speechObj.start() //This is to start the speech recognition process
    speechObj.onresult = transcribe 
}

function transcribe(e) { //e: SpeechRecognitionEvent
console.log(e)
}

function stopRecording() {
    speechObj.stop() //This is to stop the speech recognition process
    speechObj = null //This is to reset the speechObj variable to null
    START_BTN.innerText = "Start Transalating"
}