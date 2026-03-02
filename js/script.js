document.addEventListener("DOMContentLoaded", () => {
    const btnAdicionar = document.getElementById("btnAdicionar");
    const tabela = document.querySelector("table tbody");
    const modalElement = document.getElementById("usuarioModal");
    const modalUsuario = bootstrap.Modal.getOrCreateInstance(modalElement)
    const modalTitulo = document.getElementById("modalTitulo");
    const usuarioForm = document.getElementById("usuarioForm");
    
    const modalIndex = document.getElementById("usuarioId");
    const inputNome = document.getElementById("inputNome");
    const inputEmail = document.getElementById("inputEmail");
    const inputTelefone = document.getElementById("inputTelefone");


    // abrir modal para adicionar usuario
    btnAdicionar.addEventListener("click", ()=> {
        modalTitulo.textContent = "Adicionar Usuário";
        usuarioForm.reset();
        modalIndex.value = "";
        modalUsuario.show();

    });

    // salvar (adicionar ou editar)
    usuarioForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        const telefone = inputTelefone.value.trim();

        // determine whether to add or update using hidden field
        if (modalIndex.value === ""){
            adicionarUsuario(nome, email, telefone);
        } else {
            atualizarUsuario(modalIndex.value, nome, email, telefone);
        }
        
        modalUsuario.hide();
    });


    // adcionar nova linha na tablea
    function adicionarUsuario(nome, email, telefone){
        const novaLinha = tabela.insertRow();
        // compute new ID from existing rows count
        const novoId = tabela.rows.length;

        novaLinha.innerHTML = `
        <th scope="row">${novoId}</th>
        <td>${nome}</td>
        <td>${email}</td>
        <td>${telefone}</td>
        <td>
            <a href="#" class="btn btn-sm btn-primary btnEditar">Editar</a>
            <a href="#" class="btn btn-sm btn-danger btnExcluir">Excluir</a>
        </td>
        `;
    }

    // atualizar linha
    function atualizarUsuario(index, nome, email, telefone){
        const linha = tabela.rows[index]

        linha.cells[1].textContent = nome;
        linha.cells[2].textContent = email;
        linha.cells[3].textContent = telefone;

    }

    // eventos da tabela (editar // excluir)
    tabela.addEventListener("click", (e) => {
        // capturando a linha clicada
        const linha = e.target.closest("tr");
        
        // se a linha existe, se nao encerra a função
        if (!linha) return;

        // descobre o indice da linha clicada
        const index = Array.from(tabela.rows).indexOf(linha);

        // editar
        if (e.target.classList.contains("btnEditar")){
            modalTitulo.textContent= "Editar usuário";

            modalIndex.value = index;
            inputNome.value = linha.cells[1].textContent;
            inputEmail.value = linha.cells[2].textContent;
            inputTelefone.value = linha.cells[3].textContent;
            
            modalUsuario.show();
        }

        // excluir
        if (e.target.classList.contains("btnExcluir")) {
            const confirmar = confirm("Tem certeza que deseja excluir este usuário?");
            if (confirmar){
                linha.remove();
                atualizarIds();
            }
        }

        // atualizar IDS
        function atualizarIds(){
            Array.from(tabela.rows).forEach((linha, i) => {
                linha.cells[0].textContent = i + 1
            });
        }
    });


});
