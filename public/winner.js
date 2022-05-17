// when this page is opened, get the most recently added video and show it.
// function is defined in video.js
let divElmt = document.getElementById("tiktokDiv");
let vidTitleElmt = document.getElementById("title-h1")

let reloadButton = document.getElementById("reload");
// set up button to reload video in "tiktokDiv"
reloadButton.addEventListener("click",function () {
  reloadVideo(tiktokDiv);
});


getWinningUrl();

// --------------------------------------------------------------------

function showWinningVideo(url) {
  addVideo(url, divElmt);
  loadTheVideos();
}

function getWinningUrl() {
  let winnerUrl = "empty";
  sendGetRequest("/getWinner")
    .then(res => {
      winnerUrl = res.url;
      vidTitleElmt.textContent = res.nickname;
      showWinningVideo(winnerUrl);
    })
    .catch(err => {
      console.log(err);
    });
}