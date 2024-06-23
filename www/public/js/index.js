window.onload = function () {
    atualizarHistorico();

    const nomeInput = document.getElementById('nomeInput');
    const initialChar = '@';
    
    nomeInput.addEventListener('focus', function() {
        if (!nomeInput.value.startsWith(initialChar)) {
            nomeInput.value = initialChar + nomeInput.value;
        }

        nomeInput.setSelectionRange(nomeInput.value.length, nomeInput.value.length);
    });

    nomeInput.addEventListener('input', function(e) {
        if (!e.target.value.startsWith(initialChar)) {
            e.target.value = initialChar + e.target.value.replace(new RegExp(initialChar, 'g'), '');
        }

        nomeInput.setSelectionRange(nomeInput.value.length, nomeInput.value.length);
    });

    nomeInput.addEventListener('keydown', function(e) {
        const pos = nomeInput.selectionStart;
        if ((pos === 1 && e.key === 'Backspace') || (pos === 0 && e.key === initialChar)) {
            e.preventDefault();
        }
    });
};


function atualizarHistorico() {
    fetch('https://geniodatattoo.com.br/logs') 
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data); 
        const historicoContent = document.getElementById('historicoContent');
        historicoContent.innerHTML = ''; 

        data.sort((a, b) => new Date(b.log_date) - new Date(a.log_date));

        data.forEach(item => {
            
            if (item.username && item.award && item.log_date) {
                historicoContent.innerHTML += `<p>${item.username} ganhou: <b>${item.award}</b> <br>em ${new Date(item.log_date).toLocaleString()}</p>`;
            } else {
                console.error('Item com estrutura inesperada:', item);
            }
        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

// Botão de compartilhamento do WhatsApp
document.querySelector('#buttonShareWhatsApp').addEventListener('click', function () {
    const nomeUsuario = document.getElementById('nomeInput').value;

    obterHistoricoData(nomeUsuario)
        .then(historicoData => {
            if (!historicoData || historicoData.length === 0) {
                alert('Histórico de prêmios não encontrado para este usuário.');
                return;
            }

            const timestampMaisAntigo = Math.min(...historicoData);

            fetch('https://geniodatattoo.com.br/logs') // Substitua 'host' pelo seu nome de host ou endereço IP
                .then(response => response.json())
                .then(logs => {
                    const premioMaisAntigo = logs.find(log => new Date(log.log_date).getTime() === timestampMaisAntigo).award;
                    compartilharWhatsApp(premioMaisAntigo, nomeUsuario);
                });
        });
});

// Botão de compartilhamento do Instagram
document.querySelector('#buttonShareInstagram').addEventListener('click', function () {
    const nomeUsuario = document.getElementById('nomeInput').value;

    obterHistoricoData(nomeUsuario)
        .then(historicoData => {
            if (!historicoData || historicoData.length === 0) {
                alert('Histórico de prêmios não encontrado para este usuário.');
                return;
            }

            const timestampMaisAntigo = Math.min(...historicoData);

            fetch('https://geniodatattoo.com.br/logs') // Substitua 'host' pelo seu nome de host ou endereço IP
                .then(response => response.json())
                .then(logs => {
                    const premioMaisAntigo = logs.find(log => new Date(log.log_date).getTime() === timestampMaisAntigo).award;
                    compartilharInstagram(premioMaisAntigo, nomeUsuario);
                });
        });
});

// Função para obter o histórico de timestamps baseado no nome
function obterHistoricoData(nome) {
    return fetch('https://geniodatattoo.com.br/logs') // Substitua 'host' pelo seu nome de host ou endereço IP
        .then(response => response.json())
        .then(logs => {
            const logsDoUsuario = logs.filter(log => log.username === nome);
            const timestamps = logsDoUsuario.map(log => new Date(log.log_date).getTime());
            return timestamps;
        });
}


function rodarRoleta(premioGanho) {
    const premios = ["Tattoo Grátis", "Chaveiro", "Desconto 30%", "Desconto 20%", "Desconto 10%", "Nada, infelizmente"];
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.classList.remove('hidden');
    const shareContainer = document.querySelector('.share-container');
    shareContainer.querySelector('h2').classList.add('hidden');
    shareContainer.querySelector('#botoesCompartilhar').classList.add('hidden');
    let index = 0;
    let tempoDecorrido = 0;

    const animationInterval = setInterval(() => {
        resultadoDiv.textContent = premios[index]; 
        index = (index + 1) % premios.length; 
        tempoDecorrido += 100; 

        
        if (tempoDecorrido >= 5000) {
            clearInterval(animationInterval);
            resultadoDiv.textContent = `Seu prêmio é: ${premioGanho}`;
	    shareContainer.classList.remove('hidden');
        }
    }, 100);
}

function compartilharWhatsApp(premio, nome) {
    const mensagem = `Nome: ${nome}\nPrêmio Resgatado: ${premio}`;
    const url = `https://api.whatsapp.com/send?phone=553193283063&text=${encodeURIComponent(mensagem)}`;
    window.open(url);
}

function compartilharInstagram(premio, nome) {
    const mensagem = `Nome: ${nome}\nPrêmio Resgatado: ${premio}`;
    const url = `https://www.instagram.com/direct/t/17845908371951380?text=${encodeURIComponent(mensagem)}`;
    window.location.href = url;
}

document.getElementById('buttonPremio').addEventListener('click', function () {
    const nome = document.getElementById('nomeInput').value;
    if (!nome) {
        alert('Por favor, insira seu nome.');
        return;
    }

    const buttonPremioImg = document.getElementById('buttonPremioImg');
    
    buttonPremioImg.classList.add('hidden');
    setTimeout(() => {
        buttonPremioImg.src = '/img/lampadaGif.GIF';
        buttonPremioImg.classList.remove('hidden');
    }, 300); 

    const gifDuration = 2300; 

    setTimeout(() => {
        buttonPremioImg.classList.add('hidden');
        setTimeout(() => {
            buttonPremioImg.src = '/img/fumaca.png';
            buttonPremioImg.classList.remove('hidden');
            buttonPremioImg.classList.add('fumaca'); // Adiciona a classe para definir o tamanho
        }, 300); 

        fetch('https://geniodatattoo.com.br/gerarPremio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome })
        })
        .then(response => response.json())
        .then(data => {
            rodarRoleta(data.premio);
            setTimeout(atualizarHistorico, 5000);
        });
    }, gifDuration);
});

document.getElementById('helpIcon').addEventListener('click', function () {
    const nomeInput = document.getElementById('nomeInput');

    tooltip = document.getElementById('helpTooltip');
    if (tooltip.style.display === 'block') {
        tooltip.style.display = 'none';
    } else {
        tooltip.style.display = 'block';
    }
});
