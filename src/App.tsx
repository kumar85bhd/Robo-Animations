/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import RobotAnimation, { RobotVariant, RobotModel } from './components/RobotAnimation';
import { Settings2, Palette, Activity, Cpu } from 'lucide-react';

const VARIANTS: RobotVariant[] = [
  'idle', 'blinking', 'talking', 'scanning', 'charging'
];

const MODELS: RobotModel[] = ['premium', 'mascot', 'classic'];

const COLORS = ['indigo', 'fuchsia', 'emerald', 'orange', 'red', 'blue', 'pink'];

export default function App() {
  const [variant, setVariant] = useState<RobotVariant>('idle');
  const [color, setColor] = useState<string>('indigo');
  const [scale, setScale] = useState<number>(0.8);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <Activity className="w-5 h-5 text-indigo-400" />
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-white">Robot Animator Comparison</h1>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          
          {/* Controls Panel */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl flex flex-wrap items-end gap-8">
            {/* Variant Selection */}
            <div className="space-y-3 flex-1 min-w-[300px]">
              <label className="text-sm font-medium text-slate-400 block">
                Behavior Variant
              </label>
              <div className="flex flex-wrap gap-2">
                {VARIANTS.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize border ${
                      variant === v 
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                        : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Aura & Accent Color
              </label>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-8 h-8 rounded-full transition-all duration-200 border-2 ${
                      color === c ? 'scale-110 border-white shadow-lg' : 'border-transparent hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: 
                        c === 'indigo' ? '#6366f1' : 
                        c === 'fuchsia' ? '#d946ef' : 
                        c === 'emerald' ? '#10b981' : 
                        c === 'orange' ? '#f97316' : 
                        c === 'red' ? '#ef4444' :
                        c === 'blue' ? '#3b82f6' : '#ec4899'
                    }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            {/* Scale Slider */}
            <div className="space-y-3 w-48">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-400">
                  Scale
                </label>
                <span className="text-xs text-slate-500 font-mono">{scale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          {/* Comparison Area */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MODELS.map((m) => (
              <div key={m} className="flex flex-col gap-4">
                <div className="bg-slate-900/50 rounded-3xl border border-slate-800 h-[500px] flex items-center justify-center relative overflow-hidden shadow-2xl">
                  {/* Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                  
                  {/* Radial Gradient for depth */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_50%_50%,transparent_0%,#020617_100%)]" />

                  {/* Floor reflection/shadow */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/40 blur-xl rounded-full" />

                  {/* The Robot */}
                  <div className="relative z-10">
                    <RobotAnimation variant={variant} color={color} scale={scale} model={m} />
                  </div>

                  {/* Status Overlay */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-950/80 backdrop-blur-sm border border-slate-800 px-3 py-1 rounded-full">
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${variant === 'alert' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider">
                      {m}
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-white capitalize">{m} Model</h3>
                  <p className="text-sm text-slate-400">
                    {m === 'premium' ? 'Articulated & High Fidelity' : m === 'mascot' ? 'Friendly & Floating' : 'Classic UI Style'}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
