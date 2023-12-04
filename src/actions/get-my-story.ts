import { axiosInstance } from "@/lib/axios";

export interface MyStory {
  id: number;
  order: number;
  title: string;
  description: string;
  language: "EN" | "UA";
  image: string;
}

export const getMyStory = async (lng: "en" | "ua"): Promise<MyStory[] | undefined> => {
  try {
    const { data } = await axiosInstance.get("/my-story/");

    if (lng === "en") {
      return data.filter((item: MyStory) => item.language === "EN");
    } else {
      return data.filter((item: MyStory) => item.language === "UA");
    }
  } catch (error) {
    return;
  }
};
