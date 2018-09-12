document.addEventListener('DOMContentLoaded', () => {
  const endPoint = 'http://localhost:3000/api/v1/templates'
  const templateContainer = document.querySelector('#template-header')
  const imageContainer = document.querySelector('#image-container')

  function getTemplates () {
    return fetch(endPoint)
    .then(resp => resp.json())
    .then(templates => templates.forEach(template => appendTemplate(template)))
  }
  getTemplates()

  function appendTemplate (template) {
    const templateEl = document.createElement('div')

    templateEl.innerHTML = `
        <h2>${template.name}</h2>
        <p>${template.level}</p>
        <div data-id="${template.id}" class="svg-container"></div>
    `
    const container = templateEl.querySelector('.svg-container')
    getSVG(template.image_url)
      .then(svg => container.innerHTML = svg)

    container.addEventListener('click', event => {
      imageContainer.dataset.id = container.dataset.id
      imageContainer.innerHTML = container.innerHTML
    })

    templateContainer.appendChild(templateEl)
  }

  let currentColor

  imageContainer.addEventListener('click', event => {
    if (event.target.nodeName === 'path') {
      const path = event.target
      path.setAttribute('fill', currentColor)
    }
  })

  function getSVG (url) {
    return fetch(url)
      .then(resp => resp.text())
  }

  const redButton = document.querySelector('#red')
  redButton.addEventListener('click', event => {
    currentColor = redButton.value
  })

  const yellowButton = document.querySelector('#yellow')
  yellowButton.addEventListener('click', event => {
    currentColor = yellowButton.value
  })

  const greenButton = document.querySelector('#green')
  greenButton.addEventListener('click', event => {
    currentColor = greenButton.value
  })

  const blueButton = document.querySelector('#blue')
  blueButton.addEventListener('click', event => {
    currentColor = blueButton.value
  })

  const purpleButton = document.querySelector('#purple')
  purpleButton.addEventListener('click', event => {
    currentColor = purpleButton.value
  })
  const fuchsiaButton = document.querySelector('#fuchsia')
  fuchsiaButton.addEventListener('click', event => {
    currentColor = fuchsiaButton.value
  })
  const aquaButton = document.querySelector('#aqua')
  aquaButton.addEventListener('click', event => {
    currentColor = aquaButton.value
  })
  const navyButton = document.querySelector('#navy')
  navyButton.addEventListener('click', event => {
    currentColor = navyButton.value
  })
  const lavenderButton = document.querySelector('#lavender')
  lavenderButton.addEventListener('click', event => {
    currentColor = lavenderButton.value
  })
  const maroonButton = document.querySelector('#maroon')
  maroonButton.addEventListener('click', event => {
    currentColor = maroonButton.value
  })
  const orangeButton = document.querySelector('#orange')
  orangeButton.addEventListener('click', event => {
    currentColor = orangeButton.value
  })
  const blackButton = document.querySelector('#black')
  blackButton.addEventListener('click', event => {
    currentColor = blackButton.value
  })

  document.getElementById('btn').addEventListener('click', function () {
    const node = document.getElementById('image-container')

    domtoimage.toPng(node)
      .then(function (imageData) {
        console.log(imageData)
        // window.open(dataUrl);
        const img = new Image()
        img.src = imageData
        document.getElementById('here-appear-theimages').appendChild(img)
        saveImage('Karlafly', 'Karla', 1, imageData)
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error)
      })
  })

  function saveImage (name, author, image_file) {
    fetch('http://localhost:3000/api/v1/images', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        author,
        template_id: imageContainer.dataset.id,
        image_file
      })
    })
      .then(resp => console.log(resp))
      // .then(img => {})
  }
})
