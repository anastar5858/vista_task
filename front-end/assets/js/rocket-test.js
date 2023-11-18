// const element = document.getElementById('ellipse'); // Replace 'yourElement' with the actual ID or selector of your element
// // Create a new style element
// const style = document.createElement('style');
// document.head.appendChild(style);
// // Get the style sheet associated with the newly added style element
// const styleSheet = style.sheet;
// // Add or update a rule for the ::before pseudo-element
// styleSheet.insertRule(`
// #ellipse::before {
//     visibility: visible;
//   }
// `, styleSheet.cssRules.length);

// // Add or update a rule for the ::after pseudo-element
// styleSheet.insertRule(`
//   #ellipse::after {
//     visibility: visible;
//   }
// `, styleSheet.cssRules.length);

// setTimeout(() => {
//  styleSheet.insertRule(`
//   #ellipse {
//     animation: translateY 5s 1 forwards;
//   }
// `, styleSheet.cssRules.length);   
// }, 5000);



// rocket section *****************************
let count = 0;
let degrees = -10
const prepareRocketLaunch = () => {
    document.getElementById('rocketCount').textContent = count + 1
    const cardContainer = document.getElementById('cardContainer');
    if (count === 9) {
        count = 0;
        degrees = -10;
        // show the cloud and translate
        const cloud = document.createElement('div');
        cloud.classList.add('fireCloud');
        cardContainer.appendChild(cloud);
        setTimeout(() => {
            document.getElementById('cardContainer').style.animation = 'translateY 5s 1 forwards';
            console.log('move');
        }  , 5000)
        return
    } else {
        const newLine = document.createElement('div');
        newLine.classList.add('line-container');
        newLine.style.transform = `rotate(${degrees}deg)`;
        count++
        degrees -= 20;
        cardContainer.appendChild(newLine)
        setTimeout(() => requestAnimationFrame(prepareRocketLaunch), 500)    
    }
    console.log('hi')
}

requestAnimationFrame(prepareRocketLaunch);



