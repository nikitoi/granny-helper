const picLinks = document.querySelectorAll('.pic__link');
const readPhoto = document.querySelector('.read-photo');
const readText = document.querySelector('.read-text');
// const formData = new FormData(form);

picLinks.forEach((el) => {
  el.addEventListener('click', async (e) => {
    e.preventDefault();
    const img = el.querySelector('.img');
    readPhoto.innerHTML = `<img src="${img.src}" id="file" width="300px">
    <select id="langs">
      <option value="rus" selected>Русский</option>
      <option value="eng">English</option>
    </select>
    <div id="log"></div>
    <button type="button" id="start">Начать обработку</button>`;
    const url = JSON.stringify(img.title).slice(10);

    const textReaderButton = document.querySelector('#start');
    textReaderButton.addEventListener('click', async (e) => {
      const lng = e.target.parentElement.querySelector('#langs').value;
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
      readText.innerHTML += `${text}`;
    })
  });
});


