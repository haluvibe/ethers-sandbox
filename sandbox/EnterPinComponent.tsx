import { useState } from "react";
import { useUser } from "../providers/UserProvider";

export const EnterPin: React.FunctionComponent = () => {
  const { pin, handleChangePin } = useUser();
  const [value, setValue] = useState("");

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number: number = parseFloat(`1${+event.target.value}`);
    setValue(event.target.value);
    if (number >= 1000000) {
      handleChangePin(+event.target.value);
    }
  };

  if (pin) {
    return null;
  }

  return (
    <>
      <h1>Enter Pin:</h1>
      <label>Pin:</label>
      <input type="number" step="1" value={value} onChange={updateValue} />
    </>
  );
};
