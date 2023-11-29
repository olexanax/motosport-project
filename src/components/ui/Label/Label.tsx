import classNames from "classnames";
import React from "react";
import styles from "./styles.module.scss";

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  className?: string;
}

const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label className={classNames(styles.label, className)} {...props}>
      {children}
    </label>
  );
};

export default Label;
