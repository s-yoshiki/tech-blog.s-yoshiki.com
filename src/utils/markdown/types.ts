export interface MarkdownFileOptions {
  filepath: string;
}

export interface RenderedMarkdown {
  html: string;
  toc: string[];
}
