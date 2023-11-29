import { ToastError } from "@/config/validation-errors";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { SendEmailForm } from "./types/send-email";

export interface PostPartnerFormPayload extends SendEmailForm {}

export const postPartnerForm = async (payload: PostPartnerFormPayload) => {
  try {
    const { data } = await axiosInstance.post(
      "/send_email/become-partner/",
      payload
    );

    return data as string;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(ToastError.SomethingWentWrong);
    }
  }
};
