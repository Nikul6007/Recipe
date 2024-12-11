import React, { useState, useEffect } from "react";

export default function Search() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(" ");

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
        const result = await response.json();
        const filteredRecipes = result.recipes.filter(recipe => 
          recipe.name.toLowerCase().includes(query.toLowerCase()) || 
          (recipe.description && recipe.description.toLowerCase().includes(query.toLowerCase()))
        );
        setData(filteredRecipes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

   
    if (query) {
      fetchData();
    }
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault(); 
    setQuery(query);
  };

  return (
    <>
      <div className="uk-section uk-section-default uk-padding-remove-top">
        <div className="uk-container">
          <div data-uk-grid>
            <div className="uk-width-1-2@m">
              <form
                className="uk-search uk-search-default uk-width-1-1 uk-margin-small-bottom"
                onSubmit={handleSubmit}
              >
                <span data-uk-search-icon></span>
                <input className="uk-search-input uk-text-small uk-border-rounded uk-form-large" 
                  type="search" 
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search for recipes..."></input>
              </form>
            </div>
            <div className="uk-width-1-2@m uk-text-right@m">
              <select className="uk-select uk-select-light uk-width-auto uk-border-pill uk-select-muted">
                <option>Sort by: Latest</option>
                <option>Sort by: Top Rated</option>
                <option>Sort by: Trending</option>
              </select>
            </div>
          </div>

          <div
            className="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-margin-medium-top"
            data-uk-grid
          >
            {data.length > 0 ? (
              data.map((recipe, index) => (
                <div key={index}>
                  <div className="uk-card">
                    <div className="uk-card-media-top uk-inline uk-light">
                      <img
                        className="uk-border-rounded-medium"
                        src={recipe.image}
                        alt={recipe.name}
                      ></img>
                      <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>
                      <div className="uk-position-xsmall uk-position-top-right">
                        <a
                          href="#"
                          className="uk-icon-button uk-like uk-position-z-index uk-position-relative"
                          data-uk-icon="heart"
                        ></a>
                      </div>
                    </div>
                    <div>
                      <h3 className="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">
                        {recipe.name}
                      </h3>
                      <div
                        className="uk-text-xsmall uk-text-muted"
                        data-uk-grid
                      >
                        <div className="uk-width-auto uk-flex uk-flex-middle">
                          <span
                            className="uk-rating-filled"
                            data-uk-icon="icon: star; ratio: 0.7"
                          ></span>
                          <span className="uk-margin-xsmall-left">{recipe.rating}</span>
                          <span>{recipe.num_ratings}</span>
                          <span>({recipe.reviewCount})</span>
                        </div>
                        <div className="uk-width-expand uk-text-right">
                          {recipe.mealType}
                        </div>
                      </div>
                    </div>
                    <a href={`/recipe/${recipe.id}`} className="uk-position-cover"></a>
                  </div>
                </div>
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>

          <div className="uk-margin-large-top uk-text-small">
            <ul
              className="uk-pagination uk-flex-center uk-text-500 uk-margin-remove"
              data-uk-margin
            >
              <li>
                <a href="#">
                  <span data-uk-pagination-previous></span>
                </a>
              </li>
              <li>
                <a href=" ">1</a>
              </li>
              <li>
                <a href="recipe">2</a>
              </li>
              <li className="uk-active"><span><a href="search">3</a></span></li>
              <li>
                <a href="contact">4</a>
              </li>
              
              <li>
                <a href="#">
                  <span data-uk-pagination-next></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
