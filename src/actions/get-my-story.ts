import { axiosInstance } from "@/lib/axios";

export interface MyStory {
  id: number;
  order: number;
  title: string;
  description: string;
  image: string;
}

export const getMyStory = async () => {
  try {
    const { data } = await axiosInstance.get("/my-story/");

    return data as MyStory[];
  } catch (error) {
    return;
  }
};
