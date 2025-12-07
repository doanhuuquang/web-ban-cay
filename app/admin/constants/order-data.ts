type OrderItemProps = {
  id: string;
  name: string;
  customer: string;
  date: string;
  quantity: string;
  price: string;
  status:
    | "Thành công"
    | "Thất bại"
    | "Chờ xử lý"
    | "Đã huỷ"
    | "Đang giao hàng"
    | "Chờ lấy hàng";
};

function formatDate(date: Date): string {
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// export const OrderList: OrderItemProps[] = [{}];
function generateOrders(count: number): OrderItemProps[] {
  const statuses: OrderItemProps["status"][] = [
    "Thành công",
    "Thất bại",
    "Chờ xử lý",
    "Đã huỷ",
    "Đang giao hàng",
    "Chờ lấy hàng",
  ];

  const products = [
    "Cây lưỡi hổ mini",
    "Cây hoa giấy bonsai",
    "Bình tưới cây áp suất",
    "Hạt giống rau cải ngọt",
    "Chậu gốm tròn trắng 20cm",
    "Cây giả bonsai mini",
    "Cây kim tiền phong thủy",
    "Cây cau cảnh",
    "Đất sạch hữu cơ 5kg",
    "Hạt giống hoa hướng dương",
  ];

  const customers = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Phạm Văn C",
    "Lê Thị D",
    "Ngô Văn E",
    "Hoàng Thị F",
    "Đỗ Văn G",
    "Nguyễn Thị H",
    "Phan Văn I",
    "Nguyễn Văn J",
  ];

  const prices: Record<string, number> = {
    "Cây lưỡi hổ mini": 120000,
    "Cây hoa giấy bonsai": 350000,
    "Bình tưới cây áp suất": 90000,
    "Hạt giống rau cải ngọt": 25000,
    "Chậu gốm tròn trắng 20cm": 150000,
    "Cây giả bonsai mini": 100000,
    "Cây kim tiền phong thủy": 450000,
    "Cây cau cảnh": 280000,
    "Đất sạch hữu cơ 5kg": 70000,
    "Hạt giống hoa hướng dương": 30000,
  };

  return Array.from({ length: count }, (_, i) => {
    const name = products[i % products.length];
    const quantity = (i % 5) + 1;

    return {
      id: `ORD-${String(i + 1).padStart(3, "0")}`,
      name,
      customer: customers[i % customers.length],
      date: formatDate(new Date(2025, 0, i + 1)),
      quantity: String(quantity),
      price: String(prices[name] * quantity), // lấy giá từ prices theo tên sản phẩm
      status: statuses[i % statuses.length],
    };
  });
}

export const orders: OrderItemProps[] = generateOrders(50);
