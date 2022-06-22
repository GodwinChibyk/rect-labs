import { default as NextImage } from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { DUMMY_IMAGES } from "../../../../data";
import { getImageDataUrl } from "../../../../lib/imageUtils";
import DrawBoxInfo from "../../../Global/DrawBoxInfo/DrawBoxInfo";
import DrawPagination from "../../../Global/Draw/DrawPagination";
import CloseIcon from "../../../Global/Icons/CloseIcon";

/**
 *
 * @returns JSX.Element
 */
const Main = () => {
  // Immutable GLOBALS
  const DRAW_INFO__BOX_WIDTH = 110;
  const DRAW_INFO__BOX_HEIGHT = 210;

  //
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState("/img/car1.jpg");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const [offSetY, setOffSetY] = useState<number>(0);
  const [offSetX, setOffSetX] = useState<number>(0);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [startX, setStartX] = useState<number>(0);
  const [remainingXSpace, setRemainingXSpace] = useState<number>(0);
  const [stopRightPoint, setStopRightPoint] = useState<number>(0);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [drawAxis, setDrawAxis] = useState<Record<string, number>>({});
  const [canvasHeight, setCanvasHeight] = useState<number>(0);


  useEffect(() => {
    initializeCanvas();
  }, []);

  // Initialize Canvas on layout
  const initializeCanvas = async () => {
    // get the context and draw
    if (canvasRef.current && canvasContainerRef.current) {
      canvasRef.current.width = canvasContainerRef.current.clientWidth;
      canvasRef.current.height = canvasContainerRef.current.clientHeight;
      setCanvasWidth(canvasContainerRef.current.clientWidth);
      setCanvasHeight(canvasContainerRef.current.clientHeight);

      const drawingContext = canvasRef.current.getContext("2d");
      if (drawingContext) {
        drawingContext.strokeStyle = "red";
        drawingContext.lineWidth = 4;
        setCtx(drawingContext);
        //
        const canvasOffSet: DOMRect = canvasRef.current.getBoundingClientRect();
        setOffSetX(canvasOffSet.left + window.scrollX);
        setOffSetY(canvasOffSet.top + window.scrollY);

        await addImage(drawingContext);
      }
    }
  };

  // try adding the image to canvas but not working
  const addImage = async (canvasCtx: CanvasRenderingContext2D) => {
    if (canvasRef.current) {
      const imageData = await getImageDataUrl("/img/car1.jpg");
      // create image
      const img = new Image();
      img.src = imageData.dataUrl;

      img.onload = () => {
        // canvasCtx.drawImage(img, 1000, 500);
      };
    }
  };

  /**
   *
   * Start drawing
   */
  const startDrawing = (e: any) => {
    // stop default behavour of the canvas mouseoute
    e.preventDefault();
    e.stopPropagation();

    // Get the start position of the mouse on the canvas
    const STARTING_X_POSITION = +Number(e.pageX - offSetX);
    const STARTING_Y_POSITION = +Number(e.pageY - offSetY);

    // Save the positions
    setStartX(STARTING_X_POSITION);
    setStartY(STARTING_Y_POSITION);

    // update drawing state to true
    setDrawing(true);
  };

  /**
   *
   * Stop Drawing
   */
  const stopDrawing = (e: any) => {
    // stop default behavour of the canvas mouseup
    e.preventDefault();
    e.stopPropagation();

    // update drawing state to true
    setDrawing(false);

    /**
     *
     * Check the remaining space after drawing to decide
     * which position to render draw-box info
     */
    if (remainingXSpace <= DRAW_INFO__BOX_WIDTH) {
      const remainingSpaceByRight = canvasWidth - stopRightPoint;
      if (remainingSpaceByRight > DRAW_INFO__BOX_WIDTH) {
        console.log("Render box to right");
      } else {
        console.log("No space at the right side also, check up or down spaces");
        detectDrawInfoRenderYPosition(drawAxis)
      }
    } else {
      console.log("Render box to left");
    }
  };

  /**
   *
   * Draw Rectangle
   *
   */
  const draw = (e: any) => {
    // stop default behavour of the canvas mousemove
    e.preventDefault();
    e.stopPropagation();

    // Stop if drawing is false
    if (!drawing) {
      return;
    }

    // get the current mouse position
    const mouseX = Number(e.pageX - offSetX);
    const mouseY = Number(e.pageY - offSetY);

    if (ctx && canvasRef.current) {
      // clear the canvas
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // calculate the rectangle width/height based
      // on starting vs current mouse position
      var width = mouseX - startX;
      var height = mouseY - startY;

      // draw a new rect from the start position
      // to the current mouse position
      ctx.beginPath();
      ctx.rect(startX, startY, width, height);
      ctx.stroke();

      const axis = {
        x1: startX,
        y1: startY,
        x2: width,
        y2: height,
      };

      detectDrawInfoRenderXPosition(axis);
    }
  };

  const detectDrawInfoRenderXPosition = (axis: Record<string, number>) => {
    // get the remaining space
    let rmSpace: number;
    // if drawing direction was made in the left direction we have negative x2 value,
    //  add this to the start point(x1) to get the remaining space from left of the canvas
    if (axis.x2 < 0) {
      rmSpace = axis.x1 + axis.x2;
    } else if (axis.x1 < DRAW_INFO__BOX_WIDTH) {
      // if draw info  box width is greater than x2, then, update remaining space to be x1
      rmSpace = axis.x1;
    } else {
      // if drawing direction was made in the right direction we have positive x2 value,
      //  add this to the start point (x1) to get the remaining space from left of the canvas
      rmSpace = axis.x1 + axis.x2;
    }

    // get stop point to right
    let rightStop: number = 0;
    if (axis.x2 < 0) {
      rightStop = axis.x1;
    } else {
      rightStop = axis.x1 + axis.x2;
    }
    setDrawAxis(axis);
    setStopRightPoint(rightStop);
    // update the remaining space value
    setRemainingXSpace(rmSpace);
  };

  const detectDrawInfoRenderYPosition = (axis: Record<string, number>) => {
    // get the remaining space
    let rmSpace: number;
    // if drawing direction was made in the left direction we have negative x2 value,
    //  add this to the start point(x1) to get the remaining space from left of the canvas
    if (axis.y2 < 0) {
      rmSpace = axis.y1 + axis.y2;
    } else if (axis.y1 < DRAW_INFO__BOX_WIDTH) {
      // if draw info  box width is greater than x2, then, update remaining space to be x1
      rmSpace = axis.y1;
    } else {
      // if drawing direction was made in the right direction we have positive x2 value,
      //  add this to the start point (x1) to get the remaining space from left of the canvas
      rmSpace = axis.y1 + axis.y2;
    }

    // get stop point to right
    let bottomStop: number = 0;
    if (axis.y2 < 0) {
      bottomStop = axis.y1;
    } else {
      bottomStop = axis.y1 + axis.y2;
    }

    renderDrawInfoHorizontally(bottomStop, rmSpace);
  };

  const renderDrawInfoHorizontally = (
    stopBottomPoint: number,
    remainingYSpace: number
  ) => {
    if (remainingYSpace <= DRAW_INFO__BOX_HEIGHT) {
      const remainingSpaceByBottom = canvasHeight - stopBottomPoint;
      if (remainingSpaceByBottom > DRAW_INFO__BOX_HEIGHT) {
        console.log("Render box to bottom");
      } else {
        console.log("No space at the bottom side also, render anywhere");
      }
    } else {
      console.log("Render box to top");
    }
    console.log(remainingYSpace)
  };

  return (
    <div className="bg-whiteColor min-h-full flex-1 rounded-2xl px-10 pt-8 pb-5">
      <div className="h-4/5 w-full border relative">
        <div className="absolute w-full h-full" ref={canvasContainerRef}>
          <canvas
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            ref={canvasRef}
            className={"z-40 absolute"}
          ></canvas>
          <NextImage
            src={imageUrl}
            className="w-full h-full"
            alt="car1"
            objectFit="cover"
            objectPosition="center"
            layout="fill"
          />
        </div>

        <DrawBoxInfo />
      </div>

      <div className="h-1/5">
        <DrawPagination />

        <div className="grid grid-cols-6 gap-x-5">
          {DUMMY_IMAGES.map((img) => (
            <div
              onClick={() => setImageUrl(img.url)}
              key={img.id}
              className=" relative rounded-2xl overflow-hidden h-28 bg-cover"
            >
              <NextImage
                src={img.url}
                alt="car1"
                objectFit="cover"
                objectPosition="center"
                layout="fill"
              />
              <button className="absolute top-2 right-2 w-6 h-6 rounded-md border-2 group border-whiteColor flex justify-center items-center">
                <CloseIcon className="text-whiteColor w-4 h-4 group-hover:text-redColor" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
