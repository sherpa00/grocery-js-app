// get the top container
const top_msg = document.querySelector(".top_message");
const top_form = document.querySelector(".top_form");
const inp = document.querySelector(".inp");
const add_btn = document.querySelector(".top_btn");

//get the bottom container 
const bottom_msg = document.querySelector(".bottom_message");
const items_list = document.querySelector(".items_list")
const clear_all_btn = document.querySelector(".del_all");


function createItem(value) {
    let parent_div = document.createElement("div");
    parent_div.classList.add("grocery_item");

    parent_div.innerHTML = `<h4 class="grocery_item_heading">${value}</h4>
    <a href="#" class="grocery_item_link">
        <i class="far fa-trash-alt"></i>
    </a>`;

    items_list.appendChild(parent_div);
};

function addItem(event) {
    event.preventDefault();
    let val = inp.value;
    if (val === "") {
        showAction("Please Add grocery item",false);
    } else {
        showAction(`${val} addedd to the List`,true);
        createItem(val);
    }
    inp.value = "";
    updateStorage(val);
}


add_btn.addEventListener("click",addItem);


function showAction(str,bol) {
    if (bol) {
        top_msg.style.color = "lightgreen";
        top_msg.style.borderColor = "lightgreen";
    } else {
        top_msg.style.color = "crimson";
        top_msg.style.borderColor = "crimson";
    };
    top_msg.style.display = "block";
    setTimeout(function () {
        top_msg.style.display = "none";
    },3500)
    top_msg.innerHTML = str;
}

function clearAll() {
    localStorage.removeItem('groceryList');
    let items = document.querySelectorAll(".grocery_item");
    if (items.length > 0) {
        bottom_msg.style.display = "block";
        bottom_msg.innerHTML = "All items deleted";
        setTimeout(() => {
            bottom_msg.style.display = "none";
        },3500);
        for (let i = 0; i < items.length; i++) {
            items_list.removeChild(items[i]);
        }
    } else {
        bottom_msg.style.display = "block";
        bottom_msg.innerHTML = "No More Items to Delete";
        setTimeout(() => {
            bottom_msg.style.display = "none";
        },3500);
    }
}

clear_all_btn.addEventListener("click",clearAll);

function removeSingleItem(event) {
    event.preventDefault();

    let link = event.target.parentElement; // a element
    if (link.className === "grocery_item_link") {
        let text = link.previousElementSibling.innerHTML; // h4 element text
        let gr_item = link.parentElement; // grocery_item element;

        //remove the child element from items list
        items_list.removeChild(gr_item);
        // remove the item for localstorage;
        editStorage(text);
        bottom_msg.style.display = "block";
        bottom_msg.innerHTML = `${text} deleted from list`;
        setTimeout(() => {
            bottom_msg.style.display = "none";
        },3500)

    }
};

items_list.addEventListener("click",removeSingleItem);

function updateStorage(text) {
    let groceryList;

    groceryList = localStorage.getItem("groceryList") ? JSON.parse(localStorage.getItem("groceryList")) : [];
    groceryList.push(text);
    localStorage.setItem("groceryList",JSON.stringify(groceryList));
}

function displayStorage() {
    let exits = localStorage.getItem("groceryList");

    if (exits) {
        let storageItems = JSON.parse(localStorage.getItem("groceryList"));
        storageItems.forEach((ele) => {
            createItem(ele);
        })
        
    }
}

// check the localstorage
document.addEventListener("DOMContentLoaded",displayStorage);


function editStorage(item){
    let groceryItems = JSON.parse(localStorage.getItem('groceryList'));
    let index = groceryItems.indexOf(item);
    
    groceryItems.splice(index, 1);
    //first delete existing list
    localStorage.removeItem('groceryList');
    //add new updated/edited list
    localStorage.setItem('groceryList', JSON.stringify(groceryItems));

}