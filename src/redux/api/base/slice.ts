import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        credentials: "same-origin",
        prepareHeaders: (headers) => {
            // console.log(headers.get("Content-Type"));
            // if (!!!headers.get("Content-Type")) {
            //     console.log("CHANGE");
            //     headers.set("Content-Type", `application/json`);
            // }
            // if (!!!headers.get("accept")) {
            //     console.log(headers.get("accept"));
            //     headers.set("accept", `application/json`);
            // }
            // console.log(headers.get("Content-Type"));
            return headers;
        },
        baseUrl: "http://164.90.230.225/api/v1/",
    }),
    tagTypes: ["Gallery"],
    endpoints: (_) => ({}),
});
