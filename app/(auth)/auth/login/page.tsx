"use client";
import React, { useEffect } from "react";
import style from "./Login.module.scss";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function Page() {
  return (
    <div className={style.container}>
      <form>
        <h3>Login</h3>
        <div className={style.formContainer}>
          <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
            <label htmlFor="email" className={style.label}>
              Email Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={style.input}
            />
          </div>
          <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
            <label htmlFor="password" className={style.label}>
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={style.input}
            />
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button style={{ display: "flex", flex: 1 }} variant="contained">
              submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
