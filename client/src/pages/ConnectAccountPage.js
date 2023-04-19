import React from "react";
import { Button } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import { Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { LoginSocialFacebook } from "reactjs-social-login";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";

export default function ConnectAccountPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const handleConnect = (res) => {
    console.log("Trying to connect ");
    try {
      console.log(res);
      dispatch(setUser(res.data));
      localStorage.setItem("access_token", user.accessToken);
      localStorage.setItem("userId", user.id);
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Center h="100vh">
      <LoginSocialFacebook
        appId="1239637279990101"
        onResolve={handleConnect}
        onReject={(err) => {
          console.log(err.message);
        }}
      >
        <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
          Connect to Facebook
        </Button>
      </LoginSocialFacebook>
    </Center>
  );
}
