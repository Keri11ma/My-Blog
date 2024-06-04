document.addEventListener("DOMContentLoaded", () => {
  fetchPosts();
});

async function fetchPosts() {
  const postsContainer = document.getElementById("posts");
  const response = await fetch("/api/posts");
  const posts = await response.json();

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            <p>Author: ${post.author}</p>
        `;
    postsContainer.appendChild(postElement);
  });
}
