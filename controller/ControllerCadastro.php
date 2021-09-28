<?php
require_once("../model/cadastro.php");
class cadastroController{

    private $cadastro;

    public function __construct(){
        $this->cadastro = new Cadastro();
        $this->incluir();     
    }
private function incluir(){
    $this->cadastro->setNome($_POST['txtNome']);
    $this->cadastro->setTelefone($_POST['txtTelefone']);
    $this->cadastro->setOrigem($_POST['txtOrigem']);
    $this->cadastro->setData_contato(data('Y-m-d',strtotime$_POST['txtDataContato'])));
    $this->cadastro->setObservacao($_POST['txtObservacao']);
    $result = $this->cadastro->incluir();
    if($result >= 1){
        echo "<script>alert('Registro incluído com sucesso!');document.location'../index.php'</script>";
    }else{
        echo "<script>alert('Erro ao gravar registro!');</script>";
        }
    }
}
new cadastroController();
?>