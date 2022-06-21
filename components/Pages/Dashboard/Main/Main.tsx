import Image from "next/image";
import React, {
  DOMAttributes,
  DragEventHandler,
  LegacyRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import CheckedCircleIcon from "../../../Global/Icons/CheckedCircleIcon";
import CloseCircleIcon from "../../../Global/Icons/CloseCircleIcon";
import CloseIcon from "../../../Global/Icons/CloseIcon";
import DropDownIcon from "../../../Global/Icons/DropDownIcon";

const Main = () => {
  const boxContainerRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState("/img/car1.jpg");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();
  const [offSetY, setOffSetY] = useState<number>(0);
  const [offSetX, setOffSetX] = useState<number>(0);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [startX, setStartX] = useState<number>(0);
  const [remainingSpace, setRemainingSpace] = useState<number>(0);

  const dummyImage = [
    {
      id: 1,
      url: "/img/car1.jpg",
    },
    {
      id: 2,
      url: "/img/car2.jpg",
    },
  ];

  useEffect(() => {
    // get the context and draw
    if (canvasRef.current) {
      const drawingContext = canvasRef.current.getContext("2d");
      if (drawingContext) {
        drawingContext.strokeStyle = "blue";
        drawingContext.lineWidth = 2;
        setCtx(drawingContext);
        //
        const canvasOffSet: DOMRect = canvasRef.current.getBoundingClientRect();
        setOffSetX(canvasOffSet.left + window.scrollX);
        setOffSetY(canvasOffSet.top + window.scrollY);
      }
    }
  }, []);

  const startDrawing = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    // save the starting x/y of the rectangle
    setStartX(+Number(e.pageX - offSetX));
    setStartY(+Number(e.pageY - offSetY));

    // set a flag indicating the drag has begun
    setDrawing(true);
  };

  const stopDrawing = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // set a flag indicating the drag has begun
    if (ctx) ctx.save();

    setDrawing(false);

    // check x position for card
    console.log(remainingSpace);
    if (remainingSpace <= 110) {
      console.log("Render box to right");
    } else {
      console.log("Render box to left");
    }
  };

  const draw = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // if we're not dragging, just return
    if (!drawing) {
      return;
    }

    // get the current mouse position
    const mouseX = Number(e.pageX - offSetX);
    const mouseY = Number(e.pageY - offSetY);

    // Put your mousemove stuff here

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
      // get the remaining space
      let rmSpace: number;
      if (axis.x2 < 0) {
        rmSpace = axis.x1 + axis.x2;
      } else if (axis.x1 < 110) {
        rmSpace = axis.x1;
      } else {
        rmSpace = axis.x1 + axis.x2;
      }
      setRemainingSpace(rmSpace);
      console.log(axis);
    }
  };

  return (
    <div className="bg-whiteColor min-h-full flex-1 rounded-2xl px-10 pt-8 pb-5">
      <div className="h-4/5 w-full border relative">
        <canvas
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          ref={canvasRef}
          width={1200}
          height={800}
        ></canvas>

        <div className="absolute flex space-x-2 bottom-40 right-0">
          <div>
            <div className="w-20 h-20 border-4 border-redColor relative"></div>
            <span className="inline-block pt-0.5 px-1 tracking-wide text-whiteColor font-semibold bg-redColor">
              Car
            </span>
          </div>
          <div className="px-3 py-3 rounded-2xl bg-grayColor">
            <p className="capitalize text-sm font-semibold text-textColorLight">
              label 1
            </p>
            <ul className="text-lg capitalize tracking-wide font-semibold text-textColorDark my-3">
              <li>
                car <span>|</span>
              </li>
            </ul>
            <div className="px-6 py-2 flex justify-between items-center rounded-2xl bg-whiteColor w-40">
              <button>
                <CheckedCircleIcon className="h-5 w-5 text-greenColor" />
              </button>
              <button>
                <CloseCircleIcon className="h-5 w-5 text-textColorLight" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1/5">
        <div className=" flex justify-end items-center mt-3 mb-2">
          <div className="flex items-center">
            <button className="mr-4">
              <DropDownIcon className="w-6 h-6 transform rotate-90 text-textColorLight" />
            </button>
            <span className="text-textColorLight">1</span>
            <span className="mx-4 text-textColorLight">/</span>
            <span>1</span>
            <button className="ml-4">
              <DropDownIcon className="w-6 h-6 transform -rotate-90 text-textColorLight" />
            </button>
          </div>
          <p className="ml-4 text-textColorLight">100%</p>
        </div>

        <div className="grid grid-cols-6 gap-x-5">
          {dummyImage.map((img) => (
            <div
              onClick={(e) => setImageUrl(img.url)}
              key={img.id}
              className=" relative rounded-2xl overflow-hidden h-28 bg-cover"
            >
              <Image
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
