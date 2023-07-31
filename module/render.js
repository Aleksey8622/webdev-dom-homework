import { arrayOfComments } from "./api.js";
import { disablingButton } from "./helpers.js";
import { addingLikes } from "./helpers.js";
import { enterInput } from "./helpers.js";
import { changesComments } from "./helpers.js";
import { commentЕditor } from "./helpers.js";
const list = document.querySelector(".comments");

// Функция рендер добовления в разметку
export const renderChangingMarkup = () => {
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
  list.innerHTML = arrayCommentsHtml;

  disablingButton();
  addingLikes();
  enterInput();
  commentЕditor();
  changesComments();
};
