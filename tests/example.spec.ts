import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

export const aCustomExpect = expect.extend({
  async toBeVisible(pageObjectWouldGoHere: any) {
    const assertionName = 'toBeVisible';
    const customSearchLocator = pageObjectWouldGoHere;

    let pass: boolean;
    let matcherResult: any;
    try {
      const expectation = this.isNot ? expect(customSearchLocator).not : expect(customSearchLocator);
      await expectation.toBeVisible();
      pass = true;
    } catch (e: any) {
      matcherResult = e.matcherResult;
      pass = false;
    }

    if (this.isNot) {
      pass = !pass;
    }

    const message = pass
        ? () =>
            this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
            '\n\n' +
            `Locator: ${customSearchLocator}\n` +
            `Expected: not visible\n` +
            (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '')
        : () =>
            this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
            '\n\n' +
            `Locator: ${customSearchLocator}\n` +
            `Expected: visible\n` +
            (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '');

    return {
      message,
      pass,
      name: assertionName,
      expected: 'visible',
      actual: matcherResult?.actual,
    };
  },
});
