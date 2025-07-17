import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface PrivacyPolicyProps {
  visible: boolean;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>📄 Privacy Policy</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.lastUpdated}>
                Last updated: {new Date().toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔒 Privacy Commitment</Text>
              <Text style={styles.text}>
                MatchMind - Memory Card Game is committed to protecting user privacy.
                This policy explains how we handle information when you use the app.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📊 Information Collection</Text>
              <Text style={styles.text}>
                MatchMind app does NOT collect any personal information, including:
              </Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Name, email, phone number</Text>
                <Text style={styles.listItem}>• Geographic location</Text>
                <Text style={styles.listItem}>• Contacts, photos, files</Text>
                <Text style={styles.listItem}>• Device information</Text>
                <Text style={styles.listItem}>• Usage history</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💾 Data Storage</Text>
              <Text style={styles.text}>
                The app only stores game data locally on your device:
              </Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Your highest scores</Text>
                <Text style={styles.listItem}>• Game settings (favorite difficulty)</Text>
                <Text style={styles.listItem}>• Personal game statistics</Text>
              </View>
              <Text style={styles.text}>
                All this data is stored locally and is not shared with anyone.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🌐 Network Connection</Text>
              <Text style={styles.text}>
                MatchMind app works completely OFFLINE:
              </Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• No internet connection</Text>
                <Text style={styles.listItem}>• No data sent anywhere</Text>
                <Text style={styles.listItem}>• No advertisements</Text>
                <Text style={styles.listItem}>• No analytics</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔐 Permissions</Text>
              <Text style={styles.text}>
                The app only requires one single permission:
              </Text>
              <View style={styles.permissionBox}>
                <Text style={styles.permissionTitle}>📳 VIBRATE</Text>
                <Text style={styles.permissionDesc}>
                  To create vibration effects when playing the game, making the experience more immersive.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👶 Children</Text>
              <Text style={styles.text}>
                The app is safe for children:
              </Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Does not collect information from children</Text>
                <Text style={styles.listItem}>• Content suitable for all ages</Text>
                <Text style={styles.listItem}>• No interaction with strangers</Text>
                <Text style={styles.listItem}>• No in-app purchases</Text>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxHeight: '85%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: 'bold',
  },
  content: {
    maxHeight: 450,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#A0AEC0',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4A5568',
    marginBottom: 12,
  },
  list: {
    marginLeft: 8,
    marginBottom: 12,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4A5568',
    marginBottom: 4,
  },
  permissionBox: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4299E1',
  },
  permissionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  permissionDesc: {
    fontSize: 13,
    lineHeight: 18,
    color: '#4A5568',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#4A5568',
    fontStyle: 'italic',
  },
  okButton: {
    backgroundColor: '#4299E1',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    margin: 20,
    alignItems: 'center',
  },
  okButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default PrivacyPolicy;
