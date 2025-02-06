import { test } from "@playwright/test";

test.describe("Web App", () => {
  test("posts and ecommerce", async ({ page }) => {
    await page.setViewportSize({
      width: 975,
      height: 968,
    });
    await page.goto("http://localhost:3000/posts");
    await page
      .locator("div > div > div > div:nth-of-type(1) div.text-sm")
      .click();
    await page.locator("[data-testid='like-button-123']").click();
    await page.locator("div.p-4 button").click();
    await page.locator("input").click();
    await page.locator("input").type("test");
    page.keyboard.down("{Enter}");
    await page.locator("ul button").click();
    await page.locator("a:nth-of-type(2)").click();
    await page.locator("[data-testid='button-sort-price-asc']").click();
    await page.locator("[data-testid='button-sort-price-asc']").click();
    await page.locator("[data-testid='button-Accessories']").click();
    await page.locator("[data-testid='button-Electronics']").click();
    await page.locator("[data-testid='button-Electronics']").click();
  });
});
