var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnBuscar").addEventListener("click",app.buscar);
        document.getElementById("btnEditar").addEventListener("click",app.editar);
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
    
    buscar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");
        alert(getTelefone);
        db.executeSql(
            'SELECT nome AS uNome, telefone AS uTelefone, origem AS uOrigem, data_contato AS uDataContato, observacao ' + 
            'AS uObservacao FROM clientes WHERE telefone = ?', [getTelefone], function(rs) {
                alert(JSON.stringify(rs));
                alert(rs.rows.length);
                let i = 0;
                for(i = 0; i < rs.rows.length; i++){
                    alert("item "+i);
                    let recordItem = rs.rows.item(i);
                    alert(JSON.stringify(recordItem));
                    document.getElementById("txtNome").value = rs.rows.item(i).uNome;
                    document.getElementById("txtTelefone").value = rs.rows.item(i).uTelefone;
                    document.getElementById("txtOrigem").value = rs.rows.item(i).uOrigem;
                    document.getElementById("txtDataContato").value = rs.rows.item(i).uDataContato;
                    document.getElementById("txtObservacao").value = rs.rows.item(i).uObservacao;
                    
                }
            //alert('Record count (expected to be 2): ' + rs.rows.item(0).uLoginName);
        }, function(error) {
            alert('Erro no SELECT: ' + error.message);
        }); 
    },

    editar: function(){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var getTelefone = url.searchParams.get("telefone");
        alert(getTelefone);

        let nome = document.getElementById("txtNome").value;
        let telefone = document.getElementById("txtTelefone").value;
        let origem = document.getElementById("txtOrigem").value;
        let data_contato = document.getElementById("txtDataContato").value;
        let observacao = document.getElementById("txtObservacao").value;

        db.transaction(function(tx) {
            tx.executeSql('UPDATE clientes SET nome=?, telefone=?, origem=?, data_contato=?, observacao=? WHERE telefone=?', [nome, telefone, origem, data_contato, observacao, getTelefone]);
        }, function(error) {
            alert('Erro durante a transacao com o banco: ' + error.message);
        }, function() {
            alert('Atualização realizada com sucesso!!!');
        });
    }
};
app.initialize();