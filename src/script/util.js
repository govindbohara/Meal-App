const error = document.querySelector('.error');
// eslint-disable-next-line import/prefer-default-export
export const showError = (message) => {
error.classList.add('visible');

error.innerText = message
setTimeout(() => {
    error.classList.remove('visible')
}, 3000)

}