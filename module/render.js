import { arrayOfComments, sedingsServer } from "./api.js";
import { disablingButton } from "./helpers.js";
import { addingLikes } from "./helpers.js";
import { enterInput } from "./helpers.js";
import { changesComments } from "./helpers.js";
import { commentЕditor } from "./helpers.js";

const list = document.querySelector(".comments");

// Функция рендер добовления в разметку
export const renderChangingMarkup = () => {
  const appElement = document.querySelector("#app");
  const arrayCommentsHtml = arrayOfComments
    .map((item, index) => {
      return `<ul class="comments">
      <li class="comment" data-delete="${index}">
        <div class="comment-header">
          <div>${item.name}</div>
          <div>${item.date}</div>
        </div>
        <div class="comment-body" data-edit="${index}">
        ${
          item.isEdit
            ? `<textarea type="textarea" class='add-form-text' rows="4">${item.text}</textarea>`
            : `<div class="comment-text data-div=${index}">
          ${item.text}
        </div>`
        }
        </div>
        <button data-edit="${index}" class="add-form-button-three ">${
        item.isEdit ? "Сохранить" : "Редактировать"
      }</button>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${item.likes}</span>
            <button class="like-button ${
              item.islover ? "-active-like" : ""
            }" data-index="${index}"></button>
          </div>
        </div>
      </li>
    </ul>`;
    })
    .join("");

  const appHtml = ` <div class="container">
    <div class="text-load">
      <p>Обновление ленты комментариев пожалуйста подождите!</p>
    </div>
    <ul class="comments">
      <!-- Список рендериться из Java Script -->
      ${arrayCommentsHtml}
    </ul>
    <br />
    <div style="display: none; color: rgb(255, 255, 255)" class="loading-add">
      <p>Комментарий добовляется</p>
    </div>
    <div class="add-form">
      <input
        type="text"
        class="add-form-name"
        placeholder="Введите ваше имя"
      />
      <textarea
        id="text"
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button class="add-form-button">Написать</button>
        <button class="add-form-button-two">Удалить</button>
      </div>
    </div>
  </div>`;
  appElement.innerHTML = appHtml;

  disablingButton();
  addingLikes();
  enterInput();
  commentЕditor();
  changesComments();

  const button = document.querySelector(".add-form-button");
  const buttonTwo = document.querySelector(".add-form-button-two");
  const inputName = document.querySelector(".add-form-name");
  const inputComments = document.querySelector(".add-form-text");

  button.addEventListener("click", () => {
    console.log(1);
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

  buttonTwo.addEventListener("click", () => {
    arrayOfComments.splice(arrayOfComments.length - 1, 1);
    renderChangingMarkup();
  });

  inputName.addEventListener("input", disablingButton);
  inputComments.addEventListener("input", disablingButton);
};
