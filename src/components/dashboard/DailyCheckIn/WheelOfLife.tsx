import React, { useRef, useEffect } from 'react';
import { CheckInData } from './DailyCheckIn';

interface WheelOfLifeProps {
  data: CheckInData;
}

export default function WheelOfLife({ data }: WheelOfLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Draw segments
    const segments = [
      { name: 'Emotional', value: data.emotional, color: '#f43f5e' },
      { name: 'Relationship', value: data.relationship, color: '#8b5cf6' },
      { name: 'Self-Care', value: data.selfCare, color: '#10b981' },
      { name: 'Goals', value: data.goals, color: '#f59e0b' },
    ];

    const segmentAngle = (2 * Math.PI) / segments.length;

    segments.forEach((segment, index) => {
      const startAngle = index * segmentAngle - Math.PI / 2;
      const endAngle = startAngle + segmentAngle;
      const segmentRadius = (radius * segment.value) / 5;

      // Draw segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, segmentRadius, startAngle, endAngle);
      ctx.closePath();

      ctx.fillStyle = segment.color + '40'; // Add transparency
      ctx.fill();
      ctx.strokeStyle = segment.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Add labels
      const labelRadius = radius + 10;
      const labelX = centerX + labelRadius * Math.cos(startAngle + segmentAngle / 2);
      const labelY = centerY + labelRadius * Math.sin(startAngle + segmentAngle / 2);

      ctx.fillStyle = '#374151';
      ctx.font = '12px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(segment.name, labelX, labelY);
    });

    // Draw grid lines
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, 2 * Math.PI);
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, [data]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="w-full max-w-md mx-auto"
      />
    </div>
  );
}