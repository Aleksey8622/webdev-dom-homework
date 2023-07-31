"use strict";
import { addedComments } from "./api.js";
import { disablingButton } from "./helpers.js";
import { sedingsServer } from "./api.js";
import { arrayOfComments } from "./api.js";
import { renderChangingMarkup } from "./render.js";
const button = document.querySelector(".add-form-button");
const buttonTwo = document.querySelector(".add-form-button-two");
const inputName = document.querySelector(".add-form-name");
const inputComments = document.querySelector(".add-form-text");
const textElementsLoad = document.querySelector(".text-load");
textElementsLoad.style.display = "block";


addedComments();

// Обработчик клика на кнопку написать комментарий
button.addEventListener("click", () => {
  inputName.classList.remove("error");
  if (inputName.value === "") {
    inputName.classList.add("error");
  }
  inputComments.classList.remove("error");
  if (inputComments.value === "") {
    inputComments.classList.add("error");
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
});

// Клик на кнопку удаление комментариев
buttonTwo.addEventListener("click", () => {
  arrayOfComments.splice(arrayOfComments.length - 1, 1);
  renderChangingMarkup();
});

inputName.addEventListener("input", disablingButton);
inputComments.addEventListener("input", disablingButton);
