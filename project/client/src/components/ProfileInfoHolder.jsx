import { useState } from "react";
import { addFriend } from "../services/api";
// import background from ".../public/background.png";

export default function ProfileInfoHolder({ changeButton, choosen, user, currentUserId }) {
  const postsColor = choosen === "Posts" ? "bg-[#A96467]" : "bg-red-800";
  const friendsColor = choosen === "Friends" ? "bg-[#A96467]" : "bg-red-800";

  const handleAddFriend = async () => {
    await addFriend(user._id);
  };

  return (
    <div className="flex flex-col w-screen h-44 bg-red-300 rounded-b-2xl md:w-2/4 md:mx-auto">
      <div className="flex items-center ml-5 mt-3 justify-between">
        <div className="flex items-center ml-5 mt-3">
          <img src="placeholder-image.png" className="size-20 rounded-full" />
          <div className="text-xs ml-3">
            <b>
              <p>{user.username}</p>
            </b>
            <p>
              {user.name} has <b>{user.friends.length}</b> friends
            </p>
          </div>
        </div>
        <div>
          {currentUserId !== user._id && !user.friends.includes(currentUserId) && (
            <button onClick={handleAddFriend} className="mr-5 bg-red-700 w-28 h-10 rounded-sm">
              Add Friend
            </button>
          )}
        </div>
      </div>
      <div className="mt-auto mx-auto space-x-0.5">
        <button
          onClick={changeButton}
          className={`rounded-tl-lg w-28 h-14 hover:bg-red-500 ` + friendsColor}
        >
          Friends
        </button>
        <button
          onClick={changeButton}
          className={`rounded-tr-lg w-28 h-14 hover:bg-red-500 ` + postsColor}
        >
          Posts
        </button>
      </div>
    </div>
  );
}
