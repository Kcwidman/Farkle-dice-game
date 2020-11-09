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
