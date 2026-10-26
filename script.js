
const url_estados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome';

async function buscarMunicipios(uf) {
    const url_municipios = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`;

    const resposta = await fetch(url_municipios);
    const dados = await resposta.json();
    
    const containerMunicipios = document.getElementById('lista-municipios');
    containerMunicipios.innerHTML = "";

    for (const municipio of dados) {
        const div = document.createElement('div');
        div.className = 'col-4 divisoria-coluna fs-3 py-2';
        div.textContent = municipio.nome;
        containerMunicipios.appendChild(div);
    }

    console.log(dados);

    
}

async function buscarEstados() {
    const resposta = await fetch(url_estados);

    const dados = await resposta.json();
    const selectUF = document.getElementById('select-uf');

    for (const estado of dados) 
    {
        const option = document.createElement('option');
        option.value = estado.sigla;
        option.textContent = estado.sigla;
        selectUF.appendChild(option);
    }
    console.log(dados);
}


function selecionarUF(evento) {
    const ufSelecionada = evento.target.value;

    if (ufSelecionada !== "") {
        buscarMunicipios(ufSelecionada);
    }
    else { 
        document.getElementById('lista-municipios').innerHTML = "";
    }
}

buscarEstados();
const selectUF = document.getElementById('select-uf');
selectUF.addEventListener('change', selecionarUF);