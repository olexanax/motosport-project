//components
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Toaster } from "sonner";
import { ReduxProvider } from "@/lib/validators/ReduxProvider";
//libs
import { dir } from "i18next";
import { languages } from "../i18n/settings";
//styles
import "@/styles/global.scss";
//images
import fav from "./favicon.ico";
// types
import { type Metadata } from "next";

import { I18PageProps } from "@/types/i18NextTypes";
import Banner from "@/components/Banner/Banner";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: I18PageProps["params"];
}) {
  revalidatePath("/", "layout");

  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <ReduxProvider>
          <Header {...{ lng }} />
          <main>
            {children}
            <Banner lng={lng} />
          </main>
          <Toaster richColors closeButton />
          <Footer {...{ lng }} />
        </ReduxProvider>
      </body>
    </html>
  );
}
