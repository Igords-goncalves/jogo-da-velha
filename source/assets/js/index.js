const x = document.querySelector(".x")
const o = document.querySelector(".o")

const containerDeCaixas = document.querySelectorAll('.box')
const botoes = document.querySelectorAll("#botoes")

const mensagem = document.querySelector("#mensagem")
let textoDaMensagem = document.querySelector("#mensagem p")

 // Recomeca a partida

function recomecarPartidaDoZero() {
    document.querySelector("#recomecar").addEventListener("click", function() {
        location.reload()
    })
}
recomecarPartidaDoZero()


let player = 0
let ia = 0


function clicarEinserirSimboloTratado(containerDeCaixas) {

    containerDeCaixas.forEach(caixa => {
        caixa.addEventListener('click', () => {

            setTimeout(() => {
                inteligenciaArtificial(caixa, o)
            }, 1000)

            verificaJogadas(caixa, checarValorEdefinirSimbolo())
        })
    })
    
}
clicarEinserirSimboloTratado(containerDeCaixas) 


function verificaJogadas(caixa, simboloChecado) {

    if (caixa.childNodes.length === 0 && caixa.childNodes.length < 1) { 

        caixa.appendChild(simboloChecado.cloneNode(true))

        player === ia ? player++ : ia++
    }

    checarCondicaoDeVitoria()
}

function checarValorEdefinirSimbolo() {

    let simboloDaVariavel = ''

    player === ia ? simboloDaVariavel = x : simboloDaVariavel = o

    return simboloDaVariavel
}

function checarCondicaoDeVitoria() {

    const b1 = document.querySelector('#block-1')
    const b2 = document.querySelector('#block-2')
    const b3 = document.querySelector('#block-3')
    const b4 = document.querySelector('#block-4')
    const b5 = document.querySelector('#block-5')
    const b6 = document.querySelector('#block-6')
    const b7 = document.querySelector('#block-7')
    const b8 = document.querySelector('#block-8')
    const b9 = document.querySelector('#block-9')

    function automacaoCondicaoDeVitoria(caixaOcupada1, caixaOcupada2, caixaOcupada3, simbolo) {
        if(
            caixaOcupada1.childNodes.length > 0 && 
            caixaOcupada2.childNodes.length > 0 && 
            caixaOcupada3.childNodes.length > 0
         ) {
            if (
                caixaOcupada1.childNodes[0].className === simbolo &&
                caixaOcupada2.childNodes[0].className === simbolo &&
                caixaOcupada3.childNodes[0].className === simbolo
                ) {
                    declararVencedorAtualizaPlacar(simbolo)
            }
        }
    }

    // Possibilidades da Horizontal

    automacaoCondicaoDeVitoria(b1, b2, b3, 'x')
    automacaoCondicaoDeVitoria(b1, b2, b3, 'o')

    automacaoCondicaoDeVitoria(b4, b5, b6, 'x')
    automacaoCondicaoDeVitoria(b4, b5, b6, 'o')

    automacaoCondicaoDeVitoria(b7, b8, b9, 'x')
    automacaoCondicaoDeVitoria(b7, b8, b9, 'o')

    // Possibilidades da Vertical

    automacaoCondicaoDeVitoria(b1, b4, b7, 'x')
    automacaoCondicaoDeVitoria(b1, b4, b7, 'o')

    automacaoCondicaoDeVitoria(b2, b5, b8, 'x')
    automacaoCondicaoDeVitoria(b2, b5, b8, 'o')

    automacaoCondicaoDeVitoria(b3, b6, b9, 'x')
    automacaoCondicaoDeVitoria(b3, b6, b9, 'o')

    // Possibilidades da Diagonal

    automacaoCondicaoDeVitoria(b1, b5, b9, 'x')
    automacaoCondicaoDeVitoria(b1, b5, b9, 'o')

    automacaoCondicaoDeVitoria(b3, b5, b7, 'x')
    automacaoCondicaoDeVitoria(b3, b5, b7, 'o')
}


function checarCondicaoDeEmpate() {
    let empate = 0
    for (let index = 0; index < containerDeCaixas.length; index++) {
        if (containerDeCaixas[index].childNodes[0] !== undefined) {
            empate ++
        }
    }
    if(empate === 9) {
        declararVencedorAtualizaPlacar()
    }
}

function declararVencedorAtualizaPlacar(simbolo) {
    
    let placarX = document.querySelector('span #placar-1')
    
    let placarO = document.querySelector('span #placar-2')

    let msg = ''

    if (simbolo === 'x') {

        placarX.textContent = parseInt(placarX.textContent) + 1
        
        msg = "X VENCEU"

        trocarBgLimparZerar()

    } else if(simbolo === 'o') {
       
        placarO.textContent = parseInt(placarO.textContent) + 1
        
        msg = "O VENCEU"
        
        trocarBgLimparZerar()
    } else {
        
        msg = 'EMPATE'
        
        trocarBgLimparZerar()
    }

    // Exibindo mensagem

    textoDaMensagem.innerHTML = msg

    mensagem.classList.remove('esconder')

    function trocarBgLimparZerar() {
        player = 0
        ia = 0

        let bgQuadro = document.querySelector("#bg-quadro")
        bgQuadro.style.filter = 'blur(8px)'
        bgQuadro.style.transition = '0.3s'

        const esconderBg = (variavel, elemento) => bgQuadro.style.removeProperty(elemento)
        
        const esconderMsg = elemento => elemento.classList.add("esconder")

        const limpar = () => {
            const removerJogadas = document.querySelectorAll(".box div")

            for (let i = 0; i < removerJogadas.length; i++) {
                removerJogadas[i].parentNode.removeChild(removerJogadas[i])
            }
        }
    
        setTimeout(() => {
            esconderMsg(mensagem)
            esconderBg(bgQuadro, 'filter')
            limpar()
        }, 1500)
    }
}

function inteligenciaArtificial(caixa, simbolo) {

    let contador = 0

    for (let i = 0; 1 < containerDeCaixas.length; i++) {
        let randomNumbers = Math.floor(Math.random() * 5)
        
        if (containerDeCaixas[i].childNodes[0] === undefined) {
            if (randomNumbers <= 1) {
                    containerDeCaixas[i].appendChild( simbolo.cloneNode(true) )
                contador++;
                break;
            }
        } else {
            caixa++
        }
    }

    if (contador === 0 && caixa <= 9) {
        inteligenciaArtificial()
    }
}