'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Users, Sparkles, BarChart2, Clock, Check, Search, FileText, ShieldCheck, Award } from "lucide-react";
import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";

export default function Home() {
  const router = useRouter();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { user } = useUser();

  const handleStartRecruiting = () => {
    if (!user) router.push('/auth');
    else router.push('/dashboard');

  };

  useEffect(() => {
    if (user) {
      if (user.role === 'recruiter') {
        router.push('/dashboard');
      } else if (user.role === 'candidate') {
        router.push('/candidate/dashboard');
      }
    }
  }, [user, router]);

  const clientLogos = [
    { logo: "/clientLogos/tata.png" },
    { logo: "/clientLogos/techmahindra.png" },
    { logo: "/clientLogos/eeshanya.png" },
    { logo: "/clientLogos/hrh.jpeg" },
    { logo: "/clientLogos/google.png" },
  ];

  const testimonials = [
    {
      quote: "From intuitive front-end design to seamless backend integration, the site is a true showcase of full-stack excellence.",
      author: "Dhanshree",
      image: "/user Photos/Gen11.jpeg",
      role: "Full Stack Developer, GreatHire",
      avatar: "/avatar2.jpg"
    },
    {
      quote: "Built with security at its core, the site ensures robust protection against vulnerabilities while maintaining smooth performance.",
      author: "Sujeeth",
      image: "/user Photos/Gen17.jpg",
      role: "Information Security Analyst, GlobalSoft",
      avatar: "/avatar3.jpg"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: "AI Candidate Matching",
      description: "Advanced algorithms match candidates to your job requirements with unprecedented accuracy.",
      highlights: ["Skills analysis", "Culture fit scoring", "Experience matching"]
    },
    {
      icon: <FileText className="w-8 h-8 text-indigo-500" />,
      title: "Automated Screening",
      description: "Eliminate manual resume reviews with intelligent parsing and scoring of applications.",
      highlights: ["Resume parsing", "Keyword analysis", "Experience validation"]
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-purple-500" />,
      title: "Analytics Dashboard",
      description: "Real-time insights into your hiring pipeline and candidate quality metrics.",
      highlights: ["Time-to-hire tracking", "Source effectiveness", "Diversity metrics"]
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
      title: "Bias Reduction",
      description: "Minimize unconscious bias in your hiring process with structured evaluations.",
      highlights: ["Blind screening", "Structured interviews", "Diversity insights"]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
      title: "Candidate Engagement",
      description: "Automated messaging keeps candidates informed and engaged throughout the process.",
      highlights: ["Personalized emails", "Status updates", "Feedback collection"]
    },
    {
      icon: <Award className="w-8 h-8 text-red-500" />,
      title: "Employer Branding",
      description: "Showcase your company culture and values to attract top talent.",
      highlights: ["Custom career pages", "Team profiles", "Culture highlights"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b antialiased">
      {/* fullscreen background image (fixed, behind content) */}
      <div className="fixed inset-0 -z-10 pointer-events-none select-none">
        <Image
          src="/bg.svg"
          alt="Background Pattern"
          fill
          className="w-full h-full object-center object-fit rotate-90"
          priority
        />
      </div>
      <div className="container mx-auto px-6 lg:px-12 py-20">
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-card backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <Image src={'/logo1.png'} width={150} height={100} alt="logo" className="rounded-sm" />
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-medium text-ring">AI-Powered</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              Smarter Hiring, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Powered by AI</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-xl">
              Transform your recruitment with intelligent matching, automated screening, and data-driven insights that deliver <span className="font-semibold text-blue-600">better candidates faster</span>.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <Button size="lg" variant="default" onClick={handleStartRecruiting} className="flex items-center gap-2 shadow-md">
                {user ? 'Dashboard' : 'Get Started'}
                <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* client logos */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {clientLogos.map((c, i) => (
                <div key={i} className="h-10 w-24 flex items-center justify-center bg-white rounded shadow-sm border border-gray-100">
                  <img src={c.logo} alt={`client-${i}`} className="object-contain h-6" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border  bg-gradient-to-br p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Dashboard snapshot</h3>
                    <p className="mt-2 text-sm text-blue-100/90">Real-time metrics & candidate insights</p>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <div className="bg-white/10 rounded-lg p-3 w-1/3 text-center">
                      <div className="text-xl font-semibold">85%</div>
                      <div className="text-xs opacity-80">Time saved</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 w-1/3 text-center">
                      <div className="text-xl font-semibold">3.2x</div>
                      <div className="text-xs opacity-80">Matches</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 w-1/3 text-center">
                      <div className="text-xl font-semibold">95%</div>
                      <div className="text-xs opacity-80">Accuracy</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-card shadow-sm border border-gray-100">
                  <div className="text-sm font-medium text-slate-700">Latest candidate</div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-600 font-semibold">A</div>
                    <div>
                      <div className="font-semibold">Alex Johnson</div>
                      <div className="text-xs text-muted-foreground">Frontend developer</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-chart-5 shadow-2xs border border-gray-100">
                  <div className="text-sm font-medium text-slate-700">Upcoming interview</div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">UI Engineer</div>
                      <div className="text-xs text-muted-foreground">Tomorrow, 10:00 AM</div>
                    </div>
                    <div className="text-sm text-slate-500">2 candidates</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-white shadow-sm border border-gray-100">
                  <div className="text-sm font-medium text-slate-700">Live insights</div>
                  <div className="mt-3 text-sm text-muted-foreground">Candidate engagement & scorecards updating in real-time.</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-gradient-to-br from-blue-200 to-indigo-300 opacity-40 blur-2xl pointer-events-none"></div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden border border-gray-100 p-6 bg-card/40 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${feature.bg}`}>
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="w-full max-w-5xl mx-auto mt-20 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-gradient-to-br from-blue-950 to-indigo-600 p-10 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4">Trusted by HR Teams Worldwide</h2>
              <p className="text-blue-100 mb-6">Join thousands of companies who have transformed their hiring with TalentAI</p>
              <div className="flex flex-wrap gap-4">
                {clientLogos.map((client, i) => (
                  <div key={i} className="h-12 w-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <img src={client.logo} alt={`Client Logo ${i + 1}`} width={48} height={48} className="object-contain" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8">
              <div className="relative h-full min-h-[220px] flex flex-col justify-center">
                <div className="mb-6 text-2xl font-semibold text-slate-800 leading-relaxed">
                  “{testimonials[currentTestimonial].quote}”
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                    {testimonials[currentTestimonial].image ? (
                      <Image
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].author}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-blue-600 font-semibold">{testimonials[currentTestimonial].author.charAt(0)}</div>
                    )}
                  </div>

                  <div>
                    <div className="font-semibold text-slate-900">{testimonials[currentTestimonial].author}</div>
                    <div className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>

                <div className="absolute bottom-4 right-6 flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      aria-label={`testimonial-${i}`}
                      className={`w-3 h-3 rounded-full ${currentTestimonial === i ? 'bg-white' : 'bg-white/40'} transition`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}