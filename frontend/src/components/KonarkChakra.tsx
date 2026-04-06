"use client";

import React from "react";

interface KonarkChakraProps {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
}

export const KonarkChakra: React.FC<KonarkChakraProps> = ({
  size = 500,
  color = "#B8952A",
  opacity = 1,
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Outer Rim */}
      <circle cx="250" cy="250" r="240" stroke={color} strokeWidth="8" />
      <circle cx="250" cy="250" r="225" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
      
      {/* Inner Rim */}
      <circle cx="250" cy="250" r="60" stroke={color} strokeWidth="6" />
      <circle cx="250" cy="250" r="50" stroke={color} strokeWidth="2" />
      
      {/* Central Hub */}
      <circle cx="250" cy="250" r="20" fill={color} opacity="0.8" />
      
      {/* 8 Main Spokes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={`main-${angle}`} transform={`rotate(${angle} 250 250)`}>
          <path
            d="M250 190V60"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M250 60 L235 90 L265 90 Z"
            fill={color}
          />
          <circle cx="250" cy="125" r="8" stroke={color} strokeWidth="2" fill="none" />
          <line
            x1="250" y1="190"
            x2="250" y2="240"
            stroke={color}
            strokeWidth="4"
            opacity="0.4"
          />
        </g>
      ))}
      
      {/* 16 Secondary Spokes */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = i * 22.5;
        if (angle % 45 === 0) return null; // Skip main spoke positions
        return (
          <g key={`sec-${angle}`} transform={`rotate(${angle} 250 250)`}>
            <line
              x1="250" y1="240"
              x2="250" y2="60"
              stroke={color}
              strokeWidth="2"
              opacity="0.5"
            />
            <circle cx="250" cy="150" r="4" fill={color} opacity="0.3" />
          </g>
        );
      })}
      
      {/* Decorative Dots on Rim */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = i * (360 / 24);
        const cx = 250 + Math.cos((angle - 90) * (Math.PI / 180)) * 232;
        const cy = 250 + Math.sin((angle - 90) * (Math.PI / 180)) * 232;
        return (
          <circle
            key={`rim-dot-${angle}`}
            cx={cx.toFixed(3)}
            cy={cy.toFixed(3)}
            r="4"
            fill={color}
          />
        );
      })}
    </svg>
  );
};

export default KonarkChakra;
