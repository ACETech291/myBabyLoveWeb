document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        function createHeart() {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 10 + 5 + "s";
            heart.style.fontSize = Math.random() * 30 + 10 + "px";
            
            heart.innerText = '💗';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                        heart.remove();
                        }, 10000);
        }
        setInterval(createHeart, 300);

        const firstText = ["MY BABY I LOVE", "YOU SO MUCH FOREVER", "YOU AND I"];
        const secondText = ["I LOVE YOU OH", "I LOVE YOU SO MUCH", "FOREVER", "YOU AND I"];

        function typeText(textArray, elementId) {
            return new Promise((resolve, reject) => {
                let i = 0;
                let j = 0;
                let currentPhrase = [];
                let isDeleting = false;
                let isEnd = false;

                function loop() {
                    isEnd = false;
                    elementId.innerHTML = currentPhrase.join('');

                    if (i < textArray.length) {
                        if (!isDeleting && j <= textArray[i].length) {
                            currentPhrase.push(textArray[i][j]);
                            j++;
                            elementId.innerHTML = currentPhrase.join('');
                        }

                        if (isDeleting && j <= textArray[i].length) {
                            currentPhrase.pop(textArray[i][j]);
                            j--;
                            elementId.innerHTML = currentPhrase.join('');
                        }

                        if (j == textArray[i].length) {
                            isEnd = true;
                            isDeleting = true;
                        }

                        if (isDeleting && j === 0) {
                            currentPhrase = [];
                            isDeleting = false;
                            i++;
                        }
                    }
                    const spedUp = Math.random() * 1;
                    const normalSpeed = Math.random() * 150;
                    const time = isEnd ? 500 : isDeleting ? spedUp : normalSpeed;
                    if (i === textArray.length) {
                        resolve();
                    } else {
                        setTimeout(loop, time);
                    }
                }
                loop();
            });
        }

        async function startTyping() {
            await typeText(firstText, document.getElementById('first'));
            document.getElementById('first').style.display = 'none';
            document.getElementById('second').style.display = 'block';
            await typeText(secondText, document.getElementById('second'));
        }

        startTyping();
    }, 2000);
});
