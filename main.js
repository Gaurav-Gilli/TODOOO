const inputScreen = document.getElementById("create-todo");
const listItems = document.querySelector(".list-items");
const checkBox = document.querySelector(".new-todo .check-box");
const itemTemplate =document.getElementById("item-template").content;
const itemCount = document.querySelector(".items-count");

let numItems = 0;
let html = "";


function addItem(e){
    if(e.key === "Enter" && e.target === inputScreen && inputScreen.length != 0 || e.target === checkBox && e.target === inputScreen && inputScreen.length != 0){
        numItems++;
        itemTemplate.querySelector(".item").dataset.itemNum = numItems;
        itemTemplate.querySelector(".item-text").textContent = (inputScreen.value);
        itemTemplate.querySelector(".deleted").setAttribute("src", "images/icon-cross.svg");
        itemTemplate.querySelector(".deleted").setAttribute("data-item-num", numItems);
        let clone =document.importNode(itemTemplate, true);
        listItems.appendChild(clone);
        inputScreen.value = "";
        itemCount.innerHTML = (listItems.children.length) + "items left" ;
    }
}
document.addEventListener("keydown" , (e)=>{
    addItem(e);
});
document.addEventListener("click", (e)=>{
    addItem(e);
    checkItem(e);
    deleteItem(e);
    clearCompleted(e);
    filter(e);
    themeToggle(e);
})
function checkItem(e){
    let itemCheckbox = document.querySelectorAll(".item .check-box");
    itemCheckbox.forEach((el)=> {
        if(e.target === el){
            el.classList.add(".item-check");
            el.querySelector("img").setAttribute("src", "images/icon-check.svg");
            el.querySelector("img").setAttribute("alt", "icon-check");        
            el.parentNode.classList.remove("active");
            el.parentNode.classList.add("complete");
            let completes = document.querySelectorAll(".complete");
            itemCount.innerHTML = (listItems.children.length - completes.length) + "items left";
        }else if(e.target === document.querySelector("img")){
            el.classList.remove("item-check");
            el.querySelector("img").removeAttribute("src");
            el.querySelector("img").removeAttribute("alt");
            el.parentNode.classList.add("active");
            el.parentNode.classList.remove("complete");
            completes = document.querySelectorAll(".complete");
            itemCount.innerHTML = (listItems.children.length - completes.length) + "items left";
        }
        });
    }
    function deleteItem(e){
        if(e.target.matches(".deleted")){
            let iconDelete = e.target.dataset.itemNum;
            let itemChild = listItems.children;
            /*console.log(itemChild);
            console.log(iconDelete);*/
            for(let child of itemChild){
            //console.log(child.getAttribute("data-item-num"));
                if(iconDelete === child.getAttribute("data-item-num")){
                    child.classList.add("delete-animation");
                    setTimeout(() =>{
                        child.parentNode.removeChild(child);
                    }, 1000);
                }
        }
        setTimeout(()=> {
            itemCount.innerHTML = (listItems.children.length) + "items left" ;
        }, 1000);
        }
    }
    function clearCompleted(e){
        if(e.target.matches(".clear-completed")){
            let completes = document.querySelectorAll(".complete");
            completes.forEach((el)=>{
            el.classList.add("delete-animation");
            setTimeout(()=> {
                el.parentNode.removeChild(el);
            } , 1000);
            }); 
        }
    }
    function show(){
        let allItems = Array.from(listItems.children);
        allItems.forEach((el)=>{
            el.style.display = "flex";
        });
    }
    function filter(e){
        let all = document.querySelector(".all");
        let active = document.querySelector(".actived");
        let completed = document.querySelector(".completed");
        if(e.target.matches(".all")){
            show();
            active.classList.remove("button-activated");
            completed.classList.remove("button-activated");
            e.target.classList.add("button-activated");
        }
        else if(e.target.matches(".actived")){
            show();
            all.classList.remove("button-activated");
            completed.classList.remove("button-activated");
            e.target.classList.add("button-activated")
            let completes = document.querySelectorAll(".complete");
            completes.forEach((el)=>{
                el.style.display = "none";
            });
        }
        else if(e.target.matches(".completed")){
            show();
            active.classList.remove("button-activated");
            all.classList.remove("button-activated");
            e.target.classList.add("button-activated");
            let actives = document.querySelectorAll(".active");
            actives.forEach((el) =>{
                el.style.display = "none";
            })
        }
    }
    function themeToggle(e){
        let body = document.querySelector("body");
        let icon = document.querySelector(".icon-mode");
        let header = document.querySelector("header");
        let desktop = "url(images/bg-desktop-";
        let mobile = "url(images/bg-mobile-";
        if(e.target.matches(".fas")){
            body.classList.toggle("light-theme");
            if(e.target.matches(".fa-sun")){
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
                header.style.backgroundImage = (desktop)+"dark.jpg"
            }
            else{
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
                header.style.backgroundImage = (desktop)+"light.jpg"
            }
        }   
        console.log(header)
    }