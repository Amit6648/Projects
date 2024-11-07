let progress = document.querySelector("#progress");
let logo = document.querySelector(".sign")
let button = document.querySelector("#play");
let volume = document.querySelector("#volume");
let sound = document.querySelector("#sound")


async function playlist() {
    let p = await fetch("http://127.0.0.1:3000/playlist/");
    let res = await p.text();
   
    let div = document.createElement("div");
    div.innerHTML = res;
    let a = div.getElementsByTagName("a");
    

    let arr = [];

    for (let index = 0; index < a.length; index++) {
        const element = a[index];

        if (element.href.startsWith("http://127.0.0.1:3000/playlist/")) {
            arr.push(element.href);
        }
    }
    return arr
}




playlist();

async function show() {
    let list = await playlist();

    for (const k of list) {

        let jk = await fetch(`${k}/info.json`);

        res = await jk.json()


        document.querySelector(".cards").getElementsByTagName("ul")[0].innerHTML +=
            ` <li class="alucard">
                            <div class="cardinner">
                                <img class="image" src="https://i.scdn.co/image/ab67616d00001e025f3ede47954a93aa03efe5f9"
                                    alt="">
                                <h4 class="title">
                              ${k.split("/playlist/")[1].replaceAll("/", "")}
                                </h4>
                                <p class="info">${res.discription} </p>
                            </div>
                </li>`
    }

    await fshow()


}

show()




function fshow() {
    return new Promise((resolve) => {
        Array.from(document.querySelectorAll(".alucard")).forEach(e => {
            e.addEventListener("click", () => {
                let play = e.querySelector(".title").textContent;
                console.log(play);
                resolve(play);  // Resolve the promise with the selected playlist title
            });
        });
    });
}


async function songs() {

   let folder = await fshow()
   folder += "/"
   console.log(folder)
    let p = await fetch("http://127.0.0.1:3000/playlist/" + folder);
    let res = await p.text();
    console.log(res)


    let div = document.createElement("div");

    div.innerHTML = res;

    let a = div.getElementsByTagName("a");


    let arr = [];

    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if (element.href.endsWith(".mp3")) {
            arr.push(element.href.split("lofi/")[1]);
        }
    }

    return arr;
}



let abhi = new Audio;

function player(track, button) {

    abhi.src = "http://127.0.0.1:3000/Spotify/audio/" + track + ".mp3";

    if (button.classList.contains("fa-circle-play")) {
        abhi.play();
        button.classList.add("fa-pause")
        button.classList.remove("fa-circle-play")
        document.querySelector("#play").classList.remove("fa-play")
        document.querySelector("#play").classList.add("fa-pause")

    }
    else {
        abhi.pause();
        button.classList.remove("fa-pause")
        button.classList.add("fa-circle-play")
        document.querySelector("#play").classList.add("fa-play")
        document.querySelector("#play").classList.remove("fa-pause")

    }



}
abhi.volume = volume.value / 100

volume.addEventListener("input", () => {
    abhi.volume = volume.value / 100
    console.log(abhi.volume)
})


volume.addEventListener("input", () => {
    if (volume.value == 0) {
        sound.classList.remove("fa-volume-high")
        sound.classList.add("fa-volume-off")
    }

    else {
        sound.classList.add("fa-volume-high")
        sound.classList.remove("fa-volume-off")
    }


})





async function music() {
    let jk = await songs()

    abhi.src = "http://127.0.0.1:3000/Spotify/audio/" + jk[0]

    let library = document.querySelector(".library").getElementsByTagName("ul")[0];

    for (const k of jk) {

        library.innerHTML = library.innerHTML +

            `
        
         <li class="lib-list">
                     <div class="lib-image">
                    <img src="${"https://i1.sndcdn.com/artworks-000102769935-nkultb-t500x500.jpg"}" alt="">
                     </div>

                     <div class="lib-info">
                        ${k.replaceAll("%20", " ").replaceAll("J%C3%A9ja", " ").replaceAll(".mp3", " ").replaceAll("amp;", "")}
                     </div>

                    <div class="icon" >
                        <i id ="play-pause" class="fa-regular fa-circle-play fa-solid"></i>
                     </div>
                    </li>
    `
    }



    Array.from(document.querySelectorAll(".lib-list")).forEach(e => {
        e.addEventListener("click", () => {


            let play = e.querySelector("#play-pause");
            player(e.querySelector(".lib-info").textContent.trim(), play)
            let info = e.querySelector(".lib-info").textContent.trim()
            document.querySelector(".songname").innerHTML = `${info}`
        })

    });

    document.querySelector("#play").addEventListener("click", () => {
        if (abhi.paused) {
            abhi.play()
            document.querySelector("#play").classList.remove("fa-play")
            document.querySelector("#play").classList.add("fa-pause")
            button.classList.add("fa-pause")
            button.classList.remove("fa-circle-play")
        }
        else {
            abhi.pause()
            document.querySelector("#play").classList.add("fa-play")
            document.querySelector("#play").classList.remove("fa-pause")
            button.classList.remove("fa-pause")
            button.classList.add("fa-circle-play")
        }


    })

    abhi.addEventListener("loadedmetadata", () => {
        progress.max = abhi.duration
    })

    progress.addEventListener("input", () => {
        abhi.currentTime = progress.value
    })
    abhi.addEventListener("timeupdate", () => {
        progress.value = abhi.currentTime

        if (abhi.ended) {
            abhi.pause()
            document.querySelector("#play").classList.add("fa-play")
            document.querySelector("#play").classList.remove("fa-pause")
            button.classList.remove("fa-pause")
            button.classList.add("fa-circle-play")
        }

        let timec = abhi.currentTime;
        let min = Math.floor(timec / 60)
        let sec = Math.floor(timec % 60)
        if (sec < 10) {
            sec = '0' + sec;
        }


        document.querySelector(".timec").innerHTML = `${min}:${sec}`;

        let timet = abhi.duration
        let mint = Math.floor(timet / 60)
        let sect = Math.floor(timet % 60)
        if (sect < 10) {
            sect = '0' + sect;
        }

        if (isNaN(mint) || isNaN(sect)) {
            document.querySelector(".timet").innerHTML = `0:00`;
        }

        else {

            document.querySelector(".timet").innerHTML = `${mint}:${sect}`;
        }

    })
    document.querySelector(".close").addEventListener("click", () => {
        if (document.querySelector(".func").classList.contains("trans")) {
            document.querySelector(".func").classList.remove("trans")
            document.querySelector(".close").classList.remove("trans1")
            document.querySelector(".right").classList.remove("over")
        }


        else {
            document.querySelector(".func").classList.add("trans")
            document.querySelector(".close").classList.add("trans1")
            document.querySelector(".right").classList.add("over")
        }
    })

    document.querySelector("#back").addEventListener("click", () => {
        let index;
        if (abhi.src.endsWith(".mp3")) {
            index = jk.indexOf(abhi.src.split("/audio/")[1])

        }
        else {
            index = jk.indexOf(abhi.src.split("/audio/")[1] + ".mp3")
        }

        let nindex = (index + jk.length - 1) % jk.length;

        console.log(nindex)
        abhi.src = "http://127.0.0.1:3000/Spotify/audio/" + jk[nindex]
        abhi.play()
        document.querySelector("#play").classList.remove("fa-play")
        document.querySelector("#play").classList.add("fa-pause")



    })


    document.querySelector("#forward").addEventListener("click", () => {
        let index;
        if (abhi.src.endsWith(".mp3")) {
            index = jk.indexOf(abhi.src.split("/audio/")[1])

        }
        else {
            index = jk.indexOf(abhi.src.split("/audio/")[1] + ".mp3")
        }

        let nindex = (index + 1) % jk.length;

        console.log(nindex)
        abhi.src = "http://127.0.0.1:3000/Spotify/audio/" + jk[nindex]

        abhi.play()

        document.querySelector("#play").classList.remove("fa-play")
        document.querySelector("#play").classList.add("fa-pause")
    })



}


music();
