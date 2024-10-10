const inputSlider=document.querySelector("[data-lengthSlider]")
const lengthDisplay=document.querySelector("[data-lengthNumber]")
const passwordDisplay=document.querySelector("[data-passwordDisplay]")
    const copyBtn=document.querySelector("[data-copy]")  
    const copyMsg=document.querySelector("[data-copyMsg]")
    const uppercaseCheck=document.querySelector("#uppercase") 
    const lowercaseCheck=document.querySelector("#lowercase")       
    const numbersCheck=document.querySelector("#numbers")    
    const symbolsCheck=document.querySelector("#symbols")
    const indicator=document.querySelector("[data-indicator]")
    const generateBtn=document.querySelector(".generateButton")
    const allcheckBox=document.querySelectorAll("input[type=checkbox]")
    const symbols='!@#$%^&*(){}":?><,./'

    let password="";
    let passwordLength=10;
    let checkCount=0    ;  
   
    handleSlider(); 
    setIndicator("white");       
    function handleSlider(){
              inputSlider.value=passwordLength; 
              lengthDisplay.innerText=passwordLength;
              
              const min = inputSlider.min;
              const max = inputSlider.max;    
              
    } 
    function setIndicator(color){
        indicator.style.backgroundColor=color;
    }
    function getRndInteger(min,max){
        return Math.floor(Math.random() * (max-min)+min)
    }
    function getRndNumber(){
        return getRndInteger(0,9)
    }
    function getUppercase(){
        return String.fromCharCode(getRndInteger(65,91))
    }   
    function getLowercase(){    
        return String.fromCharCode(getRndInteger(97,123))
    }       
    function getsymbol(){
      const randNum=getRndInteger(0,symbols.length);
      return symbols[randNum];
             
    }
    
    
    function calcStrength(){
            let hasUpper = false;
            let hasLower = false;
            let hasNum = false;
            let hasSym = false;
            if (uppercaseCheck.checked){ hasUpper = true;}
            if (lowercaseCheck.checked){ hasLower = true;}              
            if (numbersCheck.checked) {hasNum = true;}
            if (symbolsCheck.checked) { hasSym = true;}
        
            if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
            setIndicator("#0f0");
            }

            else if (
            (hasLower || hasUpper) &&
            (hasNum || hasSym) &&
            passwordLength >= 6 
            ) {
            setIndicator("#ff0");   
            }   
                    else {
                setIndicator("#f00"); 
                }   
    }
    async function copyContent(){
           
           try{   
            await navigator.clipboard.writeText(passwordDisplay.value)
            copyMsg.innerText="Copied";
            
           }
        catch{
            copyMsg.innerText("Failed")

        }
        copyMsg.classList.add("active");
            setTimeout( () => {
                copyMsg.classList.remove("active");
            },2000); 
    }

    function shufflePassword(array)
    {
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
    function handleCheckBoxChange(){
        checkCount=0;
        allcheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;   
        if(passwordLength<checkCount)
            passwordLength=checkCount;
        handleSlider();  
                       
        });
    }
    copyBtn.addEventListener('click',()=>{
        if(passwordDisplay.value)
    copyContent();  
    
   })
    inputSlider.addEventListener('input',(e)=>{
        passwordLength=inputSlider.value;   
        handleSlider();
    })


allcheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange)
}   )
generateBtn.addEventListener('click',()=>{
    if(checkCount ==0)
            return;
        if (passwordLength<checkCount){
            passwordLength=checkCount;
            handleSlider(); 
        }
        password=""
 let funcArr=[];
            if(uppercaseCheck.checked){
              funcArr.push(getUppercase)  
            }
            if(lowercaseCheck.checked){
                funcArr.push(getLowercase)
            }
            
            if(numbersCheck .checked){
                funcArr.push(getRndNumber)    
            } 
            if(symbolsCheck.checked){
                funcArr.push(getsymbol)    
            }
            for(let i=0;i<funcArr.length;i++){
                    password+=funcArr[i]();
            }
            for(let i=0;i<passwordLength-funcArr.length;i++){
                let randIndex= getRndInteger(0,funcArr.length)
                password+=funcArr[randIndex]();     
        }   
        password = shufflePassword(Array.from(password));        
                passwordDisplay.value=password;
                calcStrength();




})

