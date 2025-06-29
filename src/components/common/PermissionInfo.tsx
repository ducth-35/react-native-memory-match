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
            <Text style={styles.title}>🔐 Quyền truy cập ứng dụng</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📳 VIBRATE Permission</Text>
              <Text style={styles.description}>
                Ứng dụng yêu cầu quyền rung (VIBRATE) để tạo hiệu ứng haptic feedback 
                khi bạn chơi game.
              </Text>
              
              <View style={styles.usageList}>
                <Text style={styles.usageTitle}>Được sử dụng để:</Text>
                <Text style={styles.usageItem}>• Rung nhẹ khi lật thẻ</Text>
                <Text style={styles.usageItem}>• Rung thành công khi tìm được cặp thẻ</Text>
                <Text style={styles.usageItem}>• Rung lỗi khi không tìm được cặp</Text>
                <Text style={styles.usageItem}>• Rung ăn mừng khi hoàn thành game</Text>
                <Text style={styles.usageItem}>• Rung xác nhận khi nhấn nút</Text>
              </View>

              <View style={styles.noteBox}>
                <Text style={styles.noteTitle}>📝 Lưu ý:</Text>
                <Text style={styles.noteText}>
                  • Bạn có thể tắt rung trong cài đặt thiết bị{'\n'}• Quyền này không thu thập dữ liệu cá nhân{'\n'}• Chỉ tạo hiệu ứng rung, không truy cập thông tin khác
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔒 Quyền riêng tư</Text>
              <Text style={styles.description}>
                Ứng dụng Memory Match cam kết bảo vệ quyền riêng tư của bạn:
              </Text>
              
              <View style={styles.privacyList}>
                <Text style={styles.privacyItem}>✅ Không thu thập thông tin cá nhân</Text>
                <Text style={styles.privacyItem}>✅ Không kết nối internet</Text>
                <Text style={styles.privacyItem}>✅ Không theo dõi hành vi người dùng</Text>
                <Text style={styles.privacyItem}>✅ Không chia sẻ dữ liệu với bên thứ ba</Text>
                <Text style={styles.privacyItem}>✅ Dữ liệu game chỉ lưu trên thiết bị</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>⚙️ Cài đặt</Text>
              <Text style={styles.description}>
                Để quản lý quyền rung:
              </Text>
              
              <View style={styles.settingsList}>
                <Text style={styles.settingsItem}>
                  1. Vào Cài đặt → Ứng dụng → Memory Match
                </Text>
                <Text style={styles.settingsItem}>
                  2. Chọn "Quyền" hoặc "Permissions"
                </Text>
                <Text style={styles.settingsItem}>
                  3. Bật/tắt quyền "Rung" theo ý muốn
                </Text>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>Đã hiểu</Text>
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
