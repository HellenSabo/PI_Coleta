<?php
require_once 'db.php';
// Verifica se o método da requisição é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtém os dados do formulário de forma segura
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $senha = isset($_POST['senha']) ? $_POST['senha'] : '';
    // Verifica se email e senha foram fornecidos
    if (!empty($email) && !empty($senha)) {
        try {
            $conn = getConnection(); // Estabelece a conexão com o banco de dados
            // Verifica se o usuário existe no banco de dados
            $sql = "SELECT * FROM cadastro WHERE email = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$email]);
            $usuario = $stmt->fetch();
            if ($usuario) {
                // Verifica se a senha está correta
                if (password_verify($senha, $usuario['senha'])) {
                    // Inicia a sessão e armazena o ID do usuário
                    session_start();
                    $_SESSION['usuario_id'] = $usuario['id'];
                    echo 'Usuário logado com sucesso!';
                } else {
                    echo 'E-mail ou senha inválidos.';
                }
            } else {
                echo 'E-mail ou senha inválidos.';
            }
        } catch (PDOException $e) {
            echo 'Erro de conexão com o banco de dados: ' . $e->getMessage();
        }
    } else {
        echo 'E-mail e senha são obrigatórios.';
    }
} else {
    echo 'Apenas solicitações POST são permitidas.';
}
?>