const fetchBtn = document.querySelector("#fetchBtn");
const loadingField = document.querySelector("#loadingMessage");
const resultField = document.querySelector("#result");
const errorField = document.querySelector("#error");

fetchBtn.addEventListener("click", () => {
  const category = document.querySelector("#category").value;
  const id = document.querySelector("#idInput").value;

  if (!id || id < 1 || id > 10) {
    errorField.textContent = `Введите корректный ID от 1 до 10`;
    resultField.textContent = "";
    return;
  }

  const url = `https://swapi.py4e.com/api/${category}/${id}/`;

  resultField.textContent = "";
  errorField.textContent = "";
  loadingField.textContent = "Загрузка...";

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      resultField.textContent = `Название ${data.name || data.title}`;
    })
    .catch((err) => {
      errorField.textContent =
        typeof err === "string" ? err : "Сервер недоступен";
    })
    .finally(() => {
      loadingField.textContent = "";
    });
});
