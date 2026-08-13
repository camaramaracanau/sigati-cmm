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

const campoNome = document.getElementById("nome");
const campoMatricula = document.getElementById("matricula");

formulario.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    const nome = campoNome.value.trim();
    const matricula = campoMatricula.value.trim();

    const tipoUnidade = document.querySelector(
        'input[name="tipoUnidade"]:checked'
    ).value;

    const departamento = document.getElementById("departamento");
    const vereador = document.getElementById("vereador");
    const categoria = document.getElementById("categoria");
    const descricao = document.getElementById("descricao");
    const anexo = document.getElementById("anexo");


    // =========================
    // VALIDAÇÕES
    // =========================

    if (nome === "" && matricula === "") {

        alert("Informe o nome ou a matrícula para continuar.");

        campoNome.focus();

        return;
    }


    if (
        tipoUnidade === "departamento" &&
        departamento.value === ""
    ) {

        alert("Selecione o departamento ou setor.");

        departamento.focus();

        return;
    }


    if (
        tipoUnidade === "gabinete" &&
        vereador.value.trim() === ""
    ) {

        alert("Informe o nome do vereador.");

        vereador.focus();

        return;
    }


    if (categoria.value === "") {

        alert("Selecione o tipo de problema ou solicitação.");

        categoria.focus();

        return;
    }


    if (descricao.value.trim() === "") {

        alert("Descreva o problema ou a solicitação.");

        descricao.focus();

        return;
    }


    // =========================
    // DADOS DO CHAMADO
    // =========================

    const dados = {

        nome: nome,

        matricula: matricula,

        tipoUnidade:
            tipoUnidade === "departamento"
                ? "Departamento"
                : "Gabinete",

        departamento:
            tipoUnidade === "departamento"
                ? departamento.value
                : "",

        vereador:
            tipoUnidade === "gabinete"
                ? vereador.value.trim()
                : "",

        categoria:
            categoria.options[categoria.selectedIndex].text,

        descricao:
            descricao.value.trim(),

        anexo: ""

    };


    // =========================
    // ENVIO
    // =========================

    const urlWebApp =
        "https://script.google.com/macros/s/AKfycbzeHsxMdHv2oY445JWaICQ7o3w9qMmTwJjkvNecWOa0qeoQhSqMTFcN-7IlliAIhTGY-g/exec";


    const botao = document.querySelector(".btn-enviar");

    botao.disabled = true;

    botao.textContent = "Enviando...";


    try {

        const resposta = await fetch(urlWebApp, {

            method: "POST",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(dados)

        });


        const resultado = await resposta.json();


        if (!resultado.sucesso) {

            throw new Error(
                resultado.erro || "Não foi possível registrar o chamado."
            );

        }


        alert(
            "Chamado registrado com sucesso!\n\n" +
            "Seu protocolo é: " +
            resultado.protocolo
        );


        formulario.reset();


    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível registrar o chamado.\n\n" +
            "Tente novamente ou procure a TI."
        );

    } finally {

        botao.disabled = false;

        botao.textContent = "Enviar Chamado";

    }

});