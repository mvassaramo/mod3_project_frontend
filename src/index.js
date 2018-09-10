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
        <img src="${template.image_url}">
    `

    templateContainer.appendChild(templateEl)
  }





})
