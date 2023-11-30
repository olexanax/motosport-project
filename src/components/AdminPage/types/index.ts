export enum LangsTypeEnum {
    "en" = "en",
    "ua" = "ua",
}
export enum IAdminPagesType {
    "About Me" = "About Me",
    "Victories" = "Victories",
    "News" = "News",
    "Gallery" = "Gallery",
    "Static Info" = "Static Info",
    "Partners" = "Partners",
}
export interface AdminPageQuries {
    victoryId?: string;
    victoryAddNew?: string;
    lang?: LangsTypeEnum;
}
