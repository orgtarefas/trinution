// Teste Grátis Trinution - Lógica Completa
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const etapas = document.querySelectorAll('.etapa');
    const passos = document.querySelectorAll('.passo');
    const btnProximo = document.getElementById('btnProximo');
    const btnVoltar = document.getElementById('btnVoltar');
    
    // Dados do usuário
    let dadosUsuario = {
        nome: '',
        idade: '',
        altura: '',
        peso: '',
        wearable: '',
        objetivo: '',
        metaPeso: '',
        metaMusculo: ''
    };
    
    // Configuração inicial
    let etapaAtual = 1;
    atualizarProgresso();
    
    // ======================
    // FUNÇÕES DE NAVEGAÇÃO
    // ======================
    
    function irParaEtapa(numero) {
        // Esconde etapa atual
        document.querySelector(`#etapa${etapaAtual}`).classList.remove('ativa');
        document.querySelector(`.passo[data-passo="${etapaAtual}"]`).classList.remove('ativo');
        
        // Atualiza etapa
        etapaAtual = numero;
        
        // Mostra nova etapa
        document.querySelector(`#etapa${etapaAtual}`).classList.add('ativa');
        document.querySelector(`.passo[data-passo="${etapaAtual}"]`).classList.add('ativo');
        
        // Atualiza botões
        atualizarBotoes();
        
        // Se for etapa 3 (análise), processa dados
        if (etapaAtual === 3) {
            processarAnalise();
            setTimeout(() => {
                irParaEtapa(4);
            }, 3000); // Simula processamento por 3 segundos
        }
    }
    
    function atualizarProgresso() {
        passos.forEach((passo, index) => {
            const passoNumero = parseInt(passo.dataset.passo);
            if (passoNumero < etapaAtual) {
                passo.classList.add('ativo');
            } else if (passoNumero === etapaAtual) {
                passo.classList.add('ativo');
            } else {
                passo.classList.remove('ativo');
            }
        });
    }
    
    function atualizarBotoes() {
        // Botão voltar
        if (etapaAtual === 1) {
            btnVoltar.style.display = 'none';
        } else {
            btnVoltar.style.display = 'flex';
        }
        
        // Botão próximo
        if (etapaAtual === 4) {
            btnProximo.style.display = 'none';
            btnVoltar.style.display = 'none';
        } else {
            btnProximo.style.display = 'flex';
            atualizarTextoBotaoProximo();
            validarEtapaAtual();
        }
    }
    
    function atualizarTextoBotaoProximo() {
        if (etapaAtual === 1 || etapaAtual === 2) {
            btnProximo.innerHTML = 'Continuar <i class="fas fa-arrow-right"></i>';
        } else if (etapaAtual === 3) {
            btnProximo.innerHTML = 'Processando... <i class="fas fa-spinner fa-spin"></i>';
            btnProximo.disabled = true;
        }
    }
    
    // ======================
    // VALIDAÇÃO DE DADOS
    // ======================
    
    function validarEtapa1() {
        const nome = document.getElementById('nome').value.trim();
        const idade = document.getElementById('idade').value;
        const altura = document.getElementById('altura').value;
        const peso = document.getElementById('peso').value;
        
        // Salva dados
        dadosUsuario.nome = nome;
        dadosUsuario.idade = idade;
        dadosUsuario.altura = altura;
        dadosUsuario.peso = peso;
        dadosUsuario.wearable = document.getElementById('wearable').value;
        
        return nome.length >= 2 && 
               idade >= 15 && idade <= 100 &&
               altura >= 100 && altura <= 250 &&
               peso >= 30 && peso <= 300;
    }
    
    function validarEtapa2() {
        const objetivo = document.getElementById('objetivo').value;
        dadosUsuario.objetivo = objetivo;
        
        if (objetivo === 'emagrecer') {
            const metaPesoSelecionada = document.querySelector('.opcao-peso.selecionada');
            if (metaPesoSelecionada) {
                dadosUsuario.metaPeso = metaPesoSelecionada.dataset.peso;
                return true;
            }
            return false;
        } else if (objetivo === 'ganho') {
            const metaMusculo = document.getElementById('meta-musculo').value;
            dadosUsuario.metaMusculo = metaMusculo;
            return metaMusculo !== '';
        } else if (objetivo) {
            return true; // Outros objetivos não precisam de meta específica
        }
        
        return false;
    }
    
    function validarEtapaAtual() {
        let valido = false;
        
        switch(etapaAtual) {
            case 1:
                valido = validarEtapa1();
                break;
            case 2:
                valido = validarEtapa2();
                break;
            default:
                valido = true;
        }
        
        btnProximo.disabled = !valido;
        return valido;
    }
    
    // ======================
    // LÓGICA DE OBJETIVOS
    // ======================
    
    function configurarObjetivos() {
        const selectObjetivo = document.getElementById('objetivo');
        const grupoPeso = document.getElementById('grupo-peso');
        const grupoMusculo = document.getElementById('grupo-musculo');
        
        selectObjetivo.addEventListener('change', function() {
            // Esconde todos os grupos
            grupoPeso.style.display = 'none';
            grupoMusculo.style.display = 'none';
            
            // Remove seleções anteriores
            document.querySelectorAll('.opcao-peso').forEach(opcao => {
                opcao.classList.remove('selecionada');
            });
            document.getElementById('meta-musculo').value = '';
            
            // Mostra grupo específico
            if (this.value === 'emagrecer') {
                grupoPeso.style.display = 'block';
            } else if (this.value === 'ganho') {
                grupoMusculo.style.display = 'block';
            }
            
            validarEtapaAtual();
        });
        
        // Configura seleção de peso
        document.querySelectorAll('.opcao-peso').forEach(opcao => {
            opcao.addEventListener('click', function() {
                document.querySelectorAll('.opcao-peso').forEach(o => {
                    o.classList.remove('selecionada');
                });
                this.classList.add('selecionada');
                validarEtapaAtual();
            });
        });
        
        // Configura seleção de músculo
        document.getElementById('meta-musculo').addEventListener('change', validarEtapaAtual);
    }
    
    // ======================
    // ANÁLISE DA IA
    // ======================
    
    function processarAnalise() {
        // Calcula IMC
        const alturaMetros = dadosUsuario.altura / 100;
        const imc = dadosUsuario.peso / (alturaMetros * alturaMetros);
        
        // Determina categoria IMC
        let categoriaIMC = '';
        if (imc < 18.5) categoriaIMC = 'Abaixo do peso';
        else if (imc < 25) categoriaIMC = 'Peso normal';
        else if (imc < 30) categoriaIMC = 'Sobrepeso';
        else categoriaIMC = 'Obesidade';
        
        // Calcula metabolismo basal (fórmula simplificada)
        let metabolismoBasal = 0;
        if (dadosUsuario.idade && dadosUsuario.peso && dadosUsuario.altura) {
            // Fórmula de Mifflin-St Jeor (aproximada)
            if (parseInt(dadosUsuario.idade) > 18) {
                metabolismoBasal = (10 * dadosUsuario.peso) + (6.25 * dadosUsuario.altura) - (5 * dadosUsuario.idade);
                if (Math.random() > 0.5) metabolismoBasal += 5; // Simula sexo masculino
                else metabolismoBasal -= 161; // Simula sexo feminino
            }
        }
        
        // Gera análise personalizada baseada nos dados
        let analise = '';
        let planoItens = '';
        
        // Saudação personalizada
        document.getElementById('nome-resultado').textContent = dadosUsuario.nome.split(' ')[0];
        
        // Análise baseada no objetivo
        if (dadosUsuario.objetivo === 'emagrecer') {
            analise = gerarAnaliseEmagrecimento(imc, categoriaIMC, metabolismoBasal);
            planoItens = gerarPlanoEmagrecimento();
        } else if (dadosUsuario.objetivo === 'ganho') {
            analise = gerarAnaliseGanhoMassa(imc, categoriaIMC, metabolismoBasal);
            planoItens = gerarPlanoGanhoMassa();
        } else if (dadosUsuario.objetivo === 'energia') {
            analise = gerarAnaliseEnergia(imc, categoriaIMC, metabolismoBasal);
            planoItens = gerarPlanoEnergia();
        } else {
            analise = gerarAnaliseGeral(imc, categoriaIMC, metabolismoBasal);
            planoItens = gerarPlanoGeral();
        }
        
        // Adiciona informações de wearable se houver
        if (dadosUsuario.wearable && dadosUsuario.wearable !== 'nao') {
            analise += `<p><strong>📱 Integração com ${getWearableName(dadosUsuario.wearable)}:</strong> Podemos monitorar automaticamente seu sono, atividade e frequência cardíaca.</p>`;
        }
        
        // Insere no DOM
        document.getElementById('analise-detalhada').innerHTML = analise;
        document.getElementById('plano-itens').innerHTML = planoItens;
    }
    
    function gerarAnaliseEmagrecimento(imc, categoriaIMC, metabolismo) {
        const semanasEstimadas = dadosUsuario.metaPeso === '5' ? '6-8' : 
                                dadosUsuario.metaPeso === '10' ? '12-16' : '20+';
        
        return `
            <p><strong>📊 Seu IMC:</strong> ${imc.toFixed(1)} (${categoriaIMC})</p>
            <p><strong>⚡ Metabolismo estimado:</strong> ${metabolismo.toFixed(0)} calorias/dia</p>
            <p><strong>🎯 Meta:</strong> Perder ${dadosUsuario.metaPeso === 'mais10' ? 'mais de 10kg' : dadosUsuario.metaPeso + 'kg'}</p>
            <p><strong>⏱️ Tempo estimado:</strong> ${semanasEstimadas} semanas de forma saudável</p>
            <p><strong>💡 Insight da IA:</strong> Baseado em sua idade e altura, o déficit calórico ideal seria de 300-500 calorias/dia.</p>
        `;
    }
    
    function gerarPlanoEmagrecimento() {
        const planos = {
            '5': [
                { icone: 'fas fa-utensils', texto: 'Déficit de 300 calorias/dia com foco em proteínas' },
                { icone: 'fas fa-walking', texto: '10.000 passos diários + 3x musculação/semana' },
                { icone: 'fas fa-glass-water', texto: '2,5L de água + sono de 7-8h' },
                { icone: 'fas fa-apple-alt', texto: 'Monitorar consumo de açúcar (máx. 25g/dia)' }
            ],
            '10': [
                { icone: 'fas fa-utensils', texto: 'Déficit de 500 calorias com ciclos metabólicos' },
                { icone: 'fas fa-dumbbell', texto: 'Treino HIIT 3x + musculação 4x/semana' },
                { icone: 'fas fa-brain', texto: 'Técnicas de controle de compulsão' },
                { icone: 'fas fa-chart-line', texto: 'Ajuste progressivo a cada 15 dias' }
            ],
            'mais10': [
                { icone: 'fas fa-user-md', texto: 'Acompanhamento multidisciplinar recomendado' },
                { icone: 'fas fa-utensils', texto: 'Plano em fases: adaptação → perda → manutenção' },
                { icone: 'fas fa-heartbeat', texto: 'Monitoramento contínuo de saúde metabólica' },
                { icone: 'fas fa-users', texto: 'Suporte psicológico + grupo de apoio' }
            ]
        };
        
        const planoEscolhido = planos[dadosUsuario.metaPeso] || planos['5'];
        
        return planoEscolhido.map(item => `
            <div class="plano-item">
                <div class="plano-icone">
                    <i class="${item.icone}"></i>
                </div>
                <div>${item.texto}</div>
            </div>
        `).join('');
    }
    
    function gerarAnaliseGanhoMassa(imc, categoriaIMC, metabolismo) {
        return `
            <p><strong>📊 Seu IMC:</strong> ${imc.toFixed(1)} (${categoriaIMC})</p>
            <p><strong>⚡ Metabolismo estimado:</strong> ${metabolismo.toFixed(0)} calorias/dia</p>
            <p><strong>🎯 Meta:</strong> Ganhar ${dadosUsuario.metaMusculo}kg de massa muscular</p>
            <p><strong>💪 Proteína necessária:</strong> ${(dadosUsuario.peso * 2).toFixed(0)}g/dia</p>
            <p><strong>💡 Insight da IA:</strong> Superávit de 200-300 calorias com 40% de proteínas.</p>
        `;
    }
    
    function gerarPlanoGanhoMassa() {
        return [
            { icone: 'fas fa-drumstick-bite', texto: `Proteína: ${(dadosUsuario.peso * 2).toFixed(0)}g/dia (1,6-2,2g/kg)` },
            { icone: 'fas fa-dumbbell', texto: 'Progressive overload: aumentar carga semanalmente' },
            { icone: 'fas fa-bed', texto: 'Recuperação: 8h sono + 48h entre grupos musculares' },
            { icone: 'fas fa-vial', texto: 'Creatina 5g/dia + Beta-alanina (evidência A)' }
        ].map(item => `
            <div class="plano-item">
                <div class="plano-icone">
                    <i class="${item.icone}"></i>
                </div>
                <div>${item.texto}</div>
            </div>
        `).join('');
    }
    
    function gerarAnaliseEnergia(imc, categoriaIMC, metabolismo) {
        return `
            <p><strong>📊 Seu IMC:</strong> ${imc.toFixed(1)} (${categoriaIMC})</p>
            <p><strong>⚡ Metabolismo estimado:</strong> ${metabolismo.toFixed(0)} calorias/dia</p>
            <p><strong>🎯 Meta:</strong> Aumentar energia e vitalidade</p>
            <p><strong>🔋 Picos de energia:</strong> Alinhar refeições com ritmo circadiano</p>
            <p><strong>💡 Insight da IA:</strong> Foco em nutrientes energéticos: ferro, B12, CoQ10.</p>
        `;
    }
    
    function gerarPlanoEnergia() {
        return [
            { icone: 'fas fa-sun', texto: 'Exposição solar matinal: 15min ao acordar' },
            { icone: 'fas fa-seedling', texto: 'Alimentos energéticos: aveia, banana, quinoa, abacate' },
            { icone: 'fas fa-water', texto: 'Hidratação: 35ml/kg peso + eletrólitos' },
            { icone: 'fas fa-moon', texto: 'Higiene do sono: sem telas 1h antes de dormir' }
        ].map(item => `
            <div class="plano-item">
                <div class="plano-icone">
                    <i class="${item.icone}"></i>
                </div>
                <div>${item.texto}</div>
            </div>
        `).join('');
    }
    
    function gerarAnaliseGeral(imc, categoriaIMC, metabolismo) {
        return `
            <p><strong>📊 Seu IMC:</strong> ${imc.toFixed(1)} (${categoriaIMC})</p>
            <p><strong>⚡ Metabolismo estimado:</strong> ${metabolismo.toFixed(0)} calorias/dia</p>
            <p><strong>🎯 Objetivo:</strong> ${getObjetivoNome(dadosUsuario.objetivo)}</p>
            <p><strong>💡 Insight da IA:</strong> Manter IMC na faixa saudável reduz riscos em 60%.</p>
        `;
    }
    
    function gerarPlanoGeral() {
        return [
            { icone: 'fas fa-balance-scale', texto: 'Manter IMC entre 18,5 e 24,9' },
            { icone: 'fas fa-heartbeat', texto: 'Check-ups anuais: sangue + pressão arterial' },
            { icone: 'fas fa-apple-alt', texto: 'Dieta mediterrânea: base em vegetais' },
            { icone: 'fas fa-hiking', texto: '150min atividade moderada/semana' }
        ].map(item => `
            <div class="plano-item">
                <div class="plano-icone">
                    <i class="${item.icone}"></i>
                </div>
                <div>${item.texto}</div>
            </div>
        `).join('');
    }
    
    function getWearableName(codigo) {
        const wearables = {
            'apple': 'Apple Watch',
            'garmin': 'Garmin',
            'fitbit': 'Fitbit',
            'xiaomi': 'seu smartwatch'
        };
        return wearables[codigo] || 'seu dispositivo';
    }
    
    function getObjetivoNome(codigo) {
        const objetivos = {
            'emagrecer': 'Emagrecer',
            'ganho': 'Ganhar massa muscular',
            'energia': 'Mais energia',
            'saude': 'Melhorar saúde',
            'performance': 'Melhor performance'
        };
        return objetivos[codigo] || 'Melhorar qualidade de vida';
    }
    
    // ======================
    // FORMULÁRIO DE EMAIL
    // ======================
    
    function configurarFormEmail() {
        const form = document.getElementById('form-email');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email-usuario').value;
            
            if (validateEmail(email)) {
                // Simula envio
                const btn = form.querySelector('button');
                const originalText = btn.innerHTML;
                
                btn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
                btn.disabled = true;
                btn.style.background = '#00B894';
                
                // Aqui você enviaria para seu backend
                console.log('Email capturado:', email);
                console.log('Dados do usuário:', dadosUsuario);
                
                // Mostra mensagem de sucesso
                setTimeout(() => {
                    alert(`🎉 Obrigado, ${dadosUsuario.nome.split(' ')[0]}!\n\nSeu plano completo e acesso ao teste da Trinution serão enviados para:\n${email}\n\nVerifique sua caixa de entrada (e spam) em alguns minutos.`);
                    
                    // Redireciona para página principal após 3 segundos
                    setTimeout(() => {
                        window.location.href = 'index.html'; // Ajuste para sua página principal
                    }, 3000);
                }, 1000);
            } else {
                alert('Por favor, insira um e-mail válido.');
            }
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ======================
    // EVENT LISTENERS
    // ======================
    
    // Validação em tempo real
    document.querySelectorAll('#etapa1 input, #etapa1 select').forEach(input => {
        input.addEventListener('input', validarEtapaAtual);
    });
    
    // Botão próximo
    btnProximo.addEventListener('click', function() {
        if (etapaAtual < 4 && validarEtapaAtual()) {
            irParaEtapa(etapaAtual + 1);
        }
    });
    
    // Botão voltar
    btnVoltar.addEventListener('click', function() {
        if (etapaAtual > 1) {
            irParaEtapa(etapaAtual - 1);
        }
    });
    
    // Inicialização
    configurarObjetivos();
    configurarFormEmail();
    
    // Foca no primeiro campo
    setTimeout(() => {
        document.getElementById('nome').focus();
    }, 500);
});
