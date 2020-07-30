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
        $('#recipeTitle').append(`<h1>${response.title}</h1>`);

        //appending recipe image
        $('#recipeImg').attr('src',response.image);
        
        //rendering recipe stats
        $(`#recipeStats`).append(`<div class='col' style='font-size:1.35rem;'>Servings: ${response.servings}</div>`);
        $(`#recipeStats`).append(`<div class='col' style='font-size:1.35rem;'>Cook Time: ${response.readyInMinutes} min</div>`);
        $(`#recipeStats`).append(`<div class='col' style='font-size:1.35rem;'>Likes: ${response.aggregateLikes} <i class="material-icons">thumb_up</i></div>`);
        
        //rendering recipe summary
        $('#recipeDesc').append(response.summary);

        //populating ingredients list function
        const listItems = (itemArr) => {
            itemArr.forEach(item => {

                let li = `<li style='padding-bottom:3%;'><i style=' vertical-align: bottom'class='material-icons'>add_circle</i> ${item.original}</li>`;
                $(`#recipeIngredients`).append(li);

            })

        };

        //making ingredients list
        listItems(response.extendedIngredients);

        //instructions list
        const listSteps = (stepArr) => {
            stepArr.forEach(step => {
                let li = `<li style='padding:1%;'>${step.step}</li>`;
                $(`#recipeSteps`).append(li);

            })

        };

        //some recipes don't have instructions, so we have to check otherwise the rest of the page won't load
        if(response.analyzedInstructions[0]){
            listSteps(response.analyzedInstructions[0].steps);
        }
        
        $('#recipeContainer').css('display','inherit');


    }, onReject);
}

function searchResultRender(data) {
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
        let recipeLink = `<p ><a class='recipe-link' data-id=${data[i].id}>Read More...</a></p>`;
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

$("#search-results-parent").click((event) =>{
    let targ =event.target;
    let id = $(targ).data('id');

    if(id){
        $('#search-results-parent').css('display','none');
        getRecipeCall(id);
    }
    else{
        return;
    }

    $(document).ready(function(){
        $('.parallax').parallax();
      });
})

