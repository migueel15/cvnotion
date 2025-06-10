import colors from "@/colors";
import { Picker } from "@react-native-picker/picker";

type OptionItem = {
  label: string;
  value: string;
};

interface DropDownProps {
  data: OptionItem[];
  onChange: (value: OptionItem) => void;
  placeholder?: string;
}

export default function Dropdown({
  data,
  onChange,
  placeholder,
}: DropDownProps) {
  return (
    <Picker
      mode="dropdown"
      onValueChange={onChange}
      style={{
        backgroundColor: colors.gray,
        color: colors.white,
      }}
    >
      <Picker.Item label={placeholder || "Select an option"} value="" />
      {data.map((item) => (
        <Picker.Item
          key={item.value}
          label={item.label}
          value={{ label: item.label, value: item.value }}
        />
      ))}
    </Picker>
  );
}
