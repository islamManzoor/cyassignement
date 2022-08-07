import "cypress-localstorage-commands";
const users = require("../fixtures/userdata");
require("cypress-xpath");

const uniqueSeed = Date.now().toString();
const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
const number = getUniqueId();
var emailAddress = `testEmail${number}@gmail.com`;
var firstName = "Test Assignment";

describe("etsy spec", function () {
  before(function () {
    cy.loginByGoogleApi();
  });

  it("Open the website and verify the page title", () => {
    cy.visit("https://www.etsy.com");
    cy.title().should("include", "Etsy Pakistan - Shop for handmade");
  });

  it("To verify that an error should occur for providing null value to mandatory field(Email)", () => {
    cy.contains("Sign in").click();
    cy.get(".select-register", { timeout: 10000 }).click();

    cy.get('input[id="join_neu_first_name_field"]').type(firstName);
    cy.get('input[id="join_neu_password_field"]').type("Testassignmnet04*");
    cy.get('button[name="submit_attempt"]').click();
    //cy.get('div[class="wt-text-body-01 wt-text-center-xs"]').should('contain.text', 'An error has occurred, please try again!');
    cy.get('div[id="aria-join_neu_email_field-error"]', {
      timeout: 20000,
    }).should("contain.text", "Email can't be blank.");
  });

  it("To verify that an error should occur for providing null value to mandatory field(First Name)", () => {
    cy.contains("Sign in").click();
    cy.get(".select-register").click();

    cy.get('input[id="join_neu_email_field"]').type(emailBeforePart);
    cy.get('input[id="join_neu_password_field"]').type("Testassignmnet04*");
    cy.get('button[name="submit_attempt"]').click();
    //cy.get('div[class="wt-text-body-01 wt-text-center-xs"]').should('contain.text', 'An error has occurred, please try again!');
    cy.get('div[id="aria-join_neu_first_name_field-error"]').should(
      "contain.text",
      "First name can't be blank."
    );
  });

  it("To verify that an error should occur for providing null value to mandatory field(Password)", () => {
    cy.contains("Sign in").click();
    cy.get(".select-register").click();

    cy.get('input[id="join_neu_email_field"]').type(emailBeforePart);
    cy.get('input[id="join_neu_first_name_field"]').type(firstName);
    cy.get('button[name="submit_attempt"]').should("be.disabled");
  });

  it("Register an account and verify", () => {
    cy.contains("Sign in").click();
    cy.reload();
    cy.get(".select-register").click();

    cy.get('input[id="join_neu_email_field"]').type(emailAddress);
    cy.get('input[id="join_neu_first_name_field"]').type(firstName);
    cy.get('input[id="join_neu_password_field"]').type("Testassignmnet04*");
    cy.get('button[name="submit_attempt"]').click();
    cy.get(".wt-text-link").should("contain.text", firstName);
  });

  users.forEach((credentials) => {
    it("Login via multiple users", () => {
      cy.visit("https://www.etsy.com");
      cy.contains("Sign in").click();
      cy.get('input[id="join_neu_email_field"]').type(credentials.email);
      cy.get('input[id="join_neu_password_field"]').type(credentials.password);
      cy.get('button[name="submit_attempt"]').click();
      cy.get("wt-text-link").should("have.text", "cytest");
      //cy.url().should('eq', 'https://www.etsy.com/?');
    });
  });

  it("Verify failed login attempt", () => {
    cy.visit("https://www.etsy.com");
    cy.contains("Sign in").click();
    cy.get('input[id="join_neu_email_field"]').type("cytest1@gmail.com");
    cy.get('input[id="join_neu_password_field"]').type("wrongpassord");
    cy.get('button[name="submit_attempt"]').click();
    cy.get('div[id="aria-join_neu_password_field-error"]').should(
      "contain.text",
      "Password was incorrect"
    );
  });

  it("Add to cart and edit, delete product", () => {
    cy.visit("https://www.etsy.com");
    cy.get('input[data-id="search-query"]', { timeout: 10000 }).type(
      "Graffito Pillow Cover in Ivory Onyx{enter}"
    );
    cy.xpath(
      '(//span[contains(@class,"wt-vertical-align-middle")][normalize-space()="Add to basket"])[1]'
    )
      .invoke("show")
      .click({ force: true });
    cy.get('select[id="wt-cart-select-"]', { timeout: 10000 }).select(1, {
      force: true,
    });
    cy.get('a[title="Edit Variation for Listing"]', { timeout: 10000 }).click();
    cy.get('select[id="wt-cart-select-"]', { timeout: 10000 }).select(2, {
      force: true,
    });
    cy.wait(1000);
    cy.xpath('(//select[@name="listing-quantity"])[2]', {
      timeout: 10000,
    }).select(3, { force: true });
    cy.xpath('(//span[contains(text(),"Remove")])[1]').click({ force: true });
  });
});
