import { axiosInstance } from "@/lib/axios";

export interface News {
  id: number;
  order: number;
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
  short_description: string;
}

export const getNews = async (lng: "en" | "ua"): Promise<News[] | undefined> => {
  try {
    const { data } = await axiosInstance.get("/news/");

    if (lng === "en") {
      return data.filter((item: News) => item.language === "EN");
    } else {
      return data.filter((item: News) => item.language === "UA");
    }
  } catch (error) {
    return;
  }
};
