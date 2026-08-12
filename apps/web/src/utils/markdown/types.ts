export interface MarkdownFileOptions {
  filepath: string;
}

export interface TableOfContentsItem {
  id: string;
  label: string;
}

export interface RenderedMarkdown {
  html: string;
  toc: TableOfContentsItem[];
}
