import React, { ReactElement } from "react";
import style from "./Menu.module.scss";

interface MenuProps {
  withText: boolean;
  text?: string;
  icon: ReactElement;
  onClick?: () => void;
}

export const Menu = ({ withText, text, icon, onClick }: MenuProps) => {
  return (
    <div className={style.container} onClick={onClick}>
      {icon}
      {withText && <span className={style.text}>{text}</span>}
    </div>
  );
};
