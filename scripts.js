async function searchRecipes() {
    const query = document.getElementById('search').value;
    const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=2e46fb83&app_key=455f4be28068bfac147f31658b236c30`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const container = document.getElementById('recipe-container');
    container.innerHTML = '';

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';

        const img = document.createElement('img');
        img.src = recipe.image;
        recipeDiv.appendChild(img);

        const title = document.createElement('h2');
        title.innerText = recipe.label;
        recipeDiv.appendChild(title);

        const description = document.createElement('p');
        description.innerText =` Calories: ${Math.round(recipe.calories)}`;
        recipeDiv.appendChild(description);

        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.innerText = 'Ingredients:';
        recipeDiv.appendChild(ingredientsTitle);

        const ingredientsList = document.createElement('ul');
        ingredientsList.className = 'ingredients';
        recipe.ingredientLines.forEach(ingredient => {
            const li = document.createElement('li');
            li.innerText = ingredient;
            ingredientsList.appendChild(li);
        });
        recipeDiv.appendChild(ingredientsList);

        
        // Comment Section
        const commentSection = document.createElement('div');
        commentSection.className = 'comments-section';
        const commentTitle = document.createElement('h3');
        commentTitle.innerText = 'Comments:';
        commentSection.appendChild(commentTitle);
        const commentBox = document.createElement('textarea');
        commentBox.className = 'comment-box';
        commentBox.placeholder = 'Add a comment...';
        commentSection.appendChild(commentBox);
        const addCommentButton = document.createElement('button');
        addCommentButton.innerText = 'Add Comment';
        addCommentButton.onclick = () => addComment(commentBox, commentSection);
        commentSection.appendChild(addCommentButton);
        recipeDiv.appendChild(commentSection);

        // Star Rating
        const starRating = document.createElement('div');
        starRating.className = 'star-rating';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.innerHTML = '&#9733;';
            star.onclick = () => rateRecipe(starRating, i);
            starRating.appendChild(star);
        }
        recipeDiv.appendChild(starRating);

        container.appendChild(recipeDiv);
    });
}

function addComment(commentBox, commentSection) {
    const commentText = commentBox.value.trim();
    if (commentText) {
        const comment = document.createElement('p');
        comment.innerText = commentText;
        commentBox.value = '';
        commentSection.insertBefore(comment, commentBox);
    }
}

function rateRecipe(starRating, rating) {
    const stars = starRating.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('checked', index < rating);
    });
}
// script.js
document.addEventListener("DOMContentLoaded", function() {
    const signupBtn = document.getElementById('signupBtn');
    const signupForm = document.getElementById('signupForm');
    const closeBtn = document.querySelector('.closeBtn');

    // Show the signup form modal
    signupBtn.onclick = function() {
        signupForm.style.display = 'block';
    }

    // Hide the signup form modal
    closeBtn.onclick = function() {
        signupForm.style.display = 'none';
    }

    // Hide the signup form modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === signupForm) {
            signupForm.style.display = 'none';
        }
    }
});
