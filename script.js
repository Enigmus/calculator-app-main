const output = document.querySelector('.calc__output');
const buttons = document.querySelector('.calc__buttons');
const radioBox = document.querySelector('.radio-box');

const arrNumBtn = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const arrActionBtn = ['=', '+', '-', '/', '*'];

let result = 0;
let numberA = '';
let numberB = '';
let actionMem = '';
let expression = '';


buttons.addEventListener('click', handlerBtn);
document.addEventListener('keydown', handlerKeys);
radioBox.addEventListener('click', radioClick);



function radioClick(){
    const html = document.getElementsByTagName('html')[0];
    if(document.getElementById('theme2').checked){
        html.className = 'theme2';
    }else if(document.getElementById('theme3').checked){
        html.className = 'theme3';
    }else if(document.getElementById('theme1').checked){
        html.className = '';
    }
}


function handlerBtn(event){
    if(event.target.nodeName === 'BUTTON'){
        const btnKey = event.target.dataset.btn;
        //console.log(event.target.dataset.btn)
        if(arrNumBtn.includes(btnKey)){
            numBtn(btnKey);
        }
        if(arrActionBtn.includes(btnKey)){
            actionBtn(btnKey);
        }
        if(btnKey === 'reset'){
            resetBtn();
        }
        if(btnKey === 'del'){
            delBtn();
        }
    }
    
}

function setOutput(out){ 
    //Если строка пустая, выводить 0
    if(!out) out = 0;
    output.innerText = out;
}

function setNumber(num,btnKey){
    num += btnKey;
    /* if(num[0] === '0')
        num = num.slice(1); */
    
    setOutput(+num);
    return +num;
}

function numBtn(btnKey){ 
    if(numberB === '' &&  actionMem === ''){
        numberA = setNumber(numberA, btnKey);
    }else{
        numberB = setNumber(numberB, btnKey);        
    } 
    console.log(numberA, ' - ', numberB)
}

function delBtn(){
    if(numberB === ''){
        numberA = deleteNum(numberA);
    }else{
        numberB = deleteNum(numberB);
    }
}

function deleteNum(num){
    num = String(num);
    num = num.slice(0,-1);
    if(num.length === 0){
        num = 0;
    }
    setOutput(num);
    return num;
}

function resetBtn(){
    result = 0;
    numberA = '';
    numberB = '';
    actionMem = '';
    expression = '';
    setOutput('');
    console.log('reset')
}

function actionBtn(action){
    if(action && numberB === ''){
        actionMem = action;
    }else if(action === '='){
        actionBtn(actionMem);
    }else{
        expression = numberA + ' ' + actionMem + ' ' + numberB;
        actionSwith(actionMem);
        numberB = '';
        actionMem = action;
        setOutput(numberA);        
        console.log(`numberA = ${numberA} | numberB = ${numberB} | result = ${numberA} | actionMem = ${actionMem} expression = ${expression}`);
    }     

}

function actionSwith(action){
    switch(action){
        case '+':
            numberA = +numberA + +numberB;  
            break;
        case '-':
            numberA = +numberA - +numberB;
            break;
        case '*':
            numberA = +numberA * +numberB;
            break;
        case '/':   
            numberA = +numberA / +numberB;
            break;
    }
}

function handlerKeys(event){
    console.log(event)
    if(arrNumBtn.includes(event.key))
        numBtn(event.key);
    if(event.key === '+'){
        actionBtn('+',false);
    }
}
