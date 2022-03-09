import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Follow({ follow }) {
  const url = process.env.REACT_APP_URL;
  const [followPerson, setFollowPerson] = useState(null);
  useEffect(() => {
    async function fetchFollowings() {
      let res = await axios(`${url}users/?userId=${follow}`);
      setFollowPerson(res.data);
    }
    fetchFollowings();
  }, [follow]);
  return (
    <>
      {followPerson && (
        <div>
          <Link to={`/profile/${followPerson.username}`}>
            <img
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={
                followPerson.profilePicture ||
                "https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2FnoAvatar.png?alt=media&token=2d9631c1-69bd-46ba-94fe-78e2bc2872c4"
              }
              alt={followPerson.username || "profile picture"}
            />
          </Link>
          <Link
            to={`/profile/${followPerson.username}`}
            style={{
              textDecoration: "none",
              color: "black",
              textTransform: "capitalize",
            }}
          >
            <span className="ms-2">{followPerson.username}</span>
          </Link>
        </div>
      )}
    </>
  );
}
