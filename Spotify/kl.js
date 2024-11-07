progress = document.querySelector("#progress");
logo = document.querySelector(".sign")



async function songs() {
    let p = await fetch("http://127.0.0.1:3000/Spotify/audio/");
    let res = await p.text();
    console.log(res)

    let div = document.createElement("div");

    div.innerHTML = res;

    let a = div.getElementsByTagName("a");

    // console.log(a);

    let arr = [];

    for (let index = 0; index < a.length; index++) {
        const element = a[index];
        if (element.href.endsWith(".mp3")) {
            arr.push(element.href.split("/audio/")[1]);
        }
    }
    return arr;
}

songs()