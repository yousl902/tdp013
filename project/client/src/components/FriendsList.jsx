const FriendsList = ({ currentUser, friendsOfPage }) => {
  return (
    <>
      {friendsOfPage.length === 0 ? (
        <div className="bg-red-500 w-full h-20 rounded-xl">
          <div className="py-3 flex justify-center">
            <div className="py-4">No friends were found</div>
          </div>
        </div>
      ) : (
        friendsOfPage.map((friend) => {
          return (
            <div key={friend._id} className="bg-red-500 w-full h-20 rounded-xl">
              <div className="ml-3 py-3 flex">
                <img src="placeholder-image.png" className="size-14 rounded-full" />
                <div className="py-4 ml-1">{friend.username}</div>
                {currentUser._id !== friend._id &&
                  (currentUser.friends.includes(friend._id) ? (
                    <button className="bg-red-800 rounded-lg w-28 h-8 hover:bg-red-500 my-auto ml-auto mr-5">
                      Message
                    </button>
                  ) : (
                    <button className="bg-red-800 rounded-lg w-28 h-8 hover:bg-red-500 my-auto ml-auto mr-5">
                      Add Friend
                    </button>
                  ))}
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default FriendsList;
