//initialize funtion 
init();
function init(){
    let userInput = localStorage.getItem('userInput');
    recipeSearchCall(userInput);
}

//recipe search
function recipeSearchCall(userInput) {

    const apiKey = 'ca76d8942af543f39553ed0542c27990';

    //reporting if api call throws error
    const onReject = (errThrown) => {
        console.log(errThrown);
        console.log(errThrown.responseText);
    }

    $.ajax({

        url: "https://api.spoonacular.com/recipes/complexSearch?query=" + userInput + "&number=30" + "&apiKey=" + apiKey,

    }).then(function (response) {
        const data = response.results;
        searchResultRender(data);

    }, onReject);

}

//get searched recipe by recipe.id value
function getRecipeCall(id) {

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
        $(`#${response.id}`).attr('src', `${response.image}`);

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

function searchResultRender(data) {
    console.log(data);
    for (let i = 0; i < 16; i++) {
        let cardParent = document.createElement('div');
        $(cardParent).addClass('col s4');

        let cardBody = document.createElement('div');
        $(cardBody).addClass('card');
        $(cardBody).attr('id',`card${i}`);
        

        let cardImg = `<div class='card-image waves-effect waves-block waves-light'><img src="${data[i].image}"></img></div>`
        $(cardBody).append(cardImg);
        
        let cardContent = document.createElement('div');
        $(cardContent).addClass('card-content');
        let cardTitle = `<span class="card-title grey-text text-darken-4">${data[i].title}</span>`;
        $(cardContent).append(cardTitle);
        let recipeLink = `<p><a data-id=${data[i].id}>Read More...</a></p>`;
        $(cardContent).append(recipeLink);

        $(cardBody).append(cardContent);
        $(cardParent).append(cardBody);

        if (i < 3) {
            let row = document.querySelector('#results-row0');
            $(row).append(cardParent);
        }
        else if (i > 2 && i < 6) {
            let row = document.querySelector('#results-row1');
            $(row).append(cardParent);
        }
        else if (i > 5 && i < 9) {
            let row = document.querySelector('#results-row2');
            $(row).append(cardParent);
        }
        else if (i > 8 && i < 12) {
            let row = document.querySelector('#results-row3');
            $(row).append(cardParent);
        }
    }

}