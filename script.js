

document.addEventListener('DOMContentLoaded', (e) => {

    const lyrics = [
        "Hindi na makalaya", //0
        "Dina dalaw mo 'ko bawat gabi", //3600
        "Wala mang nakikita", //1800
        "Haplos mo'y ramdam parin sa dilim", //3100
        "Hindi na na-nanaginip", //1900
        "Hindi na ma-makagising", //3500
        "Pa sindi na ng ilaw", //1800
        "Minumulto na 'ko ng damdamin ko", 
        "Ng damdamin ko", //1400
        "'Di moba ako lilisanin?", //550
        "Hindi paba sapat pagpapahirap sa 'kin?",  //2700
        "Hindi naba ma-mamamayapa?", //2000
        "Hindi naba ma-mamamayapa?", //3300
        "Hindi na makalaya", //2300
    
    ]
    
    const lyricsBox = document.getElementById("lyrics");
    const audioPlayer = document.getElementById("audioPlayer");
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    
    let lineIndex = 0;
    let wordIndex = 0;
    let currentWords = lyrics[lineIndex].split(" ");
    
    const lineTimeouts = [0, 3600, 1800, 3300, 1900, 3500, 3600, 2400, 1300, 650, 2900, 1900, 3400, 2300, ]; // Delay for each line in milliseconds
    
    
    let timeouId;
    
     // Delay per line (1000ms = 1 second)
    
    
    function showNextWord() {   
        if (lineIndex >= lyrics.length){
    
            setTimeout(() => {
                lyricsBox.innerHTML = ''
            }, 3200);
    
            return;
        };
    
        if (wordIndex === 0) {
            lyricsBox.innerHTML = ""; // Clear previous line
        }
    
        lyricsBox.innerHTML += currentWords[wordIndex] + " ";
        wordIndex++;
    
        if (wordIndex >= currentWords.length) {
            lineIndex++;
            wordIndex = 0;
    
            if (lineIndex < lyrics.length) {
                currentWords = lyrics[lineIndex].split(" ");
                clearTimeout(timeouId);
                timeouId = setTimeout(showNextWord, lineTimeouts[lineIndex]);
                return;
            }
        }
    
        timeouId = setTimeout(showNextWord, 550);
    }
    
    
    function stopWord() {
        clearTimeout(timeouId);
        lyricsBox.innerHTML = '';
        lineIndex = 0;
        wordIndex = 0;
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }  
    
    function startWord() {
        stopWord(); // Reset everything first
        currentWords = lyrics[lineIndex].split(" ");
        startBtn.disabled = true;
        stopBtn.disabled = false;
        audioPlayer.play(); // Start music
        showNextWord();     // Start lyrics
    }
    

    startBtn.addEventListener('click', startWord);
    stopBtn.addEventListener('click', stopWord);
    
    audioPlayer.addEventListener('ended', function() {
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });
    
});