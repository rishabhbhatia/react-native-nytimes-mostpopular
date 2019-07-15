import React from "react";
import {
  SafeAreaView, View, FlatList, Alert, ActivityIndicator,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import ArticleItem from "./item/ArticleItem";

import styles from "./styles";
import { TEST_ID_ARTICLES_SCREEN_LIST } from "../../../utils/constants/testIds";

/* -------------------------------------------------------------------------- */
/*                 Screen to display list of popular articles                 */
/* -------------------------------------------------------------------------- */
export default class ArticlesScreen extends React.Component {
  /* ------------------------ custom header properties ------------------------ */
  static navigationOptions = {
    title: "NY Times Most Popular",
    headerStyle: {
      backgroundColor: "#47e4c2",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerLeft: (
      <Icon style={styles.icon} name="bars" size={20} color="#fff" />
    ),
    headerRight: (
      <View style={styles.headerRightContainer}>
        <Icon style={styles.icon} name="search" size={20} color="#fff" />
        <Icon style={styles.icon} name="ellipsis-v" size={20} color="#fff" />
      </View>
    ),
    headerBackTitle: null,
    headerTruncatedBackTitle: null,
  };

  state = {
    articles: [],
    totalArticlesCount: 0,
    showFooter: false,
  };

  /* ------------- once component is loaded fetch list of articles ------------ */
  componentDidMount() {
    this.fetchArticles();
  }

  /* ----------- load most popular articles and push them into state ---------- */
  fetchArticles = () => fetch("https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=K3HkXGaTBgZfXIb1COHeJkM5RvWjurlo")
    .then(response => response.json())
    .then((responseJson) => {
      const { results: articles, num_results: totalArticlesCount } = responseJson;
      this.setState({ articles, totalArticlesCount });
      return responseJson;
    })
    .catch(() => {
      Alert.alert("Something went wrong, try again later");
    })

  /* ------------------ when user clicks on any article cell ------------------ */
  onArticleSelected = (article) => {
    const { navigation } = this.props;
    const { url: articleUrl } = article;
    navigation.navigate("ArticleDetails", {
      articleUrl,
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                   pagination to load next set of articles                  */
  /* -------------------------------------------------------------------------- */
  // eslint-disable-next-line consistent-return
  loadMoreArticles = () => {
    const { articles, totalArticlesCount } = this.state;

    /* ----------------- if more articles exist in our database; ---------------- */
    /* -------------- load them and add to current set of articles -------------- */
    if (articles.length < totalArticlesCount) {
      this.setState({
        showFooter: true,
      });

      /* istanbul ignore next */
      return fetch(`https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=K3HkXGaTBgZfXIb1COHeJkM5RvWjurlo&offset=${articles.length}`)
        .then(response => response.json())
        .then((responseJson) => {
          const { results: nextArticles, num_results: nextTotalArticlesCount } = responseJson;
          this.setState({
            articles: [...articles, ...nextArticles],
            totalArticlesCount: nextTotalArticlesCount,
            showFooter: false,
          });
          return responseJson;
        })
        .catch(() => {
          this.setState({
            showFooter: false,
          }, () => {
            Alert.alert("Something went wrong, try again later");
          });
        });
    }
  }

  /* ----------- article id defines each unique element in the list ----------- */
  keyExtractor = item => `${item.id}`;

  renderFooter = () => {
    const { showFooter } = this.state;
    if (showFooter) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" />
        </View>
      );
    }
    return null;
  }


  renderEmptyComponent = (
    <View style={styles.emptyComponentContainer}>
      <ActivityIndicator size="large" />
    </View>
  );

  /* ------------------ adding a seperator between each cell ------------------ */
  renderArticlesItemSeperator = () => <View style={styles.articleItemSeperatorContainer} />

  /* ------------------------- renders an article cell ------------------------ */
  renderArticleItem = ({ item: article }) => {
    const props = {
      article,
      onPress: () => this.onArticleSelected(article),
    };
    return ArticleItem(props);
  };

  render() {
    const { articles } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          testID={TEST_ID_ARTICLES_SCREEN_LIST}
          keyExtractor={this.keyExtractor}
          data={articles}
          showsVerticalScrollIndicator={false}
          onEndReached={this.loadMoreArticles}
          contentContainerStyle={styles.articlesListContainer}
          renderItem={this.renderArticleItem}
          ItemSeparatorComponent={this.renderArticlesItemSeperator}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmptyComponent}
        />
      </SafeAreaView>
    );
  }
}
