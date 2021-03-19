const pics = document.querySelectorAll('.img');
const modal = document.querySelector('.popup');

pics.forEach((el) => {
  el.addEventListener('click', async (e) => {
    console.log(el);
    const popupImg = document.createElement('img');
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('popup__close-btn');

    popupImg.src = el.src;

    // modal.classList.toggle('popup-opened');
    // const imgStr = el.outerHTML;
    // console.log(imgStr);
    modal.appendChild(popupImg);
    modal.appendChild(closeBtn);

    const closeButton = document.querySelector('.popup__close-btn');
    closeButton.addEventListener('click', (event) => {
      event.target.parentElement.innerHTML = '';
    });
  });
});
