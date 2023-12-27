import React from "react";

import useAppStore from "./useAppStore";
import { createCtx } from "../utils/createCtx";

type Context = ReturnType<typeof useAppStore>;
interface Props {
  children: React.ReactNode;
  value: Context;
}
//Main Page Context
const [useAppStoreCtx, PageContext] = createCtx<Context>();

//Main Page Provider
const PageProvider = ({ children, value }: Props) => {
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export { useAppStoreCtx, PageProvider };
