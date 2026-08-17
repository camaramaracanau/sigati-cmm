// =========================
// CONSULTA DE CHAMADO
// =========================

const formularioConsulta =
    document.getElementById("formConsulta");

if (formularioConsulta) {

    formularioConsulta.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();

            const campoProtocolo =
                document.getElementById("protocolo");

            const resultado =
                document.getElementById("resultado");

            const resultadoProtocolo =
                document.getElementById(
                    "resultadoProtocolo"
                );

            const resultadoDataAbertura =
                document.getElementById(
                    "resultadoDataAbertura"
                );

            const resultadoCategoria =
                document.getElementById(
                    "resultadoCategoria"
                 );

            const resultadoStatus =
                document.getElementById(
                    "resultadoStatus"
                );

        const resultadoMensagem =
                document.getElementById(
                    "resultadoMensagem"
                );

        const campoDataConclusao =
                document.getElementById(
                    "campoDataConclusao"
                );

        const resultadoDataConclusao =
                document.getElementById(
                    "resultadoDataConclusao"
                );
        const protocolo =
                campoProtocolo.value
                    .trim()
                    .toUpperCase();


            // =========================
            // VALIDAÇÃO
            // =========================

            if (protocolo === "") {

                alert(
                    "Informe o número do protocolo."
                );

                campoProtocolo.focus();

                return;

            }


            // =========================
            // BOTÃO
            // =========================

            const botao =
                formularioConsulta.querySelector(
                    "button[type='submit']"
                );

            botao.disabled = true;

            botao.textContent =
                "Consultando...";


            try {

                const urlAppsScript =
                    "https://script.google.com/macros/s/AKfycbzeHsxMdHv2oY445JWaICQ7o3w9qMmTwJjkvNecWOa0qeoQhSqMTFcN-7IlliAIhTGY-g/exec";


                const url =
                    urlAppsScript +
                    "?acao=consultar&protocolo=" +
                    encodeURIComponent(protocolo);


                const resposta =
                    await fetch(url);


                const dados =
                    await resposta.json();


                if (!dados.sucesso) {

                    throw new Error(
                        dados.mensagem ||
                        "Chamado não encontrado."
                    );

                }


                // =========================
                // MOSTRA RESULTADO
                // =========================

        resultadoProtocolo.textContent =
            dados.protocolo;

        resultadoDataAbertura.textContent =
            dados.dataAbertura || "-";

        resultadoCategoria.textContent =
            dados.categoria || "-";

        function configurarStatus(elemento, status) {

    const statusNormalizado =
        String(status || "")
            .trim()
            .toLowerCase();

    elemento.textContent =
        status || "Não informado";

    elemento.classList.remove(
        "status-aberto",
        "status-atendimento",
        "status-aguardando",
        "status-concluido",
        "status-cancelado"
    );

    if (statusNormalizado === "aberto") {

        elemento.classList.add(
            "status-aberto"
        );

    } else if (
        statusNormalizado === "em atendimento"
    ) {

        elemento.classList.add(
            "status-atendimento"
        );

    } else if (
        statusNormalizado === "aguardando peça" ||
        statusNormalizado === "aguardando usuário"
    ) {

        elemento.classList.add(
            "status-aguardando"
        );

    } else if (
        statusNormalizado === "concluído" ||
        statusNormalizado === "concluido"
    ) {

        elemento.classList.add(
            "status-concluido"
        );

    } else if (
        statusNormalizado === "cancelado"
    ) {

        elemento.classList.add(
            "status-cancelado"
        );

    }

}

configurarStatus(
    resultadoStatus,
    dados.status
);

        resultadoMensagem.textContent =
            dados.mensagemUsuario ||
            "Nenhuma mensagem da TI no momento.";


if (dados.dataConclusao) {

    resultadoDataConclusao.textContent =
        dados.dataConclusao;

    campoDataConclusao.style.display =
        "flex";

} else {

    campoDataConclusao.style.display =
        "none";

}

                resultado.style.display =
                    "block";


            } catch (erro) {

                console.error(erro);

                resultado.style.display =
                    "none";

                alert(
                    "Não foi possível consultar o chamado.\n\n" +
                    erro.message
                );

            } finally {

                botao.disabled = false;

                botao.textContent =
                    "Consultar Chamado";

            }

        }
    );

}