import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from './styles'; 

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer: {
      alignItems: 'center', 
      
    },
    headerTitle: {
      color: "black",
      fontSize: 20,
      padding: 60,
      borderRadius: 5,
      textAlign: 'center',
      
    },
  
  });

export default Header;
