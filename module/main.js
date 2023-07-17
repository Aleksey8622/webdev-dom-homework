"use strict";

export { button }
export { inputName }
export { inputComments }
export { list }
export { textElementsLoad }
export { loadingElements }
export { formElements }
import { addedComments } from "./api.js";
import { initListeners } from "./listeners.js";
const list = document.querySelector('.comments');
const button = document.querySelector('.add-form-button');
const buttonTwo = document.querySelector('.add-form-button-two');
const inputName = document.querySelector('.add-form-name');
const inputComments = document.querySelector('.add-form-text');
const formElements = document.querySelector(".add-form");
const loadingElements = document.querySelector('.loading-add')
const textElementsLoad = document.querySelector(".text-load");
textElementsLoad.style.display = "block"

// Функция GET запроса в API
addedComments();
initListeners({ button, buttonTwo });



