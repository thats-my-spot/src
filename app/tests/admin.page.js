import { Selector } from 'testcafe';

class AdminPage {
  constructor() {
    this.pageId = '#list-stuff-admin-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(1001).expect(this.pageSelector.exists).ok();
  }
}

export const adminPage = new AdminPage();
