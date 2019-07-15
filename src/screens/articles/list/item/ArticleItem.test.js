import React from "react";
import { shallow } from "enzyme";
import ArticleItem from "./ArticleItem.js";

/* -------------------------------------------------------------------------- */
/*                                  UI Tests                                  */
/* -------------------------------------------------------------------------- */
describe("ArticleItem", () => {
    /* -------------------------------- snapshot -------------------------------- */
    it("matches snapshot", () => {
        expect.assertions(1);
        const articleItem = shallow(<ArticleItem />);
        expect(articleItem).toMatchSnapshot();
    });
});
