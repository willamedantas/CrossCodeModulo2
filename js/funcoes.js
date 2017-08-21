$(function(){
	
	var operacao = "A"; // Recebe dois valores "A"= Adicionar e "E"= Editar
	var indice = -1;
	var tbContatos = localStorage.getItem("tbContatos");
	tbContatos = JSON.parse(tbContatos);
	if(tbContatos == null){
		tbContatos = [];
	}
	Listar();


	$("#formCadastro").on("submit",function(){
		if(operacao == "A"){
			Adicionar();
		}else{
		    Editar();
		}		
	});

	$("#btnPesquisar").click(function(){
		var nome = $("#txtPesquisar").val();		
		PesquisarNome(nome);
	});

	$("#btnListar").click(function() {
		Listar();
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

	function Adicionar(){
		var contato = JSON.stringify({
			Codigo   : $("#txtCodigo").val(),
			Nome     : $("#txtNome").val(),
			Telefone : $("#txtTelefone").val(),
			Email    : $("#txtEmail").val()
		});

		tbContatos.push(contato);
		localStorage.setItem("tbContatos", JSON.stringify(tbContatos));
		alert("Registro adicionado.");
		
	}

	function Editar(){
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
	}

	function Excluir(){
		tbContatos.splice(indice, 1);
		localStorage.setItem("tbContatos", JSON.stringify(tbContatos));
		alert("Registro excluído.");
	}

	function Listar(){
		$("#tblListar tbody").empty();
		for(var i in tbContatos){
			var c = JSON.parse(tbContatos[i]);
			addLinhaTbody(c);
		}
	}

	function PesquisarNome(nome){
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

	function addLinhaTbody(contato){

		$("#tblListar tbody").append("<tr>");
		$("#tblListar tbody").append("<td><img src='edit.png' alt='"+contato.codigo+"' class='btnEditar'/><img src='delete.png' alt='"+contato.codigo+"' class='btnExcluir'/></td>");
		$("#tblListar tbody").append("<td>"+contato.Codigo+"</td>");
		$("#tblListar tbody").append("<td>"+contato.Nome+"</td>");
		$("#tblListar tbody").append("<td>"+contato.Telefone+"</td>");
		$("#tblListar tbody").append("<td>"+contato.Email+"</td>");
		$("#tblListar tbody").append("</tr>");

	}
});