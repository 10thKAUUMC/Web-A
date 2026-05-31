interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ClearCartModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-lg bg-white px-8 py-8 shadow-xl">
        <p className="mb-6 text-center text-base font-medium text-gray-800 sm:text-lg">
          장바구니를 전체 삭제할까요?
        </p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-24 rounded border border-gray-300 bg-white py-2 text-sm text-gray-700 hover:bg-gray-100 sm:text-base"
          >
            아니요
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-24 rounded bg-red-500 py-2 text-sm font-semibold text-white hover:bg-red-600 sm:text-base"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
