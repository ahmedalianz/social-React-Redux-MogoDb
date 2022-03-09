import React, { useState } from "react";
import "./topbar.css";
import { useSelector } from "react-redux";
import { Chat, Search, Person, Notifications } from "../icons";
import { List } from "@mui/material";
import { Link } from "react-router-dom";
import soon from "../soon";
import axios from "axios";
import SearchPerson from "./searchperson";
export default function TopBar() {
  const url = process.env.REACT_APP_URL;
  const { user } = useSelector((state) => state.user);
  const [searchedItems, setSearchedItems] = useState([]);
  const [class1, setClass1] = useState("search-disappear");
  const [shown, setShown] = useState(false);
  const handleSearch = async (text) => {
    if (text !== "") {
      try {
        let res = await axios.get(`${url}users/search/?search=${text}`);
        setSearchedItems(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSearchedItems([]);
    }
  };
  const showSearch = () => {
    if (shown) {
      setClass1("search-disappear");
      setSearchedItems([]);
    } else {
      setClass1("search-show");
    }
    setShown(!shown);
  };

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <span className="topbar-logo">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2Flogo.png?alt=media&token=91b134f8-5886-498a-92cf-a7f7913c8761"
              className="topbar-logo-img"
              alt="logo"
            />
          </Link>
        </span>
      </div>
      <div className="topbar-center">
        <input
          className={`form-control me-2 ${class1}`}
          type="search"
          placeholder="Search for People  ..."
          aria-label="Search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <span className="ps-2 seacrh-icon" onClick={showSearch}>
          <Search htmlColor="white" />
        </span>
        {searchedItems.length > 0 && (
          <div className="searched-items">
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                borderRadius: 3,
              }}
            >
              {searchedItems.map((item) => (
                <SearchPerson item={item} key={item._id} />
              ))}
            </List>
          </div>
        )}
      </div>
      <div className="topbar-right">
        <div className="topbar-profile">
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture ||
                "https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2FnoAvatar.png?alt=media&token=2d9631c1-69bd-46ba-94fe-78e2bc2872c4"
              }
              alt="profile"
              className="profile-pic"
            />
          </Link>
          <Link to={`/profile/${user.username}`}>
            <span>{user.username}</span>
          </Link>
        </div>

        <div className="topbar-icons">
          <div className="topbar-iconItem" onClick={soon}>
            <Person />
            <span className="topbar-iconBadge">3</span>
          </div>
          <div className="topbar-iconItem" onClick={soon}>
            <Chat />
            <span className="topbar-iconBadge">2</span>
          </div>
          <div className="topbar-iconItem" onClick={soon}>
            <Notifications />
            <span className="topbar-iconBadge">2</span>
          </div>
        </div>
      </div>
    </div>
  );
}
