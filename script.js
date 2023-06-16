"use strict";
const button = document.querySelectorAll('button');
const list = document.querySelectorAll('ul');
const inputName = document.querySelectorAll('.add-form-name');
const inputComments = document.querySelectorAll('.add-form-text');
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
    if (inputName[0].value && inputComments[0].value) {
        button[2].disabled = false;

    } else {
        button[2].disabled = true;
    }

}
disablingButton();




button[2].addEventListener('click', () => {

    inputName[0].classList.remove('error')
    if (inputName[0].value === '') {
        inputName[0].classList.add('error')
    }
    inputComments[0].classList.remove('error')
    if (inputComments[0].value === '') {
        inputComments[0].classList.add('error')
        return;
    }

    const theWholeList = list[0].innerHTML;

    list[0].innerHTML = theWholeList + `<ul class="comments">
    <li class="comment">
      <div class="comment-header">
        <div>${inputName[0].value}</div>
        <div>${currentDate(new Date())}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${inputComments[0].value}
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
    inputName[0].value = '';
    inputComments[0].value = '';
    button[2].disabled = true;
})

inputName[0].addEventListener('input', disablingButton);
inputComments[0].addEventListener('input', disablingButton);
