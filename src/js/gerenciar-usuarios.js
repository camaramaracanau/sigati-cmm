const URL_SCRIPT =
  "https://script.google.com/macros/s/AKfycbzeHsxMdHv2oY445JWaICQ7o3w9qMmTwJjkvNecWOa0qeoQhSqMTFcN-7IlliAIhTGY-g/exec";

document.addEventListener("DOMContentLoaded", function () {

  const usuario = sessionStorage.getItem("usuario");
  const perfil = sessionStorage.getItem("perfil");
  const token = sessionStorage.getItem("token");

  // Verifica se existe sessão
  if (!usuario || !perfil || !token) {
    window.location.href = "login.html";
    return;
  }

  // Somente administrador pode acessar
  if (perfil !== "Administrador") {
    window.location.href = "painel-usuario.html";
    return;
  }

  const formulario =
    document.getElementById("formUsuario");

  const mensagem =
  document.getElementById("mensagem");

  const btnVoltar =
    document.getElementById("btnVoltar");

  const btnSair =
    document.getElementById("btnSair");

  // =========================
  // CADASTRAR USUÁRIO
  // =========================

  formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    mensagem.textContent = "Cadastrando usuário...";

    const usuarioNovo =
      document.getElementById("usuario").value.trim();

    const nome =
      document.getElementById("nome").value.trim();

    const matricula =
      document.getElementById("matricula").value.trim();

    const perfilNovo =
      document.getElementById("perfil").value;

    const senhaInicial =
      document.getElementById("senhaInicial").value;

    if (
      !usuarioNovo ||
      !nome ||
      !matricula ||
      !perfilNovo ||
      !senhaInicial
    ) {
      mensagem.textContent =
        "Preencha todos os campos obrigatórios.";

      return;
    }

    try {

      const resposta = await fetch(URL_SCRIPT, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },
        body: JSON.stringify({
          acao: "cadastrarUsuario",
          token: token,
          usuario: usuarioNovo,
          nome: nome,
          matricula: matricula,
          perfil: perfilNovo,
          senhaInicial: senhaInicial
        })
      });

      const resultado =
        await resposta.json();

      if (resultado.sucesso) {

        mensagem.textContent =
          resultado.mensagem ||
          "Usuário cadastrado com sucesso.";

        formulario.reset();

      } else {

        mensagem.textContent =
          resultado.mensagem ||
          "Não foi possível cadastrar o usuário.";

      }

    } catch (erro) {

      console.error(erro);

      mensagem.textContent =
        "Erro ao comunicar com o servidor.";

    }

  });

  // =========================
  // VOLTAR
  // =========================

  if (btnVoltar) {

    btnVoltar.addEventListener("click", function () {
      window.location.href = "painel.html";
    });

  }

  // =========================
  // SAIR
  // =========================

  if (btnSair) {

    btnSair.addEventListener("click", function () {

      sessionStorage.removeItem("usuario");
      sessionStorage.removeItem("perfil");
      sessionStorage.removeItem("token");

      window.location.href = "login.html";

    });

  }

});