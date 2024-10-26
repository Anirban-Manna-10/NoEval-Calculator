let result = document.querySelector("#result");
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let msg = document.querySelector(".errorMsg");
let delButton = document.querySelector(".del");
let allDel = document.querySelector(".allDel");
class calculator{
    constructor() {
        this.result = '';
        this.pre = '';
        this.curr = '';
        this.op = '';
        this.ans = '';
    }
    addNo(n){
        this.curr += n;
        result.value += n; 
        console.log("curr : "  + this.curr);
        console.log("pre : "  + this.pre);
    }
    addOp(currOp){ 
        if(this.pre == ''){
            this.ans = '';
            this.pre = this.curr;
            this.op = currOp;
            this.curr = '';
            result.value += "" + currOp; 
        }else{
            if(this.op == ''){
                this.op = currOp;
                result.value += "" + currOp;
                return;
            }
            try {
            let op1 = Number(this.pre);
            let op2 = Number(this.curr);
            let ans;
            console.log(op1 + "   " + op2);
            switch(this.op){
                case "+":
                    this.ans = op1 + op2;
                    break;
                case "-":
                    this.ans = op1 - op2;
                    break;
                case "*":
                    this.ans = op1 * op2;
                    break;
                case "/":
                    this.ans = op1 / op2;
                    break;
                case "%":
                    this.ans = op1 % op2;
                    break;
                case "":
                    this.pre = '';
                    this.curr = '';
                    this.op = '';
                    throw "Invalid expression" ;
                    break;
            }
            if(this.ans == Infinity){
                this.ans = 0;
                throw "No can't devide by 0 .";
            }
            this.pre = this.ans;
            this.op = currOp;
            this.curr = '';
            result.value = this.ans + "" + currOp;
            } catch (error) {
                this.pre = '';
                this.curr = '';
                this.op = '';
                this.ans = '';
                result.value = '';
                console.error(error);
                msg.innerHTML = error;
            }

        }

        if(currOp == '='){
            if(this.pre == ''){
                result.value = this.pre + this.curr;
                msg.innerHTML = "Invalid Input";
            }else{
                this.curr = '';
                this.op = '';
                result.value = this.ans;
            }
        }
    }
}
const cal = new calculator();
result.value = cal.curr;


numbers.forEach( (button) => {
    button.addEventListener('click' , (e) =>{
        cal.addNo(e.target.innerHTML);
    })
})

operators.forEach( (button) => {
    button.addEventListener('click' , (e) =>{
        let op = e.target.getAttribute('val');
        cal.addOp(e.target.getAttribute('val'));
    })
})

delButton.addEventListener('click' , (e) =>{
    if(cal.curr.length <= 0){
        if(result.value != '' && cal.pre == ''){
            result.value = '';
        }
        return;
    }else{
        cal.curr = cal.curr.slice(0,-1); 
        result.value = cal.pre + cal.op + cal.curr;
    }
})

allDel.addEventListener('click' , (e) =>{
    cal.ans = '';
    cal.pre = '';
    cal.curr = '';
    cal.op = '';
    result.value = '';
})


