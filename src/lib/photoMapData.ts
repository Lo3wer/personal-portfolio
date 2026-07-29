export type MapPhoto = {
  id: string
  lat: number
  lng: number
  src: string
  timestamp: string
  comment: string
  location: string
}

export const photoMapData: MapPhoto[] = [
  {
    id: 'rocket',
    lat: 49.2827,
    lng: -123.1207,
    src: '/images/rocket.jpg',
    timestamp: '2026-07-21',
    comment: 'sdf',
    location: 'Vancouver, BC',
  },
  {
    id: 'montypython',
    lat: 49.2606,
    lng: -123.2460,
    src: '/images/montypython.png',
    timestamp: '2024-08-29',
    comment: 'Monty Python - MATH 302 course review',
    location: 'Vancouver, BC',
  },
  {
    id: 'monkeysaddle',
    lat: 49.2543,
    lng: -123.2056,
    src: '/images/monkeysaddle.png',
    timestamp: '2024-06-29',
    comment: 'Monkey saddle - MATH 253 multivariable calculus',
    location: 'Vancouver, BC',
  },
  {
    id: 'personal',
    lat: 49.2658,
    lng: -123.0790,
    src: '/images/personal.jpeg',
    timestamp: '2024',
    comment: 'Leo Zhang - Computer Engineering student at UBC',
    location: 'Burnaby, BC',
  },
  {
    id: 'crafting-interpreters',
    lat: 49.2700,
    lng: -123.1500,
    src: '/images/crafting-interpreters.png',
    timestamp: '2024-06-01',
    comment: 'Lox Treewalk Interpreter project',
    location: 'Vancouver, BC',
  },
  {
    id: 'chip8',
    lat: 49.2750,
    lng: -123.1000,
    src: '/images/chip-8_ibm_logo.png',
    timestamp: '2024',
    comment: 'Chip-8 Emulator project',
    location: 'Vancouver, BC',
  },
  {
    id: 'newsmapper',
    lat: 49.2780,
    lng: -123.1700,
    src: '/images/newsmapper.png',
    timestamp: '2024',
    comment: 'NewsMapper - interactive map of events',
    location: 'Vancouver, BC',
  },
]
