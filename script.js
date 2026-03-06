function loadMatches(){

const matches = [
["Arsenal","Liverpool"],
["Manchester City","Chelsea"],
["Barcelona","Real Madrid"],
["Bayern Munich","Dortmund"],
["PSG","Marseille"],
["Inter Milan","Juventus"],
["AC Milan","Napoli"],
["Atletico Madrid","Sevilla"],
["Tottenham","Newcastle"],
["Roma","Lazio"]
]

let html=""

matches.forEach(match=>{

let homeScore = Math.floor(Math.random()*4)
let awayScore = Math.floor(Math.random()*4)

let homeChance = Math.floor(Math.random()*40)+35
let drawChance = Math.floor(Math.random()*20)+10
let awayChance = 100-homeChance-drawChance

let overUnder = Math.random()>0.5?"Over 2.5":"Under 2.5"

html += `

<div class="match-card">

<div class="teams">
${match[0]} <span>VS</span> ${match[1]}
</div>

<div class="score">
Prediksi Skor : ${homeScore} - ${awayScore}
</div>

<div class="chance">
${match[0]} ${homeChance}% | Draw ${drawChance}% | ${match[1]} ${awayChance}%
</div>

<div class="ou">
${overUnder}
</div>

</div>

`

})

document.getElementById("matches").innerHTML = html

}
