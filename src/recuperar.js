window.onload = function (e) {

    var btnEnviar = document.getElementById("btnEnviar");

    var txtEmail = document.getElementById("cxEmail");

    txtEmail.focus();

    btnEnviar.onclick = function (e){

        e.preventDefault();

        var email = txtEmail.value;

        if (email == "") {

            exibirMensagemErro("Favor informar o email.");

        } else {
            enviarAcesso(email);
        }

        
    }

    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerHTML = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);

        txtEmail.value = "";
    }

    function enviarAcesso(email) {

        var data = JSON.stringify({
            "Email": email
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var result = JSON.parse(this.responseText);

                if (result.sucesso) {
                    alert("Enviado com sucesso");
                    //limpar caixa de texto
                    txtEmail.value = "";
                } else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44366/api/usuario/recuperarAcesso");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }
}