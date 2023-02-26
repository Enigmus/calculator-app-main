const output = document.querySelector('.calc__output');
const buttons = document.querySelector('.calc__buttons');
const radioBox = document.querySelector('.radio-box');

const arrNumBtn = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const arrActionBtn = ['equals', 'plus', 'minus', 'div', 'multipl'];

let result = 0;
let check = false;
let actionMem = '';
let number1 = '0';
let number2 = '0';
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
        const btn = event.target.dataset.btn;
        //console.log(event.target.dataset.btn)
        if(arrNumBtn.includes(btn)){
            numBtn(btn);
        }
        if(arrActionBtn.includes(btn)){
            actionBtn(btn);
        }
        if(btn === 'reset'){
            resetBtn();
        }
        if(btn === 'del'){
            delBtn();
        }
    }
    
}

function setOutput(out){ 
    //Если строка пустая, выводить 0
    if(!out) out = 0;
    output.innerText = out;
}

//обработка чиловых кнопок + точка
function numBtn(num){ 
    number2 += num;
    //отрезаем лишний ноль в начале строки
     if(number2[0] == '0'){
       number2 = number2.slice(1);
    }  
    setOutput(number2);
}

function delBtn(){
    if(number2.length > 0){
        number2 = number2.slice(0, -1);
        if(number2.length === 0)
            number2 = 0;
    }
    setOutput(number2);

    //console.log(`number1 = ${number1} | number2 = ${number2} | result = ${result} | actionMem = ${actionMem} expression = ${expression}`);
}

function resetBtn(){
    result = 0;
    number1 = 0;
    number2 = 0;
    actionMem = '';
    expression = ''
    setOutput(result);
}

function actionBtn(action){
    if(number1 === '0'){
        number1 = number2;
        number2 = '0';
        actionMem = action;

        expression = number1 + actionMem + number2;
        console.log(`number1 = ${number1} | number2 = ${number2} | result = ${result} | actionMem = ${actionMem} expression = ${expression}`);
    }else{

    
        switch(actionMem){
            case 'plus':
                number1 = Number(number1) + Number(number2);
                nulls('plus')
                console.log(`number1 = ${number1} | number2 = ${number2} | result = ${result} | actionMem = ${actionMem} expression = ${expression}`);
                break;
            case 'minus':
                result = Number(number1) - Number(number2);
                break;
            case 'div':
                result = Number(number1) / Number(number2);
                break;
            case 'multipl':
                result = Number(number1) * Number(number2);
                break;
            default:
                console.log('equals');
                resetBtn(); 
                               
                break;
        }
        setOutput(number1);
    }       
    
}

function nulls(action){
    //number1 = res;
    number2 = '0';
    actionMem = action;
}

console.log(`number1 = ${number1} | number2 = ${number2} | result = ${result} | actionMem = ${actionMem} expression = ${expression}`);











function handlerKeys(event){
    console.log(event)
    if(arrNumBtn.includes(event.key))
        numBtn(event.key);
}