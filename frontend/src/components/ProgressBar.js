const ProgressBar = ({ percentage }) => (
    <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
        <div className="bg-green-500 h-4 rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
        <p className="text-xs text-center mt-1">{Math.round(percentage)}% Completed</p>
    </div>
);
export default ProgressBar;
