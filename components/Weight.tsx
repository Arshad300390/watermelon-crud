/* eslint-disable react/react-in-jsx-scope */
import {withObservables} from '@nozbe/watermelondb/react';

import {ComponentType} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const Weight = ({weight, handleSdel, handleUpdate}) => (
  <View>
    <Text style={styles.container}>
      {weight.id} {weight.note} {weight.weight}
    </Text>
    <View style={styles.buttonContainer}>
      <View style={styles.button}>
        <Button title="del data" onPress={handleSdel} />
      </View>
      <View style={styles.button}>
        <Button title="update data" onPress={handleUpdate} />
      </View>
    </View>
  </View>
);
const enhance = withObservables(['weight'], ({weight}) => ({
  weight,
}));
const EnhancedWeight: ComponentType<any> = enhance(Weight);
export default EnhancedWeight;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
  },
  button:{
    marginHorizontal: 10,
  },
});
