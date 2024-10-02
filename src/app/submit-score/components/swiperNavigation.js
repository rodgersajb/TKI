"use client";

export default function SwiperNavigation({ onPrev, onNext}) {
    return (
      <div className="flex justify-between w-full px-4 pb-4">
        <button onClick={onPrev} className="btn-secondary">
          Previous
        </button>
        <button onClick={onNext} className="btn-primary">
          Next
        </button>
      </div>
    );
}