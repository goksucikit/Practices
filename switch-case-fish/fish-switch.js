const fish = document.querySelector('.fish');

let x = 0;
let y = 0;
let fishSpeed = 10;
let reverse = true;
let rotate = 0;

const handleKeyDown = event => {
    if (!event.key.includes('Arrow')) { return; }
    
    switch (event.key) {
        case 'ArrowUp':
            y -= 1;
            rotate = -90;
            break;

        case 'ArrowRight':
            x += 1;
            reverse = false;
            rotate = 0;
            break;

        case 'ArrowDown':
            y += 1;
            rotate = 90;
            break;
            
        case 'ArrowLeft':
            x -= 1;
            reverse = true;
            rotate = 0;
            break;
            
        default:
            console.log('Invalid move!');
            break;    
    }

    fish.setAttribute('style', `
        transform: translateX(var(--x)) translateY(var(--y)) rotateY(var(--backWards)) rotate(var(--upDown));
        transition: transform .5s ease-out;
        --x: ${x * fishSpeed}px;
        --y: ${y * fishSpeed}px;
        --backWards: ${reverse ? '180deg' : '0'};
        --upDown: ${rotate}deg;
    `)

}


window.addEventListener('keydown', handleKeyDown);