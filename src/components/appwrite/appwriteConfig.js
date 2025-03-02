import { Account, Client } from "appwrite";

const endpoint = import.meta.env.VITE_APPWRITE_URL;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  throw new Error(
    "Appwrite endpoint or project ID is not defined in environment variables"
  );
}

const client = new Client();

client.setEndpoint(endpoint).setProject(projectId);

export const account = new Account(client);

export default client;
