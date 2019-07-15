import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  itemIndicatorContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#969696",
    alignSelf: "center",
  },
  descriptionContainer: {
    flex: 0.6,
    justifyContent: "center",
  },
  title: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  byline: {
    textAlign: "left",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 10,
    color: "#9e9e9e",
  },
  publishedDate: {
    textAlign: "right",
    fontSize: 10,
    fontWeight: "400",
    marginLeft: 5,
    color: "#9e9e9e",
  },
  detailIndicatorContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 2,
  },
});

export default styles;
