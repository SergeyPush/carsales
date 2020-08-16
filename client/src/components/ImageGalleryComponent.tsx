import React, { MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface Props {
  show: boolean;
  images: [];
  close: (item: boolean) => void;
  index: number;
}

const ImageGalleryComponent = ({ show, images, close, index }: Props) => {
  const photos = images.map((item: string) => ({ original: item }));

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    close(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
          onClick={(e) => handleBackdropClick(e)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="md:w-2/4 mx-auto">
            <div onClick={() => close(false)}>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="x w-10 h-10 text-white fill-current font-bold ml-auto cursor-pointer"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <ImageGallery
              items={photos}
              showThumbnails={false}
              showFullscreenButton={false}
              showPlayButton={false}
              showBullets={true}
              startIndex={index}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageGalleryComponent;
