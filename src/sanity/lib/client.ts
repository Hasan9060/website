import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: true,
  // Only include token when running server-side
  token: typeof window === 'undefined' ? process.env.SANITY_API_TOKEN! : undefined,
});
