import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editUser } from "../../redux/users/user";

export default function Google() {
  const dispatch = useDispatch();
  const responseGoogle = async (response) => {
    const username = response.profileObj.name;
    const email = response.profileObj.email;
    const password = response.it.hT;
    const picture = response.profileObj.imageUrl;
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
    <GoogleLogin
      clientId="301313905020-kcss920kce5hpef127bh6fpbvehaeidb.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}
