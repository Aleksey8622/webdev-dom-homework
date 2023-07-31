import { arrayOfComments } from "./api.js";
import { renderChangingMarkup } from "./render.js";

const inputName = document.querySelector(".add-form-name");
const inputComments = document.querySelector(".add-form-text");
const button = document.querySelector(".add-form-button");

// Функция отображения корректного времени в комментариях
export const currentDate = (data) => {
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let day = data.getDate();
  let month = months[data.getMonth()];
  let year = data.getFullYear();
  let hour = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
  let minuts =
    data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
  let conclusion = `${day}.${month}.${year} ${hour}:${minuts}`;
  return conclusion;
};

// Функция валидация
export const disablingButton = () => {
  if (inputName.value && inputComments.value) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
};

// Функция счетчик лайков
export const addingLikes = () => {
  const buttonElemets = document.querySelectorAll(".like-button");

  for (const buttonElemet of buttonElemets) {
    const index = buttonElemet.dataset.index;
    buttonElemet.addEventListener("click", (event) => {
      event.stopPropagation();

      if (arrayOfComments[index].islover) {
        arrayOfComments[index].likes -= 1;
        arrayOfComments[index].islover = false;
      } else {
        arrayOfComments[index].likes += 1;
        arrayOfComments[index].islover = true;
      }
      renderChangingMarkup();
    });
  }
};

// Функция добовления комментария на кнопку Enter
export const enterInput = () => {
    document.addEventListener("keyup", (event) => {
      if (event.key === "Enter")
        document.querySelector(".add-form-row .add-form-button").click();
    });
  };

  // Функция редоктирования комментария
export const changesComments = () => {
    const buttonEditors = document.querySelectorAll(".add-form-button-three");
  
    for (const buttonEditor of buttonEditors) {
      buttonEditor.addEventListener("click", (event) => {
        event.stopPropagation();
  
        const index = buttonEditor.dataset.edit;
  
        if (arrayOfComments[index].isEdit) {
          arrayOfComments[index].text = buttonEditor
            .closest(".comment")
            .querySelector("textarea").value;
          arrayOfComments[index].isEdit = false;
        } else {
          arrayOfComments[index].isEdit = true;
        }
  
        renderChangingMarkup();
      });
    }
  };


  // Функция ответа на комментария
export const commentЕditor = () => {
    const commentBodyElements = document.querySelectorAll(".comment");
  
    for (const commentBodyElement of commentBodyElements) {
      commentBodyElement.addEventListener("click", () => {
        const index = commentBodyElement.dataset.delete;
  
        inputComments.value = `${
          arrayOfComments[index].text + " " + arrayOfComments[index].name + ":"
        }`;
      });
    }
  };
