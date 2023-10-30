import React, { useRef, useState } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import useImage from "use-image";
import planeImage from "./assests/a2.svg";
import cameraImage from "./assests/camera1.png";
import "./style/marker.css";
import BasicSelect from "./Select";
import Divider from "@mui/material/Divider";

const ImageWithIcons = ({ cameraId }) => {
  const [image] = useImage(planeImage);
  const [camera] = useImage(cameraImage);
  const [icons, setIcons] = useState([
    { x: 50, y: 50 },
    { x: 200, y: 150 },
    { x: 300, y: 300 },
    { x: 350, y: 400 },
    { x: 350, y: 350 },
  ]);
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);
  const [points, setPoints] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [AddIcon, setAddIcon] = useState(true);

  const getMousePos = (stage) => {
    return {
      x: stage.getPointerPosition().x,
      y: stage.getPointerPosition().y,
      cameraId: cameraId,
    };
  };

  const handleClick = (event) => {
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);
    console.log(cameraId);
    console.log(points[0]?.cameraId);
    if (
      isFinished ||
      cameraId === undefined ||
      cameraId === points[points?.length - 1]?.cameraId
    ) {
      return;
    }
    if (points.length >= 30) {
      setIsFinished(true);
    } else {
      AddIcon && setPoints([...points, mousePos]);
    }
  };

  const handleIconDragStart = (index) => {
    setSelectedIconIndex(index);
  };
  const handleIconDragEnd = () => {
    setSelectedIconIndex(null);
  };

  const handleIconDragMove = (index, event) => {
    const { x, y } = event.target.attrs;
    const newIcons = [...icons];
    newIcons[index] = { x, y };
    setIcons(newIcons);
  };

  const imageRef = useRef(null);

  // useEffect(() => {
  //   const anim = new window.Konva.Animation((frame) => {
  //     const scale = 300; // Example animation logic
  //     imageRef.current.opacity((Math.sin(frame.time / scale) + 1) / 1);
  //   });

  //   anim.start();

  //   return () => {
  //     anim.stop();
  //   };
  // }, []);

  return (
    <Stage
      onMouseDown={handleClick}
      width={1000}
      height={500}
      style={{ padding: "10px" }}
    >
      <Layer>
        <Image
          image={image}
          width={1000}
          height={500}
          style={{ margin: "20px", fill: "red" }}
          onLoad={(e) => console.log(e)}
        />
        {points.map((point, index) => (
          <Image
            key={index}
            x={point.x - 20}
            y={point.y - 20}
            width={50}
            height={50}
            // cornerRadius={50}
            image={camera}
            ref={imageRef}
            // fill="red"
            shadowColor="#000"
            shadowBlur={10}
            shadowOffsetX={5}
            shadowOffsetY={5}
            draggable
            onDragStart={() => handleIconDragStart(index)}
            onDragEnd={handleIconDragEnd}
            onDragMove={(event) => handleIconDragMove(index, event)}
            onMouseEnter={(e) => {
              const container = e.target.getStage().container();
              setAddIcon(false);
              container.style.cursor = "pointer";
              e.target.scale({ x: 1.1, y: 1.1 });
              // e.target.rotate(1);
            }}
            onMouseLeave={(e) => {
              const container = e.target.getStage().container();
              setAddIcon(true);
              container.style.cursor = "default";
              e.target.scale({ x: 1, y: 1 });
              // e.target.skewX(0);
            }}
          />
        ))}

        {selectedIconIndex !== null && (
          <Transformer
            // node={icons[selectedIconIndex]}
            enabledAnchors={[
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
            ]}
          />
        )}
      </Layer>
    </Stage>
  );
};

const App = () => {
  const [cameraId, setCameraId] = useState();
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "whitesmoke",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          width: "1000px",
          height: "600px",
          backgroundColor: "rgb(1, 252, 86,0.1)",
          padding: "20px",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          //   backgroundImage: `url(${planeImage})`,
        }}
      >
        <BasicSelect setCameraId={setCameraId} />
        <Divider my={5} />
        <ImageWithIcons cameraId={cameraId} />
        {/* <RedPolygon /> */}
      </div>
    </div>
  );
};

export default App;
