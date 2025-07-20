# My Vercel App

This project is a simple web application deployed on Vercel. It includes a serverless function and a static HTML page.

## Project Structure

```
my-vercel-app
├── api
│   └── index.js        # Serverless function to handle requests
├── public
│   └── index.html      # Main HTML document
├── vercel.json         # Vercel configuration file
├── package.json        # npm configuration file
└── README.md           # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-vercel-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Deploy to Vercel:
   ```
   vercel
   ```

## Usage

- The serverless function can be accessed via the `/api` endpoint.
- The main web page is served from the `/public/index.html` file.

## License

This project is licensed under the MIT License.