/*
    1) Lógica de Programação
        Saber a sequencia que o computador/projeto
        quer que você execute as coisas

    2) Algoritmo
        Receita de bolo, passo a passo, para que o computador entenda o que você quer que ele faça


    ALGORITMO 1
    [x] Saber quem é quem (imagem, botão...)
    [x] Saber que o botão foi clicado (qual botão)
    [x] Trocar a foto e o nome do personagem

    ALGORITMO 2
    [ ] Pegar a imagem do usuario
    [ ] Enviar para a IA imagem + o que eu quero que ela faça
    [ ] Receber a imagem da IA
    [ ] Colocar a imagem no site




    3) Variaveis
        - É um pedacinho da memória do computador que você pode guardar alguma coisa
        - Exemplo:
            let nome = "Lucia"
            let idade = 15
            let altura = 1.60
            let peso = 50
    4) Funções
        É um pedacinho de código que SÓ EXECUTA QUANDO VOCÊ CHAMA ELA

    HTML = document
    querySelector = selecionar ALGO no HTML
    ( ) = entre parenteses você coloca o que você quer selecionar
    Quem ? Classe = .nomeDaClasse
    console.log() = mostrar no console do navegador
    innerHTML = colocar algo dentro do HTML

    1)criar uma variavel para guardar o que eu quero
    2)ir no HTML ( com o document)
    3) Selecionar quem eu quero com o querySelector
    4) Colocar entre parenteses quem eu quero selecionar (classe)

*/

let nome = document.querySelector(".nome")
let personagem = document.querySelector(".personagem")
/*

// () = Capsula teletransportadora
    // innerHTML = colocar algo dentro do HTML
    // src = colocar algo dentro do src da imagem

*/

function escolherPersonagem(nomepersonagem,imagempersonagem,cor ) {
    nome.innerHTML = nomepersonagem
    personagem.src = imagempersonagem
    nome.style.color = cor

}

// true = modo teste (imagem de exemplo, sem gastar créditos); false = IA de verdade
const MODO_TESTE = true

function lerFoto(foto){
// ALERTA - ESSA PARTE É CHATINHA, ENTÃO ME ACOMPANHA
// TEM COISAS QUE VOCE NAO TEM QUE ENTENDER AGORA, SÓ FAZ
// BOMBA, POMBA ? ANTES DE P e B é M
// onchange() = quando mudar algo, faça algo
// onclick() = quando clicar em algo, faça algo
// onload() = quando carregar algo, faça algo
// toda vez que eu tenho que ir no SERVIDOR - ASYNC / AWAIT

// se o usuário abriu a janela e não escolheu nenhuma foto, não faz nada
if (!foto.files[0]) return

let leitor = new FileReader() // FileReader = Leitor de arquivos
leitor.readAsDataURL(foto.files[0]) // readAsDataURL = fiz a leitura da foto, e transformei em URL (link)

leitor.onload = async function(){

    try {
        let desenho = await puter.ai.txt2img("Transforme a pessoa desta foto em um personagem de videogame: contorno preto grosso, cores vivas, meio corpo, mantendo o rosto parecido. Fundo totalmente transparente: sem cenário, sem chão e sem sombra.",
            {
                model: "replicate:openai/gpt-image-2.5-flare",
                provider: "openai",
                input_image: leitor.result,
                quality: "low",
                test_mode: MODO_TESTE,
                providerOptions: { background: "transparent" }
            })

        // desenho é um elemento <img>, não um texto: o endereço da imagem está em desenho.src
        escolherPersonagem("Você", desenho.src, '#b9b604')
    } catch (erro) {
        console.error("Erro ao gerar o personagem:", erro)
        alert("Não consegui criar seu personagem. Pode ser falta de crédito na conta Puter. Tente de novo mais tarde.")
    }
}

}
