const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hey docker!',
    });
});

app.listen(5200, () => {
    console.log('Server is running on port 5200');
});

