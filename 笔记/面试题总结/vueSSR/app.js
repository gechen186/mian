const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send(`
        <html>
            <head>
                <title>SSR</title>
            </head>
            <body>
                <p>hello world</p>
            </body>
        </html>
    `);
});

app.listen(3001, function() {
    console.log('listen:3001');
});