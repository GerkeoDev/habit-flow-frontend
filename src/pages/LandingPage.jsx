import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Flame, TrendingUp, Calendar, BrainCircuit, Sparkles, ArrowRight, CheckCircle2, BarChart3, Target } from "lucide-react"
import HeaderCmp from "../components/layout/HeaderCmp"

const features = [
  {
    icon: Flame,
    title: "Streak Tracking",
    desc: "Automatic streak calculation keeps you motivated day after day"
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    desc: "Visual insights into your habit completion rates and trends"
  },
  {
    icon: Calendar,
    title: "Daily Check-ins",
    desc: "Simple one-tap check-ins to mark your daily progress"
  },
  {
    icon: BrainCircuit,
    title: "Smart Reminders",
    desc: "Never miss a day with intelligent notifications"
  },
  {
    icon: BarChart3,
    title: "Detailed History",
    desc: "Complete history view with completion timelines"
  },
  {
    icon: Target,
    title: "Goal Setting",
    desc: "Set and achieve your personal habit goals"
  }
]

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <HeaderCmp />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-4 pt-32 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Build Habits That Stick
            </span>{" "}
            🔥
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Track your daily habits, build streaks, and transform your routine. Simple, beautiful, and effective.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/account"
              className="bg-white text-black rounded-xl py-3 px-6 font-semibold hover:opacity-90 transition-all duration-200 shadow-lg shadow-white/10"
            >
              Get Started Free
            </Link>
            <Link
              to="#features"
              className="border border-white/10 text-white rounded-xl py-3 px-6 font-semibold hover:bg-white/5 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-zinc-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No credit card required. Free forever.</span>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to build better habits
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Powerful tools to help you stay consistent and achieve your goals.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[#181825] border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:border-white/20 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-20 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          <div className="flex-1 text-center">
            <p className="text-4xl font-bold">10K+</p>
            <p className="text-sm text-zinc-400 mt-1">Habits Tracked</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div className="flex-1 text-center">
            <p className="text-4xl font-bold">500+</p>
            <p className="text-sm text-zinc-400 mt-1">Active Users</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div className="flex-1 text-center">
            <p className="text-4xl font-bold">93%</p>
            <p className="text-sm text-zinc-400 mt-1">Streak Rate</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-12 text-center"
        >
          <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your habits?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Join hundreds of users who are building better habits every day.
          </p>
          <Link
            to="/account"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white rounded-xl py-3 px-8 font-semibold hover:bg-emerald-600 transition-all duration-200"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <p className="text-center text-sm text-zinc-500">
          &copy; 2026 HabitFlow. Built with ❤️
        </p>
      </footer>
    </div>
  )
}

export default LandingPage
