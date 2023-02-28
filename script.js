const output = document.querySelector('.calc__output');
const buttons = document.querySelector('.calc__buttons');
const radioBox = document.querySelector('.radio-box');

const arrNumBtn = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const arrActionBtn = ['=', '+', '-', '/', '*'];

let numberA = '';
let numberB = '';
let actionMem = '';
let expression = '';

buttons.addEventListener('click', handlerBtn);
document.addEventListener('keydown', handlerKeys);
radioBox.addEventListener('click', radioClick);


//Обработка переключателя тем
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

//обработчик нажатых кнопок
function handlerBtn(event){
    if(event.target.nodeName === 'BUTTON'){
        const btnKey = event.target.dataset.btn;
        
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

//Функция вывода 
function setOutput(out){     
    if(!out) out = 0;                       //если строка пустая, выводить 0
    output.innerText = out;                 //отрисовать результат
}


//функция обработки чисел
function setNumber(num,btnKey){
    num += btnKey;
    if(num[0] === '0' && num[1] != '.')                     //Удаляем лишний ноль в начале числа
        num = num.slice(1, 1);    
    
    if(num.indexOf('.') === 0){                             //Если нажади на точку, а в начале нет цифр, дорисовываем ноль перед точкой
        num = '0.'
    }
    if(num.indexOf('.', num.indexOf('.') + 1) > 0){         //Если точка есть, удалаяем все последующие нажатия на точку
       num = deleteNum(num);
    }

    setOutput(num);                                         
    return num;
}

//Функция удаления последнего символа.
function deleteNum(num){
    num = String(num);                      //перевободим число в строку
    num = num.slice(0,-1);                  //удаляем посдений символ
    if(num.length === 0){                   //если закончились символы, возвращаем 0
        num = 0;
    }
    setOutput(num);                         //оотрисовываем результат
    return num;                             //возвращаем результат
}

//Обработчик цифровых кнопок
function numBtn(btnKey){ 
    if(numberB === '' &&  actionMem === ''){    //если второе число пустое и не было нажания на + - * /
        numberA = setNumber(numberA, btnKey);   //вводимое число сохраняем в numberA
    }else{
        numberB = setNumber(numberB, btnKey);   // иначе сохраняем numberB      
    } 
}
//Обработчик кнопки Del
function delBtn(){
    if(numberB === ''){                         //если число NumberB пустое, то значит сейчас на экране число NumberA
        numberA = deleteNum(numberA);           //удалаяем последние цифры из числа NumberA
    }else{
        numberB = deleteNum(numberB);           //иначе удалаяем последние цифры из числа NumberВ
    }
}



//Обработчик кнопки Reset
function resetBtn(){      
    //Обнуляем все перменные, на дисплей выводим 0                        
    numberA = '';
    numberB = '';
    actionMem = '';
    expression = '';
    setOutput('');
}

//Обработчик нажатой кнопки действий + - * /
function actionBtn(action){
    if(action && numberB === ''){                   //если нажали знак действия и при этом число В пустое
        actionMem = action;                         //то запоминаем действие в переменную actionMem
    }else if(action === '='){                       
        actionBtn(actionMem);                       //если нажали =, то вызываем обратчик с запомниным действием
    }else{
        expression = numberA + ' ' + actionMem + ' ' + numberB; 
        actionSwith(actionMem);                     //вызов функции, которая вычисли выражение в соответсвии с действием, которое было в памяти
        numberB = '';                               //обнуляем число В. 
        actionMem = action;                         //запоминаем текущие выбранное действие
        setOutput(numberA);                         //выводим результа на экран

        console.log(`numberA = ${numberA} | numberB = ${numberB} | result = ${numberA} | actionMem = ${actionMem} expression = ${expression}`);
    }     

}

//Функция для выбора и обработки действия
function actionSwith(action){                   //в соответствии с выбранным действием вычисляем значения выражения и записываем в число А
    let corrNum = correctiveNum(numberA, numberB);
    let a = +numberA;
    let b = +numberB;

    switch(action){        
        case '+':                      
            numberA = ( (a * corrNum) + (b * corrNum)) / corrNum; 
            break;
        case '-':
            numberA = ( (a * corrNum) - (b * corrNum)) / corrNum;
            break;
        case '*':
            numberA = ( (a * corrNum) * (b * corrNum)) / corrNum / corrNum;
            break;
        case '/': 
            numberA = (b === 0) ? 0 : ( (a * corrNum) / (b * corrNum)) ;
            break;
    }
}

//Обработчик нажатия клавиш клавиатуры
function handlerKeys(event){
    console.log(event)
    if(arrNumBtn.includes(event.key))       //если нажаты числовые клавиши и .
        numBtn(event.key);              
    if(event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') 
        actionBtn(event.key);                
    if(event.key === 'Enter')
        actionBtn('=')
    if(event.key === 'Delete')
        resetBtn();
    if(event.key === 'Backspace')
        delBtn();
}

//Функция определения количетсва чисел после точки в десятичном числе
function quantityNumbersAfterDot(num){
    num = String(num);
    let dot = num.indexOf('.');
    if(dot > 0){
        return num.length - num.indexOf('.') - 1;           //Вернет количество числе после точки
    }
    return -1;                                              //Вернет -1, если число целое         
}

//Функция определиния число для корректировки вычисления
function correctiveNum(a,b){                                //Принимаем два числа
    let lA = quantityNumbersAfterDot(a);                    //Получаем для каждого числа количествл знаков
    let lB = quantityNumbersAfterDot(b);                    // после точки
    let maxL = Math.max(lA, lB);                            //Определяем у какого числа только знаков
    let numDiv = '1';                                       //Корректирующее число    
    numDiv = numDiv.padEnd(maxL + 1,'0');                   //Формируем число, долняя его необходимым количеством нолей
    console.log(numDiv);
    return +numDiv;                                          //возвращаем корректирующее число
}