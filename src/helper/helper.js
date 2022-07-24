import demoapi from "axios/api";
import React from "react";

export default function Helper() {
  function checkExpireTime() {
    const expireTime = localStorage.getItem("expireTime");
    console.log(expireTime);
    if (!expireTime) {
      return null;
    }
    const now = new Date();
    if (now.getTime() > expireTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("expireTime");
      localStorage.removeItem("userId");
      console.log("remove");
      return null;
    }
    console.log("token");
    return localStorage.getItem("token");
  }

  function verifyToken() {
    const expireTime = localStorage.getItem("expireTime");
    if (!expireTime) {
      return false;
    }
    const now = new Date();
    if (now.getTime() > expireTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("expireTime");
      localStorage.removeItem("userId");
      console.log("remove");
    }
    return demoapi
      .get("/api/index", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .then(res => {
        if (res.status === 200) {
          console.log("verified!");
          return true;
        } else {
          return false;
        }
      });
  }
  return { checkExpireTime: checkExpireTime, verifyToken: verifyToken };
}
