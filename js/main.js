// ===== 1. Рисуем иконки Lucide (превращаем <i data-lucide="..."> в картинки) =====
if (window.lucide) {
	lucide.createIcons();
}

// ===== 2. Меню-«бургер» на телефоне =====
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');

function setMenu(open) {
	nav.classList.toggle('is-open', open);
	burger.setAttribute('aria-expanded', String(open));
	burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
}

burger.addEventListener('click', () => {
	const isOpen = burger.getAttribute('aria-expanded') === 'true';
	setMenu(!isOpen);
});

// Закрываем меню, когда нажали на пункт
nav.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', () => setMenu(false));
});

// Закрываем меню клавишей Esc
document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') setMenu(false);
});

// ===== 3. Тонкая линия под меню, когда страницу прокрутили =====
const header = document.querySelector('.header');

function updateHeader() {
	header.classList.toggle('is-scrolled', window.scrollY > 10);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// ===== 4. Плавное появление блоков при прокрутке =====
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
	// IntersectionObserver следит, когда блок попадает в видимую часть экрана
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target); // показали один раз — больше не следим
			}
		});
	}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

	revealItems.forEach((item) => observer.observe(item));
} else {
	// очень старый браузер — просто показываем всё сразу
	revealItems.forEach((item) => item.classList.add('is-visible'));
}
