import { updateStaticContent } from "@/redux/slices/staticContent.slice";

export enum LangsTypeEnum {
    "en" = "en",
    "ua" = "ua",
}
export enum IAdminPagesType {
    "About Me" = "About Me",
    "Victories" = "Victories",
    "News" = "News",
    "Gallery" = "Gallery",
    "Partners" = "Partners",
    "My story" = "My story",
    "Static Info" = "Static Info",
}
export interface AdminPageQuries {
    victoryId?: string;
    victoryAddNew?: string;

    myStoryId?: string;
    myStoryAddNew?: string;

    newsId?: string;
    newsAddNew?: string;

    lang?: LangsTypeEnum;
}
export type updateStaticContentFn = (
    data: Record<
        "heading_tags" | "meta_tags" | "content",
        { [key: string]: string }
    >
) => void;
