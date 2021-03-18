const pics = document.querySelectorAll('.img');
const modal = document.querySelector('.modal');

pics.forEach((el) => {
  el.addEventListener('click', async (e) => {
    console.log(el);
    const imgStr = el.outerHTML;
    console.log(imgStr);
    modal.innerHTML = `${imgStr}`;
  });
});
