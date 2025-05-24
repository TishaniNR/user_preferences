/**
 * @jest-environment jsdom
 */

jest.mock("webix");
jest.mock("../src/auth", () => ({
  getUserId: jest.fn(() => "mock-user-id"),
}));

import { HomePage } from "../src/pages/home";
import { getUserId } from "../src/auth";

describe("HomePage", () => {
  let queryViewMock;
  let showMock = jest.fn();
  let hideMock = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    queryViewMock = jest.fn((config) => ({
      show: showMock,
      hide: hideMock,
    }));

    // Simulate a Webix component with queryView
    const dummyComponent = {
      queryView: queryViewMock,
    };

    // Call the onViewShow event manually with mocked context
    HomePage.on.onViewShow.call(dummyComponent);

    // Reset browser history
    window.history.pushState({}, "", "/");
  });

  it("should call getUserId and update button visibility", () => {
    expect(getUserId).toHaveBeenCalled();

    // Buttons queried
    expect(queryViewMock).toHaveBeenCalledWith({ id: "loginBtn" });
    expect(queryViewMock).toHaveBeenCalledWith({ id: "signupBtn" });
    expect(queryViewMock).toHaveBeenCalledWith({ id: "logoutBtn" });
    expect(queryViewMock).toHaveBeenCalledWith({ id: "settingBtn" });

    // Visibility calls
    expect(showMock).toHaveBeenCalledTimes(2); // show settings and logout
    expect(hideMock).toHaveBeenCalledTimes(2); // hide login and signup
  });

  it("should update the URL with userId", () => {
    expect(window.location.pathname).toBe("/home/mock-user-id");
  });
});
