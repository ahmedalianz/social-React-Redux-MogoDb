import React from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/users/user";
export default function Facebook() {
  const dispatch = useDispatch();
  const responseFacebook = async (response) => {
    const username = response.name;
    const email = response.email;
    const password = response.id;
    const picture = response.picture.data.url;
    const mainUrl = process.env.REACT_APP_URL;
    let res = await axios.post(`${mainUrl}signup/facebook`, {
      username,
      email,
      password,
      picture,
    });
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("currentUser", JSON.stringify(res.data));
    dispatch(editUser({ user: res.data }));
  };
  return (
    <div>
      <FacebookLogin
        appId="1276887056090312"
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
}
