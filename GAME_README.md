# 🧠 Memory Match - Lật Thẻ Ghi Nhớ

Một game trí nhớ hấp dẫn được xây dựng bằng React Native với giao diện đẹp mắt và nhiều tính năng thú vị.

## 🎮 Tính năng chính

### ✨ Gameplay
- **Lật thẻ ghi nhớ**: Lật 2 thẻ để tìm cặp giống nhau
- **3 độ khó**: Dễ (4x4), Trung bình (4x5), Khó (5x6)
- **Đếm lượt**: Theo dõi số lần đoán để tối ưu hóa điểm số
- **Đếm thời gian**: Timer theo dõi thời gian hoàn thành
- **Xáo trộn ngẫu nhiên**: Mỗi ván chơi có bố cục khác nhau

### 🏆 Hệ thống điểm số
- **Lưu kỷ lục**: Tự động lưu điểm số tốt nhất cho mỗi độ khó
- **So sánh thành tích**: Hiển thị kỷ lục cũ và mới
- **Thống kê chi tiết**: Số lượt, thời gian, hiệu quả

### 🎨 Giao diện & Trải nghiệm
- **Animations mượt mà**: Hiệu ứng lật thẻ 3D
- **Haptic feedback**: 📳 Rung phản hồi thông minh cho mọi tương tác
- **Particle effects**: Hiệu ứng hạt khi match thành công
- **Responsive design**: Tự động điều chỉnh theo kích thước màn hình
- **Gradient backgrounds**: Nền gradient đẹp mắt

### 📳 Haptic Feedback Chi tiết
- **Card Flip**: Rung nhẹ khi lật thẻ
- **Match Success**: Rung thành công khi tìm được cặp
- **Match Fail**: Rung lỗi khi không match
- **Game Complete**: Rung ăn mừng khi hoàn thành
- **Button Press**: Rung xác nhận khi nhấn nút
- **Cross-platform**: iOS (Haptic Engine) + Android (Vibration API)

## 🛠️ Công nghệ sử dụng

### Core Technologies
- **React Native 0.77.1**: Framework chính
- **TypeScript**: Type safety
- **Zustand**: State management
- **AsyncStorage**: Lưu trữ local

### UI/UX
- **React Native Reanimated**: Animations
- **React Navigation**: Navigation system
- **Custom components**: UI components tự thiết kế

### Testing
- **Jest**: Unit testing framework
- **React Test Renderer**: Component testing

## 📱 Cách chơi

1. **Chọn độ khó**: Dễ, Trung bình, hoặc Khó
2. **Bắt đầu game**: Nhấn "Bắt đầu chơi"
3. **Lật thẻ**: Chạm vào thẻ để lật mở
4. **Tìm cặp**: Lật 2 thẻ giống nhau để match
5. **Hoàn thành**: Tìm hết tất cả các cặp với ít lượt nhất

## 🎯 Mục tiêu

- Hoàn thành game với **ít lượt nhất**
- Đạt **thời gian nhanh nhất**
- Phá vỡ **kỷ lục cá nhân**
- Thử thách với **độ khó cao hơn**

## 🏗️ Cấu trúc dự án

```
src/
├── components/
│   └── game/
│       ├── Card.tsx              # Component thẻ bài
│       ├── GameBoard.tsx         # Bảng game
│       ├── GameHeader.tsx        # Header với thống kê
│       ├── DifficultySelector.tsx # Chọn độ khó
│       ├── Timer.tsx             # Đồng hồ đếm
│       └── ParticleEffect.tsx    # Hiệu ứng hạt
├── screens/
│   ├── HomeScreen.tsx            # Màn hình chính
│   ├── GameScreen.tsx            # Màn hình chơi game
│   └── GameOverScreen.tsx        # Màn hình kết thúc
├── store/
│   └── useGameStore.ts           # Zustand store
├── types/
│   └── game.types.ts             # TypeScript types
└── utils/
    ├── gameUtils.ts              # Game utilities
    ├── pureFunctions.ts          # Pure functions
    └── feedbackUtils.ts          # Haptic & sound effects
```

## 🧪 Testing

Chạy tests:
```bash
npm test
```

Test coverage bao gồm:
- ✅ Pure functions logic
- ✅ Game rules validation
- ✅ Difficulty levels configuration
- ✅ Best score logic

## 🚀 Cài đặt và chạy

1. **Clone repository**
2. **Install dependencies**: `npm install`
3. **Run Metro**: `npm start`
4. **Run on device**: `npm run android` hoặc `npm run ios`

## 🎨 Customization

### Thêm emoji mới
Chỉnh sửa `DIFFICULTY_LEVELS` trong `src/types/game.types.ts`:

```typescript
emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']
```

### Thêm độ khó mới
Thêm level mới vào `DIFFICULTY_LEVELS`:

```typescript
{
  id: 'expert',
  name: 'Chuyên gia (6x6)',
  gridSize: 36,
  pairs: 18,
  emojis: [/* 18 emojis */]
}
```

## 🎵 Tính năng tương lai

- [ ] Sound effects
- [ ] Multiplayer mode
- [ ] Daily challenges
- [ ] Achievement system
- [ ] Theme customization
- [ ] Leaderboard online

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa.

---

**Chúc bạn chơi game vui vẻ! 🎉**
