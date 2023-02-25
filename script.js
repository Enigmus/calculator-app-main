const output = document.querySelector('.calc__output');
const buttons = document.querySelector('.calc__buttons');

const arrNumBtn = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const arrActionBtn = ['equals', 'plus', 'minus', 'div', 'multipl'];

let result = 0;
let check = false;
let num1 = '';
let num2 = '';
let actionMem = '';




buttons.addEventListener('click', handlerBtn);
document.addEventListener('keydown', handlerKeys);


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
    num2 += num; 
    //отрезаем лишний ноль в начале строки
    if(num2[0] === '0'){
       num2 = num2.slice(1,1);
    }  
    setOutput(num2);
}

function delBtn(){
    if(num2.length > 0){
        num2 = num2.slice(0, -1);
    }
    setOutput(num2);

    console.log(`num1 = ${num1}\nnum2 = ${num2}\nresult = ${result}\nactionMem = ${actionMem}`);
}

function resetBtn(){
    result = 0;
    num1 = '';
    num2 = '';
    actionMem = '';
    setOutput(result);
   // console.log(`num1 = ${num1}\nnum2 = ${num2}\nresult = ${result}\nactionMem = ${actionMem}`);
}

function actionBtn(action){
    if(num1 === ''){
        num1 = num2;
        num2 = '';
        actionMem = action;
    }else{
        switch(actionMem){
            case 'plus':
                result = Number(num1) + Number(num2);
                nulls(action, result);
                break;
            case 'minus':
                result = Number(num1) - Number(num2);
                nulls(action, result);
                break;
            case 'div':
                result = Number(num1) / Number(num2);
                nulls(action, result);
                break;
            case 'multipl':
                result = Number(num1) * Number(num2);
                nulls(action, result);
                break;
            default:
                console.log('equals');
                resetBtn();
                
                break;
        }
        setOutput(result);
        console.log(`num1 = ${num1}\nnum2 = ${num2}\nresult = ${result}\nactionMem = ${actionMem}`);
    }    
    
}

function nulls(action, res){
    num1 = res;
    num2 = '';
    actionMem = action;
}












function handlerKeys(event){
    console.log(event)
    if(arrNumBtn.includes(event.key))
        numBtn(event.key);12
}


//console.log(buttons);