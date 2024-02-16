import iziToast from "izitoast";

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    if (state === "fulfilled") {
      setTimeout(() => {
        resolve(delay);
      }, delay);
    } else {
      setTimeout(() => {
        reject(delay);
      }, delay);
    }
  });
}

document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault();

  const delay = parseInt(this.elements.delay.value);
  const state = this.elements.state.value;

  createPromise(delay, state)
    .then((delay) => {
      iziToast.success({ message: `✅ Fulfilled promise in ${delay}ms` });
    })
    .catch((delay) => {
      iziToast.error({ message: `❌ Rejected promise in ${delay}ms` });
    });
});
