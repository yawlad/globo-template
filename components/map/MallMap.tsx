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
import {
  rentalSpaces,
  rentalTypeLabels,
  type RentalSpace,
} from "@/components/rentals/rentals-data";
import { floorFilters, shops, type Shop } from "@/components/shops/shops-data";
import {
  technicalSpaces,
  technicalSpaceTypeMeta,
  type TechnicalSpace,
} from "@/components/technical/technical-spaces-data";

const MIN_ZOOM = 0.42;
const MAX_ZOOM = 2.3;
const AUTO_FIT_MAX_ZOOM = 1.08;
const ZOOM_STEP = 0.18;
const VIEWPORT_PADDING = 24;
const DRAG_THRESHOLD = 8;

type RoomEntity =
  | { type: "shop"; value: Shop }
  | { type: "rental"; value: RentalSpace }
  | { type: "technical"; value: TechnicalSpace };

type PointerState = {
  moved: boolean;
  pointerId: number;
  pressRoomId: string | null;
  startClientX: number;
  startClientY: number;
  startPanX: number;
  startPanY: number;
};

type Accent = {
  fill: string;
  glowStroke: string | null;
  overlayOpacity: number;
  stroke: string;
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

function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price);
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function getEntityAccent(entity: RoomEntity | null, isHovered: boolean, isSelected: boolean): Accent {
  if (!entity) {
    return {
      fill: "#d1d5db",
      glowStroke: null,
      overlayOpacity: 0,
      stroke: "#9ca3af",
    };
  }

  if (entity.type === "shop") {
    return {
      fill: isHovered || isSelected ? "#f3b44c" : "#f59e0b",
      stroke: isSelected ? "#bb171c" : "#d97706",
      glowStroke: isSelected ? "#fff3e0" : isHovered ? "#fde68a" : null,
      overlayOpacity: isSelected ? 0.08 : 0,
    };
  }

  if (entity.type === "rental") {
    return {
      fill: isHovered || isSelected ? "#5cb6ff" : "#2f9cf4",
      stroke: isSelected ? "#155eab" : "#1d78ce",
      glowStroke: isSelected ? "#d8eeff" : isHovered ? "#b8deff" : null,
      overlayOpacity: isSelected ? 0.1 : 0,
    };
  }

  const meta = technicalSpaceTypeMeta[entity.value.type];

  return {
    fill: isHovered || isSelected ? hexToRgba(meta.color, 0.86) : hexToRgba(meta.color, 0.72),
    stroke: meta.color,
    glowStroke: isSelected ? hexToRgba(meta.color, 0.35) : isHovered ? hexToRgba(meta.color, 0.22) : null,
    overlayOpacity: isSelected ? 0.1 : 0,
  };
}

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

  const roomEntityById = useMemo(() => {
    const entities = new Map<string, RoomEntity>();

    shops
      .filter((shop) => shop.roomId)
      .forEach((shop) => {
        entities.set(shop.roomId as string, { type: "shop", value: shop });
      });

    rentalSpaces.forEach((rentalSpace) => {
      if (!entities.has(rentalSpace.roomId)) {
        entities.set(rentalSpace.roomId, { type: "rental", value: rentalSpace });
      }
    });

    technicalSpaces.forEach((technicalSpace) => {
      if (!entities.has(technicalSpace.roomId)) {
        entities.set(technicalSpace.roomId, {
          type: "technical",
          value: technicalSpace,
        });
      }
    });

    return entities;
  }, []);

  const selectedRoom = rooms.find((room) => room.id === selectedRoomId) ?? null;
  const selectedEntity = selectedRoom
    ? roomEntityById.get(selectedRoom.id) ?? null
    : null;
  const selectedShop = selectedEntity?.type === "shop" ? selectedEntity.value : null;
  const selectedRental = selectedEntity?.type === "rental" ? selectedEntity.value : null;
  const selectedTechnical =
    selectedEntity?.type === "technical" ? selectedEntity.value : null;
  const technicalLegendItems = Object.entries(technicalSpaceTypeMeta);

  const orderedRooms = useMemo(() => {
    const activeRoomId = selectedRoomId ?? hoveredRoomId;
    const regularRooms = rooms.filter((room) => room.id !== activeRoomId);
    const activeRoom = rooms.find((room) => room.id === activeRoomId);

    return activeRoom ? [...regularRooms, activeRoom] : regularRooms;
  }, [hoveredRoomId, selectedRoomId]);

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
    if (!event.isPrimary || selectedEntity) return;

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
    if (pointerState.pointerId !== event.pointerId || selectedEntity) return;

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
      if (pointerState.pressRoomId && roomEntityById.has(pointerState.pressRoomId)) {
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
            selectedEntity ? "cursor-default" : "cursor-grab active:cursor-grabbing"
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
              selectedEntity ? "pointer-events-none" : ""
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
                const entity = roomEntityById.get(room.id) ?? null;
                const svgPoints = toSvgPoints(room.points);
                const bounds = getBounds(svgPoints);
                const isHovered = room.id === hoveredRoomId;
                const isSelected = room.id === selectedRoomId;
                const isInteractive = Boolean(entity);
                const accent = getEntityAccent(entity, isHovered, isSelected);
                const logoSize = Math.max(
                  24,
                  Math.min(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY) *
                    0.38,
                );
                const logoBoxSize = logoSize + 16;

                return (
                  <g
                    key={room.id}
                    data-room-id={room.id}
                    onMouseEnter={() => setHoveredRoomId(room.id)}
                    onMouseLeave={() =>
                      setHoveredRoomId((prev) => (prev === room.id ? null : prev))
                    }
                    className={isInteractive ? "cursor-pointer" : undefined}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      transform: isSelected
                        ? "scale(1.025)"
                        : isHovered && isInteractive
                          ? "scale(1.015)"
                          : "scale(1)",
                      transition:
                        "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease",
                    }}
                  >
                    {isSelected ? (
                      <polygon
                        points={pointsToString(svgPoints)}
                        fill={
                          entity?.type === "rental"
                            ? "#2f9cf4"
                            : entity?.type === "technical"
                              ? technicalSpaceTypeMeta[entity.value.type].color
                              : "#f59e0b"
                        }
                        opacity={0.18}
                        stroke={
                          entity?.type === "rental"
                            ? "#1d78ce"
                            : entity?.type === "technical"
                              ? technicalSpaceTypeMeta[entity.value.type].color
                              : "#f97316"
                        }
                        strokeWidth={10}
                        strokeLinejoin="round"
                      />
                    ) : null}
                    <polygon
                      points={pointsToString(svgPoints)}
                      fill={accent.fill}
                      stroke={accent.stroke}
                      strokeWidth={isInteractive && isSelected ? 3 : 1.5}
                      strokeLinejoin="round"
                      style={{
                        transition:
                          "fill 220ms ease, stroke 220ms ease, stroke-width 220ms ease, opacity 220ms ease",
                      }}
                    />
                    {accent.glowStroke ? (
                      <polygon
                        points={pointsToString(svgPoints)}
                        fill="none"
                        stroke={accent.glowStroke}
                        strokeWidth={1.5}
                        strokeLinejoin="round"
                        opacity={0.95}
                        style={{ pointerEvents: "none" }}
                      />
                    ) : null}
                    <polygon
                      points={pointsToString(svgPoints)}
                      fill={`rgba(255,255,255,${accent.overlayOpacity})`}
                      style={{
                        pointerEvents: "none",
                        transition: "fill 220ms ease",
                      }}
                    />
                    {entity?.type === "shop" ? (
                      <g
                        style={{
                          transformBox: "fill-box",
                          transformOrigin: "center",
                          transform: isHovered || isSelected ? "scale(1.02)" : "scale(1)",
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
                        />
                        <image
                          href={entity.value.logoImage}
                          x={bounds.centerX - logoSize / 2}
                          y={bounds.centerY - logoSize / 2}
                          width={logoSize}
                          height={logoSize}
                          preserveAspectRatio="xMidYMid contain"
                          style={{ opacity: isSelected ? 1 : 0.94 }}
                        />
                      </g>
                    ) : null}
                    {entity?.type === "rental" ? (
                      <g style={{ pointerEvents: "none" }}>
                        <text
                          x={bounds.centerX}
                          y={bounds.centerY + 6}
                          textAnchor="middle"
                          fill="#1d4f91"
                          fontFamily="Material Symbols Outlined"
                          fontSize={22}
                          fontWeight={800}
                        >
                          domain
                        </text>
                      </g>
                    ) : null}
                    {entity?.type === "technical" ? (
                      <g style={{ pointerEvents: "none" }}>
                        {technicalSpaceTypeMeta[entity.value.type].icon ? (
                          <text
                            x={bounds.centerX}
                            y={bounds.centerY + 6}
                            fill={technicalSpaceTypeMeta[entity.value.type].color}
                            fontFamily="Material Symbols Outlined"
                            textAnchor="middle"
                            fontSize={22}
                            fontWeight={700}
                          >
                            {technicalSpaceTypeMeta[entity.value.type].icon}
                          </text>
                        ) : null}
                      </g>
                    ) : null}
                  </g>
                );
              })}
            </svg>
          </div>

          {selectedEntity && selectedRoom ? (
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
                      {selectedShop?.name ?? selectedRental?.title ?? selectedTechnical?.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedRoomId(null)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-on-surface-variant transition-all hover:scale-105 hover:text-on-surface"
                    aria-label="Закрыть карточку"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {selectedShop ? (
                  <>
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
                  </>
                ) : null}

                {selectedRental ? (
                  <>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedRental.types.map((type) => (
                        <span
                          key={type}
                          className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-bold uppercase tracking-wide text-on-secondary-fixed-variant"
                        >
                          {rentalTypeLabels[type]}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 text-sm leading-6 text-on-surface-variant">
                      {selectedRental.description}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                          Цена в месяц
                        </p>
                        <p className="mt-1 text-lg font-black text-on-surface">
                          {formatPrice(selectedRental.monthlyPrice)} BYN
                        </p>
                      </div>
                      <div className="rounded-2xl bg-surface-container-low px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                          Площадь
                        </p>
                        <p className="mt-1 text-lg font-black text-on-surface">
                          {selectedRental.areaSqm} м²
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-dashed border-outline-variant/40 px-4 py-3 text-sm text-on-surface-variant">
                      Помещение доступно для аренды. Для уточнения условий можно использовать контакты администрации торгового центра.
                    </div>
                  </>
                ) : null}

                {selectedTechnical ? (
                  <>
                    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-surface-container-low px-4 py-3">
                      {technicalSpaceTypeMeta[selectedTechnical.type].icon ? (
                        <span
                          className="material-symbols-outlined"
                          style={{ color: technicalSpaceTypeMeta[selectedTechnical.type].color }}
                        >
                          {technicalSpaceTypeMeta[selectedTechnical.type].icon}
                        </span>
                      ) : (
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: technicalSpaceTypeMeta[selectedTechnical.type].color,
                          }}
                        />
                      )}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                          Тип помещения
                        </p>
                        <p className="text-sm font-semibold text-on-surface">
                          {technicalSpaceTypeMeta[selectedTechnical.type].label}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-on-surface-variant">
                      {selectedTechnical.description}
                    </p>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-outline-variant/25 bg-surface-container-lowest p-4">
        <div className="flex flex-wrap items-start gap-3">
          <div className="rounded-xl border border-outline-variant/20 bg-white px-3 py-2 text-sm font-semibold text-on-surface">
            Легенда
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm text-on-surface">
              <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
              <span>Магазин</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm text-on-surface">
              <span className="h-3 w-3 rounded-full bg-[#2f9cf4]" />
              <span className="material-symbols-outlined text-[18px] text-[#1d4f91]">domain</span>
              <span>Помещение под аренду</span>
            </div>

            {technicalLegendItems.map(([type, meta]) => (
              <div
                key={type}
                className="flex items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm text-on-surface"
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                {meta.icon ? (
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ color: meta.color }}
                  >
                    {meta.icon}
                  </span>
                ) : null}
                <span>{meta.label}</span>
              </div>
            ))}
          </div>
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
