import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchResults() {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState(" ");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query');

    useEffect(() => {
        if (searchQuery) {
            fetch(`https://dummyjson.com/recipes/search?q=${searchQuery}`)
                .then((response) => response.json())
                .then((data) => {
                    setRecipes(data.recipes);
                })
                .catch((error) => {
                    console.error('Error fetching recipes:', error);
                });
        }
    }, [searchQuery]);

    return (
        <div className="uk-container">
            <div className="uk-border-rounded-large uk-background-top-center uk-background-cover uk-background-norepeat uk-light uk-inline uk-overflow-hidden uk-width-1-1"
                 style={{ backgroundImage: 'url(img/header.jpg)' }}>
                <div className="uk-position-cover uk-header-overlay"></div>
                <div className="uk-position-relative" data-uk-grid>
                    <div className="uk-width-1-2@m uk-flex uk-flex-middle">
                        <div className="uk-padding-large uk-padding-remove-right">
                            <h1 className="uk-heading-small uk-margin-remove-top">Choose from thousands of recipes</h1>
                            <p className="uk-text-secondary">Appropriately integrate technically sound value with scalable infomediaries negotiate sustainable strategic theme areas</p>
                            <a className="uk-text-secondary uk-text-600 uk-text-small hvr-forward" href="/signup">Sign up today<span
                                className="uk-margin-small-left" data-uk-icon="arrow-right"></span></a>
                        </div>
                    </div>
                    <div className="uk-width-expand@m">
                    </div>
                </div>
            </div>

            <div className="uk-section uk-section-default">
                <div className="uk-container">
                    <div data-uk-grid>
                        <div className="uk-width-expand@m">
                            <div data-uk-grid>
                                <div className="uk-width-1-3@m uk-text-right@m uk-light">
                                    <select className="uk-select uk-select-light uk-width-auto uk-border-pill uk-select-primary">
                                        <option>Sort by: Latest</option>
                                        <option>Sort by: Top Rated</option>
                                        <option>Sort by: Trending</option>
                                    </select>
                                </div>
                            </div>
                            <div className="uk-child-width-1-2 uk-child-width-1-3@s" data-uk-grid>
                                {recipes.length > 0 ? recipes.map((value, index) => (
                                    <div key={index}>
                                        <div className="uk-card">
                                            <div className="uk-card-media-top uk-inline uk-light">
                                                <img className="uk-border-rounded-medium" src={value.image} alt={value.name} />
                                                <div className="uk-position-cover uk-card-overlay uk-border-rounded-medium"></div>
                                                <div className="uk-position-xsmall uk-position-top-right">
                                                    <a href="#" className="uk-icon-button uk-like uk-position-z-index uk-position-relative" data-uk-icon="heart"></a>
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="uk-card-title uk-text-500 uk-margin-small-bottom uk-margin-top">{value.name}</h3>
                                                <div className="uk-text-xsmall uk-text-muted" data-uk-grid>
                                                    <div className="uk-width-auto uk-flex uk-flex-middle">
                                                        <span className="uk-rating-filled" data-uk-icon="icon: star; ratio: 0.7"></span>
                                                        <span className="uk-margin-xsmall-left">{value.rating}</span>
                                                        <span>({value.reviewCount})</span>
                                                    </div>
                                                    <div className="uk-width-expand uk-text-right">{value.mealType}</div>
                                                </div>
                                            </div>
                                            <a href={`/recipe/${value.id}`} className="uk-position-cover"></a>
                                        </div>
                                    </div>
                                )) : (
                                    <p>No recipes found for "{searchQuery}".</p>
                                )}
                            </div>
                            <div className="uk-margin-large-top uk-text-small">
                                <ul className="uk-pagination uk-flex-center uk-text-500 uk-margin-remove" data-uk-margin>
                                    <li><a href="#"><span data-uk-pagination-previous></span></a></li>
                                    <li><a href="#">1</a></li>
                                    <li className="uk-active"><span>2</span></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#"><span data-uk-pagination-next></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
