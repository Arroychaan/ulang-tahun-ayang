document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Splash Screen ---
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');

    setTimeout(() => {
        splashScreen.style.transition = 'opacity 0.5s ease';
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
            // Must set transition BEFORE changing opacity
            mainContent.style.transition = 'opacity 1s ease';
            // Force reflow so browser registers display:block before opacity change
            mainContent.offsetHeight;
            mainContent.style.opacity = '1';

            typeWriterHero();
            initSwiper();

            // Play hero audio after loading
            const heroAudio = document.getElementById('hero-audio');
            if (heroAudio) {
                heroAudio.play().catch(e => console.log("Autoplay prevented by browser:", e));
            }
        }, 500);
    }, 2500);

    // --- 2. Swiper.js Initialization ---
    function initSwiper() {
        const swiper = new Swiper('.mySwiper', {
            direction: 'vertical',
            effect: 'creative',
            creativeEffect: {
                prev: {
                    shadow: true,
                    translate: [0, '-20%', -1],
                    opacity: 0,
                },
                next: {
                    translate: [0, '100%', 0],
                },
            },
            speed: 600,
            grabCursor: true,
            mousewheel: {
                forceToAxis: true,
                sensitivity: 1,
                thresholdDelta: 30,
            },
            touchEventsTarget: 'container',
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            keyboard: {
                enabled: true,
            },
            on: {
                slideChange: function () {
                    const heroAudio = document.getElementById('hero-audio');
                    if (heroAudio) {
                        if (this.activeIndex === 0) {
                            // Optional: you can choose to resume or restart if they scroll back up. 
                            // But usually, it's better to leave it paused if they already heard it, or restart it.
                            // Let's restart it for now if they go back.
                            // heroAudio.currentTime = 0;
                            // heroAudio.play().catch(e => {});
                        } else {
                            // STOP audio if they scroll to next slides
                            heroAudio.pause();
                            heroAudio.currentTime = 0;
                        }
                    }

                    // Optional: trigger animations based on active slide
                    if (this.activeIndex === 4) {
                        // Finale slide reached
                    }
                }
            }
        });
    }

    // --- 3. Hero Typewriter & Hari Kita ---
    const heroTitle = document.getElementById('hero-title');
    const heroText = "Buat Ayangnya aku, Suci Ramadhani tung tung sahur yang sedikit nyebelin terus tapi akunya sangat sayang sekali💜";
    let i = 0;

    function typeWriterHero() {
        if (i < heroText.length) {
            heroTitle.innerHTML += heroText.charAt(i);
            i++;
            setTimeout(typeWriterHero, 50);
        } else {
            // Animate other elements after typewriter
            const delayedElements = document.querySelectorAll('.fade-in-delayed');
            delayedElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.style.transition = 'all 0.5s ease';
                }, index * 200);
            });
        }
    }

    // Initialize hidden state for delayed elements
    document.querySelectorAll('.fade-in-delayed').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
    });

    const jadianDate = new Date('2026-07-13T00:00:00').getTime();
    const widgetText = document.getElementById('hari-kita-text');

    function updateHariKita() {
        const now = new Date().getTime();
        const difference = now - jadianDate;
        const daysDifference = Math.floor(Math.abs(difference) / (1000 * 60 * 60 * 24));

        if (difference >= 0) {
            widgetText.innerText = `Hari ke-${daysDifference + 1} bareng Ucul 💜`;
        } else {
            widgetText.innerText = `H-${daysDifference} menuju hari jadian kita 🎉`;
        }
    }
    updateHariKita();

    // --- 4. Flip Cards Logic ---
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // --- 5. Custom Audio Player (Voice Note) ---
    const audio = document.getElementById('voice-note');
    const playBtn = document.getElementById('play-btn');
    const waveform = document.querySelector('.waveform');

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            // Note: will only play if src is valid, otherwise it might error silently
            audio.play().catch(e => console.log("Audio file not found yet."));
            playBtn.innerHTML = '⏸';
            playBtn.classList.add('playing');
            waveform.classList.add('active');
        } else {
            audio.pause();
            playBtn.innerHTML = '▶';
            playBtn.classList.remove('playing');
            waveform.classList.remove('active');
        }
    });
    audio.addEventListener('ended', () => {
        playBtn.innerHTML = '▶';
        playBtn.classList.remove('playing');
        waveform.classList.remove('active');
    });

    // --- 6. Microphone Cake (Tiup Lilin) Logic ---
    const startMicBtn = document.getElementById('start-mic-btn');
    const micHint = document.getElementById('mic-hint');
    const cakeContainer = document.getElementById('cake-container');
    const flame = document.getElementById('flame');
    const glow = document.getElementById('glow');
    const secretContainer = document.getElementById('secret-message-container');
    const secretMessage = document.getElementById('secret-message');
    let audioContext;
    let analyser;
    let microphone;
    let isBlown = false;

    startMicBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            startMicBtn.style.display = 'none';
            cakeContainer.style.display = 'flex';
            micHint.innerHTML = "Lilin menyala! Coba tiup ke arah *microphone* HP-mu sekarang! 🌬️";

            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);

            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            function checkBlow() {
                if (isBlown) return;

                analyser.getByteFrequencyData(dataArray);
                // Calculate average volume
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    sum += dataArray[i];
                }
                let average = sum / bufferLength;

                // Threshold for blowing (adjust if needed, usually around 80-100 for a blow)
                if (average > 100) {
                    blowOutCandle();
                } else {
                    // Make flame flutter based on slight volume changes
                    let flutter = 1 + (average / 200);
                    flame.style.transform = `scale(${flutter})`;
                    requestAnimationFrame(checkBlow);
                }
            }
            checkBlow();

        } catch (err) {
            console.error('Error accessing microphone:', err);
            micHint.innerHTML = "Yah, mic-nya nggak dapet izin. Tapi gapapa, tap lilinnya aja buat ditiup! 👆";
            startMicBtn.style.display = 'none';
            cakeContainer.style.display = 'flex';

            // Fallback: tap to blow
            cakeContainer.addEventListener('click', blowOutCandle);
        }
    });

    function blowOutCandle() {
        if (isBlown) return;
        isBlown = true;

        // Hide Flame
        flame.style.opacity = '0';
        glow.style.opacity = '0';
        micHint.innerHTML = "YAY! Lilin berhasil ditiup! 🎉";

        // Massive Confetti
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#FFB6D9', '#E6D7F5', '#AEDFF7']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#FFB6D9', '#E6D7F5', '#AEDFF7']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // Typewriter Secret Message
        setTimeout(() => {
            secretContainer.style.display = 'block';
            const text = "Makasih ya udah jadi bagian paling lucu di hidup aku. Semoga ayang kebaikannya semakin melimpah, semoga ayang semakin dewasa tapi jangan terlalu dewasa yaa sayangg, soalnya ayang kalo marah + dewasa banget rey nya serem. wish your the best ayang";
            let j = 0;
            function typeSecret() {
                if (j < text.length) {
                    if (text.charAt(j) === '\n') {
                        secretMessage.innerHTML += '<br>';
                    } else {
                        secretMessage.innerHTML += text.charAt(j);
                    }
                    j++;
                    setTimeout(typeSecret, 50);
                }
            }
            typeSecret();
        }, 1500);
    }
});
