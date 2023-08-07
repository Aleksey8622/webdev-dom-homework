import { currentDate } from "./helpers.js";

import { renderChangingMarkup } from "./render.js";


const textElementsLoad = document.querySelector(".text-load");
const inputName = document.getElementById("form-name");
const inputComments = document.getElementById("form-text");
const button = document.querySelector(".add-form-button");
const loadingElements = document.querySelector(".loading-add");

const url = "https://wedev-api.sky.pro/api/v2/Aleksey-Rudnev/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";

export let token;
export function userToken(newToken) {
  token = newToken;
}

export let name;
export function userName(newName) {
  name = newName
}

export { arrayOfComments };
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
export const addedComments = () => {
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      textElementsLoad.style.display = "none";
      return response;
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
      });

      arrayOfComments = massComments;
      renderChangingMarkup();

      console.log(arrayOfComments);
    })
    .catch((error) => {
      alert("Кажется, у вас сломался интернет");
      console.error(error);
    });
};

// Отдельная функция на POST запрос в API
export const addTodo = (name, text) => {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
      forceError: true,
    }),
  });
};

// Метод fetch() запрос через API на добовление данных c сохранением на сервере комментарий в списке
export const sedingsServer = () => {
  const formElements = document.getElementById("add-form");
  const inputName = document.getElementById("form-name");
  const inputComments = document.getElementById("form-text");
  loadingElements.style.display = "block";
  formElements.style.display = "none";

  // Функция AddTodo отдельно для передачи POST запроса
  addTodo(inputName.value, inputComments.value)
    .then((response) => {
      return response;
    })
    // Создан отдельный then для реализации логики if/else и передачи исключений методом throw new Error() отлавливаем ошибки в catch()
    .then((responseData) => {
      if (responseData.status === 201) {
        return responseData.json();
      } else if (responseData.status === 400) {
        throw new Error("Не верный ввод");
      } else if (responseData.status === 500) {
        console.log(responseData.status);
        throw new Error("Сломался сервер");
      } else {
        throw new Error("Не работает интернет");
      }
    })
    .then(() => {
      return addedComments(); // Вызов повторно метод GET в методе POST для того что бы добавлялся комментарий
    })
    .then(() => {
      button.disabled = true;
      inputName.value = "";
      inputComments.value = "";
      loadingElements.style.display = "none";
      formElements.style.display = "flex";
    })
    .catch((error) => {
      loadingElements.style.display = "block";
      formElements.style.display = "none";
      if (error.message === "Не верный ввод") {
        alert("Имя и комментарий должны быть не короче 3 символов");
      } else if (error.message === "Сломался сервер") {
        addTodoError();
        // alert("Сервер сломался, попробуй позже")
      } else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
    });
};

// Функция повторного отправления запроса при 500 ошибки API
export function addTodoError() {
  addTodo(inputName.value, inputComments.value)
    .then((response) => {
      return response;
    }) // Создан отдельный then для реализации логики if/else и передачи исключений методом throw new Error() отлавливаем ошибки в catch()
    .then((responseData) => {
      console.log(responseData);
      if (responseData.status === 500) {
        throw new Error("Сломался сервер");
      } else {
        return responseData.json();
      }
    })
    .then(() => {
      return addedComments();
    })
    .then(() => {
      button.disabled = true;
      inputName.value = "";
      inputComments.value = "";
      loadingElements.style.display = "none";
      formElements.style.display = "flex";
    })
    .catch((error) => {
      alert(
        "Кажется, что на сервере проблемы делаем повторный запрос!!!!!!!!!"
      );
      loadingElements.style.display = "block";
      formElements.style.display = "none";
      addTodoError();
    });
}

// Функция login для получения токена для авторизации

export const login = ({ login, password }) => {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((responseData) => {
    return responseData.json();
  });
};
