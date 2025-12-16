export type productItemProps = {
  id: string;
  productName: string;
  categories: string;
  price: string;
  quantity: string;
  status: "Chờ xử lý" | "Đang xử lý" | "Thành công" | "Thất bại";
};

export const productLists: productItemProps[] = [
  {
    id: "a1f9c3d2",
    productName: "Cây Lưỡi Hổ",
    categories: "Trong nhà",
    price: "150000",
    quantity: "5",
    status: "Thành công",
  },
  {
    id: "b4e7d8f1",
    productName: "Cây Trầu Bà Leo",
    categories: "Trong nhà",
    price: "120000",
    quantity: "8",
    status: "Đang xử lý",
  },
  {
    id: "c9f1a3b8",
    productName: "Cây Phát Tài",
    categories: "Trong nhà",
    price: "250000",
    quantity: "4",
    status: "Chờ xử lý",
  },
  {
    id: "d3a8c4f7",
    productName: "Cây Sen Đá Mix",
    categories: "Trong nhà",
    price: "60000",
    quantity: "12",
    status: "Thất bại",
  },
  {
    id: "e7b2f9c1",
    productName: "Cây Xương Rồng Tròn",
    categories: "Trong nhà",
    price: "90000",
    quantity: "10",
    status: "Thành công",
  },

  {
    id: "f2c4d8e9",
    productName: "Cây Hoa Giấy",
    categories: "Ngoài trời",
    price: "180000",
    quantity: "6",
    status: "Đang xử lý",
  },
  {
    id: "g8e1a9c3",
    productName: "Cây Bàng Singapore",
    categories: "Ngoài trời",
    price: "450000",
    quantity: "2",
    status: "Chờ xử lý",
  },
  {
    id: "h5d7b2f1",
    productName: "Cây Sứ Đại",
    categories: "Ngoài trời",
    price: "350000",
    quantity: "3",
    status: "Thành công",
  },
  {
    id: "i3f9c6a8",
    productName: "Cây Dừa Cảnh Mini",
    categories: "Ngoài trời",
    price: "200000",
    quantity: "7",
    status: "Thất bại",
  },
  {
    id: "j9a6e3b2",
    productName: "Cây Mai Vàng Giống",
    categories: "Ngoài trời",
    price: "600000",
    quantity: "2",
    status: "Thành công",
  },

  {
    id: "k4c8f1d9",
    productName: "Hạt Giống Rau Muống",
    categories: "Hạt giống",
    price: "20000",
    quantity: "25",
    status: "Thành công",
  },
  {
    id: "l7e2b6a1",
    productName: "Hạt Giống Cà Chua F1",
    categories: "Hạt giống",
    price: "35000",
    quantity: "18",
    status: "Chờ xử lý",
  },
  {
    id: "m1f9d8e4",
    productName: "Hạt Giống Dưa Leo",
    categories: "Hạt giống",
    price: "30000",
    quantity: "30",
    status: "Đang xử lý",
  },
  {
    id: "n5a3c7f2",
    productName: "Hạt Giống Hoa Cúc",
    categories: "Hạt giống",
    price: "25000",
    quantity: "20",
    status: "Thất bại",
  },
];
