import React, { useState } from 'react';
import { X, Tag, Percent, DollarSign, Calendar, Users, Settings } from 'lucide-react';
import { Dialog } from '@/components/ui/dialog';
import { createCouponMock } from '@/mock/couponsMock';
import { createCou } from '@/lib/services/coupon-service';

export default function CreateCouponModal({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState<createCou>({
        code: '',
        discountType: 'PERCENTAGE',
        discountPercent: 0,
        discountAmount: 0,
        maxDiscountAmount: 0,
        minOrderValue: 0,
        startDate: new Date().toISOString().slice(0, 16),
        expiryDate: '',
        usageLimit: 0,
        limitPerUser: false,
        maxUsesPerUser: 0,
        enabled: true
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "number"
                        ? parseFloat(value) || 0
                        : value,
        }));
    };


    const handleSubmit = async () => {
        if (!formData.code) return;

        const payload = {
            ...formData,

            // Nếu là % thì discountAmount = null
            discountAmount:
                formData.discountType === "PERCENTAGE"
                    ? null
                    : formData.discountAmount,

            discountPercent:
                formData.discountType !== "PERCENTAGE"
                    ? null
                    : formData.discountPercent,


            usedCount: 0
        };

        console.log(payload)
        await createCouponMock(payload);
        onClose();
    };


    return (
        <Dialog >
            <div className="fixed inset-0 bg-black/20 bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
                {/* Modal Content */}
                <div className="bg-white rounded-2xl  shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Tag className="w-6 h-6" />
                            <h2 className="text-2xl font-bold">Tạo Mã Giảm Giá Mới</h2>
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
                            {/* Mã giảm giá */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Mã Giảm Giá <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleInputChange}
                                    placeholder="VD: SUMMER2026"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Loại giảm giá */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Percent className="w-4 h-4 inline mr-1" />
                                    Loại Giảm Giá
                                </label>
                                <select
                                    name="discountType"
                                    value={formData.discountType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                >
                                    <option value="PERCENTAGE">Phần trăm (%)</option>
                                    <option value="FIXED_AMOUNT">Số tiền cố định</option>
                                </select>
                            </div>

                            {/* Giá trị giảm */}
                            {formData.discountType === 'PERCENTAGE' ? (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phần Trăm Giảm (%)
                                    </label>
                                    <input
                                        type="number"
                                        name="discountPercent"
                                        value={formData.discountPercent ?? ""}
                                        onChange={handleInputChange}
                                        min="0"
                                        max="100"
                                        placeholder="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <DollarSign className="w-4 h-4 inline mr-1" />
                                        Số Tiền Giảm
                                    </label>
                                    <input
                                        type="number"
                                        name="discountAmount"
                                        value={formData.discountAmount ?? ""}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            )}

                            {/* Giảm tối đa */}
                            {formData.discountType === 'PERCENTAGE' && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Giảm Tối Đa
                                    </label>
                                    <input
                                        type="number"
                                        name="maxDiscountAmount"
                                        value={formData.maxDiscountAmount}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="0 = không giới hạn"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            )}

                            {/* Giá trị đơn hàng tối thiểu */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Giá Trị Đơn Hàng Tối Thiểu
                                </label>
                                <input
                                    type="number"
                                    name="minOrderValue"
                                    value={formData.minOrderValue}
                                    onChange={handleInputChange}
                                    min="0"
                                    placeholder="0 = không yêu cầu"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Ngày bắt đầu */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Ngày Bắt Đầu
                                </label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Ngày hết hạn */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Calendar className="w-4 h-4 inline mr-1" />
                                    Ngày Hết Hạn
                                </label>
                                <input
                                    type="datetime-local"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Giới hạn sử dụng */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Users className="w-4 h-4 inline mr-1" />
                                    Giới Hạn Số Lần Sử Dụng
                                </label>
                                <input
                                    type="number"
                                    name="usageLimit"
                                    value={formData.usageLimit}
                                    onChange={handleInputChange}
                                    min="0"
                                    placeholder="0 = không giới hạn"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            {/* Giới hạn theo user */}
                            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                                <input
                                    type="checkbox"
                                    name="limitPerUser"
                                    checked={formData.limitPerUser}
                                    onChange={handleInputChange}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label className="text-sm font-semibold text-gray-700">
                                    Giới hạn theo người dùng
                                </label>
                            </div>

                            {/* Số lần sử dụng tối đa mỗi user */}
                            {formData.limitPerUser && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Số Lần Tối Đa/Người Dùng
                                    </label>
                                    <input
                                        type="number"
                                        name="maxUsesPerUser"
                                        value={formData.maxUsesPerUser}
                                        onChange={handleInputChange}
                                        min="0"
                                        placeholder="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            )}

                            {/* Trạng thái */}
                            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                                <input
                                    type="checkbox"
                                    name="enabled"
                                    checked={formData.enabled}
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
                        <button onClick={onClose}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            Tạo Mã Giảm Giá
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
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
        </Dialog>
    );
}