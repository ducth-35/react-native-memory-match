import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface PermissionInfoProps {
  visible: boolean;
  onClose: () => void;
}

const PermissionInfo: React.FC<PermissionInfoProps> = ({ visible, onClose }) => {
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
            <Text style={styles.title}>🔐 App Permissions</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📳 VIBRATE Permission</Text>
              <Text style={styles.description}>
                The app requires vibration permission (VIBRATE) to create haptic feedback
                when you play the game.
              </Text>

              <View style={styles.usageList}>
                <Text style={styles.usageTitle}>Used for:</Text>
                <Text style={styles.usageItem}>• Light vibration when flipping cards</Text>
                <Text style={styles.usageItem}>• Success vibration when finding matching pairs</Text>
                <Text style={styles.usageItem}>• Error vibration when no match found</Text>
                <Text style={styles.usageItem}>• Celebration vibration when completing game</Text>
                <Text style={styles.usageItem}>• Confirmation vibration when pressing buttons</Text>
              </View>

              <View style={styles.noteBox}>
                <Text style={styles.noteTitle}>📝 Note:</Text>
                <Text style={styles.noteText}>
                  • You can turn off vibration in device settings{'\n'}• This permission does not collect personal data{'\n'}• Only creates vibration effect, does not access other information
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔒 Privacy</Text>
              <Text style={styles.description}>
                MatchMind app is committed to protecting your privacy:
              </Text>

              <View style={styles.privacyList}>
                <Text style={styles.privacyItem}>✅ Does not collect personal information</Text>
                <Text style={styles.privacyItem}>✅ No internet connection</Text>
                <Text style={styles.privacyItem}>✅ Does not track user behavior</Text>
                <Text style={styles.privacyItem}>✅ Does not share data with third parties</Text>
                <Text style={styles.privacyItem}>✅ Game data only stored on device</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⚙️ Settings</Text>
              <Text style={styles.description}>
                To manage vibration permission:
              </Text>

              <View style={styles.settingsList}>
                <Text style={styles.settingsItem}>
                  1. Go to Settings → Apps → MatchMind
                </Text>
                <Text style={styles.settingsItem}>
                  2. Select "Permissions"
                </Text>
                <Text style={styles.settingsItem}>
                  3. Enable/disable "Vibration" as desired
                </Text>
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
    maxHeight: '80%',
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
    maxHeight: 400,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4A5568',
    marginBottom: 16,
  },
  usageList: {
    marginBottom: 16,
  },
  usageTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  usageItem: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4A5568',
    marginBottom: 4,
  },
  noteBox: {
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F56565',
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C53030',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#742A2A',
  },
  privacyList: {
    gap: 6,
  },
  privacyItem: {
    fontSize: 14,
    lineHeight: 20,
    color: '#38A169',
    fontWeight: '500',
  },
  settingsList: {
    gap: 8,
  },
  settingsItem: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4A5568',
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

export default PermissionInfo;
