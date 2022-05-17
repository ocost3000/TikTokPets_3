// when this page is opened, get the most recently added video and show it.
// function is defined in video.js
let divElmt = document.getElementById("tiktokDiv");

let reloadButton = document.getElementById("reload");
// set up button to reload video in "tiktokDiv"
reloadButton.addEventListener("click",function () {
  reloadVideo(tiktokDiv);
});



getWinningUrl()

// GET request to /getWinner,
// and send the result back in the HTTP response.

// TODO: make request for winner
function getWinningUrl() {
  sendGetRequest("/getWinner")
    .then(res => {
      let winnerUrl = res.url;
      showWinningVideo(winnerUrl)
    })
    .catch(err => {
      console.log(err);
    });
}


function showWinningVideo(url) {
  // let winningUrl = getWinningUrl();
  addVideo(url, divElmt);
  loadTheVideos();
}
