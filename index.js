const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const sequelize = require('./src/config/database');
const setupSwagger = require('./src/docs/swagger');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Use the CORS middleware
app.use(cors());

app.use('/api', taskRoutes);

setupSwagger(app);

sequelize.sync()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Error syncing database', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
