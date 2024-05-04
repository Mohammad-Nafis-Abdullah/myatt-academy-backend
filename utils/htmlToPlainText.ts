export function htmlToPlainText(html: string) {
  return html.replace(/<[^>]+>/g, "");
}
