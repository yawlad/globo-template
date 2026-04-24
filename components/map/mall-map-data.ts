import type { FloorFilter } from "@/components/shops/shop-types";

export type Point = [number, number];

export type RoomMarkerPlacement = {
  offsetX?: number;
  offsetY?: number;
  scale?: number;
};

export type MapCanvasPadding = {
  bottom: number;
  left: number;
  right: number;
  top: number;
};

export type Room = {
  id: string;
  markerPlacement?: RoomMarkerPlacement;
  roomNumber: string;
  floor: FloorFilter;
  points: Point[];
};

export const MAP_BASE_WIDTH = 750;
export const MAP_BASE_HEIGHT = 560;

export const MAP_PADDING: MapCanvasPadding = {
  top: 0,
  right: 0,
  bottom: 50,
  left: 50,
};

export const MAP_WIDTH = MAP_BASE_WIDTH + MAP_PADDING.left + MAP_PADDING.right;
export const MAP_HEIGHT = MAP_BASE_HEIGHT + MAP_PADDING.top + MAP_PADDING.bottom;

export const rooms: Room[] = [
  {
    id: "e-1",
    markerPlacement: { scale: 1 },
    roomNumber: "0-01",
    floor: "0",
    points: [
      [0, 0],
      [0, 213],
      [173.6, 213],
      [173.6, 0],
    ],
  },
  {
    id: "e-2",
    markerPlacement: { scale: 2 },
    roomNumber: "0-02",
    floor: "0",
    points: [
      [212.9, 0],
      [212.9, 316.3],
      [685.1, 316.3],
      [685.1, 0],
    ],
  },
  {
    id: "e-3",
    markerPlacement: { scale: 1, offsetY: 5  },
    roomNumber: "0-03",
    floor: "0",
    points: [
      [78.3, 253],
      [78.3, 313.5],
      [173.6, 313.5],
      [173.6, 253],
    ],
  },
  {
    id: "e-4",
    markerPlacement: { scale: 1, offsetX: 10, offsetY: 15 },
    roomNumber: "0-04",
    floor: "0",
    points: [
      [78.3, 313.5],
      [78.3, 373.5],
      [55.2, 373.5],
      [55.2, 408.5],
      [100, 408.5],
      [100, 383.5],
      [173.6, 383.5],
      [173.6, 313.5],
    ],
  },
  {
    id: "e-5",
    markerPlacement: { scale: 0.8, offsetY: 3 },
    roomNumber: "0-05",
    floor: "0",
    points: [
      [100, 383.5],
      [100, 408.5],
      [173.6, 408.5],
      [173.6, 383.5],
    ],
  },
  {
    id: "e-6",
    markerPlacement: { scale: 1 },
    roomNumber: "0-06",
    floor: "0",
    points: [
      [0, 383.5],
      [0, 408.5],
      [55.2, 408.5],
      [55.2, 383.5],
    ],
  },
  {
    id: "e-7",
    markerPlacement: { scale: 1 },
    roomNumber: "0-07",
    floor: "0",
    points: [
      [212.9, 316.3],
      [212.9, 393.1],
      [448.5, 393.1],
      [448.5, 316.3],
    ],
  },
  {
    id: "e-8",
    markerPlacement: { scale: 1 },
    roomNumber: "0-08",
    floor: "0",
    points: [
      [448.5, 316.3],
      [448.5, 393.1],
      [561.2, 393.1],
      [561.2, 316.3],
    ],
  },
  {
    id: "e-9",
    markerPlacement: { scale: 1 },
    roomNumber: "0-09",
    floor: "0",
    points: [
      [561.2, 316.3],
      [561.2, 393.1],
      [596.4, 393.1],
      [596.4, 316.3],
    ],
  },
  {
    id: "e-10",
    markerPlacement: { scale: 1 },
    roomNumber: "0-10",
    floor: "0",
    points: [
      [596.4, 316.3],
      [596.4, 393.1],
      [620.8, 393.1],
      [620.8, 316.3],
    ],
  },
  {
    id: "e-11",
    markerPlacement: { scale: 1 },
    roomNumber: "0-11",
    floor: "0",
    points: [
      [0, 437],
      [0, 508.4],
      [26.8, 508.4],
      [26.8, 467.5],
      [39, 467.5],
      [39, 437],
    ],
  },
  {
    id: "e-12",
    markerPlacement: { scale: 1 },
    roomNumber: "0-12",
    floor: "0",
    points: [
      [39, 437],
      [39, 467.5],
      [26.8, 467.5],
      [26.8, 508.4],
      [85.2, 508.4],
      [85.2, 437],
    ],
  },
  {
    id: "e-13",
    markerPlacement: { scale: 1 },
    roomNumber: "0-13",
    floor: "0",
    points: [
      [85.2, 437],
      [85.2, 508.4],
      [125.2, 508.4],
      [125.2, 437],
    ],
  },
  {
    id: "e-14",
    markerPlacement: { scale: 1 },
    roomNumber: "0-14",
    floor: "0",
    points: [
      [125.2, 437],
      [125.2, 508.4],
      [151.4, 508.4],
      [151.4, 437],
    ],
  },
  {
    id: "e-15",
    markerPlacement: { scale: 1 },
    roomNumber: "0-15",
    floor: "0",
    points: [
      [151.4, 437],
      [151.4, 508.4],
      [174.4, 508.4],
      [174.4, 437],
    ],
  },
  {
    id: "e-16",
    markerPlacement: { scale: 1 },
    roomNumber: "0-16",
    floor: "0",
    points: [
      [174.4, 437],
      [174.4, 508.4],
      [197.4, 508.4],
      [197.4, 437],
    ],
  },
  {
    id: "e-17",
    markerPlacement: { scale: 1 },
    roomNumber: "0-17",
    floor: "0",
    points: [
      [197.4, 437],
      [197.4, 508.4],
      [254.4, 508.4],
      [254.4, 437],
    ],
  },
  {
    id: "e-18",
    markerPlacement: { scale: 1 },
    roomNumber: "0-18",
    floor: "0",
    points: [
      [254.4, 437],
      [254.4, 508.4],
      [314.4, 508.4],
      [314.4, 437],
    ],
  },
  {
    id: "e-19",
    markerPlacement: { scale: 1 },
    roomNumber: "0-19",
    floor: "0",
    points: [
      [314.4, 437],
      [314.4, 508.4],
      [374.4, 508.4],
      [374.4, 437],
    ],
  },
  {
    id: "e-20",
    markerPlacement: { scale: 1 },
    roomNumber: "0-20",
    floor: "0",
    points: [
      [374.4, 437],
      [374.4, 508.4],
      [444.4, 508.4],
      [444.4, 437],
    ],
  },
  {
    id: "e-21",
    markerPlacement: { scale: 1 },
    roomNumber: "0-21",
    floor: "0",
    points: [
      [444.4, 437],
      [444.4, 508.4],
      [480.4, 508.4],
      [480.4, 437],
    ],
  },
  {
    id: "e-22",
    markerPlacement: { scale: 1 },
    roomNumber: "0-22",
    floor: "0",
    points: [
      [480.4, 437],
      [480.4, 508.4],
      [498.4, 508.4],
      [498.4, 498.4],
      [516.4, 498.4],
      [516.4, 437],
    ],
  },
];
