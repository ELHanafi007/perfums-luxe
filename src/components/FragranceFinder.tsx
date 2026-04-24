"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

const questions = [
  {
    id: 1,
    question: "How would you describe your ideal atmosphere?",
    options: [
      { label: "A morning walk in a dew-kissed garden", value: "Fresh" },
      { label: "An evening in a mysterious desert palace", value: "Oud" },
      { label: "A sophisticated library with leather chairs", value: "Woody" },
      { label: "A vibrant citrus grove in the Mediterranean", value: "Citrus" }
    ]
  },
  {
    id: 2,
    question: "Which of these notes appeals to you most?",
    options: [
      { label: "Delicate Rose & Jasmine", value: "Floral" },
      { label: "Warm Amber & Vanilla", value: "Amber" },
      { label: "Sharp Vetiver & Cedar", value: "Woody" },
      { label: "Zesty Lemon & Neroli", value: "Citrus" }
    ]
  }
];

export default function FragranceFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<typeof products[0] | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Simple logic to find a recommendation
      const recommended = products.find(p => 
        p.notes.some(n => newAnswers.includes(n)) || 
        p.description.toLowerCase().includes(newAnswers[0].toLowerCase())
      ) || products[0];
      setRecommendation(recommended);
      setStep(questions.length);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setRecommendation(null);
  };

  return (
    <Section id="fragrance-finder" className="bg-luxury-cream/20" size="xl">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold text-[11px] uppercase tracking-[0.5em] font-bold mb-4 block">The Alchemist&apos;s Guide</span>
          <h2 className="text-4xl md:text-5xl font-serif">Fragrance Finder</h2>
        </div>

        <div className="bg-white p-10 md:p-20 border border-gray-100 shadow-sm min-h-[500px] flex flex-col justify-center relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-cream/50 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {step < questions.length ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="relative z-10"
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8 font-bold">Step {step + 1} of {questions.length}</p>
                <h3 className="text-3xl md:text-4xl font-serif mb-12 italic leading-tight">{questions[step].question}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {questions[step].options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleAnswer(option.value)}
                      className="text-left p-6 border border-gray-100 hover:border-gold hover:bg-luxury-cream/10 transition-all duration-300 group"
                    >
                      <span className="text-sm font-light italic text-luxury-gray group-hover:text-luxury-black">{option.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center relative z-10"
              >
                <div className="flex justify-center mb-8">
                  <Sparkles className="text-gold w-12 h-12" strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-serif mb-4">Your Signature Essence</h3>
                <p className="text-luxury-gray font-light italic mb-12">Based on your preferences, we suggest starting your journey with:</p>
                
                <div className="max-w-xs mx-auto mb-16">
                  {recommendation && <ProductCard product={recommendation} />}
                </div>

                <button 
                  onClick={reset}
                  className="flex items-center gap-3 mx-auto text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 hover:text-gold transition-colors"
                >
                  <RotateCcw size={14} /> Retake the Guide
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
