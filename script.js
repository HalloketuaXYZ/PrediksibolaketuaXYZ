const API_KEY = "zRP55GqpQ3hpGLzhplWoSlSidDvE0KSL5KQXfKpYOLCnqcTQpbOS9RfoElpP"

const leagues = [
39,
140,
135,
78,
61,
2
]

async function loadMatches(){

document.getElementById("matches").innerHTML = "Loading pertandingan..."

let today = new Date().toISOString().split("T")[0]

let matches = []

for(let league of leagues){

let res = await fetch(`https://v3.football.api-sports.io/fixtures?date=${today}&league=${league}&season=2024`,{
method:"GET",
headers:{
"x-apisports-key":API_KEY
}
})

let data = await res.json()

if(data.response){

data.response.forEach(m=>{
matches.push(m)
})

}

}

showMatches(matches.slice(0,10))

}

function generatePrediction(){

let homeScore = Math.floor(Math.random()*4)
let awayScore = Math.floor(Math.random()*4)

let homeChance = Math.floor(Math.random()*40)+35
let drawChance = Math.floor(Math.random()*20)+10
let awayChance = 100-homeChance-drawChance

let overUnder = Math.random() > 0.5 ? "Over 2.5" : "Under 2.5"

return{
score:`${homeScore} - ${awayScore}`,
homeChance,
drawChance,
awayChance,
overUnder
}

}

function showMatches(matches){

let html=""

matches.forEach(match=>{

let home = match.teams.home.name
let away = match.teams.away.name

let pred = generatePrediction()

html += `

<div class="match-card">

<div class="teams">
${home} <span>VS</span> ${away}
</div>

<div class="prediction">

<div class="score">
Prediksi Skor : ${pred.score}
</div>

<div class="chance">
${home} ${pred.homeChance}% | Draw ${pred.drawChance}% | ${away} ${pred.awayChance}%
</div>

<div class="ou">
${pred.overUnder}
</div>

</div>

</div>

`

})

document.getElementById("matches").innerHTML = html

}
