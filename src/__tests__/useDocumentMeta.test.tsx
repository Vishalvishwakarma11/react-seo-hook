import { render, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useDocumentMeta, MetaConfig } from "../index";

describe("useDocumentMeta", () => {
  it("sets document title and meta tags", async () => {
    const metaConfig: MetaConfig = {
      title: "Test Title",
      description: "Test Description",
      keywords: "test, keywords",
      canonicalUrl: "https://example.com/test",
    };

    const TestComponent = () => {
      useDocumentMeta(metaConfig);
      return null;
    };

    await act(async () => {
      render(
        <MemoryRouter>
          <TestComponent />
        </MemoryRouter>
      );
    });

    expect(document.title).toBe("Test Title");
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content")
    ).toBe("Test Description");
    expect(
      document.querySelector('meta[name="keywords"]')?.getAttribute("content")
    ).toBe("test, keywords");
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href")
    ).toBe("https://example.com/test");
  });
});
