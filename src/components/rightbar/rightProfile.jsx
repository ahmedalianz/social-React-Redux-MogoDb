import React, { useState, useEffect } from "react";
import { MenuBars, Add, Remove, Edit, Confirm } from "../icons";
import { editUser } from "../../redux/users/user";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import Follow from "./follow";

export default function RightProfile({ user, currentProfile }) {
  const url = process.env.REACT_APP_URL;
  const [city, setCity] = useState(user.city || "");
  const [from, setFrom] = useState(user.from || "");
  const [bio, setBio] = useState(user.bio || "");
  const [class3, setClass3] = useState("d-none");
  const [followed, setFollowed] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentProfile) {
      setFollowed(user.following.includes(currentProfile._id));
    }
  }, [user.following, currentProfile]);

  const handleFollow = async () => {
    if (!followed) {
      try {
        let res = await axios.put(`${url}users/follow/${currentProfile._id}`, {
          userId: user._id,
        });
        dispatch(editUser({ user: res.data }));
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        toast.success(`You are now following ${currentProfile.username}`);
      } catch (err) {
        console.log("Error folllowing", err);
        if (err.message.includes(403)) {
          toast.error(`You already follow ${currentProfile.username}`);
        }
      }
      setFollowed(!followed);
    } else {
      try {
        let res = await axios.put(
          `${url}users/unfollow/${currentProfile._id}`,
          { userId: user._id }
        );
        dispatch(editUser({ user: res.data }));
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        toast.success(`You unfollowed ${currentProfile.username}`);
      } catch (err) {
        console.log(err);
        if (err.message.includes(403)) {
          toast.error(`You already unfollow ${currentProfile.username}`);
        }
      }
      setFollowed(!followed);
    }
  };
  const handleshowEdit = () => {
    if (class3 === "d-none") {
      setClass3("");
    } else {
      setClass3("d-none");
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(`${url}users/${user._id}`, {
        userId: user._id,
        city,
        from,
        bio,
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      dispatch(editUser({ user: res.data }));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const [class1, setClass1] = useState("rightbar-disappear");
  const [shown, setShown] = useState(false);
  const showSide = () => {
    if (shown) {
      setClass1("rightbar-disappear");
    } else {
      setClass1("rightbar-show");
    }
    setShown(!shown);
  };

  return (
    <>
      <span className="ps-2 menu-bars2" onClick={showSide}>
        <MenuBars htmlColor="white" />
      </span>

      <div className={`rightbar-container ${class1}`}>
        <div className="rightbar-wrapper">
          {user.username !== currentProfile.username && (
            <button className={`btn btn-primary`} onClick={handleFollow}>
              {followed ? (
                <>
                  UnFollow <Remove />
                </>
              ) : (
                <>
                  Follow <Add />
                </>
              )}
            </button>
          )}
          <div className="info-head">
            <h4 className="rightbar-title">
              {currentProfile.username || "Anonymous"} Information
            </h4>
            {user.username === currentProfile.username && (
              <span className="info-button">
                <Edit htmlColor="blue" onClick={handleshowEdit} />
              </span>
            )}
          </div>
          <div className="rightbar-info">
            <form onSubmit={handleEdit}>
              <div className="rightbar-info-item">
                <span className="rightbar-info-item-key">Country :</span>
                {user.username === currentProfile.username && (
                  <div className={`input-group mb-3 ${class3}`}>
                    <input
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      type="text"
                      className="form-control"
                    />
                  </div>
                )}
                <span className="rightbar-info-item-value">
                  {currentProfile.city || ""}
                </span>
              </div>
              <div className="rightbar-info-item">
                <span className="rightbar-info-item-key">Lives in :</span>
                {user.username === currentProfile.username && (
                  <div className={`input-group mb-3 ${class3}`}>
                    <input
                      onChange={(e) => setFrom(e.target.value)}
                      value={from}
                      type="text"
                      className="form-control"
                    />
                  </div>
                )}
                <span className="rightbar-info-item-value">
                  {currentProfile.from || ""}
                </span>
              </div>
              <div className="rightbar-info-item">
                <span className="rightbar-info-item-key">Bio :</span>
                {user.username === currentProfile.username && (
                  <div className={`input-group mb-3 ${class3}`}>
                    <input
                      onChange={(e) => setBio(e.target.value)}
                      value={bio}
                      type="text"
                      className="form-control"
                    />
                  </div>
                )}
                <span className="rightbar-info-item-value">
                  {currentProfile.bio || ""}
                </span>
              </div>
              {user.username === currentProfile.username && (
                <button
                  type="submit"
                  className={`btn  btn-outline-none ${class3}`}
                >
                  <Confirm htmlColor="blue" />
                </button>
              )}
            </form>
          </div>
          <h4 className="rightbar-title">
            People Following
            {currentProfile.id === user.id ? " You" : currentProfile.username}
          </h4>
          <div className="rightbar-followers">
            {currentProfile.followers &&
              currentProfile.followers.map((f) => (
                <Follow follow={f} key={f} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
