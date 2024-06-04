document.getElementById('post-form').addEventListener('submit', createPost);

async function createPost(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const token = localStorage.getItem('token');

    const result = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        alert('Post created successfully');
        window.location.href = '/';
    } else {
        alert(result.error);
    }
}
