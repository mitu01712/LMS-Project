import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { 
  PlayCircle, 
  CheckCircle, 
  ChevronLeft, 
  Clock, 
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import ProgressBar from '../components/ProgressBar';

const LessonViewer = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessonData = async () => {
            try {
                const courseRes = await api.get(`courses/${courseId}/`);
                setCourse(courseRes.data);
                setLessons(courseRes.data.lessons);
                
                if (courseRes.data.lessons.length > 0) {
                    setCurrentLesson(courseRes.data.lessons[0]);
                }

                const progressRes = await api.get(`enrollments/progress/?course=${courseId}`);
                setCompletedLessons(progressRes.data.map(p => p.lesson));
                
                setLoading(false);
            } catch (err) {
                console.error("Error fetching lesson data", err);
                setLoading(false);
            }
        };
        fetchLessonData();
    }, [courseId]);

    const handleMarkComplete = async (lessonId) => {
        try {
            await api.post('enrollments/mark-complete/', { lesson: lessonId });
            if (!completedLessons.includes(lessonId)) {
                setCompletedLessons([...completedLessons, lessonId]);
            }
        } catch (err) {
            console.error("Action failed");
        }
    };

    const progressPercentage = lessons.length > 0 
        ? Math.round((completedLessons.length / lessons.length) * 100)
        : 0;

    if (loading) return (
        <div className="h-screen bg-[#0F0F0F] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-[#0F0F0F] text-white overflow-hidden">
            
            {/* বাম পাশ: ভিডিও প্লেয়ার এবং লেসন ডিটেইলস */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                {/* টপ ন্যাভবার */}
                <div className="p-4 bg-black/40 backdrop-blur-md flex items-center justify-between sticky top-0 z-10 border-b border-white/5">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={20} />
                        <span className="text-sm font-medium">Back to Courses</span>
                    </button>
                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full">
                        {course?.title}
                    </div>
                </div>

                {/* ভিডিও প্লেয়ার */}
                <div className="w-full aspect-video bg-black shadow-2xl relative">
                    <iframe
                        className="w-full h-full"
                        src={currentLesson?.video_url.replace("watch?v=", "embed/")}
                        title={currentLesson?.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* ডিটেইলস সেকশন */}
                <div className="p-8 max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div className="flex-1">
                            <h1 className="text-3xl font-black mb-3 leading-tight tracking-tight">
                                {currentLesson?.title}
                            </h1>
                            <div className="flex items-center gap-4 text-zinc-500 text-sm font-medium">
                                <span className="flex items-center gap-1.5"><Clock size={16}/> {currentLesson?.duration} Mins</span>
                                <span className="flex items-center gap-1.5"><BookOpen size={16}/> Lesson {lessons.indexOf(currentLesson) + 1} of {lessons.length}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => handleMarkComplete(currentLesson?.id)}
                            disabled={completedLessons.includes(currentLesson?.id)}
                            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg ${
                                completedLessons.includes(currentLesson?.id)
                                ? 'bg-green-500/10 text-green-500 border border-green-500/20 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95'
                            }`}
                        >
                            {completedLessons.includes(currentLesson?.id) ? (
                                <><CheckCircle2 size={20}/> Completed</>
                            ) : (
                                'Mark as Complete'
                            )}
                        </button>
                    </div>

                    <div className="mt-10 pt-10 border-t border-white/5">
                        <h2 className="text-xl font-bold mb-4 text-zinc-200">About this Course</h2>
                        <p className="text-zinc-400 leading-relaxed text-lg">
                            {course?.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* ডান পাশ: কোর্স কন্টেন্ট সাইডবার */}
            <div className="w-full lg:w-[400px] bg-[#161616] border-l border-white/5 flex flex-col shadow-2xl">
                <div className="p-6 border-b border-white/5 bg-zinc-900/50">
                    <h2 className="text-xl font-black mb-4">Course Content</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase tracking-widest">
                            <span>Your Progress</span>
                            <span>{progressPercentage}%</span>
                        </div>
                        <ProgressBar percentage={progressPercentage} />
                    </div>
                </div>

                {/* লেসন লিস্ট */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {lessons.map((lesson, index) => (
                        <button
                            key={lesson.id}
                            onClick={() => setCurrentLesson(lesson)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                                currentLesson?.id === lesson.id 
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                                : 'hover:bg-white/5 text-zinc-400'
                            }`}
                        >
                            <div className="relative flex-shrink-0">
                                {completedLessons.includes(lesson.id) ? (
                                    <CheckCircle size={22} className={currentLesson?.id === lesson.id ? 'text-white' : 'text-green-500'} />
                                ) : (
                                    <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                                        currentLesson?.id === lesson.id ? 'border-white' : 'border-zinc-700 text-zinc-500'
                                    }`}>
                                        {index + 1}
                                    </div>
                                )}
                            </div>

                            <div className="text-left flex-1 min-w-0">
                                <p className={`text-sm font-bold truncate ${currentLesson?.id === lesson.id ? 'text-white' : 'text-zinc-300'}`}>
                                    {lesson.title}
                                </p>
                                <p className={`text-xs mt-1 ${currentLesson?.id === lesson.id ? 'text-indigo-200' : 'text-zinc-500'}`}>
                                    {lesson.duration} Mins
                                </p>
                            </div>

                            {currentLesson?.id !== lesson.id && (
                                <PlayCircle size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LessonViewer;