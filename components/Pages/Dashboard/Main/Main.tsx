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
  const [imageUrl, setImageUrl] = useState("/img/car1.jpg");
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const boxContainerRef = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx: any = null;
  const CARD_WIDTH: number = 100;
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>();

  // Image data
  const [imageStartX, setImageStartX] = useState<number>(0);
  const [imageStartY, setImageStartY] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const [remainingWidth, setRemainingWidth] = useState<number>(0)
  
  
  const [drawing, setDrawing] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
 

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

  // get the image element
  useEffect(() => {
    setImageElement(
      imageContainerRef.current?.children[0].children[0] as HTMLImageElement
    );
    
  }, [imageUrl]);

  useEffect(() => {
    updateImageLocation();
  }, [imageElement]);

  const updateImageLocation = () => {
    if (imageElement) {
      const { x, y, width, height, bottom, left, right, top } =
        imageElement.getBoundingClientRect();

      
      // update height for image
      setImageStartX(x + window.scrollX);
      setImageStartY(y + window.scrollY);
      setImageWidth(width)
    }
  };

  const drawOnImage = (e: any) => {
    
    if (boxContainerRef.current && !drawing) {
      // box start
      const BOX_START_X = e.pageX - imageStartX;
      const BOX_START_Y = e.pageY - imageStartY;
      boxContainerRef.current.style.left = `${BOX_START_X}px`;
      boxContainerRef.current.style.top = `${BOX_START_Y}px`;
      setDrawing(true);
    }
    const BOX_HEIGHT = e.pageY - startY;
    const BOX_WIDTH = e.pageX - startX;


  
    if (boxContainerRef.current && BOX_WIDTH < remainingWidth) {
      boxContainerRef.current.style.width = `${BOX_WIDTH}px`;
      boxContainerRef.current.style.height = `${BOX_HEIGHT}px`;
    }
  };

  const startDrawingOnImage = (e: any) => {

    setRemainingWidth(imageWidth  - (e.pageX -imageStartX) -8)
    // get space from left
    setStartX(e.pageX);
    setStartY(e.pageY);
  };
  const stopDrawingOnImage = (e: any) => {
    setDrawing(false);
    console.log("Ended drawing");
  };

  return (
    <div className="bg-whiteColor min-h-full flex-1 rounded-2xl px-10 pt-8 pb-5">
      <div className="h-4/5 w-full border relative" ref={imageContainerRef}>
        <Image
          src={imageUrl}
          className="w-full h-full"
          alt="car1"
          objectFit="cover"
          objectPosition="center"
          layout="fill"
          onDrag={drawOnImage}
          onDragStart={startDrawingOnImage}
          onDragEnd={stopDrawingOnImage}
        />
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

        <div
          ref={boxContainerRef}
          className="absolute border-4 border-red-500 pointer-events-none"
          style={{
            left: 0,
          }}
        ></div>
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
