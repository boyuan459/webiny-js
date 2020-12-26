import { Plugin } from "@webiny/plugins/types";

type RenderParams = {
  content: React.ReactNode;
};

export type AdminAppBarTopPlugin = Plugin & {
  type: "admin-appbar-top";
  render(params: RenderParams): React.ReactNode;
};

export type AdminAppBarMiddlePlugin = Plugin & {
  type: "admin-appbar-middle";
  render(params: RenderParams): React.ReactNode;
};

export type AdminAppBarBottomPlugin = Plugin & {
  type: "admin-appbar-bottom";
  render(params: RenderParams): React.ReactNode;
};
