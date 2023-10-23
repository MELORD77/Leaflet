import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Rect, Circle, Transformer } from "react-konva";
import useImage from "use-image";
import planeImage from "./assests/plane.png";
import cameraImage from "./assests/camera1.png";
import "./style/marker.css";
const ImageWithIcons = () => {
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

  useEffect(() => {
    const anim = new window.Konva.Animation((frame) => {
      const scale = Math.sin(frame.time / 1000) + 1; // Example animation logic
      imageRef.current.scale({ x: scale, y: scale });
    });

    anim.start();

    return () => {
      anim.stop();
    };
  }, []);

  return (
    <Stage width={800} height={600}>
      <Layer>
        <Image image={image} />
        {icons.map((icon, index) => (
          <Image
            key={index}
            x={icon.x}
            y={icon.y}
            width={50}
            height={50}
            image={camera}
            ref={imageRef}
            // fill="red"
            draggable
            onDragStart={() => handleIconDragStart(index)}
            onDragEnd={handleIconDragEnd}
            onDragMove={(event) => handleIconDragMove(index, event)}
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
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "GrayText",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "600px",
          backgroundColor: "#fff",

          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          //   backgroundImage: `url(${planeImage})`,
        }}
      >
        <ImageWithIcons />
      </div>
    </div>
  );
};

export default App;
