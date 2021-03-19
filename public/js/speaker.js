const helpButton = document.querySelector('#help_button');

helpButton.addEventListener('click', (e) => {
  const recognizer = new webkitSpeechRecognition();

  // Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
  recognizer.interimResults = true;

  // Какой язык будем распознавать?
  recognizer.lang = 'ru-Ru';

  // Используем колбек для обработки результатов
  recognizer.onresult = function (event) {
    const result = event.results[event.resultIndex];
    if (result.isFinal) {
      console.log('Результат: ', result[0].transcript);
      alert('Вы сказали: ' + result[0].transcript);
    } else {
      console.log('Промежуточный результат: ', result[0].transcript);
    }
  };
  // Начинаем слушать микрофон и распознавать голос
  recognizer.start();
});
