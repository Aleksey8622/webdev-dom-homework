"use strict";

export { button }
export { inputName }
export { inputComments }
export { list }
export { textElementsLoad }
export { loadingElements }
export { formElements }
import { addedComments } from "./api.js";
import { arrayOfComments } from "./api.js"
import { renderChangingMarkup } from "./render.js";
import { addTodo } from "./api.js";
import { disablingButton } from "./function.js";
import { commentЕditor } from "./function.js";
import { enterInput } from "./function.js";
import { addingLikes } from "./function.js";
import { changesComments } from "./function.js";
import { sedingsServer } from "./api.js"
import { addTodoError } from "./api.js";
const list = document.querySelector('.comments');
const button = document.querySelector('.add-form-button');
const buttonTwo = document.querySelector('.add-form-button-two');
const inputName = document.querySelector('.add-form-name');
const inputComments = document.querySelector('.add-form-text');
const formElements = document.querySelector(".add-form");
const loadingElements = document.querySelector('.loading-add')
const textElementsLoad = document.querySelector(".text-load");
textElementsLoad.style.display = "block"



// Функция счетчик лайков
addingLikes();
// Функция редоктирования комментария
changesComments();


// Функция рендер добовления в разметку
renderChangingMarkup({ arrayOfComments, disablingButton, addingLikes, enterInput, commentЕditor, changesComments });


// Функция GET запроса в API
addedComments();


// Обработчик клика на кнопку написать комментарий
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

  // Реализована логика с помощью метода trim()
  // Не добовляет комментарий только с пробелами
  if (inputName.value === " ") {
    return inputName.value.trim();

  }
  if (inputComments.value === " ") {
    return inputComments.value.trim();
  }
  sedingsServer();

})



// Клик на кнопку удаление комментариев 
buttonTwo.addEventListener('click', () => {

  arrayOfComments.splice(arrayOfComments.length - 1, 1)
  renderChangingMarkup({ arrayOfComments, disablingButton, enterInput, commentЕditor, changesComments, addingLikes });
})

inputName.addEventListener('input', disablingButton);
inputComments.addEventListener('input', disablingButton);

