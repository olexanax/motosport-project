import { ToastError } from "@/config/validation-errors";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface Victory {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const getVictories = async () => {
  try {
    const { data } = await axiosInstance.get("/victories/");

    return data as Victory[];
  } catch (error) {
    return;
  }
};
