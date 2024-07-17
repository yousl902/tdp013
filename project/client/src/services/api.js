const baseUrl = "http://localhost:5080";
const token = localStorage.getItem("token");

export async function login(password, username) {
  const res = await fetch(`${baseUrl}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  return res;
}

export async function signup(username, password) {
  const res = await fetch(`${baseUrl}/api/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  return res;
}

export async function post(post) {
  try {
    const res = await fetch(`${baseUrl}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
}

export async function getPosts() {
  try {
    const res = await fetch(`${baseUrl}/api/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    const reversedData = data.reverse();
    console.log("reverse", reversedData);
    return reversedData;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getUserById(id) {
  try {
    // debugger
    const res = await fetch(`${baseUrl}/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const user = await res.json();
    return user;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getUser() {
  try {
    // debugger
    const res = await fetch(`${baseUrl}/api/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const user = await res.json();
    return user;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function searchUsers(prefix) {
  try {
    console.log("prefix", prefix);
    const res = await fetch(`${baseUrl}/api/users/search/${prefix}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const users = await res.json();
    console.log("users", users);
    return users;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getPostsByUserId(id) {
  try {
    const res = await fetch(`${baseUrl}/api/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const posts = await res.json();
    return posts;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function addFriend(id) {
  try {
    const res = await fetch(`${baseUrl}/api/users/add/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
