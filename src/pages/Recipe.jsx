import React, { useEffect, useState } from 'react';

export default function Recipe() {
    let [data, setData] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/recipes')
            .then((response) => {
                return response.json();
            })
            .then((data) => { 
                setData(data["recipes"]);
            });
    }, []);

    return (
        <>
            <div className="uk-section uk-section-default">
                
                <div className="uk-section uk-section-muted">
                    <div className="uk-container">
                        
                        <div className="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-margin-medium-top" data-uk-grid>
                            {data.map((value) => {
                                return (
                                    <div key={value.id}>
                                        <div className="uk-card">
                                            <div className="uk-card-media-top uk-inline uk-light">
                                                <img className="uk-border-rounded-medium" src={value.image} alt="Course Title"></img>
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
                                            <a href={`/recipe/${value.id}`} state={data} className="uk-position-cover"></a>
                                        </div>
                                    </div>
                                );
                            })}
                             
                        </div>
                        <div className="uk-margin-large-top uk-text-small">
                                <ul className="uk-pagination uk-flex-center uk-text-500 uk-margin-remove" data-uk-margin>
                                    <li><a href="#"><span data-uk-pagination-previous></span></a></li>
                                    <li><a href="">1</a></li>
                                    <li className="uk-active"><span><a href="recipe">2</a></span></li>
                                    <li><a href="search">3</a></li>
                                    
                                    <li><a href="contact">4</a></li>
                                    <li><a href="#"><span data-uk-pagination-next></span></a></li>
                                </ul>
                            </div>
                    </div>
                </div>
            </div>
        </>
    );
}
