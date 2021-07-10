//document.getElementById("join").style.display = "none";
//document.getElementById("index").style.display = "block";

const tbRecados = [];
console.log(tbRecados);

function clickJoin() {
    console.log("Clicou no botão JOIN");

    document.getElementById("index").style.display = "none";
    document.getElementById("join").style.display = "block";
}

function clickLogar() {
    console.log("Clicou no botão LOGAR");

    document.getElementById("index").style.display = "block";
    document.getElementById("join").style.display = "none";
}

function adicionarUsuario(event) {
    event.preventDefault();

    const email = document.getElementById('emailInput');
    const password = document.getElementById('passwordInput');
    const repeatPassword = document.getElementById('repeatPasswordInput');

    if (password.value !== repeatPassword.value) {
        alert('Senhas são diferentes!');
        return false;
    }

    let usuarioInvalido = false;
    let listaUsuarios = [];
    let usuario = {
        email: email.value,
        password: md5(password.value),
    };

    if (localStorage.listaUsuarios) {
        listaUsuarios = JSON.parse(localStorage.listaUsuarios);
    }

    for (let item of listaUsuarios) {
        if (item.email === usuario.email) {
            usuarioInvalido = true;
        }
    }

    if (usuarioInvalido) {
        alert('Usuário já existe!');
        return false;
    }

    listaUsuarios.push(usuario);
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));

    alert('Seu usuário foi salvo com sucesso!');
    return true;
}

function logarUsuario(event) {
    event.preventDefault();

    const email = document.getElementById('emailLogin');
    const password = document.getElementById('passwordLogin');

    let usuarioInvalido = true;
    let usuario = {
        email: email.value,
        password: md5(password.value),
    };

    if (!localStorage.listaUsuarios) {
        alert('Usuário não cadastrado!');
        window.location.href = "./login.html";
    }

    const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));

    for (let item of listaUsuarios) {
        if (item.email === usuario.email && item.password === usuario.password) {
            usuarioInvalido = false;
        }
    }

    if (usuarioInvalido) {
        alert('Usuário ou senha inválidos!');
        return false;
    }

    window.location.href = "./scrapbook.html";
}

function atualizaTabela() {
    let scrapbook = document.getElementById('scrapbook');

    // limpa scrapbooks
    $("#scrapbook tr").remove();

    // busca os recados do storage
    listaRecados = JSON.parse(localStorage.listaRecados);

    for (let item in listaRecados) {
        $('#scrapbook').append(`
            <tr class="">
                <td scope="row" class="col-2">${listaRecados[item].id}</td>
                    <td class="col-4">${listaRecados[item].descricao}</td>
                    <td class="col-4">${listaRecados[item].detalhamento}</td>
                    <td>
                        <div class="btn-group col-2" role="group" aria-label="Basic example">
                            <button id="apagarRecado" onclick="apagarRecado(${item})" type="button" class="col-1 btnAction btn-delete"><i class="fa fa-trash"></i></button>
                            <button id="editarBtn" onclick="editarRecado(${item})" type="button" class="col-1 btnAction btn-edit"><i class="fa fa-pencil"></i></button>
                        </div>
                </td>
            </tr>
        `);
    }

}

function adicionarRecado(event) {
    event.preventDefault();

    let descricao = document.getElementById('descricaoRecado');
    let detalhamento = document.getElementById('detalhesRecado');

    let listaRecados = [];
    let sequencia = 0;

    if (localStorage.listaRecados) {
        listaRecados = JSON.parse(localStorage.listaRecados);
    }

    for (let item in listaRecados) {
        sequencia = listaRecados[item].id;
    }
    sequencia++;

    let recado = ({
        id: sequencia,
        descricao: descricao.value,
        detalhamento: detalhamento.value
    });

    listaRecados.push(recado);
    localStorage.setItem('listaRecados', JSON.stringify(listaRecados));

    console.log('Recado adicionado com sucesso.');
    descricao.value = "";
    detalhamento.value = "";
    atualizaTabela();
    // alert('Recado adicionado!');
}

function apagarRecado(x) {

    listaRecados = JSON.parse(localStorage.listaRecados);
    let listaRecadosAux = [];

    for (let item in listaRecados) {
        if (item != x) {
            listaRecadosAux.push(listaRecados[item]);
        }
    }

    localStorage.removeItem("listaRecados");
    localStorage.setItem('listaRecados', JSON.stringify(listaRecadosAux));

    atualizaTabela();
}

function editarRecado(x) {

    listaRecados = JSON.parse(localStorage.listaRecados);
    let listaRecadosAux = [];

    let descricao;
    let detalhamento;

    descricao = prompt('Informe a nova descrição:');
    detalhamento = prompt('Informe o novo detalhamento:');

    for (let item in listaRecados) {
        if (item == x) {
            listaRecados[item].descricao = descricao;
            listaRecados[item].detalhamento = detalhamento;
        }

        listaRecadosAux.push(listaRecados[item]);
    }

    localStorage.removeItem("listaRecados");
    localStorage.setItem('listaRecados', JSON.stringify(listaRecadosAux));

    // alert('Recado alterado!');
    atualizaTabela();
}




