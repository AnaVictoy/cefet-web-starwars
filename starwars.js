// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
var audio = new Audio("musica.ogg");
var ultimoFilme = localStorage.getItem('ultimoFilme');
if(ultimoFilme==null) ultimoFilme='4/';
pegaFilme(ultimoFilme);


function playAudio() {
    audio.currentTime = 0;
    audio.play();
} 

let botoes=document.getElementsByClassName("episodio");
for (i = 0; i < botoes.length; i++) {
    botaoAtual = botoes[i];
    botoes[i].addEventListener("click", function (botaoAtual) {
        var link=botaoAtual.path[0].getAttribute('data-link');
        pegaFilme(link);
    }, false);
}

function pegaFilme(link){
    $(".reading-animation")[0].innerText="";
    playAudio();
    localStorage.setItem('ultimoFilme', link);
    $.ajax({url: "https://swapi.co/api/films/"+link, success: function(result){
        numero="I";
        if(result.episode_id==2) numero+="I";
        else if(result.episode_id==3) numero+="II";
        else if(result.episode_id==4) numero="IV";
        else if(result.episode_id==5) numero="V";
        else if(result.episode_id==6) numero="VI";
        else if(result.episode_id==7) numero="VII";
        
        titulo= "Episode "+numero+"\n" +result.title.toUpperCase();
        $(".reading-animation")[0].innerText=titulo+"\n\n"+result.opening_crawl;
    }});
}