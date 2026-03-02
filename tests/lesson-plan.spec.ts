import { expect, test } from "@playwright/test";

test.describe("Chat UI", () => {
  test("should display the input field and send button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("chat-input")).toBeVisible();
    await expect(page.getByTestId("send-button")).toBeVisible();
  });

  test("should display empty state with suggestions", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Lesson Plan Generator" }).first(),
    ).toBeVisible();
    await expect(
      page.getByText("Photosynthesis for 5th graders"),
    ).toBeVisible();
  });

  test("should display user message after sending", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("chat-input").fill("Volcanoes for 6th graders");
    await page.getByTestId("send-button").click();

    await expect(page.getByTestId("message-user")).toBeVisible();
    await expect(page.getByTestId("message-user")).toContainText("Volcanoes");
  });
});

test.describe("Lesson Plan Generation", () => {
  test("should generate a lesson plan about the given topic", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByTestId("chat-input").fill("Photosynthesis for 5th graders");
    await page.getByTestId("send-button").click();

    const assistantMessage = page.getByTestId("message-assistant").last();
    await expect(assistantMessage).toContainText("Lesson Plan", {
      timeout: 60000,
    });
  });
});
