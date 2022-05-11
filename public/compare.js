let videoElmts = document.getElementsByClassName("tiktokDiv");

let reloadButtons = document.getElementsByClassName("reload");
let heartButtons = document.querySelectorAll("div.heart");
for (let i=0; i<2; i++) {
  let reload = reloadButtons[i]; 
  reload.addEventListener("click",function() { reloadVideo(videoElmts[i]) });
  heartButtons[i].classList.add("unloved");
} // for loop

// hard-code videos for now
// You will need to get pairs of videos from the server to play the game.
// const urls = ["https://www.tiktok.com/@berdievgabinii/video/7040757252332047662",
// "https://www.tiktok.com/@catcatbiubiubiu/video/6990180291545468166"];
// TODO: Make dynamic

let urls = []
sendGetRequest("/getTwoVideos")
  .then(res => {
    console.log(res)
    urls = res.map(x => x.url)
    console.log(urls)
    for (let i=0; i<2; i++) {
      addVideo(urls[i],videoElmts[i]);
    }
    // load the videos after the names are pasted in! 
    loadTheVideos();
  })
  .catch(err => {
    console.log(err)
  });
