// Trinution - JavaScript Principal
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGAÇÃO SUAVE =====
    const linksMenu = document.querySelectorAll('.menu-link');
    const btnTeste = document.querySelector('.btn-destaque');
    
    function configurarNavegacao() {
        linksMenu.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove classe ativa de todos
                linksMenu.forEach(l => l.classList.remove('ativo'));
                
                // Adiciona ao clicado
                this.classList.add('ativo');
                
                const targetId = this.id.replace('link-', '');
                
                // Navegação por seções
                if (targetId === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (targetId === 'contato') {
                    window.location.href = 'teste-gratis.html';
                } else {
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
        
        // Botão Teste Grátis
        if (btnTeste) {
            btnTeste.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'teste-gratis.html';
            });
        }
        
        // Botões CTA
        document.querySelectorAll('.btn-primario, .btn-cta-primario').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.href.includes('teste-gratis')) return;
                e.preventDefault();
                window.location.href = 'teste-gratis.html';
            });
        });
    }
    
    // ===== ANIMAÇÕES AO SCROLL =====
    function configurarAnimacoes() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animar');
                }
            });
        }, observerOptions);
        
        // Observar elementos para animação
        document.querySelectorAll('.beneficio-card, .tech-card, .passo-fluxo').forEach(el => {
            observer.observe(el);
        });
    }
    
    // ===== DASHBOARD DINÂMICO =====
    function atualizarDashboard() {
        const dashboard = document.getElementById('ia-demo');
        if (!dashboard) return;
        
        const metricas = [
            { numero: Math.floor(Math.random() * 5) + 1, label: 'Pacientes ativos' },
            { numero: Math.floor(Math.random() * 30) + 70, label: 'Adesão' },
            { numero: Math.floor(Math.random() * 4), label: 'Alertas hoje' }
        ];
        
        const mensagens = [
            "Monitorando padrões alimentares...",
            "Analisando dados biométricos...",
            "Processando relatórios diários...",
            "Detectando oportunidades de intervenção..."
        ];
        
        setInterval(() => {
            // Atualiza métricas
            metricas.forEach((metrica, index) => {
                if (Math.random() > 0.7) { // 30% chance de mudar
                    const elemento = dashboard.querySelectorAll('.dashboard-numero')[index];
                    if (elemento) {
                        elemento.style.opacity = '0';
                        setTimeout(() => {
                            elemento.textContent = metrica.numero = Math.floor(Math.random() * 5) + 1;
                            elemento.style.opacity = '1';
                        }, 300);
                    }
                }
            });
            
            // Atualiza mensagem
            if (Math.random() > 0.8) { // 20% chance de mudar mensagem
                const msgElement = dashboard.querySelector('.dashboard-msg span');
                if (msgElement) {
                    msgElement.textContent = mensagens[Math.floor(Math.random() * mensagens.length)];
                }
            }
        }, 5000); // Atualiza a cada 5 segundos
    }
    
    // ===== EVENTOS DA LINHA DO TEMPO =====
    function configurarLinhaTempo() {
        const eventos = document.querySelectorAll('.evento');
        
        eventos.forEach(evento => {
            evento.addEventListener('click', function() {
                this.classList.toggle('expandido');
                
                // Anima a expansão
                const iaInfo = this.querySelector('.evento-ia');
                if (iaInfo) {
                    iaInfo.style.display = iaInfo.style.display === 'none' ? 'flex' : 'none';
                }
            });
        });
    }
    
    // ===== CABEÇALHO DESCENTRALIZADO =====
    function descentralizarCabecalho() {
        const cabecalhoContainer = document.querySelector('.cabecalho .cabecalho-container');
        
        if (!cabecalhoContainer) return;
        
        const larguraTela = window.innerWidth;
        
        cabecalhoContainer.style.maxWidth = 'none';
        cabecalhoContainer.style.width = '100%';
        
        if (larguraTela > 1400) {
            cabecalhoContainer.style.padding = '0 80px';
        } else if (larguraTela > 1200) {
            cabecalhoContainer.style.padding = '0 60px';
        } else if (larguraTela > 900) {
            cabecalhoContainer.style.padding = '0 40px';
        } else if (larguraTela > 768) {
            cabecalhoContainer.style.padding = '0 30px';
        } else if (larguraTela > 480) {
            cabecalhoContainer.style.padding = '0 20px';
        } else {
            cabecalhoContainer.style.padding = '0 15px';
        }
        
        // Garantir espaçamento no menu
        const menuLista = cabecalhoContainer.querySelector('.menu-lista');
        if (menuLista) {
            if (larguraTela > 1200) {
                menuLista.style.gap = '40px';
            } else if (larguraTela > 768) {
                menuLista.style.gap = '30px';
            } else {
                menuLista.style.gap = '20px';
            }
        }
    }
    
    // ===== MODAL TESTE GRÁTIS =====
    function configurarModal() {
        const modal = document.getElementById('modalTeste');
        
        // Mostrar modal após 10 segundos
        setTimeout(() => {
            if (modal && !sessionStorage.getItem('modalVisto')) {
                modal.style.display = 'flex';
            }
        }, 10000);
        
        // Fechar modal
        window.fecharModal = function() {
            modal.style.display = 'none';
            sessionStorage.setItem('modalVisto', 'true');
        };
        
        // Fechar ao clicar fora
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                fecharModal();
            }
        });
    }
    
    // ===== FORMULÁRIO CTA =====
    function configurarFormularioCTA() {
        const form = document.querySelector('.cta-form');
        if (!form) return;
        
        const inputEmail = form.querySelector('.input-email');
        const btnCta = form.querySelector('.btn-cta-final');
        
        btnCta.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (inputEmail.value && isValidEmail(inputEmail.value)) {
                // Animação de sucesso
                this.innerHTML = '<i class="fas fa-check"></i> Email Enviado!';
                this.style.background = 'var(--success)';
                this.disabled = true;
                
                // Aqui você enviaria para seu backend
                console.log('Email capturado:', inputEmail.value);
                
                // Redireciona para teste grátis após 2 segundos
                setTimeout(() => {
                    window.location.href = 'teste-gratis.html';
                }, 2000);
            } else {
                inputEmail.style.borderColor = 'var(--danger)';
                inputEmail.focus();
            }
        });
        
        inputEmail.addEventListener('input', function() {
            this.style.borderColor = '';
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== CONTADOR DE NUTRICIONISTAS =====
    function atualizarContador() {
        const contadorElement = document.querySelector('.contador-nutricionistas');
        if (!contadorElement) return;
        
        let count = 500;
        const target = 500 + Math.floor(Math.random() * 50);
        
        const interval = setInterval(() => {
            count++;
            contadorElement.textContent = count;
            
            if (count >= target) {
                clearInterval(interval);
            }
        }, 100);
    }
    
    // ===== INICIALIZAÇÃO =====
    function init() {
        console.log('🚀 Trinution - Software de Nutrição com IA');
        
        configurarNavegacao();
        configurarAnimacoes();
        configurarLinhaTempo();
        configurarFormularioCTA();
        configurarModal();
        descentralizarCabecalho();
        
        // Iniciar dashboard após 1 segundo
        setTimeout(atualizarDashboard, 1000);
        
        // Reaplicar ajustes quando redimensionar
        window.addEventListener('resize', descentralizarCabecalho);
        
        // Atualizar contador
        atualizarContador();
    }
    
    // Iniciar tudo
    init();
});

// Adicionar estilos para animações
const style = document.createElement('style');
style.textContent = `
    .animar {
        animation: entradaSuave 0.6s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes entradaSuave {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .beneficio-card:nth-child(1) { animation-delay: 0.1s; }
    .beneficio-card:nth-child(2) { animation-delay: 0.2s; }
    .beneficio-card:nth-child(3) { animation-delay: 0.3s; }
    .beneficio-card:nth-child(4) { animation-delay: 0.4s; }
    
    .tech-card:nth-child(1) { animation-delay: 0.1s; }
    .tech-card:nth-child(2) { animation-delay: 0.2s; }
    .tech-card:nth-child(3) { animation-delay: 0.3s; }
    .tech-card:nth-child(4) { animation-delay: 0.4s; }
    
    .passo-fluxo:nth-child(1) { animation-delay: 0.1s; }
    .passo-fluxo:nth-child(2) { animation-delay: 0.2s; }
    .passo-fluxo:nth-child(3) { animation-delay: 0.3s; }
    .passo-fluxo:nth-child(4) { animation-delay: 0.4s; }
`;
document.head.appendChild(style);
