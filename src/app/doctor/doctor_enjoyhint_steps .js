export const doctorSteps = [
  {
    "next .header_info": 'Информация о пользователе',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"}
  },
  {
    "next .doctor_form": 'Обязательные поля',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"}
  },
  {
    "next .hint_date": 'поле "Дата", <br>используется для указания дня при ПОИСКЕ <br> или день + время для создания записи',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"}
  },
  {
    "next .hint_fio": 'поле "ФИО пациента", <br> Производит поиск пациента по любому сочетанию символов',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"}
  },

  {
    'next #btn1': 'Эта кнопка отображает историю пациента без учета даты, <br>' +
      "<text style='color: #abf9d3'>&#10004; Отображает ФИО конкретного пациента для которого будет показана история</text> <br>" +
      "<text style='color: #f9a5a5'>&#10006; Не активна если не введено ничего в поле ФИО</text> <br>",
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
  },
  {
    'next #btn2': 'Эта кнопка имеет несколько опций, <br>' +
      "<div style='text-align: left'>" +
      "<text style='color: #ecff55'>&#9679; указана дата</text> : <text style='color: #abf9d3'>покажет записи на выбранную дату</text> <br>" +
      "<text style='color: #ecff55'>&#9679; НЕ указана дата</text> : <text style='color: #abf9d3'>покажет записи на сегодня</text> <br>" +
      "<text style='color: #ecff55'>&#9679; указана дата и ФИО</text> : <text style='color: #abf9d3'>покажет активные записи на выбранную дату для конкретного пациента</text> <br>" +
      "<text style='color: #f9a5a5'>&#9679; указана только ФИО</text> : <text style='color: #f9a5a5'>ничего не покажет, нужно добавить дату</text> <br>" +
      "</div>",
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
  },
  {
    'next #btn3': 'Эта кнопка требует соблюдения нескольких условий, <br>' +
      "<div style='text-align: left'>" +
      "<text style='color: #ecff55'>&#9679; указание Дата + ФИО</text> : <text style='color: #abf9d3'>активирует кнопку и дает возможность сохранить запись</text> <br>" +
      "<text style='color: #f9a5a5'>&#9679; иначе</text> : <text style='color: #f9a5a5'>кнопка не активна</text> <br>" +
      "</div>",
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
  },
  {
    'click #active_table': 'Здесь будут отображены результаты для активных записей, <br>' +
      "<div style='text-align: left'>" +
      "<text style='color: #ecff55'>&#9679; Двойной клик</text> : <text style='color: #abf9d3'>откроет подробности записи</text> <br>" +
      "<text style='color: #f9a5a5'>&#9679; Если таблица пуста</text> : <text style='color: #f9a5a5'>попробуйте изменить параметры и нажмите соответствующие кнопки</text> <br>" +
      "</div>",
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
  },

];