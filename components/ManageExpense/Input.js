import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Input({label,style, textInputConfig,invalid }) {
  return (
    <View style={[styles.container,style]}>
      <Text style={[styles.textLabel, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          textInputConfig.multiline && styles.inputMultiline, invalid && styles.invalidInput
        ]}
        {...textInputConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  textLabel: {
    color: GlobalStyles.colors.primary100,
    fontSize: 12,
    marginBottom: 4,
  },
  invalidLabel:{
    color:GlobalStyles.colors.error500
  },
  invalidInput:{
    backgroundColor:GlobalStyles.colors.error50,
    borderColor:GlobalStyles.colors.error500,
    borderWidth:2
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
