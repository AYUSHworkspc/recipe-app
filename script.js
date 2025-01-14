
const input=document.querySelector(".searchBox");
const searchButton=document.querySelector(".searchButton");
const recipeContainer=document.querySelector(".recipe-container");

// ye dom hum jab recipee par click ho jaye tan detsils show karne ke lea use kar rahe hain
const recipeDetails=document.querySelector(".recipe-details");
const recepiCloseBtn=document.querySelector(".recepi-close-btn")
const recipeDetailsContent=document.querySelector(".recipe-details-content");


//API FETCH FUNCTION

const fetchRecipe = async (cusinetype) => {

    recipeContainer.innerHTML=`<h2>fetching recipes ...</h2>`

const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${cusinetype}`);
const response=await data.json();
//console.log(response);

recipeContainer.innerHTML='';
response.meals.forEach(meal => {
   // console.log(meal);
    const recipediv=document.createElement('div');
    recipediv.classList.add('recipe');

    recipediv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h2>${meal.strMeal}</h2>  
    <p>${meal.strArea} Dish<p>
    <p>  category: ${meal.strCategory}<p>
    `
    const button=document.createElement("button");// button creation
    button.textContent="View Recipe";
    recipediv.appendChild(button);    //ye button <p> tag ke baad add hoga


//button par event listner
button.addEventListener("click",()=>{
    openRecipePopup(meal);
});
   
    recipeContainer.appendChild(recipediv);
});

}


// creat the ingredient fetching function 
const fetchIngredients=(meal)=>{
    
    let noOfIngredients ="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
       console.log(ingredient);
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            noOfIngredients+=`<li> ${ingredient}- ${measure}</li>`;
        }
        else{
            break;
        }
    }
    return noOfIngredients;


}

//pop up used when we click on button
const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML= `<h2 class="recipename">${meal.strMeal}</h2>
    <h3>Ingredients </h3>
    <ul class="ingredientlist"> ${fetchIngredients(meal)}</ul>
    <div>
    <h3>INSTRUCTION:--></h3>
    <h4 class="instructions">${meal.strInstructions}</h4>
    </div>
    
    
    `; // ftech.. wala function call hote hi ek array of li return kar dega waha par

    recipeDetailsContent.parentElement.style.display="block";
    
}




//button ko handel karo  project ke starting wala button
searchButton.addEventListener("click",(e)=>{

    e.preventDefault();
    const search=input.value.trim();
    if(!search){
        recipeContainer.innerHTML=`<h2>PLEASE SEARCH YOUR DISH </h2>`;
        return;
    }
   // console.log(search);
    fetchRecipe(search);
})

// close button  ka code
recepiCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none";

})