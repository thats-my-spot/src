import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { availPage } from './availability';
import { signupPage } from './signup.page';
import { yourStallPage } from './my.stall';
import { adminPage } from './admin.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'admin@foo.com', password: 'changeme' };
const newCreds = { username: 'abc@foo.com', licensePlate: 'ABC123', password: 'changeme', hasPass: 'True' };

fixture('meteor-react-bootstrap-template localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up and all pages work', async (testController) => {
  await landingPage.isDisplayed(testController);
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoAvailPage(testController);
  await availPage.isDisplayed(testController);
  await navBar.gotoYourStallPage(testController);
  await yourStallPage.isDisplayed(testController);
  await navBar.gotoAdminPage(testController);
  await adminPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
  await navBar.gotoSignUpPage(testController);
  await signupPage.signupUser(testController, newCreds.username, newCreds.licensePlate, newCreds.password, newCreds.hasPass);
});

/* test('Test that admin signin works', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
});

test('Test that new pages work', async (testController) => {
  await navBar.gotoAvailPage(testController);
  await availPage.isDisplayed(testController);
});

test('Test that signout works', async (testController) => {
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
}); */
