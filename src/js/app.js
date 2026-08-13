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

formulario.addEventListener("submit", function (evento) {

    const nome = campoNome.value.trim();
    const matricula = campoMatricula.value.trim();

    const tipoUnidade = document.querySelector(
        'input[name="tipoUnidade"]:checked'
    ).value;

    const departamento = document.getElementById("departamento");
    const vereador = document.getElementById("vereador");
    const categoria = document.getElementById("categoria");
    const descricao = document.getElementById("descricao");


    // =========================
    // VALIDAÇÃO DO SERVIDOR
    // =========================

    if (nome === "" && matricula === "") {

        evento.preventDefault();

        alert("Informe o nome ou a matrícula para continuar.");

        campoNome.focus();

        return;
    }


    // =========================
    // VALIDAÇÃO DA UNIDADE
    // =========================

    if (
        tipoUnidade === "departamento" &&
        departamento.value === ""
    ) {

        evento.preventDefault();

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

        evento.preventDefault();

        alert("Informe o nome do vereador.");

        vereador.focus();

        return;
    }


    // =========================
    // VALIDAÇÃO DA CATEGORIA
    // =========================

    if (categoria.value === "") {

        evento.preventDefault();

        alert("Selecione o tipo de problema ou solicitação.");

        categoria.focus();

        return;
    }


    // =========================
    // VALIDAÇÃO DA DESCRIÇÃO
    // =========================

    if (descricao.value.trim() === "") {

        evento.preventDefault();

        alert("Descreva o problema ou a solicitação.");

        descricao.focus();

        return;
    }

});
