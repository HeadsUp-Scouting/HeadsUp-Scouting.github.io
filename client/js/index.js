let current = 0;
const total = 4;
let timer;

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => window.goToSlide((current + 1) % total), 5000);
}

window.goToSlide = function(index) {
    current = index;
    document.getElementById('slides').style.transform = `translateX(-${index * 100 / total}%)`;
    document.querySelectorAll('.slide-dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
    });
    resetTimer();
};

// Swipe mobile
const slidesEl = document.getElementById('slides');
let touchStartX = 0;

slidesEl.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });

slidesEl.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
    window.goToSlide(dx < 0
        ? Math.min(current + 1, total - 1)
        : Math.max(current - 1, 0)
    );
    }
}, { passive: true });

resetTimer();