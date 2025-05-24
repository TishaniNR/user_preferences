import { LoginPage } from "../src/pages/login"; 

describe("LoginPage Component", () => {
  it("should contain email and password fields", () => {
    const names = LoginPage.elements
      .filter((el) => el.name || el.view === "text")
      .map((el) => el.name);

    expect(names).toContain("email");
    expect(names).toContain("password");
  });

  it("should contain 'Login' and 'Back' buttons", () => {
    const buttons = LoginPage.elements.find(e => e.cols).cols;
    const values = buttons.map(btn => btn.value);

    expect(values).toContain("Login");
    expect(values).toContain("Back");
  });

  it("should contain navigation buttons", () => {
    const names = LoginPage.elements
      .filter(e => e.view === "button")
      .map(e => e.name);

    expect(names).toContain("remember_me");
    expect(names).toContain("forgot_password");
  });
});
