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
            <Text style={styles.title}>📄 Chính sách bảo mật</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.lastUpdated}>
                Cập nhật lần cuối: {new Date().toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔒 Cam kết bảo mật</Text>
              <Text style={styles.text}>
                MatchMind - Lật Thẻ Ghi Nhớ cam kết bảo vệ quyền riêng tư của người dùng. 
                Chính sách này giải thích cách chúng tôi xử lý thông tin khi bạn sử dụng ứng dụng.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📊 Thu thập thông tin</Text>
              <Text style={styles.text}>
                Ứng dụng MatchMind KHÔNG thu thập bất kỳ thông tin cá nhân nào, bao gồm:
              </Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Tên, email, số điện thoại</Text>
                <Text style={styles.listItem}>• Vị trí địa lý</Text>
                <Text style={styles.listItem}>• Danh bạ, ảnh, file</Text>
                <Text style={styles.listItem}>• Thông tin thiết bị</Text>
                <Text style={styles.listItem}>• Lịch sử sử dụng</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>💾 Lưu trữ dữ liệu</Text>
              <Text style={styles.text}>
                Ứng dụng chỉ lưu trữ dữ liệu game cục bộ trên thiết bị của bạn:
              </Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Điểm số cao nhất của bạn</Text>
                <Text style={styles.listItem}>• Cài đặt game (độ khó yêu thích)</Text>
                <Text style={styles.listItem}>• Thống kê game cá nhân</Text>
              </View>
              <Text style={styles.text}>
                Tất cả dữ liệu này được lưu trữ cục bộ và không được chia sẻ với bất kỳ ai.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🌐 Kết nối mạng</Text>
              <Text style={styles.text}>
                Ứng dụng MatchMind hoạt động hoàn toàn OFFLINE:
              </Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Không kết nối internet</Text>
                <Text style={styles.listItem}>• Không gửi dữ liệu đi đâu</Text>
                <Text style={styles.listItem}>• Không có quảng cáo</Text>
                <Text style={styles.listItem}>• Không có analytics</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔐 Quyền truy cập</Text>
              <Text style={styles.text}>
                Ứng dụng chỉ yêu cầu một quyền duy nhất:
              </Text>
              <View style={styles.permissionBox}>
                <Text style={styles.permissionTitle}>📳 VIBRATE</Text>
                <Text style={styles.permissionDesc}>
                  Để tạo hiệu ứng rung khi chơi game, giúp trải nghiệm sinh động hơn.
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>👶 Trẻ em</Text>
              <Text style={styles.text}>
                Ứng dụng an toàn cho trẻ em:
              </Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• Không thu thập thông tin từ trẻ em</Text>
                <Text style={styles.listItem}>• Nội dung phù hợp mọi lứa tuổi</Text>
                <Text style={styles.listItem}>• Không có tương tác với người lạ</Text>
                <Text style={styles.listItem}>• Không có mua hàng trong ứng dụng</Text>
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
