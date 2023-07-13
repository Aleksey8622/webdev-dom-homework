"use strict";
const button = document.querySelector('.add-form-button');
const buttonTwo = document.querySelector('.add-form-button-two');
const list = document.querySelector('.comments');
const inputName = document.querySelector('.add-form-name');
const inputComments = document.querySelector('.add-form-text');
const textElementsLoad = document.querySelector(".text-load");
const formElements = document.querySelector(".add-form");
const loadingElements = document.querySelector('.loading-add')
let isLoadind = true;

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
textElementsLoad.style.display = "block"

const addedComments = () => {

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
      renderChangingMarkup()
      console.log(arrayOfComments);
    })
    .catch((error) => {
      alert("Кажется, у вас сломался интернет")
      console.error(error);
    })
};

// Функция отображения корректного времени в комментариях
const currentDate = (data) => {

  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

  let day = data.getDate();
  let month = months[data.getMonth()];
  let year = data.getFullYear();
  let hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
  let minuts = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
  let conclusion = `${day}.${month}.${year} ${hour}:${minuts}`;
  return conclusion;
}

// Функция валидация
const disablingButton = () => {
  if (inputName.value && inputComments.value) {
    button.disabled = false;

  } else {
    button.disabled = true;
  }

}
// Функция счетчик лайков
const addingLikes = () => {

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
      renderChangingMarkup();
    })

  }

}

// Функция ответа на комментария
const commentЕditor = () => {

  const commentBodyElements = document.querySelectorAll('.comment');

  for (const commentBodyElement of commentBodyElements) {

    commentBodyElement.addEventListener('click', () => {


      const index = commentBodyElement.dataset.delete

      inputComments.value = `${arrayOfComments[index].text + ' ' + arrayOfComments[index].name + ':'}`;

    })

  }

}

// Функция редоктирования комментария
const changesComments = () => {

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

      renderChangingMarkup();
    })

  }
}



// Функция добовления комментария на кнопку Enter
const enterInput = () => {
  document.addEventListener('keyup', event => {
    if (event.key === 'Enter')
      document.querySelector('.add-form-row .add-form-button').click();
  })
};



// Функция рендер добовления в разметку
const renderChangingMarkup = () => {

  const arrayCommentsHtml = arrayOfComments.map((item, index) => {

    return `<ul class="comments">
    <li class="comment" data-delete="${index}">
      <div class="comment-header">
        <div>${item.name}</div>
        <div>${item.date}</div>
      </div>
      <div class="comment-body" data-edit="${index}">
      ${item.isEdit
        ? `<textarea type="textarea" class='add-form-text' rows="4">${item.text}</textarea>`
        : `<div class="comment-text data-div=${index}">
        ${item.text}
      </div>`}
      </div>
      <button data-edit="${index}" class="add-form-button-three ">${item.isEdit ? 'Сохранить' : 'Редактировать'}</button>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${item.likes}</span>
          <button class="like-button ${item.islover ? '-active-like' : ''}" data-index="${index}"></button>
        </div>
      </div>
    </li>
  </ul>`
  }).join('');
  list.innerHTML = arrayCommentsHtml;


  disablingButton();
  addingLikes();
  enterInput();
  commentЕditor();
  changesComments();

}
addedComments();

// Отдельная функция на POST запрос в API
const addTodo = (name, text) => {
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
const sedingsServer = () => {

  loadingElements.style.display = 'block';
  formElements.style.display = 'none'

  // Функция AddTodo отдельно для передачи POST запроса
  addTodo(inputName.value, inputComments.value).then((response) => {
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
  renderChangingMarkup();
})

inputName.addEventListener('input', disablingButton);
inputComments.addEventListener('input', disablingButton);

