import React from "react";
// import "./Loader.css";
import { Modal } from "@mui/material";
export const Loader = () => {
  return (
    <>
      <Modal
        open={true}
        className="flex w-full h-full items-center justify-center"
      >
        {/* <div className="loading">
                    <svg width="64px" height="48px">
                        <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                        <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
                    </svg>
                </div> */}
        <div className="flex justify-center items-center h-40">
          <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></span>
        </div>
      </Modal>
    </>
  );
};
