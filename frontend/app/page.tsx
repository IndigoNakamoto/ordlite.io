// app/page.tsx
import React from 'react';
import HomePage from './page-home'; // Importing the HomePage Client Component
import { Metadata } from 'next'

interface FilterType {
  contentTypeType: string
  contentType: string
  sortBy: string
  page: number
  cursed: boolean
}

interface Inscription {
  address: string;
  charms: string[];
  children: string[];
  content_length: number;
  content_type: string;
  content_type_type: string;
  genesis_fee: number;
  genesis_height: number;
  inscription_id: string;
  inscription_number: number;
  next: string;
  output_value: number;
  parent: string;
  previous: string;
  rune: string;
  sat: string;
  satpoint: string;
  timestamp: string;
}


export const metadata: Metadata = {
  title: 'OrdLite.io',
  description: '',
  // TODO
}

// Assuming this fetchInscriptions function replaces the data fetching logic previously found in HomePage
// async function fetchInscriptions(lastInscriptionNumber: number | undefined, filter: FilterType) {
//   const query = new URLSearchParams({
//     lastInscriptionNumber: lastInscriptionNumber?.toString() || '',
//     sortBy: filter.sortBy,
//     contentType: filter.contentType,
//     cursed: filter.cursed.toString(),
//   }).toString();
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/inscriptions?${query}`);
//   const inscriptions = await response.json();
//   return inscriptions;
// }

async function fetchInscriptions(filter: FilterType) {
  // Base URL for the inscriptions endpoints
  let baseUrl = `http://localhost:3005/inscriptions`;

  // Determine the correct endpoint based on the filters
  if (filter.contentTypeType) {
    baseUrl += `/content_type_type/${filter.contentTypeType}`;
  } else if (filter.contentType) {
    baseUrl += `/content_type/${filter.contentType}`;
  } else {
    baseUrl += '/'; // Default to getting all inscriptions
  }

  // Build the query parameters
  const queryParams = new URLSearchParams({
    sortOrder: 'oldest',
    page: filter.page?.toString() || '1',
    cursed: filter.cursed.toString(),
    limit: '100', // Assuming you want to keep the limit or it can be adjusted based on your requirements
  }).toString();

  // Complete URL with query parameters
  const url = `${baseUrl}?${queryParams}`;

  // Fetch the data from the backend
  const response = await fetch(url);
  const data = await response.json();
  return data
}

// This is a Server Component
export default async function Page() {
  // Example data fetching in Server Component
  const filter = { sortBy: 'oldest', contentType: '', contentTypeType: '', page: 1, cursed: false };
  const inscriptions = await fetchInscriptions(filter);
  // const inscriptions:Inscription[] = []
  // Forward fetched data to your Client Component
  return <HomePage initialInscriptions={inscriptions} />;
}
