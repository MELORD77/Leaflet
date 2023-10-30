import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";

const RedPolygon = () => {
  const [points, setPoints] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [curMousePos, setCurMousePos] = useState([0, 0]);
  const [isMouseOverStartPoint, setIsMouseOverStartPoint] = useState(false);
  const stageRef = useRef(null);
  const getMousePos = (stage) => {
    return [stage.getPointerPosition().x, stage.getPointerPosition().y];
  };

  const handleClick = (event) => {
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);
    // setIsFinished(true)

    if (isFinished) {
      return;
    }
    if (isMouseOverStartPoint && points.length >= 3) {
      setIsFinished(true);
    } else {
      setPoints([...points, mousePos]);
    }
  };

  const handleMouseMove = (event) => {
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);

    setCurMousePos(mousePos);
  };

  const handleMouseOverStartPoint = (event) => {
    if (isFinished || points.length < 4) return;
    event.target.scale({ x: 2, y: 2 });
    setIsMouseOverStartPoint(true);
  };

  const handleMouseOutStartPoint = (event) => {
    event.target.scale({ x: 1, y: 1 });
    setIsMouseOverStartPoint(false);
  };

  const handleDragStartPoint = (event) => {};

  const handleDragMovePoint = (event) => {
    const index = event.target.index - 1;
    const pos = [event.target.attrs.x, event.target.attrs.y];
    setPoints([...points.slice(0, index), pos, ...points.slice(index + 1)]);
  };

  const handleDragEndPoint = (event) => {};

  const flattenedPoints = points
    .concat(isFinished ? [] : curMousePos)
    .reduce((a, b) => a.concat(b), []);

  return (
    <Stage
      width={1280}
      height={720}
      onMouseDown={handleClick}
      onMouseMove={handleMouseMove}
    >
      <Layer ref={stageRef}>
        {/* <Line
          points={flattenedPoints}
          stroke="red"
          strokeWidth={2}
          closed={isFinished}
        /> */}

        {points.map((point, index) => {
          const startPointAttr =
            index === 0
              ? {
                  hitStrokeWidth: 12,
                  onMouseOver: handleMouseOverStartPoint,
                  onMouseOut: handleMouseOutStartPoint,
                }
              : null;

          return (
            <Circle
              key={index}
              x={point[0]}
              y={point[1]}
              radius={6}
              fill="blue"
              // stroke="red"
              strokeWidth={2}
              onDragStart={handleDragStartPoint}
              onDragMove={handleDragMovePoint}
              onDragEnd={handleDragEndPoint}
              onMouseEnter={(e) => {
                const container = e.target.getStage().container();
                container.style.cursor = "pointer";
              }}
              onMouseLeave={(e) => {
                const container = e.target.getStage().container();
                container.style.cursor = "default";
              }}
              draggable
              {...startPointAttr}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

export default RedPolygon;
