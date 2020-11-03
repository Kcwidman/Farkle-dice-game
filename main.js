//THINGS TO FIX
//1. Add graphic if you farkle
//1.5 Add + score graphic
//2. Spacebar to roll
//3. Add winner check

let main = function() 
{

    imgObj = new Image()
    images = new Array(6)
    for(let i=0;i<6;i++)
    {
        images[i] = "dieFaces/die_" + i + ".png"
        imgObj.src = images[i]
    }
    let data = localStorage.getItem("data")
    let formattedData = data.split(",")
    let game = new Game(formattedData)

    game.run()
}

document.addEventListener("DOMContentLoaded", main)
