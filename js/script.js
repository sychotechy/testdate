document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       GLOBAL BACKGROUND EFFECTS & CURSOR
    ========================================= */
    const bgContainer = document.getElementById('background-effects');
    const cursorSparkle = document.getElementById('cursor-sparkle');
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

    // Desktop Cursor Sparkle
    if (!isMobile) {
        document.addEventListener('mousemove', (e) => {
            cursorSparkle.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
            if (Math.random() < 0.1) createParticle(e.clientX, e.clientY);
        });
    }

    // Mobile Touch Hearts
    if (isMobile) {
        document.addEventListener('touchstart', (e) => {
            for(let i=0; i<e.touches.length; i++) {
                createTapHeart(e.touches[i].clientX, e.touches[i].clientY);
            }
        });
    }

    function createTapHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'tap-heart';
        heart.style.left = `${x - 10}px`;
        heart.style.top = `${y - 10}px`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }

    function createParticle(x, y) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1000);
    }

    // Floating Background Elements
    setInterval(() => {
        const el = document.createElement('div');
        const isHeart = Math.random() > 0.5;
        el.className = isHeart ? 'bg-heart' : 'particle';
        if (isHeart) el.innerHTML = '❤️';
        el.style.left = `${Math.random() * 100}vw`;
        el.style.animationDuration = `${10 + Math.random() * 10}s`;
        bgContainer.appendChild(el);
        setTimeout(() => el.remove(), 20000);
    }, 500);
    
    // Add glowing circles
    for(let i=0; i<5; i++) {
        const circle = document.createElement('div');
        circle.className = 'glow-circle';
        circle.style.width = `${100 + Math.random() * 200}px`;
        circle.style.height = circle.style.width;
        circle.style.left = `${Math.random() * 100}vw`;
        circle.style.top = `${Math.random() * 100}vh`;
        circle.style.animationDelay = `-${Math.random() * 10}s`;
        bgContainer.appendChild(circle);
    }


    /* =========================================
       MUSIC CONTROLS
    ========================================= */
    const musicBtn = document.getElementById('music-btn');
    const bgMusic1 = document.getElementById('bg-music-1');
    const bgMusic2 = document.getElementById('bg-music-2');
    let isPlaying = false;
    let currentMusic = bgMusic1;

    // Set volumes
    bgMusic1.volume = 0.2;
    bgMusic2.volume = 0.2;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            currentMusic.pause();
            musicBtn.innerHTML = '<span class="icon play-icon">♪</span>';
        } else {
            currentMusic.play().catch(e => console.log("Audio play failed:", e));
            musicBtn.innerHTML = '<span class="icon pause-icon">⏸</span>';
        }
        isPlaying = !isPlaying;
    });

    function switchMusic() {
        if (isPlaying) {
            currentMusic.pause();
            currentMusic = bgMusic2;
            currentMusic.play().catch(e => console.log("Audio play failed:", e));
        } else {
            currentMusic = bgMusic2;
        }
    }


    /* =========================================
       TYPEWRITER UTILITY
    ========================================= */
    async function typeWriter(containerId, textArray, speed = 60, pause = 1500) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; 
        
        for (let i = 0; i < textArray.length; i++) {
            const lineObj = textArray[i];
            const text = lineObj.text;
            const linePause = lineObj.pause || pause;
            
            const p = document.createElement('div');
            p.className = 'typewriter-text';
            container.appendChild(p);
            
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            p.appendChild(cursor);

            for (let j = 0; j < text.length; j++) {
                p.insertBefore(document.createTextNode(text.charAt(j)), cursor);
                await new Promise(r => setTimeout(r, speed));
            }
            
            cursor.remove();
            
            if (i < textArray.length - 1) {
                await new Promise(r => setTimeout(r, linePause));
                p.style.opacity = '0.5'; // dim previous lines slightly
            }
        }
    }

    /* =========================================
       PAGE 1 LOGIC
    ========================================= */
    const p1Script = [
        { text: "Hey Kid...", pause: 1500 },
        { text: "I've been wanting to ask you something...", pause: 1500 },
        { text: "Actually...", pause: 1500 },
        { text: "I've been thinking about this for quite some time.", pause: 1500 },
        { text: "I thought asking you normally would be boring...", pause: 1500 },
        { text: "So I built something.", pause: 1500 },
        { text: "Just for you.", pause: 1500 },
        { text: "So...", pause: 2000 },
        { text: "Will you come on a date with me?", pause: 500 }
    ];

    // Start Page 1 sequence
    setTimeout(async () => {
        await typeWriter('p1-typewriter', p1Script);
        document.getElementById('p1-gif').classList.remove('hidden');
        document.getElementById('p1-buttons').classList.remove('hidden');
    }, 1000);

    // No Button Logic
    const btnNo = document.getElementById('btn-no');
    const noTexts = ["Nope", "Nice try 😂", "Illegal", "Access denied", "Think again", "You sure?"];
    
    function runaway(e) {
        // Prevent default tap behavior if on mobile
        if(e.type === 'touchstart') e.preventDefault();

        const btnWidth = btnNo.offsetWidth;
        const btnHeight = btnNo.offsetHeight;
        const maxX = window.innerWidth - btnWidth - 40;
        const maxY = window.innerHeight - btnHeight - 40;
        
        const x = Math.max(20, Math.random() * maxX);
        const y = Math.max(20, Math.random() * maxY);
        
        btnNo.style.position = 'fixed';
        btnNo.style.left = `${x}px`;
        btnNo.style.top = `${y}px`;
        
        // Random transformations
        const scale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
        const rot = (Math.random() - 0.5) * 30; // -15 to 15 deg
        const flip = Math.random() > 0.8 ? 'scaleX(-1)' : '';
        btnNo.style.transform = `scale(${scale}) rotate(${rot}deg) ${flip}`;
        
        // Random opacity
        if (Math.random() > 0.7) {
            btnNo.style.opacity = '0.6';
        } else {
            btnNo.style.opacity = '1';
        }
        
        // Random text
        if (Math.random() > 0.5) {
            btnNo.innerText = noTexts[Math.floor(Math.random() * noTexts.length)];
        }
    }

    btnNo.addEventListener('mouseover', runaway);
    btnNo.addEventListener('touchstart', runaway, {passive: false});
    btnNo.addEventListener('click', runaway); // Just in case they click it

    // Yes Button Logic
    const btnYes = document.getElementById('btn-yes');
    const yesSequence = [
        "❤️ Are you sure?",
        "🥺 Really?",
        "Hmm...",
        "Let's see how badly you want a date with me.",
        "Wait...",
        "You actually came this far?",
        "Interesting...",
        "Okay...",
        "My angry bird.",
        "This is definitely the last button.",
        "...",
        "Just kidding 😂",
        "Two more.",
        "...",
        "Again kidding.",
        "Countdown begins.",
        "3",
        "2",
        "1",
        "Ready?"
    ];
    let yesClickCount = 0;

    btnYes.addEventListener('click', (e) => {
        // Haptic feedback if supported
        if (navigator.vibrate) navigator.vibrate(50);
        
        // Effects
        createTapHeart(e.clientX || window.innerWidth/2, e.clientY || window.innerHeight/2);
        for(let i=0; i<5; i++) createParticle(e.clientX, e.clientY);
        
        btnYes.style.transform = 'scale(0.9)';
        setTimeout(() => btnYes.style.transform = 'scale(1)', 100);

        if (yesClickCount < yesSequence.length) {
            btnYes.innerText = yesSequence[yesClickCount];
            yesClickCount++;
        } else {
            // Transition to Page 2
            document.body.style.animationDuration = '2s'; // Speed up background
            const p1 = document.getElementById('page-1');
            const p2 = document.getElementById('page-2');
            
            p1.classList.remove('active');
            setTimeout(() => {
                p1.classList.add('hidden');
                p2.classList.remove('hidden');
                // Trigger reflow
                void p2.offsetWidth;
                p2.classList.add('active');
                initPage2();
            }, 1500);
        }
    });


    /* =========================================
       PAGE 2 LOGIC
    ========================================= */
    const memoryWords = [
        "Nothing", "Just a little bit", "Music", "Bairan", "Kid", "Ice-cream", "Tiramisu",
        "you cute -N", "Idiot", "U Idiot", "Elaborate", "Coffee", "Coming for a walk?",
        "Something fs", "Daymnn", "Say say...", "U go", "U poda patti", "Niuuu", "One day",
        "Some day", "Shleepy", "Sleepy head", "BMW", "Sworry", "Kid", "-N", "I am a kid",
        "I win", "Yes I can", "🥺Am I that bad🤣", "0.005%", "Let it be", "I like", "Spiderman",
        "Chata khayega", "Go-kart", "Nevermind", "Zendaya", "Spiderman", "--remove feelings",
        "I think so", "Idk", "Lunch,,, let's go", "Nope", "Say na,,,", "Say say", "Noice",
        "Pasta", "The chair", "Cheese", "Nini", "Majboor", "Pal Pal", "Par channa de",
        "Ye tune kya kiya", "Bari", "O rangrez", "Haan ke haan", "Pahado ki aur", "Kunju",
        "Bilkul bilkul", "It is what it is", "Sab batadu", "Lil bit", "Kochu kochu pieces",
        "Ouwww", "Chole kulche", "Momos", "Pichu", "Pikachu"
    ];

    let bmwClicks = 0;

    function initPage2() {
        const container = document.getElementById('floating-memories-container');
        
        memoryWords.forEach((word) => {
            const el = document.createElement('div');
            el.className = 'memory-word';
            el.innerText = word;
            
            // Random initial position
            let x = Math.random() * 90; // vw
            let y = Math.random() * 90; // vh
            el.style.left = `${x}vw`;
            el.style.top = `${y}vh`;
            
            container.appendChild(el);

            // Floating animation logic
            setInterval(() => {
                x += (Math.random() - 0.5) * 5; // move slightly
                y += (Math.random() - 0.5) * 5;
                // keep in bounds loosely
                if(x < -10) x = 100; if(x > 100) x = -10;
                if(y < -10) y = 100; if(y > 100) y = -10;
                
                el.style.transform = `translate(${x}px, ${y}px)`;
            }, 3000 + Math.random() * 2000);

            // Interaction
            el.addEventListener('click', (e) => {
                el.classList.add('active');
                createTapHeart(e.clientX, e.clientY);
                setTimeout(() => el.classList.remove('active'), 1000);

                // Easter egg check
                if (word === "BMW") {
                    bmwClicks++;
                    if (bmwClicks === 3) {
                        openEasterEgg();
                    }
                }
            });
        });

        // Trigger gallery fade ins
        setTimeout(() => {
            document.querySelectorAll('.gallery-item').forEach((item, index) => {
                setTimeout(() => item.classList.add('visible'), index * 500);
            });
        }, 1000);
    }

    const btnContinue = document.getElementById('btn-continue');
    btnContinue.addEventListener('click', () => {
        const p2 = document.getElementById('page-2');
        const p3 = document.getElementById('page-3');
        
        p2.classList.remove('active');
        setTimeout(() => {
            p2.classList.add('hidden');
            document.getElementById('floating-memories-container').style.opacity = '0.2'; // Keep memories but dim
            
            p3.classList.remove('hidden');
            void p3.offsetWidth;
            p3.classList.add('active');
            initPage3();
        }, 1500);
    });

    /* =========================================
       PAGE 3 LOGIC
    ========================================= */
    const p3Script1 = [
        { text: "One last thing...", pause: 1500 },
        { text: "Why 11-07-2026?", pause: 1500 },
        { text: "It's been exactly three months since our first coffee/day out.", pause: 2000 },
        { text: "Time really flies.", pause: 1500 },
        { text: "Why it's good to date a car guy.", pause: 2000 }
    ];

    const p3Script2 = [
        { text: "Please consider this our first simple date.", pause: 1500 },
        { text: "The next one...", pause: 1000 },
        { text: "...will be much more special.", pause: 2000 },
        { text: "...once our financial department approves the budget 😂", pause: 2500 },
        { text: "I don't really know where all of this is heading.", pause: 1500 },
        { text: "But I know one thing.", pause: 1500 },
        { text: "I can't stop thinking about you.", pause: 1500 },
        { text: "Every single day.", pause: 1500 },
        { text: "And somehow...", pause: 1500 },
        { text: "I find one more reason to like you.", pause: 1500 },
        { text: "I hope this date becomes one of many beautiful memories together.", pause: 2000 }
    ];

    async function initPage3() {
        await typeWriter('p3-typewriter-1', p3Script1);
        
        const custom1 = document.getElementById('p3-custom-text-1');
        custom1.classList.remove('hidden');
        custom1.style.opacity = 0;
        custom1.style.transition = "opacity 1s";
        setTimeout(() => custom1.style.opacity = 1, 100);
        
        await new Promise(r => setTimeout(r, 2000)); // Pause to let them read custom placeholder
        
        await typeWriter('p3-typewriter-2', p3Script2);

        const custom2 = document.getElementById('p3-custom-text-2');
        custom2.classList.remove('hidden');
        custom2.style.opacity = 0;
        custom2.style.transition = "opacity 1s";
        setTimeout(() => custom2.style.opacity = 1, 100);

        await new Promise(r => setTimeout(r, 2000));

        document.getElementById('p3-final-btn-container').classList.remove('hidden');
    }

    // Final Button Confession
    const btnFinal = document.getElementById('btn-final');
    btnFinal.addEventListener('click', () => {
        // Switch Music
        switchMusic();

        // UI Changes
        btnFinal.style.display = 'none';
        document.getElementById('p3-gif').classList.remove('hidden');
        
        const terms = document.getElementById('terms-section');
        terms.classList.remove('hidden');
        
        document.body.style.background = 'linear-gradient(135deg, #2a0b14, #4a1122, #581525, #3e0d19)';
        
        // Confetti Loop
        for(let i=0; i<50; i++) {
            setTimeout(createConfetti, i * 50);
        }
        setInterval(() => {
            for(let i=0; i<5; i++) createConfetti();
        }, 1000);
    });

    function createConfetti() {
        const colors = ['#ffb6c1', '#800000', '#ffffff', '#ff69b4'];
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = `${Math.random() * 100}vw`;
        c.style.top = `-10px`;
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDuration = `${3 + Math.random() * 2}s`;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 5000);
    }

    /* =========================================
       EASTER EGG LOGIC
    ========================================= */
    const easterEggPage = document.getElementById('easter-egg-page');
    const btnReturn = document.getElementById('btn-return');

    function openEasterEgg() {
        document.querySelectorAll('.page.active').forEach(p => {
            p.classList.remove('active');
            p.classList.add('was-active'); // remember to restore
        });
        easterEggPage.classList.remove('hidden');
        void easterEggPage.offsetWidth;
        easterEggPage.classList.add('active');
    }

    btnReturn.addEventListener('click', () => {
        easterEggPage.classList.remove('active');
        setTimeout(() => {
            easterEggPage.classList.add('hidden');
            document.querySelectorAll('.was-active').forEach(p => {
                p.classList.remove('was-active');
                p.classList.add('active');
            });
        }, 1500);
    });

});
