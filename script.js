//array com a lista de musicas e informações
let musicas = [
  {titulo: 'Guitar Solo', artista:'Artista 1', src:'./musics/We Ride! - Reed Mathis.mp3', img:'./img/rock.jpg'},
  {titulo: 'Samba', artista:'Artista 2', src:'./musics/projeto_spotify_parte_1_musicas_Ella Vater - The Mini Vandals.mp3', img:'./img/samba.jpg'},
  {titulo: 'Piano music', artista:'Artista 3', src:'./musics/A Brand New Start - TrackTribe (1).mp3', img:'./img/piano.jpg'}
];

let musica = document.querySelector('audio');

let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');

let imagem = document.querySelector('img');

let nomeMusica = document.querySelector('.descricao h2');

let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

 //EVENTOS
 document.querySelector('.botao-play').addEventListener('click', tocarMusica);

  document.querySelector('.botao-pause').addEventListener('click',pausarMusica);

  musica.addEventListener('timeupdate', atualizarBarra);

  document.querySelector('.anterior').addEventListener('click', () => {
    pausarMusica();
    indexMusica--;
    if (indexMusica < 0) {
      indexMusica = 2;
    }
    renderizarMusica(indexMusica);
    atualizarBarra();
  });

  document.querySelector('.proxima').addEventListener('click', () => {
    pausarMusica();
    indexMusica++;
    if (indexMusica > 2) {
      indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    atualizarBarra();
  });

//tocar música
  function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
      nomeMusica.textContent = musicas[index].titulo;
      nomeArtista.textContent = musicas[index].artista;
      imagem.src = musicas[index].img;
      duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

 function tocarMusica() {
   musica.play();
   document.querySelector('.botao-pause').style.display = 'block';
   document.querySelector('.botao-play').style.display = 'none';
 }

 //pausar música
 function pausarMusica() {
   musica.pause();
   document.querySelector('.botao-play').style.display = 'block';
   document.querySelector('.botao-pause').style.display = 'none';
 }

 //atualização da barra da música
function atualizarBarra() {
  let barra = document.querySelector('progress');
  //obtem dinamicamente o valor em porcentagem do estado atual da música
  barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
  let tempoDecorrido = document.querySelector('.inicio');
  tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
  let campoMinutos = Math.floor(segundos / 60);
  let campoSegundos = segundos % 60;
  if (campoSegundos < 10) {
    campoSegundos = '0' + campoSegundos;
  }
  return campoMinutos+ ':' +campoSegundos;
}


