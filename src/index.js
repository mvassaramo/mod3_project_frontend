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
        <div class="svg-container"></div>
    `
    const container = templateEl.querySelector('.svg-container')
    getSVG(template.image_url)
      .then(svg => container.innerHTML = svg)

    container.addEventListener('click', event => {
      imageContainer.innerHTML = container.innerHTML
    })

    templateContainer.appendChild(templateEl)
  }

  imageContainer.addEventListener('click', event => {
    if (event.target.nodeName === 'path') {
      const path = event.target
      path.setAttribute('fill', '#5DADE2')
    }
  })

  function getSVG (url) {
    return fetch(url)
      .then(resp => resp.text())
  }
})
