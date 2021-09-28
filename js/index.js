var app = {
        
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnInserir").addEventListener("click",app.inserir);
        //document.getElementById("btnListar").addEventListener("click",app.listar);
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        db = window.sqlitePlugin.openDatabase({
            name: 'aplicativo.db',
            location: 'default',            
            androidDatabaseProvider: 'system'
        });

        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS clientes (nome, telefone, origem, data_contato, observacao)');
        }, function(error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function() {
            //alert('Banco e Tabela clientes criados com sucesso!!!');
        });
    },

    inserir: function(){
        let nome = document.getElementById("txtNome").value;
        let telefone = document.getElementById("txtTelefone").value;
        let origem = document.getElementById("txtOrigem").value;
        let data_contato = document.getElementById("txtDataContato").value;
        let observacao = document.getElementById("txtObservacao").value;

        db.transaction(function(tx) {
            tx.executeSql('INSERT INTO clientes VALUES (?,?,?,?,?)', [nome, telefone, origem, data_contato, observacao]);
        }, function(error) {
            alert('Erro durante a transacao com o banco: ' + error.message);
        }, function() {
            alert('Insercao realizada com sucesso!!!');
        });
    },
    
};
app.initialize();