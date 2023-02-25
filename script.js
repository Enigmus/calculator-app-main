const output = document.querySelector('.calc__output');
const buttons = document.querySelector('.calc__buttons');

const arrNumBtn = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const arrActionBtn = ['del', 'reset', 'equals',
                        'plus', 'minus', 'div', 'multipl'    
                    ];

let result = 0;
let check = false;
let num1 = '';
let num2 = '';
let actionMem = '';




buttons.addEventListener('click', handlerBtn);


function handlerBtn(event){
    if(event.target.nodeName === 'BUTTON'){
        console.log(event.target.dataset.btn)
        if(arrNumBtn.includes(event.target.dataset.btn)){
            numBtn(event.target.dataset.btn);
        }
        if(arrActionBtn.includes(event.target.dataset.btn)){
            actionBtn(event.target.dataset.btn);
        }
    }
    
}

function setOutput(out){
    if(!out) out = 0;
    output.innerText = out;
}

function numBtn(num){
    num2 += num;
    setOutput(num2);
}

function actionBtn(action){
    if(action === 'del'){
        if(num2.length > 0){
            num2 = num2.slice(0, -1);
        }
        setOutput(num2);
    }
    if(action === 'reset'){
        num2 = '';
        setOutput(num2);
    }
    if(action === 'plus'){
        if(actionMem){
            actionMem = action;
        }
        console.log(action)
    }
}


console.log(buttons);