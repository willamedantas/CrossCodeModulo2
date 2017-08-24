$(function(){
	
	var operacao = "A";	 // Recebe dois valores "A"= Adicionar e "E"= Editar
	var tbContatos = localStorage.getItem("tbContatos");
	tbContatos = JSON.parse(tbContatos);
	var indice = -1;
	
	var agenda = (function(){

		if(tbContatos == null){
			tbContatos = [];
		}

		var adicionar = function(){
			var contato = JSON.stringify({
				Codigo   : $("#txtCodigo").val(),
				Nome     : $("#txtNome").val(),
				Telefone : $("#txtTelefone").val(),
				Email    : $("#txtEmail").val()
			});

			tbContatos.push(contato);
			localStorage.setItem("tbContatos", JSON.stringify(tbContatos));
			alert("Registro adicionado.");
		
		};

		var editar = function(){
			tbContatos[indice] = JSON.stringify({
					Codigo   : $("#txtCodigo").val(),
					Nome     : $("#txtNome").val(),
					Telefone : $("#txtTelefone").val(),
					Email    : $("#txtEmail").val()
				});//Altera o item selecionado na tabela
			localStorage.setItem("tbContatos", JSON.stringify(tbContatos));
			alert("Informações editadas.")
			operacao = "A"; //Volta ao padrão
			return true;
		};

		var excluir = function(){
			tbContatos.splice(indice, 1);
			localStorage.setItem("tbContatos", JSON.stringify(tbContatos));
			alert("Registro excluído.");
		};

		var listar = function(){
			$("#tblListar tbody").empty();
			for(var i in tbContatos){
				var c = JSON.parse(tbContatos[i]);
				addLinhaTbody(c,i);
			}
		};

		var pesquisarNome = function(nome){
			var contato = null
			for(item in tbContatos){
				var c = JSON.parse(tbContatos[item]);
				if(c["Nome"] == nome){
					contato =c;
				} 
			}

			$("#tblListar tbody").empty();
			addLinhaTbody(contato);
			
		}

		var addLinhaTbody = function(contato, indice){
			//Criacao dos elementos
			var tr = document.createElement("tr");
			var td = document.createElement("td");
			var tdNome = document.createElement("td");
			var tdCodigo = document.createElement("td");
			var tdTelefone = document.createElement("td");
			var tdEmail = document.createElement("td");
			var imgEditar = document.createElement("img");
			var imgExcluir = document.createElement("img");

			//Declaração de atributos
			imgEditar.setAttribute("class","btnEditar"); 
			imgEditar.setAttribute("alt", indice); 
			imgEditar.src = "edit.png"

			imgExcluir.setAttribute("class","btnExcluir"); 
			imgExcluir.setAttribute("alt", indice); 
			imgExcluir.src = "delete.png"

			//Inserindo os dados do contato
			tdNome.innerHTML = contato.Nome;
			tdCodigo.innerHTML = contato.Codigo;
			tdTelefone.innerHTML = contato.Telefone;
			tdEmail.innerHTML = contato.Email;

			//Montando os nó
			td.appendChild(imgEditar);
			td.appendChild(imgExcluir);
			tr.appendChild(td);
			tr.appendChild(tdCodigo);
			tr.appendChild(tdNome);
			tr.appendChild(tdTelefone);
			tr.appendChild(tdEmail);

			//Adicionando na tabela os dados criados
			document.querySelector("#tblListar tbody").appendChild(tr);
		}

		return{
			adicionar: adicionar,
			editar: editar,
			excluir: excluir,
			listar: listar,
			pesquisarNome: pesquisarNome

		};


	})();

	agenda.listar();


	$("#formCadastro").on("submit",function(){
		if(operacao == "A"){
			agenda.adicionar();
		}else{
		    agenda.editar();
		}		
	});

	$("#btnListar").click(function(event) {
		agenda.listar();
	});

	$("#btnPesquisar").click(function(){
		var nome = $("#txtPesquisar").val();
		if(nome.length == 0){
			alert("Digite um nome na caixa de pesquisa.")
			return agenda.listar();
		}
			agenda.pesquisarNome(nome);
	});

	

	$("#tblListar").on("click", ".btnEditar", function(){
		operacao = "E";
		indice = parseInt($(this).attr("alt"));
		var cli = JSON.parse(tbContatos[indice]);
		$("#txtCodigo").val(cli.Codigo);
		$("#txtNome").val(cli.Nome);
		$("#txtTelefone").val(cli.Telefone);
		$("#txtEmail").val(cli.Email);
		$("#txtCodigo").attr("readonly","readonly");
		$("#txtNome").focus();
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
	
});