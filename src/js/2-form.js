let formData = { email: '', message: '' };

const formEl = document.querySelector('.feedback-form');

const localDataFieldIn = form => {
  const localData = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (localData === null) {
    return;
  }
  formData = localData;
  Object.keys(localData).forEach(key => {
    formEl.elements[key].value = localData[key];
  });
};

const onInputChange = event => {
  const name = event.target.name;
  const value = event.target.value;
  formData[name] = value;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onSubmitBtn = event => {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    formEl.reset();
    formData.email = '';
    formData.message = '';
    localStorage.removeItem('feedback-form-state');
  }
};

localDataFieldIn(formEl);

formEl.addEventListener('input', onInputChange);
formEl.addEventListener('submit', onSubmitBtn);
