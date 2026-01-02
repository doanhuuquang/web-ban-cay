import React, { useState } from 'react';
import { X, Tag, Percent, DollarSign, Calendar, Users, Settings } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { Coupon } from '@/lib/models/coupon';
import { updateCouponMock } from '@/mock/couponsMock';

export default function UpdateCouponModal({
    onClose,
    initialData
}: {
    onClose: () => void;
    initialData: Coupon | null;
}) {
    const [formData, setFormData] = useState<Coupon | null>(initialData);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (!formData) return;

        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev!,
            [name]: type === 'checkbox'
                ? checked
                : type === 'number'
                    ? parseFloat(value) || 0
                    : value,
        }));
    };

    const handleSubmit = async () => {
        if (!formData || !formData.couponId) return;

        // Gửi dữ liệu cập nhật (mock)
        await updateCouponMock(formData.couponId, formData);
        console.log('Updated coupon:', formData);
        onClose();
    };

    if (!initialData || !formData) {
        return (
            <Dialog>
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg">Lỗi: Không tải được dữ liệu mã giảm giá</div>
                </div>
            </Dialog>
        );
    }

    return (
        <Dialog>
            <div className="fixed inset-0 bg-black/20 bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Tag className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">Chỉnh Sửa Mã Giảm Giá</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Mã giảm giá - chỉ hiển thị (không cho sửa) */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mã Giảm Giá <span className="text-red-500">*</span>
                                </label>
                                <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 font-medium">
                                    {formData.code}
                                </div>
                            </div>

                            {/* Loại giảm giá - chỉ hiển thị */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Percent className="w-4 h-4 inline mr-1" /> Loại Giảm Giá
                                </label>
                                <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg font-medium">
                                    {formData.discountType === 'PERCENTAGE' ? 'Phần trăm (%)' : 'Số tiền cố định'}
                                </div>
                            </div>

                            {/* Giá trị giảm - chỉ hiển thị */}
                            {formData.discountType === 'PERCENTAGE' ? (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phần Trăm Giảm (%)
                                    </label>
                                    <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg font-medium">
                                        {formData.discountPercent}%
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <DollarSign className="w-4 h-4 inline mr-1" /> Số Tiền Giảm
                                    </label>
                                    <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg font-medium">
                                        {initialData.maxDiscountAmount?.toLocaleString()} ₫
                                    </div>
                                </div>
                            )}

                            {/* Giảm tối đa (nếu là phần trăm) */}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Giảm Tối Đa
                                </label>
                                <input
                                    type="number"
                                    name="maxDiscountAmount"
                                    value={formData.maxDiscountAmount || ''}
                                    onChange={handleInputChange}
                                    min="0"
                                    placeholder="0 = không giới hạn"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>

                            {/* Giá trị đơn hàng tối thiểu */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Giá Trị Đơn Hàng Tối Thiểu
                                </label>
                                <input
                                    type="number"
                                    name="minOrderValue"
                                    value={formData.minOrderValue || ''}
                                    onChange={handleInputChange}
                                    min="0"
                                    placeholder="0 = không yêu cầu"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>

                            {/* Ngày bắt đầu */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" /> Ngày Bắt Đầu
                                </label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    value={toLocalInputValue(formData.startDate)}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>

                            {/* Ngày hết hạn */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" /> Ngày Hết Hạn
                                </label>
                                <input
                                    type="datetime-local"
                                    name="expiryDate"
                                    value={toLocalInputValue(formData.expiryDate)}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>

                            {/* Trạng thái kích hoạt */}
                            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg md:col-span-2">
                                <input
                                    type="checkbox"
                                    name="enabled"
                                    checked={formData.enabled || false}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label className="text-sm font-semibold text-gray-700">
                                    <Settings className="w-4 h-4 inline mr-1" />
                                    Kích hoạt mã giảm giá
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            Lưu Thay Đổi
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
      `}</style>
        </Dialog>
    );
}

function toLocalInputValue(value?: string | Date | null) {
    if (!value) return "";

    const date = value instanceof Date ? value : new Date(value);

    return date.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
}