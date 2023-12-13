import axios from "axios";
import { serverDomain } from "./API";
import { tokenSetters } from "./tokenSetters";

export const adminInstance = axios.create({
    baseURL: serverDomain,
    withCredentials: true,
});

adminInstance.interceptors.request.use((config) => {
    const accessToken = JSON.parse(localStorage.getItem("accessMotosport")!);

    config.headers.Authorization = `Bearer ${accessToken.token}`;
    return config;
});

adminInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Handle token refresh logic here
        if (error.response.status === 401) {
            const originalRequest = error.config;

            if (!originalRequest._retry) {
                originalRequest._retry = true;

                if (!localStorage.getItem("refreshMotosport")) {
                    localStorage.clear();
                    alert("Wrong username or password");
                    return;
                }

                try {
                    const refreshToken = JSON.parse(
                        localStorage.getItem("refreshMotosport")!
                    );

                    const response = await axios.post(
                        serverDomain + "/token/refresh/",
                        { refresh: refreshToken.token },
                        {
                            withCredentials: true,
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.status === 200) {
                        tokenSetters(
                            response.data.access,
                            response.data.refresh
                        );

                        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                        return axios(originalRequest);
                    }
                } catch (refreshError) {
                    localStorage.clear();
                    alert("Session time has expired, please log in again");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            } else {
                localStorage.clear();
            }
        }

        return Promise.reject(error);
    }
);
