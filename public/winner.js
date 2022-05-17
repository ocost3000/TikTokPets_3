// when this page is opened, get the most recently added video and show it.
// function is defined in video.js
let divElmt = document.getElementById("tiktokDiv");

let reloadButton = document.getElementById("reload");
// set up button to reload video in "tiktokDiv"
reloadButton.addEventListener("click",function () {
  reloadVideo(tiktokDiv);
});



// GET request to /getWinner,
// and send the result back in the HTTP response.

// TODO: make request for winner
// function getWinningUrl() {
//   sendGetRequest("/getWinner")
//     .then(res => {
//       winnerUrl = "";
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

showWinningVideo()

function showWinningVideo() {
  
  let winningUrl = "https://www.tiktok.com/@catcatbiubiubiu/video/6990180291545468166";
  // let winningUrl = getWinningUrl();
  addVideo(winningUrl, divElmt);
  loadTheVideos();
}
