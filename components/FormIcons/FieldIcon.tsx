import { ColorValue, GestureResponderEvent, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';

type TNameFieldIcon = {
  iconName: string;
  iconSize: number;
  iconColor: number | ColorValue | undefined;
  onPressHandler?: (event: GestureResponderEvent) => void;
}

const FieldIcon: React.FC<TNameFieldIcon> = ({iconName, iconColor, iconSize, onPressHandler}) => (
  <Icon name={iconName} type="ionicon" color={iconColor} size={iconSize} style={styles.icon} onPress={onPressHandler} />
);

export default FieldIcon;

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});
