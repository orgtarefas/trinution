// home.js - Versão com IA NutriAI

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do menu
    const linkHome = document.getElementById('link-home');
    const linkSobre = document.getElementById('link-sobre');
    const linkProjetos = document.getElementById('link-projetos');
    const linkContato = document.getElementById('link-contato');
    
    // Elementos da demonstração
    const btnSimular = document.getElementById('btn-simular');
    const resultadoIA = document.getElementById('resultado-ia');
    const loadingIA = document.getElementById('loading-ia');
    
    // Dados para simulação de IA
    const casosClinicos = {
        gestante: {
            titulo: "Gestante com Náuseas (8 semanas)",
            analise: "IA detectou padrão de deficiência de vitamina B6 e ferro. Náuseas intensificadas por longos períodos sem comer.",
            plano: [
                "Fracionamento: 6 refeições/dia (a cada 3h)",
                "Proteína magra antes de carboidratos simples",
                "Suplementação: B6 25mg + Ferro quelato 30mg",
                "Líquidos entre refeições, não durante"
            ],
            alertas: [
                "⚠️ Risco de anemia gestacional detectado",
                "📈 Monitorar ganho de peso: abaixo do esperado",
                "💡 Sugerir acupuntura para náuseas"
            ],
            resultadoEsperado: "Redução de náuseas em 72h, níveis de ferritina normalizados em 3 semanas"
        },
        diabetico: {
            titulo: "Diabético Tipo 2 - HbA1c: 8.2%",
            analise: "Padrão de picos glicêmicos pós-almoço. Consumo excessivo de carboidratos refinados no jantar.",
            plano: [
                "Inverter pirâmide alimentar: proteínas primeiro",
                "Adicionar 15g de fibras solúveis antes das refeições",
                "Janela alimentar: 12h (8h-20h)",
                "Substituir arroz branco por quinoa/courgette"
            ],
            alertas: [
                "🔴 ALERTA: Padrão compatível com neuropatia precoce",
                "💊 Sugerir exame de creatinina e microalbuminúria",
                "🕒 Encaminhar para endocrinologista"
            ],
            resultadoEsperado: "Redução de 1.5% na HbA1c em 90 dias, menos picos glicêmicos"
        },
        bariatrico: {
            titulo: "Pós-Bariátrico (3 meses) - Perda de Peso Estagnada",
            analise: "IA identificou consumo calórico insuficiente para manutenção metabólica. Baixa ingestão proteica.",
            plano: [
                "Aumentar proteína para 1.5g/kg peso ideal",
                "Suplementação: Colágeno + BCAA entre refeições",
                "Incluir 30g de gordura saudável/dia",
                "Monitorar hidratação (2.5L/dia)"
            ],
            alertas: [
                "⚠️ Risco de deficiência de vitamina B12 e ferro",
                "📉 Metabolismo 20% abaixo do esperado",
                "💪 Priorizar treino de força sobre cardio"
            ],
            resultadoEsperado: "Retomada de perda de peso em 2 semanas, ganho de massa magra"
        },
        atleta: {
            titulo: "Atleta Amador - Performance em Platô",
            analise: "Timing nutricional inadequado. Falta de carboidratos no período peri-treino.",
            plano: [
                "Carboidratos: 5g/kg/dia (60% complexos)",
                "Proteína: 2g/kg/dia distribuída em 5 refeições",
                "Suplementação: Creatina 5g/dia + Beta-alanina",
                "Hidratação com eletrólitos durante treino"
            ],
            alertas: [
                "⚡ Recuperação muscular comprometida",
                "🕒 Timing: 30g proteína pós-treino imediato",
                "📊 Sugerir DEXA para composição corporal"
            ],
            resultadoEsperado: "Aumento de 15% em performance em 4 semanas, melhor recuperação"
        },
        veg: {
            titulo: "Vegetariano com Fadiga Crônica",
            analise: "Deficiência combinada de B12, ferro e ômega-3. Consumo excessivo de carboidratos.",
            plano: [
                "Suplementação essencial: B12 1000mcg + DHA 500mg",
                "Combinar fontes de ferro com vitamina C",
                "Incluir algas e levedura nutricional",
                "Reduzir fitatos (deixar leguminosas de molho)"
            ],
            alertas: [
                "🔴 Níveis de B12 críticos (<150 pg/mL)",
                "🩸 Anemia ferropriva detectada pelo padrão alimentar",
                "🧠 Cognição pode estar comprometida"
            ],
            resultadoEsperado: "Melhora energética em 10-14 dias, normalização laboratorial em 8 semanas"
        }
    };
    
    // Configuração de navegação
    function configurarNavegacao() {
        linkHome.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            atualizarMenuAtivo(this);
        });
        
        linkSobre.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('para-profissionais');
            target.scrollIntoView({ behavior: 'smooth' });
            atualizarMenuAtivo(this);
        });
        
        linkProjetos.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('tecnologia');
            target.scrollIntoView({ behavior: 'smooth' });
            atualizarMenuAtivo(this);
        });
        
        linkContato.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('demo');
            target.scrollIntoView({ behavior: 'smooth' });
            atualizarMenuAtivo(this);
        });
        
        // Botão Teste Grátis
        document.querySelector('.btn-destaque').addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.cta-final').scrollIntoView({ behavior: 'smooth' });
        });
        
        // Botões CTA
        document.querySelector('.btn-primario').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('demo').scrollIntoView({ behavior: 'smooth' });
        });
        
        document.querySelector('.btn-secundario').addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('para-profissionais').scrollIntoView({ behavior: 'smooth' });
        });
        
        // Botão CTA final
        document.querySelector('.btn-cta-final').addEventListener('click', function(e) {
            e.preventDefault();
            const email = document.querySelector('.input-email').value;
            if (email && email.includes('@')) {
                alert(`🎉 Obrigado! Um link de acesso será enviado para: ${email}\n\nExperimente por 7 dias grátis!`);
                document.querySelector('.input-email').value = '';
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
    }
    
    function atualizarMenuAtivo(elementoClicado) {
        // Remove classe ativa de todos
        document.querySelectorAll('.menu-link').forEach(link => {
            link.classList.remove('ativo');
        });
        
        // Adiciona ao clicado
        elementoClicado.classList.add('ativo');
    }
    
    // Demonstração Interativa da IA
    function configurarDemonstracaoIA() {
        if (!btnSimular) return;
        
        btnSimular.addEventListener('click', function() {
            const perfil = document.getElementById('perfil-paciente').value;
            const desafio = document.getElementById('desafio-alimentar').value;
            const objetivo = document.getElementById('objetivo').value;
            
            // Mostrar loading
            resultadoIA.innerHTML = '';
            loadingIA.style.display = 'flex';
            resultadoIA.appendChild(loadingIA);
            
            // Simular processamento da IA
            setTimeout(() => {
                gerarResultadoIA(perfil, desafio, objetivo);
            }, 1500);
        });
    }
    
    function gerarResultadoIA(perfil, desafio, objetivo) {
        const caso = casosClinicos[perfil];
        
        // Remover loading
        loadingIA.style.display = 'none';
        
        // Criar resultado
        const resultadoHTML = `
            <div class="resultado-detalhado">
                <div class="resultado-header">
                    <h4>${caso.titulo}</h4>
                    <div class="ia-tag">
                        <i class="fas fa-brain"></i> Análise da NutriAI
                    </div>
                </div>
                
                <div class="analise-ia">
                    <h5><i class="fas fa-search"></i> Análise da IA:</h5>
                    <p>${caso.analise}</p>
                    
                    <h5><i class="fas fa-utensils"></i> Plano Gerado (2 minutos):</h5>
                    <ul class="plano-lista">
                        ${caso.plano.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    
                    <div class="alertas-container">
                        <h5><i class="fas fa-bell"></i> Alertas da IA:</h5>
                        <div class="alertas-grid">
                            ${caso.alertas.map(alerta => `
                                <div class="alerta ${alerta.includes('🔴') ? 'alerta-critico' : 'alerta-aviso'}">
                                    ${alerta}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="previsao-container">
                        <h5><i class="fas fa-chart-line"></i> Previsão da IA:</h5>
                        <div class="previsao-card">
                            <i class="fas fa-bullseye"></i>
                            <span>${caso.resultadoEsperado}</span>
                        </div>
                    </div>
                    
                    <div class="tempo-economizado">
                        <i class="fas fa-clock"></i>
                        <strong>Tempo economizado: 1h 58min</strong> (vs. método tradicional)
                    </div>
                </div>
            </div>
        `;
        
        resultadoIA.innerHTML = resultadoHTML;
        
        // Adicionar animação
        resultadoIA.style.opacity = '0';
        resultadoIA.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultadoIA.style.transition = 'all 0.5s ease';
            resultadoIA.style.opacity = '1';
            resultadoIA.style.transform = 'translateY(0)';
        }, 10);
        
        // Atualizar dashboard ao vivo
        atualizarDashboardAoVivo(perfil);
    }
    
    function atualizarDashboardAoVivo(perfil) {
        const dashboard = document.getElementById('ia-demo');
        if (!dashboard) return;
        
        const metricas = {
            gestante: { tempo: "1h 45min", pacientes: "3", alertas: "2" },
            diabetico: { tempo: "2h 10min", pacientes: "5", alertas: "3" },
            bariatrico: { tempo: "1h 30min", pacientes: "2", alertas: "1" },
            atleta: { tempo: "1h 55min", pacientes: "4", alertas: "2" },
            veg: { tempo: "2h 05min", pacientes: "3", alertas: "3" }
        };
        
        const metrica = metricas[perfil];
        
        dashboard.innerHTML = `
            <div class="dashboard-metricas">
                <div class="dashboard-item">
                    <div class="dashboard-numero">${metrica.tempo}</div>
                    <div class="dashboard-label">Tempo economizado</div>
                </div>
                <div class="dashboard-item">
                    <div class="dashboard-numero">${metrica.pacientes}</div>
                    <div class="dashboard-label">Pacientes analisados</div>
                </div>
                <div class="dashboard-item">
                    <div class="dashboard-numero">${metrica.alertas}</div>
                    <div class="dashboard-label">Alertas críticos</div>
                </div>
            </div>
            <div class="dashboard-msg">
                <i class="fas fa-sync-alt fa-spin"></i>
                IA processando dados em tempo real...
            </div>
        `;
    }
    
    // Configurar cabeçalho descentralizado (mantido da versão anterior)
    function descentralizarCabecalho() {
        const cabecalhoContainer = document.querySelector('.cabecalho .cabecalho-container');
        
        if (!cabecalhoContainer) return;
        
        const larguraTela = window.innerWidth;
        
        cabecalhoContainer.style.maxWidth = 'none';
        cabecalhoContainer.style.width = '100%';
        
        if (larguraTela > 1400) {
            cabecalhoContainer.style.padding = '0 100px';
        } else if (larguraTela > 1200) {
            cabecalhoContainer.style.padding = '0 80px';
        } else if (larguraTela > 900) {
            cabecalhoContainer.style.padding = '0 60px';
        } else if (larguraTela > 768) {
            cabecalhoContainer.style.padding = '0 50px';
        } else if (larguraTela > 480) {
            cabecalhoContainer.style.padding = '0 30px';
        } else {
            cabecalhoContainer.style.padding = '0 20px';
        }
        
        // Garantir espaçamento no menu
        const menuLista = cabecalhoContainer.querySelector('.menu-lista');
        if (menuLista && larguraTela > 1200) {
            menuLista.style.gap = '50px';
        }
    }
    
    // Efeitos visuais
    function configurarEfeitosVisuais() {
        // Animação ao scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animar-entrada');
                }
            });
        }, observerOptions);
        
        // Observar elementos para animação
        document.querySelectorAll('.recurso-card, .beneficio, .etapa').forEach(el => {
            observer.observe(el);
        });
        
        // Efeito digitação no hero
        const heroTitulo = document.querySelector('.hero-titulo');
        if (heroTitulo) {
            setTimeout(() => {
                heroTitulo.style.animation = 'digitar 3s steps(40, end)';
            }, 500);
        }
    }
    
    // Inicialização
    function init() {
        console.log('🚀 NutriAI - Software Revolucionário');
        console.log('IA para nutricionistas carregada com sucesso!');
        
        configurarNavegacao();
        configurarDemonstracaoIA();
        descentralizarCabecalho();
        configurarEfeitosVisuais();
        
        // Dashboard inicial
        atualizarDashboardAoVivo('gestante');
        
        // Reaplicar ajustes quando redimensionar
        window.addEventListener('resize', descentralizarCabecalho);
        
        // Forçar reajuste após carregamento
        setTimeout(() => {
            descentralizarCabecalho();
        }, 100);
    }
    
    // Iniciar tudo
    init();
});
