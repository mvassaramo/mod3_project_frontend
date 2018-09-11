document.addEventListener('DOMContentLoaded',()=> {
const endPoint = 'http://localhost:3000/api/v1/templates'
const templateContainer = document.querySelector('#template-header')



  function getTemplates() {
    return fetch(endPoint)
    .then(resp => resp.json())
    .then(templates  => templates.forEach(template => appendTemplate(template)))
  }
  getTemplates()


  function appendTemplate(template) {
    const templateEl = document.createElement('div')

    templateEl.innerHTML =`
        <h2>${template.name}</h2>
        <p>${template.level}</p>
        <div class="svg-container"></div>
    `
    const container = templateEl.querySelector('.svg-container')
    getSVG(template.image_url)
      .then(svg => container.innerHTML = svg)

    container.addEventListener('click', event => {
      const imageContainer = document.querySelector('#image-container')
      imageContainer.innerHTML = container.innerHTML
    })

    templateContainer.appendChild(templateEl)
  }


  function getSVG(url) {
    return fetch(url)
      .then(resp => resp.text())
  }


})
