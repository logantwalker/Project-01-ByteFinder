
let shoppingList = JSON.parse(localStorage.getItem('shopList'));

init();
function init(){
    if(shoppingList){
        console.log(shoppingList);
        renderListItems(shoppingList);
    }
    else{
        return
    }
}

function renderListItems(items){
    items.forEach( item =>{
        let listItem = `${item.amount} ${item.unit} ${item.name}`;
        $('#shopping-list').append(`<li>${listItem}</li>`);
    })
}