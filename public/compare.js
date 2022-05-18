let videoElmts = document.getElementsByClassName("tiktokDiv");

let reloadButtons = document.getElementsByClassName("reload");
let lovedButtons = document.querySelectorAll("div.heart.loved");
let nextButton = document.getElementById("nextBttn");

let unlovedButtons = document.querySelectorAll("div.heart.unloved");
// heartButtons[0].heart = heartButtons[0].children[0]
// heartButtons[1].heart = heartButtons[1].children[0]
// 
unlovedButtons[0].inv = unlovedButtons[1];
unlovedButtons[1].inv = unlovedButtons[0];
unlovedButtons[0].loved = lovedButtons[0];
unlovedButtons[1].loved = lovedButtons[1];
unlovedButtons[0].vidId = -1;
unlovedButtons[1].vidId = -1;

// TODO: Configure payload
let payload = {
  better: 0,
  worse: 0
};

defaultClasses = ["unloved", "far"]
preferredClasses = ["fas", "fa-heart"]
for (let i=0; i<2; i++) {
  lovedButtons[i].classList.add("inactive");

  let reload = reloadButtons[i]; 
  reload.addEventListener("click",function() { reloadVideo(videoElmts[i]) });
  unlovedButtons[i].addEventListener("click", event => {
    // TODO: Make the preferred heart solid
    console.log("click!");

    event.currentTarget.classList.add("inactive");
    event.currentTarget.loved.classList.remove("inactive");

    event.currentTarget.inv.classList.remove("inactive");
    event.currentTarget.inv.loved.classList.add("inactive");
    // event.currentTarget.classList.remove("unloved");
    // event.currentTarget.heart.classList.remove("far");
    // event.currentTarget.heart.classList.add("fas");

    // event.currentTarget.adversary.classList.add("unloved");
    // event.currentTarget.adversary.heart.classList.add("far");
    // event.currentTarget.adversary.heart.classList.remove("fas");
    payload.better = event.currentTarget.vidId;
    payload.worse = event.currentTarget.inv.vidId;

  });
} // for loop

nextButton.addEventListener("click", () => {

  if (payload.better == 0 || payload.worse == 0) {
    alert("Please choose a favorite video!");
  } else {
    sendPostRequest("/insertPref", payload)
      .then(async res => {
        if (res === "pick winner") {
          window.location.href = "/winner.html";
        } else {
          console.log("Preference submitted!");
          window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
        window.location.reload();
      });
  }

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
      unlovedButtons[i].vidId = ids[i];
    }
    // load the videos after the names are pasted in! 
    loadTheVideos();
  })
  .catch(err => {
    console.log(err)
  });
