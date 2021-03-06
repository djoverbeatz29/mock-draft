function timer(t=120) {
    let id = setInterval(function() {
        if (t >= 0) {
            console.log(`${Math.floor(t / 60)}:${t % 60 >= 10 ? "" : "0"}${t % 60}`);
            --t;
        }
        else {
            console.log("Time's up!");
            clearInterval(id);
        }
    }, 1000);
}

function picker(pool, lineup, end=false) {
    const all_pos = {"QB": 0, "RB": 0, "WR": 0, "TE": 0};
    const end_pos = ['K', 'DEF']
    let best;
    if (!end) {
        lineup.forEach(ho=>all_pos[ho.position]+=1);
        avail_pos = Object.keys(all_pos).filter(ho=>all_pos[ho]<pos_maxes[ho]);
        best = avail_pos ? pool.findIndex(player=>avail_pos.includes(player.position)) : pool.findIndex(player=>all_pos.includes(player.position));
    }
    else {
        best = pool.findIndex(player=>player.position === end_pos.shift());
    }
    lineup.push(pool.splice(best, 1)[0]);
}

names = ["Ellis Andrews", "Jack Overby", "Mike Pottebaum", "Yusuf Celep", "Jason Melton", "Duke Greene", "Derick Castillo", "Raza Jafri"];
rosters = [[], [], [], [], [], [], [], []];

let i = 0;
let j = 0;

function drafter() {
    setTimeout(function() {
        picker(pool, rosters[j]);
        console.log(`With pick #${j * 8 + i + 1}, ${names[i]} selects ${rosters[j][i].displayName}`);
        i++;
        
        if (j < 8) {
            if (i >= rosters.length) {
                i = 0;
                j++;
            }
            drafter();
        }

    }, 1000)
}