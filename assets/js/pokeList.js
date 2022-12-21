const pokeCard=document.getElementById('pokecard') 
function fetchPokemon(id) {
    fetch (`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res)=>res.json()).then((data)=>createPokemon(data))
}
function pokemonRamdon(number){
    for(let i = 1 ; i <= number; i++ ) {
        fetchPokemon(i)
    }
}

function createPokemon(pokemon){ 
    console.log(pokemon)
    // esto crea el div padre para la card
    const div = document.createElement('div') // crea una etiqueta
    div.className = 'card card-pokemon shadow' // añade más de una clase a esa etiqueta creada
    div.style.width = '18rem' // agrega estilos a esa etiqueta

    const img = document.createElement('img')// crea una etiqueta
    img.src = pokemon.sprites.front_default// accedemos a la propiedad

    div.appendChild(img) // agregamos la imagen al div padre 
    
    const headDiv = document.createElement('div')// crea una etiqueta
    headDiv.classList.add('card-body') // añade una clase a esa etiqueta creada
    const h5 = document.createElement('h5') // crea una etiqueta
    h5.className = 'text-white text-center'
    h5.textContent = pokemon.name //agregamos el nombre del pokemon a la etiqueta h5 con el metodo textContent
    headDiv.appendChild(h5)// agregamos el h5 al head div 
    const span = document.createElement('span') // crea una etiqueta
    span.className = 'text-white text-center fs-4 d-block'
    span.innerHTML = `<strong>HP</strong> | ${pokemon.stats[0].base_stat}` //agregamos el numero de order del pokemon a la etiqueta span con el metodo textContent
    headDiv.appendChild(span)// agregamos el span al head div 

    // falta p descrition
    div.appendChild(headDiv) // agregamos el head div al div padre 

    const ul = document.createElement('ul')// crea una etiqueta
    ul.className = 'd-flex justify-content-around align-items-center p-0' // añade una clase a esa etiqueta creada
    const liOne = document.createElement('li')// crea una etiqueta
    liOne.className = 'list-group-item text-white border border-0 bg-warning px-2 py-1 rounded' // añade una clase a esa etiqueta creada
    liOne.textContent = pokemon.abilities[0].ability.name //agregamos la habilidad del pokemon a la etiqueta li con el metodo textContent

    const liTWo = document.createElement('li')// crea una etiqueta
    liTWo.className = 'list-group-item text-white border border-0 bg-info px-2 py-1 rounded' //añadimos mas de una clase con el metodo class name 
    liTWo.textContent = pokemon.abilities[1].ability.name //agregamos la habilidad del pokemon a la etiqueta li con el metodo textContent

    ul.appendChild(liOne) //agregamos el primer li a la lista desordenada
    ul.appendChild(liTWo) //agregamos el segundo li a la lista desordenada

    div.appendChild(ul) //agregamos el ul al div padre

    const divButton = document.createElement('div') // crea una etiqueta
    divButton.className = 'card-body text-center' // añade una clase a esa etiqueta creada
    const button = document.createElement('button') // crea una etiqueta
    button.className = 'btn btn-primary' //añadimos mas de una clase con el metodo class name 
    button.textContent = 'Añadir a favoritos' //agregamos un texto a la etiqueta button
    button.addEventListener('click', () => getAlert(pokemon.name))
    divButton.appendChild(button) //añadimos al div button al div button

    div.appendChild(divButton) //añadimos al div button al div padre 
    
    pokeCard.appendChild(div) //añadimos al div padre al contenedor
}

const getAlert = (name) => {
    Swal.fire({
        title: 'Felicidades Josinei',
        text: `Tu pokemon ${name} se añadio a favoritos`,
        icon: 'success',
        confirmButtonText: 'Confimar'
      })
}
pokemonRamdon(50) 
