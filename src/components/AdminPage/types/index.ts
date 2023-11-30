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
    lang?: LangsTypeEnum;
}
