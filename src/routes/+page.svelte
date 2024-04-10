<script>
  function showSettings() {
    console.log("Showing settings menu...");
    let settingsMenu = document.getElementById("settings-menu");
    let isHidden = settingsMenu.classList.contains("hidden");

    if (isHidden) {
      settingsMenu.classList.remove("hidden");

      // Retrieve saved settings from localStorage
      let savedMusicState = localStorage.getItem("musicState");
      let savedSoundState = localStorage.getItem("soundState");
      let savedDarkModeState = localStorage.getItem("darkModeState");

      // Set initial states for buttons
      if (savedMusicState === "true") {
        document.getElementById("music-icon").classList.add("active");
      }
      if (savedSoundState === "true") {
        document.getElementById("sound-icon").classList.add("active");
      }
      if (savedDarkModeState === "true") {
        document.getElementById("dark-mode-icon").classList.add("active");
      }
    } else {
      settingsMenu.classList.add("hidden");
    }
  }

  function closeSettingsMenu() {
    let settingsMenu = document.getElementById("settings-menu");
    settingsMenu.classList.add("hidden");
  }

  function toggleMusic() {
    let musicIcon = document.getElementById("music-icon");
    let backgroundMusic = document.getElementById("background-music");
    if (musicIcon.classList.contains("active")) {
      backgroundMusic.pause();
      musicIcon.classList.remove("active");
    } else {
      backgroundMusic.play();
      musicIcon.classList.add("active");
    }

    // Toggle music state in localStorage
    let musicState = !musicIcon.classList.contains("active");
    localStorage.setItem("musicState", musicState);
  }

  function toggleSound() {
    let soundIcon = document.getElementById("sound-icon");
    let audioClick = document.getElementById("audioClick");
    let audioHover = document.getElementById("audioHover");

    if (soundIcon.classList.contains("active")) {
      audioClick.volume = 0;
      audioHover.volume = 0;
      soundIcon.classList.remove("active");
    } else {
      audioClick.volume = 1;
      audioHover.volume = 1;
      soundIcon.classList.add("active");
    }

    // Toggle sound state in localStorage
    let soundState = !soundIcon.classList.contains("active");
    localStorage.setItem("soundState", soundState);
  }

  function toggleDarkMode() {
    let darkModeIcon = document.getElementById("dark-mode-icon");
    let body = document.body;
    let container = document.querySelector(".container");
    if (darkModeIcon.classList.contains("active")) {
      body.classList.remove("dark-mode");
      container.classList.remove("dark-mode");
      darkModeIcon.classList.remove("active");
    } else {
      body.classList.add("dark-mode");
      container.classList.add("dark-mode");
      darkModeIcon.classList.add("active");
    }

    // Toggle dark mode state in localStorage
    let darkModeState = !darkModeIcon.classList.contains("active");
    localStorage.setItem("darkModeState", darkModeState);
  }

  function adjustMusicVolume() {
    let musicVolumeSlider = document.getElementById("music-volume-slider");
    let backgroundMusic = document.getElementById("background-music");
    backgroundMusic.volume = musicVolumeSlider.value / 100;
  }

  function adjustSoundVolume() {
    let soundVolumeSlider = document.getElementById("sound-volume-slider");
    let audioClick = document.getElementById("audioClick");
    let audioHover = document.getElementById("audioHover");
    audioClick.volume = soundVolumeSlider.value / 100;
    audioHover.volume = soundVolumeSlider.value / 100;
  }

  function playSound(soundId) {
    let sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play();
  }
</script>

<main>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/> 
  
  <div class="screen">
    <i class="fas fa-volume mute fa-2x" id="sound"></i>
    <video autoplay loop muted id="videobackground">
      <source src="back.mp4" type="video/mp4" />
    </video>

    <audio id="background-music" autoplay loop>
      <source src="Hitman.mp3" type="audio/mpeg" />
    </audio>

    <audio id="audioClick">
      <source src="click.mp3" type="audio/mpeg" />
    </audio>

    <audio id="audioHover">
      <source src="button.wav" type="audio/wav" />
    </audio>

    <div class="container">
      <h1 class="title">Balance-Life-Decide</h1>
      <img class="logo" src="logo.png" alt="Game Logo" />
      <div class="menu">
        <button
          class="button"
          on:click={() => playSound("audioClick")}
          on:pointermove={() => playSound('audioHover')}
        >
          <a href="/play">Start Game</a>
        </button>
        <button
          class="button"
          on:click={() => playSound("audioClick")}
          on:pointermove={() => playSound("audioHover")}
        >
          Achievements
        </button>
        <button
          class="button"
          on:click={() => {playSound("audioClick"); showSettings(); }}
          on:pointermove={() => playSound('audioHover')}
        >
          Settings
        </button>
      </div>
    </div>

    <div id="settings-menu" class="settings-menu hidden">
      <h2 class="settings-title">Settings</h2>
      <button
        class="return-button"
        on:click={() => {closeSettingsMenu(); playSound('audioClick')}}
      >
      Return
    </button>

      <div class="toggle-label">
        <i class="fas fa-music" on:click={() => toggleMusic()} id="music-icon"></i>
        <input
          type="range"
          id="music-volume-slider"
          min="0"
          max="100"
          value="50"
          on:change={() => adjustMusicVolume()}
        />
      </div>
      <div class="toggle-label">
        <i class="fas fa-volume-up" on:click={() => toggleSound()} id="sound-icon"></i>
        <input
          type="range"
          id="sound-volume-slider"
          min="0"
          max="100"
          value="50"
          on:change={() => adjustSoundVolume()}
        />
      </div>
      <div class="toggle-label">
        <i class="fas fa-moon" on:click={() => toggleDarkMode()} id="dark-mode-icon"></i>
      </div>
    </div>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");

  video {
    position: absolute;
    min-width: 100%;
    min-height: 100vh;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }

  .screen {
    font-family: "Poppins", Arial, sans-serif;
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .title {
    font-size: 2.5rem;

    margin-bottom: 20px;
    color: white;
  }

  .menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: url("back.mp4") no-repeat center center fixed; /* Replace 'path/to/your/video.mp4' with the actual path to your video */
    background-size: cover;
    width: 33.3%;
    margin-top: 2rem;
    margin-bottom: 1.25rem;
  }

  .button {
    padding: 10px 20px;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    background-color: #864624;
    border-radius: 15px;
    color: white;
    cursor: pointer;
    margin-bottom: 15px;
    transition: background-color 0.3s ease;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .settings-menu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url("back.mp4") no-repeat center center fixed; /* Replace 'path/to/your/video.mp4' with the actual path to your video */
    background-size: cover;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  .settings-menu {
    position: absolute;
    top: 60vh; /* Adjust as needed */
    right: 50px; /* Adjust as needed */
    padding: 20px;
    border: 10px solid #a15c36;
    border-radius: 5px;
    z-index: 999;
    height: 30vh;
    margin-top: 10px;
    background: url("back.webp");
  }

  .settings-menu label {
    display: block;
    font-family: "Poppins", sans-serif;
    margin: 0;
    text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.5);
  }

  .settings-menu input[type="checkbox"] {
    margin-right: 10px;
  }

  .settings-menu input[type="range"] {
    width: 100%;
  }

  .button:hover {
    background-color: rgba(115, 107, 221, 1);
  }

  .hidden {
    display: none;
  }

  .dark-mode {
    background-color: #333; /* Dark background color */
    color: #fff; /* Light text color */
  }

  .settings-title {
    text-align: center;
    font-size: 3rem;
    font-family: "Poppins", sans-serif;
    margin: 0px;
    text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.5);
    -webkit-text-stroke: 1px white; /* Add white border */
  }
  .return-button {
    position: absolute;
    top: 103%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #a15c36; /* Adjust as needed */
    cursor: pointer;
    font-size: 25px;
    font-weight: bolder;
    font-family: "Poppins", sans-serif;
    text-shadow: 2px 2px 5px rgba(255, 255, 255, 0.5);
    -webkit-text-stroke: 1px white; /* Add white border */
  }

  .return-button:hover {
    background-color: #bbb; /* Adjust as needed */
    font-family: "Poppins", sans-serif;
  }

  /* Add styles for the toggle buttons */
  .toggle-label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .toggle-label i {
    font-size: 30px;
    margin-right: 10px;
    border: 2px solid transparent;
    border-radius: 50%;
    padding: 5px;
  }

  .toggle-label.disabled i {
    border-color: red; /* Change border color to red if disabled */
  }

  .toggle-label input[type="range"] {
    width: 50%;
    margin-left: 20px;
  }
  /* Add styles for active and inactive state of icons */
  #music-icon.active {
    color: green; /* Change color when music is active */
  }

  #sound-icon.active {
    color: blue; /* Change color when sound is active */
  }

  #dark-mode-icon.active {
    color: darkgrey; /* Change color when dark mode is active */
  }
</style>
