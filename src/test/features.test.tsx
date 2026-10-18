import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Landing from "@/pages/Landing";
import Cleanup from "@/pages/Cleanup";
import Filed from "@/pages/Filed";
import { AccessibilityPanel } from "@/components/AccessibilityPanel";
import { setUploadedImage, getUploadedImage } from "@/lib/uploaded-image";
import { PrefsProvider } from "@/components/preferences";
import { toast } from "sonner";

// Mock router navigation
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to?: string }) => <a href={to}>{children}</a>,
  useNavigate: () => vi.fn(),
}));

// Mock sonner toast
vi.mock("sonner", () => {
  const toastMock = vi.fn();
  return {
    toast: toastMock,
  };
});

describe("Requirement 1 & 2: Cleanup and Quick Edit", () => {
  it("renders Step 2 of 4 and enables Quick edit with editable textarea and toast on save", async () => {
    vi.useFakeTimers();

    render(
      <PrefsProvider>
        <Cleanup />
      </PrefsProvider>
    );

    // Initial scanning state has Step 2 of 4
    expect(screen.getAllByText("Step 2 of 4").length).toBeGreaterThan(0);

    // Fast-forward the scanning timeout (2200ms)
    act(() => {
      vi.advanceTimersByTime(2300);
    });

    // Cleanup comparison screen is displayed
    expect(screen.getAllByText("Step 2 of 4").length).toBeGreaterThan(0);
    expect(screen.getByText("Before & after")).toBeInTheDocument();
    expect(screen.getByText("Looks good")).toBeInTheDocument();

    const quickEditBtn = screen.getByRole("button", { name: /quick edit/i });
    expect(quickEditBtn).toBeInTheDocument();

    // Click quick edit
    fireEvent.click(quickEditBtn);

    // Text area should appear
    const textarea = screen.getByLabelText(/edit clean note/i) as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toContain("Thermodynamics");

    // Modify text
    fireEvent.change(textarea, { target: { value: "Thermodynamics\n\nCustom Section:\n• New edited bullet" } });

    // Save changes
    const saveBtn = screen.getAllByRole("button", { name: /^save$/i })[0];
    fireEvent.click(saveBtn);

    // Verify toast is triggered with "Changes saved"
    expect(toast).toHaveBeenCalledWith("Changes saved");

    // After save, the edited content is displayed in the clean note
    expect(screen.getByText("Custom Section")).toBeInTheDocument();
    expect(screen.getByText(/New edited bullet/i)).toBeInTheDocument();

    vi.useRealTimers();
  });
});

describe("Requirement 3: Image upload as BEFORE side and PDF fallback", () => {
  it("stores local object URL and provides it for BEFORE side", () => {
    const mockUrl = "blob:http://localhost:3000/mock-uuid";
    setUploadedImage(mockUrl);
    expect(getUploadedImage()).toBe(mockUrl);
  });

  it("shows prepared sample note as BEFORE when a PDF is uploaded", () => {
    setUploadedImage("blob:http://localhost:3000/test.pdf", "application/pdf");

    render(
      <PrefsProvider>
        <Cleanup />
      </PrefsProvider>
    );

    const img = screen.getByAltText("Your uploaded handwritten page") as HTMLImageElement;
    expect(img.src).toContain("messy-notes");
  });
});

describe("Requirement 4: Step progress indicators", () => {
  it("renders Step 3 of 4 on Filed screen", () => {
    render(
      <PrefsProvider>
        <Filed />
      </PrefsProvider>
    );

    expect(screen.getByText("Step 3 of 4")).toBeInTheDocument();
    expect(screen.getByText("All sorted!")).toBeInTheDocument();
  });
});

describe("Requirement 5: Landing hero with Thermodynamics and non-breaking exam-ready", () => {
  it("keeps exam-ready from breaking across lines and features thermodynamics in hero", () => {
    render(
      <PrefsProvider>
        <Landing />
      </PrefsProvider>
    );

    const examReady = screen.getByText("exam-ready");
    expect(examReady).toBeInTheDocument();
    expect(examReady.tagName).toBe("SPAN");
    expect(examReady).toHaveClass("whitespace-nowrap");

    // Thermodynamics comparison should be in the hero
    const beforeImage = screen.getByAltText(/thermodynamics/i);
    expect(beforeImage).toBeInTheDocument();
  });
});

describe("Requirement 6: Accessibility button tooltip and aria-label", () => {
  it("has aria-label Accessibility settings", () => {
    render(
      <PrefsProvider>
        <AccessibilityPanel />
      </PrefsProvider>
    );

    const btn = screen.getByRole("button", { name: "Accessibility settings" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("aria-label", "Accessibility settings");
  });
});
