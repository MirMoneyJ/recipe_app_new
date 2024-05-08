RecipeRealm

Overview: This project is designed to manage, display, and interact with a collection of recipes. It aims to provide an easy-to-use interface for users to browse, search, and contribute recipes.

Features:

Recipe Management: Add, edit, and delete recipes.
Search Functionality: Easily find recipes based on ingredients, cuisine, or other criteria.
User Contributions: Users can submit their own recipes to the collection.
Project Structure:

JSON: Grabs the JSON objects from the Spoonacular API and saves them into a JSON file
key.env: Environment variables which holds the API key
logs: Directory for log files. Specifcally for login/register authentication.
models: Data model which holds the User schema.
public: Folder for the HTML files.
.gitignore: Files to ignore when pushing to Git.
README.md: This documentation file.
routes: Routing logic for web application.
scripts: Script logic for web application.
static: Where the main server lives.
styles: CSS stylesheets for the project.
----------------------------------------------------------------------------------------------------------------------------
How to run

1. Download required libraries
npm install [library name(below)]
    framer-motion 
    react-icons 
    react-router-dom
    styled-components
    '@splidejs/react-splide' 
2. open terminal
3. type 'cd recipe_app' 
4. type 'npm start' (*check the directory : ..\recipe_app\recipe_app)


