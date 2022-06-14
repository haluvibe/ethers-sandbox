import { useState } from "react";
import { useUser } from "../providers/UserProvider";

export const useEnterPin = () => {
  const { pin, handleChangePin } = useUser();
  const [value, setValue] = useState("");

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number: number = parseFloat(`1${+event.target.value}`);
    setValue(event.target.value);
    if (number >= 1000000) {
      handleChangePin(+event.target.value);
    }
  };

  return {
      pin,
      value,
      updateValue
  }
};
