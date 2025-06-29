import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const TextErrorTest: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text Error Test</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Text</Text>
        <Text>This is basic text</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text with Variables</Text>
        <Text>Number: {123}</Text>
        <Text>Boolean: {true ? 'Yes' : 'No'}</Text>
        <Text>String: {'Hello World'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text with Newlines</Text>
        <Text>Line 1{'\n'}Line 2{'\n'}Line 3</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Text with Emojis</Text>
        <Text>🎮 Game</Text>
        <Text>📱 Mobile</Text>
        <Text>🎯 Target</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conditional Text</Text>
        {true && <Text>This should show</Text>}
        {false && <Text>This should not show</Text>}
        {true ? <Text>Conditional true</Text> : <Text>Conditional false</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Array Map Text</Text>
        {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Complex Text</Text>
        <Text>
          This is a complex text with {'\n'}
          multiple lines and {123} numbers and {'\n'}
          emojis 🎮 and variables.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
});

export default TextErrorTest;
