import React, { useRef, useEffect, useState } from 'react';

export default function InteractiveMarquee({ children, speed = 0.5, pauseOnHover = true, isPaused = false }) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const exactScroll = useRef(0);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    let animationId;
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (!isDragging && (!pauseOnHover || !isHovered) && !isPaused) {
        const blockWidth = container.scrollWidth / 5;
        if (exactScroll.current >= blockWidth) {
          exactScroll.current -= blockWidth;
        } else {
          exactScroll.current += speed;
        }
        container.scrollLeft = exactScroll.current;
      } else {
        // keep exactScroll synced when dragging
        exactScroll.current = container.scrollLeft;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging, isHovered, speed, pauseOnHover, isPaused]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartPos.current = { x: e.pageX, y: e.pageY };
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleTouchCancel = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    if (Math.abs(e.pageX - dragStartPos.current.x) > 5) {
      hasDraggedRef.current = true;
    }
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsHovered(true);
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartPos.current = { x: e.touches[0].pageX, y: e.touches[0].pageY };
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (Math.abs(e.touches[0].pageX - dragStartPos.current.x) > 5) {
      hasDraggedRef.current = true;
    }
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClickCapture = (e) => {
    if (hasDraggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div
      ref={containerRef}
      /* overflow-x-hidden hides the scrollbar while still allowing scrollLeft manipulation */
      className={`overflow-x-hidden flex gap-0 ${
        isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
      }`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onClickCapture={handleClickCapture}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} aria-hidden={i > 0 ? "true" : undefined}
          className="flex gap-2 lg:gap-3 pr-2 lg:pr-3 flex-shrink-0 min-w-max"
        >
          {children}
        </div>
      ))}
    </div>
  );
}
