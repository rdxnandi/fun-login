import { Client, Account } from "appwrite";

const client = new Client();

try {
  const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
  const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

  if (!endpoint || !projectId) {
    throw new Error("Appwrite endpoint or project ID is not defined");
  }

  client.setEndpoint(endpoint).setProject(projectId);

  console.log(`Appwrite Project ID: ${projectId}`);
} catch (error) {
  console.error("Error setting up Appwrite client:", error.message);
}

export const account = new Account(client);

export default client;
