// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do menu
    const linkHome = document.getElementById('link-home');
    const linkSobre = document.getElementById('link-sobre');
    const linkProjetos = document.getElementById('link-projetos');
    
    // Função para exibir mensagem "Em produção"
    function mostrarMensagemProducao(event) {
        event.preventDefault();
        
        linkHome.classList.remove('ativo');
        linkSobre.classList.remove('ativo');
        linkProjetos.classList.remove('ativo');
        
        event.target.classList.add('ativo');
        
        alert("Em produção, breve teremos novidades!");
    }
    
    // Função para navegação da Home
    function irParaHome(event) {
        event.preventDefault();
        
        linkHome.classList.add('ativo');
        linkSobre.classList.remove('ativo');
        linkProjetos.classList.remove('ativo');
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Adiciona os event listeners
    linkHome.addEventListener('click', irParaHome);
    linkSobre.addEventListener('click', mostrarMensagemProducao);
    linkProjetos.addEventListener('click', mostrarMensagemProducao);
    
    // Adiciona funcionalidade aos blocos de projetos
    const blocosProjetos = document.querySelectorAll('.projeto-bloco');
    
    blocosProjetos.forEach(bloco => {
        bloco.addEventListener('click', function() {
            alert("Este projeto ainda não está disponível. Em breve teremos novidades!");
        });
    });
    
    // Função para DES-centralizar o cabeçalho (menos centralizado)
    function descentralizarCabecalho() {
        const cabecalhoContainer = document.querySelector('.cabecalho-container');
        const larguraTela = window.innerWidth;
        
        // REMOVER qualquer limite de largura máxima
        cabecalhoContainer.style.maxWidth = 'none';
        cabecalhoContainer.style.width = '100%';
        
        // Aumentar MUITO o padding para empurrar elementos para extremidades
        if (larguraTela > 1400) {
            cabecalhoContainer.style.padding = '0 100px'; // EXTREMO
        } else if (larguraTela > 1200) {
            cabecalhoContainer.style.padding = '0 80px'; // Muito espaçado
        } else if (larguraTela > 900) {
            cabecalhoContainer.style.padding = '0 60px'; // Bem espaçado
        } else if (larguraTela > 768) {
            cabecalhoContainer.style.padding = '0 50px'; // Espaçado
        } else if (larguraTela > 480) {
            cabecalhoContainer.style.padding = '0 30px'; // Moderado
        } else {
            cabecalhoContainer.style.padding = '0 20px'; // Mobile
        }
        
        // Garantir que os elementos usem espaço total
        const logo = document.querySelector('.logo');
        const menu = document.querySelector('.menu');
        
        // Reset completo de margens
        logo.style.margin = '0';
        logo.style.marginRight = 'auto'; // Empurra tudo para direita
        menu.style.margin = '0';
        menu.style.marginLeft = 'auto'; // Empurra para direita
        
        // Forçar espaço MÁXIMO entre os elementos
        cabecalhoContainer.style.justifyContent = 'space-between';
        
        // Aumentar espaçamento entre os botões do menu
        const menuLinks = document.querySelectorAll('.menu-link');
        const menuLista = document.querySelector('.menu-lista');
        
        if (larguraTela > 1200) {
            menuLista.style.gap = '50px'; // MUITO espaçado
        } else if (larguraTela > 768) {
            menuLista.style.gap = '40px'; // Bem espaçado
        }
    }
    
    // Aplicar ajustes de descentralização
    descentralizarCabecalho();
    
    // Reaplicar quando redimensionar
    window.addEventListener('resize', descentralizarCabecalho);
    
    // Forçar reajuste após um breve delay para garantir
    setTimeout(descentralizarCabecalho, 100);
    
    console.log("Cabeçalho configurado para ser MENOS centralizado:");
    console.log("- Padding lateral aumentado drasticamente");
    console.log("- Elementos forçados para extremidades");
    console.log("- Espaçamento entre botões aumentado");
});