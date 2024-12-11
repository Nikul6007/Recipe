import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetails() {
    const [recipeDetails, setRecipeDetails] = useState({});
    const [recipeInstructions, setRecipeInstructions] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [otherRecipes, setOtherRecipes] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        // Fetch recipe details
        fetch(`https://dummyjson.com/recipes/${id}`)
            .then(response => response.json())
            .then(data => {
                setRecipeDetails(data);
                setIngredients(data.ingredients);
                setRecipeInstructions(data.instructions);
            });

        // Fetch other recipes
        fetch('https://dummyjson.com/recipes') // Adjust this endpoint as needed
            .then(response => response.json())
            .then(data => {
                setOtherRecipes(data.recipes);
            });
    }, [id]);

    return (
        <>
            <div className="uk-container">
                <div data-uk-grid>
                    <div className="uk-width-1-2@s">
                        <div>
                            <img className="uk-border-rounded-large" src={recipeDetails.image} alt={recipeDetails.name} />
                        </div>
                    </div>
                    <div className="uk-width-expand@s uk-flex uk-flex-middle">
                        <div>
                            <h1>{recipeDetails.name}</h1>
                            <h5>Ingredients : </h5>
                                <ol>
                                  {ingredients.map((value) => {
                                    return (
                                      <li>
                                        <h6>{value}</h6>
                                      </li>
                                    );
                                  })}
                            </ol>
                            <p>{recipeDetails.description}</p>
                            <div className="uk-margin-medium-top uk-child-width-expand uk-text-center uk-grid-divider" data-uk-grid>
                                <div>
                                    <span data-uk-icon="icon: clock; ratio: 1.4"></span>
                                    <h5 className="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">Active Time</h5>
                                    <span className="uk-text-small">{recipeDetails.cookTimeMinutes} mins</span>
                                </div>
                                <div>
                                    <span data-uk-icon="icon: future; ratio: 1.4"></span>
                                    <h5 className="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">Total Time</h5>
                                    <span className="uk-text-small"> {recipeDetails.prepTimeMinutes} mins</span>
                                </div>
                                <div>
                                    <span data-uk-icon="icon: users; ratio: 1.4"></span>
                                    <h5 className="uk-text-500 uk-margin-small-top uk-margin-remove-bottom">Yield</h5>
                                    <span className="uk-text-small">{recipeDetails.servings} Serves </span>
                                </div>
                            </div>
                            <hr />
                            <div data-uk-grid>
                                <div className="uk-width-auto@s uk-text-small">
                                    <p className="uk-margin-small-top uk-margin-remove-bottom">Created by <a href="#">{recipeDetails.creator}</a></p>
                                    <span className="uk-text-muted">{recipeDetails.recipesCount} recipes</span>
                                </div>
                                <div className="uk-width-expand@s uk-flex uk-flex-middle uk-flex-right@s">
                                    <a href="#" className="uk-icon-link" data-uk-icon="icon: plus-circle; ratio: 1.2" data-uk-tooltip="title: Save Recipe"></a>
                                    <a href="#" className="uk-icon-link uk-margin-left" data-uk-icon="icon: cart; ratio: 1.2" data-uk-tooltip="title: Shopping List"></a>
                                    <a href="#" className="uk-icon-link uk-margin-left" data-uk-icon="icon: print; ratio: 1.2" data-uk-tooltip="title: Print Recipe"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="uk-section uk-section-default">
                <div className="uk-container uk-container-small">
                    <div className="uk-grid-large" data-uk-grid>
                        <div className="uk-width-expand@m">
                            <div className="uk-article">
                                <h3>How to Make It</h3>
                                {recipeInstructions.map((step, index) => (
                                    <div id={`step-${index + 1}`} className="uk-grid-small uk-margin-medium-top" data-uk-grid key={index}>
                                        <div className="uk-width-auto">
                                            <a href="#" className="uk-step-icon" data-uk-icon="icon: check; ratio: 0.8" data-uk-toggle={`target: #step-${index + 1}; cls: uk-step-active`}></a>
                                        </div>
                                        <div className="uk-width-expand">
                                            <h5 className="uk-step-title uk-text-500 uk-text-uppercase uk-text-primary" data-uk-leader="fill:—">{`Step ${index + 1}`}</h5>
                                            <div className="uk-step-content">{step}</div>
                                        </div>
                                    </div>
                                ))}
                                <hr className="uk-margin-medium-top uk-margin-large-bottom" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="uk-section uk-section-muted">
                    <div className="uk-container">
                        <h3>Other Recipes You May Like</h3>
                        <div className="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-margin-medium-top" data-uk-grid>
                            {otherRecipes.map((recipe) => (
                                <div key={recipe.id}>
                                    <div className="uk-card">
                                        <div className="uk-card-media-top uk-inline uk-light">
                                            <img className="uk-border-rounded-medium" src={recipe.image} alt={recipe.name} />
                                            <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>
                                            <div className="uk-position-xsmall uk-position-top-right">
                                                <a href="#" className="uk-icon-button uk-like uk-position-z-index uk-position-relative" data-uk-icon="heart"></a>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">{recipe.name}</h3>
                                            <div className="uk-text-xsmall uk-text-muted" data-uk-grid>
                                                <div className="uk-width-auto uk-flex uk-flex-middle">
                                                    <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.7"></span>
                                                    <span className="uk-margin-xsmall-left">{recipe.rating}</span>
                                                    <span>({recipe.reviewCount})</span>
                                                </div>
                                                <div className="uk-width-expand uk-text-right">{recipe.mealType}</div>
                                            </div>
                                        </div>
                                        <a href={`/recipe/${recipe.id}`} className="uk-position-cover"></a>
                                    </div>
                                </div>
                            ))}
                           
                        </div>
                        <div className="uk-margin-large-top uk-text-small">
                                <ul className="uk-pagination uk-flex-center uk-text-500 uk-margin-remove" data-uk-margin>
                                    <li><a href="#"><span data-uk-pagination-previous></span></a></li>
                                    <li><a href="">1</a></li>
                                    <li className="uk-active"><span><a href="">2</a></span></li>
                                    <li><a href="">3</a></li>
                                    <li><a href="">4</a></li>
                                    <li><a href="#"><span data-uk-pagination-next></span></a></li>
                                </ul>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}
