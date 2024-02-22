const subtitleFile = document.getElementsByTagName('audio')[0].dataset.subtitle;
console.log(subtitleFile);

async function loadSubtitles() {
    try {
        const response = await fetch(subtitleFile); // Adjust the path as needed
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setupSubtitles(data);
    } catch (error) {
        console.error("Could not load the subtitles JSON file:", error);
    }
}

function setupSubtitles(subtitles) {
    const audio = document.getElementById('audio');
    const subtitleDiv = document.getElementById('subtitle');

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const segment = subtitles.segments.find(segment => currentTime >= segment.start && currentTime <= segment.end);
        if (segment) {
            subtitleDiv.innerHTML = segment.text;
        } else {
            subtitleDiv.innerHTML = ''; // Clear subtitle when not in any segment
        }
    });
}

loadSubtitles(); // Call this function to start the process