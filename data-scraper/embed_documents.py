import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI

# Load .env variables
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX = os.getenv("PINECONE_INDEX")

# Hardcoded cloud/region since Pinecone throws errors otherwise
PINECONE_CLOUD =  os.getenv("PINECONE_ENV")
PINECONE_REGION =  os.getenv("PINECONE_REGION")

# Init Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)

# Check if index exists, otherwise create
if PINECONE_INDEX not in pc.list_indexes().names():
    print(f"📦 Creating Pinecone index '{PINECONE_INDEX}'...")
    pc.create_index(
        name=PINECONE_INDEX,
        dimension=1536,
        metric="cosine",
        spec=ServerlessSpec(
           cloud= PINECONE_CLOUD,  
           region=PINECONE_REGION 
        )
    )
    print("Index created.")
else:
    print(f"Index '{PINECONE_INDEX}' already exists.")

# Connect to the index
index = pc.Index(PINECONE_INDEX)

# Init OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

# Load markdown text
input_file = "data-scraper/data/aven/aven-support-faq.md"
if not os.path.exists(input_file):
    raise FileNotFoundError(f"File not found: {input_file}")

with open(input_file, "r", encoding="utf-8") as f:
    text = f.read()

chunks = text.split("\n\n")

for i, chunk in enumerate(chunks):
    if not chunk.strip():
        continue

    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=chunk
    )
    embedding = response.data[0].embedding

    vector_id = f"chunk-{i}"
    metadata = {"text": chunk[:300]}
    index.upsert([{"id": vector_id, "values": embedding, "metadata": metadata}])

print("✅ All chunks embedded and uploaded to Pinecone.")
