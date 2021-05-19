import React from "react";
import ClientPortal from "@/ClientPortal";
import PropTypes from "prop-types";
import tw from "twin.macro";
import { motion } from "framer-motion";

const Modal = ({ children, show = false, blurBackground = false, ...rest }) => {
  React.useEffect(() => {
    if (!blurBackground) return;
    const root = document.getElementById("__next");

    if (show) {
      if (root) root.classList.add("blur");
      document.body.style.overflow = "hidden";
    } else {
      if (root) root.classList.remove("blur");
      document.body.style.overflow = "unset";
    }

    return () => {
      if (!show) {
        if (root) root.classList.remove("blur");
        document.body.style.overflow = "unset";
      }
    };
  }, [show]);

  if (!show) return null;

  return (
    <ClientPortal
      {...rest}
      tw="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75 z-50"
      selector="bb-modal"
    >
      <motion.div
        initial={{ y: "-100%", opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {children}
      </motion.div>
      <style>{`
        .blur {
          -webkit-filter: blur(5px);
          -moz-filter: blur(5px);
          -o-filter: blur(5px);
          -ms-filter: blur(5px);
          filter: blur(5px);
        }
      `}</style>
    </ClientPortal>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
};
