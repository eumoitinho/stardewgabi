// Função existente para arrastar janelas
function dragElement(windowId, headerId) {
    var windowElement = document.getElementById(windowId);
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(windowElement.id + headerId)) {
        document.getElementById(windowElement.id + headerId).onmousedown = dragMouseDown;
    } else {
        windowElement.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        windowElement.style.top = (windowElement.offsetTop - pos2) + "px";
        windowElement.style.left = (windowElement.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function windowHandler(windowId) {
    let windowElement = document.getElementById(windowId);
    let windowElementClassList = windowElement.classList;

    if (windowElementClassList.contains('opened')) {
        windowElementClassList.remove('opened');
        windowElementClassList.remove('maximized');
        setTimeout(() => windowElementClassList.add('hidded'), 600);
    } else {
        windowElementClassList.add('opened');
        windowElementClassList.remove('hidded');
        dragElement(windowId, `${windowId}Header`);
        // Remove a atribuição de src para evitar conflitos com textViewer
        if (windowId !== 'textViewer' && windowElement.tagName === 'IFRAME') {
            windowElement.src = 'https://www.bing.com/?cc=br';
        }
    }
}

function maximizeHandler(windowId) {
    let windowElementClassList = document.getElementById(windowId).classList;
    windowElementClassList.contains('maximized') ? windowElementClassList.remove('maximized') : windowElementClassList.add('maximized');
}

function bootingScreen() {
    setTimeout(() => document.getElementById('bootSection').classList.add('booting-finish'), 5000);
}

function setDate() {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    let currentMinute = currentDate.getMinutes();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;

    document.getElementById('currentHour').innerHTML = currentHour.toString().length === 1 ? `0${currentHour}` : currentHour;
    document.getElementById('currentMinute').innerHTML = currentMinute.toString().length === 1 ? `0${currentMinute}` : currentMinute;
    document.getElementById('currentDay').innerHTML = currentDay.toString().length === 1 ? `0${currentDay}` : currentDay;
    document.getElementById('currentMonth').innerHTML = currentMonth.toString().length === 1 ? `0${currentMonth}` : currentMonth;
    document.getElementById('currentYear').innerHTML = currentDate.getFullYear();

    setTimeout(() => setDate(), 1000);
}

document.addEventListener('DOMContentLoaded', function () {
    const fileIcons = document.querySelectorAll('.icon');

    fileIcons.forEach(icon => {
        icon.addEventListener('click', function (e) {
            // Impede conflitos com arrastar
            e.stopPropagation();
            const fileNameElement = this.querySelector('h1');
            if (fileNameElement) {
                const fileName = fileNameElement.textContent.trim();
                console.log('Icon clicado:', fileName); // Verifique no console
                if (fileName.endsWith('.txt')) {
                    openTextViewer(fileName);
                }
            }
        });
    });
});


function openTextViewer(fileName) {
    let fileContent = '';
    const fileData = {
        'distância.txt': 'Há duas semanas, nos encontramos por acaso no anon chat, e desde então, nossas conversas têm sido contínuas e cheias de drama kkkjk.\nNão fosse a distância: CWB x PV, 540 km, parece que o mapa do Brasil inteiro está entre a gente, como se fossemos o Pequeno Príncipe e a Rosa, divididos por planetas e galáxias. Mas, como ele aprendeu, “o essencial é invisível aos olhos; só se vê bem com o coração”. \nTalvez a distância física não seja tão importante quanto as palha assadas que a gente fala e as risadas exageradas por chat que compartilhamos, mesmo estando tão longe. Vou encontrar jeitos de superar isso, seja com mensagens ou planos futuros para encurtar esse caminho.\nA distância é uma coisa estranha. Às vezes, parece que não faz diferença nenhuma, outras vezes, incomoda pra caramba. A gente se fala todo dia, manda mensagem, dá risada, mas tem momentos em que dá vontade de simplesmente estar perto. Não precisar calcular horários (não que a gente precise kkk), não depender de uma tela. \n\n\n Continua...',
        'tistreza.txt': 'Sabe, às vezes bate uma tristezinha leve quando penso que não posso simplesmente aparecer aí pra te buscar do trabalho, sair no final de semana com você, ou só ficar junto sem fazer nada. É um sentimento passageiro, como as nuvens, elas vêm, mas logo passam, deixando o céu mais claro. Não é uma tristeza pesada, mas sim aquela saudade de algo que ainda está começando, como nossa amizade, e o meu amor.\n Ainda assim, penso que, mesmo separados, podemos manter essa conexão viva com nossas conversas e histórias, mesmo que nada do que eu pensei pra nos romanticamente aconteça.\nAnda assim, a tristeza permanece. Não daquela que sufoca, mas daquela que sussurra baixinho, lembrando que uma alma tão parecida com a minha está longe. E indecisa como eu.\n\nÉ estranho sentir essa conexão e, ao mesmo tempo, essa distância.Saber que nossas mentes poderiam se perder juntas em conversas intermináveis, que poderíamos rir das mesmas bobagens, compartilhar silêncios confortáveis… e, no entanto, estamos aqui, separados por caminhos que ainda não sabemos onde vão dar.\nMas talvez seja isso que torna tudo tão intenso.Essa mistura de saudade e incerteza, de desejo e cautela.Porque, no fundo, mesmo sem saber o que o futuro guarda, há algo em mim que não quer soltar essa conexão.Algo que diz que, de alguma forma, a gente ainda tem muito pra viver, nem que seja nas entrelinhas das nossas palavras.\n\n\n\nContinua ainda boboca..',
        'alegria.txt': 'Mas aí vem a parte boa: a felicidade que sinto por te conhecer. Hoje é o seu aniversário, e eu queria estar por perto, queria te dar um abraço apertado, desses que falam mais do que qualquer palavra. Mas mesmo a 540 km de distância, só de imaginar você feliz, nem que seja com esse presente bobo, ou por apenas fazer mais um ano de vida, eu já me sinto realizado. Estranho né, 2 semanas e eu sentir 3 cartas de palavras.Você merece o mundo!\nGabi, você é incrível. Não só pelo jeito fofinho, os medos irreais bobos, pela voz gostosa de ouvir, pelo seu jeito responsável com tudo. Você já passou por tanta coisa, já segurou o mundo nos braços quando precisava, abriu mão de coisas importantes, e mesmo assim continua sendo essa pessoa leve, engraçada, que transforma uma conversa simples em algo especial que faz eu dar risada pra tela kkkkjkkjk. Eu percebi isso desde o começo, quando nossas conversas começaram a fluir como se a gente se conhecesse há anos.\nEu queria que você soubesse que, independente de qualquer coisa, eu admiro você. E eu torço por você. De longe, de perto, de qualquer jeito. Eu vou estar na primeira fileira do filme da sua vida, acompanhando cada passo, aplaudindo cada conquista. E pode acreditar, ainda tem muita coisa incrível esperando por você.\nQuase te amo. Ou amo. Mas prefiro te dizer isso olhando nos seus olhos, sem pressa, porque algumas palavras só se sentem quando um coração bate do lado do outro, pessoalmente.\nEu fiz de tudo pra essas cartas não parecerem uma declaração, mas não tem como falar de você sem expressar carinho, admiração e amor. Você tá fazendo aniversário e o presente é meu pqp….\nEnfim, feliz vida, eu te desejo o mundo, você é incrível, eu quero você pra sempre do meu lado não importa como for, quero ver sua evolução e ver você feliz! Feliz aniversário bibi, eu gosto muito de você (com gosto de te amo)',
        // Adicione outros arquivos, se necessário.
    };

fileContent = fileData[fileName] || 'Não foi possível carregar o conteúdo deste arquivo.';
document.getElementById('fileContent').textContent = fileContent;

// Abre a janela textViewer
const textViewer = document.getElementById('textViewer');
textViewer.classList.remove('hidded');
textViewer.classList.add('opened');
textViewer.style.display = 'block';

// Ativa o recurso de arrastar na janela
dragElement('textViewer', 'textViewerHeader');
}





setDate();
bootingScreen();