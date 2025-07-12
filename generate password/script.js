 const PasswordBox= document.getElementById("Password");

        const length=12;
        const upperCase="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerCase="abcdefghijklmnopqrstuvwxyz";
        const number="0123456789";
        const symbol="!@#$%^&*()_-+={}[]<>/?";
        const all=lowerCase+upperCase+number+symbol;
        function createPassword(){
            let Password="";
            Password+= upperCase[Math.floor(Math.random() * upperCase.length)];
            Password+= lowerCase[Math.floor(Math.random() * lowerCase.length)];
            Password+= number[Math.floor(Math.random() * number.length)];
            Password+= symbol[Math.floor(Math.random() * symbol.length)];
            while(Password.length<length){
                Password+= all[Math.floor(Math.random() * all.length)];
            }
            PasswordBox.value=Password;
        }
        function copyPassword(){
            if(PasswordBox.value===''){
                alert("please generate password");
            }
            else{
            PasswordBox.select();
            document.execCommand("copy");
            showToast();
            }
        }
        function showToast(){
            let toastBox= document.getElementById('toastBox');
            let toast = document.createElement('div');
            toast.classList.add('toast');
            toast.innerHTML='<i class="fa-solid fa-circle-check"></i>Successfully copied';
            toastBox.appendChild(toast);
            setTimeout(()=>{
                toast.remove();
            },6000);
        }