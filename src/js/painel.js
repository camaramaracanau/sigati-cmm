// =========================
// PAINEL ADMINISTRATIVO
// =========================

const usuario =
    sessionStorage.getItem("usuario");

const perfil =
    sessionStorage.getItem("perfil");

const token =
    sessionStorage.getItem("token");


// =========================
// VERIFICA LOGIN
// =========================

if (
    !usuario ||
    !token
) {

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
// CARREGA CHAMADOS
// =========================

async function carregarChamados() {

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
                            "listarChamados",

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
                "Não foi possível carregar os chamados."
            );

        }


        console.log(
            "Chamados recebidos:",
            resultado.chamados
        );

        exibirChamados(
         resultado.chamados
        );

        atualizarResumo(
        resultado.chamados
        );


    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível carregar os chamados.\n\n" +
            erro.message
        );

    }

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

            window.location.href =
                "login.html";

        }
    );

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
        isNaN(dataObjeto.getTime())
    ) {

        return data;

    }

    return dataObjeto.toLocaleString(
        "pt-BR",
        {
            timeZone: "America/Fortaleza",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}

// =========================
// EXIBE CHAMADOS
// =========================

function exibirChamados(chamados) {

    const lista =
        document.getElementById(
            "listaChamados"
        );


    if (!lista) {

        return;

    }


    if (
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

                        <th>Unidade</th>

                        <th>Prioridade</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>
    `;


    chamados.forEach(
        function (chamado) {

            const unidade =
                chamado.tipoUnidade === "gabinete"
                    ? chamado.vereador
                    : chamado.departamento;

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
                        ${unidade}
                    </td>

                    <td>
                        ${chamado.prioridade || "-"}
                    </td>

                    <td>
                        ${chamado.status}
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
                    "detalhes-chamado-admin.html";

            }
        );

    }
);

}

// =========================
// ATUALIZA RESUMO
// =========================

function atualizarResumo(chamados) {

    let abertos = 0;

    let emAtendimento = 0;

    let concluidos = 0;


    chamados.forEach(
        function (chamado) {

            if (
                chamado.status === "Aberto"
            ) {

                abertos++;

            }

            else if (
                chamado.status === "Em atendimento"
            ) {

                emAtendimento++;

            }

            else if (
                chamado.status === "Concluído"
            ) {

                concluidos++;

            }

        }
    );


    document.getElementById(
        "totalAbertos"
    ).textContent = abertos;


    document.getElementById(
        "totalAtendimento"
    ).textContent = emAtendimento;


    document.getElementById(
        "totalConcluidos"
    ).textContent = concluidos;

}


// =========================
// INICIA PAINEL
// =========================

carregarChamados();