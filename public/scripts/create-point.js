function populateUfs(){
    const ufState = document.querySelector("select[name=uf]")
    

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( resp => resp.json())
    .then( states => {

        for(const state of states){
            ufState.innerHTML +=`<option value="${state.id}">${state.nome}</option>`
        }       
    })
}
populateUfs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const indexOfSelectedState = event.target.selectedIndex//index selecionado no options do select kkk confuso
    
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value>Selecione a cidade</option>'
    citySelect.disabled = true

    fetch(url)
    .then(resp => resp.json())
    .then(cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

//forma de selecionar um elemento html pelo name usando o metodo querySelector
//addEventListener recebe um evento do js e uma função de callback para executar quando o evento desejado for executado
//no caso usamos o evento change, quando o elemento selecionado (select cujo name=uf) tiver o estado alterado, ira executar a função de callback passada por parametro no addEventListener
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)//passar a func sem os () significa passar por referencia. Isso sig que ela nao deve ser executada imediatamente, e sim apenas dps do evento desejado (change, no caso)


//Itens de Coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(items of itemsToCollect){
    items.addEventListener("click", handleSelectedItem)
}

const itemsImput = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    //selecionando o li
    const itemLi = event.target

    //add ou remover a classe do elemento
    const classActive = itemLi.classList.toggle("selected")

    //recuperando o data-id do elemento definido no html. dataset.id
    const itemId = itemLi.dataset.id

    //verificar se existem itens selecionados, se sim
    //pegar o id dos itens
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // compara valor em apenas 1 linha, sem if. aqui retorna true or false
        return itemFound
    })

    //se ja estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){//>= que 0 pois o findIdex retorna o index do array quando a busca retornar true ou -1 quando for false
        //tirar da seleção
        const filtereditems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent 
        })

        selectedItems = filtereditems
    //nao estiver selecionado
    }else{
        //add na seleçao
        selectedItems.push(itemId)
    }

    itemsImput.value = selectedItems


}