const picLinks = document.querySelectorAll('.pic__link');
const readPhoto = document.querySelector('.read-photo');
const readText = document.querySelector('.read-text');
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
      readText.innerHTML = `<form id="#text-form" method="post" action="/private/say/loud">
                            <p>${text}</p>
                            <button class="button" id="text-reader">Прочитать вслух</button>
                            </form>`;
      console.log('mew');

      const sayLoud = async () => {
        const readLoudForm = document.querySelector('#text-form');
        console.log(readLoudForm);

        readLoudForm.addEventListener('submit', async (eve) => {
          eve.preventDefault();
          console.log('bam');
          const { action, method } = e.target;
          let textToRead = eve.target.parentElement.querySelector('p').innerText;
          await fetch(action, {
            method,
            headers: {
              'Content-type':'Application/json'
            },
            body: JSON.stringify({
              textToRead,
            }),
          });
        });
      };

      sayLoud();
      // readLoudButton = document.querySelector('#text-reader');

    });
  });
});

// const readLoudButton = document.querySelector('#text-reader');

// readLoudButton?.addEventListener('click', async (eve) => {
//   eve.preventDefault();
//   console.log('bam');
//   let textToRead = eve.target.parentElement.querySelector('p').innerText;
//   await fetch('/private/sayloud', {
//     method:'POST',
//     headers: {
//       'Content-type':'Application/json'
//     },
//     body: JSON.stringify({
//       textToRead,
//     }),
//   });
// });
