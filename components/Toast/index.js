import { useToast } from "@chakra-ui/react";
import React from "react";
import { Observable } from "../../utils/Observable";

const toastObservable = new Observable();
const Toast = () => {
  const toast = useToast();
  React.useEffect(() => {
    toastObservable.subscribe(
      ({ title = "", description = "", status = "success" }) => {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    );
  }, []);
  return null;
};

export default Toast;
export { toastObservable as toast };
