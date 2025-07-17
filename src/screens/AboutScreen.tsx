import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import PrivacyPolicy from '../components/common/PrivacyPolicy';
import PermissionInfo from '../components/common/PermissionInfo';

interface AboutScreenProps {
  navigation: any;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showPermissionInfo, setShowPermissionInfo] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const openPrivacyPolicy = () => {
    setShowPrivacyPolicy(true);
  };

  const openPermissionInfo = () => {
    setShowPermissionInfo(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About App</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.appTitle}>🧠 MatchMind</Text>
          <Text style={styles.appSubtitle}>Memory Card Game</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Description</Text>
          <Text style={styles.description}>
            MatchMind is a classic memory game that helps train your memory and concentration skills.
            The game is completely free, ad-free and works offline.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>🎮 Classic memory card game</Text>
            <Text style={styles.featureItem}>🎯 3 difficulty levels: Easy, Medium, Hard</Text>
            <Text style={styles.featureItem}>📊 Track moves and time</Text>
            <Text style={styles.featureItem}>🏆 Save personal records</Text>
            <Text style={styles.featureItem}>🎨 Beautiful interface with animations</Text>
            <Text style={styles.featureItem}>📳 Vibrant haptic feedback</Text>
            <Text style={styles.featureItem}>🔒 Completely offline</Text>
            <Text style={styles.featureItem}>🚫 No ads</Text>
            <Text style={styles.featureItem}>💯 100% free</Text>
          </View>
        </View>

        {/* How to Play */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 How to Play</Text>
          <View style={styles.instructionList}>
            <Text style={styles.instructionItem}>1. Choose appropriate difficulty level</Text>
            <Text style={styles.instructionItem}>2. Tap "Start Game"</Text>
            <Text style={styles.instructionItem}>3. Flip 2 cards to find matching pairs</Text>
            <Text style={styles.instructionItem}>4. Remember positions of flipped cards</Text>
            <Text style={styles.instructionItem}>5. Complete with fewest moves</Text>
          </View>
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔒 Privacy</Text>
          <Text style={styles.privacyText}>
            This app does not collect, store or share any personal information.
            All game data is stored locally on your device.
          </Text>
          <TouchableOpacity style={styles.privacyButton} onPress={openPrivacyPolicy}>
            <Text style={styles.privacyButtonText}>📄 View Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openPermissionInfo}>
            <Text>🔐 Permission Information</Text>
          </TouchableOpacity>
        </View>

        {/* Permissions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔐 Permissions</Text>
          <View style={styles.permissionItem}>
            <Text style={styles.permissionName}>📳 VIBRATE</Text>
            <Text style={styles.permissionDescription}>
              Required to create vibration effects (haptic feedback) when playing the game,
              making the gaming experience more immersive.
            </Text>
          </View>
        </View>

        {/* Footer */}
      </ScrollView>

      {/* Modals */}
      <PrivacyPolicy
        visible={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
      />
      <PermissionInfo
        visible={showPermissionInfo}
        onClose={() => setShowPermissionInfo(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    elevation: 2,
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  placeholder: {
    width: 80,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2D3748',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#718096',
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    textAlign: 'center',
    color: '#A0AEC0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A5568',
  },
  featureList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4A5568',
  },
  instructionList: {
    gap: 8,
  },
  instructionItem: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4A5568',
  },
  privacyText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4A5568',
    marginBottom: 12,
  },
  privacyButton: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  privacyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
  },
  permissionItem: {
    marginBottom: 12,
  },
  permissionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#718096',
  },
  techInfo: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4A5568',
    marginBottom: 4,
  },
  contactText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4A5568',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 8,
  },
  copyright: {
    fontSize: 12,
    color: '#A0AEC0',
  },
});

export default AboutScreen;
