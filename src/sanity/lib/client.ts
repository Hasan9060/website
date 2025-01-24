// client.ts
import { createClient } from 'next-sanity';

const client = createClient({
  projectId: "2srh4ekv",
  dataset: "productions",
  apiVersion: '2025-01-18',
  useCdn: true, // Use `false` to always fetch fresh data
  token: process.env.SANITY_API_TOKEN, // Securely use the token
});

export default client;
