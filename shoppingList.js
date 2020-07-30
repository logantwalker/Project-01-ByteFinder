let shoppingList = JSON.parse(localStorage.getItem('shopList'));

init();
function init(){
    if(shoppingList){
        console.log(shoppingList);
        renderListItems(shoppingList);
        $(document).ready(function(){
            $('#list-results').show('blind',300);
        });
    }
    else{
        return
    }
}

function renderListItems(items){
    items.forEach( (item) =>{
        let listItem = `${item.amount} ${item.unit} ${item.name}`;
        $('#shopping-list').append(`<li>${listItem}</li>`);
    })

    
}