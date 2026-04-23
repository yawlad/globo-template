"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  MAP_HEIGHT,
  MAP_WIDTH,
  rooms,
  type Point,
} from "@/components/map/mall-map-data";
import { floorFilters, shops } from "@/components/shops/shops-data";

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
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const shopByRoomId = useMemo(
    () =>
      new Map(
        shops
          .filter((shop) => shop.roomId)
          .map((shop) => [shop.roomId as string, shop]),
      ),
    [],
  );

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId) ?? null;
  const selectedShop = selectedRoom
    ? shopByRoomId.get(selectedRoom.id) ?? null
    : null;
  const selectedRoomBounds = selectedRoom
    ? getBounds(toSvgPoints(selectedRoom.points))
    : null;
  const orderedRooms = useMemo(() => {
    const regularRooms = rooms.filter((room) => room.id !== selectedRoomId);
    const activeRoom = rooms.find((room) => room.id === selectedRoomId);

    return activeRoom ? [...regularRooms, activeRoom] : regularRooms;
  }, [selectedRoomId]);

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

  function handleRoomClick(roomId: string) {
    if (!shopByRoomId.has(roomId)) {
      setSelectedRoomId(null);
      return;
    }

    setSelectedRoomId(roomId);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="mb-8">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-secondary-fixed-variant">
          Floor Plan
        </p>
        <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
          Схема ТЦ • 0 этаж
        </h1>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {floorFilters.map((filter) => {
          const isActive = filter.key === "0";
          const isDisabled = filter.key !== "0";

          return (
            <button
              key={filter.key}
              type="button"
              disabled={isDisabled}
              className={`h-11 rounded-xl px-4 text-sm font-bold transition-all ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "cursor-not-allowed border border-outline-variant/30 bg-surface text-on-surface opacity-60"
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
          className="relative h-[520px] w-full select-none overflow-hidden rounded-xl bg-surface-container-low touch-none overscroll-none cursor-grab active:cursor-grabbing"
          onWheelCapture={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => setIsDragging(false)}
        >
          <div
            className="absolute left-0 top-0 select-none rounded-xl border border-outline-variant/30 bg-white"
            style={{
              width: MAP_WIDTH,
              height: MAP_HEIGHT,
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "0 0",
              transition: isDragging
                ? "none"
                : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              className="block select-none"
            >
              {orderedRooms.map((room) => {
                const shop = shopByRoomId.get(room.id);
                const svgPoints = toSvgPoints(room.points);
                const bounds = getBounds(svgPoints);
                const isHovered = room.id === hoveredRoomId;
                const isSelected = room.id === selectedRoomId;
                const isOccupied = Boolean(shop);
                const isInteractive = isOccupied;
                const shouldLift = isHovered || isSelected;
                const logoSize = Math.max(
                  24,
                  Math.min(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY) *
                    0.38,
                );
                const logoBoxSize = logoSize + 16;
                const roomLabelY = bounds.maxY - 10;

                return (
                  <g
                    key={room.id}
                    onPointerDown={(event) => {
                      if (isOccupied) {
                        event.stopPropagation();
                      }
                    }}
                    onMouseEnter={() => setHoveredRoomId(room.id)}
                    onMouseLeave={() =>
                      setHoveredRoomId((prev) =>
                        prev === room.id ? null : prev,
                      )
                    }
                    onClick={() => handleRoomClick(room.id)}
                    className={isInteractive ? "cursor-pointer" : undefined}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      transform: shouldLift ? "translateY(-3px)" : "translateY(0)",
                      transition:
                        "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease",
                    }}
                  >
                    {isSelected ? (
                      <polygon
                        points={pointsToString(svgPoints)}
                        fill="#f59e0b"
                        opacity={0.2}
                        stroke="#f97316"
                        strokeWidth={10}
                        strokeLinejoin="round"
                      />
                    ) : null}
                    <polygon
                      points={pointsToString(svgPoints)}
                      fill={
                        isOccupied
                          ? isHovered || isSelected
                            ? "#f3b44c"
                            : "#f59e0b"
                          : "#d1d5db"
                      }
                      stroke={
                        isOccupied
                          ? isSelected
                            ? "#bb171c"
                            : "#d97706"
                          : "#9ca3af"
                      }
                      strokeWidth={isOccupied && isSelected ? 3 : 1.5}
                      strokeLinejoin="round"
                      style={{
                        transition:
                          "fill 220ms ease, stroke 220ms ease, stroke-width 220ms ease, opacity 220ms ease",
                      }}
                    />
                    {isSelected ? (
                      <polygon
                        points={pointsToString(svgPoints)}
                        fill="none"
                        stroke="#fff3e0"
                        strokeWidth={1.5}
                        strokeLinejoin="round"
                        opacity={0.95}
                        style={{ pointerEvents: "none" }}
                      />
                    ) : null}
                    {isHovered && !isSelected && isOccupied ? (
                      <polygon
                        points={pointsToString(svgPoints)}
                        fill="none"
                        stroke="#fde68a"
                        strokeWidth={1.25}
                        strokeLinejoin="round"
                        opacity={0.95}
                        style={{ pointerEvents: "none" }}
                      />
                    ) : null}
                    <polygon
                      points={pointsToString(svgPoints)}
                      fill={isSelected ? "rgba(255,255,255,0.08)" : "transparent"}
                      style={{
                        pointerEvents: "none",
                        transition: "fill 220ms ease",
                      }}
                    />
                    <text
                      x={bounds.minX + 8}
                      y={Math.min(bounds.centerY + 6, roomLabelY)}
                      fill={isOccupied ? "#ffffff" : "#4b5563"}
                      fontSize={10}
                      fontWeight={700}
                      style={{
                        pointerEvents: "none",
                        transition: "fill 220ms ease, opacity 220ms ease",
                      }}
                    >
                      {room.roomNumber}
                    </text>
                    {shop ? (
                      <g
                        style={{
                          transformBox: "fill-box",
                          transformOrigin: "center",
                          transform: isSelected
                            ? "scale(1.05)"
                            : isHovered
                              ? "scale(1.02)"
                              : "scale(1)",
                          transition:
                            "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease",
                        }}
                      >
                        <rect
                          x={bounds.centerX - logoBoxSize / 2}
                          y={bounds.centerY - logoBoxSize / 2}
                          width={logoBoxSize}
                          height={logoBoxSize}
                          rx={12}
                          fill="#ffffff"
                          opacity={isSelected ? 1 : 0.97}
                          style={{
                            transition:
                              "opacity 220ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        />
                        <image
                          href={shop.logoImage}
                          x={bounds.centerX - logoSize / 2}
                          y={bounds.centerY - logoSize / 2}
                          width={logoSize}
                          height={logoSize}
                          preserveAspectRatio="xMidYMid contain"
                          style={{
                            opacity: isSelected ? 1 : 0.94,
                            transition:
                              "opacity 220ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                          }}
                        />
                      </g>
                    ) : null}
                  </g>
                );
              })}
            </svg>
          </div>

          {selectedShop && selectedRoom && selectedRoomBounds ? (
            <div
              className="absolute z-20 w-[290px] select-none rounded-xl border border-outline-variant/30 bg-white p-4 text-left shadow-xl"
              style={{
                left: Math.max(
                  12,
                  Math.min(740, selectedRoomBounds.centerX * zoom + pan.x + 10),
                ),
                top: Math.max(
                  12,
                  Math.min(530, selectedRoomBounds.centerY * zoom + pan.y + 10),
                ),
                animation: "mall-map-card-enter 220ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">
                    {selectedRoom.roomNumber}
                  </p>
                  <h3 className="mt-2 text-lg font-black">{selectedShop.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedRoomId(null);
                  }}
                  className="h-8 w-8 rounded-full bg-surface text-on-surface-variant transition-all hover:scale-105 hover:text-on-surface"
                  aria-label="Close shop card"
                >
                  ×
                </button>
              </div>
              <p className="mt-2 text-sm text-on-surface-variant">
                {selectedShop.category}
              </p>
              <p className="mt-3 text-sm text-on-surface">{selectedShop.workHours}</p>
              <p className="mt-1 text-sm text-on-surface-variant">
                {selectedShop.phone}
              </p>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  router.push(`/shops/${selectedShop.slug}`);
                }}
                className="mt-4 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                Подробнее
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-4 text-sm text-on-surface-variant">
        <Link href="/shops" className="transition-colors hover:text-primary">
          Перейти к списку магазинов →
        </Link>
      </div>

      <style jsx>{`
        @keyframes mall-map-card-enter {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
