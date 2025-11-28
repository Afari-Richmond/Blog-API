import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerspec from "./config/swagger";
import authRoutes from "./routes/authRoutes";

dotenv.config()

const app = express();

const PORT = 3000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerspec));
app.use('/api/auth', authRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
