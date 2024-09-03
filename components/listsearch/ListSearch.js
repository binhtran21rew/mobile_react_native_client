// List.js
import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { RadioButton } from 'react-native-paper'; 
import {
  imageDefault,
  iamgeGroupDefault
} from "@/constants/constant"
import CheckBox from '@/components/checkbox/Checkbox';

// definition of the Item, which will be rendered in the FlatList
const ItemRadio = ({ ...props }) => (
  <View style={styles.item}>
    <View  style={[styles.image, {margin: 10}]}>
      <Image source={{uri: props.item.image !== null ? props.item.image : imageDefault}} style={styles.image}/>
    </View>
    <Text style={styles.title}>{props.item.name}</Text>


    <View style={styles.radioGroup}> 
      <RadioButton.Android 
          value={props.item.id}
          status={props.selectedValue?.id === props.item.id ?  
                  'checked' : 'unchecked'} 
          onPress={() => props.setSelectedValue(props.item)} 
          color="#007BFF"
      /> 
    </View> 
  </View>
);

const ItemCheckBox = ({...props}) => {
  const item = props.item;

  const handleCheckbox = () => {
    const findItem = props.selectedValue.findIndex(data => data.id === item.id);

    if(findItem !== -1){
      props.selectedValue.splice(findItem, 1);
      props.setSelectedValue([...props.selectedValue]);
    }else{
      props.setSelectedValue(prev => [...prev, item]);
    }
  }
  return (
      <CheckBox 
        listChecked={props.selectedValue}
        item={item}
        containerStyle={
          styles.item
        }
        onPress={handleCheckbox}
      />
  )
}

// the filter
const List = ({ checkbox = false, searchPhrase, setClicked, data, setAddUserRoom, addUserRoom}) => {
  const renderItem = ({ item }) => {

    if(checkbox) {
      if (searchPhrase === "") {
        return <ItemCheckBox item={item} selectedValue={addUserRoom} setSelectedValue={setAddUserRoom}/>;
      }
      // filter of the name
      if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <ItemCheckBox item={item} selectedValue={addUserRoom} setSelectedValue={setAddUserRoom}/>;
      }
    }else{
      // when no input, show all
      if (searchPhrase === "") {
        return <ItemRadio item={item} selectedValue={addUserRoom} setSelectedValue={setAddUserRoom}/>;
      }
      // filter of the name
      if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
        return <ItemRadio item={item} selectedValue={addUserRoom} setSelectedValue={setAddUserRoom}/>;
      }
    }
  };

  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    width: "100%",
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
    color: "white",
  },
  image:{
    width: 46, height: 46
  },
  radioGroup: { 
    flex: 1,
    position: 'absolute',
    shadowColor: '#000', 
    right: 0,
  }, 
});