// Crear estrellas de fondo mejoradas
function createStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = window.innerWidth > 768 ? 200 : 100;
    
    starsContainer.innerHTML = '';
    
    for(let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 4 + 's';
        star.style.animationDuration = (Math.random() * 3 + 3) + 's';
        starsContainer.appendChild(star);
    }
}

// Crear corazones flotantes mejorados
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const hearts = ['💕', '💖', '💗', '💝', '💘', '💓', '💞', '💟'];
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDelay = Math.random() * 6 + 's';
    heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
    
    document.getElementById('floatingHearts').appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 13000);
}

// Crear gatitos flotantes
function createFloatingKitten() {
    const kitten = document.createElement('div');
    kitten.className = 'kitten';
    const kittens = ['🐱', '😻', '🐾', '🐈', '😺', '🙀', '🐱‍👤'];
    kitten.innerHTML = kittens[Math.floor(Math.random() * kittens.length)];
    kitten.style.left = Math.random() * 100 + '%';
    kitten.style.animationDelay = Math.random() * 7 + 's';
    kitten.style.animationDuration = (Math.random() * 6 + 9) + 's';
    
    document.getElementById('floatingKittens').appendChild(kitten);
    
    setTimeout(() => {
        if (kitten.parentNode) {
            kitten.remove();
        }
    }, 15000);
}

// Inicializar efectos de fondo
createStars();

// Crear corazones cada 1.5 segundos
setInterval(createFloatingHeart, 1500);

// Crear gatitos cada 3 segundos
setInterval(createFloatingKitten, 3000);

// Crear elementos iniciales
for(let i = 0; i < 8; i++) {
    setTimeout(createFloatingHeart, i * 400);
}

for(let i = 0; i < 4; i++) {
    setTimeout(createFloatingKitten, i * 1000);
}

// Efectos para cada girasol
const sunflowers = document.querySelectorAll('.sunflower');
let totalClickCount = 0;
let lastClickTime = 0;

sunflowers.forEach((sunflower, index) => {
    let localClickCount = 0;
    
    sunflower.addEventListener('click', function(e) {
        const currentTime = Date.now();
        
        if (currentTime - lastClickTime < 500) return;
        lastClickTime = currentTime;
        
        this.classList.add('clicked');
        
        for(let i = 0; i < 20; i++) {
            setTimeout(() => createSparkle(e), i * 70);
        }
        
        // Crear un gatito extra al click
        createFloatingKitten();
        
        const petals = this.querySelectorAll('.petal');
        petals.forEach((petal, petalIndex) => {
            setTimeout(() => {
                petal.style.background = 'linear-gradient(45deg, #ff1493, #ff69b4, #ffb6c1, #ffaa77)';
                petal.style.transform = petal.style.transform + ' scale(1.15)';
            }, petalIndex * 35);
        });
        
        setTimeout(() => {
            this.classList.remove('clicked');
            petals.forEach((petal, petalIndex) => {
                setTimeout(() => {
                    petal.style.background = 'linear-gradient(45deg, #ffed4e 0%, #ffcc02 25%, #ff9900 50%, #ffaa00 75%, #ffed4e 100%)';
                    petal.style.transform = petal.style.transform.replace(' scale(1.15)', '');
                }, petalIndex * 25);
            });
        }, 1500);
        
        localClickCount++;
        totalClickCount++;
        if(localClickCount === 2) {
            showSpecialMessage();
            localClickCount = 0;
        }
    });
});

function createSparkle(event) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const x = event.clientX + (Math.random() - 0.5) * 250;
    const y = event.clientY + (Math.random() - 0.5) * 250;
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.remove();
        }
    }, 2500);
}

// Mensaje especial con más corazones y gatitos
function showSpecialMessage() {
    const messages = [
        "¡Eres la razón por la que creo en el amor verdadero!",
        "¡Mi corazón te pertenece completamente!",
        "¡Eres mi persona favorita en todo el universo!",
        "¡No puedo esperar a estar contigo para siempre!",
        "¡Eres mi sueño hecho realidad!",
        "¡Contigo he encontrado mi hogar!",
        "¡Tu sonrisa ilumina mi mundo entero!",
        "¡Te amo más de lo que las palabras pueden decir!",
        "¡Eres tan tierna como estos gatitos!"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    const specialMsg = document.createElement('div');
    specialMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #4caf50, #66bb6a, #81c784);
        color: white;
        padding: ${window.innerWidth > 480 ? '30px 40px' : '25px 30px'};
        border-radius: ${window.innerWidth > 480 ? '30px' : '25px'};
        font-size: ${window.innerWidth > 480 ? '1.4rem' : '1.2rem'};
        font-weight: 600;
        text-align: center;
        z-index: 1001;
        box-shadow: 0 25px 60px rgba(0,0,0,0.25);
        animation: popIn 0.8s ease-out;
        max-width: 90vw;
        backdrop-filter: blur(15px);
        border: 3px solid rgba(255,255,255,0.3);
    `;
    
    if (!document.getElementById('popInStyle')) {
        const style = document.createElement('style');
        style.id = 'popInStyle';
        style.textContent = `
            @keyframes popIn {
                0% { 
                    opacity: 0; 
                    transform: translate(-50%, -50%) scale(0.2) rotate(-15deg); 
                }
                50% { 
                    transform: translate(-50%, -50%) scale(1.15) rotate(8deg); 
                }
                100% { 
                    opacity: 1; 
                    transform: translate(-50%, -50%) scale(1) rotate(0deg); 
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    specialMsg.innerHTML = randomMessage;
    document.body.appendChild(specialMsg);
    
    // Corazones
    for(let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['💕', '💖', '💗', '💝', '💞'][Math.floor(Math.random() * 5)];
            heart.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 18 + 18}px;
                pointer-events: none;
                z-index: 1000;
                left: ${50 + (Math.random() - 0.5) * 100}%;
                top: ${50 + (Math.random() - 0.5) * 80}%;
                animation: heartExplode 4s ease-out forwards;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 4000);
        }, i * 100);
    }
    
    // Gatitos extra
    for(let i = 0; i < 10; i++) {
        setTimeout(() => {
            const kitten = document.createElement('div');
            kitten.innerHTML = ['🐱', '😻', '🐾'][Math.floor(Math.random() * 3)];
            kitten.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 20}px;
                pointer-events: none;
                z-index: 1000;
                left: ${50 + (Math.random() - 0.5) * 100}%;
                top: ${50 + (Math.random() - 0.5) * 80}%;
                animation: heartExplode 4s ease-out forwards;
            `;
            document.body.appendChild(kitten);
            
            setTimeout(() => {
                if (kitten.parentNode) {
                    kitten.remove();
                }
            }, 4000);
        }, i * 150);
    }
    
    if (!document.getElementById('heartExplodeStyle')) {
        const heartStyle = document.createElement('style');
        heartStyle.id = 'heartExplodeStyle';
        heartStyle.textContent = `
            @keyframes heartExplode {
                0% { 
                    opacity: 1; 
                    transform: scale(0) rotate(0deg); 
                }
                30% { 
                    opacity: 1; 
                    transform: scale(1.8) rotate(200deg); 
                }
                100% { 
                    opacity: 0; 
                    transform: scale(0) rotate(360deg) translateY(-200px); 
                }
            }
        `;
        document.head.appendChild(heartStyle);
    }
    
    setTimeout(() => {
        if (specialMsg.parentNode) {
            specialMsg.remove();
        }
    }, 6000);
}

// Efectos de hover para cada girasol
sunflowers.forEach(sunflower => {
    sunflower.addEventListener('mouseenter', function() {
        const petals = this.querySelectorAll('.petal');
        petals.forEach((petal, index) => {
            setTimeout(() => {
                petal.style.background = 'linear-gradient(45deg, #4caf50, #66bb6a, #ffd93d, #ffaa00)';
                petal.style.transform = petal.style.transform + ' scale(1.1)';
            }, index * 50);
        });
    });

    sunflower.addEventListener('mouseleave', function() {
        const petals = this.querySelectorAll('.petal');
        petals.forEach((petal, index) => {
            setTimeout(() => {
                petal.style.background = 'linear-gradient(45deg, #ffed4e 0%, #ffcc02 25%, #ff9900 50%, #ffaa00 75%, #ffed4e 100%)';
                petal.style.transform = petal.style.transform.replace(' scale(1.1)', '');
            }, index * 30);
        });
    });
});

// Efectos en las personas
document.getElementById('person1').addEventListener('click', function(e) {
    this.style.background = 'linear-gradient(135deg, #81c784, #e8f5e8)';
    this.style.transform = 'scale(1.25)';
    
    for(let i = 0; i < 7; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.cssText = `
                position: fixed;
                font-size: 20px;
                pointer-events: none;
                z-index: 100;
                left: ${e.clientX + (Math.random() - 0.5) * 120}px;
                top: ${e.clientY + (Math.random() - 0.5) * 120}px;
                animation: floatAway 2.5s ease-out forwards;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 2500);
        }, i * 180);
    }
    
    setTimeout(() => {
        this.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
        this.style.transform = 'scale(1)';
    }, 1000);
});

document.getElementById('person2').addEventListener('click', function(e) {
    this.style.background = 'linear-gradient(135deg, #e8f5e8, #81c784)';
    this.style.transform = 'scale(1.25)';
    
    for(let i = 0; i < 7; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `
                position: fixed;
                font-size: 20px;
                pointer-events: none;
                z-index: 100;
                left: ${e.clientX + (Math.random() - 0.5) * 120}px;
                top: ${e.clientY + (Math.random() - 0.5) * 120}px;
                animation: floatAway 2.5s ease-out forwards;
            `;
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 2500);
        }, i * 180);
    }
    
    setTimeout(() => {
        this.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
        this.style.transform = 'scale(1)';
    }, 1000);
});

if (!document.getElementById('floatAwayStyle')) {
    const floatStyle = document.createElement('style');
    floatStyle.id = 'floatAwayStyle';
    floatStyle.textContent = `
        @keyframes floatAway {
            0% { 
                opacity: 1; 
                transform: scale(1) translateY(0); 
            }
            100% { 
                opacity: 0; 
                transform: scale(0.6) translateY(-120px); 
            }
        }
    `;
    document.head.appendChild(floatStyle);
}

// Efecto de escritura mejorado
function typeWriter(element, text, speed = 45) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.substr(i, 6) === '<br><br>') {
                element.innerHTML += '<br><br>';
                i += 6;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    type();
}

setTimeout(() => {
    const loveText = document.getElementById('loveText');
    const originalText = loveText.innerHTML;
    typeWriter(loveText, originalText, 55);
}, 7000);

// Redimensionar estrellas
window.addEventListener('resize', function() {
    createStars();
});

// Cambio de fondo más frecuente y suave
let backgroundIndex = 0;
const backgrounds = [
    'linear-gradient(-45deg, #e3f2fd, #f3e5f5, #fff3e0, #e8f5e8)',
    'linear-gradient(-45deg, #ffecd2, #fcb69f, #f3e5f5, #e3f2fd)',
    'linear-gradient(-45deg, #e0f7fa, #fed6e3, #f3e5f5, #e8f5e8)',
    'linear-gradient(-45deg, #f3e5f5, #e1bee7, #fff3e0, #e8f5e8)',
    'linear-gradient(-45deg, #fff3e0, #fff8e1, #f3e5f5, #e3f2fd)'
];

setInterval(() => {
    backgroundIndex = (backgroundIndex + 1) % backgrounds.length;
    document.body.style.background = backgrounds[backgroundIndex];
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'gradientShift 25s ease infinite';
}, 40000);