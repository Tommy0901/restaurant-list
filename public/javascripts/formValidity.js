const form = document.querySelector('#form-edit')

// Remove 'was-validated' when the form is cleared
form.addEventListener('reset', function onFormReset(event) {
  form.classList.remove('was-validated')
})

// Form validation
form.addEventListener('submit', function onFormSubmitted(event) {
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    form.classList.add('was-validated')
  }
})