import { Coupon } from "@/lib/models/coupon";
import { deleteCouponMock } from "@/mock/couponsMock";

export function DeleteCouponModal({ closeModal, initialData }: { closeModal: () => void; initialData: Coupon|null }) {
    const handleDelete = async () => {
        if (!initialData) return closeModal();

        await deleteCouponMock(initialData.couponId);
        closeModal();
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={closeModal}
        >
            <div
                className="bg-white w-full max-w-md rounded-xl shadow-lg p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-semibold mb-4 text-red-600">
                    Bạn có muốn xóa mã giảm giá
                </h2>

                <ul className="mt-2 mb-4 text-sm text-gray-700">
                    <li>
                        <strong>code:</strong> {initialData?.code}
                    </li>
                </ul>

                <div className="flex gap-2">
                    <button
                        className="flex-1 bg-gray-300 py-2 rounded-md"
                        onClick={closeModal}
                    >
                        Huỷ
                    </button>

                    <button
                        className="flex-1 bg-red-600 text-white py-2 rounded-md"
                        onClick={handleDelete}
                    >
                        Xoá
                    </button>
                </div>
            </div>
        </div>
    );
}