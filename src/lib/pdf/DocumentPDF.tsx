import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import type { DocPart, Section, Block, Span } from "./parse-html";

const s = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.55,
    color: "#222",
    paddingTop: 52,
    paddingBottom: 68,
    paddingHorizontal: 56,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 26,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  headerBrand: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#000",
  },
  headerDate: {
    fontSize: 7.5,
    color: "#999",
  },
  partTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#000",
    marginBottom: 20,
  },
  partSeparator: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#bbb",
    marginTop: 28,
    marginBottom: 28,
  },
  section: {
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#000",
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 4,
    color: "#333",
  },
  listRow: {
    flexDirection: "row",
    marginBottom: 2.5,
    paddingLeft: 8,
  },
  bullet: {
    width: 12,
    color: "#666",
    fontSize: 9,
  },
  listText: {
    flex: 1,
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 56,
    right: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#bbb",
  },
});

function Spans({ spans }: { spans: Span[] }) {
  return (
    <>
      {spans.map((span, i) =>
        span.bold ? (
          <Text key={i} style={{ fontFamily: "Helvetica-Bold" }}>
            {span.text}
          </Text>
        ) : (
          <Text key={i}>{span.text}</Text>
        )
      )}
    </>
  );
}

function BlockRow({ block }: { block: Block }) {
  if (block.type === "listItem") {
    return (
      <View style={s.listRow}>
        <Text style={s.bullet}>•</Text>
        <Text style={s.listText}>
          <Spans spans={block.spans} />
        </Text>
      </View>
    );
  }
  return (
    <Text style={s.paragraph}>
      <Spans spans={block.spans} />
    </Text>
  );
}

function SectionView({ section }: { section: Section }) {
  return (
    <View style={s.section}>
      {section.heading ? (
        <Text style={s.sectionHeading}>{section.heading}</Text>
      ) : null}
      {section.blocks.map((block, i) => (
        <BlockRow key={i} block={block} />
      ))}
    </View>
  );
}

interface Props {
  parts: DocPart[];
  generatedAt: string;
}

export function DocumentPDF({ parts, generatedAt }: Props) {
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header} fixed>
          <Text style={s.headerBrand}>ConformeFR</Text>
          <Text style={s.headerDate}>Généré le {generatedAt}</Text>
        </View>

        {parts.map((part, pi) => (
          <React.Fragment key={pi}>
            {pi > 0 && <View style={s.partSeparator} />}
            <Text style={s.partTitle}>{part.title}</Text>
            {part.sections.map((section, si) => (
              <SectionView key={si} section={section} />
            ))}
          </React.Fragment>
        ))}

        <View style={s.footer} fixed>
          <Text>
            Document généré par{" "}
            <Link src="https://conformefr.com" style={{ color: "#888" }}>
              conformefr.com
            </Link>
          </Text>
          <Text render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          } />
        </View>
      </Page>
    </Document>
  );
}
