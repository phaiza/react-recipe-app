import React, { Component } from "react";
import Form from "./components/Form";
import Recipes from "./components/Recipes";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../src/App.css";
import axios from "axios";
const API_KEY = "a1539029eaec433aa86c4be97c2ad8e6";

export default class App extends Component {
  state = {
    recipes: [],
    imageURI: undefined
  };

  getRecipe = async e => {
    e.preventDefault();
    const search = e.target.elements.recipeName.value;

    axios
      .get(
        `https://api.spoonacular.com/recipes/search?query=${search}&apiKey=${API_KEY}`
      )
      .then(res => {
        const recipes = res.data.results;
        const image_URI = res.data.baseUri;
        console.log(res.data);
        this.setState({ recipes: recipes, imageURI: image_URI });
      });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row d-flex justify-content-center">
                <h1 className="logo">Now Eat This</h1>
              </div>
              <div className="row d-flex justify-content-center searchForm">
                <Form getRecipe={this.getRecipe} />
              </div>
              <div className="row">
               
                  {this.state.recipes.map(recipe => (
                   <div className="col-md-4 recipeBox"> <img className="img-fluid"
                        src={this.state.imageURI + recipe.imageUrls}
                        alt=""
                      />
                     <p className="recipeTitle"> {recipe.title}</p>
                   </div>
                     
                  ))}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
