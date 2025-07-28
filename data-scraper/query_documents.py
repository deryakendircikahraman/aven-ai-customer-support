import os
from dotenv import load_dotenv
from openai import OpenAI
from pinecone import Pinecone

# Load environment variables
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV")
PINECONE_INDEX = os.getenv("PINECONE_INDEX")

# Initialize clients
client = OpenAI(api_key=OPENAI_API_KEY)
pc = Pinecone(api_key=PINECONE_API_KEY)
index = pc.Index(PINECONE_INDEX)

# Get user question
query = input("Ask your question: ")

# Create embedding for the question
query_embedding = client.embeddings.create(
    model="text-embedding-3-small",
    input=query
).data[0].embedding

# Query Pinecone
results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True
)

# Extract context from results
contexts = [match['metadata']['text'] for match in results['matches']]
context_text = "\n\n---\n\n".join(contexts)

# Create GPT prompt
system_prompt = "You are a helpful support assistant for Aven. CRITICAL: Always spell the company name as 'Aven' - never use 'Avon', 'Avan', or any other variation. Answer based only on the provided context."

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Context:\n{context_text}\n\nQuestion: {query}"}
    ]
)

# Output final answer
print("Answer:")
print(completion.choices[0].message.content)
