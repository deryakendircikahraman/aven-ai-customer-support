from exa_py import Exa
import os
import re

EXA_API_KEY = "8dbe0f5c-2c9d-4e38-9731-c97db4eef579"  # << Buraya kendi key’ini gir

SAVE_DIR = "data/aven"
os.makedirs(SAVE_DIR, exist_ok=True)

exa = Exa(api_key=EXA_API_KEY)

def clean_text(text):
    text = re.sub(r"\n{2,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()

def parse_sections(text):
    sections = {}
    current_section = "General"
    current_q = ""
    buffer = []

    for line in text.splitlines():
        line = line.strip()

        # Section header (ex: ##### Payments)
        if line.startswith("#####"):
            if current_q and buffer:
                sections.setdefault(current_section, []).append((current_q, "\n".join(buffer)))
                buffer = []
            current_section = line.replace("#####", "").strip()
            current_q = ""
        # Question (ex: - What is... ?)
        elif line.startswith("- "):
            if current_q and buffer:
                sections.setdefault(current_section, []).append((current_q, "\n".join(buffer)))
                buffer = []
            current_q = line.replace("- ", "").strip()
        elif line and not line.startswith("![](https://") and "iframe" not in line:
            buffer.append(line)

    if current_q and buffer:
        sections.setdefault(current_section, []).append((current_q, "\n".join(buffer)))

    return sections

def write_markdown(sections, filename="aven-support-faq.md"):
    path = os.path.join(SAVE_DIR, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write("# Aven Support – Frequently Asked Questions\n\n")
        for section, qas in sections.items():
            f.write(f"## {section}\n\n")
            for q, a in qas:
                f.write(f"### {q}\n")
                f.write(f"{clean_text(a)}\n\n")
    print(f"Saved cleaned Markdown: {path}")

def main():
    print("🔍 Crawling Aven support content from Exa.ai...")
    results = exa.get_contents(
        ["https://www.aven.com/support"],
        text=True,
        context=True
    )

    for result in results.results:
        title = result.title or "Aven Support"
        content = result.text.strip() if result.text else ""

        if content and "JavaScript" not in content and len(content) > 300:
            print(f"Processing: {title}")
            sections = parse_sections(content)
            write_markdown(sections)
        else:
            print(f"Skipped: {title}")

if __name__ == "__main__":
    main()
