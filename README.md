# Secrets App

Secrets is a web application where users can register and login to share their secrets anonymously. The app uses authentication to secure user data and supports login via Google OAuth.

## Table of Contents

- [Installation and Setup](installation-and-setup)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [Additional Information](#additional-information)
- [Contribution](#contribution)

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Ashish-Chokhani/Secrets.git
    cd Secrets
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Google OAuth credentials:
    ```plaintext
    CLIENT_ID=your-google-client-id
    CLIENT_SECRET=your-google-client-secret
    ```

4. Start the server:
    ```bash
    node app.js
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Register:** Go to the Register page to create a new account.
- **Login:** Go to the Login page to sign into your account.
- **View Secrets:** Once logged in, view the secrets shared by other users.
- **Submit a Secret:** Share your own secret anonymously by navigating to the Submit page.

## File Structure

```bash
home-ejs
├── public
│   └── css
│       ├── styles.css
│       └── bootstrap-social.css
├── views
│   ├── partials
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── secrets.ejs
│   └── submit.ejs
├── .gitignore
├── app.js
├── package-lock.json
└── package.json
```

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **EJS**: Embedded JavaScript templating.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Passport.js**: Simple, unobtrusive authentication for Node.js.
- **dotenv**: Module to load environment variables from a .env file.
- **Bootstrap**: CSS framework for developing responsive and mobile-first websites.

## Additional Information

### Environment Variables

Ensure you have the following in your `.env` file:
```bash
CLIENT_ID=your-google-client-id
CLIENT_SECRET=your-google-client-secret
```


### Google OAuth Setup

1. Go to the [Google Developers Console](https://console.developers.google.com/).
2. Create a new project.
3. Under "Credentials", create an OAuth 2.0 Client ID.
4. Add `http://localhost:3000/auth/google/secrets` as an authorized redirect URI.

### MongoDB Setup

Make sure you have MongoDB installed and running on your local machine. You can download it from the [official website](https://www.mongodb.com/try/download/community).

### Contribution
We welcome contributions! Feel free to fork the repository, make changes, and submit a pull request.

