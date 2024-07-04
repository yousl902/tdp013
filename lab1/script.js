let postsNumber = 0;
const postBtn = document.querySelector(".submit-button");
const mainContainer = document.querySelector(".main");
const postInput = document.getElementById("message-input");
const validationMsg = document.querySelector(".validation");
const postsContainer = document.querySelector(".messages");

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


postBtn.addEventListener("click", () => {
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
    id: postsNumber,
    content: post,
    writer: "John Doe",
    date: formattedDate, // Convert to ISO format
    read: false,
  };

  addPostToCookie(postDetails);
  const oldPosts = postsContainer.innerHTML;
  postsContainer.innerHTML =
    `
      <div class="msg-container" id=${postsNumber}>
        <div class="msg-details">
          <p class="name">John Doe</p>
          <p class="msg">${post}</p>
          <p class="date">Posted at ${formattedDate}</p>
        </div>
        <input type="checkbox" name="read" onchange="handleRead(${postsNumber}, this.checked)"/>
      </div>` + oldPosts;
  postInput.value = "";

  postsNumber++;
});


const handleRead = (postId, isChecked) => {
  const posts = JSON.parse(getCookie("posts") || "[]");
  const postIndex = posts.findIndex((post) => post.id == postId);
  const postContainer = document.getElementById(postId);
  if (isChecked) {
    // Set the message to read in the cookie
    posts[postIndex].read = true;
    setCookie("posts", JSON.stringify(posts), 365);
    // add a class to the message container
    postContainer.classList.add("read-msg");
  } else {
    posts[postIndex].read = false;
    setCookie("posts", JSON.stringify(posts), 365);
    postContainer.classList.remove("read-msg");
  }
}


const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


const checkCookie = () => {
  let user = getCookie("username");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("username", user, 365);
    }
  }
}


// Initialize the posts cookie with an empty object if it doesn't exist
const initializePostsCookie = () => {
  if (!getCookie("posts")) {
    setCookie("posts", JSON.stringify([]), 365);
  }
};


// Function to add a post to the posts cookie
const addPostToCookie = (post) => {
  initializePostsCookie();
  let posts = JSON.parse(getCookie("posts") || "[]");
  posts.push(post);
  setCookie("posts", JSON.stringify(posts), 365);
};


// Function to fetch all posts from the cookie
const fetchAllPostsFromCookie = () => {
  initializePostsCookie();
  const posts = JSON.parse(getCookie("posts") || "[]");
  const reversePosts = posts.reverse();
  reversePosts.map((item) => {
    postsContainer.innerHTML += `
      <div class="msg-container ${item.read ? 'read-msg' : ''}" id=${item.id}>
        <div class="msg-details">
          <p class="name">${item.writer}</p>
          <p class="msg">${item.content}</p>
          <p class="date">Posted at ${item.date}</p>
        </div>
        <input type="checkbox" name="read" onchange="handleRead(${item.id}, this.checked)" ${item.read? 'checked' : ''}/>
      </div>`;
    postsNumber++;
  });
};

fetchAllPostsFromCookie();
