"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  MAP_HEIGHT,
  MAP_WIDTH,
  rooms,
  type Point,
} from "@/components/map/mall-map-data";
import { floorFilters, shops } from "@/components/shops/shops-data";

const MIN_ZOOM = 0.42;
const MAX_ZOOM = 2.3;
const AUTO_FIT_MAX_ZOOM = 1.08;
const ZOOM_STEP = 0.18;
const VIEWPORT_PADDING = 24;
const DRAG_THRESHOLD = 8;

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

function clampZoom(zoom: number) {
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
}

function getCenteredPan(viewportWidth: number, viewportHeight: number, zoom: number) {
  return {
    x: (viewportWidth - MAP_WIDTH * zoom) / 2,
    y: (viewportHeight - MAP_HEIGHT * zoom) / 2,
  };
}

function getFitZoom(viewportWidth: number, viewportHeight: number) {
  const horizontalZoom = (viewportWidth - VIEWPORT_PADDING * 2) / MAP_WIDTH;
  const verticalZoom = (viewportHeight - VIEWPORT_PADDING * 2) / MAP_HEIGHT;

  return clampZoom(Math.min(horizontalZoom, verticalZoom, AUTO_FIT_MAX_ZOOM));
}

function getRoomIdFromTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;

  return target.closest("[data-room-id]")?.getAttribute("data-room-id") ?? null;
}

type PointerState = {
  moved: boolean;
  pointerId: number;
  pressRoomId: string | null;
  startClientX: number;
  startClientY: number;
  startPanX: number;
  startPanY: number;
};

const INITIAL_POINTER_STATE: PointerState = {
  moved: false,
  pointerId: -1,
  pressRoomId: null,
  startClientX: 0,
  startClientY: 0,
  startPanX: 0,
  startPanY: 0,
};

export function MallMap() {
  const router = useRouter();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const hasManualViewportChangeRef = useRef(false);
  const pointerStateRef = useRef<PointerState>(INITIAL_POINTER_STATE);
  const [hoveredRoomId, setHoveredRoomId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

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
  const orderedRooms = useMemo(() => {
    const regularRooms = rooms.filter((room) => room.id !== selectedRoomId);
    const activeRoom = rooms.find((room) => room.id === selectedRoomId);

    return activeRoom ? [...regularRooms, activeRoom] : regularRooms;
  }, [selectedRoomId]);

  useLayoutEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const fitMapToViewport = () => {
      if (hasManualViewportChangeRef.current) return;

      const nextZoom = getFitZoom(element.clientWidth, element.clientHeight);
      setZoom(nextZoom);
      setPan(getCenteredPan(element.clientWidth, element.clientHeight, nextZoom));
    };

    fitMapToViewport();

    if (typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver(() => {
      fitMapToViewport();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  function resetPointerState() {
    pointerStateRef.current = INITIAL_POINTER_STATE;
    setIsDragging(false);
  }

  function applyZoom(nextZoom: number) {
    const element = viewportRef.current;
    const normalizedZoom = clampZoom(nextZoom);

    if (!element) {
      setZoom(normalizedZoom);
      return;
    }

    setPan((currentPan) => {
      const viewportCenterX = element.clientWidth / 2;
      const viewportCenterY = element.clientHeight / 2;
      const mapCenterX = (viewportCenterX - currentPan.x) / zoom;
      const mapCenterY = (viewportCenterY - currentPan.y) / zoom;

      return {
        x: viewportCenterX - mapCenterX * normalizedZoom,
        y: viewportCenterY - mapCenterY * normalizedZoom,
      };
    });
    setZoom(normalizedZoom);
  }

  function updateZoom(direction: "in" | "out") {
    hasManualViewportChangeRef.current = true;
    applyZoom(zoom + (direction === "in" ? ZOOM_STEP : -ZOOM_STEP));
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!event.isPrimary || selectedShop) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    pointerStateRef.current = {
      moved: false,
      pointerId: event.pointerId,
      pressRoomId: getRoomIdFromTarget(event.target),
      startClientX: event.clientX,
      startClientY: event.clientY,
      startPanX: pan.x,
      startPanY: pan.y,
    };
    setIsDragging(false);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const pointerState = pointerStateRef.current;
    if (pointerState.pointerId !== event.pointerId || selectedShop) return;

    const deltaX = event.clientX - pointerState.startClientX;
    const deltaY = event.clientY - pointerState.startClientY;
    const distance = Math.hypot(deltaX, deltaY);

    if (distance < DRAG_THRESHOLD && !pointerState.moved) {
      return;
    }

    hasManualViewportChangeRef.current = true;
    pointerStateRef.current.moved = true;
    setIsDragging(true);
    setPan({
      x: pointerState.startPanX + deltaX,
      y: pointerState.startPanY + deltaY,
    });
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const pointerState = pointerStateRef.current;
    if (pointerState.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (!pointerState.moved) {
      if (pointerState.pressRoomId && shopByRoomId.has(pointerState.pressRoomId)) {
        setSelectedRoomId(pointerState.pressRoomId);
      } else {
        setSelectedRoomId(null);
      }
    }

    resetPointerState();
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="mb-8">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-secondary-fixed-variant">
          Floor Plan
        </p>
        <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
          Схема ТЦ
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
          className={`relative h-[clamp(360px,72svh,760px)] w-full select-none overflow-hidden rounded-xl bg-surface-container-low touch-none overscroll-none ${
            selectedShop ? "cursor-default" : "cursor-grab active:cursor-grabbing"
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={() => {
            if (pointerStateRef.current.moved) {
              setIsDragging(false);
            }
          }}
        >
          <div
            className="absolute right-4 top-4 z-30 flex flex-col gap-2"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => updateZoom("in")}
              disabled={zoom >= MAX_ZOOM}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-outline-variant/30 bg-white text-xl font-bold text-on-surface shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Увеличить карту"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => updateZoom("out")}
              disabled={zoom <= MIN_ZOOM}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-outline-variant/30 bg-white text-xl font-bold text-on-surface shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Уменьшить карту"
            >
              -
            </button>
          </div>

          <div
            className={`absolute left-0 top-0 select-none rounded-xl border border-outline-variant/30 bg-white ${
              selectedShop ? "pointer-events-none" : ""
            }`}
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
                    data-room-id={room.id}
                    onMouseEnter={() => setHoveredRoomId(room.id)}
                    onMouseLeave={() =>
                      setHoveredRoomId((prev) =>
                        prev === room.id ? null : prev,
                      )
                    }
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

          {selectedShop && selectedRoom ? (
            <div
              className="absolute inset-0 z-40 flex items-center justify-center bg-[rgba(252,249,248,0.48)] p-4 backdrop-blur-md sm:p-6"
              onClick={() => setSelectedRoomId(null)}
            >
              <div
                className="w-full max-w-md rounded-[1.75rem] border border-white/70 bg-white/96 p-5 text-left shadow-2xl sm:p-6"
                style={{
                  animation: "mall-map-card-enter 220ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                      {selectedRoom.roomNumber}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-on-surface">
                      {selectedShop.name}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedRoomId(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-on-surface-variant transition-all hover:scale-105 hover:text-on-surface"
                    aria-label="Close shop card"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-on-surface-variant">
                  {selectedShop.category}
                </p>
                <p className="mt-4 text-sm leading-6 text-on-surface-variant">
                  {selectedShop.description}
                </p>

                <div className="mt-5 space-y-2 rounded-2xl bg-surface-container-low px-4 py-3">
                  <p className="text-sm text-on-surface">
                    <span className="font-bold">Время работы:</span> {selectedShop.workHours}
                  </p>
                  <p className="text-sm text-on-surface">
                    <span className="font-bold">Телефон:</span> {selectedShop.phone}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push(`/shops/${selectedShop.slug}`)}
                  className="mt-5 inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
                >
                  Подробнее
                </button>
              </div>
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
