import React from "react";

const CarSVG = ({ className, id }) => (
    <svg
        id={id}
        className={className}
        viewBox="0 0 400 180"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "100%", width: "auto" }}
    >
        {/* Car body */}
        <defs>
            <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2ecc71" />
                <stop offset="50%" stopColor="#27ae60" />
                <stop offset="100%" stopColor="#1e8449" />
            </linearGradient>
            <linearGradient id="windshieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5dade2" />
                <stop offset="100%" stopColor="#2e86c1" />
            </linearGradient>
            <filter id="carShadow">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" />
            </filter>
        </defs>

        <g filter="url(#carShadow)">
            {/* Main body */}
            <path
                d="M60,90 Q60,45 120,40 L280,35 Q340,35 350,60 L360,80 Q365,90 360,100 L350,120 Q340,145 280,145 L120,140 Q60,135 60,90Z"
                fill="url(#carBodyGrad)"
                stroke="#1a6b37"
                strokeWidth="1.5"
            />

            {/* Hood area */}
            <path
                d="M330,55 Q360,60 370,80 L375,90 Q375,100 370,105 L350,120 Q345,100 345,90 Q345,75 335,60Z"
                fill="#22a85a"
                opacity="0.7"
            />

            {/* Windshield */}
            <ellipse cx="200" cy="90" rx="55" ry="30" fill="url(#windshieldGrad)" opacity="0.6" />

            {/* Side mirrors */}
            <rect x="150" y="32" width="12" height="8" rx="3" fill="#1e8449" />
            <rect x="150" y="140" width="12" height="8" rx="3" fill="#1e8449" />

            {/* Headlights */}
            <ellipse cx="365" cy="75" rx="6" ry="5" fill="#f9e852" opacity="0.9" />
            <ellipse cx="365" cy="105" rx="6" ry="5" fill="#f9e852" opacity="0.9" />

            {/* Taillights */}
            <ellipse cx="65" cy="75" rx="5" ry="4" fill="#e74c3c" opacity="0.9" />
            <ellipse cx="65" cy="105" rx="5" ry="4" fill="#e74c3c" opacity="0.9" />

            {/* Wheels */}
            <circle cx="120" cy="42" r="16" fill="#2c3e50" />
            <circle cx="120" cy="42" r="8" fill="#7f8c8d" />
            <circle cx="120" cy="138" r="16" fill="#2c3e50" />
            <circle cx="120" cy="138" r="8" fill="#7f8c8d" />

            <circle cx="290" cy="38" r="16" fill="#2c3e50" />
            <circle cx="290" cy="38" r="8" fill="#7f8c8d" />
            <circle cx="290" cy="142" r="16" fill="#2c3e50" />
            <circle cx="290" cy="142" r="8" fill="#7f8c8d" />

            {/* Racing stripe */}
            <line
                x1="80"
                y1="90"
                x2="360"
                y2="90"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="3"
            />
        </g>
    </svg>
);

export default CarSVG;
