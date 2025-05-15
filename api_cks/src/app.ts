import express from "express";
import { connectionDB } from "./models/database";
import cors from "cors";
import contractRoutes from "./route/contracts.route";

const app = express();

const port = process.env.PORT || 8182;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin : 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/v1', contractRoutes);

async function testConnection() {
    try {
      await connectionDB.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await testConnection();
})

