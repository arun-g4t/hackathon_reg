import { variables } from "./config/envLoader";
import Server from "./server";
const start = async () => {
  try {
    const { PORT } = variables;
    console.log(PORT);
    const app = new Server();
    app.start(Number(PORT));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
