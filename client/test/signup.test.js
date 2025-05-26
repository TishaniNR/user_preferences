/**
 * @jest-environment jsdom
 */

import * as webix from "webix";
import { SignUpPage } from "../src/pages/signup";
import { api } from "../src/utils/api";
import { setUserId } from "../src/auth";

jest.mock("../src/utils/api");
jest.mock("../src/auth");

describe("SignUpPage", () => {
  let form;

  beforeEach(() => {
    document.body.innerHTML = ""; // reset DOM

    // Mock window.showView function
    window.showView = jest.fn();

    // Reset mocks
    api.signup.mockReset();
    setUserId.mockReset();

    // Create the form UI
    form = webix.ui(SignUpPage);
  });

  afterEach(() => {
    if (form && form.destructor) form.destructor();
  });

  it("should validate required fields and show error message if invalid", () => {
    // Clear form values
    form.setValues({
      name: "",
      surname: "",
      email: "invalid-email",
      password: "",
      confirm_password: "",
      terms: false,
    });

    // Spy on webix.message
    const messageSpy = jest.spyOn(webix, "message");

    // Try clicking sign up button
    const signUpBtn = form.queryView({ view: "button", value: "Sign Up" });
    signUpBtn.callEvent("onItemClick", []);

    // Expect validation error message to show
    expect(messageSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: "error", text: "Please fill in required fields" })
    );

    messageSpy.mockRestore();
  });

  it("should call api.signup with form data and setUserId on success", async () => {
    // Set valid form values
    form.setValues({
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      confirm_password: "password123",
      terms: true,
      newsletter: true,
    });

    // Mock api.signup response
    api.signup.mockResolvedValue({
      message: "Signup successful",
      user_id: "20",
    });

    // Spy on webix.message
    const messageSpy = jest.spyOn(webix, "message");

    // Get the sign up button and simulate click
    const signUpBtn = form.queryView({ view: "button", value: "Sign Up" });
    await signUpBtn.callEvent("onItemClick", []);

    expect(api.signup).toHaveBeenCalledWith({
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      confirm_password: "password123",
      terms: false,
      newsletter: false,
    });

    expect(setUserId).toHaveBeenCalledWith("user-123");
    expect(messageSpy).toHaveBeenCalledWith("Signup successful");
    expect(window.showView).toHaveBeenCalledWith("home");

    messageSpy.mockRestore();
  });

  it("should show error message if signup fails", async () => {
    form.setValues({
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      confirm_password: "password123",
      terms: false,
      newsletter: false,
    });

    api.signup.mockResolvedValue({
      error: "Email already exists",
    });

    const messageSpy = jest.spyOn(webix, "message");

    const signUpBtn = form.queryView({ view: "button", value: "Sign Up" });
    await signUpBtn.callEvent("onItemClick", []);

    expect(api.signup).toHaveBeenCalled();
    expect(setUserId).not.toHaveBeenCalled();
    expect(messageSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: "error", text: "Email already exists" })
    );

    messageSpy.mockRestore();
  });

  it("should call window.showView('home') when Back button clicked", () => {
    const backBtn = form.queryView({ view: "button", value: "Back" });
    backBtn.callEvent("onItemClick", []);
    expect(window.showView).toHaveBeenCalledWith("home");
  });

  it("should call window.showView('login') when Login button clicked", () => {
    const loginBtn = form.queryView({ view: "button", value: "Login" });
    loginBtn.callEvent("onItemClick", []);
    expect(window.showView).toHaveBeenCalledWith("login");
  });
});
