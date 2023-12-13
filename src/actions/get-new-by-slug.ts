import { axiosInstance } from "@/lib/axios";

export interface News {
    id: number;
    /** MMMM d yyyy format */
    date: string;
    title: string;
    description: string;
    image: string;
    views: number;
    slug: string;
    language: "EN" | "UA";
    meta_title: string;
    meta_description: string;
}

export const getNewsBySlug = async (slug: string) => {
    try {
        const { data } = await axiosInstance.get(`/news/${slug}/`);

        return data as News;
    } catch (error) {
        return;
    }
};
