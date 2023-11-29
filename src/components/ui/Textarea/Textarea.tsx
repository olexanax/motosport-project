import classNames from "classnames";
import React from "react";
// styles
import styles from "./styles.module.scss";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea className={classNames(styles.textarea, className)} {...props} />
  );
};

export default Textarea;
