/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import {saveWeight, weights, deleteAll, delById, update} from '../data/helper';
import EnhancedWeight from './Weight';


const Home = ({navigation}) => {
  const [data, setData] = useState({
    note: '',
    weight: null,
  });

  const [weightsData, setWeightsData] = useState<any>([]);

  const changeHandler = (name, value) => {
    setData({...data, [name]: value});
  };

  const saveData = async () => {
    try {
      await saveWeight(data);
    } catch (err) {
      console.error(err);
    }
  };

  const viewData = async () => {
    try {
      const weightsCollection = await weights.query().fetch();
      setWeightsData(weightsCollection);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAllw = async () => {
    await deleteAll();
  };
const delW = async (id)=>{
await delById(id);
};

const updateW = async (id)=> {
 await update(id);
};
  useEffect(() => {
    // Call viewData when component mounts to load initial data
    viewData();
  }, []);

  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {weightsData.map((weight, index) => (
        <View key={weight.id}>
          {/* <Text>{weight.id} {weight.note} {weight.weight}</Text> */}
          <EnhancedWeight weight={weight} handleSdel={() => delW(weight.id)} handleUpdate={()=> updateW(weight.id)}/>
        </View>
        ))}
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
      <View style={styles.button}>
        <Button title="Delete all data" onPress={deleteAllw} />
      </View>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Notification')}
      />
      </ScrollView>
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
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default Home;
