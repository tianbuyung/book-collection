class Game {
  constructor(playerChoice) {
    this.playerChoice = playerChoice;
    this.comChoice = ["batu", "gunting", "kertas"][
      Math.floor(Math.random() * 3)
    ]; // komputer random
    this.result = "DRAW!";
  }

  start() {
    if (this.playerChoice === this.comChoice) {
      this.result = "DRAW!";
    } else if (
      (this.playerChoice === "batu" && this.comChoice === "gunting") ||
      (this.playerChoice === "gunting" && this.comChoice === "kertas") ||
      (this.playerChoice === "kertas" && this.comChoice === "batu")
    ) {
      this.result = "MENANG!";
    } else {
      this.result = "KALAH!";
    }
    return this.result;
  }

  // user(){
  //   const pilihan = document.querySelectorAll("li img");
  //   for (let index = 0; index < pilihan.length; index++) {
  //     userClick[index].addEventListener("click", () => {
  //       if (this.gameIsStarted === false) {
  //         if (this.userChoiceValue == null) {
  //           this.userChoiceValue = index;
  //         }
  //         this.styling(userClick[index]);
  //         this.comChoiceValue = this.generateComputerChoice();
  //         this.whoIsWin(this.userChoiceValue, this.comChoiceValue);
  //         this.gameIsStarted = true;
  //       }
  //     });
  //   }
  // }
}

const pilihan = document.querySelectorAll("li img");
pilihan.forEach(function (pil) {
  pil.addEventListener("click", function () {
    const pilihanPlayer = pil.className;
    const game = new Game(pilihanPlayer);
    const result = game.start();

    const imgComputer = document.querySelector(".img-computer");
    imgComputer.setAttribute("src", "../img/" + game.comChoice + ".png");

    const info = document.querySelector(".info");
    info.innerHTML = result;
  });
});

// pilihan.forEach(function (pil) {
//   pil.addEventListener("click", function () {
//     const pilihanPlayer = pil.className;
//     const game = new Game(pilihanPlayer);
//     const result = game.start();

//     const imgComputer = document.querySelector(".img-computer");
//     imgComputer.setAttribute("src", "img/" + game.comChoice + ".png");

//     const info = document.querySelector(".info");
//     info.innerHTML = result;
//   });
// });

// const pKertas = document.querySelector(".kertas");
// pKertas.addEventListener("click", function () {
//   const pilihanPlayer = pKertas.className;
//   const game = new Game(pilihanPlayer);
//   const result = game.start();

//   const imgComputer = document.querySelector('.img-computer');
//   imgComputer.setAttribute('src', 'img/' + game.comChoice + '.png');

//   const info = document.querySelector('.info');
//   info.innerHTML = result;
// });

// const game1 = new Game("Kertas");
// console.log(`Player Choice: ${game1.playerChoice}`);
// console.log(`Computer Choice: ${game1.comChoice}`);
// console.log(`Result: ${game1.start()}`);
