export const ERROR_MESSAGES: Record<number, string> = {
  // ===== SYSTEM =====
  9999: "Lỗi không xác định. Vui lòng thử lại sau.",
  1000: "Khoá không hợp lệ.",
  1028: "Lỗi hệ thống (Redis). Vui lòng thử lại sau.",

  // ===== AUTH =====
  1001: "Vui lòng đăng nhập để tiếp tục.",
  1002: "Bạn không có quyền truy cập.",
  1003: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  1004: "Token không hợp lệ hoặc đã bị thu hồi.",
  1005: "Vai trò của bạn không được phép thực hiện hành động này.",

  // ===== USER =====
  1100: "Người dùng đã tồn tại.",
  1101: "Người dùng không tồn tại.",
  1102: "Tên người dùng không hợp lệ.",
  1103: "Mật khẩu không hợp lệ.",
  1104: "Email hoặc mật khẩu không đúng.",
  1105: "Mật khẩu hiện tại không chính xác.",
  1106: "Mật khẩu xác nhận không khớp.",

  // ===== PROFILE =====
  1200: "Hồ sơ đã tồn tại.",
  1201: "Hồ sơ không tồn tại.",

  // ===== ADDRESS =====
  1300: "Không tìm thấy địa chỉ.",
  1301: "Địa chỉ đã tồn tại.",

  // ===== PRODUCT =====
  1400: "Không tìm thấy sản phẩm.",
  1401: "Sản phẩm đã hết hàng.",
  1402: "Số lượng sản phẩm không đủ.",
  1403: "Sản phẩm đang thuộc đơn hàng nên không thể xóa.",

  // ===== CATEGORY =====
  1500: "Không tìm thấy danh mục.",
  1501: "Danh mục đã tồn tại.",

  // ===== PAYMENT =====
  1600: "Phương thức thanh toán đã tồn tại.",
  1601: "Không tìm thấy phương thức thanh toán.",
  1602: "Phương thức thanh toán không được hỗ trợ.",

  // ===== CART =====
  1700: "Không tìm thấy giỏ hàng.",
  1701: "Giỏ hàng đã tồn tại.",
  1702: "Không tìm thấy sản phẩm trong giỏ.",
  1703: "Sản phẩm đã tồn tại trong giỏ.",
  1704: "Giỏ hàng không hợp lệ.",

  // ===== ORDER =====
  1800: "Đơn hàng đã tồn tại.",
  1801: "Không tìm thấy đơn hàng.",
  1802: "Không tìm thấy sản phẩm trong đơn hàng.",
  1803: "Sản phẩm đã tồn tại trong đơn hàng.",
  1804: "Không thể hủy đơn đã vận chuyển hoặc giao thành công.",
  1805: "Đơn hàng không có sản phẩm.",
  1806: "Đơn hàng đã được giao, không thể xác nhận lại.",
  1807: "Đơn hàng đã hủy, không thể cập nhật.",
  1808: "Không thể thay đổi trạng thái đơn đã hoàn tất.",

  // ===== INVENTORY =====
  1900: "Kho không tồn tại.",
  1901: "Số lượng tồn kho không đủ.",
  1902: "Không thể hủy đặt giữ hàng.",
  1903: "Không đủ số lượng hàng đã giữ.",

  // ===== IMAGE =====
  2000: "Không tìm thấy hình ảnh.",

  // ===== VALIDATION =====
  2100: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ký tự in hoa, số và ký tự đặc biệt",

  // ===== COUPON =====
  2200: "Mã giảm giá không hợp lệ hoặc không thể áp dụng.",

  // ===== REVIEW =====
  2300: "Bạn chưa mua sản phẩm này nên không thể đánh giá.",
  2301: "Bạn đã đánh giá sản phẩm này rồi.",

  // ===== EMAIL / OTP =====
  2400: "Không tìm thấy email.",
  2401: "Mã OTP không hợp lệ.",
  2402: "Mã OTP đã hết hạn.",
};

export const DEFAULT_ERROR_MESSAGE = "Đã xảy ra lỗi. Vui lòng thử lại sau!";
