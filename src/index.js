document.addEventListener('DOMContentLoaded', () => {
  const endPoint = 'http://localhost:3000/api/v1/templates'
  const templateContainer = document.querySelector('#template-header')
  const imageContainer = document.querySelector('#image-container')
  const buttonContainer = document.querySelector('#button-container')
  const drawingContainer = document.querySelector('#drawing-container')
  let currentColorButton = document.querySelector('#current-color')
  let currentColor

  const colourPalette = [
    "#001f3f",
    "#001f3f",
    "#7FDBFF",
    "#39CCCC",
    "#3D9970",
    "#2ECC40",
    "#01FF70",
    "#FFDC00",
    "#FF851B",
    "#FF4136",
    "#85144b",
    "#F012BE",
    "#B10DC9",
    "#111111",
    "#AAAAAA",
    "#DDDDDD",
    "#fff"
  ]
  const paletteSelection = [{name: 'Standard', colours: ["#001f3f",
  "#001f3f",
  "#7FDBFF",
  "#39CCCC",
  "#3D9970",
  "#2ECC40",
  "#01FF70",
  "#FFDC00",
  "#FF851B",
  "#FF4136",
  "#85144b",
  "#F012BE",
  "#B10DC9",
  "#111111",
  "#AAAAAA",
  "#DDDDDD",
  "#fff"]},
  {name: 'Rainbow', colours: ["#9e0142",
  "#d53e4f",
  "#f46d43",
  "#fdae61",
  "#fee08b",
  "#ffffbf",
  "#e6f598",
  "#abdda4",
  "#66c2a5",
  "#3288bd",
  "#5e4fa2"]}]





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

  imageContainer.addEventListener('click', event => {
    if (event.target.nodeName === 'path' || event.target.nodeName === 'polygon') {
      const path = event.target
      path.setAttribute('fill', currentColor)
    }
  })

  function getSVG (url) {
    return fetch(url)
      .then(resp => resp.text())
  }

//colour-palette buttons
// colourPalette.forEach(colour => {
//   const buttonEl = document.createElement('button')
//   buttonEl.className = 'palette-button'
//   buttonEl.value = colour
//   buttonEl.style = `background: ${colour};`
//   buttonContainer.append(buttonEl)
// })
// buttonContainer.addEventListener('click', event => {
//   currentColor = event.target.value
// })

paletteSelection.forEach(palette => {console.log(palette.colours.forEach(colour => {
    const buttonEl = document.createElement('button')
    buttonEl.className = 'palette-button'
    buttonEl.value = colour
    buttonEl.style = `background: ${colour};`
    buttonContainer.append(buttonEl)

    buttonContainer.addEventListener('click', event => {
    currentColor = event.target.value
    
    currentColorButton.style = `background: ${currentColor};`
  })

}))})
//
//   colour => {



  //svg to png iamge conversion

  document.getElementById('btn').addEventListener('click', function (event) {
    const node = document.getElementById('image-container')
    const imageName = document.getElementById('image-name')
    const authorName = document.getElementById('author-name')
    event.preventDefault();
    domtoimage.toPng(node)
      .then(function (imageData) {
        console.log(imageData)
        // window.open(dataUrl);
        const img = new Image()
        img.src = imageData
        document.getElementById('here-appear-theimages').innerHTML = `
        Your drawing has been saved and added to the gallery!`
        saveImage(imageName.value, authorName.value, imageData)
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error)
      })
  })

  function saveImage (name, author, imageData) {
    fetch('http://localhost:3000/api/v1/images', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        author,
        template_id: imageContainer.dataset.id,
        image_file: imageData
      })
    })
      .then(resp => console.log(resp))
      // .then(img => {})
  }
})
