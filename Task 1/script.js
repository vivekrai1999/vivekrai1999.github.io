// function to create elements
function createHTMLElement(tagName, attributes = {}, styles = {}, parent) {
    const element = document.createElement(tagName);
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    applyStyles(element, styles);
    if(parent) parent.appendChild(element);
    return element;
}

// function to apply styles 
function applyStyles(element, styles) {
    for (const property in styles) {
      element.style[property] = styles[property];
    }
}

// element creation
const mainDiv = createHTMLElement('div', {class:'main', id: 'main'},{
    height:'100vh',
    width:'100%',
    backgroundColor: 'palegreen'
}, document.body)

const containerDiv = createHTMLElement('div', {class:'container', id:'container'},{
    display:' flex',
    height: '90%',
    width: '90%',
    // backgroundColor: 'red',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}, mainDiv)

const leftContainer = createHTMLElement('div', {class: 'left'},{
    height: "100%",
    width: "50%",
    // backgroundColor: "pink",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1vw"
},containerDiv)

const rightContainer = createHTMLElement('div', {class: 'right'},{
    height: "100%", 
    width: "50%", 
    // backgroundColor: "rgba(255, 255, 0, 0.486)", 
    display: "flex", 
    gap: "2vw",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
},containerDiv)

const mainColorDiv = createHTMLElement('div', {class:'main-color', id:'mainColor'},{
    padding : '1vw',
    width : '20vw',
    height : '20vw',
    color: '#fff',
    borderRadius: '5px',
    textTransform: 'uppercase',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
}, leftContainer
)

const thumbnailsdiv = createHTMLElement('div', {class:'thumbnails-container', id:'thumbnailsContainer'},{
    display : 'flex',
    alignItems : 'center',
    justifyContent : 'center',
    width : '70%',
    flexWrap :'wrap',
    gap : '1vw',
}, leftContainer
)

// Buttons
const buttons = ['ALL', 'RED', 'BLUE', 'GREEN'];
buttons.forEach((buttonName)=>{
    const btn = createHTMLElement('button',{id:`${buttonName.toLowerCase()}Button`},{
        width: "40%",
        padding : '2vw 2vw', 
        fontSize : '1vw',
        borderRadius: '5px',
        border: "none",
        color: `${buttonName}`,
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        cursor: 'pointer',
}, rightContainer);
btn.textContent = buttonName
})

// Dropdown 
const dropDown = createHTMLElement('select',{id:'colorDropdown'},{
    padding : '1vw 2vw', 
    fontSize : '1vw'
}, rightContainer);

const dropdownOptions = ['All', 'Red', 'Blue', 'Green'];
dropdownOptions.forEach((colorOption)=>{
    const optionName = createHTMLElement('option',{id: `${colorOption.toLowerCase()}`, value: colorOption.toLowerCase()},{}, dropDown)
    optionName.textContent = colorOption;
})


// color Array
const colors = [
    {name: 'blue', value: '#0000FF'},
    {name: 'blue', value: '#7393B3'},
    {name: 'blue', value: '#0096FF'},
    {name: 'blue', value: '#0047AB'},
    {name: 'blue', value: '#6495ED'},
    {name: 'red', value: '#880808'},
    {name: 'red', value: '#AA4A44'},
    {name: 'red', value: '#EE4B2B'},
    {name: 'green', value: '#AAFF00'},
    {name: 'green', value: '#097969'},
    {name: 'green', value: '#AFE1AF'},
    {name: 'green', value: '#DFFF00'},
]


const mainColor = document.getElementById('mainColor');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');
const redButton = document.getElementById('redButton');
const greenButton = document.getElementById('greenButton');
const blueButton = document.getElementById('blueButton');
const colorDropdown = document.getElementById('colorDropdown');

function populateThumbnails(color){
    thumbnailsContainer.innerHTML = '';
    // create new array of the selected color
    var filteredColors = colors.filter((colorObj)=>colorObj.name===color || color==='all');
    // set the main color to thye first element
    mainColor.style.backgroundColor = filteredColors[0].value;
    mainColor.textContent = `${filteredColors[0].name}-1/${filteredColors.length}`;
    // create thumbnail
    filteredColors.forEach((colorObj, index)=>{
        var thumbnail = createHTMLElement('div',{class: 'color-div'},{
            backgroundColor: colorObj.value,
            color: "#fff",
            width: '6vw',
            height: '6vw',
            fontSize: '0.8vw',
            padding: '0.5vw',
            borderRadius: '5px',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            cursor: 'pointer',
        }, thumbnailsContainer);
        thumbnail.textContent = `${index + 1}/${filteredColors.length}`;
        thumbnail.addEventListener('click',()=>changeMainColor(colorObj.value, colorObj.name, index, filteredColors.length));
    })
}

// initial render with all colors
populateThumbnails('all');


// change main color 
function changeMainColor(color, colorName, index, len){
    // remove border from previously selected thumbnails
    const thumbnails = document.querySelectorAll('.color-div');
    thumbnails.forEach((thumbnail) => {
        thumbnail.style.border = 'none';
    });

    // border to the clicked thumbnail
    const clickedThumbnail = thumbnails[index];
    clickedThumbnail.style.border = '2px solid black';

    mainColor.style.backgroundColor = color;
    mainColor.textContent = `${colorName}-${index+1}/${len}`;
}

allButton.addEventListener('click',()=>populateThumbnails('all'));
redButton.addEventListener('click',()=>populateThumbnails('red'));
greenButton.addEventListener('click',()=>populateThumbnails('green'));
blueButton.addEventListener('click',()=>populateThumbnails('blue'));
colorDropdown.addEventListener('change',()=>{
    const selectedColor = colorDropdown.value;
    populateThumbnails(selectedColor);
})

// remove default
document.body.style.margin = '0';
document.body.style.padding = '0';







