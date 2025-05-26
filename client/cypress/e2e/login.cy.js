import { LoginPage } from "../components/LoginPage";
import { api } from "../utils/api";
import { setUserId } from "../auth";

jest.mock("../utils/api");
jest.mock("../auth");

describe("Login Page Functional Test", () => {
  let form;

  beforeEach(() => {
    document.body.innerHTML = ""; 
    webix.ui(LoginPage, document.body);
    form = webix.$$("form"); 
  });

  afterEach(() => {
    webix.ui([], document.body); 
    jest.clearAllMocks();
  });

  test("should show error when submitting empty form", async () => {
    const loginBtn = form.queryView({ view: "button", value: "Login" });
    loginBtn.callEvent("onItemClick");

    const messages = webix.message.pull;
    expect(messages[messages.length - 1].text).toMatch(/login failed/i);
  });

  test("should show error for invalid credentials", async () => {
    const loginBtn = form.queryView({ view: "button", value: "Login" });

    form.setValues({
      email: "test@example.com",
      password: "wrongpass",
    });

    api.login.mockResolvedValueOnce({ message: null });

    await loginBtn.callEvent("onItemClick");

    const messages = webix.message.pull;
    expect(messages[messages.length - 1].text).toMatch(/invalid username or password/i);
  });

  test("should login successfully and redirect to home", async () => {
    const mockShowView = jest.fn();
    window.showView = mockShowView;

    form.setValues({
      email: "user@example.com",
      password: "correctpass",
    });

    api.login.mockResolvedValueOnce({
      message: "Login successful",
      user_id: 123,
    });

    const loginBtn = form.queryView({ view: "button", value: "Login" });
    await loginBtn.callEvent("onItemClick");

    expect(setUserId).toHaveBeenCalledWith(123);
    expect(mockShowView).toHaveBeenCalledWith("home");
  });
});
