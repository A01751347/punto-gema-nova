'use client';

interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: number;
  className?: string;
}

export default function Marquee({
  items,
  separator = '✦',
  speed = 30,
  className = '',
}: MarqueeProps) {
  const content = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        <span className="inline-block pr-4">{content}</span>
        <span className="inline-block pr-4">{content}</span>
        <span className="inline-block pr-4">{content}</span>
      </div>
    </div>
  );
}
