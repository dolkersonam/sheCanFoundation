const form = document.getElementById('auth-form');
const toggleLink = document.getElementById('toggle-link');
const toggleMessage = document.getElementById('toggle-message');
const formTitle = document.getElementById('form-title');
const message = document.getElementById('message');

let isSignup = true;
const users = new Map(); 

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  if (isSignup) {
    if (users.has(username)) {
      message.textContent = 'User already exists.';
      message.style.color = 'red';
    } else {
      users.set(username, password);
      message.textContent = 'Signup successful!';
      message.style.color = 'green';
    }
  } else {
    if (users.get(username) === password) {
      message.textContent = `Welcome back, ${username}!`;
      message.style.color = 'green';
    } else {
      message.textContent = 'Invalid credentials.';
      message.style.color = 'red';
    }
  }

  form.reset();
});

toggleLink.addEventListener('click', (e) => {
  e.preventDefault();
  isSignup = !isSignup;

  formTitle.textContent = isSignup ? 'Sign Up' : 'Sign In';
  toggleMessage.innerHTML = isSignup
    ? 'Already have an account? <a href="#" id="toggle-link">Sign In</a>'
    : "Don't have an account? <a href=\"#\" id=\"toggle-link\">Sign Up</a>";

  document.getElementById('toggle-link').addEventListener('click', toggleLinkClick);
});

const toggleLinkClick = (e) => toggleLink.dispatchEvent(new Event('click'));
