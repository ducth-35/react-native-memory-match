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
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Về ứng dụng</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.appTitle}>🧠 Memory Match</Text>
          <Text style={styles.appSubtitle}>Lật Thẻ Ghi Nhớ</Text>
          <Text style={styles.version}>Phiên bản 1.0.0</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Mô tả</Text>
          <Text style={styles.description}>
            Memory Match là game trí nhớ cổ điển giúp rèn luyện khả năng ghi nhớ và tập trung. 
            Game hoàn toàn miễn phí, không có quảng cáo và hoạt động offline.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Tính năng</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>🎮 Game lật thẻ ghi nhớ cổ điển</Text>
            <Text style={styles.featureItem}>🎯 3 mức độ khó: Dễ, Trung bình, Khó</Text>
            <Text style={styles.featureItem}>📊 Theo dõi số lượt và thời gian</Text>
            <Text style={styles.featureItem}>🏆 Lưu kỷ lục cá nhân</Text>
            <Text style={styles.featureItem}>🎨 Giao diện đẹp mắt với animations</Text>
            <Text style={styles.featureItem}>📳 Haptic feedback sống động</Text>
            <Text style={styles.featureItem}>🔒 Hoàn toàn offline</Text>
            <Text style={styles.featureItem}>🚫 Không quảng cáo</Text>
            <Text style={styles.featureItem}>💯 Miễn phí 100%</Text>
          </View>
        </View>

        {/* How to Play */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Cách chơi</Text>
          <View style={styles.instructionList}>
            <Text style={styles.instructionItem}>1. Chọn mức độ khó phù hợp</Text>
            <Text style={styles.instructionItem}>2. Nhấn "Bắt đầu chơi"</Text>
            <Text style={styles.instructionItem}>3. Lật 2 thẻ để tìm cặp giống nhau</Text>
            <Text style={styles.instructionItem}>4. Ghi nhớ vị trí các thẻ đã lật</Text>
            <Text style={styles.instructionItem}>5. Hoàn thành với ít lượt nhất</Text>
          </View>
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔒 Quyền riêng tư</Text>
          <Text style={styles.privacyText}>
            Ứng dụng này không thu thập, lưu trữ hoặc chia sẻ bất kỳ thông tin cá nhân nào. 
            Tất cả dữ liệu game được lưu trữ cục bộ trên thiết bị của bạn.
          </Text>
          <TouchableOpacity style={styles.privacyButton} onPress={openPrivacyPolicy}>
            <Text style={styles.privacyButtonText}>📄 Xem chính sách bảo mật</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openPermissionInfo}>
            <Text>🔐 Thông tin quyền truy cập</Text>
          </TouchableOpacity>
        </View>

        {/* Permissions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔐 Quyền truy cập</Text>
          <View style={styles.permissionItem}>
            <Text style={styles.permissionName}>📳 VIBRATE</Text>
            <Text style={styles.permissionDescription}>
              Cần thiết để tạo hiệu ứng rung (haptic feedback) khi chơi game, 
              giúp trải nghiệm game sinh động hơn.
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
