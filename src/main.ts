const spanError = document.querySelector("#error")
const camps = document.querySelectorAll("p[id=camps]")
const h1Message = document.querySelector("#message")
const divAlbuns = document.querySelector("#albuns")
const buttonJob = document.querySelector("#jobs")

async function fetchBands(valueUser: string) {
  const response = await fetch(`https://musicbrainz.org/ws/2/artist?fmt=json&query=${valueUser}`)
  const results = await response.json()
  if(results.count !== 0 && response.ok) {
    return results
  }

  return Promise.reject("Banda/Artista nao encontrada")
}

async function fetchJobs(idBand: string) {
  const response = await fetch(`https://musicbrainz.org/ws/2/release-group?fmt=json&artist=${idBand}`)
  const results = await response.json()
  if(results["release-group-count"] !== 0 && response.ok) {
    return results
  }

  return Promise.reject("Nenhum Trabalho encontrado")
}

function getData() {
  const input: HTMLInputElement = document.querySelector("#input")
  if(input.value !== "") {
    spanError.textContent = ""
    return input.value
  } else {
    throw new Error("❗ Digite Algo")
  }
}

function clearInformation() {
  h1Message.textContent = ""
  camps.forEach(element => element.textContent = "")
  document.querySelectorAll("p[id=title]").forEach(element => element.remove())
  document.querySelectorAll("p[id=data]").forEach(element => element.remove())
  document.querySelectorAll("hr").forEach(element => element.remove())
  const h1Error = document.querySelector("#h1Error")
  if(h1Error) {
    h1Error.remove()
  }
}

function tratamentErrorSpan() {
  try {
    getData()
  } catch(error) {
    spanError.textContent = error.message
  }
}

async function submitValue(ev?: { preventDefault: () => void }) {
  ev.preventDefault()
  tratamentErrorSpan()
  clearInformation()
  divAlbuns.classList.remove("view")
  buttonJob.classList.remove("view")
  buttonJob.textContent = "Alguns trabalhos"
  const value = getData()

  try {
    const response = await fetchBands(value)
    setttingValuesBand(response.artists[0])
  } catch(error) {
    h1Message.textContent = error
  }
}

function setttingValuesBand(bandData) {
  h1Message.textContent = "Informações"
  camps[0].innerHTML = `<span>Nome: </span>${bandData.name}`

  if(bandData.area) {
    camps[1].innerHTML = `<span>Local de Origem: </span>${bandData.area.name}`
  } else {
    camps[1].innerHTML = `<span>Local de Origem: </span>Informação não achada`
  }
  
  camps[2].innerHTML = bandData["life-span"].ended ? "Não esta mais na ativa" : "Ainda na ativa"
  seachJobs(bandData.id)
}

async function seachJobs(idUser: string) {
  buttonJob.classList.add("view")
  try {
    const response = await fetchJobs(idUser)
    setttingValuesAlbuns(response["release-groups"])
  } catch(error) {
    const err = createh1Error(error)
    divAlbuns.append(err)
  }
}

function createh1Error(value) {
  const h1 = document.createElement("h1")
  h1.id = "h1Error"
  h1.textContent = value
  return h1
}

function createParagraphTitle(value) {
  const paragraph = document.createElement("p")
  paragraph.id = "title"
  paragraph.innerHTML = `<span>Album: </span> ${value}`
  return paragraph
}

function createParagraphData(value) {
  const paragraph = document.createElement("p")
  paragraph.id = "data"
  paragraph.innerHTML = `<span>Lancamento: </span> ${value}`
  return paragraph
}

function createHr() {
  const hr = document.createElement("hr")
  return hr
}

function setttingValuesAlbuns(albumData) {
  if(albumData.length > 1) {
    for(let i = 0; i < 3; i++) {
      const title = createParagraphTitle(albumData[i].title)
      const data = createParagraphData(albumData[i]["first-release-date"])
      const hr = createHr()
      divAlbuns.append(title, data, hr)
    }
  } else {
    for(let i = 0; i < 1; i++) {
      const title = createParagraphTitle(albumData[i].title)
      const data = createParagraphData(albumData[i]["first-release-date"])
      const hr = createHr()
      divAlbuns.append(title, data, hr)
    }
  }
}

buttonJob.addEventListener("click", (ev) => {
  ev.preventDefault()

  const containerAlbuns = document.querySelector("#albuns")

  if(containerAlbuns.classList.contains("view")) {
    containerAlbuns.classList.toggle("view")
    buttonJob.textContent = "Alguns trabalhos"
  } else {
    containerAlbuns.classList.toggle("view")
    buttonJob.textContent = "Menos"
  }
})

document.querySelector("form").addEventListener("submit", submitValue)