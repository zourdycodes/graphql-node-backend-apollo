import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = ({ target }) => {
    setValues({ ...values, [target.name]: target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
    setValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      body: "",
    });
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
