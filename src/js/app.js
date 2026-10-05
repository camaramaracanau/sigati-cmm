// =========================
// VERIFICA LOGIN
// =========================

const token =
    sessionStorage.getItem("token");

if (!token) {

    sessionStorage.setItem(
        "paginaDestino",
        "index.html"
    );

    window.location.href =
        "login.html";

}

const tiposUnidade = document.querySelectorAll(
    'input[name="tipoUnidade"]'
);

const campoDepartamento = document.getElementById(
    "campoDepartamento"
);

const campoGabinete = document.getElementById(
    "campoGabinete"
);

tiposUnidade.forEach(function (opcao) {

    opcao.addEventListener("change", function () {

        if (this.value === "gabinete") {

            campoDepartamento.style.display = "none";
            campoGabinete.style.display = "block";

        } else {

            campoDepartamento.style.display = "block";
            campoGabinete.style.display = "none";

        }

    });

});

const formulario = document.querySelector("form");


formulario.addEventListener("submit", async function (evento) {

    evento.preventDefault();


    const tipoUnidade = document.querySelector(
        'input[name="tipoUnidade"]:checked'
    ).value;

    const departamento = document.getElementById("departamento");
    const vereador = document.getElementById("vereador");
    const categoria = document.getElementById("categoria");
    const descricao = document.getElementById("descricao");
    const botaoEnviar = formulario.querySelector(".btn-enviar");


    
    // =========================
    // VALIDAÇÃO DA UNIDADE
    // =========================

    if (
        tipoUnidade === "departamento" &&
        departamento.value === ""
    ) {

        alert("Selecione o departamento ou setor.");

        departamento.focus();

        return;
    }


    // =========================
    // VALIDAÇÃO DO GABINETE
    // =========================

    if (
        tipoUnidade === "gabinete" &&
        vereador.value.trim() === ""
    ) {

        alert("Informe o nome do vereador.");

        vereador.focus();

        return;
    }


    // =========================
    // VALIDAÇÃO DA CATEGORIA
    // =========================

    if (categoria.value === "") {

        alert("Selecione o tipo de problema ou solicitação.");

        categoria.focus();

        return;
    }


    // =========================
    // VALIDAÇÃO DA DESCRIÇÃO
    // =========================

    if (descricao.value.trim() === "") {

        alert("Descreva o problema ou a solicitação.");

        descricao.focus();

        return;
    }


    // =========================
    // ENVIO
    // =========================

    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando...";


    const dados = {


    tipoUnidade: tipoUnidade,

    departamento: departamento.value,

    vereador: vereador.value.trim(),

    categoria: categoria.value,

    descricao: descricao.value.trim(),

    anexo: "",

    token: sessionStorage.getItem("token")

};


    const urlAppsScript =
        "https://script.google.com/macros/s/AKfycbzeHsxMdHv2oY445JWaICQ7o3w9qMmTwJjkvNecWOa0qeoQhSqMTFcN-7IlliAIhTGY-g/exec";


    try {

        const resposta = await fetch(
    urlAppsScript,
    {
        method: "POST",
        redirect: "follow",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(dados)
    }
);


        const resultado = await resposta.json();


        if (!resultado.sucesso) {

            throw new Error(
                resultado.mensagem ||
                "Não foi possível registrar o chamado."
            );

        }


        // Guarda o protocolo para a próxima página

        sessionStorage.setItem(
            "protocolo",
            resultado.protocolo
        );


        // Vai para a tela de confirmação

        window.location.href =
            "confirmar-chamado.html";


    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível registrar o chamado.\n\n" +
            erro.message
        );

        botaoEnviar.disabled = false;
        botaoEnviar.textContent = "Enviar Chamado";

    }


});
