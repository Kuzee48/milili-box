"use client";

import React from 'react';

export default function Snowfall() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div key={i} className="snowflake text-white opacity-40">❅</div>
      ))}
      <style jsx global>{`
        .snowflake {
          position: fixed;
          top: -5vh;
          animation: fall linear infinite;
        }
        @keyframes fall {
          to { transform: translateY(105vh) rotate(360deg); }
        }
        ${[...Array(30)].map((_, i) => `
          .snowflake:nth-child(${i+1}) {
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 10 + 7}s;
            animation-delay: ${Math.random() * 5}s;
            font-size: ${Math.random() * 15 + 10}px;
            filter: blur(${Math.random() * 2}px);
          }
        `).join('')}
      `}</style>
    </div>
  );
}
