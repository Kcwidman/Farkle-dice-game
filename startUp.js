// let generateHTML = function()
// {
//     document.querySelector("#playerCount").addEventListener("change", () => {
//         let value = document.querySelector("#playerCount").value
//         console.log(value)
//         for(let i=0;i<value;i++)
//         {
//             let el = document.createElement("input", {id: "playerInput"})
//             document.querySelector("body").insertAdjacentElement("afterbegin", el)
//             let t = document.createTextNode("Player " + i + ": ")
//             // node.insertAdjacentText("beforebegin", t)
//             document.querySelector("body").appendChild(node)
//         }
//     })
//     // document.querySelector("body").appendChild()
// }

let buttonListener = function ()
{
    document.querySelector("#beginButton").addEventListener("click", () => {
        let playerNames = []
        let data = document.querySelectorAll("#playerInput")
        for(let i=0;i<data.length;i++)
        {
            if(data[i].value) playerNames.push(data[i].value)
        }
        localStorage.setItem("data", playerNames)
        window.location.href = "index.html"
    })
}

let startUp = function()
{
    // generateHTML()
    buttonListener()
}

document.addEventListener("DOMContentLoaded", startUp)