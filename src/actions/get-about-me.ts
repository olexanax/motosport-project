import { axiosInstance } from "@/lib/axios";

export interface AboutMe {
  id: number;
  order: number;
  image: string;
}

export const getAboutMe = async () => {
  try {
    const { data } = await axiosInstance.get("/about-me/");

    return data as AboutMe[];
  } catch (error) {
    return;
  }
};
