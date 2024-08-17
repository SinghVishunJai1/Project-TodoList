//  date and time
let b;
let time;
let date;

setInterval(()=>{

    b=new Date();
    date=b.getDate()+','+b.getMonth()+','+b.getFullYear();
    time=b.getHours()+':'+b.getMinutes()+':'+b.getSeconds();
    document.getElementById('time').innerHTML=time+"<br></br>"+date;
},1000)



// others

const inputBox =document.getElementById('inputBox');
const addBtn=document.getElementById('add');
const todoList=document.getElementById('todoList');

let editTodo=null;
const addButton =()=>{
    
    const inputData=inputBox.value.trim();


    if(inputData.length === 0){
        alert("You have to write something..........");
        return;

    }
    if(addBtn.value === "Edit"){
        editLocalStorage(editTodo.target.previousElementSibling.innerHTML)
        editTodo.target.previousElementSibling.innerHTML = inputBox.value;
        addBtn.value="Add";
        inputBox.value ="";

    }


    else{
    
        const li=document.createElement("li");
        const p=document.createElement("p");
        p.innerHTML=inputData;
        li.appendChild(p);
        todoList.appendChild(li);
        inputBox.value="";

       

        //Edit button

        const editBtn= document.createElement("button");
        editBtn.innerHTML="Edit";
        editBtn.classList.add("btn","edit");
        li.appendChild(editBtn);

         //delete button

         const deletebtn=document.createElement("button");
         deletebtn.innerHTML="Remove";
         deletebtn.classList.add("btn","delete")
         li.appendChild(deletebtn);
        
         SaveInLocal(inputData);
    }
};

const UpdateOne =(v) =>{

    if(v.target.innerHTML==="Remove"){
        todoList.removeChild(v.target.parentElement);
        deleteLocaltodo(v.target.parentElement);

    }

    if(v.target.innerHTML === "Edit"){
        inputBox.value= v.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value="Edit";
        editTodo =v;
      
    }
}


// to save in localStorage from main Screen

const  SaveInLocal =(input)=>{

    let Collection;
    if(localStorage.getItem("Collection") === null){
        Collection =[];
    }
    else{
        Collection =JSON.parse(localStorage.getItem("Collection"));
    }
    Collection.push(input);
    localStorage.setItem("Collection",JSON.stringify(Collection));
}


// after refresh data is removed ,but saved in local Storage ......so to get data from Storage

const getDataInScreen = ()=>{
    let Collection;
    if(localStorage.getItem("Collection")=== null){
        Collection = [];

    }
    else{
        Collection = JSON.parse(localStorage.getItem("Collection"));

        Collection.forEach(input => {
            
            const li =document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML= input;
            li.appendChild(p);


            const editBtn =document.createElement("button");
            editBtn.innerHTML="Edit";
            editBtn.classList.add("btn","edit");
            li.appendChild(editBtn);

         //delete button

         const deletebtn=document.createElement("button");
         deletebtn.innerHTML="Remove";
         deletebtn.classList.add("btn","delete")
         li.appendChild(deletebtn);
        
         todoList.appendChild(li);

        });
    }
}

const deleteLocaltodo = (input)=>{
    let Collection;
    if(localStorage.getItem("Collection")=== null){
        Collection = [];
    }
    else{
        Collection = JSON.parse(localStorage.getItem("Collection"));
    
    }
    
    let Data = input.children[0].innerHTML;
    let DataIndex =Collection.indexOf(Data);
    Collection.splice(DataIndex,1);
    localStorage.setItem("Collection",JSON.stringify(Collection));
    
    }


const editLocalStorage=(input) =>{

    let Collection=JSON.parse(localStorage.getItem("Collection"));
    let dataIndex = Collection.indexOf(input);
    Collection[dataIndex] = inputBox.value;
    localStorage.setItem("Collection",JSON.stringify(Collection));
}

document.addEventListener('DOMContentLoaded',getDataInScreen);
addBtn.addEventListener('click',addButton);
todoList.addEventListener('click',UpdateOne);

