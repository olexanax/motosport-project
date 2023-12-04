"use client";
//libs
import { FC, ReactElement, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
// types
import { AppDispatch, RootStateType } from "@/redux/types";
import { AdminPageQuries } from "@/components/AdminPage/types";
//redux
import {
  refreshToken,
  setIsLogged,
  setIsUnauthorizedRequest,
} from "@/redux/slices/login.slice";

const withAuth = (WrappedComponent: FC) => {
  return function WithAuth(props: Record<string, any>): ReactElement {
    const isLogged = useSelector(
      (state: RootStateType) => state.login.isLogged
    );
    const isUnauthorizedReq = useSelector(
      (state: RootStateType) => state.login.isUnauthorizedRequest
    );
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
      const access = JSON.parse(localStorage.getItem("accessMotosport")!);
      const refresh = JSON.parse(localStorage.getItem("refreshMotosport")!);
      if (
        access == null ||
        access.token == null ||
        refresh == null ||
        refresh.token == null ||
        new Date(refresh.exp) < new Date()
      ) {
        localStorage.removeItem("accessMotosport");
        localStorage.removeItem("refreshMotosport");
        router.push("/login");
        return;
      } else if (new Date(access.exp) < new Date()) {
        dispatch(refreshToken(refresh.token)).then((res) =>
          dispatch(setIsLogged(true))
        );
        return;
      }
      if (!isLogged) {
        dispatch(setIsLogged(true));
      }
      //eslint-disable-next-line
    }, []);
    useEffect(() => {
      if (isUnauthorizedReq) {
        localStorage.removeItem("accessMotosport");
        localStorage.removeItem("refreshMotosport");
        dispatch(setIsUnauthorizedRequest(false));
        alert(
          "An error occurred related to the authorization token. Please log in again and repeat your steps!"
        );
        router.push("/login");
      }
      //eslint-disable-next-line
    }, [isUnauthorizedReq]);
    if (!isLogged) {
      return (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "black",
            position: "absolute",
            zIndex: "100",
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
