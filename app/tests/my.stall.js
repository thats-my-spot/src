import { Selector } from 'testcafe';

class YourStallPage {
  constructor() {
    this.pageId = '#list-stall-nav';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(1000).expect(this.pageSelector.exists).ok();
  }
}

export const yourStallPage = new YourStallPage();
