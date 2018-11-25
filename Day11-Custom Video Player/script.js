// Get Out Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build Function
function togglePlayer() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}
function updateButton() {
  const icon = this.paused ? '▶' : '❚ ❚';
  toggle.textContent = icon;
}
function skip(){
  console.log(this.dataset);
  video.currentTime += parseFloat(this.dataset.skip);
}
function handleRange(e){
  // console.log(this.name);  
  // console.log(this.value);
  video[this.name] = this.value;
}

function handleProgress(){ // 隨著影片播放，更新進度條
  const precent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${precent}%`;
}
function scrub(e){ // 點擊進度條時，會調整播放進度
  // console.log(offsetWidth); // 516
  // e.offsetX => 當點擊進度條的位置 offsetX
  // progress.offsetWidth => 進度條的總長度
  // ( e.offsetX / progress.offsetWidth ) => 進度條的百分比
  // video.duration => 影片的總長度
  // 進度條百分比 * 影片總長度 = 5% * 1分鐘 => 3秒
  // 當點擊進度條時，便會跳到相對應的影片時間
  // video.currentTime => 影片目前播放時間
  const srcub = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = srcub;
}
// Handle the Event Listener.
video.addEventListener('click', togglePlayer);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlayer);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRange));
ranges.forEach(range => range.addEventListener('mousemove', handleRange));

let mousedown = false; // 判斷影片是否在移動中
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); 
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);