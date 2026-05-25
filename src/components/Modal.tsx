import usePlaylistStore from '../store/usePlaylistStore';

export default function Modal() {
  const { isOpen, closeModal, clearCart } = usePlaylistStore();

  if (!isOpen) return null;

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={() => closeModal()}
    >
      <div
        className="w-full max-w-xs rounded-lg bg-white p-6 shadow-xl sm:max-w-sm sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-sm font-semibold text-gray-900 sm:text-base">
          정말 삭제하시겠습니까?
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => closeModal()}
            className="rounded border border-gray-300 bg-white px-5 py-1.5 text-sm text-gray-800 hover:bg-gray-100"
          >
            아니요
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded bg-red-500 px-5 py-1.5 text-sm font-medium text-white hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
