import React, { useEffect, useState } from "react";
import { Card, CardFooter, Center } from "@chakra-ui/react";
import { Image, Button } from "@chakra-ui/react";
import { FaShare, FaComment, FaThumbsUp } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { VStack } from "@chakra-ui/react";

export default function UserData() {
  const { user } = useSelector((state) => state.users);
  const [posts, setPosts] = useState([]);
  const [urls, setUrls] = useState([]);
  const dispatch = useDispatch();
  const access_token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const getPosts = async () => {
      try {
        await axios
          .get(
            `https://graph.facebook.com/v16.0/${userId}/photos/uploaded?access_token=${access_token}`
          )
          .then((res) => {
            console.log(res.data.data);
            setPosts(res.data.data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.log(error.message);
      }
    };

    getPosts();
  }, []);

  return (
    <Center>
      <VStack spacing={4}>
        {posts ? (
          posts.map((item) => (
            <Card maxW="md">
              <Image
                objectFit="cover"
                src={`https://graph.facebook.com/v16.0/
                  ${item.id}/picture?access_token=${access_token}`}
                alt="Chakra UI"
              />
              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}
              >
                <Button flex="1" variant="ghost" leftIcon={<FaThumbsUp />}>
                  Like
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<FaComment />}>
                  Comment
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<FaShare />}>
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <>
            <div>no posts available</div>
          </>
        )}
      </VStack>
    </Center>
  );
}
