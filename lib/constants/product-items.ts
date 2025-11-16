import { Product } from "@/lib/models/product";

export const productItemsSample: Product[] = [
  new Product({
    id: "1",
    slug: "hoa-cuc",
    name: "Hoa cúc",
    description: "Hoa cúc Indicum",
    bio: "Hoa cúc Indicum mang vẻ đẹp thanh khiết, dễ chăm và thích hợp trang trí phòng khách, bàn làm việc. Loài hoa tượng trưng cho sự bình an, bền bỉ và thu hút năng lượng tích cực.",
    price: 150000,
    discount: 10,
    categoryId: "indoor-plants",
    imageUrls: [
      "/assets/images/products/hoacuc-1-gplant.jpg",
      "/assets/images/products/hoacuc-2-gplant.jpg",
    ],
    rating: 4.5,
    ratingCount: 120,
  }),

  new Product({
    id: "2",
    slug: "cay-luoi-ho-cao-trung-quoc",
    name: "Cây lưỡi hổ cao Trung Quốc",
    description: "Hoa cúc Indicum",
    bio: "Cây lưỡi hổ cao nổi bật với dáng lá thẳng mạnh mẽ, khả năng lọc khí vượt trội và rất dễ chăm sóc. Đây là lựa chọn lý tưởng cho không gian hiện đại, phòng ngủ hoặc văn phòng.",
    price: 150000,
    discount: 20,
    categoryId: "indoor-plants",
    imageUrls: [
      "/assets/images/products/cayluoihocaotrungquoc-1-gplant.jpg",
      "/assets/images/products/cayluoihocaotrungquoc-2-gplant.jpg",
    ],
    rating: 4.5,
    ratingCount: 120,
  }),

  new Product({
    id: "3",
    slug: "xuong-rong-murano",
    name: "Xương rồng Murano",
    description: "Astrophytum myriostigma",
    bio: "Xương rồng Murano có hình dáng ngôi sao độc đáo, sống khỏe, ít cần tưới và mang lại điểm nhấn hiện đại cho bàn làm việc. Phù hợp cho người thích cây mini nhưng bận rộn.",
    price: 150000,
    discount: 19,
    categoryId: "indoor-plants",
    imageUrls: [
      "/assets/images/products/xuongrongmurano-1-gplant.jpg",
      "/assets/images/products/xuongrongmurano-2-gplant.jpg",
    ],
    rating: 5,
    ratingCount: 120,
  }),

  new Product({
    id: "4",
    slug: "syngonium-wendlandii",
    name: "Syngonium Wendlandii",
    description: "Astrophytum myriostigma",
    bio: "Syngonium Wendlandii gây ấn tượng bởi lá nhung xanh đậm kèm đường gân bạc nổi bật. Cây sinh trưởng tốt trong nhà, giúp không gian trở nên mềm mại và sang trọng hơn.",
    price: 150000,
    discount: 22,
    categoryId: "indoor-plants",
    imageUrls: [
      "/assets/images/products/syngoniumwendlandii-1-gplant.jpg",
      "/assets/images/products/syngoniumwendlandii-2-gplant.jpg",
    ],
    rating: 5,
    ratingCount: 120,
  }),

  new Product({
    id: "5",
    slug: "zamia-kokedama",
    name: "Zamia Kokedama",
    description: "Astrophytum myriostigma",
    bio: "Zamia Kokedama được tạo hình theo phong cách Nhật Bản độc đáo, gọn gàng và tinh tế. Cây sống khỏe, dễ chăm, phù hợp đặt ở bàn làm việc, kệ sách hoặc bàn tiếp khách.",
    price: 150000,
    discount: 55,
    categoryId: "indoor-plants",
    imageUrls: [
      "/assets/images/products/zamiakokedama-1-gplant.jpg",
      "/assets/images/products/zamiakokedama-2-gplant.jpg",
    ],
    rating: 5,
    ratingCount: 120,
  }),
];
