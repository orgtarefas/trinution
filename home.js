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
        // SELEÇÃO ESPECÍFICA: Apenas o container dentro do cabeçalho
        const cabecalhoContainer = document.querySelector('.cabecalho .cabecalho-container');
        
        // Se não encontrar com esse seletor, tenta outro
        if (!cabecalhoContainer) {
            // Alternativa: seleciona por parentesco
            const cabecalho = document.querySelector('.cabecalho');
            if (cabecalho) {
                cabecalhoContainer = cabecalho.querySelector('.cabecalho-container');
            }
        }
        
        // Se ainda não encontrou, para a função
        if (!cabecalhoContainer) {
            console.warn("Container do cabeçalho não encontrado");
            return;
        }
        
        const larguraTela = window.innerWidth;
        
        // REMOVER qualquer limite de largura máxima APENAS do cabeçalho
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
        const logo = cabecalhoContainer.querySelector('.logo');
        const menu = cabecalhoContainer.querySelector('.menu');
        
        if (logo) {
            // Reset completo de margens
            logo.style.margin = '0';
            logo.style.marginRight = 'auto'; // Empurra tudo para direita
        }
        
        if (menu) {
            menu.style.margin = '0';
            menu.style.marginLeft = 'auto'; // Empurra para direita
        }
        
        // Forçar espaço MÁXIMO entre os elementos
        cabecalhoContainer.style.justifyContent = 'space-between';
        
        // Aumentar espaçamento entre os botões do menu
        const menuLista = cabecalhoContainer.querySelector('.menu-lista');
        
        if (menuLista) {
            if (larguraTela > 1200) {
                menuLista.style.gap = '50px'; // MUITO espaçado
            } else if (larguraTela > 768) {
                menuLista.style.gap = '40px'; // Bem espaçado
            } else {
                // Reset para CSS padrão em telas pequenas
                menuLista.style.gap = '';
            }
        }
    }
    
    // Verifica se há outros elementos com a mesma classe que podem ser afetados
    function verificarConflitos() {
        const todosContainers = document.querySelectorAll('.cabecalho-container');
        console.log(`Total de elementos com classe 'cabecalho-container': ${todosContainers.length}`);
        
        if (todosContainers.length > 1) {
            console.warn("ATENÇÃO: Há múltiplos elementos com classe 'cabecalho-container'!");
            console.warn("Isso pode fazer o JavaScript afetar elementos além do cabeçalho.");
            
            todosContainers.forEach((container, index) => {
                console.log(`Elemento ${index + 1}:`, container);
                console.log(`  Parent:`, container.parentElement);
            });
        }
    }
    
    // Aplicar ajustes de descentralização
    descentralizarCabecalho();
    
    // Verificar conflitos
    verificarConflitos();
    
    // Reaplicar quando redimensionar
    window.addEventListener('resize', function() {
        descentralizarCabecalho();
    });
    
    // Forçar reajuste após um breve delay para garantir
    setTimeout(function() {
        descentralizarCabecalho();
        verificarConflitos();
    }, 100);
    
    console.log("Cabeçalho configurado para ser MENOS centralizado:");
    console.log("- Padding lateral aumentado drasticamente");
    console.log("- Elementos forçados para extremidades");
    console.log("- Espaçamento entre botões aumentado");
    console.log("- Seletores específicos para evitar conflitos");
});
