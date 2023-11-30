import { axiosInstance } from "@/lib/axios";

export interface Partner {
  id: number;
  order: number;
  image: string;
}

export const getPartners = async () => {
  try {
    const { data } = await axiosInstance.get("/our-partners/");

    return data as Partner[];
  } catch (error) {
    return;
  }
};
