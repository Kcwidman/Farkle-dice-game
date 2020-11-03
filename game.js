class Game
{
    constructor(playerNames)
    {
        this.playerCount = playerNames.length
        this.players = new Array(this.playerCount)
        this.currentPlayerID = 0
        this.gameOver = false
        for(let i=0;i<this.playerCount;i++)
        {
            let player_i = new player(playerNames[i])
            this.players[i] = player_i
        }
    }

    nextPlayer()
    {
        if(this.currentPlayer().totalScore >= 10000)
        {
            this.gameOver = true
        }
        this.currentPlayer().endTurn()
        this.currentPlayerID = (this.currentPlayerID + 1) % this.playerCount
    }

    currentPlayer()
    {
        return this.players[this.currentPlayerID]
    }

    splat()
    {
        let canvas = document.querySelector("#canvas")
        let ctx = document.querySelector("#canvas").getContext("2d")
        ctx.clearRect(0,0, canvas.width, canvas.height)
        ctx.font = "20px Arial"
//PRINT SCORES
        ctx.fillText("Scores: ", 20, 30)
        for(let i=0; i<this.playerCount;i++)
        {
            let text = this.players[i].name + ": " + this.players[i].totalScore
            text+=" (+ " + this.players[i].prevTurnScore + ")"
            if(this.currentPlayer().name == this.players[i].name)
            {
                text+=" *"
            }
            ctx.fillText(text, 20, 30*(i+2))
        }
        ctx.fillText("Turn score: " + this.players[this.currentPlayerID].turnScore, 350, 60)
        ctx.fillText("Turn count: " + this.players[this.currentPlayerID].turnCount, 350, 90);
//PRINT ACTIVE DICE
        [1,2,3,4,5,6].map( (num, i) => ctx.fillText(num, 95 +50*i, 185) )
        this.currentPlayer().activeDice.map( (die, i) => {
            if(die != 0)
            {   
                let img = helper_dieFaceElement(die.value)
                img.onload = () => ctx.drawImage(img, 75 + 50*i, 200, 50, 50)

            }
        })
//PRINT SAVED DICE
        ctx.fillText("Current score: " + this.currentPlayer().softTally(this.currentPlayer().diceToNums(), true), 150, 335)
        this.currentPlayer().savedDice.map( (die, i) => {
            if(die != 0)
            {   
                let img = helper_dieFaceElement(die.value)
                img.onload = () => ctx.drawImage(img, 75 + 50*i, 350, 50, 50)
            }
        })
//WINNER CHECK
        for(let i=0; i < this.playerCount; i++)
        {
            if(this.players[i].totalScore >= 10000)
            {
                this.gameOver = true
                ctx.font = "45px Arial"
                ctx.fillText(this.players[i].name + " WINS!", 130, 400)
            }
        }
    }

    buttonListener()
    {
        document.querySelector("#rollButton").addEventListener("click", () => {
            if(!this.gameOver)
            {
                this.currentPlayer().tally(this.currentPlayer().diceToNums())
                if(this.currentPlayer().farkle)
                {
                    this.nextPlayer()
                }
                else
                {
                    this.currentPlayer().playerRoll();
                }
                this.splat();
            }
        })

        document.querySelector("#endTurnButton").addEventListener("click", () => {
            if(!this.gameOver)
            {
                this.nextPlayer();
                this.splat();
            }
        })
    }

    inputReader()
    {
        document.querySelector("body").addEventListener("keydown", (x) => {
            let key = parseInt(x.key)
            if(key < 7 && key > 0)
            {
                this.currentPlayer().moveDice(key)
            }
            this.splat()
        })
    }

    run()
    {
        this.splat()
        this.buttonListener()
        this.inputReader()
    }
}