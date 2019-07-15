import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(250, 250, 250)",
  },
  articlesListContainer: {
    paddingVertical: 15,
  },
  articleItemSeperatorContainer: {
    marginTop: 15,
  },
  icon: {
    paddingHorizontal: 10,
  },
  headerRightContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  footer: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyComponentContainer: {
    flex: 1,
  },
});

export default styles;
