interface PointBadgeProps {
    points: number;
}

export function PointBadge({ points }: PointBadgeProps) {
    return (
        <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs font-semibold">
            <span>💰 +{points} Dalant</span>
        </div>
    );
}
