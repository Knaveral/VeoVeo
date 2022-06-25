// se crea una clase
class Memorama {
    // se crea un contructor por que este es lo que se va ejecutar si o si cuando empiece el juego que es new memorama
    constructor() {

        this.canPlay = false; // esto es para saber si se puede jugar o no 
        //tarjetas abiertas, se ponen en null por que ninguna debe de estar abierta po defecto
        this.card1 = null; 
        this.card2 = null;
        //arreglo numerico
        this.availableImages = [16, 7, 102, 103];//se enumera las imagenes que se puede usar en el arreglo
        this.orderForThisRound = [];//orden para cada partida
        this.cards = Array.from( document.querySelectorAll(".board-game figure") );//arreglo de las tarjetas

        this.maxPairNumber = this.availableImages.length;

        this.startGame();//iniciar juego 

    }
    //definir el iniico del juego
    startGame() {

        this.foundPairs = 0;
        this.setNewOrder();//orden de las tarjetas
        this.setImagesInCards();//
        this.openCards();// abrir tarjetas

    }
    //se crea orden de las tarjetas
    setNewOrder() {
        //le damos el orden aletario a las tarjetas y con la funcion concat podemos juntar 2 arreglos
        this.orderForThisRound = this.availableImages.concat(this.availableImages);
        this.orderForThisRound.sort( () => Math.random() - 0.5 );//ordenar de manera aletoria con la funcion short 

    }
    //se crea esta funcion para que recorra todas las tarjetas y va poner la imagen que le corresponde 
    setImagesInCards() {
        // se crea un for para recorrer todas las tarjetas
        for (const key in this.cards) {
            
            const card = this.cards[key];// recorre a this.card key
            const image = this.orderForThisRound[key];// accedemos al elemento del arreglo y recorremos las tarjetas
            const imgLabel = card.children[1].children[0];//acceder a cada imagen "hijo" en la posicion 1 o 0

            card.dataset.image = image;//variable personaliza llamada image que contiene el valor de la imagen  
            imgLabel.src = `https://randomfox.ca/images/${image}.jpg`;//imagenes de manera aleatoria por la const image

        }

    }
    //Acceder a las tarjetas para abrirlas
    openCards() {

        this.cards.forEach(card => card.classList.add("opened"));//recibimos cada tarjera y por cada una de ella la abrimos 
        //timepo de abierta las tarejetas, despues de cierto tiempo se cierra automaticamente
        setTimeout(() => {
            this.closeCards();
        }, 500);

    }
    //cerrar las tarjetas
    closeCards() {

        this.cards.forEach(card => card.classList.remove("opened"));
        this.addClickEvents();// añadir eventos del clic
        this.canPlay = true;//cuando las tarjetas enten cerradas comienza el juego

    }
    //evento del clic
    addClickEvents() {
        //añadir la funcion del clic a las tarjetas, que cuando se de clic se voltee las tarjetas
        this.cards.forEach(_this => _this.addEventListener("click", this.flipCard.bind(this)));

    }

    removeClickEvents() {

        this.cards.forEach(_this => _this.removeEventListener("click", this.flipCard));

    }
    //recibimos el evento por la variable e
    flipCard(e) {

        const clickedCard = e.target;//acceder a la tarjeta cliqueada
        //si el usuario puede jugar "canplay" si la tarjeta contiene la clase opended se pueda abrir
        if (this.canPlay && !clickedCard.classList.contains("opened")) {
            
            clickedCard.classList.add("opened");//abrir tarjeta
            this.checkPair( clickedCard.dataset.image );//pares que coinciden por parametros que podamos acceder a dataset

        }

    }
    //se crea una funcion de la imagen que fue cliqueada
    checkPair(image) {

        if (!this.card1) this.card1 = image;//imagenes que estan actualmente abierta por tal caso de que solo se asigne el valor
        else this.card2 = image;// si tiene un valor asignado en card 1 entonces asignelo a card 2
        //hacemos la comparacion de las imagenes si ya tienen valor
        if (this.card1 && this.card2) {
            
            if (this.card1 == this.card2) {

                this.canPlay = false;
                setTimeout(this.checkIfWon.bind(this), 300)
                
            }
            //si las tarjetas no coinciden se voltean se nuevo
            else {

                this.canPlay = false;
                setTimeout(this.resetOpenedCards.bind(this), 800)

            }

        }

    }

    resetOpenedCards() {
        //buscar las tarjetas que estan abiertas
        const firstOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card1}']`);
        const secondOpened = document.querySelector(`.board-game figure.opened[data-image='${this.card2}']`);

        firstOpened.classList.remove("opened");
        secondOpened.classList.remove("opened");

        this.card1 = null;
        this.card2 = null;

        this.canPlay = true;

    }

    checkIfWon() {

        this.foundPairs++;

        this.card1 = null;
        this.card2 = null;
        this.canPlay = true;

        if (this.maxPairNumber == this.foundPairs) {

            alert("¡Ganaste!");
            this.setNewGame();
            
        }

    }

    setNewGame() {

        this.removeClickEvents();
        this.cards.forEach(card => card.classList.remove("opened"));

        setTimeout(this.startGame.bind(this), 1000);

    }

}

/*se añande un documento a todo el evento DOMContentLoaded una vez el docuemnto este cargado se ejecute
la clase new Memorama*/
document.addEventListener("DOMContentLoaded", () => {

    new Memorama();

});
