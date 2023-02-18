import { useEffect } from "react";
import { useState } from "react";

const { useContext } = require("react");
const { createContext } = require("react");

export const NOTIFY_TYPE = {
  INFO: "info",
  WARN: "warning",
  ERROR: "error",
  SUCCESS: "success",
};

export const TIME_CLOSE = 3000;

const NotifyContext = createContext({
  show: false,
  message: "",
  type: NOTIFY_TYPE.INFO,
  notify: {
    success: (message = "") => {},
    info: (message = "") => {},
    warn: (message = "") => {},
    err: (message = "") => {},
  },
  closeNotify: () => {},
});

export const NotifyProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(NOTIFY_TYPE.INFO);

  const closeNotify = () => {
    setShow(false);
  };

  useEffect(() => {
    let timeout = null;

    if (show) {
      timeout = setTimeout(() => {
        setShow(false);
      }, TIME_CLOSE);
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [show]);

  const _ = (type) => (message) => {
    setShow(true);
    setMessage(message);
    setType(type);
  };

  const notify = {
    success: _(NOTIFY_TYPE.SUCCESS),
    info: _(NOTIFY_TYPE.INFO),
    warn: _(NOTIFY_TYPE.WARN),
    err: _(NOTIFY_TYPE.ERROR),
  };

  const value = {
    show,
    message,
    type,
    notify,
    closeNotify,
  };

  return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>;
};

export const useNotify = () => {
  const context = useContext(NotifyContext);

  if (!context) {
    throw Error("Must be using in Notify Provider");
  }

  return context;
};
