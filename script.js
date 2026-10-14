function addValidation(formId, resultId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    if (password && confirmPassword) {
      if (confirmPassword.value !== password.value || confirmPassword.value === '') {
        confirmPassword.setCustomValidity('Passwords do not match');
      } else {
        confirmPassword.setCustomValidity('');
      }
    }

    let valid = true;
    const fields = form.querySelectorAll('input:not([type=radio]):not([type=checkbox]), textarea, select');

    fields.forEach(function (field) {
      field.classList.remove('is-valid', 'is-invalid');
      if (field.checkValidity()) {
        field.classList.add('is-valid');
      } else {
        field.classList.add('is-invalid');
        valid = false;
      }
    });

    const radios = form.querySelectorAll('input[type=radio][name=gender]');
    if (radios.length > 0) {
      const selected = form.querySelector('input[name=gender]:checked');
      const genderError = document.getElementById('genderError');
      if (!selected) {
        valid = false;
        genderError.style.display = 'block';
      } else {
        genderError.style.display = 'none';
      }
    }

    const result = document.getElementById(resultId);
    if (valid) {
      result.textContent = 'Your form is valid.';
      result.style.color = '#15803d';
    } else {
      result.textContent = 'Please check the highlighted fields.';
      result.style.color = '#b91c1c';
    }
  });

  form.addEventListener('reset', function () {
    setTimeout(function () {
      form.querySelectorAll('.is-valid, .is-invalid').forEach(function (field) {
        field.classList.remove('is-valid', 'is-invalid');
      });
      const result = document.getElementById(resultId);
      if (result) result.textContent = '';
      const genderError = document.getElementById('genderError');
      if (genderError) genderError.style.display = 'none';
    }, 0);
  });
}

addValidation('contactForm', 'contactResult');
addValidation('registerForm', 'registerResult');
