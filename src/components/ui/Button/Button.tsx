import React, { ReactNode } from "react";

// images
import spinner from "../../../../public/images/icons/spinner.svg";
import Image from "next/image";

// styles
import global from "@/styles/global.module.scss";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  className,
  isLoading,
  children,
  ...props
}) => {
  return (
    <button
      type="submit"
      className={classNames(global.primaryButton, className, {
        [global.disablePrimaryButton]: isLoading,
      })}
      {...props}
      disabled={isLoading}
    >
      {isLoading && (
        <Image
          className={global.buttonSpinner}
          src={spinner}
          width={16}
          height={16}
          alt="Spinner icon"
        />
      )}
      {children}
    </button>
  );
};

export default Button;
