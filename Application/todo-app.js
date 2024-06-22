(function (){
  // возвращаем входящие данные в виде строки
  function dataToJson(data) {
    return JSON.stringify(data);
  }

  // возвращаем входящую строку в виде данных
  function jsonToData(data) {
    return JSON.parse(data);
  }

  // возвращаем данные из localStorage
  function getItemData(key) {
    return localStorage.getItem(key);
  }

  // записываем данные в localStorage
  function setItemData(key, data) {
    localStorage.setItem(key, data);
  }

  // делаем кнопку неактивной, если поле ввода пустое
  function changeInput(input, button) {
    if(input.value !== ''){
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }

  // генерируем ID по последнему наибольшему ID в массиве объектов
  function createID(key) {
    let max = -1;
    let data = jsonToData(getItemData(key))

    if (data !== null) {
      for (let i = 0; i < data.length; i++) {
        if (max < data[i].id) {
          max = data[i].id;
          max++;
        }
      }
    } else {
      max = 1;
    }

    return max;
  }

  // добавляем объект дела в localStorage
  function addItemStorage(key, item) {
    let data = getItemData(key);

    data = data ? jsonToData(data) : [];

    data.push(item);
    setItemData(key, dataToJson(data));
  }

  // удаляем объект дела из localStorage
  function removeItemStorage(key, id) {
    let data = jsonToData(getItemData(key));

    let newItem = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].id !== id) {
        newItem.push(data[i]);
      }
    }

    setItemData(key, dataToJson(newItem));
  }

  // меняем статус дела и сохраняем изменения в localStorage
  function changeDoneItemStorage(key, id) {
    let data = jsonToData(getItemData(key));

    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i].done = !data[i].done;
      }
    }

    setItemData(key, dataToJson(data));
  }

  // создаём и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2'); // создаем объект заголовка
    appTitle.innerHTML = title; // добавляем в заголовок название
    return appTitle; // возвращаем заголовок
  }

  // создаём и возвращаем форму приложения
  function createTodoItemForm() {
    let form = document.createElement('form'); // создаем объект формы
    let input = document.createElement('input'); // создаем объект поля ввода
    let buttonWrapper = document.createElement('div'); // создаем объект блока для формы
    let button = document.createElement('button'); // созздаем объект кнопки в форме

    // задаем стили для формы
    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    // добавляем все объекты DOM на страницу
    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    changeInput(input, button);
    // возвращаем объекты
    return {
      form,
      input,
      button,
    };
  }

  // создаём и возвращаем список элементов
  function createTodoList() {
    //создаем и возвращаем объект списка с задаными стилями
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  // создаем и возвращаем дело
  function createTodoItem(id, name, done = false, nameApp) {
    // создаем объекты для вновь созданного дела
    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // создание объекта дела для добавления в массив
    let itemObj = {
      id: id,
      name: name,
      done: done,
    }

    // стилизуем эти объекты
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = itemObj.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    // работа кнопки готово
    doneButton.addEventListener('click', function() {
      changeDoneItemStorage(nameApp, itemObj.id);
      item.classList.toggle('list-group-item-success');
    });

    // работа кнопки удалить
    deleteButton.addEventListener('click', function() {
      if (confirm('Вы уверены?')) {
        removeItemStorage(nameApp, itemObj.id);
        item.remove();
      }
    });

    // добавляем все объекты на страницу
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // возвращаем все объекты созданного дела
    return {
      item,
      itemObj,
      doneButton,
      deleteButton,
    }
  }

  // создаём приложение todo
  function createTodoApp(container, listName) {
    // создаем объекты компонентов приложения
    let todoAppTitle = createAppTitle('Список дел');
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    // добавляем все компоненты на страницу
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // проверяем есть ли сохраненые данные при перезапуске
    // выводим данные на экран если есть
    if (getItemData(listName)) {
      let listItems = jsonToData(getItemData(listName));

      for (let i = 0; i < listItems.length; i++) {
        let item = createTodoItem(listItems[i].id, listItems[i].name, listItems[i].done, listName);

        // проверяем было ли отмечено событие как готово
        // если да, то красим карточку
        if (listItems[i].done === true) {
          item.item.classList.toggle('list-group-item-success');
        }

        todoList.append(item.item); // добавляем дело на страницу
      }
    }

    // активируем и деактивируем кнопку в поле ввода
    todoItemForm.input.addEventListener('input', function (){
      changeInput(todoItemForm.input, todoItemForm.button);
    });

    // работа кнопки добавить
    todoItemForm.form.addEventListener('submit', function(e) {
      e.preventDefault();

      // если инпут пустой - ничего не делать
      if (!todoItemForm.input.value) {
        return;
      }

      // создание нового дела со значением из инпута
      // функция принимает ID, текст дела, статус, имя приложения.
      // без имени приложения обработчики не срабатывают при только что созданном деле
      let todoItem = createTodoItem(createID(listName), todoItemForm.input.value, done = false, listName);
      addItemStorage(listName, todoItem.itemObj);

      // добавление вновь созданного дела на страницу
      todoList.append(todoItem.item);

      // очистка инпута
      todoItemForm.input.value = '';
      changeInput(todoItemForm.input, todoItemForm.button) // деактивируем кнопку поля вода
    });
  }

  // добавление приложения в глобальный объект
  window.createTodoApp = createTodoApp;
})();

const root = document.getElementById('todo-app');

createTodoApp(root, 'my');