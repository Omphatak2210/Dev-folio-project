const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const statusText = document.getElementById('form-status');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(input, message) {
  input.classList.add('is-invalid');
  document.getElementById(input.id + '-error').textContent = message;
}

function clearError(input) {
  input.classList.remove('is-invalid');
  document.getElementById(input.id + '-error').textContent = '';
}

function validateForm() {
  let valid = true;

  [nameInput, emailInput, messageInput].forEach(clearError);

  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Please enter your name.');
    valid = false;
  }

  const email = emailInput.value.trim();
  if (email === '') {
    showError(emailInput, 'Please enter your email address.');
    valid = false;
  } else if (!emailPattern.test(email)) {
    showError(emailInput, 'Enter a valid email, like name@example.com.');
    valid = false;
  }

  if (messageInput.value.trim().length < 10) {
    showError(messageInput, 'Your message must be at least 10 characters long.');
    valid = false;
  }

  return valid;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  statusText.textContent = '';

     if (validateForm()) {
     console.log('Form submitted successfully!');
     console.log({
       name: nameInput.value.trim(),
       email: emailInput.value.trim(),
       message: messageInput.value.trim()
     });
     statusText.textContent = 'Thanks, your message was sent.';
     form.reset();
      }
});

// Remove the error as soon as the person starts correcting the field
[nameInput, emailInput, messageInput].forEach((input) => {
  input.addEventListener('input', () => clearError(input));
});
