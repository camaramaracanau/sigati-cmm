// =========================
// VERIFICA LOGIN
// =========================

const usuario = sessionStorage.getItem("usuario");
const perfil = sessionStorage.getItem("perfil");
const token = sessionStorage.getItem("token");


// =========================
// USUÁRIO NÃO LOGADO
// =========================

if (!usuario || !perfil || !token) {

    window.location.href = "login.html";

}


// =========================
// ADMINISTRADOR
// =========================

if (perfil === "Administrador") {

    window.location.href = "painel.html";

}


// =========================
// MOSTRA USUÁRIO LOGADO
// =========================

const usuarioLogado =
    document.getElementById("usuarioLogado");

if (usuarioLogado) {

    usuarioLogado.textContent =
        "Usuário: " + usuario;

}


// =========================
// BOTÃO SAIR
// =========================

const btnSair =
    document.getElementById("btnSair");

if (btnSair) {

    btnSair.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem("usuario");
            sessionStorage.removeItem("perfil");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("protocolo");

            window.location.href =
                "login.html";

        }
    );

}