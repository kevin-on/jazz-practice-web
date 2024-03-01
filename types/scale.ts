import { MusicKey } from './key'

export type ScaleType = 'major' | 'natural minor'
export type Scale = { key: MusicKey; type: ScaleType; notes: MusicKey[] }

export const MAJOR_SCALES: Scale[] = [
  { key: 'C', type: 'major', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
  { key: 'G', type: 'major', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F♯'] },
  { key: 'D', type: 'major', notes: ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯'] },
  { key: 'A', type: 'major', notes: ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯'] },
  { key: 'E', type: 'major', notes: ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯'] },
  { key: 'B', type: 'major', notes: ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯'] },
  {
    key: 'F♯',
    type: 'major',
    notes: ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯'],
  },
  {
    key: 'G♭',
    type: 'major',
    notes: ['G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F'],
  },
  { key: 'D♭', type: 'major', notes: ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C'] },
  {
    key: 'C♯',
    type: 'major',
    notes: ['C♯', 'D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯'],
  },
  { key: 'A♭', type: 'major', notes: ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G'] },
  { key: 'E♭', type: 'major', notes: ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D'] },
  { key: 'B♭', type: 'major', notes: ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A'] },
  { key: 'F', type: 'major', notes: ['F', 'G', 'A', 'B♭', 'C', 'D', 'E'] },
]

export const NATURAL_MINOR_SCALES: Scale[] = [
  {
    key: 'A',
    type: 'natural minor',
    notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  },
  {
    key: 'E',
    type: 'natural minor',
    notes: ['E', 'F♯', 'G', 'A', 'B', 'C', 'D'],
  },
  {
    key: 'B',
    type: 'natural minor',
    notes: ['B', 'C♯', 'D', 'E', 'F♯', 'G', 'A'],
  },
  {
    key: 'F♯',
    type: 'natural minor',
    notes: ['F♯', 'G♯', 'A', 'B', 'C♯', 'D', 'E'],
  },
  {
    key: 'C♯',
    type: 'natural minor',
    notes: ['C♯', 'D♯', 'E', 'F♯', 'G♯', 'A', 'B'],
  },
  {
    key: 'G♯',
    type: 'natural minor',
    notes: ['G♯', 'A♯', 'B', 'C♯', 'D♯', 'E', 'F♯'],
  },
  {
    key: 'A♭',
    type: 'natural minor',
    notes: ['A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F♭', 'G♭'],
  },
  {
    key: 'D♯',
    type: 'natural minor',
    notes: ['D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B', 'C♯'],
  },
  {
    key: 'E♭',
    type: 'natural minor',
    notes: ['E♭', 'F', 'G♭', 'A♭', 'B♭', 'C♭', 'D♭'],
  },
  {
    key: 'A♯',
    type: 'natural minor',
    notes: ['A♯', 'B♯', 'C♯', 'D♯', 'E♯', 'F♯', 'G♯'],
  },
  {
    key: 'B♭',
    type: 'natural minor',
    notes: ['B♭', 'C', 'D♭', 'E♭', 'F', 'G♭', 'A♭'],
  },
  {
    key: 'F',
    type: 'natural minor',
    notes: ['F', 'G', 'A♭', 'B♭', 'C', 'D♭', 'E♭'],
  },
  {
    key: 'C',
    type: 'natural minor',
    notes: ['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B♭'],
  },
  {
    key: 'G',
    type: 'natural minor',
    notes: ['G', 'A', 'B♭', 'C', 'D', 'E♭', 'F'],
  },
  {
    key: 'D',
    type: 'natural minor',
    notes: ['D', 'E', 'F', 'G', 'A', 'B♭', 'C'],
  },
]
