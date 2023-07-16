import { arrayOfComments } from "./api.js"
import { renderChangingMarkup } from "./render.js"
import { disablingButton } from "./helpers.js"
import { enterInput } from "./helpers.js"
import { commentЕditor } from "./helpers.js"
import { changesComments } from "./helpers.js"
import { addingLikes } from "./helpers.js"
import { inputName } from "./main.js"
import { inputComments } from "./main.js"
import { sedingsServer } from "./api.js"

export function initListeners({ button, buttonTwo }) {
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
}

