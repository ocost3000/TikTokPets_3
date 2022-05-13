let videoElmts = document.getElementsByClassName("tiktokDiv");

let reloadButtons = document.getElementsByClassName("reload");
let heartButtons = document.querySelectorAll("div.heart");
heartButtons[0].adversary = heartButtons[1]
heartButtons[1].adversary = heartButtons[0]
for (let i=0; i<2; i++) {
  let reload = reloadButtons[i]; 
  reload.addEventListener("click",function() { reloadVideo(videoElmts[i]) });
  heartButtons[i].classList.add("unloved");
  heartButtons[i].addEventListener("click", event => {
    // TODO: Make the preferred heart solid
    console.log("Button Pressed")
    console.log(event.currentTarget)
    event.currentTarget.classList.remove("unloved")
    event.currentTarget.adversary.classList.add("unloved")
  });
} // for loop

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
