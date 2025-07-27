import { Pinecone } from '@pinecone-database/pinecone';

let pinecone: Pinecone | null = null;
let index: any = null;

function getPineconeClient() {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pinecone;
}

function getIndex() {
  if (!index) {
    const client = getPineconeClient();
    index = client.index(process.env.PINECONE_INDEX!);
  }
  return index;
}

export async function getMatchesFromPinecone(embedding: number[]) {
  const pineconeIndex = getIndex();
  const result = await pineconeIndex.query({
    vector: embedding,
    topK: 5,
    includeMetadata: true,
  });

  return result.matches || [];
}
