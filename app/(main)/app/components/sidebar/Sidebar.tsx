import React from "react";
import style from "./Sidebar.module.scss";
import { Menu } from "../index";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import {
  PieChartOutline,
  AccountBalanceWalletOutlined,
  AddOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";

export const Sidebar = () => {
  const router = useRouter();
  return (
    <div className={style.container}>
      <Menu
        icon={<PieChartOutline style={{ color: "black" }} />}
        withText={true}
        text="Reports"
        onClick={() => router.push("/reports")}
      />
      <Menu
        icon={<AccountBalanceWalletOutlined style={{ color: "black" }} />}
        withText={true}
        text="Transaction"
        onClick={() => router.push("transaction")}
      />
      <Button
        startIcon={<AddOutlined />}
        style={{
          color: "black",
          backgroundColor: "#fbcfb7",
          fontFamily: "Poppins",
        }}
        variant="contained"
      >
        Transaction
      </Button>
    </div>
  );
};
