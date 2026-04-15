"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { floorFilters, shops } from "@/components/shops/shops-data";

type Point = [number, number]; // [x, yFromBottom]

type PolygonShape = {
  id: string;
  points: Point[];
};

type OccupiedPolygon = PolygonShape & {
  shopSlug: string;
};

type Amenity = {
  id: string;
  type: "wc" | "stairs" | "elevator";
  title: string;
  x: number;
  y: number; // from bottom
};

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 760;

const corridors: PolygonShape[] = [
  // { id: "c-1", points: [[70, 174], [1120, 674], [1120, 602], [70, 602]] },
  // { id: "c-2", points: [[70, 584], [300, 584], [300, 164], [70, 164]] },
  // { id: "c-3", points: [[320, 584], [1055, 584], [1055, 524], [320, 524]] },
  // { id: "c-4", points: [[1030, 584], [1120, 584], [1120, 164], [1030, 164]] },
  // { id: "c-5", points: [[320, 232], [1030, 232], [1030, 164], [320, 164]] },
];

const emptyRooms: PolygonShape[] = [
  {
    id: "e-1",
    points: [
      [0, 0],
      [0, 213],
      [173.6, 213],
      [173.6, 0],
    ],
  },
  {
    id: "e-2",
    points: [
      [212.9, 0],
      [212.9, 316.3],
      [685.1, 316.3],
      [685.1, 0],
    ],
  },
  {
    id: "e-3",
    points: [
      [78.3, 253],
      [78.3, 313.5],
      [173.6, 313.5],
      [173.6, 253],
    ],
  },
  {
    id: "e-4",
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
    points: [
      [100, 383.5],
      [100, 408.5],
      [173.6, 408.5],
      [173.6, 383.5],
    ],
  },
  {
    id: "e-6",
    points: [
      [0, 383.5],
      [0, 408.5],
      [55.2, 408.5],
      [55.2, 383.5],
    ],
  },
  {
    id: "e-7",
    points: [
      [212.9, 316.3],
      [212.9, 393.1],
      [448.5, 393.1],
      [448.5, 316.3],
    ],
  },
  {
    id: "e-8",
    points: [
      [448.5, 316.3],
      [448.5, 393.1],
      [561.2, 393.1],
      [561.2, 316.3],
    ],
  },
  {
    id: "e-9",
    points: [
      [561.2, 316.3],
      [561.2, 393.1],
      [596.4, 393.1],
      [596.4, 316.3],
    ],
  },
  {
    id: "e-10",
    points: [
      [596.4, 316.3],
      [596.4, 393.1],
      [620.8, 393.1],
      [620.8, 316.3],
    ],
  },
  {
    id: "e-11",
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
    points: [
      [85.2, 437],
      [85.2, 508.4],
      [125.2, 508.4],
      [125.2, 437],
    ],
  },
  {
    id: "e-14",
    points: [
      [125.2, 437],
      [125.2, 508.4],
      [151.4, 508.4],
      [151.4, 437],
    ],
  },
  {
    id: "e-15",
    points: [
      [151.4, 437],
      [151.4, 508.4],
      [174.4, 508.4],
      [174.4, 437],
    ],
  },
  {
    id: "e-16",
    points: [
      [174.4, 437],
      [174.4, 508.4],
      [197.4, 508.4],
      [197.4, 437],
    ],
  },
  {
    id: "e-17",
    points: [
      [197.4, 437],
      [197.4, 508.4],
      [254.4, 508.4],
      [254.4, 437],
    ],
  },
  {
    id: "e-18",
    points: [
      [254.4, 437],
      [254.4, 508.4],
      [314.4, 508.4],
      [314.4, 437],
    ],
  },
  {
    id: "e-19",
    points: [
      [314.4, 437],
      [314.4, 508.4],
      [374.4, 508.4],
      [374.4, 437],
    ],
  },
  {
    id: "e-20",
    points: [
      [374.4, 437],
      [374.4, 508.4],
      [444.4, 508.4],
      [444.4, 437],
    ],
  },
  {
    id: "e-21",
    points: [
      [444.4, 437],
      [444.4, 508.4],
      [480.4, 508.4],
      [480.4, 437],
    ],
  },{
    id: "e-22",
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

const occupiedRooms: OccupiedPolygon[] = [
  // {
  //   id: "o-1",
  //   shopSlug: "fresh-market",
  //   points: [[330, 458], [548, 458], [580, 404], [570, 244], [350, 244], [320, 290], [320, 430]],
  // },
  // {
  //   id: "o-2",
  //   shopSlug: "kids-planet",
  //   points: [[590, 512], [820, 512], [820, 244], [610, 244], [580, 290], [580, 480]],
  // },
  // {
  //   id: "o-3",
  //   shopSlug: "tech-point",
  //   points: [[840, 512], [1030, 512], [1030, 244], [860, 244], [830, 290], [830, 474]],
  // },
];

const amenities: Amenity[] = [
  // { id: "a-1", type: "wc", title: "Туалет", x: 134, y: 514 },
  // { id: "a-2", type: "stairs", title: "Лестница", x: 234, y: 514 },
  // { id: "a-3", type: "elevator", title: "Лифт", x: 134, y: 430 },
  // { id: "a-4", type: "wc", title: "Туалет", x: 1074, y: 514 },
  // { id: "a-5", type: "stairs", title: "Лестница", x: 1074, y: 430 },
  // { id: "a-6", type: "elevator", title: "Лифт", x: 1074, y: 346 },
];

const amenityIcon: Record<Amenity["type"], string> = {
  wc: "WC",
  stairs: "ST",
  elevator: "EL",
};

function toSvgY(yFromBottom: number) {
  return MAP_HEIGHT - yFromBottom;
}

function toSvgPoints(points: Point[]) {
  return points.map(([x, y]) => [x, toSvgY(y)] as Point);
}

function pointsToString(points: Point[]) {
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

function getBounds(points: Point[]) {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return {
    minX,
    minY,
    maxX,
    maxY,
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

export function MallMap() {
  const router = useRouter();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [popupConfirm, setPopupConfirm] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const shopBySlug = useMemo(
    () => new Map(shops.map((shop) => [shop.slug, shop])),
    [],
  );

  const selectedRoom =
    occupiedRooms.find((room) => room.id === selectedRoomId) ?? null;
  const selectedShop = selectedRoom
    ? shopBySlug.get(selectedRoom.shopSlug)
    : null;
  const selectedRoomBounds = selectedRoom
    ? getBounds(toSvgPoints(selectedRoom.points))
    : null;

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const stopPageScroll = (event: Event) => {
      event.preventDefault();
    };

    element.addEventListener("wheel", stopPageScroll, { passive: false });
    element.addEventListener("touchmove", stopPageScroll, { passive: false });

    return () => {
      element.removeEventListener("wheel", stopPageScroll);
      element.removeEventListener("touchmove", stopPageScroll);
    };
  }, []);

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    const delta = event.deltaY > 0 ? -0.08 : 0.08;
    setZoom((prev) => Math.max(0.65, Math.min(2.3, prev + delta)));
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setDragStart({ x: event.clientX - pan.x, y: event.clientY - pan.y });
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging) return;
    setPan({ x: event.clientX - dragStart.x, y: event.clientY - dragStart.y });
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  }

  function handleOccupiedRoomClick(roomId: string) {
    setSelectedRoomId(roomId);
    setPopupConfirm(false);
  }

  function handlePopupClick() {
    if (!selectedShop) return;
    if (!popupConfirm) {
      setPopupConfirm(true);
      return;
    }
    router.push(`/shops/${selectedShop.slug}`);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="mb-8">
        <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-fixed text-on-secondary-fixed-variant text-xs font-bold tracking-widest uppercase">
          Floor Plan
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mt-5">
          Схема ТЦ • 0 этаж
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {floorFilters.map((filter) => {
          const isActive = filter.key === "0";
          const isDisabled = filter.key !== "0";

          return (
            <button
              key={filter.key}
              type="button"
              disabled={isDisabled}
              className={`px-4 h-11 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface text-on-surface border border-outline-variant/30 opacity-60 cursor-not-allowed"
              }`}
            >
              {filter.label}
              {isDisabled ? " (скоро)" : ""}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-3 md:p-4">
        <div
          ref={viewportRef}
          className="relative w-full h-[520px] md:h-[660px] rounded-xl overflow-hidden bg-surface-container-low cursor-grab active:cursor-grabbing touch-none overscroll-none"
          onWheelCapture={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => setIsDragging(false)}
        >
          <div
            className="absolute left-0 top-0 border border-outline-variant/30 bg-white rounded-xl"
            style={{
              width: MAP_WIDTH,
              height: MAP_HEIGHT,
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "0 0",
            }}
          >
            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              className="block"
            >
              {/* <text x={24} y={38} fill="#1c1b1b" fontSize={32} fontWeight={900}>
                GLOBO • Схема 0 этажа
              </text> */}

              {corridors.map((corridor) => (
                <polygon
                  key={corridor.id}
                  points={pointsToString(toSvgPoints(corridor.points))}
                  fill="#f6f3f2"
                  stroke="#e4beb9"
                  strokeWidth={2}
                />
              ))}

              {emptyRooms.map((room) => (
                <polygon
                  key={room.id}
                  points={pointsToString(toSvgPoints(room.points))}
                  fill="#d1d5db"
                  stroke="#9ca3af"
                  strokeWidth={1.5}
                />
              ))}

              {occupiedRooms.map((room) => {
                const shop = shopBySlug.get(room.shopSlug);
                if (!shop) return null;

                const svgPoints = toSvgPoints(room.points);
                const bounds = getBounds(svgPoints);
                const isHovered = room.id === hoveredRoomId;
                const isSelected = room.id === selectedRoomId;

                return (
                  <g
                    key={room.id}
                    onMouseEnter={() => setHoveredRoomId(room.id)}
                    onMouseLeave={() =>
                      setHoveredRoomId((prev) =>
                        prev === room.id ? null : prev,
                      )
                    }
                    onClick={() => handleOccupiedRoomClick(room.id)}
                    className="cursor-pointer"
                  >
                    <polygon
                      points={pointsToString(svgPoints)}
                      fill={isHovered || isSelected ? "#ea8b09" : "#f59e0b"}
                      stroke={isSelected ? "#bb171c" : "#d97706"}
                      strokeWidth={isSelected ? 3 : 2}
                    />
                    <circle
                      cx={bounds.centerX}
                      cy={bounds.centerY - 10}
                      r={28}
                      fill="white"
                      opacity={0.96}
                    />
                    <image
                      href={shop.logoImage}
                      x={bounds.centerX - 20}
                      y={bounds.centerY - 30}
                      width={40}
                      height={40}
                      preserveAspectRatio="xMidYMid slice"
                    />
                    <text
                      x={bounds.centerX}
                      y={bounds.centerY + 34}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={13}
                      fontWeight={800}
                    >
                      {shop.name}
                    </text>
                  </g>
                );
              })}

              {amenities.map((item) => (
                <g key={item.id}>
                  <circle
                    cx={item.x}
                    cy={toSvgY(item.y)}
                    r={26}
                    fill="#ffffff"
                    stroke="#e4beb9"
                    strokeWidth={2}
                  />
                  <text
                    x={item.x}
                    y={toSvgY(item.y) + 6}
                    textAnchor="middle"
                    fill="#5b403d"
                    fontSize={11}
                    fontWeight={700}
                  >
                    {amenityIcon[item.type]}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {selectedShop && selectedRoomBounds && (
            <button
              type="button"
              onClick={handlePopupClick}
              className="absolute z-20 w-[290px] rounded-xl border border-outline-variant/30 bg-white p-4 text-left shadow-xl hover:shadow-2xl transition-shadow"
              style={{
                left: Math.max(
                  12,
                  Math.min(740, selectedRoomBounds.centerX * zoom + pan.x + 10),
                ),
                top: Math.max(
                  12,
                  Math.min(530, selectedRoomBounds.centerY * zoom + pan.y + 10),
                ),
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                0 этаж
              </p>
              <h3 className="text-lg font-black mt-2">{selectedShop.name}</h3>
              <p className="text-sm text-on-surface-variant mt-1">
                {selectedShop.category}
              </p>
              <p className="text-sm mt-3 font-bold text-primary">
                {popupConfirm
                  ? "Открыть страницу магазина →"
                  : "Нажмите еще раз, чтобы открыть страницу"}
              </p>
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 text-sm text-on-surface-variant">
        <Link href="/shops" className="hover:text-primary transition-colors">
          Перейти к списку магазинов →
        </Link>
      </div>
    </section>
  );
}
