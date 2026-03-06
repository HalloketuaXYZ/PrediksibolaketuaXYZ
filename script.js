const API_KEY = "zRP55GqpQ3hpGLzhplWoSlSidDvE0KSL5KQXfKpYOLCnqcTQpbOS9RfoElpP";

async function loadMatches(){

document.getElementById("matches").innerHTML="Loading pertandingan..."

let today = new Date().toISOString().split("T")[0]

let url = `https://api.sportmonks.com/v3/football/fixtures/date/${today}?api_token=${API_KEY}&include=participants`

let res = await fetch(url)

let data = await res.json()

let matches = data.data.slice(0,10)

showMatches(matches)

}

function generatePrediction(){

let homeScore = Math.floor(Math.random()*4)
let awayScore = Math.floor(Math.random()*4)

let homeChance = Math.floor(Math.random()*40)+40
let drawChance = Math.floor(Math.random()*20)+10
let awayChance = 100-homeChance-drawChance

let overUnder = Math.random()>0.5?"Over 2.5":"Under 2.5"

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

let home = match.participants[0]
let away = match.participants[1]

let p = generatePrediction()

html+=`

<div class="card">

<div class="teams">

<div class="team">
<img src="${home.image_path}">
${home.name}
</div>

<div class="vs">VS</div>

<div class="team">
<img src="${away.image_path}">
${away.name}
</div>

</div>

<div class="score">
Prediksi Skor : ${p.score}
</div>

<div class="stats">
Win Chance : ${home.name} ${p.homeChance}% | Draw ${p.drawChance}% | ${away.name} ${p.awayChance}%
</div>

<div class="stats">
${p.overUnder}
</div>

</div>

`

})

document.getElementById("matches").innerHTML=html

}
