const rankingsUrl = 'http://127.0.0.1:8125/Users/Rankings';
let rankings;

window.addEventListener('onload', getRankings());

function getRankings() {
    fetch(rankingsUrl)
        .then(res => res.json())
        .then(ranks => {
            rankings = ranks
            setRankingsContainer();
        })
        .catch(err => {
            console.log(err)
        });
}

function setRankingsContainer() {
    const rankListContainer = document.querySelector('.rank-list');
    rankings.forEach(ranking => {
        rankListContainer.insertAdjacentHTML('beforeend', `
        <div class="rank-item">
            <span class="rank-details">
                <span class="rank-number">${ranking.rank}.</span>
                <i class="far fa-user-circle fa-2x"></i>
                <span class="username"> ${ranking.username} </span>
            </span> <span class="ranking-score"> ${ranking.score === null ? 0 : ranking.score} </span>
        </div>
        `)
    })
}