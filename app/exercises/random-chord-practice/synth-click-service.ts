// https://github.com/johnnysn/chrono-bump/blob/master/src/services/synth-click-service.ts

let audioContext: AudioContext
let envelope: GainNode

export const createAudioContext = () => {
  if (typeof window !== 'undefined') {
    const AudioContext = window.AudioContext
    audioContext = new AudioContext()

    envelope = audioContext.createGain()
    envelope.connect(audioContext.destination)
  }
}

// TODO: AudioContext may not function when the device is in silent mode on iOS.
// Consider using mp3 files as an alternative.
export class SynthClickService {
  play() {
    if (!audioContext || !envelope) {
      createAudioContext()
    }

    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }

    if (audioContext && envelope) {
      envelope.gain.cancelScheduledValues(0)
      const oscillator = audioContext.createOscillator()
      oscillator.type = 'triangle'
      oscillator.frequency.value = 400
      oscillator.connect(envelope)

      envelope.gain.value = 0
      const time = audioContext.currentTime
      //envelope.gain.linearRampToValueAtTime(1, time + 0.01);
      envelope.gain.setValueAtTime(1, time + 0.01)
      envelope.gain.linearRampToValueAtTime(0.001, time + 0.04)

      oscillator.start()
      oscillator.stop(time + 0.1)
    }
  }
}

const synthClickService = new SynthClickService()
export default synthClickService
