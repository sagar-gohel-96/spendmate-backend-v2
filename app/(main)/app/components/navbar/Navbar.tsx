import React from "react";
import style from "./Navbar.module.scss";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const Navbar = () => {
  return (
    <div className={style.container}>
      <div className={style.logoContainer}>SPENDMATE</div>
      <Button
        variant="contained"
        style={{
          display: "flex",
          justifyContent: "center",
          color: "black",
          borderColor: "black",
          backgroundColor: "#fbcfb7",
          boxShadow: "none",
        }}
      >
        Create
      </Button>
    </div>
  );
};
