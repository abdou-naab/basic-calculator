let ac = document.querySelector('.ac')
let c = document.querySelector('.c')
let dev = document.querySelector('.dev')
let mul = document.querySelector('.mul')
let min = document.querySelector('.min')
let plu = document.querySelector('.plu')
let equ = document.querySelector('.equ')
let zero = document.querySelector('.zero')
let fp = document.querySelector('.fp')
let one = document.querySelector('.one')
let two = document.querySelector('.two')
let three = document.querySelector('.three')
let four = document.querySelector('.four')
let five = document.querySelector('.five')
let six = document.querySelector('.six')
let seven = document.querySelector('.seven')
let eight = document.querySelector('.eight')
let nine = document.querySelector('.nine')
let topScreen = document.querySelector('.screen .top')
let downScreen = document.querySelector('.screen .down')
let fpLeft = false;
let fpRight = false;
let numbers = ['0','1','2','3','4','5','6','7','8','9']
let operators = ['+', '-', '*', '/']
let operatorsObject = {
  'plu':'+',
  'min':'-',
  'mul':'*',
  'dev': '/'
}
let patternFull = /^([-+]?[0-9]+(\.)?[0-9]* [+-/*] [0-9]+(\.)?[0-9]*)$/g
let patternOne = /^([-+]?[0-9]+(\.)?[0-9]*)$/g
let patternTwo = /^([-+]?[0-9]+(\.)?[0-9]* [+-/*]) $/g

document.addEventListener('keydown', (e) => {
    let TSC = topScreen.textContent
    let DSC = downScreen.textContent
    //                                       pattern 'a op b' 

    if((TSC.match(patternFull) && e.key == '=') || (TSC.match(patternFull) && e.key == 'Enter')){ 
        let n1 = parseFloat(TSC.split(' ')[0])
        let op = TSC.split(' ')[1]
        let n2 = parseFloat(TSC.split(' ')[2])
        let result;
        switch (op) {
            case '+':
              result = n1 + n2;
              break;
            case '-':
              result = n1 - n2;
              break;
            case '*':
              result = n1 * n2;
              break;
            case '/':
              result = n1 / n2; 
               break;
        }
        fpRight = false
        if (/\./.test(result)){
          result = Math.round(result * 100) / 100
          fpLeft = true
        } else if (!(/\./.test(result))){
          fpLeft = false
        }
        if (result != Infinity){
            topScreen.textContent = result
            downScreen.textContent = result
        } else {
            topScreen.textContent = '0'
            downScreen.textContent = 'Math Err'
        }
    } else if (e.key == 'Escape'){
      topScreen.textContent = "0"
      downScreen.textContent = '0'
      fpRight = false
        fpLeft = false
    } else if (e.key == 'Backspace'){
      if (TSC.match(patternFull)){ topScreen.textContent = TSC.replace(/.$/, '') }
        else if (TSC.match(patternTwo)) {topScreen.textContent = TSC.replace(/ . /g, '')}
        else if (TSC.match(patternOne) && TSC.match(/^\d$/g)) {topScreen.textContent = "0"}
        else { topScreen.textContent = TSC.replace(/.$/, '') }
    }

    if(TSC.match(patternOne) && e.key == '.' && !fpLeft){
      topScreen.textContent = TSC + '.';
      fpLeft = true
    } else if (TSC.match(patternFull) && e.key == '.' && !fpRight){
      topScreen.textContent = TSC + '.';
        fpRight = true
    } 

    //                                            pattern 'a op '

     else if(TSC.match(patternTwo) && numbers.includes(e.key)){
        topScreen.textContent = TSC.concat(e.key) 

    //                                            pattern 'a'
    
    } else if(TSC.match(patternOne) && e.key == '='){   
      downScreen.textContent = TSC
    } else if (TSC == '0' && numbers.includes(e.key)){
        topScreen.textContent = e.key
    }
    else if (TSC == '0' && (operators.includes(e.key))){
      // do nothing 
    }
    
    else if((TSC.match(patternOne) || TSC.match(patternFull) ) && numbers.includes(e.key)){   
      topScreen.textContent = TSC.concat(e.key) 
    } else if(TSC.match(patternOne) && operators.includes(e.key)){    //  
      topScreen.textContent = TSC.concat(` ${e.key} `) 
        downScreen.textContent = `${TSC}`
    }   

  });




document.addEventListener('click', (e) => {
  let TSC = topScreen.textContent
  let DSC = downScreen.textContent
  switch(e.target){
    case ac:
      topScreen.textContent = "0"
      downScreen.textContent = '0'
      fpRight = false
        fpLeft = false
      break;
    case c:
      if (TSC.match(patternFull)){ topScreen.textContent = TSC.replace(/.$/, '') }
        else if (TSC.match(patternTwo)) {topScreen.textContent = TSC.replace(/ . /g, '')}
        else if (TSC.match(patternOne) && TSC.match(/^\d$/g)) {topScreen.textContent = "0"}
        else { topScreen.textContent = TSC.replace(/.$/, '') }
      break;
    case equ:
      if(TSC.match(patternFull)){

        let n1 = parseFloat(TSC.split(' ')[0])
        let op = TSC.split(' ')[1]
        let n2 = parseFloat(TSC.split(' ')[2])
        let result;
        switch (op) {
            case '+':
              result = n1 + n2;
              break;
            case '-':
              result = n1 - n2;
              break;
            case '*':
              result = n1 * n2;
              break;
            case '/':
              result = n1 / n2; 
               break;
        }
        fpRight = false
        if (/\./.test(result)){
          result = Math.round(result * 100) / 100
          fpLeft = true
        } else if (!(/\./.test(result))){
          fpLeft = false
        }
        if (result != Infinity){
            topScreen.textContent = result
            downScreen.textContent = result
        } else {
            topScreen.textContent = '0'
            downScreen.textContent = 'Math Err'
        } 
      }
      break;
   
    
    } 
  //                                   floating point          
 if(TSC.match(patternOne) && e.target.className == 'fp' && !fpLeft){
      topScreen.textContent = TSC + '.';
      fpLeft = true
  } else if (TSC.match(patternFull) && e.target.className == 'fp' && !fpRight){
    topScreen.textContent = TSC + '.';
      fpRight = true
  } 

  //                                            pattern 'a op '

   else if(TSC.match(patternTwo) && numbers.includes(e.target.innerText)){
    topScreen.textContent = TSC.concat(e.target.innerText) 
    } 
  //                                            pattern 'a'
  else if(TSC.match(patternOne) && e.target == equ){   
    downScreen.textContent = TSC
  }
    else if (TSC == '0' && numbers.includes(e.target.innerText)){
        topScreen.textContent = e.target.innerText
    }else if (TSC == '0' && (e.target == dev || e.target == mul || e.target == plu || e.target == min)){
      // do nothing 
  } 
    else if((TSC.match(patternOne) || TSC.match(patternFull) ) && numbers.includes(e.target.innerText)){   
      topScreen.textContent = TSC.concat(e.target.innerText) 
    } else if(TSC.match(patternOne) && (e.target == dev || e.target == mul || e.target == plu || e.target == min)){    // 
        topScreen.textContent = TSC.concat(` ${operatorsObject[e.target.className]} `)     
        downScreen.textContent = `${TSC}`
    } 
}); 