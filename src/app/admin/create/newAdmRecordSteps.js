export const newAdmRecordSteps = [
  {
    "next .header_info": 'Информация о пользователе',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"}
  },
  {
    "next .admin_create_form": 'Всего 3 поля, а вариантов масса. Далее подробно о каждом',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next #hintDate": 'Укажите дату, само по себе заполнение даты ничего не дает,<br>' +
      "но при различных сочетаниях с остальными полями - делает свое дело.",
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .admin_create_form": 'выберите Дата + ФИО доктора и нажмите кнопку (Показать/Обновить)',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    margin:80,
    showNext: true
  },
  {
    "next .page_content": 'это покажет график конкретного доктора в конкретный день.',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .page_content": 'Добавьте ФИО пациента и нажмите (Показать/Обновить)',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .page_content": 'Результат аналогичен предыдущему, но попробуйте оставить только ФИО пациента + Дата и нажмите (Показать/Обновить)',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .record_table": 'В этом случае Вы получите список записей конкретного пациента ко всем врачам в указанный день',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .page_content": 'Теперь уберите дату, оставьте только ФИО пациента и нажмите (Показать/Обновить)',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .page_content": 'В этом случае Вы получите список 100 последних записей конкретного пациента ко всем врачам',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .admin_create_form": 'теперь попробуйте так: Дата пуста, ФИО доктора и пациента заполнены и нажмите (Показать/Обновить)',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .page_content": 'В этом случае Вы получите список 100 последних записей конкретного пациента к указанному доктору, попробуйте изменить ФИО пациента и нажмите (Показать/Обновить)',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next #makeRecordBTN": 'Перейдем к созданию записи. Посредством этой кнопки.',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .admin_create_form": 'Заполните все поля необходимыми данными и нажмите (Показать/Обновить), убедившись что время для записи свободно - нажмите (Записать пациента), ВАЖНО УЧИТЫВАТЬ, что на одно время можно записать только одного пациента',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .page_content": 'В этом случае вы получите график записей указанного доктора и в нем ранее указанный пациент',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .record_table": 'Есть еще удобный способ создать запись, кликните дважды на пустую строку в графике',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .create_new_modal": 'Проверьте данные и нажмите "ДА"',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
  {
    "next .record_table": 'Новая запись уже в графике, теперь дважды кликая на ФИО мы можем получить историю записей',
    "nextButton": {className: "myNext", text: "Далее"},
    "skipButton": {className: "mySkip", text: "Выйти"},
    "prevButton": {className: "myPrev", text: "Назад"},
    showNext: true
  },
];