import React, { useState, useEffect } from "react";
import { Arrow } from "../../components/icons";
import "./myprofile.css";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/users/user";
import axios from "axios";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import storage from "../../storage";
import { uploadError, uploadProgress } from "../../components/upload";
import resizeFile from "../../components/resizer";

export default function Myprofile({ user }) {
  const url = process.env.REACT_APP_URL;
  const dispatch = useDispatch();
  const [class1, setClass1] = useState("d-none");
  const [class2, setClass2] = useState("d-none");
  const [file1, setFile1] = useState(null);
  const [link1, setLink1] = useState("");
  const [file2, setFile2] = useState(null);
  const [link2, setLink2] = useState("");
  const showProfile = () => {
    setClass1("");
    setClass2("d-none");
  };
  const showCover = () => {
    setClass2("");
    setClass1("d-none");
  };
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (file1) {
      const image = await resizeFile(file1);
      const imageName = user._id + image.name;
      const storageRef = ref(storage, `images/${imageName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          uploadProgress(snapshot);
        },
        (error) => {
          uploadError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLink1(downloadURL);
          });
        }
      );
    } else {
      console.log("no file");
    }
  };
  useEffect(() => {
    if (link1 !== "") {
      async function upload() {
        try {
          let res = await axios.put(`${url}users/${user._id}`, {
            userId: user._id,
            profilePicture: link1,
          });
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          sessionStorage.setItem("currentUser", JSON.stringify(res.data));
          dispatch(editUser({ user: res.data }));
          setClass1("d-none");
          setLink1("");
        } catch (err) {
          console.log(err);
        }
      }
      upload();
    }
  }, [link1]);
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (file2) {
      const image = await resizeFile(file2);
      const imageName = user._id + image.name;
      const storageRef = ref(storage, `images/${imageName}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          uploadProgress(snapshot);
        },
        (error) => {
          uploadError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLink2(downloadURL);
          });
        }
      );
    } else {
      console.log("no file");
    }
  };
  useEffect(() => {
    if (link2 !== "") {
      async function upload() {
        try {
          let res = await axios.put(`${url}users/${user._id}`, {
            userId: user._id,
            coverPicture: link2,
          });
          localStorage.setItem("currentUser", JSON.stringify(res.data));
          sessionStorage.setItem("currentUser", JSON.stringify(res.data));
          dispatch(editUser({ user: res.data }));
          setClass2("d-none");
          setLink2("");
        } catch (err) {
          console.log(err);
        }
      }
      upload();
    }
  }, [link2]);

  return (
    <div className="profile-photos">
      <div className="myprofile-avatar-container">
        <img
          className="myprofile-avatar"
          src={
            user.profilePicture ||
            "https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2FnoAvatar.png?alt=media&token=2d9631c1-69bd-46ba-94fe-78e2bc2872c4"
          }
          alt="avatar"
        />
        <Arrow
          className="myavatar-arrow"
          onClick={showProfile}
          style={{ fontSize: "50px" }}
          htmlColor="rgb(29, 66, 145)"
        />
        <Arrow
          className="myavatar-arrow2"
          onClick={showCover}
          style={{ fontSize: "50px" }}
          htmlColor="rgb(29, 66, 145)"
        />
        <form
          className={`myprofile-menu ${class1}`}
          onSubmit={handleSubmit1}
          encType="multipart/form-data"
        >
          <button className="btn" onClick={() => setClass1("d-none")}>
            X
          </button>
          <label htmlFor="file1">
            <div className="btn btn-success mb-1">Choose Profile Picture</div>
            <br />
            <input
              required
              type="file"
              id="file1"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => setFile1(e.target.files[0])}
              className="d-none"
            />
          </label>
          <button type="submit" className="btn btn-warning ms-3">
            Change
          </button>
        </form>
        <form
          className={`myprofile-menu ${class2}`}
          onSubmit={handleSubmit2}
          encType="multipart/form-data"
        >
          <button
            className="btn btn-close"
            onClick={() => setClass2("d-none")}
          />
          <label htmlFor="file2">
            <div className="btn btn-success mb-1">Choose Cover Picture</div>
            <br />
            <input
              required
              type="file"
              id="file2"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => setFile2(e.target.files[0])}
              className="d-none"
            />
          </label>
          <button type="submit" className="btn btn-warning ms-3">
            Change
          </button>
        </form>
      </div>
      <img
        className="profile-cover"
        src={
          user.coverPicture ||
          "https://firebasestorage.googleapis.com/v0/b/sprout-sociaz.appspot.com/o/main%2FnoCover.png?alt=media&token=d3231579-2d15-4a76-a176-f4bff698e656"
        }
        alt="cover"
      />
    </div>
  );
}
