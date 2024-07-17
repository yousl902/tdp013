import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import ProfileInfoHolder from "../components/ProfileInfoHolder";
import FriendsList from "../components/FriendsList";
import PostsList from "../components/PostsList";
import { post, getUser, getUserById, getPostsByUserId } from "../services/api";

const HomePage = () => {
  const [choosen, setChoosen] = useState("Posts");
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [userOfPage, setUserOfPage] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [friendsOfPage, setFriendsOfPage] = useState([]);
  const [currentUserFriends, setCurrentUserFriends] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
    }
  }, []);

  const handleChoose = (e) => {
    setChoosen(e.target.textContent);
  };

  const handlePost = () => {
    const postText = document.querySelector("textarea").value;
    const onPage = window.location.pathname.split("/")[1] || currentUser._id;
    console.log("onPage:", onPage);
    post({
      content: postText,
      onPage: onPage,
    });
    document.querySelector("textarea").value = "";
    const fetchData = async () => {
      const posts = await getPostsByUserId(onPage);
      setPosts(posts.reverse());
    };
    fetchData();
  };

  const handleAddFriend = () => {
    console.log("add friend");
  };

  const handleMessage = () => {
    console.log("message");
  };

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getUser();
      setCurrentUser(currentUser);
      
      const userId = window.location.pathname.split("/")[1] || currentUser._id;
      const currentUserFriends = await Promise.all(
        currentUser.friends.map(async (friendId) => {
          return await getUserById(friendId);
        }),
      );

      if (!userId || userId === "home") {
        setFriendsOfPage(currentUserFriends);
        setUserOfPage(currentUser);
      } else {
        const user = await getUserById(userId);
        setUserOfPage(user);
        const userFriends = await Promise.all(
          user.friends.map(async (friendId) => {
            return await getUserById(friendId);
          }),
        );
        setFriendsOfPage(userFriends);
      }
      const posts = await getPostsByUserId(userId);
      setPosts(posts.reverse());
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="w-screen h-screen flex justify-center items-center">Loading...</div>;
  }
  return (
    <div>
      <Navbar username={currentUser.username} />
      <ProfileInfoHolder
        changeButton={handleChoose}
        choosen={choosen}
        user={userOfPage}
        currentUserId={currentUser._id}
      />
      <div className="h-full min-h-screen w-screen md:w-2/4 md:mx-auto rounded-t-lg bg-[#A96467] p-5 space-y-5">
        {choosen === "Posts" && (
          <PostsList posts={posts} handlePost={handlePost} />
        )}
        {choosen === "Friends" && (
          <FriendsList currentUser={currentUser} friendsOfPage={friendsOfPage} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
