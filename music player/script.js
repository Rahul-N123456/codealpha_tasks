/* ========================================
   Sonic Wave Music Player - JavaScript
   ======================================== */

// Audio Player State
const playerState = {
  isPlaying: false,
  currentTrackIndex: 0,
  isMuted: false,
  isShuffle: false,
  repeatMode: 'off', // 'off', 'all', 'one'
  volume: 70,
  shuffleOrder: [],
  shuffleIndex: 0
};

// DOM Elements
const elements = {
  audioPlayer: document.getElementById('audioPlayer'),
  playPauseBtn: document.getElementById('playPauseBtn'),
  playIcon: document.getElementById('playIcon'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  progressBar: document.getElementById('progressBar'),
  progressFill: document.getElementById('progressFill'),
  progressThumb: document.getElementById('progressThumb'),
  currentTime: document.getElementById('currentTime'),
  totalTime: document.getElementById('totalTime'),
  trackTitle: document.getElementById('trackTitle'),
  trackArtist: document.getElementById('trackArtist'),
  trackAlbum: document.getElementById('trackAlbum'),
  albumArt: document.getElementById('albumArt'),
  albumImage: document.getElementById('albumImage'),
  volumeBtn: document.getElementById('volumeBtn'),
  volumeIcon: document.getElementById('volumeIcon'),
  volumeSlider: document.getElementById('volumeSlider'),
  shuffleBtn: document.getElementById('shuffleBtn'),
  repeatBtn: document.getElementById('repeatBtn'),
  playlistBtn: document.getElementById('playlistBtn'),
  playlistPanel: document.getElementById('playlistPanel'),
  playlistContent: document.getElementById('playlistContent'),
  playlistCount: document.getElementById('playlistCount')
};

// Sample Playlist Data (using royalty-free audio)
const playlist = [
  {
    title: "Summer Vibes",
    artist: "Chill Wave",
    album: "Sunset Dreams",
    duration: "3:24",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/240/240?random=1"
  },
  {
    title: "Midnight Drive",
    artist: "Neon Lights",
    album: "City Nights",
    duration: "4:02",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/240/240?random=2"
  },
  {
    title: "Ocean Waves",
    artist: "Ambient Dreams",
    album: "Nature Sounds",
    duration: "3:45",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/240/240?random=3"
  },
  {
    title: "Electric Soul",
    artist: "Digital Pulse",
    album: "Future Beat",
    duration: "3:18",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "https://picsum.photos/240/240?random=4"
  },
  {
    title: "Golden Hour",
    artist: "Sunset Collective",
    album: "Evening Breeze",
    duration: "4:11",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "https://picsum.photos/240/240?random=5"
  },
  {
    title: "Starlight",
    artist: "Cosmic Journey",
    album: "Galaxy Dreams",
    duration: "3:56",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    cover: "https://picsum.photos/240/240?random=6"
  },
  {
    title: "Urban Rhythm",
    artist: "Metro Beats",
    album: "Street Sounds",
    duration: "3:33",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    cover: "https://picsum.photos/240/240?random=7"
  },
  {
    title: "Peaceful Mind",
    artist: "Zen Garden",
    album: "Tranquility",
    duration: "4:28",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    cover: "https://picsum.photos/240/240?random=8"
  }
];

// Initialize Player
function init() {
  loadTrack(0);
  renderPlaylist();
  setupEventListeners();
  elements.volumeSlider.value = playerState.volume;
  updateVolumeIcon();
}

// Load Track
function loadTrack(index) {
  const track = playlist[index];
  elements.audioPlayer.src = track.src;
  elements.trackTitle.textContent = track.title;
  elements.trackArtist.textContent = track.artist;
  elements.trackAlbum.textContent = track.album;
  elements.albumImage.src = track.cover;
  
  // Reset progress
  elements.progressFill.style.width = '0%';
  elements.progressThumb.style.left = '0%';
  elements.currentTime.textContent = '0:00';
  elements.totalTime.textContent = track.duration;
  
  // Update playlist active state
  updatePlaylistActiveState(index);
}

// Play/Pause Toggle
function togglePlayPause() {
  if (playerState.isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function playTrack() {
  elements.audioPlayer.play()
    .then(() => {
      playerState.isPlaying = true;
      updatePlayPauseButton();
      elements.albumArt.classList.add('playing');
    })
    .catch(error => {
      console.error('Error playing track:', error);
    });
}

function pauseTrack() {
  elements.audioPlayer.pause();
  playerState.isPlaying = false;
  updatePlayPauseButton();
  elements.albumArt.classList.remove('playing');
}

function updatePlayPauseButton() {
  if (playerState.isPlaying) {
    elements.playIcon.classList.remove('fa-play');
    elements.playIcon.classList.add('fa-pause');
    elements.playPauseBtn.title = 'Pause';
  } else {
    elements.playIcon.classList.remove('fa-pause');
    elements.playIcon.classList.add('fa-play');
    elements.playPauseBtn.title = 'Play';
  }
}

// Next Track
function nextTrack() {
  if (playerState.isShuffle) {
    playerState.shuffleIndex++;
    if (playerState.shuffleIndex >= playerState.shuffleOrder.length) {
      generateShuffleOrder();
      playerState.shuffleIndex = 0;
    }
    loadTrack(playerState.shuffleOrder[playerState.shuffleIndex]);
  } else {
    playerState.currentTrackIndex++;
    if (playerState.currentTrackIndex >= playlist.length) {
      playerState.currentTrackIndex = 0;
    }
    loadTrack(playerState.currentTrackIndex);
  }
  
  if (playerState.isPlaying) {
    playTrack();
  }
}

// Previous Track
function prevTrack() {
  // If more than 3 seconds played, restart current track
  if (elements.audioPlayer.currentTime > 3) {
    elements.audioPlayer.currentTime = 0;
    return;
  }
  
  if (playerState.isShuffle) {
    playerState.shuffleIndex--;
    if (playerState.shuffleIndex < 0) {
      playerState.shuffleIndex = playerState.shuffleOrder.length - 1;
    }
    loadTrack(playerState.shuffleOrder[playerState.shuffleIndex]);
  } else {
    playerState.currentTrackIndex--;
    if (playerState.currentTrackIndex < 0) {
      playerState.currentTrackIndex = playlist.length - 1;
    }
    loadTrack(playerState.currentTrackIndex);
  }
  
  if (playerState.isPlaying) {
    playTrack();
  }
}

// Progress Bar
function updateProgress() {
  const { currentTime, duration } = elements.audioPlayer;
  if (isNaN(duration)) return;
  
  const progressPercent = (currentTime / duration) * 100;
  elements.progressFill.style.width = `${progressPercent}%`;
  elements.progressThumb.style.left = `${progressPercent}%`;
  
  elements.currentTime.textContent = formatTime(currentTime);
}

function setProgress(e) {
  const width = elements.progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = elements.audioPlayer.duration;
  
  if (!isNaN(duration)) {
    elements.audioPlayer.currentTime = (clickX / width) * duration;
  }
}

// Time Formatting
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Volume Control
function setVolume() {
  const volume = elements.volumeSlider.value;
  playerState.volume = volume;
  elements.audioPlayer.volume = volume / 100;
  updateVolumeIcon();
}

function toggleMute() {
  playerState.isMuted = !playerState.isMuted;
  elements.audioPlayer.muted = playerState.isMuted;
  updateVolumeIcon();
}

function updateVolumeIcon() {
  const volume = playerState.volume;
  
  if (playerState.isMuted || volume === 0) {
    elements.volumeIcon.className = 'fas fa-volume-mute';
  } else if (volume < 50) {
    elements.volumeIcon.className = 'fas fa-volume-low';
  } else {
    elements.volumeIcon.className = 'fas fa-volume-up';
  }
}

// Shuffle
function toggleShuffle() {
  playerState.isShuffle = !playerState.isShuffle;
  elements.shuffleBtn.classList.toggle('active', playerState.isShuffle);
  
  if (playerState.isShuffle) {
    generateShuffleOrder();
    playerState.shuffleIndex = playerState.shuffleOrder.indexOf(playerState.currentTrackIndex);
  }
}

function generateShuffleOrder() {
  playerState.shuffleOrder = [...Array(playlist.length).keys()];
  
  // Fisher-Yates shuffle
  for (let i = playerState.shuffleOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playerState.shuffleOrder[i], playerState.shuffleOrder[j]] = 
      [playerState.shuffleOrder[j], playerState.shuffleOrder[i]];
  }
}

// Repeat
function toggleRepeat() {
  const modes = ['off', 'all', 'one'];
  const currentIndex = modes.indexOf(playerState.repeatMode);
  playerState.repeatMode = modes[(currentIndex + 1) % modes.length];
  
  updateRepeatButton();
}

function updateRepeatButton() {
  elements.repeatBtn.classList.remove('active');
  
  if (playerState.repeatMode === 'off') {
    elements.repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
    elements.repeatBtn.title = 'Repeat: Off';
  } else if (playerState.repeatMode === 'all') {
    elements.repeatBtn.classList.add('active');
    elements.repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
    elements.repeatBtn.title = 'Repeat: All';
  } else if (playerState.repeatMode === 'one') {
    elements.repeatBtn.classList.add('active');
    elements.repeatBtn.innerHTML = '<i class="fas fa-repeat-1"></i>';
    elements.repeatBtn.title = 'Repeat: One';
  }
}

// Playlist
function togglePlaylist() {
  elements.playlistPanel.classList.toggle('open');
  elements.playlistBtn.classList.toggle('active');
}

function renderPlaylist() {
  elements.playlistContent.innerHTML = '';
  elements.playlistCount.textContent = `${playlist.length} tracks`;
  
  playlist.forEach((track, index) => {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    item.dataset.index = index;
    
    item.innerHTML = `
      <span class="playlist-item-number">
        <i class="fas fa-music"></i>
      </span>
      <div class="playlist-item-info">
        <div class="playlist-item-title">${track.title}</div>
        <div class="playlist-item-artist">${track.artist}</div>
      </div>
      <span class="playlist-item-duration">${track.duration}</span>
    `;
    
    item.addEventListener('click', () => playTrackFromPlaylist(index));
    elements.playlistContent.appendChild(item);
  });
  
  updatePlaylistActiveState(playerState.currentTrackIndex);
}

function playTrackFromPlaylist(index) {
  playerState.currentTrackIndex = index;
  loadTrack(index);
  playTrack();
}

function updatePlaylistActiveState(currentIndex) {
  const items = elements.playlistContent.querySelectorAll('.playlist-item');
  items.forEach((item, index) => {
    item.classList.toggle('active', index === currentIndex);
  });
}

// Track Ended - Autoplay Logic
function handleTrackEnded() {
  if (playerState.repeatMode === 'one') {
    elements.audioPlayer.currentTime = 0;
    playTrack();
  } else if (playerState.repeatMode === 'all' || playerState.currentTrackIndex < playlist.length - 1) {
    nextTrack();
  } else if (playerState.repeatMode === 'all') {
    // Loop back to first track
    playerState.currentTrackIndex = 0;
    loadTrack(0);
    playTrack();
  }
}

// Audio Metadata Loaded
function handleLoadedMetadata() {
  const duration = elements.audioPlayer.duration;
  elements.totalTime.textContent = formatTime(duration);
  
  // Update current track's duration in playlist
  const currentTrack = playlist[playerState.currentTrackIndex];
  currentTrack.duration = formatTime(duration);
  
  // Update playlist display
  const durationEl = elements.playlistContent.querySelectorAll('.playlist-item-duration')[playerState.currentTrackIndex];
  if (durationEl) {
    durationEl.textContent = formatTime(duration);
  }
}

// Event Listeners
function setupEventListeners() {
  // Play/Pause
  elements.playPauseBtn.addEventListener('click', togglePlayPause);
  
  // Next/Previous
  elements.nextBtn.addEventListener('click', nextTrack);
  elements.prevBtn.addEventListener('click', prevTrack);
  
  // Progress Bar
  elements.progressBar.addEventListener('click', setProgress);
  
  // Volume
  elements.volumeSlider.addEventListener('input', setVolume);
  elements.volumeBtn.addEventListener('click', toggleMute);
  
  // Shuffle/Repeat
  elements.shuffleBtn.addEventListener('click', toggleShuffle);
  elements.repeatBtn.addEventListener('click', toggleRepeat);
  
  // Playlist
  elements.playlistBtn.addEventListener('click', togglePlaylist);
  
  // Audio Events
  elements.audioPlayer.addEventListener('timeupdate', updateProgress);
  elements.audioPlayer.addEventListener('ended', handleTrackEnded);
  elements.audioPlayer.addEventListener('loadedmetadata', handleLoadedMetadata);
  
  // Keyboard Controls
  document.addEventListener('keydown', (e) => {
    switch(e.code) {
      case 'Space':
        e.preventDefault();
        togglePlayPause();
        break;
      case 'ArrowRight':
        nextTrack();
        break;
      case 'ArrowLeft':
        prevTrack();
        break;
      case 'ArrowUp':
        e.preventDefault();
        elements.volumeSlider.value = Math.min(100, parseInt(elements.volumeSlider.value) + 10);
        setVolume();
        break;
      case 'ArrowDown':
        e.preventDefault();
        elements.volumeSlider.value = Math.max(0, parseInt(elements.volumeSlider.value) - 10);
        setVolume();
        break;
      case 'KeyM':
        toggleMute();
        break;
      case 'KeyP':
        togglePlaylist();
        break;
    }
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
