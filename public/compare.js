let videoElmts = document.getElementsByClassName("tiktokDiv");

let reloadButtons = document.getElementsByClassName("reload");
let heartButtons = document.querySelectorAll("div.heart");
let nextButton = document.getElementById("nextBttn");

heartButtons[0].heart = heartButtons[0].children[0]
heartButtons[1].heart = heartButtons[1].children[0]

heartButtons[0].adversary = heartButtons[1]
heartButtons[1].adversary = heartButtons[0]

// TODO: Configure payload
let payload = {
  better: 0,
  worse: 0
};

defaultClasses = ["unloved", "far"]
preferredClasses = ["fas", "fa-heart"]
for (let i=0; i<2; i++) {

  let reload = reloadButtons[i]; 
  reload.addEventListener("click",function() { reloadVideo(videoElmts[i]) });
  heartButtons[i].classList.add("unloved");

  heartButtons[i].addEventListener("click", event => {
    // TODO: Make the preferred heart solid
    event.currentTarget.classList.remove("unloved");
    event.currentTarget.heart.classList.remove("far");
    event.currentTarget.heart.classList.add("fas");
    payload.better = event.currentTarget.vidId

    event.currentTarget.adversary.classList.add("unloved");
    event.currentTarget.adversary.heart.classList.add("far");
    event.currentTarget.adversary.heart.classList.remove("fas");
    payload.worse = event.currentTarget.adversary.vidId

  });
} // for loop

nextButton.addEventListener("click", () => {

  sendPostRequest("/insertPref", payload)
    .then(res => {
      console.log("Preference submitted!")
      window.location.reload()
    })
    .catch(err => {
      console.log(`Error! ${err}`)
      window.location.reload()
    })

});

let urls = []
sendGetRequest("/getTwoVideos")
  .then(res => {
    console.log(res)
    urls = res.map(x => x.url);
    ids = res.map(x => x.rowIdNum);
    console.log(urls)
    for (let i=0; i<2; i++) {
      addVideo(urls[i],videoElmts[i]);
      heartButtons[i].vidId = ids[i];
    }
    // load the videos after the names are pasted in! 
    loadTheVideos();
  })
  .catch(err => {
    console.log(err)
  });
