import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const onFormSubmit = e => {
  e.preventDefault();
  const delay = e.currentTarget.elements.delay.value;
  const promiseRes = e.currentTarget.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseRes === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else if (promiseRes === 'rejected') {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  promise
    .then(value => {
      iziToast.show({
        message: value,
        color: 'green',
        position: 'topRight',
      });
    })
    .catch(value => {
      iziToast.show({
        message: value,
        color: 'red',
        position: 'topRight',
      });
    });
};

form.addEventListener('submit', onFormSubmit);
