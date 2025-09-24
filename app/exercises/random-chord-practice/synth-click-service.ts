// https://github.com/johnnysn/chrono-bump/blob/master/src/services/synth-click-service.ts

let audioContext: AudioContext | null = null
let envelope: GainNode | null = null

export const createAudioContext = (): boolean => {
  if (typeof window === 'undefined') return false

  try {
    // Check for AudioContext support
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!AudioContextClass) {
      console.warn('Web Audio API is not supported in this browser')
      return false
    }

    audioContext = new AudioContextClass()
    envelope = audioContext.createGain()
    envelope.connect(audioContext.destination)
    return true
  } catch (error) {
    console.warn('Failed to create AudioContext:', error)
    return false
  }
}

// TODO: AudioContext may not function when the device is in silent mode on iOS.
// Consider using mp3 files as an alternative.
export class SynthClickService {
  play() {
    try {
      if (!audioContext || !envelope) {
        const created = createAudioContext()
        if (!created) {
          // AudioContext creation failed, silently return
          return
        }
      }

      if (!audioContext || !envelope) {
        // Still no audioContext after creation attempt
        return
      }

      if (audioContext.state === 'suspended') {
        audioContext.resume()
      }

      envelope.gain.cancelScheduledValues(0)
      const oscillator = audioContext.createOscillator()
      oscillator.type = 'triangle'
      oscillator.frequency.value = 400
      oscillator.connect(envelope)

      envelope.gain.value = 0
      const time = audioContext.currentTime
      envelope.gain.setValueAtTime(1, time + 0.01)
      envelope.gain.linearRampToValueAtTime(0.001, time + 0.04)

      oscillator.start()
      oscillator.stop(time + 0.1)
    } catch (error) {
      // Silently handle audio playback errors
      console.warn('Audio playback failed:', error)
    }
  }
}

const synthClickService = new SynthClickService()
export default synthClickService
