import React, { useState, useEffect } from "react";
import Follow from "./follow";
import "./right.css";
import { useSelector } from "react-redux";
import soon from "../soon";
import RightProfile from "./rightProfile";
export default function Right({ currentProfile }) {
  const { user } = useSelector((state) => state.user);
  const [class1, setClass1] = useState("d-none");
  useEffect(() => {
    if (user.following.length > 0) {
      setClass1("");
    } else {
      setClass1("d-none");
    }
  }, [user.following.length]);
  return !currentProfile ? (
    <div className="rightbar-container rightbar-disappear">
      <div className="rightbar-wrapper">
        <div className="birthday" onClick={soon}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2Fgift.png?alt=media&token=bdc05b73-9e0e-4469-a009-2a3c1ba84e9e"
            alt="birthday"
          />
          <span className="birthday-text">
            <b>Katy Perry</b> and <b>3 other friends</b> have birthday today
          </span>
        </div>
        <div className="rightbar-connected">
          <img
            className="rightbar-ad"
            src="https://accesstysons.com/wp-content/uploads/2020/04/AccessTysons_StayConnected_Logo.png"
            alt="ad"
          />
        </div>
        <div className={`rightbar-friends-container ${class1}`}>
          <h5 className="ps-2">People You Are Following</h5>
          <ul className="rightbar-friends">
            {user.following.map((following) => (
              <Follow follow={following} key={following} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <RightProfile user={user} currentProfile={currentProfile} />
  );
}
