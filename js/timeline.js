// Add, reorder, or update memories here. Keep personal details as placeholders until ready.
const timelineEvents = [
	{
		date: '[YEAR / DATE]',
		title: 'WE MET',
		story: '[WRITE YOUR STORY HERE]',
		location: '[LOCATION]',
		image: 'images/timeline/we-met.jpg',
		fallback: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1100&q=85',
		alt: 'A photograph for the day we met'
	},
	{
		date: '[DATE]',
		title: 'FIRST CONVERSATION',
		story: '[WRITE YOUR STORY HERE]',
		location: '[LOCATION]',
		image: 'images/timeline/first-conversation.jpg',
		fallback: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1100&q=85',
		alt: 'A photograph for the first conversation'
	},
	{
		date: '[DATE]',
		title: 'FIRST DATE',
		story: '[WRITE YOUR STORY HERE]',
		location: '[LOCATION]',
		image: 'images/timeline/first-date.jpg',
		fallback: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=85',
		alt: 'A photograph for the first date'
	},
	{
		date: '[DATE]',
		title: 'FIRST PHOTO TOGETHER',
		story: '[WRITE YOUR STORY HERE]',
		location: '[LOCATION]',
		image: 'images/timeline/first-photo-together.jpg',
		fallback: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1100&q=85',
		alt: 'A photograph for the first picture together'
	},
	{
		date: '[DATE]',
		title: 'THE PROPOSAL',
		story: '[WRITE YOUR STORY HERE]',
		location: '[LOCATION]',
		image: 'images/timeline/proposal.jpg',
		fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85',
		alt: 'A photograph to remember the proposal',
		featured: true,
		quote: '[ADD A QUOTE OR WORDS YOU WANT TO REMEMBER]'
	},
	{
		date: '[DATE]',
		title: 'FIRST TRIP',
		story: '[WRITE YOUR STORY HERE]',
		location: '[LOCATION]',
		image: 'images/timeline/first-trip.jpg',
		fallback: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1100&q=85',
		alt: 'A photograph from the first trip together'
	},
	{
		date: '[DATE]',
		title: 'SPECIAL MEMORY',
		story: '[WRITE YOUR STORY HERE]',
		location: '[LOCATION]',
		image: 'images/timeline/special-memory.jpg',
		fallback: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1100&q=85',
		alt: 'A photograph for a special memory'
	}
];

const timelineList = document.querySelector('#memory-timeline');

function createElement(tagName, className, text) {
	const element = document.createElement(tagName);
	if (className) element.className = className;
	if (text) element.textContent = text;
	return element;
}

function renderTimelineEvent(event, index, sideIndex) {
	const side = event.featured ? 'featured' : sideIndex % 2 === 0 ? 'left' : 'right';
	const item = createElement('li', `memory-event memory-event-${side} reveal`);
	const marker = createElement('span', 'event-marker');
	marker.setAttribute('aria-hidden', 'true');
	item.append(marker);

	const card = createElement('article', 'event-card');
	const imageFrame = createElement('div', 'event-image-frame');
	const image = createElement('img', 'event-image');
	image.src = event.image;
	image.dataset.fallback = event.fallback;
	image.alt = event.alt;
	image.loading = index === 0 ? 'eager' : 'lazy';
	imageFrame.append(image);
	card.append(imageFrame);

	const copy = createElement('div', 'event-copy');
	copy.append(createElement('p', 'event-date', event.date));
	if (event.featured) {
		copy.append(createElement('p', 'eyebrow featured-kicker', 'A promise for what comes next'));
		copy.append(createElement('h2', 'event-title featured-title', 'THE DAY EVERYTHING CHANGED'));
	} else {
		copy.append(createElement('h2', 'event-title', event.title));
	}
	copy.append(createElement('p', 'event-story', event.story));
	const location = createElement('p', 'event-location', event.location);
	location.prepend(createElement('span', 'location-mark', '↗'));
	copy.append(location);
	if (event.quote) {
		const quote = createElement('blockquote', 'event-quote', event.quote);
		copy.append(quote);
	}
	card.append(copy);
	item.append(card);
	return item;
}

if (timelineList) {
	let sideIndex = 0;
	timelineEvents.forEach((event, index) => {
		timelineList.append(renderTimelineEvent(event, index, sideIndex));
		if (!event.featured) sideIndex += 1;
	});

	const count = document.querySelector('.timeline-top-note span:last-child');
	if (count) count.innerHTML = `01 <i></i> ${String(timelineEvents.length).padStart(2, '0')}`;
}

const timelineSection = document.querySelector('.timeline-section');
let progressFrame = false;

function updateTimelineProgress() {
	if (!timelineSection) return;
	const bounds = timelineSection.getBoundingClientRect();
	const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.72 - bounds.top) / (bounds.height * 0.88)));
	timelineSection.style.setProperty('--timeline-progress', `${progress * 100}%`);
	progressFrame = false;
}

function requestTimelineProgress() {
	if (!progressFrame) {
		window.requestAnimationFrame(updateTimelineProgress);
		progressFrame = true;
	}
}

window.addEventListener('scroll', requestTimelineProgress, { passive: true });
window.addEventListener('resize', requestTimelineProgress);
updateTimelineProgress();