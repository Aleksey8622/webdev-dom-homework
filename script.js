"use strict";
const button = document.querySelector('.add-form-button');
const list = document.querySelector('.comments');
const inputName = document.querySelector('.add-form-name');
const inputComments = document.querySelector('.add-form-text');

const currentDate = (data) => {

  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  let day = data.getDate();
  let month = months[data.getMonth()];
  let year = data.getFullYear();
  let hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
  let minuts = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
  let conclusion = `${day}.${month}.${year} ${hour}:${minuts}`;
  return conclusion;
}
// const data = new Date();

const disablingButton = () => {
  if (inputName.value && inputComments.value) {
    button.disabled = false;

  } else {
    button.disabled = true;
  }

}
disablingButton();




button.addEventListener('click', () => {

  inputName.classList.remove('error')
  if (inputName.value === '') {
    inputName.classList.add('error')
  }
  inputComments.classList.remove('error')
  if (inputComments.value === '') {
    inputComments.classList.add('error')
    return;
  }

  const theWholeList = list.innerHTML;

  list.innerHTML = theWholeList + `<ul class="comments">
    <li class="comment">
      <div class="comment-header">
        <div>${inputName.value}</div>
        <div>${currentDate(new Date())}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${inputComments.value}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">0</span>
          <button class="like-button"></button>
        </div>
      </div>
    </li>
  </ul>`
  inputName.value = '';
  inputComments.value = '';
  button.disabled = true;
})

inputName.addEventListener('input', disablingButton);
inputComments.addEventListener('input', disablingButton);
