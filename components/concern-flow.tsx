"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from "react";
import { motion } from "motion/react";
import {
  ReactFlow,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  useReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import { cn } from "@/lib/utils";
import type { Concern, Goal } from "@/lib/pebbles-data";
import { ConcernCard } from "@/components/concern-card";

const CONCERN_NODE_W = 320;
const CONCERN_NODE_H = 88;
const CONCERN_Y_GAP = 24;
const SATELLITE_W = 260;
const SATELLITE_H = 76;
const SATELLITE_GAP = 18;
const SAT_X_OFFSET = 80;

function concernY(i: number): number {
  return i * (CONCERN_NODE_H + CONCERN_Y_GAP);
}

/** Right-side column of satellites, vertically centered on the selected concern row */
function satellitePositions(
  concernIndex: number,
  count: number,
): { x: number; y: number }[] {
  if (count <= 0) return [];
  const cy = concernY(concernIndex);
  const totalSatH = count * SATELLITE_H + (count - 1) * SATELLITE_GAP;
  const satStartY = cy + CONCERN_NODE_H / 2 - totalSatH / 2;
  const satX = CONCERN_NODE_W + SAT_X_OFFSET;
  return Array.from({ length: count }, (_, j) => ({
    x: satX,
    y: satStartY + j * (SATELLITE_H + SATELLITE_GAP),
  }));
}

type ConcernNodeData = {
  concern: Concern;
  isSelected: boolean;
  anySelected: boolean;
};

type SatelliteNodeData = {
  text: string;
};

function truncate(text: string, words = 7): string {
  const parts = text.split(" ");
  if (parts.length <= words) return text;
  return parts.slice(0, words).join(" ") + "…";
}

function planBullets(
  concern: Concern,
  goalByNumber: Map<string, Goal>,
): readonly string[] {
  const goal = goalByNumber.get(concern.planRef);
  return goal?.bullets?.length ? goal.bullets : concern.bullets;
}

function buildNodes(
  concerns: readonly Concern[],
  goalByNumber: Map<string, Goal>,
  selectedId: string | null,
): Node[] {
  const concernNodes: Node[] = concerns.map((c, i) => ({
    id: `c-${i}`,
    type: "concern",
    position: { x: 0, y: concernY(i) },
    data: {
      concern: c,
      isSelected: selectedId === `c-${i}`,
      anySelected: !!selectedId,
    } satisfies ConcernNodeData,
    draggable: false,
    selectable: true,
  }));

  if (!selectedId) return concernNodes;

  const idx = Number(selectedId.replace("c-", ""));
  const concern = concerns[idx];
  if (!concern) return concernNodes;

  const bullets = [...planBullets(concern, goalByNumber)];
  const positions = satellitePositions(idx, bullets.length);

  const satNodes: Node[] = bullets.map((text, j) => {
    const pos = positions[j] ?? {
      x: CONCERN_NODE_W + SAT_X_OFFSET,
      y: concernY(idx),
    };
    return {
      id: `s-${idx}-${j}`,
      type: "satellite",
      position: {
        x: pos.x,
        y: pos.y,
      },
      data: { text } satisfies SatelliteNodeData,
      draggable: false,
      selectable: false,
    };
  });

  return [...concernNodes, ...satNodes];
}

function buildEdges(
  concerns: readonly Concern[],
  goalByNumber: Map<string, Goal>,
  selectedId: string | null,
): Edge[] {
  if (!selectedId) return [];
  const idx = Number(selectedId.replace("c-", ""));
  const concern = concerns[idx];
  if (!concern) return [];
  const bullets = planBullets(concern, goalByNumber);
  return bullets.map((_, j) => ({
    id: `e-${idx}-${j}`,
    source: selectedId,
    target: `s-${idx}-${j}`,
    sourceHandle: "source-right",
    targetHandle: "target-left",
    type: "straight",
    animated: true,
    style: { stroke: "oklch(0.6 0.2 25 / 0.45)", strokeWidth: 1.5 },
  }));
}

function ConcernNode({ data }: NodeProps<Node<ConcernNodeData>>) {
  const { concern, isSelected, anySelected } = data;
  const dimmed = anySelected && !isSelected;

  return (
    <div
      style={{ width: CONCERN_NODE_W }}
      className={cn(
        "relative flex min-h-[88px] items-center justify-center rounded-xl border-2 bg-card px-5 py-3 text-center shadow-md transition-all duration-300 ease-out",
        dimmed && "scale-[0.88] cursor-pointer opacity-30",
        isSelected &&
          "scale-105 border-primary shadow-lg shadow-primary/10 ring-4 ring-primary/15",
        !isSelected && !dimmed && "border-border/80",
      )}
    >
      <Handle
        id="source-right"
        type="source"
        position={Position.Right}
        className="!size-2 !border-2 !border-background !bg-primary"
      />
      <p className="text-balance text-base font-semibold leading-snug text-foreground">
        {truncate(concern.title, 8)}
      </p>
    </div>
  );
}

function SatelliteNode({ data }: NodeProps<Node<SatelliteNodeData>>) {
  // Stable outer div — never animated so React Flow always measures the correct
  // node dimensions and positions the handle dot accurately before drawing edges.
  return (
    <div className="relative" style={{ width: SATELLITE_W, minHeight: SATELLITE_H }}>
      <Handle
        id="target-left"
        type="target"
        position={Position.Left}
        className="!size-2 !border-2 !border-background !bg-primary"
      />
      <motion.div
        className="flex min-h-[72px] items-center justify-center rounded-lg border border-border/80 bg-accent/50 px-3 py-3 text-center shadow-sm ring-1 ring-primary/10"
        title={data.text}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        <p className="text-balance text-sm leading-snug text-muted-foreground">
          {data.text}
        </p>
      </motion.div>
    </div>
  );
}

const nodeTypes = {
  concern: ConcernNode,
  satellite: SatelliteNode,
};

function FitViewOnChange({ selectedId }: { selectedId: string | null }) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      void fitView({
        padding: 0.18,
        duration: 280,
        maxZoom: 1.1,
        minZoom: 0.6,
      });
    });
    return () => cancelAnimationFrame(id);
  }, [selectedId, fitView]);

  return null;
}

export function ConcernFlow({
  concerns,
  goals,
}: {
  concerns: readonly Concern[];
  goals: readonly Goal[];
}) {
  const goalByNumber = useMemo(
    () => new Map(goals.map((g) => [g.number, g] as const)),
    [goals],
  );

  const initialNodes = useMemo(
    () => buildNodes(concerns, goalByNumber, null),
    [concerns, goalByNumber],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setNodes(buildNodes(concerns, goalByNumber, selectedId));
    setEdges(buildEdges(concerns, goalByNumber, selectedId));
  }, [concerns, goalByNumber, selectedId, setNodes, setEdges]);

  const onNodeClick = useCallback((_event: MouseEvent, node: Node) => {
    if (node.type !== "concern") return;
    setSelectedId((prev) => (prev === node.id ? null : node.id));
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedId(null);
  }, []);

  return (
    <>
      {/* Desktop — interactive React Flow */}
      <div className="hidden h-[560px] w-full rounded-2xl border border-border/70 bg-muted/10 md:block">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          panOnScroll={false}
          fitView
          fitViewOptions={{
            padding: 0.18,
            maxZoom: 1.1,
            minZoom: 0.6,
          }}
          minZoom={0.5}
          maxZoom={1.25}
          deleteKeyCode={null}
        >
          <FitViewOnChange selectedId={selectedId} />
        </ReactFlow>
      </div>

      {/* Mobile — stacked cards */}
      <div className="space-y-4 md:hidden">
        {concerns.map((c, i) => (
          <ConcernCard
            key={c.title}
            title={c.title}
            bullets={c.bullets}
            planRef={c.planRef}
            index={i}
          />
        ))}
      </div>
    </>
  );
}
