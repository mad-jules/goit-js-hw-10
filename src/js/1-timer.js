function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => String(value).padStart(2, '0');

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < Date.now()) {
      startBtn.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        color: 'red',
        position: 'topRight',
        icon: 'ico-warning',
      });
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDate;
    }
  },
};

flatpickr(inputEl, options);

const onClickStartBtn = e => {
  const timer = {
    deadline: userSelectedDate,
    intervalId: null,
    refs: {
      days: document.querySelector('[data-days]'),
      hours: document.querySelector('[data-hours]'),
      minutes: document.querySelector('[data-minutes]'),
      seconds: document.querySelector('[data-seconds]'),
    },

    start() {
      this.intervalId = setInterval(() => {
        const diff = this.deadline - Date.now();

        if (diff <= 0) {
          this.stop();
          return;
        }

        startBtn.disabled = true;
        inputEl.disabled = true;

        const { days, hours, minutes, seconds } = convertMs(diff);

        this.refs.days.textContent = addLeadingZero(days);
        this.refs.hours.textContent = addLeadingZero(hours);
        this.refs.minutes.textContent = addLeadingZero(minutes);
        this.refs.seconds.textContent = addLeadingZero(seconds);
      }, 1000);
      startBtn.removeEventListener('click', onClickStartBtn);
    },
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;

      iziToast.show({
        message: 'Time is up!',
        color: 'blue',
        position: 'topRight',
      });

      inputEl.disabled = false;
      startBtn.addEventListener('click', onClickStartBtn);
    },
  };
  timer.start();
};

startBtn.addEventListener('click', onClickStartBtn);
