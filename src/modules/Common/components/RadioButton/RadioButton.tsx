// RadioButton.js
import React from 'react';
import { View, Text, Pressable, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';

type Props = {
    options: Record<string,string>,
    selectedOption:string,
    onSelect:(option:string)=>void,
    containerStyle?:StyleProp<ViewStyle>,
    radioContainerStyle?:StyleProp<ViewStyle>
}

const RadioButton = ({ options, selectedOption, onSelect, containerStyle, radioContainerStyle }:Props) => {
  return (
    <View style={containerStyle}>
    {Object.keys(options).map((option) => (
      <Pressable key={option} onPress={() => onSelect(option)} style={[styles.container, radioContainerStyle]}>
        <View style={styles.outerCircle}>
          {selectedOption === option && <View style={styles.innerCircle} />}
        </View>
        <Text style={[styles.label]}>{option}</Text>
      </Pressable>
    ))}
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  label: {
    textTransform: 'capitalize',
  },
});

export default RadioButton;
