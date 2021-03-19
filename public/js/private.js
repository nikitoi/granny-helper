const picLinks = document.querySelectorAll('.pic__link');
const readPhoto = document.querySelector('.read-photo');
const readText = document.querySelector('.read-text');
const btnDelete = document.querySelectorAll('.btn-delete');
// const formData = new FormData(form);
// const readLoudButton = document.querySelector('#text-reader');

picLinks.forEach((el) => {
  el.addEventListener('click', async (e) => {
    console.log('bam3');
    e.preventDefault();
    const img = el.querySelector('.img');
    readPhoto.innerHTML = `<img src="${img.src}" id="file" width="300px">
    <select class="button light" id="langs">
      <option value="rus" selected>Русский</option>
      <option value="eng">English</option>
    </select>
    <div id="log"></div>
    <button class="button" type="button" id="start">Начать обработку</button>`;
    const url = JSON.stringify(img.title).slice(10);

    const textReaderButton = document.querySelector('#start');
    textReaderButton.addEventListener('click', async (ev) => {
      console.log('bam2');
      const lng = ev.target.parentElement.querySelector('#langs').value;
      let response = await fetch(`/private/${url}`, {
        method:'POST',
        headers: {
          'Content-type':'Application/json'
        },
        body: JSON.stringify({
          lng,
        }),
      });
      let text = await response.json();
      readText.innerHTML = `<form id="#text-form" class="sayLoudForm" method="post" action="/private/say/loud">
                            <p>${text}</p>
                            <button class="button" id="text-reader">Прочитать вслух</button>
                            </form>`;
      console.log('mew');

      const sayLoud = async () => {
        const readLoudForm = document.querySelector('.sayLoudForm');
        console.log(readLoudForm);

        readLoudForm.addEventListener('submit', async (eve) => {
          eve.preventDefault();
          console.log('bam');
          // const { action, method } = e.target;
          let textToRead = eve.target.parentElement.querySelector('p').innerText;
          speechSynthesis.speak(
            new SpeechSynthesisUtterance(textToRead)
          );
        });
      };

      sayLoud();
      // readLoudButton = document.querySelector('#text-reader');

    });
  });
});

btnDelete.forEach(el => {
  el.addEventListener('click', async (e) => {
    let imgFilename = e.target.parentElement.querySelector('img').title.slice(9);
    let response = await fetch('/private/delete/img', {
      method:'DELETE',
      headers: {
        'Content-type':'Application/json'
      },
      body: JSON.stringify({
        imgFilename,
      }),
    });
    let result = await response.json();
    e.target.parentElement.remove();
  });
});
