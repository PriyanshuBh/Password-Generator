const inputSlider=document.querySelector("[data-lengthSlider]");
const LengthDisplay=document.querySelector("[data-lengthNumber]");

let passwordDisplay = document.querySelector("input[passwordDisplay]");
let copyBtn = document.querySelector(".copyBtn");
let copyMessage = document.querySelector("[copyMessage]");
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');
let indicator = document.querySelector('.indicator');
const generateBtn=document.querySelector("#generateBtn");
let allcheckBoxes = document.querySelectorAll("input[type=checkbox]");

const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password  ="";
let passwordLength=10;
uppercaseCheck.checked=true;
let checkCount=1;
//  ste strength   circle color to gray
setIndicator("#ccc");

handleSlider();
function handleSlider(){
    inputSlider.value=passwordLength;
    LengthDisplay.innerText=passwordLength;

    const min=inputSlider.min;
    const max =inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";
}

function setIndicator(color){
    indicator.style.backgroundColor = color; 
    // shadow left
    indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}

function getRndInteger(min,max){
  return Math.floor(Math.random()*(max-min))+min ;
}  

function generateRandomnumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
   return String.fromCharCode( getRndInteger(97,123));
}
function generateUpperCase(){
return String.fromCharCode( getRndInteger(65,91));
 }
 function generateSymbol(){
    const index = getRndInteger(0, symbol.length);
    return symbol.charAt(index);
}


function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}


// Why we use it - https://stackoverflow.com/questions/45071353/copy-text-string-on-click#:~:text=15-,Use%20the%20Clipboard,-API!
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);

        copyMessage.innerText = "Copied"
    }
    catch (e) {
        // alert("Something went wrong in CopyContent");
        copyMessage.innerText = "Failed";
    }

    copyMessage.classList.add("active");

    setTimeout(() => {
        copyMessage.classList.remove("active");
    }, 2000)
}



inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
});

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value)
        copyContent();
});

function handleCheckBoxChange(){
   checkCount=0;
    allcheckBoxes.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    }); 

    //special condition
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}
allcheckBoxes.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
});

function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generateBtn.addEventListener('click',()=>{
    // none of the checkbox are selected
    if(checkCount==0)return alert("Check Atleast One");
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();

    }
    // let's start the journey to find new password
    // console.log("starting th jouring");
    //remove old password
    password="";
    //let put the stuff mentioned by checkboxex

    // if(uppercaseCheck.checked){
    //     password+=generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomnumber();
    // }
    // if(symbolsCheck.checked){
    //     password+=generateSymbol();
    // }

    let funcArr=[];
    if (uppercase.checked) funcArr.push(generateUpperCase);
    if (lowercase.checked) funcArr.push(generateLowerCase);
    if (numbers.checked)funcArr.push(generateRandomnumber);
    if (symbols.checked)funcArr.push(generateSymbol);
    // compulsory addition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    //remaining additon
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex = getRndInteger(0,funcArr.length);
        password+=funcArr[randIndex]();
    }

    //shuffle the password
    password=shufflePassword(Array.from(password));

    //show in un
    passwordDisplay.value=password;
    //calculate strength
    calcStrength();

});


 
 

