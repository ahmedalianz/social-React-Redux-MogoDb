import React, { useState } from "react";
import Menu from "./menu";
import "./side.css";
import { MenuBars } from "../icons";
export default function Side() {
  const [class1, setClass1] = useState("side-disappear");
  const [shown, setShown] = useState(false);
  const showSide = () => {
    if (shown) {
      setClass1("side-disappear");
    } else {
      setClass1("side-show");
    }
    setShown(!shown);
  };

  return (
    <>
      <span className="ps-2 menu-bars" onClick={showSide}>
        <MenuBars htmlColor="white" />
      </span>
      <div className={`sidebar-container ${class1}`}>
        <div className="sidebar-wrapper ">
          <Menu />
        </div>
      </div>
    </>
  );
}
