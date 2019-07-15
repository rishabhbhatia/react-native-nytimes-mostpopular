import React from "react";
import { shallow } from "enzyme";
import ArticleDetails from "./ArticleDetails";
import { TEST_ID_ARTICLE_DETAILS_SCREEN_WEBVIEW } from "../../../utils/constants/testIds";


const navigation = { getParam: () => { return { articleUrl: "https://www.nytimes.com/interactive/2019/07/03/us/us-citizenship-test-quiz.html " } } };

/* -------------------------------------------------------------------------- */
/*                                  UI Tests                                  */
/* -------------------------------------------------------------------------- */
describe("ArticleDetails", () => {
    /* -------------------------------- snapshot -------------------------------- */
    it("matches snapshot", () => {
        expect.assertions(1);
        const articleDetailsScreen = shallow(<ArticleDetails navigation={navigation} />);
        expect(articleDetailsScreen).toMatchSnapshot();
    });

    it("article details view is visible", () => {
        expect.assertions(1);
        const articleDetailsScreen = shallow(<ArticleDetails navigation={navigation} />);
        const articleDetailsWebview = articleDetailsScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLE_DETAILS_SCREEN_WEBVIEW);
        expect(articleDetailsWebview.exists()).toBeTruthy();
    });

    it("article details loading renders correctly", () => {
        expect.assertions(1);
        const articleDetailsScreen = shallow(<ArticleDetails navigation={navigation} />);
        const articleDetailsWebview = articleDetailsScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLE_DETAILS_SCREEN_WEBVIEW);
        expect(articleDetailsWebview.props().renderLoading()).toBeTruthy();
    });

    it("article details error renders correctly", () => {
        expect.assertions(1);
        const articleDetailsScreen = shallow(<ArticleDetails navigation={navigation} />);
        const articleDetailsWebview = articleDetailsScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLE_DETAILS_SCREEN_WEBVIEW);
        expect(articleDetailsWebview.props().renderError()).toBeTruthy();
    });
});
