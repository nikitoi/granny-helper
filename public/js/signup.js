/**
 * Выдает ошибку при неверной регистрации
 * @param {HTMLFormElement} signupForm Форма регистрации
 */
function failSignup(signupForm) {
  signupForm.username.setCustomValidity('Такой пользователь уже существует или логин бабушки указан неверно');
  signupForm.username.reportValidity();
}

document.forms.signupForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { method, action } = event.target;
  let response;
  try {
    response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
        status: event.target.status.value,
        granny: event.target.granny.value,
      }),
    });
  } catch (err) {
    return failSignup(event.target);
  }
  if (response.status !== 200) {
    return failSignup(event.target);
  }
  return window.location.assign('/private');
});

// Очищаем кастомные сообщения об ошибках при новом вводе
if (document.forms.signupForm) {
  [
    document.forms.signupForm.username,
    document.forms.signupForm.email,
    document.forms.signupForm.password,
  ].forEach((input) => input.addEventListener('input', (event) => {
    event.target.setCustomValidity('');
    event.target.checkValidity();
  }));
}
