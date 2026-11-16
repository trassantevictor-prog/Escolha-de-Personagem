

let nome = document.querySelector(".nome")
let personagem = document.querySelector(".personagem")


function escolherPersonagem(nomepersonagem,imagempersonagem,cor ) {
    nome.innerHTML = nomepersonagem
    personagem.src = imagempersonagem
    nome.style.color = cor

}


const MODO_TESTE = true

function lerFoto(foto){

if (!foto.files[0]) return

let leitor = new FileReader() 
leitor.readAsDataURL(foto.files[0]) 

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


        escolherPersonagem("Você", desenho.src, '#b9b604')
    } catch (erro) {
        console.error("Erro ao gerar o personagem:", erro)
        alert("Não consegui criar seu personagem. Pode ser falta de crédito na conta Puter. Tente de novo mais tarde.")
    }
}

}
