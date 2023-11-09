const divBrands = document.querySelector('#brands')

const getVehicle = async (vehicle, op) =>{
    const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${vehicle}/marcas`)
    const dataVehicle = await response.json()
    if(op===1){
        divBrands.innerHTML = ''
        dataVehicle.map((marca)=>{
            divBrands.innerHTML += `<button class="brand" onclick="getBrand('${vehicle}', '${marca.nome}')">${marca.nome}</button>` 
        })
    }
    else {
        const searchInput = document.getElementById('searchInput').value
        divBrands.innerHTML = ''
        dataVehicle.map((marca)=>{
            if(marca.nome.toLowerCase().includes(searchInput.toLowerCase()) && searchInput != ''){
                divBrands.innerHTML += `<button class="brand" onclick="getBrand('${vehicle}', '${marca.nome}')">${marca.nome}</button>`
            }
        })
    }
 }

 const getBrand = async (vehicle, brand) => {
    document.getElementById('title').innerHTML = "MODELOS"
    const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${vehicle}/marcas`)
    const dataVehicle = await response.json()
    let brandCode
    dataVehicle.map((marca)=>{
        if(brand===marca.nome){
            brandCode = marca.codigo
        }    
    })
    console.log(dataVehicle)
    document.getElementById('buttons').innerHTML = `
            <button onclick="getVehicle('carros', 1)">Todas</button>
            <input type="text" id="searchInput" placeholder="Ex: Argo">
            <button onclick="searchModel('${vehicle}', '${brandCode}')" id="searchButton">Pesquisar</button>
    `
    const models = await fetch(`https://parallelum.com.br/fipe/api/v1/${vehicle}/marcas/${brandCode}/modelos`)
    const dataModels = await models.json()
    divBrands.innerHTML = ''
    dataModels.modelos.map((modelo)=>{
        divBrands.innerHTML += `<button class="brand">${modelo.nome}</button>` 
    })
    
 }
 
 const searchModel = async (vehicle, brandCode) => {
    const models = await fetch(`https://parallelum.com.br/fipe/api/v1/${vehicle}/marcas/${brandCode}/modelos`)
    const dataModels = await models.json()
    const searchInput = document.getElementById('searchInput').value
    divBrands.innerHTML = ''
    dataModels.modelos.map((modelo)=>{
        if(modelo.nome.toLowerCase().includes(searchInput.toLowerCase()) && searchInput != ''){
            divBrands.innerHTML += `<button class="brand" onclick="">${modelo.nome}</button>`
        }
    })
 }