$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        $.ajax({
            type: 'POST',
            url: 'validar_login.php',
            data: {email: email, senha: password},
            success: function(response) {
                $('#loginMessage').text(response);
                if (response === 'Usuário logado com sucesso!') {
                    setTimeout(function() {
                        window.location.href = 'index.html';
                    }, 2000);
                }
            },
            error: function() {
                $('#loginMessage').text('Erro ao fazer login. Por favor, tente novamente.');
            }
        });
    });
});