//populating the 'popular recipe' slider
getPopularRecipes();

function getPopularRecipes() {

    const apiKey = 'ca76d8942af543f39553ed0542c27990';

    //reporting if api call throws error
    const onReject = (errThrown) => {
        console.log(errThrown);
        console.log(errThrown.responseText);
    }

    $.ajax({

        url: "https://api.spoonacular.com/recipes/random?number=4&apiKey=" + apiKey,

    }).then(function (response) {

        var popRecipes = response.recipes;

        const showRecipes = (recipes) => {
            for (let i = 0; i < recipes.length; i++) {
                $(`#slider${i}`).attr('src', recipes[i].image);
                $(`#slider${i}title`).text(recipes[i].title);
                let summary = recipes[i].summary.split('. ');
                let oneLine = summary[0];
                const cleanHTMLresponse = (oneLine) => {
                    let splitLine = oneLine.split('<b>')
                    oneLine = splitLine.join();
                    splitLine = oneLine.split('</b>');
                    oneLine = splitLine.join();

                    $(`#slider${i}desc`).text(oneLine);
                }
                cleanHTMLresponse(oneLine);
            }
        }

        showRecipes(popRecipes);

    }, onReject);
}

//search for recipes here
$('#recipe-search').on('change', () => {
    let userQuery = $('#recipe-search').val();

    const inputChecker = (input) => {
        if (parseInt(input)) {
            console.log('number detected');
            return;
        }
        else {
            let rawInput = input.replace(/\s+/g, '');
            return rawInput;

        }
    }

    let rawInput = inputChecker(userQuery);
    localStorage.setItem('userInput',rawInput);
    window.location.href='recipe.html';
})
