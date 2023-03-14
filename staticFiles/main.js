document.addEventListener("DOMContentLoaded", function(event){
    const main = (wordList) => {
        console.log("start")
        const display = () => {
            displayWord = ""
            for (let i = 0; i < word.length; i++) {
                if (word[i].toLowerCase() == word[i]) displayWord += "_ "
                else displayWord += word[i] + " "
            }
            displayedWordSpan.innerHTML = displayWord;
        }

        let end = false;
        let guessWord = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase();
        let displayedWordSpan = document.getElementById("displayedWord");
        let word = guessWord.toLowerCase();
        let errors = -1;
        let img = document.getElementById("penduStepImg");
        const bankImg = [
            "https://cdn.discordapp.com/attachments/689829033898279147/1085271543417950288/1.png",
            "https://cdn.discordapp.com/attachments/689829033898279147/1085271543657005066/2.png",
            "https://cdn.discordapp.com/attachments/689829033898279147/1085271543875125428/3.png",
            "https://cdn.discordapp.com/attachments/689829033898279147/1085271544126787707/4.png",
            "https://cdn.discordapp.com/attachments/689829033898279147/1085271544344870912/5.png",
            "https://cdn.discordapp.com/attachments/689829033898279147/1085271544600740012/6.png",
            "https://cdn.discordapp.com/attachments/689829033898279147/1085271544827236473/7.png",
            "https://cdn.discordapp.com/attachments/689829033898279147/1085271545041125450/8.png"
        ]


        const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        display();
        let lettersDisplay = ""
        for (let i = 0; i < alphabet.length; i++) {
            lettersDisplay += `<span id="${alphabet[i]}"> ${alphabet[i]} </span>`;
        }
        document.getElementById("letters").innerHTML = lettersDisplay;

        document.addEventListener('keydown', (event) => {
            if (end) return;
            const key = event.key;
            if (key.length != 1 || !key.match(/[a-z]/i)) return;
            if (word.indexOf(key.toLowerCase()) != -1 || word.indexOf(key.toUpperCase()) != -1) {
                word = word.replaceAll(key, key.toUpperCase())
                document.getElementById(`${key.toUpperCase()}`).classList.add("good")
            }
            else {
                errors++;
                img.setAttribute('src', bankImg[errors])
                document.getElementById(`${key.toUpperCase()}`).classList.add("bad")
            }

            if (word == guessWord.toUpperCase()) {
                document.getElementById("gameStatus").innerHTML = "WIN !"
                end = true;
                fetch('/changeScore?win=' + true)
                document.getElementById("win").innerHTML = (parseInt(document.getElementById("win").textContent) + 1).toString
            }
            if (errors >= bankImg.length - 1) {
                document.getElementById("gameStatus").innerHTML = "LOST !"
                word = word.toUpperCase()
                displayedWordSpan.classList.add("bad")
                end = true;
                fetch('/changeScore?win=' + false)
            }
            display();
        }, false);
    }

    fetch('/wordList')
        .then(data => data.text())
        .then(text => text.replaceAll('"', '').replaceAll('\n', '').replaceAll(' ', '').replace('[', '').replace(']', '').split(","))
        .then(data => main(data))
});

