// =========================
// DETALHES DO CHAMADO
// ADMINISTRAÇÃO
// =========================


// =========================
// DADOS DA SESSÃO
// =========================

const usuario =
    sessionStorage.getItem("usuario");

const perfil =
    sessionStorage.getItem("perfil");

const token =
    sessionStorage.getItem("token");

const protocolo =
    sessionStorage.getItem(
        "protocoloSelecionado"
    );


// =========================
// VERIFICA LOGIN
// =========================

if (!usuario || !token) {

    window.location.href =
        "login.html";

}


// =========================
// VERIFICA PERFIL
// =========================

if (
    perfil !==
    "Administrador"
) {

    window.location.href =
        "index.html";

}


// =========================
// VERIFICA PROTOCOLO
// =========================

if (!protocolo) {

    window.location.href =
        "painel.html";

}


// =========================
// MOSTRA USUÁRIO
// =========================

const usuarioLogado =
    document.getElementById(
        "usuarioLogado"
    );

if (usuarioLogado) {

    usuarioLogado.textContent =
        "Usuário: " +
        usuario +
        " | Perfil: " +
        perfil;

}


// =========================
// URL DO APPS SCRIPT
// =========================

const urlAppsScript =
    "https://script.google.com/macros/s/AKfycbzeHsxMdHv2oY445JWaICQ7o3w9qMmTwJjkvNecWOa0qeoQhSqMTFcN-7IlliAIhTGY-g/exec";


// =========================
// CARREGA DETALHES
// =========================

async function carregarDetalhesChamado() {

    const detalhes =
        document.getElementById(
            "detalhesChamado"
        );

    try {

        const resposta =
            await fetch(
                urlAppsScript,
                {
                    method: "POST",

                    redirect: "follow",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify({

                        acao:
                            "buscarDetalhesChamadoAdministrativo",

                        token:
                            token,

                        protocolo:
                            protocolo

                    })

                }
            );


        const resultado =
            await resposta.json();


        if (!resultado.sucesso) {

            throw new Error(
                resultado.mensagem ||
                "Não foi possível carregar o chamado."
            );

        }


        exibirDetalhesChamado(
            resultado.chamado
        );


    } catch (erro) {

        console.error(erro);

        if (detalhes) {

            detalhes.innerHTML = `
                <p>
                    Não foi possível carregar os detalhes do chamado.
                </p>
            `;

        }

    }

}


// =========================
// FORMATA DATA
// =========================

function formatarData(data) {

    if (!data) {

        return "-";

    }


    const dataObjeto =
        new Date(data);


    if (
        isNaN(
            dataObjeto.getTime()
        )
    ) {

        return data;

    }


    return dataObjeto.toLocaleString(
        "pt-BR",
        {
            timeZone:
                "America/Fortaleza",

            day:
                "2-digit",

            month:
                "2-digit",

            year:
                "numeric",

            hour:
                "2-digit",

            minute:
                "2-digit"
        }
    );

}


// =========================
// STATUS
// =========================

function classeStatus(status) {

    if (!status) {

        return "status-padrao";

    }


    const statusNormalizado =
        status
            .toString()
            .trim()
            .toLowerCase();


    if (
        statusNormalizado ===
        "aberto"
    ) {

        return "status-aberto";

    }


    if (
        statusNormalizado ===
        "em atendimento"
    ) {

        return "status-atendimento";

    }


    if (
        statusNormalizado ===
        "aguardando usuário"
    ) {

        return "status-aguardando";

    }


    if (
        statusNormalizado ===
        "concluído"
    ) {

        return "status-concluido";

    }


    if (
        statusNormalizado ===
        "cancelado"
    ) {

        return "status-cancelado";

    }


    return "status-padrao";

}


// =========================
// SALVAR STATUS
// =========================

async function salvarStatus() {

    const selectStatus =
        document.getElementById(
            "novoStatus"
        );

    const btnSalvarStatus =
        document.getElementById(
            "btnSalvarStatus"
        );


    if (
        !selectStatus ||
        !btnSalvarStatus
    ) {

        console.error(
            "Controle de status não encontrado."
        );

        return;

    }


    const novoStatus =
        selectStatus.value;


    btnSalvarStatus.disabled =
        true;

    btnSalvarStatus.textContent =
        "Salvando...";


    try {

        const resposta =
            await fetch(
                urlAppsScript,
                {
                    method: "POST",

                    redirect: "follow",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify({

                        acao:
                            "atualizarStatusChamado",

                        token:
                            token,

                        protocolo:
                            protocolo,

                        status:
                            novoStatus

                    })

                }
            );


        const resultado =
            await resposta.json();


        if (!resultado.sucesso) {

            throw new Error(
                resultado.mensagem ||
                "Não foi possível atualizar o status."
            );

        }


        alert(
            "Status atualizado com sucesso."
        );


        await carregarDetalhesChamado();


    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível atualizar o status.\n\n" +
            erro.message
        );

    } finally {

        const botao =
            document.getElementById(
                "btnSalvarStatus"
            );

        if (botao) {

            botao.disabled =
                false;

            botao.textContent =
                "Salvar status";

        }

    }

}


// =========================
// SALVAR MENSAGEM AO USUÁRIO
// =========================

async function salvarMensagem() {

    const campoMensagem =
        document.getElementById(
            "mensagemUsuario"
        );

    const btnSalvarMensagem =
        document.getElementById(
            "btnSalvarMensagem"
        );


    if (
        !campoMensagem ||
        !btnSalvarMensagem
    ) {

        console.error(
            "Controle de mensagem não encontrado."
        );

        return;

    }


    const mensagemUsuario =
        campoMensagem.value;


    btnSalvarMensagem.disabled =
        true;

    btnSalvarMensagem.textContent =
        "Salvando...";


    try {

        const resposta =
            await fetch(
                urlAppsScript,
                {
                    method: "POST",

                    redirect: "follow",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify({

                        acao:
                            "atualizarMensagemChamado",

                        token:
                            token,

                        protocolo:
                            protocolo,

                        mensagemUsuario:
                            mensagemUsuario

                    })

                }
            );


        const resultado =
            await resposta.json();


        if (!resultado.sucesso) {

            throw new Error(
                resultado.mensagem ||
                "Não foi possível salvar a mensagem."
            );

        }


        alert(
            "Mensagem ao usuário salva com sucesso."
        );


        await carregarDetalhesChamado();


    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível salvar a mensagem.\n\n" +
            erro.message
        );

    } finally {

        const botao =
            document.getElementById(
                "btnSalvarMensagem"
            );

        if (botao) {

            botao.disabled =
                false;

            botao.textContent =
                "Salvar mensagem";

        }

    }

}


// =========================
// SALVAR OBSERVAÇÃO DA TI
// =========================

async function salvarObservacao() {

    const campoObservacao =
        document.getElementById(
            "observacaoTI"
        );

    const btnSalvarObservacao =
        document.getElementById(
            "btnSalvarObservacao"
        );


    if (
        !campoObservacao ||
        !btnSalvarObservacao
    ) {

        console.error(
            "Controle de observação não encontrado."
        );

        return;

    }


    const observacaoTI =
        campoObservacao.value;


    btnSalvarObservacao.disabled =
        true;

    btnSalvarObservacao.textContent =
        "Salvando...";


    try {

        const resposta =
            await fetch(
                urlAppsScript,
                {
                    method: "POST",

                    redirect: "follow",

                    headers: {
                        "Content-Type":
                            "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify({

                        acao:
                            "atualizarObservacaoChamado",

                        token:
                            token,

                        protocolo:
                            protocolo,

                        observacaoTI:
                            observacaoTI

                    })

                }
            );


        const resultado =
            await resposta.json();


        if (!resultado.sucesso) {

            throw new Error(
                resultado.mensagem ||
                "Não foi possível salvar a observação."
            );

        }


        alert(
            "Observação da TI salva com sucesso."
        );


        await carregarDetalhesChamado();


    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível salvar a observação.\n\n" +
            erro.message
        );

    } finally {

        const botao =
            document.getElementById(
                "btnSalvarObservacao"
            );

        if (botao) {

            botao.disabled =
                false;

            botao.textContent =
                "Salvar observação";

        }

    }

}


// =========================
// EXIBE DETALHES
// =========================

function exibirDetalhesChamado(chamado) {

    const detalhes =
        document.getElementById(
            "detalhesChamado"
        );


    if (!detalhes) {

        return;

    }


    detalhes.innerHTML = `

        <div class="cabecalho-chamado">

            <div class="identificacao-chamado">

                <span class="rotulo-protocolo">
                    PROTOCOLO
                </span>

                <strong class="numero-protocolo">
                    ${chamado.protocolo || "-"}
                </strong>

                <span class="data-abertura">
                    Aberto em
                    ${formatarData(
        chamado.dataAbertura
    )}
                </span>

            </div>


            <div class="status-topo">

                <span class="rotulo-status">
                    STATUS
                </span>

                <span class="status-chamado ${classeStatus(chamado.status)}">
                    ${chamado.status || "-"}
                </span>

            </div>

        </div>


        <div class="campo-detalhe">

            <strong>Servidor</strong>

            <span>
                ${chamado.nome || "-"}
            </span>

        </div>


        <div class="campo-detalhe">

            <strong>Matrícula</strong>

            <span>
                ${chamado.matricula || "-"}
            </span>

        </div>


        <div class="campo-detalhe">

            <strong>Categoria</strong>

            <span>
                ${chamado.categoria || "-"}
            </span>

        </div>


        <div class="campo-detalhe">

            <strong>Descrição</strong>

            <span>
                ${chamado.descricao || "-"}
            </span>

        </div>


        <div class="campo-detalhe">

            <strong>Tipo de unidade</strong>

            <span>
                ${chamado.tipoUnidade || "-"}
            </span>

        </div>


        <div class="campo-detalhe">

            <strong>Departamento / Setor</strong>

            <span>
                ${chamado.departamento || "-"}
            </span>

        </div>


        <div class="campo-detalhe">

            <strong>Vereador</strong>

            <span>
                ${chamado.vereador || "-"}
            </span>

        </div>


        <div class="campo-detalhe">

            <strong>Prioridade</strong>

            <span>
                ${chamado.prioridade || "-"}
            </span>

        </div>


        <div class="campo-detalhe">

            <strong>Mensagem ao usuário</strong>

            <span>
                ${chamado.mensagemUsuario || "-"}
            </span>

        </div>


        <div class="campo-detalhe">

            <strong>Data de conclusão</strong>

            <span>
                ${formatarData(
        chamado.dataConclusao
    )}
            </span>

        </div>


        <div class="campo-detalhe observacao-ti">

            <strong>Observação da TI</strong>

            <span>
                ${chamado.observacaoTI || "-"}
            </span>

        </div>


        <!-- ========================= -->
        <!-- ATUALIZAÇÃO DO CHAMADO -->
        <!-- ========================= -->

        <div class="area-edicao-chamado">

            <h3>
                Atualizar chamado
            </h3>


            <!-- STATUS -->

            <div class="campo-edicao">

                <label for="novoStatus">
                    Status
                </label>

                <select id="novoStatus">

                    ${chamado.status !== "Aberto"
            ? `
                            <option value="Aberto">
                                Aberto
                            </option>
                        `
            : ""
        }

                    ${chamado.status !== "Em atendimento"
            ? `
                            <option value="Em atendimento">
                                Em atendimento
                            </option>
                        `
            : ""
        }

                    ${chamado.status !== "Aguardando usuário"
            ? `
                            <option value="Aguardando usuário">
                                Aguardando usuário
                            </option>
                        `
            : ""
        }

                    ${chamado.status !== "Concluído"
            ? `
                            <option value="Concluído">
                                Concluído
                            </option>
                        `
            : ""
        }

                    ${chamado.status !== "Cancelado"
            ? `
                            <option value="Cancelado">
                                Cancelado
                            </option>
                        `
            : ""
        }

                </select>


                <button
                    id="btnSalvarStatus"
                    class="btn-principal"
                    type="button"
                >
                    Salvar status
                </button>

            </div>


            <!-- MENSAGEM AO USUÁRIO -->

            <div class="campo-edicao">

                <label for="mensagemUsuario">
                    Mensagem ao usuário
                </label>

                <textarea
                    id="mensagemUsuario"
                    rows="4"
                    placeholder="Digite uma mensagem que será exibida ao servidor..."
                >${chamado.mensagemUsuario || ""}</textarea>


                <button
                    id="btnSalvarMensagem"
                    class="btn-principal"
                    type="button"
                >
                    Salvar mensagem
                </button>

            </div>


            <!-- OBSERVAÇÃO DA TI -->

            <div class="campo-edicao">

                <label for="observacaoTI">
                    Observação da TI
                </label>

                <textarea
                    id="observacaoTI"
                    rows="4"
                    placeholder="Digite uma observação interna da TI..."
                >${chamado.observacaoTI || ""}</textarea>


                <button
                    id="btnSalvarObservacao"
                    class="btn-principal"
                    type="button"
                >
                    Salvar observação
                </button>

            </div>

        </div>

    `;


    // =========================
    // EVENTO - SALVAR STATUS
    // =========================

    const btnSalvarStatus =
        document.getElementById(
            "btnSalvarStatus"
        );

    if (btnSalvarStatus) {

        btnSalvarStatus.addEventListener(
            "click",
            salvarStatus
        );

    }


    // =========================
    // EVENTO - SALVAR MENSAGEM
    // =========================

    const btnSalvarMensagem =
        document.getElementById(
            "btnSalvarMensagem"
        );

    if (btnSalvarMensagem) {

        btnSalvarMensagem.addEventListener(
            "click",
            salvarMensagem
        );

    }


    // =========================
    // EVENTO - SALVAR OBSERVAÇÃO
    // =========================

    const btnSalvarObservacao =
        document.getElementById(
            "btnSalvarObservacao"
        );

    if (btnSalvarObservacao) {

        btnSalvarObservacao.addEventListener(
            "click",
            salvarObservacao
        );

    }

}


// =========================
// VOLTAR AO PAINEL
// =========================

const btnVoltar =
    document.getElementById(
        "btnVoltar"
    );

if (btnVoltar) {

    btnVoltar.addEventListener(
        "click",
        function () {

            window.location.href =
                "painel.html";

        }
    );

}


// =========================
// LOGOUT
// =========================

const btnSair =
    document.getElementById(
        "btnSair"
    );

if (btnSair) {

    btnSair.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                "usuario"
            );

            sessionStorage.removeItem(
                "perfil"
            );

            sessionStorage.removeItem(
                "token"
            );

            sessionStorage.removeItem(
                "protocoloSelecionado"
            );


            window.location.href =
                "login.html";

        }
    );

}


// =========================
// INICIA A PÁGINA
// =========================

carregarDetalhesChamado();