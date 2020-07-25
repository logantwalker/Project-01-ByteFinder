//search for recipes 
function recipeSearchCall(userInput) {

    const apiKey = 'ca76d8942af543f39553ed0542c27990';

    //reporting if api call throws error
    const onReject = (errThrown) => {
        console.log(errThrown);
        console.log(errThrown.responseText);
    }

    $.ajax({
        
        url: "https://api.spoonacular.com/recipes/complexSearch?query="+ userInput + "&apiKey=" + apiKey,

    }).then(function (response) {

        console.log(response.results[1]);
        let id = response.results[1].id;

        getRecipeCall(id);

    }, onReject);

}

//searching here (input: string)
//recipeSearchCall('burrito');


//get searched recipe by recipe.id value
function getRecipeCall(id){

    const apiKey = 'ca76d8942af543f39553ed0542c27990';

    const onReject = (errThrown) => {
        console.log(errThrown);
        console.log(errThrown.responseText);
    }

    $.ajax({
        
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,

    }).then(function (response) {

        console.log(response);

        //appending title and image for api response
        $('#testContainer').append(`<h1>${response.title}</h1>`);
        $('#testContainer').append('<div class="divider"></div>');
        $('#testContainer').append(`<img class="materialboxed center-align" style='width: 300px; margin-top:5%;' id='${response.id}'>`);
        $(`#${response.id}`).attr('src',`${response.image}`);

        //creating div for recipe information
        let infoEl = `<div class='row valign-wrapper' id='${response.id}-info'></div>`;
        $('#testContainer').append(infoEl);

        //rendering recipe information and summary
        $(`#${response.id}-info`).append(`<div style='margin-top:2%;' class='col'>Servings: ${response.servings}</div>`);
        $(`#${response.id}-info`).append(`<div style='margin-top:2%;' class='col'>Cook Time: ${response.readyInMinutes} min</div>`);
        $(`#${response.id}-info`).append(`<div style='margin-top:2%;' class='col'>Likes: ${response.aggregateLikes} <i class="material-icons">thumb_up</i></div>`);
        $(`#testContainer`).append(`<div class='col s7'>${response.summary}</div`)

        //creating ingredients list
        $(`#testContainer`).append(`<div class='col s4' id='${response.id}-item-parent'><h4 style='margin-top:0; border-bottom:1px solid #c0c0c0'>Ingredients</h4></div>`);
        $(`#${response.id}-item-parent`).append(`<ul id='${response.id}-items'></ul>`);

        //populating ingredients list function
        const listItems = (itemArr) => {
            itemArr.forEach(item => {

                console.log(item.original);
                let li = `<li style='padding-bottom:3%;'><i style=' vertical-align: bottom'class='material-icons'>add_circle</i> ${item.original}</li>`;
                $(`#${response.id}-items`).append(li);

            })

        };

        //making ingredients list
        listItems(response.extendedIngredients);

        //instructions list
        let listParent = `<div class='col s6'><ol id='${response.id}-steps'>Instructions</ol></div>`;
        $('#testContainer').append(listParent);

        const listSteps = (stepArr) => {
            stepArr.forEach(step => {
                let li = `<li style='padding:1%;'>${step.step}</li>`
                $(`#${response.id}-steps`).append(li);

            })

        };

        listSteps(response.analyzedInstructions[0].steps);
        


    }, onReject);
}