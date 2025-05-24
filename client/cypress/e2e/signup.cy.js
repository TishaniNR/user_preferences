describe("Sign Up Page Functional Test", () => {
  beforeEach(() => {
    // Visit the signup view. Adjust if the hash route or base path is different.
    cy.visit("http://localhost:5173/#signup");
  });

  it("should show validation errors when submitting empty form", () => {
    cy.contains("button", "Sign Up").click(); // More reliable selector
    cy.contains("Please fill in required fields").should("be.visible");
  });

  it("should show error if passwords do not match", () => {
    cy.get('[name="name"]').type("John");
    cy.get('[name="surname"]').type("Doe");
    cy.get('[name="email"]').type("john@example.com");
    cy.get('[name="password"]').type("password123");
    cy.get('[name="confirm_password"]').type("password321");
    cy.get('[name="terms"]').click(); // checkbox in Webix might need click not check

    cy.contains("button", "Sign Up").click();
    cy.contains("Passwords do not match").should("be.visible");
  });

  it("should submit form and redirect on successful signup", () => {
    cy.intercept("POST", "/api/signup", {
      statusCode: 200,
      body: {
        message: "Signup successful!",
        user_id: "mock-user-id",
      },
    }).as("signupRequest");

    cy.get('[name="name"]').type("John");
    cy.get('[name="surname"]').type("Doe");
    cy.get('[name="email"]').type("john@example.com");
    cy.get('[name="password"]').type("password123");
    cy.get('[name="confirm_password"]').type("password123");
    cy.get('[name="terms"]').click();

    cy.contains("button", "Sign Up").click();

    cy.wait("@signupRequest").its("response.statusCode").should("eq", 200);
    cy.contains("Signup successful!").should("be.visible");

    // If home view is shown without a URL change, remove the line below
    cy.url().should("include", "/home"); // Optional, depending on routing
  });
});
