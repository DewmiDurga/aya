import { app } from "./app";
import { ENV } from "./config/env";

const port = parseInt(ENV.PORT, 10);

app.listen(port, () => {
  console.log(`🌸 ඇය (Eya) REST API listening on http://localhost:${port}`);
  console.log(`📡 Health check available at http://localhost:${port}/health`);
});
