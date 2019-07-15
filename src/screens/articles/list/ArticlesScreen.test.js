import React from "react";
import { shallow } from "enzyme";
import fetchMock from 'fetch-mock';

import ArticlesScreen from "./ArticlesScreen";
import { TEST_ID_ARTICLES_SCREEN_LIST } from "../../../utils/constants/testIds";

const navigation = { navigate: () => { } };

const articlesJson = require('../../../../assets/articles.json');
const articles = articlesJson.results;

/* -------------------------------------------------------------------------- */
/*                                  UI Tests                                  */
/* -------------------------------------------------------------------------- */
describe("ArticlesScreen", () => {
  /* -------------------------------- snapshot -------------------------------- */
  it("matches snapshot", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen />);
    expect(articlesScreen).toMatchSnapshot();
  });

  /* ----------------------------- articles list ----------------------------- */
  it("articles list is visible", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen />);
    const articlesList = articlesScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLES_SCREEN_LIST);
    expect(articlesList.exists()).toBeTruthy();
  });

  it("article list key extractor sets unique key", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen navigation={navigation} />);
    const articlesList = articlesScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLES_SCREEN_LIST);
    expect(articlesList.props().keyExtractor(articles[0])).toBeTruthy();
  });

  it("article list onEndReached exists", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen navigation={navigation} />);
    const articlesList = articlesScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLES_SCREEN_LIST);
    articlesList.props().onEndReached();
    expect(articlesList.props().onEndReached).toBeInstanceOf(Function);
  });

  it("article list onEndReached works with empty articles and total articles count in state", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen navigation={navigation} />);

    articlesScreen.setState({
      articles: [],
      totalArticlesCount: 20
    }, () => {
      articlesScreen.update()
      const articlesList = articlesScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLES_SCREEN_LIST);
      articlesList.props().onEndReached();
      expect(articlesList.props().onEndReached).toBeInstanceOf(Function);
    });
  });

  it("article list render item renders with empty article value as expected", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen navigation={navigation} />);
    const articlesList = articlesScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLES_SCREEN_LIST);
    expect(articlesList.props().renderItem({})).toMatchSnapshot();
  });

  it("article list render item renders with valid article value as expected", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen navigation={navigation} />);
    const articlesList = articlesScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLES_SCREEN_LIST);
    expect(articlesList.props().renderItem({ item: articles[0] })).toMatchSnapshot();
  });

  it("article list render item on press exists", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen navigation={navigation} />);
    const articlesList = articlesScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLES_SCREEN_LIST);
    articlesList.props().renderItem({ item: articles[0] }).props.onPress();
    expect(articlesList.props().renderItem({ item: articles[0] }).props.onPress).toBeInstanceOf(Function);
  });

  it("article list item seperator component renders as expected", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen navigation={navigation} />);
    const articlesList = articlesScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLES_SCREEN_LIST);
    expect(articlesList.props().ItemSeparatorComponent()).toMatchSnapshot();
  });

  it("article list footer component renders with showFooter true as expected", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen navigation={navigation} />);

    articlesScreen.setState({
      showFooter: true
    }, () => {
      articlesScreen.update();
      const articlesList = articlesScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLES_SCREEN_LIST);
      expect(articlesList.props().ListFooterComponent()).toMatchSnapshot();
    });
  });

  it("article list footer component renders with showFooter false as expected", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen navigation={navigation} />);

    articlesScreen.setState({
      showFooter: false
    }, () => {
      articlesScreen.update();
      const articlesList = articlesScreen.findWhere(node => node.props().testID === TEST_ID_ARTICLES_SCREEN_LIST);
      expect(articlesList.props().ListFooterComponent()).toMatchSnapshot();
    });
  });

  it("article screen state updates as expected", () => {
    expect.assertions(1);
    const articlesScreen = shallow(<ArticlesScreen navigation={navigation} />);
    articlesScreen.setState({
      articles
    }, () => {
      articlesScreen.update();
      expect(articlesScreen.state('articles')).toEqual(articles);
    });
  });

  it("fetch article api loads the data", (done) => {
    const articlesScreen = shallow(<ArticlesScreen navigation={navigation} />);
    fetchMock.get('*', articlesJson)
    articlesScreen.instance().fetchArticles().then(res => {
      expect(res).toEqual(articlesJson);
      done();
    })
    fetchMock.reset();
  });
});
