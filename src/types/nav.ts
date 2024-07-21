export type NavMenuType = {
  title: string;
  url?: string;
  subMenu?: NavMenuType[];
  disable?: boolean;
};
