// =========================
// MEUS CHAMADOS
// =========================


// =========================
// DADOS DA SESSÃO
// =========================

const usuario =
    sessionStorage.getItem(
        "usuario"
    );

const perfil =
    sessionStorage.getItem(
        "perfil"
    );

const token =
    sessionStorage.getItem(
        "token"
    );


// =========================
// VERIFICA LOGIN
// =========================

if (
    !usuario ||
    !token
) {

    // Guarda a página de destino
    // para voltar após o login

    sessionStorage.setItem(
        "paginaDestino",
        "meus-chamados.html"
    );

    window.location.href =
        "login.html";

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
// CARREGA MEUS CHAMADOS
// =========================

async function carregarMeusChamados() {

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
                            "listarMeusChamados",

                        token:
                            token

                    })

                }
            );


        const resultado =
            await resposta.json();


        if (!resultado.sucesso) {

            throw new Error(
                resultado.mensagem ||
                "Não foi possível carregar seus chamados."
            );

        }


        exibirMeusChamados(
            resultado.chamados
        );


    } catch (erro) {

        console.error(erro);

        const lista =
            document.getElementById(
                "listaMeusChamados"
            );

        if (lista) {

            lista.innerHTML =
                "<p>Não foi possível carregar seus chamados.</p>";

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
// EXIBE MEUS CHAMADOS
// =========================

function exibirMeusChamados(chamados) {

    const lista =
        document.getElementById(
            "listaMeusChamados"
        );


    if (!lista) {

        return;

    }


    if (
        !chamados ||
        chamados.length === 0
    ) {

        lista.innerHTML =
            "<p>Nenhum chamado encontrado.</p>";

        return;

    }


    let html = `

        <div class="tabela-container">

            <table class="tabela-chamados">

                <thead>

                    <tr>

                        <th>Protocolo</th>

                        <th>Data</th>

                        <th>Categoria</th>

                        <th>Prioridade</th>

                        <th>Status</th>

                        <th>Mensagem da TI</th>

                    </tr>

                </thead>

                <tbody>

    `;


    chamados.forEach(
        function (chamado) {

            const dataFormatada =
                formatarData(
                    chamado.dataAbertura
                );


            html += `

                <tr>

                    <td>
                        <button
                            class="btn-protocolo"
                            data-protocolo="${chamado.protocolo}"
                        >
                        ${chamado.protocolo}
                        </button>
                    </td>

                    <td>
                        ${dataFormatada}
                    </td>

                    <td>
                        ${chamado.categoria}
                    </td>

                    <td>
                        ${chamado.prioridade || "-"}
                    </td>

                    <td>
                        ${chamado.status || "-"}
                    </td>

                    <td>
                        ${chamado.mensagemUsuario || "-"}
                    </td>

                </tr>

            `;

        }
    );


    html += `

                </tbody>

            </table>

        </div>

    `;


    lista.innerHTML =
        html;

        const botoesProtocolo =
    document.querySelectorAll(
        ".btn-protocolo"
    );

botoesProtocolo.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                const protocolo =
                    this.dataset.protocolo;

                sessionStorage.setItem(
                    "protocoloSelecionado",
                    protocolo
                );

                window.location.href =
                    "detalhes-chamado.html";

            }
        );

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
                "paginaDestino"
            );


            window.location.href =
                "login.html";

        }
    );

}


// =========================
// INICIA A PÁGINA
// =========================

carregarMeusChamados();