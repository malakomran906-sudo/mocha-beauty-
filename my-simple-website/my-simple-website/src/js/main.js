document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('contact-form');
	const status = document.getElementById('form-status');
	const navToggle = document.getElementById('nav-toggle');
	const mainNav = document.getElementById('main-nav');

	// Simple nav toggle for small screens
	navToggle && navToggle.addEventListener('click', () => {
		if (!mainNav) return;
		const isHidden = mainNav.style.display === '' || mainNav.style.display === 'none';
		mainNav.style.display = isHidden ? 'flex' : 'none';
	});

	// Form submission (client-side only). In a real site you'd send to a server.
	form && form.addEventListener('submit', (e) => {
		e.preventDefault();
		status.textContent = '';

		const name = form.name.value.trim();
		const email = form.email.value.trim();
		const message = form.message.value.trim();

		if (!name || !email || !message) {
			status.textContent = 'Vinsamlegast fylltu út öll reitina.';
			status.style.color = 'crimson';
			return;
		}

		// basic email check
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
			status.textContent = 'Vinsamlegast sláðu inn gilt netfang.';
			status.style.color = 'crimson';
			return;
		}

		// pretend to send
		status.style.color = '';
		status.textContent = 'Skilaboðin hafa verið send — takk!';

		// clear form
		form.reset();

		// small confirmation animation (temporary)
		setTimeout(() => { status.textContent = ''; }, 5000);
	});
});