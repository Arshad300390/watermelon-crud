/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, TextInput, View, Text} from 'react-native';
import {observeWeights, saveWeight, LastWeights, weights} from '../data/helper';

const Home = ({navigation}) => {
  const [data, setData] = useState({
    note: '',
    weight: null,
  });

  const [weightData, setWeightData] = useState([]);

  const changeHandler = (name, value) => {
    setData({...data, [name]: value});
    console.log(data);
  };

  const saveData = async () => {
    try {
      await saveWeight(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const viewData = async () => {
    try {
      (await LastWeights).map(weights => {
        setWeightData(weights); // Set weight data to state
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Call viewData when component mounts to load initial data
    viewData();
  }, []);

  return (
    <>
      <View>
      {weightData.length > 0 ? (
    weightData.map((weight, index) => (
      <Text key={index}>{JSON.stringify(weight)}</Text>
    ))
  ) : (
    <Text>No data available</Text>
  )}
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => changeHandler('note', text)} // Pass 'note' as the name
        value={data.note}
        placeholder="type string"
      />
      <TextInput
        style={styles.input}
        onChangeText={number => changeHandler('weight', parseFloat(number))} // Pass 'weight' as the name
        value={data.weight ? data.weight.toString() : ''}
        placeholder="type number"
        keyboardType="numeric"
      />
      <View style={styles.button}>
        <Button title="save data" onPress={saveData} />
      </View>
      <View style={styles.button}>
        <Button title="view data" onPress={viewData} />
      </View>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Notification')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
  button: {
    marginBottom: 20, // Set the desired bottom margin value
  },
});

export default Home;
