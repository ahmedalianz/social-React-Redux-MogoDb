import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPostsInStore } from "../../redux/posts/posts";
import { Sad } from "../icons";
import axios from "axios";
import Post from "./post/post";
import Share from "./share/share";
import Welcome from "./welcome";
import MyLoader from "../loader";
import "./feed.css";
export default function Feed({ username }) {
  const url = process.env.REACT_APP_URL;
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchPosts() {
      let res = username
        ? await axios(`${url}posts/profile/${username}`)
        : await axios(`${url}posts/alltimeline`);
      dispatch(
        setPostsInStore(
          res.data.sort(
            (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
          )
        )
      );
    }
    fetchPosts();
  }, [user._id, username, url, dispatch]);
  //------------------------there are posts---------------//
  if (posts) {
    if (posts.length > 0) {
      //------------------------home or my profile---------------//
      if (username === undefined || username === user.username) {
        return (
          <div className="feed-container">
            <div className="feed-wrapper">
              <Share />
              <div>
                {posts.map((post) => (
                  <Post post={post} key={post._id} />
                ))}
              </div>
            </div>
          </div>
        );
      }
      //------------------------other profile---------------//
      else {
        return (
          <div className="feed-container">
            <div className="feed-wrapper">
              {posts.map((post) => (
                <Post post={post} key={post._id} />
              ))}
            </div>
          </div>
        );
      }
    }
    //-----------------no posts--------//
    else {
      //-----------------my profile or home ---------//
      if (username === undefined || username === user.username) {
        return (
          <div className="feed-container">
            <div className="feed-wrapper">
              <Share />
              <div>
                <Welcome />
              </div>
            </div>
          </div>
        );
      }
      //------------------------other profile---------------//
      else {
        return (
          <div className="feed-container">
            <div className={`feed-wrapper sad-face`}>
              <span>{username}</span>{" "}
              <span className="ps-2">hasn't posted anything yet </span>
              <div>
                <Sad htmlColor="purple" style={{ fontSize: "150px" }} />
              </div>
            </div>
          </div>
        );
      }
    }
  } else {
    return (
      <div className="feed-container">
        <div className="feed-wrapper">
          <Share />
          <div>
            <MyLoader />
            <MyLoader />
          </div>
        </div>
      </div>
    );
  }
}
//----------------profile---------------------//
