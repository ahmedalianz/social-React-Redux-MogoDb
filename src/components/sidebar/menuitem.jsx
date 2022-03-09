import React from "react";
import { Link } from "react-router-dom";
import soon from "../soon";

export default function MenuItem({ item }) {
  return (
    <Link to="/">
      <button className="menu-item" onClick={soon}>
        <span className="menu-icon">{item.element}</span>
        <span className="menu-text">{item.name}</span>
      </button>
    </Link>
  );
}
