import flatpickr from "flatpickr";
import iziToast from "izitoast";

let userSelectedDate = null;

function isValidDate(date) {
  return date > new Date();
}

function updateStartButtonState() {
  const startButton = document.getElementById("start-button");
  startButton.disabled = !isValidDate(userSelectedDate);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (!isValidDate(userSelectedDate)) {
      iziToast.error({ message: "Please choose a date in the future" });
    }
    updateStartButtonState();
  },
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

function updateTimerDisplay(remainingTime) {
  const daysElement = document.querySelector('[data-days]');
  const hoursElement = document.querySelector('[data-hours]');
  const minutesElement = document.querySelector('[data-minutes]');
  const secondsElement = document.querySelector('[data-seconds]');

  daysElement.textContent = addLeadingZero(remainingTime.days);
  hoursElement.textContent = addLeadingZero(remainingTime.hours);
  minutesElement.textContent = addLeadingZero(remainingTime.minutes);
  secondsElement.textContent = addLeadingZero(remainingTime.seconds);
}

document.getElementById('start-button').addEventListener('click', () => {
  const startButton = document.getElementById("start-button");
  startButton.disabled = true;
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const difference = userSelectedDate - currentTime;
    if (difference <= 0) {
      clearInterval(intervalId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({ message: "Countdown finished" });
      startButton.disabled = false;
    } else {
      const remainingTime = convertMs(difference);
      updateTimerDisplay(remainingTime);
    }
  }, 1000);
});

window.addEventListener('DOMContentLoaded', () => {
  updateStartButtonState();
});
