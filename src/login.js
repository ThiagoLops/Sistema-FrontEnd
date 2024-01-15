window.onload = function (e) {

    var btnEntrar = document.getElementById("btnEntrar");

    var txtEmail = document.getElementById("cxEmail");

    var txtSenha = document.getElementById("cxSenha");

    txtEmail.focus();

    btnEntrar.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;
        var senha = txtSenha.value;

        if (email == "") {
            exibirMensagemErro("Campo E-mail obrigatório.");
        }
        else if (senha == "") {
            exibirMensagemErro("Campo Senha obrigatório");
        } else {
            realizarLogin(email, senha);
        }

    }

    function exibirMensagemErro(mensagem) {
       
        var spnErro = document.getElementById("spnErro");

        spnErro.innerHTML = mensagem;

        //Mostra a span*
        spnErro.style.display = "block";

        //oculta a span* Depois de um tempo X, 
        //Atere display none(sumir o elemento);
        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    };

    function realizarLogin(email, senha) {

        var data = JSON.stringify({
            "Email": email,
            "Senha": senha
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

        xhr.open("POST", "https://localhost:44366/api/usuario/login");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

}