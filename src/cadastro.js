window.onload = function (e) {

    var btnCadastrar = document.getElementById("btnCadastrar");

    var txtNome = document.getElementById("txtNome");

    var txtSobrenome = document.getElementById("txtSobrenome");

    var txtEmail = document.getElementById("txtEmail");

    var txtSenha = document.getElementById("txtSenha");

    var txtTelefone = document.getElementById("txtTelefone");

    var slcGenero = document.getElementById("slcGenero");

    txtNome.focus();

    btnCadastrar.onclick = function (e) {

        e.preventDefault();

        var nome = txtNome.value;
        var sobrenome = txtSobrenome.value;
        var email = txtEmail.value;
        var senha = txtSenha.value;
        var genero = slcGenero.value;
        var telefone = txtTelefone.value;

        if (nome == "") {
            exibirMensagemErro("Informe o nome.");
        }
        else if (sobrenome == "") {
            exibirMensagemErro("Informe o sobrenome.");
        }
        else if (email == "") {
            exibirMensagemErro("Informe o Email.");
        }
        else if (senha == "") {
            exibirMensagemErro("Informe a senha.")
        }
        else if (telefone == "") {
            exibirMensagemErro("Informe o telefone");
        }
        else {
            criarCadastro(nome, sobrenome, email, senha, telefone, genero);
        }
    }

    function exibirMensagemErro(mensagem) {

        spnErro = document.getElementById("spnErro");

        spnErro.innerHTML = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    }


    function criarCadastro(nome, sobrenome, email, senha, telefone, genero) {

        var data = JSON.stringify({
            "Nome": nome,
            "SobreNome": sobrenome,
            "Email": email,
            "Telefone": telefone,
            "Senha": senha,
            "Genero": genero
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    //guarda no local store o usuário guid;
                    localStorage.setItem("usuarioGuid", result.usuarioGuid);
                    //redireciona para a página home;
                    window.location.href = "home.html";

                } else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44366/api/usuario/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

    }

}