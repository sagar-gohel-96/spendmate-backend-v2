"use client";

import { PropsWithChildren, useEffect } from "react";
import { Navbar, Sidebar } from "./components";
import style from "../../styles/Layout.module.scss";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className={style.container}>
      <Navbar />
      <div className={style.main}>
        <Sidebar />
        <div className={style.body}>{children}</div>
      </div>
    </div>
  );
}
