export function FloatingChatButton() {
  return (
<div className="fixed bottom-8 right-8 z-50">
  <button className="gradient-action text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform editorial-shadow">
    <span
      className="material-symbols-outlined text-3xl"
      data-icon="chat_bubble"
      data-weight="fill"
      style={{ fontVariationSettings: "'FILL' 1" }}
    >
      chat_bubble
    </span>
  </button>
</div>
  );
}
