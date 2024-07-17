import { getUserById } from "../services/api";
import { useEffect, useState } from "react";

export default function Post({ content, writerId, date }) {
  const [user, setUser] = useState({});
  // console.log("content", content);

  useEffect(() => {
    getUserById(writerId).then((res) => {
      setUser(res);
      // console.log(res);
    });
  }, [writerId]);

  return (
    <div className="bg-[#D19FA0] rounded-lg p-5">
      <div className="flex items-center">
        <div className="">
          <p className="text-ms">{user.username}</p>
          <p className="text-sm mt-1">
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum, nisi et */}
            {/* ultricies ultricies, nunc libero tincidunt velit, nec luctus nunc risus et odio. Phasellus */}
            {/* nec enim non ante mollis fermentum. Sed nec orci nec sapien ultricies aliquam. Donec nec */}
            {/* sollicitudin lectus. Sed nec orci nec sapien ultricies aliquam. Donec nec sollicitudin */}
            {/* lectus. */}
            {content}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs">{date}</p>
      </div>
    </div>
  );
}
