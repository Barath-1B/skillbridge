export default function Card({ children, title, className = '' }) {
  return (
    <div className={`card ${className}`.trim()}>
      {title && <h3 className="text-xl font-bold mb-4 text-gray-800">{title}</h3>}
      {children}
    </div>
  );
}
