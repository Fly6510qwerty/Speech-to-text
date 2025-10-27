const START_BTN = document.getElementById('recordBtn') // HTMLButtonElement
const RESULTS = document.getElementById('resultBox') // HTMLDivElement

let isRecording = false // whether recording is in progress
let speechObj = null // SpeechRecognition instance

// Use the browser SpeechRecognition implementation if available
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

if (!SpeechRecognition) {
    START_BTN.innerText = "Microphone not supported"
    START_BTN.disabled = true
} else {
    START_BTN.addEventListener('click', () => {
        isRecording = !isRecording // toggle recording state
        isRecording ? startRecording() : stopRecording()
    })
}

function startRecording() {
    START_BTN.innerText = "Recording... click to stop"
    speechObj = new SpeechRecognition()
    // continuous can be true if you want longer capture; browsers vary
    speechObj.continuous = false
    speechObj.interimResults = true
    speechObj.lang = 'en-US' // change as needed or expose to UI

    speechObj.onresult = transcribe
    speechObj.onerror = (err) => {
        console.error('SpeechRecognition error', err)
        RESULTS.textContent = 'Error: ' + (err.error || err.message || 'unknown')
        isRecording = false
        START_BTN.innerText = 'Start'
    }

    speechObj.onend = () => {
        // when recognition ends (user stopped speaking or .stop() called)
        isRecording = false
        START_BTN.innerText = 'Start'
    }

    try {
        speechObj.start()
    } catch (e) {
        // some browsers throw if start() called twice
        console.warn('start() failed', e)
    }
}

function transcribe(e) { // e: SpeechRecognitionEvent
    // Combine all results (interim + final) into a single transcript string
    const transcript = Array.from(e.results)
        .map(result => result[0].transcript)
        .join('')

    // Show interim/final transcript in the result box
    RESULTS.textContent = transcript

    // If a final result occurred, you may want to stop
    if (e.results[0].isFinal) {
        // stopRecording() will be triggered by onend, but you can stop explicitly
        // stopRecording()
        console.log('Final transcript:', transcript)
    }
}

function stopRecording() {
    if (speechObj) {
        try {
            speechObj.stop()
        } catch (e) {
            console.warn('stop() failed', e)
        }
    }
    speechObj = null
    isRecording = false
    START_BTN.innerText = 'Start'
}
