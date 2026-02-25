import "../../../components/styles/text-button.css";

function TextButton({ type, text, bgColor, fontColor, onClick }) {
  return (
    <div className="text-button-container">
      <button
        type={type}
        className="text-button"
        onClick={onClick}
        style={{
          backgroundColor: bgColor,
          color: fontColor,
        }}
      >
        {text}
      </button>
    </div>
  );
}

export default TextButton;
