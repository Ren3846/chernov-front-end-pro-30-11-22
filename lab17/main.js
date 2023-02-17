// Використовуючи API https://jsonplaceholder.typicode.com/posts зробити пошук поста за ід.
// Ід має бути введений в інпут (валідація: ід від 1 до 100) Якщо знайдено пост,
// то вивести на сторінку блок з постом і зробити кнопку для отримання комкоментарів до посту.
// Зробити завдання використовуючи проміси, перехопити помилки.

const form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', (event) => {
  event.preventDefault();
  getPosts();
});

const getInput = () => {
  const inputValue = document.getElementsByTagName('input')[0];
  return `https://jsonplaceholder.typicode.com/posts/${inputValue.value}`;
};

const getPosts = () => {
  fetch(getInput()).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      console.log(response);
      createPost(response.id, response.title, response.body);
      btn.addEventListener('click', (e) => {
        getComments(response.id);
        btn.style.display = 'none';
      });
    } else {
      alert('Ошибка:' + res.status);
    }
  });
};

const getComments = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(async (res) => {
    if (res.ok) {
      const response = await res.json();
      console.log(response);
      createListComments(response);
    } else {
      alert('Ошибка:' + res.status);
    }
  });
};

const createPost = (id, title, body) => {
  post.innerHTML = `
  <h1>${id}. ${title}</h1>
  <p id="comment">${body}</p> 
  <button id="btn">Переглянути коментар</button> `;
};

const createListComments = (array) => {
  array.forEach((element) => {
    comment.insertAdjacentHTML('afterend', `<p>${element.body}</p>`);
    comment.insertAdjacentHTML('afterend', `<h3>${element.email}</h3>`);
  });
};

// const ulElement = document.querySelector('ul');

// const createList = (arr) => {
//   arr.forEach((el) => {
//     const element = document.createElement('li');
//     element.addEventListener('click', () => {
//       getComments(el.id);
//     });
//     element.innerText = el.title;
//     ulElement.append(element);
//   });
// };

// const fetchPosts = () => {
//   fetch(getInput()).then(async (res) => {
//     if (res.status === 200) {
//       const response = await res.json();
//       div.insertAdjacentHTML('afterend', '<button id="btn">Переглянути коментар</button>');
//       div.insertAdjacentHTML('afterend', `<p>${response.body}</p>`);
//       div.insertAdjacentHTML('afterend', `<h1>${response.id}. ${response.title}</h1>`);
//     } else {
//       alert('error');
//     }
//   });
// };

// const fetchComments = (id) => {
//   fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(async (res) => {
//     if (res.status === 200) {
//       const response = await res.json();
//       console.log(response);
//     } else {
//       alert('error');
//     }
//   });
// };

// btn.addEventListener('click', (event) => {
//   fetchComments();
// });
