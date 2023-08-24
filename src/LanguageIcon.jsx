export default function LanguageIcon({ src, size }) {
  return (
    <img
      className="LanguageIcon"
      src={src}
      style={{ width: size, aspectRatio: 1 }}
    />
  );
}
