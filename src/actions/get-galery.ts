import { axiosInstance } from "@/lib/axios";

export interface GalleryPhoto {
  id: number;
  order: number;
  image: string;
}

export const getGallery = async () => {
  try {
    const { data } = await axiosInstance.get("/gallery/");

    return data as GalleryPhoto[];
  } catch (error) {
    return;
  }
};
