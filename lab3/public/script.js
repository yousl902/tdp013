const baseUrl = "http://localhost:3000";
const postBtn = document.querySelector(".submit-button");
const mainContainer = document.querySelector(".main");
const postInput = document.getElementById("message-input");
const validationMsg = document.querySelector(".validation");
const postsContainer = document.querySelector(".messages");
const img = document.querySelector("img");

fetch("https://api.thecatapi.com/v1/images/search")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    img.src = data[0].url;
  });

postBtn.disabled = true;

postInput.addEventListener("input", () => {
  if (postInput.value.length > 0 && postInput.value.length < 140) {
    postBtn.disabled = false;
    validationMsg.style.display = "none";
  } else if (postInput.value.length > 140) {
    validationMsg.textContent = "Meddelandet får innehålla högst 140 tecken!";
    validationMsg.style.display = "block";
    postBtn.disabled = true;
  } else {
    postBtn.disabled = true;
    validationMsg.textContent = "Write something before posting!";
    validationMsg.style.display = "block";
  }
});

postBtn.addEventListener("click", async () => {
  event.preventDefault(); // Prevent the default behavior (page refresh) of the button click event

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
  const post = postInput.value;

  const postDetails = {
    content: post,
    writer: "John Doe",
    date: formattedDate, // Convert to ISO format
    read: false,
  };

  const postId = await addPost(postDetails);
  console.log(postId);
  const oldPosts = postsContainer.innerHTML;
  postsContainer.innerHTML =
    `
      <div class="msg-container" id=${postId}>
        <div class="msg-details">
          <p class="name">John Doe</p>
          <p class="msg">${post}</p>
          <p class="date">Posted at ${formattedDate}</p>
        </div>
        <input type="checkbox" name="read" onchange="handleRead('${postId}', this.checked)"/>
      </div>` + oldPosts;
  postInput.value = "";
});

const handleRead = async (postId, isChecked) => {
  console.log(postId, isChecked);
  const res = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isRead: isChecked }),
  });
  if (res.ok) {
    const postContainer = document.getElementById(postId);
    if (isChecked) {
      postContainer.classList.add("read-msg");
    } else {
      postContainer.classList.remove("read-msg");
    }
  }
};

const addPost = async (post) => {
  try {
    const res = await fetch(`${baseUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data.id;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getPosts = async () => {
  try {
    const res = await fetch(`${baseUrl}/posts`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const reversedData = data.reverse();
    reversedData.forEach((post) => {
      console.log(post);
      postsContainer.innerHTML += `
        <div class="msg-container ${post.isRead ? "read-msg" : ""}" id=${post._id}>
          <div class="msg-details">
            <p class="name">${post.writer}</p>
            <p class="msg">${post.content}</p>
            <p class="date">Posted at ${post.date}</p>
          </div>
          <input type="checkbox" name="read" onchange="handleRead('${post._id}', this.checked)" ${post.isRead ? "checked" : ""}/>
        </div>`;
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

getPosts();
