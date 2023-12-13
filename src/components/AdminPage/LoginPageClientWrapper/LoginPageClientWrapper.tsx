"use client";
//types

//libs
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//styles
import global from "@/styles/global.module.scss";
import styles from "./styles.module.scss";
//redux
import { AppDispatch, LoginFormInputs, RootStateType } from "@/redux/types";
import { loginUser } from "@/redux/slices/login.slice";
import { useDispatch, useSelector } from "react-redux";
export const fetchCache = "force-no-store";
export const revalidate = 0;
export const dynamic = "force-dynamic";

const LoginPageClientWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootStateType) => state.login.isLoginError);
  const isLogining = useSelector(
    (state: RootStateType) => state.login.isLoginLoading
  );
  const router = useRouter();
  useEffect(() => {
    if (!isLogining && localStorage.getItem("accessMotosport") != null) {
      router.push("/admin");
    }
    // eslint-disable-next-line
  }, [isLogining]);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<LoginFormInputs>();

  const submitForm = (data: LoginFormInputs) => {
    dispatch(loginUser(data));
  };

  return (
    <div id="about-us" className={styles.container}>
      <div className={styles.content}>
        <h1 className={classNames(styles.title, global.pageTitle)}>Welcome!</h1>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <div className={styles.inputBlock}>
            <p className={styles.label}>Log In</p>
            <input
              type="text"
              {...register("username", { required: true })}
              className={styles.input}
            />
          </div>
          <div className={styles.inputBlock}>
            <p className={styles.label}>Password</p>
            <input
              type="password"
              {...register("password", { required: true })}
              className={styles.input}
            />
          </div>
          <input
            disabled={isLogining || !isValid}
            type="submit"
            value={`${isLogining ? "Loading..." : "Sign In"}`}
            className={classNames(styles.btn, global.primaryButton)}
          />
          {error && (
            <div className={styles.error}>
              Something went wrong, please try again !
            </div>
          )}
        </form>
      </div>
    </div>
  );
};


export default LoginPageClientWrapper;
