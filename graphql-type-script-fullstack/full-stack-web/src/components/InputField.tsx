import React, { InputHTMLAttributes } from "react";
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from "@chakra-ui/core";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({ label, textarea, size: _, ...props }) => {
  const [field, { error }] = useField(props);
  let Component = Input;
  if (textarea) {
    Component = Textarea;
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Component {...field} {...props} id={field.name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
