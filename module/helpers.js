import { arrayOfComments } from "./api.js"
import { button } from "./main.js"
import { inputName } from "./main.js"
import { inputComments } from "./main.js"
import { renderChangingMarkup } from "./render.js"

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

// Функция добовления комментария на кнопку Enter
export const enterInput = () => {
    document.addEventListener('keyup', event => {
        if (event.key === 'Enter')
            document.querySelector('.add-form-row .add-form-button').click();
    })
};


// Функция счетчик лайков
export const addingLikes = () => {

    const buttonElemets = document.querySelectorAll('.like-button');

    for (const buttonElemet of buttonElemets) {
        const index = buttonElemet.dataset.index;
        buttonElemet.addEventListener('click', (event) => {
            event.stopPropagation();

            if (arrayOfComments[index].islover) {
                arrayOfComments[index].likes -= 1
                arrayOfComments[index].islover = false;

            } else {
                arrayOfComments[index].likes += 1
                arrayOfComments[index].islover = true;
            }
            renderChangingMarkup({ arrayOfComments, disablingButton, enterInput, addingLikes, commentЕditor, changesComments })
        })

    }

}


// Функция редоктирования комментария
export const changesComments = () => {

    const buttonEditors = document.querySelectorAll('.add-form-button-three');


    for (const buttonEditor of buttonEditors) {

        buttonEditor.addEventListener('click', (event) => {
            event.stopPropagation();

            const index = buttonEditor.dataset.edit

            if (arrayOfComments[index].isEdit) {
                arrayOfComments[index].text = buttonEditor.closest('.comment').querySelector('textarea').value
                arrayOfComments[index].isEdit = false

            } else {
                arrayOfComments[index].isEdit = true
            }

            renderChangingMarkup({ arrayOfComments, disablingButton, enterInput, commentЕditor, changesComments, addingLikes });
        })

    }
}