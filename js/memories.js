// Add places, categories, or memory entries here. Replace placeholders with personal details later.
const locations = [
	{
		name: '[LOCATION]',
		date: '[DATE]',
		story: '[MEMORY]',
		image: 'images/memories/place-01.jpg',
		fallback: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85',
		alt: 'A photograph from a place we discovered',
		className: 'location-tall'
	},
	{
		name: '[LOCATION]',
		date: '[DATE]',
		story: '[MEMORY]',
		image: 'images/memories/place-02.jpg',
		fallback: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85',
		alt: 'A photograph from a place we discovered'
	},
	{
		name: '[LOCATION]',
		date: '[DATE]',
		story: '[MEMORY]',
		image: 'images/memories/place-03.jpg',
		fallback: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85',
		alt: 'A photograph from a place we discovered'
	},
	{
		name: '[LOCATION]',
		date: '[DATE]',
		story: '[MEMORY]',
		image: 'images/memories/place-04.jpg',
		fallback: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=85',
		alt: 'A photograph from a place we discovered'
	}
];

const memoryCategories = [
	{ icon: '↗', name: 'Rides', note: '[A MEMORY FROM A RIDE]', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80' },
	{ icon: '▣', name: 'Movies', note: '[A MOVIE NIGHT TO REMEMBER]', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80' },
	{ icon: '✳', name: 'Dinner dates', note: '[A DINNER DATE MEMORY]', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80' },
	{ icon: '◌', name: 'Coffee', note: '[A COFFEE BREAK MEMORY]', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80' },
	{ icon: '✈', name: 'Trips', note: '[A MEMORY FROM A TRIP]', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80' },
	{ icon: '✦', name: 'Celebrations', note: '[A CELEBRATION MEMORY]', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80' },
	{ icon: '✳', name: 'Birthdays', note: '[A BIRTHDAY MEMORY]', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80' },
	{ icon: '☾', name: 'Late-night conversations', note: '[A LATE-NIGHT CONVERSATION TO REMEMBER]', image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80' }
];

const memoryStories = [
	{
		title: 'That Random Evening',
		date: '[DATE]',
		location: '[LOCATION]',
		story: '[WRITE THE STORY OF THIS EVENING]',
		image: 'images/memories/random-evening.jpg',
		fallback: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1500&q=85',
		alt: 'A photograph for a random evening together'
	},
	{
		title: 'A Day Out Of Town',
		date: '[DATE]',
		location: '[LOCATION]',
		story: '[WRITE THE STORY OF THIS DAY]',
		image: 'images/memories/day-out.jpg',
		fallback: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1500&q=85',
		alt: 'A photograph from a day away together'
	}
];

function makeElement(tag, className, text) {
	const element = document.createElement(tag);
	if (className) element.className = className;
	if (text) element.textContent = text;
	return element;
}

function makeImage(source, fallback, alt, className) {
	const image = makeElement('img', className);
	image.src = source;
	image.dataset.fallback = fallback;
	image.alt = alt;
	image.loading = 'lazy';
	return image;
}

function renderLocation(location, index) {
	const card = makeElement('article', `location-card reveal${location.className ? ` ${location.className}` : ''}`);
	const imageFrame = makeElement('div', 'location-image-frame');
	imageFrame.append(makeImage(location.image, location.fallback, location.alt, 'location-image'));
	const pin = makeElement('span', 'location-pin', '⌖');
	pin.setAttribute('aria-hidden', 'true');
	imageFrame.append(pin);
	const copy = makeElement('div', 'location-copy');
	copy.append(makeElement('p', 'location-date', location.date));
	copy.append(makeElement('h3', 'location-name', location.name));
	copy.append(makeElement('p', 'location-story', location.story));
	copy.append(makeElement('span', 'location-index', String(index + 1).padStart(2, '0')));
	card.append(imageFrame, copy);
	return card;
}

function renderCategory(category, index) {
	const card = makeElement('details', 'category-card reveal');
	const summary = makeElement('summary', 'category-summary');
	const image = makeElement('img', 'category-image');
	image.src = category.image;
	image.alt = '';
	image.loading = 'lazy';
	const shade = makeElement('span', 'category-shade');
	const label = makeElement('span', 'category-label');
	label.append(makeElement('span', 'category-icon', category.icon));
	label.append(makeElement('span', 'category-name', category.name));
	label.append(makeElement('span', 'category-count', `MEMORY ${String(index + 1).padStart(2, '0')}`));
	const toggle = makeElement('span', 'category-toggle', '+');
	toggle.setAttribute('aria-hidden', 'true');
	summary.append(image, shade, label, toggle);
	const note = makeElement('p', 'category-note');
	note.contentEditable = 'true';
	note.setAttribute('role', 'textbox');
	note.setAttribute('aria-label', `${category.name} memory note`);
	note.spellcheck = true;
	note.textContent = category.note;
	card.append(summary, note);
	return card;
}

function renderEditorialMemory(memory, index) {
	const section = makeElement('article', `editorial-memory reveal${index % 2 === 1 ? ' editorial-memory-reverse' : ''}`);
	const imageFrame = makeElement('div', 'editorial-image-frame');
	imageFrame.append(makeImage(memory.image, memory.fallback, memory.alt, 'editorial-image'));
	const copy = makeElement('div', 'editorial-memory-copy');
	copy.append(makeElement('p', 'eyebrow', `MEMORY ${String(index + 1).padStart(2, '0')}`));
	copy.append(makeElement('p', 'editorial-date', memory.date));
	copy.append(makeElement('h3', 'editorial-title', memory.title));
	copy.append(makeElement('p', 'editorial-story', memory.story));
	const location = makeElement('p', 'editorial-location');
	location.append(makeElement('span', 'editorial-location-mark', '⌖'));
	location.append(document.createTextNode(memory.location));
	copy.append(location);
	section.append(imageFrame, copy);
	return section;
}

document.querySelector('#location-grid')?.replaceChildren(...locations.map(renderLocation));
document.querySelector('#category-list')?.replaceChildren(...memoryCategories.map(renderCategory));
document.querySelector('#editorial-list')?.replaceChildren(...memoryStories.map(renderEditorialMemory));