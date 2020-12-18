const baseURL = "http://localhost:3000"
const entriesURL = `${baseURL}/entries`
const topicsURL =  `${baseURL}/topics`
const tagsURL =  `${baseURL}/tags`

const $entryCardContainer = document.querySelector(".entry-card-container")
const $newEntryForm = document.querySelector(".new-entry-form")
const $kindFilter = document.querySelector(".kind-filter")
const $searchForm = document.querySelector("#search-form")

Promise.all([
    fetch(entriesURL),
    fetch(topicsURL)
]).then(function (responses) {
    return Promise.all(responses.map(function (response){
        return response.json()
    }))
}).then(data => {
    let allEntries = data[0]
    let allTopics = data[1]

    accessEntries(allEntries, allTopics)
    renderOptions(allEntries)
    addNewEntryEventListener(allTopics)
    addSearchFormEventListener(allEntries, allTopics)
})

function parseJSON(response){
    return response.json()
}

function addSearchFormEventListener(allEntries, allTopics){
    $searchForm.addEventListener("input", (event) => handleSearchSubmission(event, allEntries, allTopics))
}

function handleSearchSubmission(event, allEntries, allTopics){
    event.preventDefault()
    const searchInput = document.querySelector("#topic-search-input").value
    const searchedValueArray = allEntries.filter(entry => entry.name.toLowerCase().includes(searchInput.toLowerCase()))
    clearResources()
    accessEntries(searchedValueArray, allTopics)
}   

function clearResources(){
    const $resourceContainer = document.querySelector(".entry-card-container")
    $resourceContainer.textContent = ""
}

function addNewEntryEventListener(allTopics){
    $newEntryForm.addEventListener("submit", (event) => handleNewEntrySubmission(event, allTopics))
}

function handleNewEntrySubmission(event, allTopics){
    event.preventDefault()
    
    let newEntryData = new FormData(event.target)
    const newEntryName = newEntryData.get("name")
    const newEntryURL = newEntryData.get("url")
    const newEntryKind = newEntryData.get("kind")

    newEntryData = {
        name: newEntryName,
        url: newEntryURL,
        kind: newEntryKind
    }

    renderEntry(newEntryData, allTopics)

    fetch(entriesURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(newEntryData)
    })
    event.target.reset()
}

function accessEntries(allEntries, allTopics){
    allEntries.forEach((entry) => renderEntry(entry, allTopics))
    
}

function renderEntry(entry, allTopics){
    const $entryCard = document.createElement("div")
    $entryCard.classList.add("entry-card")
    $entryCard.id = `entry-id-${entry.id}`

    const $deleteCardButton = document.createElement("button")
    $deleteCardButton.classList.add("delete-card-btn")
    $deleteCardButton.textContent = "x"
    addDeleteEventListener(entry, $deleteCardButton)

    const $allComponentContainer = document.createElement("div")
    $allComponentContainer.classList.add("all-component-container")

    const $entryName = document.createElement("h3")
    $entryName.textContent = entry.name
    $entryName.innerHTML = `<a href="${entry.url}" target="_blank">${entry.name}</a>`

    const $entryKindContainer = document.createElement("div")
    $entryKindContainer.classList.add("entry-kind-container")
    renderKindIcon($entryKindContainer, entry)

    const $entryTagContainer = document.createElement("div")
    $entryTagContainer.classList.add("entry-tag-container")
    $entryTagContainer.id = `tag-entry-id-${entry.id}`
    accessTags(entry, $entryTagContainer, allTopics)

    const $tagDropdownForm = document.createElement("form")
    $tagDropdownForm.classList.add("tag-dropdown-form")
    $tagDropdownForm.addEventListener("submit", (event) => handleAddTagClick(event, allTopics, $entryTagContainer))

    renderAddTagForm(entry, $entryCard, $tagDropdownForm, allTopics)

    $entryCard.append($allComponentContainer, $deleteCardButton)
    $allComponentContainer.append($entryName, $entryKindContainer, $entryTagContainer, $tagDropdownForm)
    $entryCardContainer.prepend($entryCard)
    
}

function renderOptions(){
    kinds = ["video", "article", "activity", "documentation", "blog post"]
    kinds.forEach(kind => {
        const $option = document.createElement("option")
        $option.value = kind
        $option.innerText = kind
        $kindFilter.append($option)
    })
}



function renderKindIcon($entryKindContainer, entry){
    const $kindIcon = document.createElement("p")
    const kind = entry.kind.toLowerCase()

    if (kind === "video") {
        $kindIcon.innerHTML = `<svg width="35" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-videocam"><path class="secondary" d="M13.59 12l6.7-6.7A1 1 0 0 1 22 6v12a1 1 0 0 1-1.7.7L13.58 12z"/><rect width="14" height="14" x="2" y="5" class="primary" rx="2"/></svg>`
    }
    if (kind === "article"){
        $kindIcon.innerHTML = `<svg width="35" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-desktop"><path class="primary" d="M4 2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm0 2v10h16V4H4zm4 16a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v.59l.7.7A1 1 0 0 1 16 23H8a1 1 0 0 1-.7-1.7l.7-.71V20z"/><path class="secondary" d="M2 14h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z"/></svg>`
    }
    if (kind === "blog post"){
        $kindIcon.innerHTML = `<svg width="35" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-desktop"><path class="primary" d="M4 2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2zm0 2v10h16V4H4zm4 16a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v.59l.7.7A1 1 0 0 1 16 23H8a1 1 0 0 1-.7-1.7l.7-.71V20z"/><path class="secondary" d="M2 14h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z"/></svg>`
    }
    if (kind === "activity"){
        $kindIcon.innerHTML = `<svg width="35" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-puzzle"><path class="primary" d="M6 11V8c0-1.1.9-2 2-2h3a1 1 0 0 0 1-1V4a2 2 0 1 1 4 0v1a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-1a2 2 0 1 0 0 4h1a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-1a2 2 0 1 0-4 0v1a1 1 0 0 1-1 1H8a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1H4a2 2 0 1 1 0-4h1a1 1 0 0 0 1-1z"/><path class="secondary" d="M22 17v3a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-1a2 2 0 1 0-4 0v1a1 1 0 0 1-1 1H8a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1H4a2 2 0 1 1 0-4h1a1 1 0 0 0 1-1v-.6c.54-.24 1.18-.4 1.97-.4 4 0 4 4 8.02 4 .84 0 1.5-.18 2.06-.45A2 2 0 0 0 20 16h1a1 1 0 0 1 1 1z"/></svg>`
    }
    if (kind === "documentation"){
        $kindIcon.innerHTML = `<svg width="35" height="35" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-document"><path class="primary" d="M6 2h6v6c0 1.1.9 2 2 2h6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"/><polygon class="secondary" points="14 2 20 8 14 8"/></svg>`
    }
    $entryKindContainer.append($kindIcon)
}



function accessTags(entry, $entryTagContainer, allTopics){
    let tagsList = entry.tags
    if (!tagsList){
        return
    } else {
        tagsList.forEach((tag) => renderTags(tag, $entryTagContainer, allTopics))
    }
}



function renderTags(tag, $entryTagContainer, allTopics){
    let currentTopic = allTopics.filter(topic => topic.id === tag.topic_id)[0]
    const currentTopicId = currentTopic.id
    const currentTopicName = currentTopic.name

    const $individualTagContainer = document.createElement("div")
    $individualTagContainer.classList.add("indiv-tag-cont")

    const $tagElement = document.createElement("p")
    $tagElement.classList.add("tag")
    $tagElement.id = `topic-id-${currentTopicId}`
    $tagElement.innerHTML = `<a href="" id="topic-id-${currentTopicId}">${currentTopicName.toUpperCase()}</a>`
    $tagElement.addEventListener("click", (event) => {
        event.preventDefault()
        // const filterTopicSelected = event.target.innerText
        let selectedTopicId = event.target.id.split("-")
        selectedTopicId = parseInt(selectedTopicId[selectedTopicId.length - 1])
        const filteredTopicsArray = allTopics.filter(topic => topic.id === selectedTopicId)[0]
        const filteredEntries = filteredTopicsArray.entries
        clearResources()
        accessEntries(filteredEntries, allTopics)
        const $grabTitle = document.querySelector(".page-title")
        $grabTitle.textContent = `Resources - ${tag.name}`
        const $grabBackButton = document.querySelector("#back-btn")
        $grabBackButton.textContent = "< back to all resources"
    })

    const $deleteTagButton = document.createElement("button")
    $deleteTagButton.classList.add("delete-tag-btn")
    $deleteTagButton.textContent = "x"
    $deleteTagButton.value = "delete"
    $deleteTagButton.addEventListener("click", (event) => {

        event.target.parentNode.parentNode.remove()

        fetch(`${tagsURL}/${tag.id}`, {
            method: "DELETE"
        })
    })

    $tagElement.append($deleteTagButton)
    $individualTagContainer.append($tagElement)
    $entryTagContainer.prepend($individualTagContainer)
}


function renderAddTagForm(entry, $entryCard, $tagDropdownForm, allTopics){
    const $selectTag = document.createElement("select")
    $selectTag.classList.add("tag-select")
    $selectTag.name = "name"
    renderTagOptions(allTopics, $selectTag)

    const $addTagButton = document.createElement("button")
    $addTagButton.classList.add("add-tag-button")
    $addTagButton.textContent = "add tag"
    $addTagButton.type = "submit"

    $tagDropdownForm.append($selectTag, $addTagButton)
    $entryCard.append($tagDropdownForm)
}


function renderTagOptions(allTopics, $selectTag){
    const $selectTagOption = document.createElement("option")
    $selectTagOption.value = ""
    $selectTagOption.textContent = "Select Tag"

    allTopics.forEach((topic) => {
        const $tagOption = document.createElement("option")
        $tagOption.classList.add("tag-option")
        $tagOption.id = `${topic.id}`
        $tagOption.value = topic.name
        $tagOption.textContent = topic.name

        $selectTag.append($selectTagOption, $tagOption)
    })
}

function handleAddTagClick(event, allTopics, $entryTagContainer){
    event.preventDefault()

    let newTagData = new FormData(event.target)
    const name = newTagData.get("name")
    const entry = event.target.parentNode.parentNode.id.split("-")
    let findTopicId = allTopics.filter(topic => topic.name === name)[0]
    
    newTagData = {
        name: name,
        entry_id: parseInt(entry[entry.length - 1]),
        topic_id: findTopicId.id
    }

    renderTags(newTagData, $entryTagContainer, allTopics)

    fetch(tagsURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({tag: newTagData})
    })
    event.target.reset()
}


function addDeleteEventListener(entry, $deleteCardButton){
    $deleteCardButton.addEventListener("click", (event) => handleCardDeleteClick(event, entry))
}

function handleCardDeleteClick(event, entry){
    event.target.parentNode.remove()

    fetch(`${entriesURL}/${entry.id}`, {
        method: "DELETE"
    })
}