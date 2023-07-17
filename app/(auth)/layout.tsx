"use client";
import style from "./Layout.module.scss";
import { PropsWithChildren, useEffect } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return <div className={style.container}>{children}</div>;
}
