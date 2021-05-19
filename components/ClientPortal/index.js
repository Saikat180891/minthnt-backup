import PropTypes from "prop-types";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ClientPortal = ({
  children,
  className = "",
  selector = "bb-modal",
  styles,
}) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!document?.body) return;
    let portal = document.getElementById(selector);
    if (!portal) {
      portal = document.createElement("DIV");
      portal.className = className;
      portal.id = selector;
      if (styles) {
        portal.style.cssText = styles;
      }
      document.body.appendChild(portal);
    }
    ref.current = portal;
    setMounted(true);
    return () => {
      const portal = document.getElementById(selector);
      portal?.remove();
    };
  }, []);

  return mounted ? createPortal(children, ref.current) : null;
};

ClientPortal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  selector: PropTypes.string,
};

export default ClientPortal;
