// Keep photo details here; the gallery and polaroids are rendered from this list.
const albumPhotos = [
	{ image: 'images/album/photo-01.jpg', preview: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=75', full: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=2000&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Beginning', shape: 'photo-wide' },
	{ image: 'images/album/photo-02.jpg', preview: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=75', full: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Dates', shape: 'photo-small' },
	{ image: 'images/album/photo-03.jpg', preview: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=700&q=75', full: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1800&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Beginning', shape: 'photo-portrait' },
	{ image: 'images/album/photo-04.jpg', preview: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=75', full: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Trips', shape: 'photo-landscape' },
	{ image: 'images/album/photo-05.jpg', preview: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=75', full: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=2000&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Favorite Memories', shape: 'photo-large' },
	{ image: 'images/album/photo-06.jpg', preview: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=75', full: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Trips', shape: 'photo-small' },
	{ image: 'images/album/photo-07.jpg', preview: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=75', full: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2000&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Celebrations', shape: 'photo-landscape' },
	{ image: 'images/album/photo-08.jpg', preview: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=700&q=75', full: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1800&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Random Moments', shape: 'photo-portrait' },
	{ image: 'images/album/photo-09.jpg', preview: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=75', full: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Favorite Memories', shape: 'photo-wide' },
	{ image: 'images/album/photo-10.jpg', preview: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=75', full: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Dates', shape: 'photo-small' },
	{ image: 'images/album/photo-11.jpg', preview: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=75', full: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2000&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Random Moments', shape: 'photo-landscape' },
	{ image: 'images/album/photo-12.jpg', preview: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=75', full: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=90', date: '[DATE]', location: '[LOCATION]', caption: '[CAPTION]', category: 'Celebrations', shape: 'photo-portrait' }
];

const gallery = document.querySelector('#photo-gallery');
const lightbox = document.querySelector('#album-lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const filters = [...document.querySelectorAll('.gallery-filter')];
const polaroidList = document.querySelector('#polaroid-row');
let visiblePhotos = [...albumPhotos];
let lightboxPhotos = [...albumPhotos];
let activePhotoIndex = 0;
let lastFocusedPhoto = null;

function createAlbumElement(tagName, className, text) {
	const element = document.createElement(tagName);
	if (className) element.className = className;
	if (text) element.textContent = text;
	return element;
}

function createPhotoImage(photo) {
	const image = createAlbumElement('img', 'gallery-photo-image');
	image.dataset.fallback = photo.preview;
	image.addEventListener('error', () => {
		if (image.dataset.fallback && !image.dataset.fallbackAttempted) {
			image.dataset.fallbackAttempted = 'true';
			image.src = image.dataset.fallback;
			return;
		}
		image.classList.add('image-unavailable');
	});
	image.src = photo.image;
	image.alt = photo.caption === '[CAPTION]' ? 'Photograph from the album' : photo.caption;
	image.loading = 'lazy';
	image.decoding = 'async';
	return image;
}

function renderPhoto(photo, index) {
	const button = createAlbumElement('button', `gallery-photo reveal ${photo.shape}`);
	button.type = 'button';
	button.dataset.category = photo.category;
	button.setAttribute('aria-label', `Open photograph: ${photo.caption}, ${photo.date}, ${photo.location}`);
	const frame = createAlbumElement('span', 'gallery-photo-frame');
	frame.append(createPhotoImage(photo));
	const overlay = createAlbumElement('span', 'gallery-photo-overlay');
	const caption = createAlbumElement('span', 'gallery-photo-caption');
	caption.append(createAlbumElement('span', 'gallery-photo-date', photo.date));
	caption.append(createAlbumElement('span', 'gallery-photo-title', photo.caption));
	caption.append(createAlbumElement('span', 'gallery-photo-location', photo.location));
	overlay.append(caption);
	button.append(frame, overlay);
	button.addEventListener('click', () => openLightbox(index, button));
	return button;
}

function renderPolaroid(photo, albumIndex) {
	const polaroid = createAlbumElement('button', `polaroid reveal polaroid-${(albumIndex % 3) + 1}`);
	polaroid.type = 'button';
	polaroid.setAttribute('aria-label', `Open photograph: ${photo.caption}`);
	const imageFrame = createAlbumElement('span', 'polaroid-image');
	imageFrame.append(createPhotoImage(photo));
	polaroid.append(imageFrame);
	const note = createAlbumElement('span', 'polaroid-caption');
	note.contentEditable = 'true';
	note.setAttribute('role', 'textbox');
	note.setAttribute('aria-label', 'Handwritten photograph caption');
	note.textContent = photo.caption === '[CAPTION]' ? '[A LITTLE NOTE]' : photo.caption;
	polaroid.append(note);
	polaroid.addEventListener('click', (event) => {
		if (!event.target.closest('[contenteditable="true"]')) openLightbox(albumIndex, polaroid, albumPhotos);
	});
	return polaroid;
}

function renderGallery(photoList) {
	visiblePhotos = photoList;
	gallery.replaceChildren(...photoList.map(renderPhoto));
	document.querySelector('#visible-count').textContent = String(photoList.length).padStart(2, '0');
	requestAnimationFrame(() => {
		gallery.querySelectorAll('.gallery-photo').forEach((photo) => photo.classList.add('is-visible'));
	});
}

function openLightbox(index, source, photos = visiblePhotos) {
	lightboxPhotos = photos;
	activePhotoIndex = index;
	lastFocusedPhoto = source;
	updateLightbox();
	lightbox.showModal();
	document.body.classList.add('lightbox-open');
	document.querySelector('.lightbox-close').focus();
}

function updateLightbox() {
	const photo = lightboxPhotos[activePhotoIndex];
	if (!photo) return;
	lightboxImage.classList.add('is-changing');
	const fullImage = new Image();
	fullImage.src = photo.image;
	fullImage.onload = () => {
		lightboxImage.src = fullImage.src;
		lightboxImage.alt = photo.caption === '[CAPTION]' ? 'Photograph from the album' : photo.caption;
		lightboxImage.classList.remove('is-changing');
	};
	fullImage.onerror = () => {
		fullImage.onerror = () => {
			lightboxImage.src = photo.preview;
			lightboxImage.alt = photo.caption === '[CAPTION]' ? 'Photograph from the album' : photo.caption;
			lightboxImage.classList.remove('is-changing');
		};
		fullImage.src = photo.full;
	};
	document.querySelector('#lightbox-index').textContent = `${String(activePhotoIndex + 1).padStart(2, '0')} / ${String(lightboxPhotos.length).padStart(2, '0')}`;
	document.querySelector('#lightbox-date').textContent = photo.date;
	document.querySelector('#lightbox-caption').textContent = photo.caption;
	document.querySelector('#lightbox-location').textContent = photo.location;
}

function closeLightbox() {
	if (lightbox.open) lightbox.close();
}

function stepLightbox(direction) {
	activePhotoIndex = (activePhotoIndex + direction + lightboxPhotos.length) % lightboxPhotos.length;
	updateLightbox();
}

filters.forEach((filter) => {
	filter.addEventListener('click', () => {
		filters.forEach((button) => {
			const isSelected = button === filter;
			button.classList.toggle('is-active', isSelected);
			button.setAttribute('aria-pressed', String(isSelected));
		});
		const category = filter.dataset.filter;
		const filtered = category === 'All' ? albumPhotos : albumPhotos.filter((photo) => photo.category === category);
		gallery.classList.add('is-filtering');
		window.setTimeout(() => {
			renderGallery(filtered);
			gallery.classList.remove('is-filtering');
		}, 180);
	});
});

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-previous').addEventListener('click', () => stepLightbox(-1));
document.querySelector('.lightbox-next').addEventListener('click', () => stepLightbox(1));
lightbox.addEventListener('close', () => {
	document.body.classList.remove('lightbox-open');
	lastFocusedPhoto?.focus();
});
lightbox.addEventListener('click', (event) => {
	if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
	if (!lightbox.open) return;
	if (event.key === 'ArrowRight') stepLightbox(1);
	if (event.key === 'ArrowLeft') stepLightbox(-1);
	if (event.key === 'Escape') closeLightbox();
});

renderGallery(albumPhotos);
polaroidList.replaceChildren(...albumPhotos.slice(1, 6).map((photo, index) => renderPolaroid(photo, index + 1)));