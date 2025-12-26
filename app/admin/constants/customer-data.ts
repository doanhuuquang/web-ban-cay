export type customerItemProp = {
    id: string;
    customerName: string;
    phoneNumber: string;
    address: string;
    email?: string;
    avatarUrl?: string;
};

export const customerList: customerItemProp[] = [
    {
        id: "CUS001",
        customerName: "Nguyễn Văn A",
        phoneNumber: "0987654321",
        address: "Phường Dịch Vọng, Quận Cầu Giấy, Hà Nội",
        email: "nguyenvana@gmail.com",
        avatarUrl: "https://i.pravatar.cc/300?img=1",
    },
    {
        id: "CUS002",
        customerName: "Trần Thị B",
        phoneNumber: "0978123456",
        address: "Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
        email: "tranthib@gmail.com",
        avatarUrl: "https://i.pravatar.cc/300?img=2",
    },
    {
        id: "CUS003",
        customerName: "Lê Văn C",
        phoneNumber: "0912345678",
        address: "Phường An Hải Bắc, Quận Sơn Trà, Đà Nẵng",
        avatarUrl: "https://i.pravatar.cc/300?img=3",
    },
    {
        id: "CUS004",
        customerName: "Phạm Thị D",
        phoneNumber: "0934567890",
        address: "Phường Trường Thi, TP. Vinh, Nghệ An",
        email: "phamthid@gmail.com",
        avatarUrl: "https://i.pravatar.cc/300?img=4",
    },
    {
        id: "CUS005",
        customerName: "Hoàng Văn E",
        phoneNumber: "0967890123",
        address: "Phường Tân Phong, Quận 7, TP. Hồ Chí Minh",
        avatarUrl: "https://i.pravatar.cc/300?img=5",
    },
    {
        id: "CUS006",
        customerName: "Vũ Thị F",
        phoneNumber: "0901234567",
        address: "Phường Lê Lợi, TP. Hạ Long, Quảng Ninh",
        email: "vuthif@gmail.com",
        avatarUrl: "https://i.pravatar.cc/300?img=6",
    },
    {
        id: "CUS007",
        customerName: "Đặng Văn G",
        phoneNumber: "0945678901",
        address: "Phường Xuân Khanh, TX. Sơn Tây, Hà Nội",
        avatarUrl: "https://i.pravatar.cc/300?img=7",
    },
    {
        id: "CUS008",
        customerName: "Bùi Thị H",
        phoneNumber: "0923456789",
        address: "Phường Vĩnh Phước, TP. Nha Trang, Khánh Hòa",
        email: "buithih@gmail.com",
        avatarUrl: "https://i.pravatar.cc/300?img=8",
    },
    {
        id: "CUS009",
        customerName: "Ngô Văn I",
        phoneNumber: "0956789012",
        address: "Phường Trần Phú, TP. Quy Nhơn, Bình Định",
        avatarUrl: "https://i.pravatar.cc/300?img=9",
    },
    {
        id: "CUS010",
        customerName: "Phan Thị K",
        phoneNumber: "0991234567",
        address: "Phường Hòa Cường Bắc, Quận Hải Châu, Đà Nẵng",
        email: "phanthik@gmail.com",
        avatarUrl: "https://i.pravatar.cc/300?img=10",
    },
];