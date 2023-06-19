# Soccer App

Made using Vite, React, and Bootstrap 5.  

## Leagues

Users can view table, match, and top scorers information for the following leagues:
<ul>
<li> Bundesliga</li>
<li> La Liga</li>
<li> Ligue 1</li>
<li> Premier League</li>
<li> Serie A</li>
</ul>

## Season

Users can view information for the 2020, 2021, and 2022 seasons. 

## Description

I wanted to remake my project from my senior capstone class using React.
So far, users can view information for completed seasons and cannot view live updates of soccer matches. 

# Running the project

## Prerequisites
<ol>
  <li>Node.js and npm: This project requires Node.js and npm. You can download both [here](https://nodejs.org/)</li>
  <li>RapidAPI Key: This project requires a RapidAPI Key. You can obtain a key by following the instructions [here](https://docs.rapidapi.com/docs/keys).</li>
  <li>Subscribe to API-Football Free-tier [here](https://rapidapi.com/api-sports/api/api-football).</li>
</ol>

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. **Clone the repository**:

    ```sh
    https://github.com/piero-ac/soccer-app.git
    cd project
    ```
2. **Install the dependencies**:

    Run the following command in the root directory of your project:

    ```sh
    npm install
    ```

3. **Set up your environment variables**:

    Create a `.env` file in the root directory of your project, and add your RapidAPI key:

    ```
    VITE_RAPID_API_KEY=YourRapidApiKeyHere
    ```

    Replace `YourRapidApiKeyHere` with your actual RapidAPI key.

4. **Start the development server**:

    ```sh
    npm run dev
    ```

    This command starts the Vite development server. You can now open your browser and navigate to `http://localhost:5000` to see the project running.
