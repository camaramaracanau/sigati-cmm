const formularioLogin =
    document.getElementById("formLogin");

const campoUsuario =
    document.getElementById("usuario");

const campoSenha =
    document.getElementById("senha");

const mensagemLogin =
    document.getElementById("mensagemLogin");


formularioLogin.addEventListener(
    "submit",
    async function (evento) {

        evento.preventDefault();


        const usuario =
            campoUsuario.value.trim();

        const senha =
            campoSenha.value;


        if (
            usuario === "" ||
            senha === ""
        ) {

            mostrarMensagem(
                "Informe o usuário e a senha.",
                "erro"
            );

            return;

        }


        const botao =
            formularioLogin.querySelector(
                "button[type='submit']"
            );


        botao.disabled = true;

        botao.textContent =
            "Entrando...";


        const dados = {

            acao: "login",

            usuario: usuario,

            senha: senha

        };


        const urlAppsScript =
            "https://script.google.com/macros/s/AKfycbzeHsxMdHv2oY445JWaICQ7o3w9qMmTwJjkvNecWOa0qeoQhSqMTFcN-7IlliAIhTGY-g/exec";


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

                        body:
                            JSON.stringify(dados)
                    }
                );


            const resultado =
                await resposta.json();


            if (!resultado.sucesso) {

                throw new Error(
                    resultado.mensagem ||
                    "Usuário ou senha inválidos."
                );

            }


            // =========================
            // LOGIN APROVADO
            // =========================

            sessionStorage.setItem(
                "usuario",
                resultado.usuario
            );

            sessionStorage.setItem(
                "perfil",
                resultado.perfil
            );

            sessionStorage.setItem(
                "token",
                resultado.token
            );


            // =========================
            // PÁGINA SOLICITADA ANTES
            // =========================

            const paginaDestino =
                sessionStorage.getItem(
                    "paginaDestino"
                );


            if (paginaDestino) {

                sessionStorage.removeItem(
                    "paginaDestino"
                );

                window.location.href =
                    paginaDestino;

                return;

            }


            // =========================
            // REDIRECIONAMENTO POR PERFIL
            // =========================

            if (
                resultado.perfil ===
                "Administrador"
            ) {

                window.location.href =
                    "painel.html";

            } else {

                window.location.href =
                    "abrir-chamado.html";

            }


        } catch (erro) {

            console.error(erro);

            mostrarMensagem(
                erro.message,
                "erro"
            );

            botao.disabled = false;

            botao.textContent =
                "Entrar";

        }

    }
);


function mostrarMensagem(
    mensagem,
    tipo
) {

    mensagemLogin.textContent =
        mensagem;

    mensagemLogin.className =
        "mensagem-login " + tipo;

    mensagemLogin.style.display =
        "block";

}