import { Text, View, TextInput as Input, StyleProp, TextStyle, TextInputProps, ViewStyle } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'
import { onPrimarySurfaceDimText } from '../../../../utils/Colors';

interface Props extends TextInputProps {
  label: string;
  placeholder?: string;
  errorText?: string;
  errorTextStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  value: string;
  onChangeText: (text: string) => undefined
}

const TextInput = ({
  label,
  placeholder,
  errorText,
  errorTextStyle,
  labelStyle,
  containerStyle,
  value,
  onChangeText,
  ...props
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{marginBottom:-10}}>
        <Text style={[{fontWeight:'700', color:'black', fontSize:16},labelStyle]}>{label}</Text>
      </View>
      <View style={{marginTop:20}}>
        <Input
          placeholder={placeholder}
          placeholderTextColor={onPrimarySurfaceDimText}
          value={value}
          onChangeText={onChangeText}
          style={{borderWidth:0.4,borderRadius:10, paddingLeft:10,color:'black'}}
          {...props}
        />
      </View>

      {errorText ?
      <View style={{marginTop:5}}>
      <Text style={[{color:'red'},errorTextStyle]}>{errorText}</Text>
      </View>
      : null}
    </View>
  )
}

// export default memo(TextInput);
export default TextInput
