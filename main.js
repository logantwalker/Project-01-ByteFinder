function recipeApiCall(userInput) {

    const apiKey = 'ca76d8942af543f39553ed0542c27990';

    
    const onReject = (errThrown) => {
        console.log(errThrown);
        console.log(errThrown.responseText);
    }

    $.ajax({
        
        url: "https://api.spoonacular.com/food/products/search?query="+ userInput + "&apiKey=" + apiKey,

    }).then(function (response) {
        console.log(response.products);
    }, onReject);


    
    
}

recipeApiCall('lasagna');