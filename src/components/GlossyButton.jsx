

"use client";

export default function GlossyButton({
  as: Component = "button",
  href,
  onClick,
  target,
  rel,
  children = "Book A Free Math Class",
  className = "",
  ...props
}) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
  };

  return (
    <Component
      {...(Component === "a" ? { href, target, rel } : { onClick: handleClick })}
      className={`relative overflow-hidden bg-[#e66e37] hover:bg-[#e68355] text-white font-semibold px-5 py-1 rounded-full border-2 border-[#3A1F10] shadow-[1px_1px_0_0_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-[#D16F3B] transition-all duration-200 inline-block text-sm sm:text-base ${className}`}
      {...props}
    >
      {children}

      {/* Shine overlay */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
        <div className="absolute top-0 left-[-150%] w-[250%] h-full animate-shine-slow">
          <svg
            viewBox="0 0 53 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <g opacity="0.2">
              <rect
                x="31.3149"
                y="-9"
                width="11"
                height="70"
                transform="rotate(26.574 31.3149 -9)"
                fill="#D9D9D9"
              />
              <rect
                x="47.3149"
                y="-7.4563"
                width="6.30956"
                height="70"
                transform="rotate(26.574 47.3149 -7.4563)"
                fill="#D9D9D9"
              />
            </g>
          </svg>
        </div>
      </div>
    </Component>
  );
}
