import { arrayOfComments } from "./main.js"
import { button } from "./main.js"
import { inputName } from "./main.js"
import { inputComments } from "./main.js"

// Функция валидация
export const disablingButton = () => {
    if (inputName.value && inputComments.value) {
        button.disabled = false;

    } else {
        button.disabled = true;
    }

}

// Функция ответа на комментария
export const commentЕditor = () => {

    const commentBodyElements = document.querySelectorAll('.comment');

    for (const commentBodyElement of commentBodyElements) {

        commentBodyElement.addEventListener('click', () => {


            const index = commentBodyElement.dataset.delete

            inputComments.value = `${arrayOfComments[index].text + ' ' + arrayOfComments[index].name + ':'}`;

        })

    }

}