import { Page, expect } from '@playwright/test';

export class SubscribersPage {
  constructor(private page: Page) {}

  static async goTo(page: Page): Promise<SubscribersPage> {
    await page.goto('/subscribers');
    return new SubscribersPage(page);
  }

  async assertSubscribersPageIsVisible() {
    await expect(this.page.getByRole('heading', { name: 'Subscribers' })).toBeVisible();
    await expect(this.page).toHaveURL(/\/subscribers/);
  }

  getSubscribersTable() {
    return this.page.getByTestId('subscribers-table');
  }

  async assertSubscribersTableHeaders(headerTitles: string[]) {
    const headers = this.getSubscribersTable().locator('th');
    await headers.allTextContents().then((texts) => {
      expect(texts).toEqual(headerTitles);
    });
  }

  async assertSubscribersTableRowCount(count: number) {
    const rows = this.getSubscribersTable().locator('tr');
    await rows.count().then((rowCount) => {
      expect(rowCount - 1).toBe(count); // minus header
    });
  }
}
