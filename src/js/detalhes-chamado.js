// =========================
// DETALHES DO CHAMADO
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

    sessionStorage.setItem(
        "paginaDestino",
        "meus-chamados.html"
    );

    window.location.href =
        "login.html";

}


// =========================
// VERIFICA PROTOCOLO
// =========================

if (!protocolo) {

    window.location.href =
        "meus-chamados.html";

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
        usuario;

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
                            "buscarDetalhesChamado",

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

function classeStatus(status) {

    if (!status) {
        return "status-padrao";
    }

    const statusNormalizado =
        status
            .toString()
            .trim()
            .toLowerCase();

    if (statusNormalizado === "aberto") {
        return "status-aberto";
    }

    if (statusNormalizado === "em atendimento") {
        return "status-atendimento";
    }

    if (statusNormalizado === "aguardando usuário") {
        return "status-aguardando";
    }

    if (statusNormalizado === "concluído") {
        return "status-concluido";
    }

    if (statusNormalizado === "cancelado") {
        return "status-cancelado";
    }

    return "status-padrao";
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

        <strong>Mensagem da TI</strong>

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

`;

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
                "paginaDestino"
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