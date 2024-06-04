document.getElementById('register-form').addEventListener('submit', registerUser);
document.getElementById('login-form').addEventListener('submit', loginUser);

async function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        alert('Registration successful');
        window.location.href = '/login.html';
    } else {
        alert(result.error);
    }
}

async function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then((res) => res.json());

    if (result.status === 'ok') {
        localStorage.setItem('token', result.token);
        alert('Login successful');
        window.location.href = '/';
    } else {
        alert(result.error);
    }
}
