document.forms.addImgForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const { method, photo, action } = e.target;
  console.log(method, photo, action);
  const response = await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image: photo,
    }),
  });

  const newPhoto = await response.json();
  console.log('2222222', newPhoto);

  window.location.assign('/private');
  const gallery = document.querySelector('.photo_gallery');
  gallery.innerHTML += `<img src="${newPhoto.path}">`;

  // const photos = document.querySelector('.photo_gallery');
  // photos.innerHTML +=
});
