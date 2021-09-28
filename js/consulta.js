var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        document.getElementById("btnListar").addEventListener("click",app.listar);
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
    
    listar: function(){
        db.executeSql(
            'SELECT nome AS uNome, telefone AS uTelefone, origem AS uOrigem, data_contato AS uDataContato, observacao AS uObservacao FROM clientes', [], function(rs) {
                //alert(JSON.stringify(rs));
                //alert(rs.rows.length);
                let i = 0;
                for(i = 0; i < rs.rows.length; i++){
                    //alert("item "+i);
                    let recordItem = rs.rows.item(i);
                    //alert(JSON.stringify(recordItem));
                    $("#TableData").append("<tr>");
                    $("#TableData").append("<td scope='col'>" + rs.rows.item(i).uNome + "</td>");
                    $("#TableData").append("<td scope='col'>" + rs.rows.item(i).uTelefone + "</td>");
                    $("#TableData").append("<td scope='col'>" + rs.rows.item(i).uOrigem + "</td>");
                    $("#TableData").append("<td scope='col'>" + rs.rows.item(i).uDataContato + "</td>");
                    $("#TableData").append("<td scope='col'>" + rs.rows.item(i).uObservacao + "</td>");
                    $("#TableData").append("<td scope='col'><a href='" + cordova.file.applicationDirectory + "www/editarClientes.html?telefone=" + rs.rows.item(i).uTelefone + "'>Editar</a>&nbsp;|&nbsp;<a href='" + cordova.file.applicationDirectory + "www/excluirClientes.html?telefone=" + rs.rows.item(i).uTelefone + "'>Excluir</a></td>");
                    $("#TableData").append("</tr>");
                }
            //alert('Record count (expected to be 2): ' + rs.rows.item(0).uLoginName);
        }, function(error) {
            alert('Erro no SELECT: ' + error.message);
        }); 
    }

};

app.initialize();