import React, { useState, useEffect } from "react";
import { Text, View, Button, Image, Center } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import axios from "axios";

export default function NasaInfo() {
  const [data, setData] = useState([]);

  const myAPI = process.env.EXPO_PUBLIC_API;
  const year = '2023';
  const month = '01';
  const day = '01';

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const url = `https://api.nasa.gov/EPIC/api/natural/date/${year}-${month}-${day}?&api_key=${myAPI}`;

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        console.clear();
        console.log(response);
        setData(response.data);
      }).catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <View style={styles.container}>
      {data && data.map((a, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.text}>Image #{index + 1}</Text>
          <Text style={styles.text}>{a.caption.toUpperCase()}</Text>
          <Text style={styles.text}>Date: {monthNames[Number(a.date.slice(5, 7)) - 1]} {Number(a.date.slice(8, 10))}, {Number(a.date.slice(0, 4))}</Text>
          <Image source={{ uri: `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${a.image}.png` }} style={styles.image} />
          <View style={styles.oc}>
            <Text style={styles.text}>Coordinates:</Text>
            <Text style={styles.text}>x: {a.centroid_coordinates.lat.toFixed(2)} y: {a.centroid_coordinates.lon.toFixed(2)}</Text>
          </View>

        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 10,
  },
  item: {
    backgroundColor: 'black',
    marginVertical: 10,
  },
  text: {
    color: 'white',
    textAlign: 'left',
  },
  image: {
    width: 200,
    height: 200,
  },
  oc:{
    width:1000,
    height:50,
    backgroundColor: 'orange'
  }
});
