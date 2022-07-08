import { vi } from "vitest";
import { mdxTextToPlainText } from "./toPlainText";

vi.mock("~/.mdx");

describe("mdxModToPlainText block items", () => {
  // headers
  it("returns strings from the body of the post", () => {
    const text = "hello world";
    expect(mdxTextToPlainText(text)).toEqual("hello world");
  });
  it("removes header text", () => {
    const text = "# big hello world";
    expect(mdxTextToPlainText(text)).toContain("big hello world");
    expect(mdxTextToPlainText(text).includes("#")).toBeFalsy();
  });
  it("removes secondary headers", () => {
    const text = "## big hello world";
    expect(mdxTextToPlainText(text)).toContain("big hello world");
    expect(mdxTextToPlainText(text).includes("#")).toBeFalsy();
  });
  it("does not remove hashes if they they appear midline", () => {
    let text = "do not remove me: ###";
    expect(mdxTextToPlainText(text)).toEqual(text);
  });

  // block quotes
  it("removes block quotes (> at start of line)", () => {
    const text = "> I am a block quote";
    const result = mdxTextToPlainText(text);

    expect(result).toContain("I am a block quote");
    expect(result.includes(">")).toBeFalsy();
  });
  it("removes nested block quotes", () => {
    const text = ">> nested \n>>>block quote";
    const result = mdxTextToPlainText(text);

    expect(result).toContain("nested");
    expect(result).toContain("block quote");
    expect(result).toContain("\n");
    expect(result.includes(">")).toBeFalsy();
  });
  it("does not remove `>` character mid-line", () => {
    const text = "this should not => go away";
    const result = mdxTextToPlainText(text);

    expect(result).toEqual(text);
  });

  it('removes bullet points', () => {
    const text = '- bullet point\n- bullet point'
    const result = mdxTextToPlainText(text)

    expect(result).toContain('bullet point');
    expect(result.includes('-')).toBeFalsy()
  })
  it('removes bullet points with leading whitespace', () => {
    const text = '- bullet point\n  - nested bullet point'
    const result = mdxTextToPlainText(text)

    expect(result).toContain('bullet point');
    expect(result).toContain('nested bullet point');
    expect(result.includes('-')).toBeFalsy()
  })
  it('removes bullet points inside block quotes', () => {
    const text = '> - bullet point\n>  - bullet point\n> -in blockquote'
    const result = mdxTextToPlainText(text)

    expect(result).toContain('bullet point');
    expect(result).toContain('in blockquote');
    expect(result.includes('-')).toBeFalsy()
  })
});

// TODO: implement inline syntax removal `this`, *this*, etc

export {};
