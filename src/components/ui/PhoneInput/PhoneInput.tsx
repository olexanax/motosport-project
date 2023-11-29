import React from "react";
import { PhoneInput as PhoneInputLib } from "react-international-phone";
// styles
import classNames from "classnames";
import styles from "./styles.module.scss";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: () => void;
  placeholder?: string;
  className?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  onChange,
  value,
  className,
  placeholder,
  ...props
}) => {
  return (
    <PhoneInputLib
      inputClassName={classNames(styles.input, className)}
      placeholder={placeholder}
      hideDropdown
      defaultCountry="us"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default PhoneInput;
