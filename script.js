const API_KEY = "<api-sports-widget data-type="leagues"></api-sports-widget>

<!-- Configuration -->
<api-sports-widget data-type="config"
  data-key="cb73b983fd392f8e824508f2bf2e81d5"
  data-sport="football"
  data-lang="en"
  data-theme="white"
  data-show-errors="true"
></api-sports-widget>";

const leagues = [
39,     // Premier League
140,    // La Liga
135,    // Serie A
78,     // Bundesliga
61,     // Ligue 1
2       // Champions League
];

async function loadMatches(){

document.getElementById("matches").innerHTML = "Loading match..."

let today = new Date().toISOString().split("T")[0]

let allMatches = []

for(let league of leagues){

let url = `https://v3.football.api-sports.io/fixtures?date=${today}&league=${league}&season=2025`

let res = await fetch(url,{
headers:{
"x-apisports-key":API_KEY
}
})

let data = await res.json()

if(data.response){

data.response.forEach(match=>{
allMatches.push(match)
})

}

}

showMatches(allMatches.slice(0,10))

}

function generatePrediction(){

let homeScore = Math.floor(Math.random()*4)
let awayScore = Math.floor(Math.random()*4)

let homeChance = Math.floor(Math.random()*50)+30
let drawChance = Math.floor(Math.random()*20)+10
let awayChance = 100-homeChance-drawChance

let overUnder = Math.random() > 0.5 ? "Over 2.5" : "Under 2.5"

return {
score:`${homeScore} - ${awayScore}`,
homeChance,
drawChance,
awayChance,
overUnder
}

}

function showMatches(matches){

let html=""

matches.forEach(m=>{

let home = m.teams.home.name
let away = m.teams.away.name

let pred = generatePrediction()

html += `

<div class="match">

<div class="teams">
${home} vs ${away}
</div>

<div class="prediksi">
Prediksi Skor : ${pred.score}
</div>

<div class="stats">
Win Chance → ${home} ${pred.homeChance}% | Draw ${pred.drawChance}% | ${away} ${pred.awayChance}%
</div>

<div class="stats">
Over/Under : ${pred.overUnder}
</div>

</div>

`

})

document.getElementById("matches").innerHTML = html

}
