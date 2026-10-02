const startDateInput = document.querySelector('#start-date');
const daysCount = document.querySelector('#days-count');
const musicButton = document.querySelector('.music-toggle');
const song = document.querySelector('#optional-song');
const musicStatus = document.querySelector('.music-status');
const savedStartDate = localStorage.getItem('our-story-start-date');

function updateDaysTogether() {
	if (!startDateInput.value) {
		daysCount.textContent = '[NUMBER]';
		return;
	}

	const [year, month, day] = startDateInput.value.split('-').map(Number);
	const start = Date.UTC(year, month - 1, day);
	const today = new Date();
	const currentDay = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
	const days = Math.floor((currentDay - start) / 86400000);
	daysCount.textContent = days >= 0 ? days.toLocaleString() : '[NUMBER]';
}

if (savedStartDate) startDateInput.value = savedStartDate;
updateDaysTogether();

startDateInput.addEventListener('input', () => {
	localStorage.setItem('our-story-start-date', startDateInput.value);
	updateDaysTogether();
});

musicButton.addEventListener('click', async () => {
	if (song.paused) {
		try {
			await song.play();
			musicButton.setAttribute('aria-pressed', 'true');
			musicButton.setAttribute('aria-label', 'Pause the optional song');
			musicStatus.textContent = '';
		} catch {
			musicStatus.textContent = 'Add your song at audio/our-song.mp3 to play it here.';
		}
	} else {
		song.pause();
		musicButton.setAttribute('aria-pressed', 'false');
		musicButton.setAttribute('aria-label', 'Play the optional song');
	}
});

song.addEventListener('ended', () => {
	musicButton.setAttribute('aria-pressed', 'false');
	musicButton.setAttribute('aria-label', 'Play the optional song');
});