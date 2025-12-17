export type staffItemProp = {
  id: string;
  staffName: string;
  phoneNumber: string;
  birthDay: string;
  role: "Chủ cửa hàng" | "Quản lý" | "Nhân viên";
  address: string;
  email?: string;
  avatarUrl?: string;
};

export const staffList: staffItemProp[] = [
  {
    id: "STF-001",
    staffName: "Nguyễn Văn An",
    phoneNumber: "0981234567",
    birthDay: "1995-03-12",
    role: "Chủ cửa hàng",
    address: "Quận Cầu Giấy, Hà Nội",
    email: "nguyenvanan@shop.com",
  },
  {
    id: "STF-002",
    staffName: "Trần Thị Bình",
    phoneNumber: "0972345678",
    birthDay: "1997-07-25",
    role: "Quản lý",
    address: "Quận 1, TP. Hồ Chí Minh",
    email: "tranthibinh@shop.com",
  },
  {
    id: "STF-003",
    staffName: "Lê Văn Cường",
    phoneNumber: "0913456789",
    birthDay: "1994-11-08",
    role: "Nhân viên",
    address: "Quận Hải Châu, Đà Nẵng",
  },
  {
    id: "STF-004",
    staffName: "Phạm Thị Dung",
    phoneNumber: "0934567891",
    birthDay: "1998-01-30",
    role: "Nhân viên",
    address: "TP. Vinh, Nghệ An",
  },
  {
    id: "STF-005",
    staffName: "Hoàng Văn Em",
    phoneNumber: "0965678902",
    birthDay: "1992-05-17",
    role: "Quản lý",
    address: "Quận 7, TP. Hồ Chí Minh",
  },
  {
    id: "STF-006",
    staffName: "Ngô Thị Hoa",
    phoneNumber: "0906789013",
    birthDay: "1996-09-10",
    role: "Nhân viên",
    address: "TP. Hạ Long, Quảng Ninh",
  },
  {
    id: "STF-007",
    staffName: "Đỗ Văn Khánh",
    phoneNumber: "0947890124",
    birthDay: "1993-12-02",
    role: "Nhân viên",
    address: "Quận Thanh Xuân, Hà Nội",
  },
  {
    id: "STF-008",
    staffName: "Bùi Thị Lan",
    phoneNumber: "0928901235",
    birthDay: "1999-06-18",
    role: "Nhân viên",
    address: "TP. Biên Hòa, Đồng Nai",
  },
  {
    id: "STF-009",
    staffName: "Vũ Văn Minh",
    phoneNumber: "0959012346",
    birthDay: "1991-02-14",
    role: "Quản lý",
    address: "TP. Thủ Đức, TP. Hồ Chí Minh",
  },
  {
    id: "STF-010",
    staffName: "Mai Thị Ngọc",
    phoneNumber: "0990123457",
    birthDay: "1998-10-05",
    role: "Nhân viên",
    address: "Quận Ninh Kiều, Cần Thơ",
  },
];
