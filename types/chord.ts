import { MusicKey } from './key'

export type ChordType =
  | 'major'
  | 'minor'
  | 'dim'
  | 'aug'
  | 'major7'
  | 'minor7'
  | 'dominant7'
  | 'dim7'
  | 'aug7'
  | 'halfdim7'

export const ChordTypeAbbreviations: { [key in ChordType]: string } = {
  major: 'Maj',
  minor: 'm',
  dim: 'dim',
  aug: 'aug',
  major7: 'Maj7',
  minor7: 'm7',
  dominant7: '7',
  dim7: 'dim7',
  aug7: 'aug7',
  halfdim7: 'm7♭5',
}

export const EVERY_CHORDTYPES: ChordType[] = [
  'major',
  'minor',
  'dim',
  'aug',
  'major7',
  'minor7',
  'dominant7',
  'dim7',
  'aug7',
  'halfdim7',
]
export const TRIAD_CHORDTYPES: ChordType[] = ['major', 'minor', 'dim', 'aug']
export const SEVENTH_CHORDTYPES: ChordType[] = [
  'major7',
  'minor7',
  'dominant7',
  'dim7',
  'aug7',
  'halfdim7',
]

export const MAJOR_DIATONIC_CHORDTYPE: ChordType[] = [
  'major7',
  'minor7',
  'minor7',
  'major7',
  'dominant7',
  'minor7',
  'halfdim7',
]

export const NATURAL_MINOR_DIATONIC_CHORDTYPE: ChordType[] = [
  'minor7',
  'dim7',
  'major7',
  'minor7',
  'minor7',
  'major7',
  'dominant7',
]

export type Chord = {
  root: MusicKey
  type: ChordType
}
