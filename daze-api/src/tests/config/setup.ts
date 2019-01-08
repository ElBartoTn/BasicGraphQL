import { startServer } from "../../startServer";

export const setup = async () => {
  const app = await startServer();
  const { port }: any = app.address();
  process.env.TEST_HOST = `http://localhost:${port}/graphql`;
};
