const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
      lives: document.querySelector("#lives"),
    },
    values: {
      gameVelocity: 300,
      hitPosition: 0,
      result: 0,
      currentTime: 15,
      numberLives: 3,
      pontuacao: [],
    },
    actions: {
      timerId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
    },
  };
  function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
  
    if (state.values.currentTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      state.values.pontuacao.push(state.values.result);
      if (state.values.numberLives > 0) {
        alert("Tempo esgotado! O seu resultado foi: " + state.values.result);
        state.values.numberLives--;
        state.view.lives.textContent = state.values.numberLives;
        state.values.currentTime = 15; // Reinicia o tempo
        state.values.result = 0; // Reinicia o resultado
        state.view.score.textContent = state.values.result;
        state.actions.timerId = setInterval(randomSquare, 1000);
        state.actions.countDownTimerId = setInterval(countDown, 1000);
      } else {
        let pontuacaoTotal = 0;
        for (let i = 0; i < state.values.pontuacao.length; i++) {
          let pontuacaoPartida = state.values.pontuacao[i];
          pontuacaoTotal += pontuacaoPartida;          
        }
        alert("Game Over! Você perdeu todas as vidas.");
        alert("Pontuação:\n" + " 1° Tentativa - " + state.values.pontuacao[0] + "\n 2° Tentativa - " + state.values.pontuacao[1] + "\n 3° Tentativa - " + state.values.pontuacao[2] + "\n\n Pontuação Total: " + pontuacaoTotal);        
      }
    }
  }
  
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.1;
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        }
      });
    });
  }
  
  function initialize() {      
      addListenerHitBox();
  }
  
  initialize();
  