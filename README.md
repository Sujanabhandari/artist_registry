# Artist Registry Server

## Develop or Test

1. Creat `api_key` from <<https://www.last.fm/api/show/artist.search>
2. Create .env file to add api keys. eg of `.env`:

    ```env
    FN_API_KEY = api_key
    ```

3. Run server

    ```bash
    npm install
    npm start
    ```

4. Use `npm run watch` for live watch
5. Use `npm run debug` for debugging in vscode
   1. Make sure `Auto Attach: With Flag` in vscode is set
6. Lint your code with `npm run lint`
