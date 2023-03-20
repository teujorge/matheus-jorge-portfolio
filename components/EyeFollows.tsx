/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { useEffect, useRef } from "react";

const outerEyeSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
    <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 192c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
  </svg>
);

type Vector = { x: number; y: number };

const EyeFollows = () => {
  const PADDING = 20;
  const SIZE = 150 + PADDING * 2;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasContext = canvasRef.current!.getContext("2d")!;

    // details need to make eye look at mouse coords
    const eye = {
      radius: 50,
      iris: 27,
      pupil: 17,
      reflection: 8,
    };

    const origin = { x: SIZE / 2, y: SIZE / 2 };

    const maxDistance = 20;
    const limMinX = origin.x - maxDistance;
    const limMaxX = origin.x + maxDistance;
    const limMinY = origin.y - maxDistance;
    const limMaxY = origin.y + maxDistance;

    const eyePos: Vector = { ...origin };
    const mousePos: Vector = { ...origin };

    // add mouse move listener to whole page
    addEventListener("mousemove", (e) => {
      if (!canvasRef || !canvasRef.current) return;

      // make mouse coords relative to the canvas  ignoring scroll in this case
      const bounds = canvasRef.current!.getBoundingClientRect();
      const x = e.pageX - bounds.left - scrollX;
      const y = e.pageY - bounds.top - scrollY;

      mousePos.x = x;
      mousePos.y = y;
    });

    let startTime = 0;
    const eyeAnimId = requestAnimationFrame(function animate(currentTime) {
      const dt = (currentTime - startTime) / 100;

      canvasContext.clearRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );

      // direction and distance between
      // where we need to be and where we are
      const move: Vector = {
        x: mousePos.x - eyePos.x,
        y: mousePos.y - eyePos.y,
      };
      let distance: number = Math.sqrt(move.x ** 2 + move.y ** 2);
      if (distance <= 0) distance = 1;
      const direction: Vector = {
        x: move.x / distance,
        y: move.y / distance,
      };

      if (distance > maxDistance * 2) {
        distance = maxDistance;
      }

      // move
      const speed = distance;
      const dx = direction.x * speed * dt;
      const dy = direction.y * speed * dt;
      const newX = eyePos.x + dx;
      const newY = eyePos.y + dy;

      // x limit
      if (newX < limMinX) {
        eyePos.x = limMinX;
      } else if (newX > limMaxX) {
        eyePos.x = limMaxX;
      } else {
        eyePos.x = newX;
      }

      // y limit
      if (newY < limMinY) {
        eyePos.y = limMinY;
      } else if (newY > limMaxY) {
        eyePos.y = limMaxY;
      } else {
        eyePos.y = newY;
      }

      // draw iris
      canvasContext.fillStyle = "black";
      canvasContext.beginPath();
      canvasContext.arc(eyePos.x, eyePos.y, eye.iris, 0, Math.PI * 2, false);
      canvasContext.fill();

      // draw pupil
      canvasContext.fillStyle = "white";
      canvasContext.beginPath();
      canvasContext.arc(eyePos.x, eyePos.y, eye.pupil, 0, Math.PI * 2, false);
      canvasContext.fill();

      // draw reflection
      canvasContext.fillStyle = "black";
      canvasContext.beginPath();
      canvasContext.arc(
        eyePos.x + eye.pupil - eye.iris - 2,
        eyePos.y + eye.pupil - eye.iris - 2,
        eye.reflection,
        0,
        Math.PI * 2,
        false
      );
      canvasContext.fill();

      // turn the clip off by restoring canvas state
      canvasContext.restore();

      startTime = currentTime;
      requestAnimationFrame(animate);
    });

    return () => {
      cancelAnimationFrame(eyeAnimId);
    };
  }, []);

  return (
    <div
      css={css`
        position: relative;

        margin: 20px;
        padding: ${PADDING}px;

        min-width: ${SIZE}px;
        max-width: ${SIZE}px;

        min-height: ${SIZE}px;
        max-height: ${SIZE}px;

        border-radius: var(--border-radius);
        background-color: var(--off-background-color);
        box-shadow: 0px 0px 8px var(--shadow-color);

        svg {
          fill: white;
          transform: translateY(8px);
        }
      `}
    >
      {outerEyeSvg}
      <canvas
        css={css`
          position: absolute;
          top: 0px;
          left: 0px;
        `}
        ref={canvasRef}
        id="canvas"
        width={`${SIZE}`}
        height={`${SIZE}`}
      />
    </div>
  );
};

export default EyeFollows;