export interface Span {
  bold: boolean;
  text: string;
}

export interface Block {
  type: "paragraph" | "listItem";
  spans: Span[];
}

export interface Section {
  heading: string;
  blocks: Block[];
}

export interface DocPart {
  title: string;
  sections: Section[];
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripAllTags(html: string): string {
  return decodeEntities(
    html
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

function parseSpans(html: string): Span[] {
  const spans: Span[] = [];
  let rest = html;

  while (rest.length > 0) {
    const match = rest.match(
      /^([\s\S]*?)<(?:strong|b)>([\s\S]*?)<\/(?:strong|b)>([\s\S]*)$/
    );
    if (match) {
      const before = stripAllTags(match[1] ?? "");
      if (before) spans.push({ bold: false, text: before });
      const bold = stripAllTags(match[2] ?? "");
      if (bold) spans.push({ bold: true, text: bold });
      rest = match[3] ?? "";
    } else {
      const text = stripAllTags(rest);
      if (text) spans.push({ bold: false, text });
      break;
    }
  }

  return spans;
}

function parseSection(html: string): Section {
  const h2Match = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
  const heading = h2Match ? stripAllTags(h2Match[1] ?? "") : "";
  const content = html.replace(/<h2[^>]*>[\s\S]*?<\/h2>/, "");
  const blocks: Block[] = [];

  const blockRegex = /<p[^>]*>([\s\S]*?)<\/p>|<ul[^>]*>([\s\S]*?)<\/ul>/g;
  let blockMatch;
  while ((blockMatch = blockRegex.exec(content)) !== null) {
    if (blockMatch[1] !== undefined) {
      const spans = parseSpans(blockMatch[1]);
      if (spans.length > 0) blocks.push({ type: "paragraph", spans });
    } else if (blockMatch[2] !== undefined) {
      const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/g;
      let liMatch;
      while ((liMatch = liRegex.exec(blockMatch[2])) !== null) {
        const spans = parseSpans(liMatch[1] ?? "");
        if (spans.length > 0) blocks.push({ type: "listItem", spans });
      }
    }
  }

  return { heading, blocks };
}

function parseSections(html: string): Section[] {
  const sections: Section[] = [];
  const sectionRegex = /<section[^>]*>([\s\S]*?)<\/section>/g;
  let match;
  while ((match = sectionRegex.exec(html)) !== null) {
    const section = parseSection(match[1] ?? "");
    if (section.heading || section.blocks.length > 0) {
      sections.push(section);
    }
  }
  return sections;
}

const PART_TITLES: Record<string, string[]> = {
  mentions_legales: ["Mentions légales"],
  politique_confidentialite: ["Politique de confidentialité"],
  pack: ["Mentions légales", "Politique de confidentialité"],
};

export function parseDocument(
  html: string,
  docType: string
): DocPart[] {
  const titles = PART_TITLES[docType] ?? ["Document"];
  const rawParts = html.split(/<hr[^>]*class="document-separator"[^>]*\/?>/);

  return rawParts.map((part, i) => ({
    title: titles[i] ?? titles[0] ?? "Document",
    sections: parseSections(part),
  }));
}
