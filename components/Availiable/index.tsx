import { View, StyleSheet, Text } from "react-native";
import StationIcon from "../icons/Station";

export default function Availiable(props) {
  return (
    <View style={styles.wrap}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StationIcon color="#008000" />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Text style={styles.text}>Austion Hospital Car Park</Text>
        <Text style={styles.text}>Type 2</Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={[
            styles.text,
            {
              backgroundColor: "#007AFF",
              color: "#fff",
              textAlign: "center",
            },
          ]}
        >
          9.0 EVAT Score
        </Text>
        <Text style={styles.text}>4 out 4 Available</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    backgroundColor: "#fff",
    height: 100,
    display: "flex",
    flexDirection: "row",
    borderRadius: 8,
    padding: 8,
  },
  text: {
    fontSize: 16,
    color: "#007AFF",
  },
});
