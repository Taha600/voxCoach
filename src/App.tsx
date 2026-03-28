import React from 'react';
import { Mic, History, Laptop, Waves, User, Info, Upload, Target, Sparkles, TrendingUp, CheckCircle, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateScript } from './services/geminiService';

// Types
type Page = 'live' | 'history' | 'simulator';

interface Session {
  id: string;
  title: string;
  date: string;
  duration: string;
  score: number;
  type: 'fluency' | 'complex' | 'pitch' | 'checkin';
}

// Components
const Sidebar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => (
  <nav className="h-screen w-72 fixed left-0 top-0 bg-[#005a5a] flex flex-col py-8 shadow-2xl z-50 rounded-r-[32px] font-medium overflow-hidden">
    <div className="px-6 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-teal-800 flex items-center justify-center shadow-lg">
          <Waves className="text-[#ff7f50] w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-headline">VoxCoach</h1>
          <p className="text-xs text-teal-100/60 font-medium">AI Speech Therapist</p>
        </div>
      </div>
    </div>
    
    <div className="flex-1 flex flex-col gap-1">
      <button 
        onClick={() => setPage('live')}
        className={`flex items-center gap-3 rounded-[2rem] px-4 py-3 mx-4 transition-all hover:scale-[1.02] active:scale-95 ${currentPage === 'live' ? 'bg-[#ff7f50] text-white shadow-lg shadow-orange-900/20' : 'text-teal-100/70 hover:text-white hover:bg-teal-800/50'}`}
      >
        <Mic className="w-5 h-5" />
        <span className="text-sm font-semibold">Live Session</span>
      </button>

      <button 
        onClick={() => setPage('history')}
        className={`flex items-center gap-3 rounded-[2rem] px-4 py-3 mx-4 transition-all hover:scale-[1.02] active:scale-95 ${currentPage === 'history' ? 'bg-[#ff7f50] text-white shadow-lg shadow-orange-900/20' : 'text-teal-100/70 hover:text-white hover:bg-teal-800/50'}`}
      >
        <History className="w-5 h-5" />
        <span className="text-sm font-semibold">History</span>
      </button>

      <button 
        onClick={() => setPage('simulator')}
        className={`flex items-center gap-3 rounded-[2rem] px-4 py-3 mx-4 transition-all hover:scale-[1.02] active:scale-95 ${currentPage === 'simulator' ? 'bg-[#ff7f50] text-white shadow-lg shadow-orange-900/20' : 'text-teal-100/70 hover:text-white hover:bg-teal-800/50'}`}
      >
        <Laptop className="w-5 h-5" />
        <span className="text-sm font-semibold">Simulator</span>
      </button>
    </div>

    <div className="px-6 mb-6">
      <div className="bg-teal-900/40 rounded-2xl p-4 border border-white/5">
        <p className="text-[11px] text-teal-100/60 leading-relaxed">
          Practice makes progress. Every session sharpens your voice. 🌊
        </p>
      </div>
    </div>

    <div className="px-6 mt-auto border-t border-white/5 pt-6">
      <div className="flex items-center gap-3 text-white hover:bg-teal-800/50 rounded-[2rem] px-4 py-2 transition-all cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center overflow-hidden border border-white/10">
          <User className="text-teal-100 w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-bold">Alex Rivera</p>
          <p className="text-[10px] text-teal-100/50 uppercase tracking-wider">Premium Plan</p>
        </div>
      </div>
    </div>
  </nav>
);

const LiveSession = () => {
  const [isRecording, setIsRecording] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-6 h-full"
    >
      <header>
        <div className="flex items-center gap-3 mb-1">
          <Waves className="text-primary-container w-8 h-8" />
          <h2 className="font-headline text-4xl font-extrabold text-secondary tracking-tight">Live Session</h2>
        </div>
        <p className="font-body text-secondary/70 text-lg">Record and analyze your communication style in real-time.</p>
      </header>

      <div className="relative w-full">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Target className="text-secondary opacity-60 w-5 h-5" />
        </div>
        <input 
          className="w-full bg-surface-container-low border-0 rounded-xl py-5 pl-16 pr-6 text-secondary placeholder:text-secondary/40 focus:ring-2 focus:ring-secondary/20 shadow-sm text-lg" 
          placeholder="What's your communication goal? (e.g., pitch my startup, give a toast...)" 
          type="text"
        />
      </div>

      <div className="smooth-wave flex-1 min-h-[300px] rounded-xl relative">
        <div className="absolute inset-0 flex items-center justify-center">
           {isRecording ? (
             <div className="flex gap-1 items-end h-24">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [20, 80, 20] }}
                    transition={{ repeat: Infinity, duration: 0.5 + Math.random(), delay: i * 0.1 }}
                    className="w-2 bg-primary-container rounded-full"
                  />
                ))}
             </div>
           ) : (
             <p className="text-secondary/40 font-medium">Waveform visualization will appear here</p>
           )}
        </div>
        <svg className="wave-svg absolute bottom-0 left-0 w-full h-[40%] fill-tertiary-fixed opacity-60 animate-wave" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,85.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="flex flex-col items-center gap-4 py-4">
        <button 
          onClick={() => setIsRecording(!isRecording)}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform active:scale-95 group ${isRecording ? 'bg-error animate-pulse' : 'bg-primary-container'}`}
        >
          <Mic className="text-white w-10 h-10" fill={isRecording ? 'currentColor' : 'none'} />
        </button>
        <p className="font-label font-semibold text-secondary/60">
          {isRecording ? 'Recording... Tap to stop' : 'Tap to start recording'}
        </p>
        <button className="mt-2 flex items-center gap-2 px-6 py-2.5 border-2 border-secondary text-secondary font-semibold rounded-full hover:bg-secondary/5 transition-colors active:scale-95 group">
          <Upload className="w-5 h-5" />
          <span className="text-sm font-headline">Upload Recording</span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: 'Tone Clarity', value: '—', desc: 'How clear your tone is' },
          { label: 'Pitch Control', value: '—', desc: 'Vocal range & modulation' },
          { label: 'Pace & Flow', value: '—', desc: 'Speaking speed analysis' },
        ].map((metric, i) => (
          <div key={i} className="bg-surface-container-lowest border border-outline-variant/30 p-8 rounded-xl flex flex-col items-center text-center">
            <h4 className="font-headline font-bold text-secondary text-lg mb-2">{metric.label}</h4>
            <div className="text-4xl font-extrabold text-secondary mb-3">{metric.value}</div>
            <p className="font-body text-sm text-secondary/60">{metric.desc}</p>
          </div>
        ))}
      </div>

      <div className="fixed bottom-8 right-8 w-80 bg-secondary-container/30 backdrop-blur-xl p-5 rounded-xl shadow-2xl border border-white/40">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <Sparkles className="text-secondary w-6 h-6" fill="currentColor" />
          </div>
          <div>
            <p className="font-headline font-bold text-secondary text-sm">AI Copilot Tip</p>
            <p className="font-body text-xs text-secondary/70">"Start with a warm greeting to establish rapport."</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HistoryPage = () => {
  const sessions: Session[] = [
    { id: '1', title: 'Morning Fluency', date: 'Today • 10:30 AM', duration: '15m 20s', score: 88, type: 'fluency' },
    { id: '2', title: 'Complex Scenarios', date: 'Yesterday • 04:15 PM', duration: '42m 05s', score: 94, type: 'complex' },
    { id: '3', title: 'Pitch Modulation', date: 'Oct 24, 2023', duration: '08m 45s', score: 72, type: 'pitch' },
    { id: '4', title: 'Daily Check-in', date: 'Oct 23, 2023', duration: '12m 10s', score: 91, type: 'checkin' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6"
    >
      <section className="relative z-10 mb-10">
        <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_-4px_40px_rgba(164,60,18,0.04)] relative overflow-hidden">
          <div className="flex justify-between items-center relative z-10">
            <div className="space-y-1">
              <span className="text-secondary font-label font-semibold text-sm uppercase tracking-wider">Total Practice</span>
              <h2 className="font-headline font-extrabold text-4xl text-on-surface">24.5<span className="text-lg font-medium ml-1">hrs</span></h2>
              <p className="text-on-surface-variant text-sm flex items-center gap-1">
                <TrendingUp className="text-tertiary w-4 h-4" />
                12% more than last week
              </p>
            </div>
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-surface-container-high" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8"></circle>
                <circle className="text-primary-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="62.8" strokeWidth="8"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline font-bold text-lg">75%</span>
                <span className="text-[10px] font-bold uppercase">Goal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-between items-end mb-6">
        <h3 className="font-headline font-bold text-2xl text-secondary">Session History</h3>
        <button className="text-primary font-semibold text-sm hover:underline">View All</button>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {sessions.map((session) => (
          <div key={session.id} className={`group bg-surface-container-lowest rounded-lg p-5 flex items-center justify-between transition-all hover:scale-[1.02] border-l-4 ${session.type === 'complex' ? 'glass-card' : 'border-primary-container'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${session.type === 'fluency' ? 'bg-primary-fixed' : session.type === 'complex' ? 'bg-secondary' : session.type === 'checkin' ? 'bg-tertiary-fixed' : 'bg-surface-container-high'}`}>
                {session.type === 'fluency' && <Mic className="text-primary w-6 h-6" />}
                {session.type === 'complex' && <Brain className="text-white w-6 h-6" />}
                {session.type === 'checkin' && <CheckCircle className="text-on-tertiary-container w-6 h-6" />}
                {session.type === 'pitch' && <History className="text-secondary w-6 h-6" />}
              </div>
              <div>
                <h4 className="font-headline font-bold text-on-surface">{session.title}</h4>
                <p className="text-on-surface-variant text-xs">{session.date}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 mb-1">
                <span className="font-headline font-extrabold text-secondary">{session.score}</span>
                <span className="text-[10px] font-bold text-on-secondary-container bg-secondary-container px-1.5 rounded">PTS</span>
              </div>
              <p className="text-on-surface-variant text-xs font-medium">{session.duration}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <div className="relative h-48 rounded-xl overflow-hidden shadow-xl">
          <img alt="Coastal landscape" className="w-full h-full object-cover" src="https://picsum.photos/seed/ocean/800/400" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex flex-col justify-end p-6">
            <h4 className="text-white font-headline font-bold text-xl">Weekly Mastery Reward</h4>
            <p className="text-white/80 text-sm">You mastered "Soft Consonants" this week! Claim your badge.</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

const SimulatorPage = () => {
  const [goal, setGoal] = React.useState('');
  const [context, setContext] = React.useState('');
  const [duration, setDuration] = React.useState(60);
  const [script, setScript] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateScript(goal, context, duration);
      setScript(result || '');
    } catch (error) {
      alert("Failed to generate script. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-xl mx-auto"
    >
      <section className="mb-10 text-center md:text-left">
        <h2 className="font-headline text-4xl font-extrabold text-secondary mb-3 leading-tight">Meeting Simulator</h2>
        <p className="text-secondary opacity-80 text-lg max-w-md">Generate a polished script to practice and shadow your ideal delivery.</p>
      </section>

      <div className="bg-surface-container-low rounded-xl p-8 shadow-sm relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-container opacity-10 rounded-full blur-3xl"></div>
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-3">
            <label className="font-headline font-bold text-xs tracking-widest text-secondary/70 uppercase">COMMUNICATION GOAL *</label>
            <input 
              required
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-surface-container-lowest border-none rounded-lg p-5 text-secondary placeholder:text-secondary/40 focus:ring-2 focus:ring-primary-container transition-all" 
              placeholder="e.g., Pitch my startup to investors, Give a wedding toast..." 
              type="text"
            />
          </div>
          <div className="space-y-3">
            <label className="font-headline font-bold text-xs tracking-widest text-secondary/70 uppercase">CONTEXT & DETAILS</label>
            <textarea 
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full bg-surface-container-lowest border-none rounded-lg p-5 text-secondary placeholder:text-secondary/40 focus:ring-2 focus:ring-primary-container transition-all resize-none" 
              placeholder="Any additional context... audience, key messages, tone preferences..." 
              rows={5}
            ></textarea>
          </div>
          <div className="space-y-3">
            <label className="font-headline font-bold text-xs tracking-widest text-secondary/70 uppercase">TARGET DURATION (SECONDS)</label>
            <div className="relative">
              <input 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-surface-container-lowest border-none rounded-lg p-5 text-secondary focus:ring-2 focus:ring-primary-container transition-all" 
                type="number" 
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-secondary/50 font-semibold">SEC</span>
            </div>
          </div>
          <button 
            disabled={loading}
            className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold py-5 rounded-full flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 disabled:opacity-50" 
            type="submit"
          >
            <Sparkles className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} fill="currentColor" />
            {loading ? 'Generating...' : 'Generate Script'}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {script && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-8 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30"
          >
            <h3 className="font-headline font-bold text-secondary text-xl mb-4">Your Practice Script</h3>
            <div className="prose prose-teal max-w-none text-secondary/80 whitespace-pre-wrap font-body leading-relaxed">
              {script}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex items-start gap-4 p-6 bg-secondary-container/20 rounded-lg backdrop-blur-md">
        <Info className="text-secondary w-6 h-6 shrink-0" />
        <p className="text-sm text-secondary/80 leading-relaxed">
          <span className="font-bold">Pro Tip:</span> Mention your audience's technical level to get a script with the perfect amount of jargon or simplicity.
        </p>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [page, setPage] = React.useState<Page>('live');

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar currentPage={page} setPage={setPage} />
      
      <main className="ml-72 min-h-screen p-8 flex flex-col gap-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          {page === 'live' && <LiveSession key="live" />}
          {page === 'history' && <HistoryPage key="history" />}
          {page === 'simulator' && <SimulatorPage key="simulator" />}
        </AnimatePresence>
      </main>

      {/* Visual Background Accents */}
      <div className="fixed top-1/4 -left-20 w-64 h-64 bg-secondary-container opacity-20 rounded-full blur-[100px] -z-10"></div>
      <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-primary-container opacity-10 rounded-full blur-[120px] -z-10"></div>
    </div>
  );
}
