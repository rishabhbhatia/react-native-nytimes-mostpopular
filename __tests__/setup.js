import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

/* -------------------------------------------------------------------------- */
/*                            Mocks declared below                            */
/* -------------------------------------------------------------------------- */

global.fetch = require("jest-fetch-mock");

/* ----------------------------- mock alert ----------------------------- */
jest.mock("Alert", () => ({
  alert: jest.fn(),
}));
