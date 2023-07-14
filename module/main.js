"use strict";
export { arrayOfComments }
export { button }
export { inputName }
export { inputComments }
export { list }
export { textElementsLoad }
import { getComments } from "./api.js";
import { currentDate } from "./date.js";
import { renderChangingMarkup } from "./render.js";
import { addTodo } from "./api.js";
import { disablingButton } from "./function.js";
import { commentЕditor } from "./function.js";
import { enterInput } from "./function.js";
import { addingLikes } from "./function.js";
import { changesComments } from "./function.js";
const list = document.querySelector('.comments');
const button = document.querySelector('.add-form-button');
const buttonTwo = document.querySelector('.add-form-button-two');
const inputName = document.querySelector('.add-form-name');
const inputComments = document.querySelector('.add-form-text');
const formElements = document.querySelector(".add-form");
const loadingElements = document.querySelector('.loading-add')
const textElementsLoad = document.querySelector(".text-load");
textElementsLoad.style.display = "block"

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

// Функция Fetch() получаем из API с помощью метода GET ответ от сервера
const addedComments = () => {

  getComments().then((responseCommets) => {

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
      console.error(error);
    })
};


addingLikes();

changesComments();


// Функция рендер добовления в разметку
renderChangingMarkup({ arrayOfComments, disablingButton, addingLikes, enterInput, commentЕditor, changesComments });

addedComments();

// Отдельная функция на POST запрос в API
// const addTodo = (name, text) => {
//   return fetch("https://wedev-api.sky.pro/api/v1/Aleksey-Rudnev/comments", {

//     method: "POST",
//     body: JSON.stringify({
//       text: text
//         .replaceAll("&", "&amp;")
//         .replaceAll("<", "&lt;")
//         .replaceAll(">", "&gt;")
//         .replaceAll('"', "&quot;"),
//       name: name
//         .replaceAll("&", "&amp;")
//         .replaceAll("<", "&lt;")
//         .replaceAll(">", "&gt;")
//         .replaceAll('"', "&quot;"),
//       forceError: true
//     })
//   })
// }


// Метод fetch() запрос через API на добовление данных c сохранением на сервере комментарий в списке
const sedingsServer = () => {

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
        alert("Имя и комментарий должны быть не короче 3 символов")
      } else if (error.message === "Сломался сервер") {
        addTodoError()
        // alert("Сервер сломался, попробуй позже")
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже")
      }
    })

}

// Функция повторного отправления запроса при 500 ошибки API
function addTodoError() {
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
  renderChangingMarkup({ arrayOfComments, disablingButton, enterInput, commentЕditor, changesComments });
})

inputName.addEventListener('input', disablingButton);
inputComments.addEventListener('input', disablingButton);

