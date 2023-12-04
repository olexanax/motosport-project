import { axiosInstance } from "@/lib/axios";

export interface Victory {
  id: number;
  order: number;
  title: string;
  description: string;
  language: "EN" | "UA";
  image: string;
}

export const getVictories = async (
  lng: "en" | "ua"
): Promise<Victory[] | undefined> => {
  try {
    const { data } = await axiosInstance.get("/victories/");

    if (lng === "en") {
      return data.filter((item: Victory) => item.language === "EN");
    } else {
      return data.filter((item: Victory) => item.language === "UA");
    }
  } catch (error) {
    return;
  }
};
