import { textElementsLoad } from "./main.js";
import { loadingElements } from "./main.js";
import { formElements } from "./main.js";
import { inputName } from "./main.js"
import { inputComments } from "./main.js"
import { renderChangingMarkup } from "./render.js";
import { disablingButton } from "./helpers.js";
import { enterInput } from "./helpers.js";
import { addingLikes } from "./helpers.js";
import { commentЕditor } from "./helpers.js";
import { changesComments } from "./helpers.js";
import { currentDate } from "./date.js";
import { button } from "./main.js"
export { arrayOfComments }



// Массив объектов сохранен на сервере и данные приходят с сервера через API
let arrayOfComments = [
  // {
  //   name: 'Глеб Фокин',
  //   time: '12.02.22 12:18',
  //   comment: 'Это будет первый комментарий на этой странице',
  //   likes: 3,
  //   islover: false,
  //   isEdit: true,
  // },

  // {
  //   name: 'Варвара Н.',
  //   time: '13.02.22 19:22',
  //   comment: 'Мне нравится как оформлена эта страница! ❤',
  //   likes: 75,
  //   islover: false,
  //   isEdit: true,
  // }
];

export const addedComments = () => {

  return fetch("https://wedev-api.sky.pro/api/v1/Aleksey-Rudnev/comments", {
    method: "GET"
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      textElementsLoad.style.display = "none"
      return response
    })

    .then((responseCommets) => {

      const massComments = responseCommets.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: currentDate(new Date(comment.date)),
          text: comment.text,
          likes: comment.likes,
          islover: false,
          isEdit: false,
        };
      })

      arrayOfComments = massComments;
      renderChangingMarkup({ arrayOfComments, disablingButton, enterInput, addingLikes, commentЕditor, changesComments })
      console.log(arrayOfComments);
    })
    .catch((error) => {
      alert("Кажется, у вас сломался интернет")
      console.log(error);
    })
};



// Отдельная функция на POST запрос в API
export const addTodo = (name, text) => {
  return fetch("https://wedev-api.sky.pro/api/v1/Aleksey-Rudnev/comments", {

    method: "POST",
    body: JSON.stringify({
      text: text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      name: name
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
      forceError: true
    })
  })
}




// Метод fetch() запрос через API на добовление данных c сохранением на сервере комментарий в списке
export const sedingsServer = () => {

  loadingElements.style.display = 'block';
  formElements.style.display = 'none'
  const name = inputName.value;
  const text = inputComments.value;

  // Функция AddTodo отдельно для передачи POST запроса
  addTodo(name, text).then((response) => {
    return response
  })
    // Создан отдельный then для реализации логики if/else и передачи исключений методом throw new Error() отлавливаем ошибки в catch()
    .then((responseData) => {
      if (responseData.status === 201) {
        return responseData.json()
      } else if (responseData.status === 400) {
        throw new Error("Не верный ввод")
      } else if (responseData.status === 500) {
        console.log(responseData.status);
        throw new Error("Сломался сервер")
      } else {
        throw new Error("Не работает интернет")
      }
    })
    .then(() => {
      return addedComments()// Вызов повторно метод GET в методе POST для того что бы добавлялся комментарий
    })
    .then(() => {
      button.disabled = true;
      inputName.value = '';
      inputComments.value = '';
      loadingElements.style.display = 'none';
      formElements.style.display = 'flex'
    })
    .catch((error) => {
      loadingElements.style.display = 'block';
      formElements.style.display = 'none'
      if (error.message === "Не верный ввод") {
        loadingElements.style.display = 'none';
        formElements.style.display = 'flex'
        alert("Имя и комментарий должны быть не короче 3 символов")
      } else if (error.message === "Сломался сервер") {
        addTodoError()
        // alert("Сервер сломался, попробуй позже")
      } else {
        loadingElements.style.display = 'none';
        formElements.style.display = 'flex'
        alert("Кажется, у вас сломался интернет, попробуйте позже")
      }
    })

}


// Функция повторного отправления запроса при 500 ошибки API
export function addTodoError() {
  addTodo(inputName.value, inputComments.value).then((response) => {
    return response
  })// Создан отдельный then для реализации логики if/else и передачи исключений методом throw new Error() отлавливаем ошибки в catch()
    .then((responseData) => {
      console.log(responseData);
      if (responseData.status === 500) {
        throw new Error("Сломался сервер")

      } else {
        return responseData.json()
      }
    })
    .then(() => {
      return addedComments();
    })
    .then(() => {
      button.disabled = true;
      inputName.value = '';
      inputComments.value = '';
      loadingElements.style.display = 'none';
      formElements.style.display = 'flex'
    })
    .catch((error) => {
      alert("Кажется, что на сервере проблемы делаем повторный запрос!!!!!!!!!")
      loadingElements.style.display = 'block';
      formElements.style.display = 'none'
      addTodoError()
    })
}