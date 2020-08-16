import React, { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface PropTypes {
  show: boolean;
  text: String;
  onCancel: (value: boolean) => void;
  onConfirm: () => void;
}

const Modal = ({ show, text, onCancel, onConfirm }: PropTypes) => {
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    onCancel(false);
  };

  return createPortal(
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-100 bg-opacity-50"
          onClick={(e) => handleBackdropClick(e)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white shadow-lg rounded-md border border-grey-600 overflow-hidden"
            key="modal"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: -100 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ type: "tween" }}
          >
            <div className="text-xl p-2 text-indigo-500 font-bold border-b border-gray-200">
              Delete the car?
            </div>
            <p className="p-3 text-gray-600 h-24 text-lg">
              {text || "Are sure want to delete this car?"}
            </p>
            <div className="p-2 border-t border-gray-200 flex justify-end">
              <button
                className="border-2 border-red-500 text-red-500 rounded-md px-2 py-1 focus:outline-none hover:bg-red-500 hover:text-white mr-2"
                onClick={() => onConfirm()}
              >
                Confirm
              </button>
              <button
                className="border-2 border-green-500 text-green-500 rounded-md px-2 py-1 focus:outline-none hover:bg-green-500 hover:text-white"
                onClick={() => onCancel(false)}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("app-modal")
  );
};

export default Modal;
