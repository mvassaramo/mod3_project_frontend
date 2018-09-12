document.addEventListener('DOMContentLoaded', () => {
  const gallery = 'http://localhost:3000/api/v1/images'
  const imageDiv = document.querySelector('#here-appear-theimages')

  function getImages () {
    return fetch(gallery)
    .then(resp => resp.json())
    .then(images => images.forEach(image => appendImage(image)))
  }

  getImages()

  function appendImage (image) {
    const imageDisplayDiv = document.createElement('div')
    imageDisplayDiv.innerHTML =
    `<h3>${image.name}</h3>
    <h4>By: ${image.author}</h4>
    <img src=${image.image_file}>
    `
    imageDiv.appendChild(imageDisplayDiv)
  }
})
