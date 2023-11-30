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
  meta_tags: string;
}

export const getNews = async () => {
  try {
    const { data } = await axiosInstance.get("/news/");

    return data as News[];
  } catch (error) {
    return;
  }
};
