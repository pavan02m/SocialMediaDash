import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      await axios
        .get("http://localhost:9000/api/v1/user/getData", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        })
        .then((res) => {
          dispatch(hideLoading());
          if (res.data.success) {
            dispatch(setUser(res.data.user));
          } else {
            <Navigate to={"/"} />;
          }
        })
        .catch((error) => {
          dispatch(hideLoading());
          console.log(error);
        });
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (!user) {
  //     getUser();
  //   }
  // }, [user, getUser]);

  if (localStorage.getItem("auth_token")) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}
