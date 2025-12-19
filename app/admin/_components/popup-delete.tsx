type PopupDeleteProps = {
  closePopupDelete: () => void;
  deleteButton: () => void;
};

export default function PopupDelete({
  closePopupDelete,
  deleteButton,
}: PopupDeleteProps) {
  return (
    <div
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePopupDelete();
      }}
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in-95 duration-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Xoá khách hàng
        </h2>

        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn xoá không? Hành động này không thể hoàn tác.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={closePopupDelete}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition rounded-lg text-gray-700"
          >
            Huỷ
          </button>

          <button
            onClick={() => deleteButton()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded-lg font-medium shadow-sm
            cursor-pointer
            "
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}
