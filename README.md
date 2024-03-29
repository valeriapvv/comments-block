# Блок с комментариями
<p>В данном проекте реализована форма добавления комментария со списком комментариев</p>
<p>Опубликованная версия на GitHub Pages: https://valeriapvv.github.io/comments-block/ </p>

## Запуск проекта локально

```
$ npm i
$ npm start
```

## Форма добавления комментария:
  + Имя
  + Текст комментария
  + Дата публикации комментария
  
****

## Валидация формы
* **Имя**
  + Обязательное поле
  + Длина имени не менее 2 и не более 50 символов
 
* **Текст комментария**
  + Обязательное поле
  + Длина комментария не более 400 символов
  
<p>Если форма заполнена некорректно, при попытке ее отправить покажутся сообщения об ошибке рядом с соответствующими полями.</p>
<p>При вводе сообщение об ошибке исчезает.</p>

****

## Отправка формы
<p>Данные из формы отправляются по адресу https://jsonplaceholder.typicode.com/comments с помощью <b>Fetch API</b>.</p>
<p>После успешной отправки формы появляется соответсвующий комментарий.</p>
<p>Комментарии расположены в порядке указанной даты публикации снизу вверх (от наиболее поздних до наиболее ранних). </p>

****

## Комментарий
Взаимодействие с комментарием:
  1. **Поставить/убрать лайк**
  2. **Удалить комментарий**

<p>Изначально лайк не поставлен и иконка сердечка белая. При добавлении лайка иконка сердечка становится красной, счетчик количества лайков увеличивается на единицу.</p>
<p>Кнопка удаления появляется при наведении курсора на комментарий.</p>
<p>Оба действия осуществляются после успешной отправки соответствующего запроса по адресу https://jsonplaceholder.typicode.com/comments/{{id}}</p>

****

## Ошибки
<p>Если происходит ошибка отправки данных (например, нет сети) при попытке отправить форму, поставить лайк или удалить комментарий,
то показывается сообщение об ошибке.</p>
  
