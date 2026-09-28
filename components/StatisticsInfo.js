import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import InfoCard from "./InfoCard";

function StatisticsInfo() {
  const words = useSelector((state) => state.wordsLearning.words);
  const colors = useSelector((state) => state.theme.colors);
  const toLearn = words.filter((word) => word.status === 0).length;
  const inProcess = words.filter((word) => word.status === 1).length;
  const learned = words.filter((word) => word.status === 2).length;

  return (
    <View style={styles.container}>
      <InfoCard
        caption={"To learn"}
        number={toLearn}
        color={colors.secondary800}
      />

      <InfoCard
        caption={"In process"}
        number={inProcess}
        color={colors.primary900}
      />

      <InfoCard
        caption={"Learned"}
        number={learned}
        color={colors.primary300}
      />
    </View>
  );
}

export default StatisticsInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "20%",
  },
});
