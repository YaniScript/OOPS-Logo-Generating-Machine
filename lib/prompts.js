const inquirer = require("inquirer");
const fs = require("fs/promises");
const path = require('path');

function generateSvg(text, textColor, shape, shapeColor) {
    const shapeObject = createShapeObject(shape, shapeColor);
    const textElement = `<text x="100" y="130" fill="${textColor}" font-size="35" stroke="black" stroke-width=".06">${text}</text>`;
    const shapeElement = shapeObject.render();

    return `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">${shapeElement}${textElement}</svg>`
}

function createShapeObject (shape, color) {
    const { Circle, Square, Triangle } = require('./shapes');

    switch (shape) {
        case 'Circle':
            return new Circle(color);
        case 'Triangle':
            return new Triangle(color);
        case 'Square': 
            return new Square(color);
        default:
            throw new Error('Invalid shape');
    }
}


const logoQuestions = [
    inquirer
    .prompt ([
        {
            type: 'input',
            message: 'What text would you like your logo to include?',
            name: 'Title'
        },
        {
            type: 'input',
            message: 'What color would you like the text of your logo to be? MUST be a Hexadecimal value starting with hashtag followed by a six-digit code',
            name: 'TitleColor'
        },
        {
            type: 'list',
            message: 'What shape would you like your logo to be?',
            choices: [
                'Circle',
                'Triangle',
                'Square',
            ],
            name: 'LogoShape'
        },
        {
            type: 'input',
            message: 'What color should that shape of your logo be? MUST be a Hexadecimal value starting with hashtag followed by a six-digit code',
            name: 'LogoShapeColor'
        }
    ])
    .then((answers) => {
        const { Title, TitleColor, LogoShape, LogoShapeColor } = answers;
        const svg = generateSvg(Title, TitleColor, LogoShape, LogoShapeColor);
        const filePath = path.join(__dirname, 'logo.svg');
        fs.writeFile(filePath, svg);
        console.log('Done');
    })
]