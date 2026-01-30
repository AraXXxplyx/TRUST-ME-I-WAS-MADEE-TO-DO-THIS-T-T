// ===========================
// SOUND EFFECT UTILITIES
// ===========================

const soundManager = {
    play: function(soundId, volume = 0.1) {
        const audio = document.getElementById(soundId);
        if (audio) {
            audio.volume = volume;
            audio.currentTime = 0;
            audio.play().catch(err => console.log('Audio play failed:', err));
        }
    }
};

// ===========================
// TYPEWRITER EFFECT
// ===========================

function typeWriter(element, text, speed = 50, callback = null) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            soundManager.play('chimeSound', 0.05); // subtle sound per character
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
}

// ===========================
// STAR SPAWNING SYSTEM
// ===========================

function spawnStar(container) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random position
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    star.style.left = left + '%';
    star.style.top = top + '%';
    
    // Random animation delay
    const delay = Math.random() * 2;
    star.style.animationDelay = delay + 's';
    
    container.appendChild(star);
    
    // Remove star after 15 seconds
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 15000);
}

function startStarSpawner() {
    const containers = document.querySelectorAll('.stars-container');
    
    containers.forEach(container => {
        // Spawn initial stars
        for (let i = 0; i < 20; i++) {
            spawnStar(container);
        }
        
        // Continue spawning in loop
        setInterval(() => {
            if (Math.random() < 0.5) { // 50% chance every 3-5 seconds
                spawnStar(container);
            }
        }, Math.random() * 2000 + 3000);
    });
}

// ===========================
// SCENE MANAGEMENT
// ===========================

function switchScene(fromScene, toScene) {
    fromScene.classList.remove('active');
    toScene.classList.add('active');
}

// ===========================
// APP INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Start star spawner
    startStarSpawner();
    
    // Homepage button
    document.getElementById('appraisalBtn').addEventListener('click', function() {
        soundManager.play('whooshSound', 0.2);
        const homepage = document.getElementById('homepage');
        const realm = document.getElementById('appraisalRealm');
        switchScene(homepage, realm);
        setTimeout(startDialogue, 600);
    });

    // Continue button
    document.getElementById('continuePrompt').addEventListener('click', function() {
        document.getElementById('introContainer').classList.add('hidden');
        document.getElementById('formContainer').classList.remove('hidden');
    });

    // Enter button
    document.getElementById('enterBtn').addEventListener('click', function() {
        const name = document.getElementById('nameInput').value.trim();
        const birthdate = document.getElementById('birthdateInput').value;
        if (name) {
            showResults(name, birthdate);
        }
    });
});

// ===========================
// DIALOGUE SYSTEM
// ===========================

function startDialogue() {
    const dialogueText = "Welcome mortal to the realm of witches, I shall look into your personality, and tell you important things about yourself and more, BE AWARE YOU WILL BE SPEECHLESS BUT ITS THE TRUTH!! HEHE";
    const dialogueElement = document.getElementById('dialogueText');
    typeWriter(dialogueElement, dialogueText, 30, function() {
        document.getElementById('continuePrompt').classList.remove('hidden');
    });
}

// ===========================
// RESULTS LOGIC
// ===========================

function showResults(name, birthdate) {
    document.getElementById('formContainer').classList.add('hidden');
    document.getElementById('resultsContainer').classList.remove('hidden');
    
    const logElement = document.getElementById('resultsLog');
    logElement.innerHTML = '';
    
    let resultText = '';
    if (name.toLowerCase() === 'om chauhan') {
        resultText = `Greetings, OM Chauhan! You are a visionary developer with a passion for creating immersive digital experiences. Your attention to detail and love for pixel art shines through in everything you do. Keep crafting those indie gems!`;
    } else {
        resultText = `Hello, ${name}! You possess a curious mind and a creative spirit. Your journey in life is filled with opportunities for growth and self-discovery. Embrace your unique path and let your inner light guide you.`;
    }
    
    typeWriter(logElement, resultText, 20);
}

function startIntroAnimation() {
    soundManager.play('chimeSound', 0.25);

    // The intro lines are already set up with animation delays in CSS
    // Wait for last line animation to finish (3.6s animation delay + 0.8s duration = 4.4s)
    const totalIntroTime = 4400;

    setTimeout(() => {
        showContinueButton();
    }, totalIntroTime);
}

// ===========================
// CONTINUE BUTTON LOGIC
// ===========================

function showContinueButton() {
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.classList.remove('hidden');
}

document.getElementById('continueBtn').addEventListener('click', function() {
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.classList.add('hidden');

    // Show form panel after a brief delay
    setTimeout(() => {
        showFormPanel();
    }, 300);
});

// ===========================
// FORM PANEL MANAGEMENT
// ===========================

function showFormPanel() {
    const formContainer = document.getElementById('formContainer');
    formContainer.classList.remove('hidden');
    formContainer.classList.add('visible');
}

// ===========================
// RESULTS LOGIC
// ===========================

function showResults(name, birthdate) {
    document.getElementById('formContainer').classList.add('hidden');
    document.getElementById('resultsContainer').classList.remove('hidden');
    
    const logElement = document.getElementById('resultsLog');
    logElement.innerHTML = '';
    
    let resultText = '';
    if (name.toLowerCase() === 'om chauhan') {
        resultText = `Chances to be Born Male: 79%

Personality:
You dear child are a really unique soul,
You are both an introvert and an extrovert depending on your mood,
you're kind and quiet on the outside but on the inside you're a psychopath who does things as he pleases,
But you are especially kind towards the weak because in your life you will end up hurting someone
and realize how wrong it was,
your heart would never forgive you but the almighty might.

Future:
No one can define their future lol bozo

Compatibility:
You have a low compatibility chance until the age of 19
the universe will prevent you from falling for someone else no matter what,
but if you do come across someone who was meant to be yours
she would be born on May 20, 21, 22, or 23 with a compatibility of 98%
and the one born on the 24th would have 120% compatibility`;
    } else {
        resultText = `The Mystery Awaits:
Your true essence is shrouded in the cosmic mysteries of the universe.
The stars whisper of your unique journey, yet their secrets remain untold...
Only "OM Chauhan" has the privilege of witnessing the complete prophecy.

A Gift for You:
But fear not, noble soul. The realm recognizes your courage in seeking truth.
May your path be enlightened by the gentle glow of the mystical forces.`;
    }
    
    typeWriter(logElement, resultText, 20);
}
