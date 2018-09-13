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
    `
    <img id="gallery-image" src=${image.image_file}>
    <h2>${image.name}</h2>
    <h4>By: ${image.author}</h4>
    `
    imageDiv.appendChild(imageDisplayDiv)
  }
})
