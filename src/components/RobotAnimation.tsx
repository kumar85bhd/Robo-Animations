import React from 'react';
import { motion } from 'framer-motion';

export type RobotVariant = 'idle' | 'blinking' | 'talking' | 'scanning' | 'glitch' | 'wave' | 'hover' | 'hologram' | 'charging' | 'alert' | 'walking' | 'dancing';
export type RobotModel = 'premium' | 'mascot' | 'classic';

interface RobotAnimationProps {
  scale?: number;
  className?: string;
  color?: string;
  variant?: RobotVariant;
  model?: RobotModel;
}

const RobotAnimation: React.FC<RobotAnimationProps> = ({
  scale = 1,
  className = '',
  color = 'indigo',
  variant = 'idle',
  model = 'premium'
}) => {
  // Color mapping
  const getColorStyles = (color: string) => {
    const styles: Record<string, any> = {
      'indigo': {
        aura: 'bg-indigo-500/20',
        eye: 'bg-cyan-400',
        eyeShadow: 'shadow-[0_0_15px_rgba(34,211,238,0.8)]',
        chest: 'bg-cyan-400',
        chestShadow: 'shadow-[0_0_20px_rgba(34,211,238,0.8)]',
        beam: 'bg-cyan-400/50',
        antenna: 'bg-cyan-400',
      },
      'fuchsia': {
        aura: 'bg-fuchsia-500/20',
        eye: 'bg-fuchsia-400',
        eyeShadow: 'shadow-[0_0_15px_rgba(232,121,249,0.8)]',
        chest: 'bg-fuchsia-400',
        chestShadow: 'shadow-[0_0_20px_rgba(232,121,249,0.8)]',
        beam: 'bg-fuchsia-400/50',
        antenna: 'bg-fuchsia-400',
      },
      'emerald': {
        aura: 'bg-emerald-500/20',
        eye: 'bg-emerald-400',
        eyeShadow: 'shadow-[0_0_15px_rgba(52,211,153,0.8)]',
        chest: 'bg-emerald-400',
        chestShadow: 'shadow-[0_0_20px_rgba(52,211,153,0.8)]',
        beam: 'bg-emerald-400/50',
        antenna: 'bg-emerald-400',
      },
      'orange': {
        aura: 'bg-orange-500/20',
        eye: 'bg-orange-400',
        eyeShadow: 'shadow-[0_0_15px_rgba(251,146,60,0.8)]',
        chest: 'bg-orange-400',
        chestShadow: 'shadow-[0_0_20px_rgba(251,146,60,0.8)]',
        beam: 'bg-orange-400/50',
        antenna: 'bg-orange-400',
      },
      'blue': {
        aura: 'bg-blue-500/20',
        eye: 'bg-blue-400',
        eyeShadow: 'shadow-[0_0_15px_rgba(96,165,250,0.8)]',
        chest: 'bg-blue-400',
        chestShadow: 'shadow-[0_0_20px_rgba(96,165,250,0.8)]',
        beam: 'bg-blue-400/50',
        antenna: 'bg-blue-400',
      },
      'pink': {
        aura: 'bg-pink-500/20',
        eye: 'bg-pink-400',
        eyeShadow: 'shadow-[0_0_15px_rgba(244,114,182,0.8)]',
        chest: 'bg-pink-400',
        chestShadow: 'shadow-[0_0_20px_rgba(244,114,182,0.8)]',
        beam: 'bg-pink-400/50',
        antenna: 'bg-pink-400',
      }
    };
    if (variant === 'alert') return styles['red'];
    return styles[color] || styles['indigo'];
  };

  const styles = getColorStyles(color);

  // Helper for classic model border-based eyes
  const getClassicEyeStyles = (color: string) => {
    const styles: Record<string, string> = {
      'indigo': 'border-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]',
      'fuchsia': 'border-fuchsia-400 drop-shadow-[0_0_10px_rgba(232,121,249,0.8)]',
      'emerald': 'border-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]',
      'orange': 'border-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]',
      'red': 'border-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]',
      'blue': 'border-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]',
      'pink': 'border-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]',
    };
    return styles[color] || styles['indigo'];
  };

  const classicEyeStyle = getClassicEyeStyles(color);

  // Animations
  const getEyeAnimation = () => {
    switch (variant) {
      case 'blinking':
        return { scaleY: [1, 0.1, 1], transition: { duration: 0.15, repeat: Infinity, repeatDelay: 1.5 } };
      case 'scanning':
        return { opacity: [0.4, 1, 0.4], transition: { duration: 0.8, repeat: Infinity } };
      case 'alert':
        return { scaleY: [1, 0.6, 1], transition: { duration: 0.4, repeat: Infinity } };
      case 'glitch':
        return { scaleY: [1, 0.1, 1, 0.8, 1], opacity: [1, 0.5, 1, 0.8, 1], transition: { duration: 0.4, repeat: Infinity, repeatType: "mirror" } };
      default:
        // Random blinking effect
        return { scaleY: [1, 1, 0.1, 1, 1], transition: { duration: 4, times: [0, 0.95, 0.97, 1, 1], repeat: Infinity } };
    }
  };

  const getMouthAnimation = () => {
    switch (variant) {
      case 'talking':
        return { height: [4, 14, 6, 10, 4], width: [20, 24, 18, 22, 20], transition: { duration: 0.6, repeat: Infinity } };
      case 'alert':
        return { height: 12, width: 28, borderRadius: '12px', transition: { duration: 0.2 } };
      case 'scanning':
        return { height: 2, width: 10, transition: { duration: 0.3 } };
      default:
        return { height: 4, width: 16, transition: { duration: 0.2 } };
    }
  };

  const getHeadAnimation = () => {
    switch (variant) {
      case 'scanning':
        return { rotate: [-15, 15, -15], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } };
      case 'alert':
        return { rotate: [-5, 5, -5], transition: { duration: 0.5, repeat: Infinity } };
      case 'glitch':
        return { x: [-2, 2, -1, 1, 0], transition: { duration: 0.2, repeat: Infinity } };
      case 'talking':
        return { rotate: [-2, 2, -2], y: [-1, 1, -1], transition: { duration: 2, repeat: Infinity } };
      case 'walking':
        return { rotate: [-3, 3, -3], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } };
      case 'dancing':
        return { rotate: [-10, 10, -10], transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" } };
      default:
        // Slight head tilt
        return { rotate: [-2, 2, -2], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" } };
    }
  };

  const getBodyAnimation = () => {
    switch (variant) {
      case 'hover':
        return { y: [-15, 15, -15], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } };
      case 'alert':
        return { y: [-2, 2, -2], transition: { duration: 0.2, repeat: Infinity } };
      case 'glitch':
        return { x: [-3, 3, -2, 2, 0], y: [-1, 1, -2, 2, 0], transition: { duration: 0.2, repeat: Infinity } };
      case 'walking':
        return { y: [-8, 0, -8], rotate: [-2, 2, -2], transition: { duration: 0.5, repeat: Infinity } };
      case 'dancing':
        return { y: [-15, 0, -15], rotate: [-5, 5, -5], transition: { duration: 0.4, repeat: Infinity } };
      case 'charging':
        return { y: [-2, 2, -2], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } };
      default:
        // Subtle float
        return { y: [-4, 4, -4], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } };
    }
  };

  const getLeftShoulderAnimation = () => {
    switch (variant) {
      case 'wave':
        return { rotate: [0, -130, -130, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } };
      case 'walking':
        return { rotate: [30, -30, 30], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } };
      case 'dancing':
        return { rotate: [0, -150, 0], transition: { duration: 0.8, repeat: Infinity } };
      case 'alert':
        return { rotate: -140, transition: { duration: 0.2 } };
      case 'charging':
        return { rotate: 20, transition: { duration: 0.5 } };
      default:
        return { rotate: 10, transition: { duration: 1 } };
    }
  };

  const getLeftElbowAnimation = () => {
    switch (variant) {
      case 'wave':
        return { rotate: [0, -20, -80, -20, -80, -20, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } };
      case 'walking':
        return { rotate: [-10, -40, -10], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } };
      case 'dancing':
        return { rotate: [0, -60, 0], transition: { duration: 0.8, repeat: Infinity } };
      case 'alert':
        return { rotate: -40, transition: { duration: 0.2 } };
      case 'charging':
        return { rotate: -30, transition: { duration: 0.5 } };
      default:
        return { rotate: -10, transition: { duration: 1 } };
    }
  };

  const getRightShoulderAnimation = () => {
    switch (variant) {
      case 'walking':
        return { rotate: [-30, 30, -30], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } };
      case 'dancing':
        return { rotate: [0, 150, 0], transition: { duration: 0.8, repeat: Infinity, delay: 0.4 } };
      case 'alert':
        return { rotate: 140, transition: { duration: 0.2 } };
      case 'charging':
        return { rotate: -20, transition: { duration: 0.5 } };
      default:
        return { rotate: -10, transition: { duration: 1 } };
    }
  };

  const getRightElbowAnimation = () => {
    switch (variant) {
      case 'walking':
        return { rotate: [10, 40, 10], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } };
      case 'dancing':
        return { rotate: [0, 60, 0], transition: { duration: 0.8, repeat: Infinity, delay: 0.4 } };
      case 'alert':
        return { rotate: 40, transition: { duration: 0.2 } };
      case 'charging':
        return { rotate: 30, transition: { duration: 0.5 } };
      default:
        return { rotate: 10, transition: { duration: 1 } };
    }
  };

  const getLeftLegAnimation = () => {
    switch (variant) {
      case 'walking':
        return { rotate: [-30, 30, -30], y: [0, -15, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } };
      case 'dancing':
        return { rotate: [0, -45, 0], y: [0, -20, 0], transition: { duration: 0.6, repeat: Infinity } };
      case 'hover':
        return { rotate: 15, y: 15, transition: { duration: 1 } };
      default:
        return { rotate: 0, y: 0, transition: { duration: 0.5 } };
    }
  };

  const getLeftKneeAnimation = () => {
    switch (variant) {
      case 'walking':
        return { rotate: [0, 40, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } };
      case 'dancing':
        return { rotate: [0, 60, 0], transition: { duration: 0.6, repeat: Infinity } };
      case 'hover':
        return { rotate: 20, transition: { duration: 1 } };
      default:
        return { rotate: 0, transition: { duration: 0.5 } };
    }
  };

  const getRightLegAnimation = () => {
    switch (variant) {
      case 'walking':
        return { rotate: [30, -30, 30], y: [-15, 0, -15], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } };
      case 'dancing':
        return { rotate: [0, 45, 0], y: [0, -20, 0], transition: { duration: 0.6, repeat: Infinity, delay: 0.3 } };
      case 'hover':
        return { rotate: -15, y: 15, transition: { duration: 1 } };
      default:
        return { rotate: 0, y: 0, transition: { duration: 0.5 } };
    }
  };

  const getRightKneeAnimation = () => {
    switch (variant) {
      case 'walking':
        return { rotate: [40, 0, 40], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } };
      case 'dancing':
        return { rotate: [0, 60, 0], transition: { duration: 0.6, repeat: Infinity, delay: 0.3 } };
      case 'hover':
        return { rotate: -20, transition: { duration: 1 } };
      default:
        return { rotate: 0, transition: { duration: 0.5 } };
    }
  };

  const getChestAnimation = () => {
    switch (variant) {
      case 'charging':
        return { scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } };
      case 'alert':
        return { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8], transition: { duration: 0.3, repeat: Infinity } };
      case 'glitch':
        return { opacity: [1, 0, 1, 0.5, 1], transition: { duration: 0.5, repeat: Infinity } };
      default:
        return { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } };
    }
  };

  const getAntennaAnimation = () => {
    switch (variant) {
      case 'alert':
        return { opacity: [0, 1, 0], scale: [1, 1.5, 1], transition: { duration: 0.3, repeat: Infinity } };
      case 'talking':
        return { opacity: [0.5, 1, 0.5], transition: { duration: 0.2, repeat: Infinity } };
      case 'charging':
        return { opacity: [0.2, 1, 0.2], transition: { duration: 1, repeat: Infinity } };
      case 'glitch':
        return { opacity: [1, 0, 1], transition: { duration: 0.1, repeat: Infinity } };
      default:
        return { opacity: [0.4, 1, 0.4], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } };
    }
  };

  const isHologram = variant === 'hologram';

  if (model === 'mascot') {
    const getMascotBodyAnimation = () => {
      if (variant === "hover" || variant === "hologram") {
        return {
          y: [-15, 15, -15],
          transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        };
      }
      return {
        y: [-8, 8, -8],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      };
    };

    const getMascotWaveAnimation = () => {
      if (variant === "wave") {
        return {
          rotate: [0, 30, -10, 30, 0],
          transition: { duration: 1.2, repeat: Infinity }
        };
      }
      return {};
    };

    return (
      <div className={`flex items-center justify-center relative ${className}`}>
        {/* Aura Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute w-64 h-64 rounded-full blur-[70px] ${styles.aura}`}
        />

        <motion.div
          animate={getMascotBodyAnimation()}
          style={{ transform: `scale(${scale})` }}
          className={`relative flex flex-col items-center ${isHologram ? 'mix-blend-screen opacity-70' : ''}`}
        >
          {isHologram && (
            <motion.div 
              animate={{ opacity: [0, 0.15, 0], y: [-150, 150] }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-cyan-400/20 z-50 pointer-events-none rounded-full"
              style={{ mixBlendMode: 'overlay' }}
            />
          )}

          {/* Head */}
          <div className="relative w-44 h-36 bg-gradient-to-b from-slate-100 to-slate-300 rounded-[2.5rem] shadow-xl flex items-center justify-center z-30 border border-white/40">
            {/* Screen */}
            <div className="w-[86%] h-[82%] bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center border-2 border-slate-700/50 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[55%] bg-gradient-to-b from-white/10 to-transparent rounded-b-[100%] pointer-events-none" />
              
              {/* Eyes */}
              <div className="flex gap-6 mb-3">
                <motion.div
                  animate={getEyeAnimation()}
                  className={`w-7 h-4 rounded-full ${styles.eye} ${styles.eyeShadow}`}
                />
                <motion.div
                  animate={getEyeAnimation()}
                  className={`w-7 h-4 rounded-full ${styles.eye} ${styles.eyeShadow}`}
                />
              </div>

              {/* Scanning Beam */}
              {variant === 'scanning' && (
                <motion.div
                  animate={{ x: [-50, 50, -50] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className={`absolute w-6 h-full ${styles.beam} blur-md top-0`}
                />
              )}

              {/* Mouth */}
              <motion.div
                animate={getMouthAnimation()}
                className={`rounded-full opacity-90 ${styles.eye} ${styles.eyeShadow}`}
              />
            </div>
          </div>

          {/* Body */}
          <div className="w-32 h-28 bg-gradient-to-b from-slate-200 to-slate-400 rounded-[50%] shadow-lg -mt-4 flex items-center justify-center z-20 border border-slate-300">
            {/* Reactor */}
            <motion.div
              animate={getChestAnimation()}
              className={`w-8 h-8 rounded-full ${styles.chest} ${styles.chestShadow}`}
            />
          </div>

          {/* Arms */}
          <div className="absolute flex justify-between w-56 top-32 z-10">
            <motion.div
              animate={getMascotWaveAnimation()}
              style={{ transformOrigin: "top center" }}
              className="w-6 h-20 bg-gradient-to-b from-slate-200 to-slate-400 rounded-full shadow border border-slate-300"
            />
            <motion.div 
              animate={variant === 'dancing' ? { rotate: [0, -30, 0], y: [0, -10, 0] } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="w-6 h-20 bg-gradient-to-b from-slate-200 to-slate-400 rounded-full shadow border border-slate-300" 
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (model === 'classic') {
    return (
      <div className={`flex items-center justify-center relative ${className}`}>
        {/* Glowing Aura */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute w-56 h-56 rounded-full blur-[50px] ${styles.aura}`}
        />

        {/* Robot Composition */}  
        <motion.div   
          animate={getBodyAnimation()}  
          className={`relative w-56 h-56 flex items-center justify-center ${isHologram ? 'mix-blend-screen' : ''}`}  
        >  
          {/* Robot Character */}  
          <div className="relative z-10 flex flex-col items-center transform" style={{ transform: `scale(${scale})` }}>  
            {/* Head */}  
            <div className="relative w-40 h-32 bg-gradient-to-b from-slate-100 to-slate-300 rounded-[2.5rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] border border-slate-100 flex items-center justify-center z-20">  
              {/* Face Screen */}  
              <div className="w-[88%] h-[82%] bg-slate-950 rounded-[2rem] relative overflow-hidden shadow-inner flex flex-col items-center justify-center border border-slate-800">  
                {/* Screen Gloss */}  
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-b-full opacity-50" />  
                  
                {/* Eyes */}  
                <div className="flex gap-6 mb-2">  
                  <motion.div   
                    initial={{ scaleY: 0.1 }}  
                    animate={getEyeAnimation()}  
                    className={`w-8 h-4 border-t-[5px] rounded-t-full ${classicEyeStyle}`}  
                  />  
                  <motion.div   
                    initial={{ scaleY: 0.1 }}  
                    animate={getEyeAnimation()}  
                    className={`w-8 h-4 border-t-[5px] rounded-t-full ${classicEyeStyle}`}  
                  />  
                </div>  
                  
                {/* Scanning Beam (Only for scanning variant) */}  
                {variant === 'scanning' && (  
                  <motion.div  
                    animate={{ x: [-60, 60, -60] }}  
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}  
                    className="absolute w-2 h-full bg-cyan-400/50 blur-md top-0"  
                  />  
                )}  

                {/* Smile */}  
                <motion.div   
                    animate={getMouthAnimation()}  
                    className={`w-4 h-2 border-b-[3px] rounded-b-full opacity-80 border-cyan-400`}  
                />  
              </div>  

              {/* Ears */}  
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-16 bg-gradient-to-r from-slate-300 to-slate-100 rounded-2xl shadow-md -z-10 border-l border-slate-300" />  
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-16 bg-gradient-to-l from-slate-300 to-slate-100 rounded-2xl shadow-md -z-10 border-r border-slate-300" />  
            </div>  

            {/* Body */}  
            <div className="relative -mt-4 w-28 h-20 bg-gradient-to-b from-slate-200 to-slate-400 rounded-[2rem] shadow-xl z-10 flex items-center justify-center border-t border-slate-300">  
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600">  
                  <motion.div   
                    animate={getChestAnimation()}  
                    className={`w-4 h-4 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] ${variant !== 'charging' ? 'animate-pulse' : ''} ${styles.chest}`}   
                  />  
              </div>  
            </div>  
          </div>  
        </motion.div>  
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center relative ${className}`}>
      {/* Glowing Aura */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute w-[300px] h-[300px] rounded-full blur-[80px] ${styles.aura} ${isHologram ? 'animate-pulse' : ''}`}
      />

      {/* Robot Composition */}
      <motion.div
        animate={getBodyAnimation()}
        className={`relative flex items-center justify-center ${isHologram ? 'mix-blend-screen opacity-70' : ''}`}
        style={{ transform: `scale(${scale})` }}
      >
        {isHologram && (
          <motion.div 
            animate={{ opacity: [0, 0.15, 0], y: [-150, 150] }} 
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-cyan-400/20 z-50 pointer-events-none rounded-full"
            style={{ mixBlendMode: 'overlay' }}
          />
        )}

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Head & Neck Group */}
          <motion.div animate={getHeadAnimation()} className="flex flex-col items-center z-30 origin-bottom">
            
            {/* Antenna */}
            <div className="relative flex flex-col items-center -mb-1 z-0">
              <motion.div 
                animate={getAntennaAnimation()}
                className={`w-4 h-4 rounded-full ${styles.antenna} shadow-[0_0_15px_currentColor] z-10`}
              />
              <div className="w-1.5 h-6 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full -mt-1" />
              <div className="w-6 h-3 bg-slate-400 rounded-t-full -mt-1 border border-slate-500 shadow-inner" />
            </div>

            {/* Head Casing */}
            <div className="relative w-40 h-32 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 rounded-[2.5rem] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] border border-white/40 flex items-center justify-center z-30">
              
              {/* Face Screen */}
              <div className="w-[86%] h-[82%] bg-slate-900 rounded-[2rem] relative overflow-hidden shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center border-2 border-slate-700/50">
                {/* Screen Gloss */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[55%] bg-gradient-to-b from-white/15 to-transparent rounded-b-[100%] pointer-events-none" />
                
                {/* Eyes */}
                <div className="flex gap-6 mb-3">
                  <motion.div
                    animate={getEyeAnimation()}
                    className={`w-7 h-4 rounded-full ${styles.eye} ${styles.eyeShadow}`}
                  />
                  <motion.div
                    animate={getEyeAnimation()}
                    className={`w-7 h-4 rounded-full ${styles.eye} ${styles.eyeShadow}`}
                  />
                </div>

                {/* Scanning Beam */}
                {variant === 'scanning' && (
                  <motion.div
                    animate={{ x: [-60, 60, -60] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className={`absolute w-6 h-full ${styles.beam} blur-md top-0`}
                  />
                )}

                {/* Mouth */}
                <motion.div
                  animate={getMouthAnimation()}
                  className={`rounded-full opacity-90 ${styles.eye} ${styles.eyeShadow}`}
                />
              </div>

              {/* Ears/Side Modules */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-14 bg-gradient-to-r from-slate-400 to-slate-200 rounded-l-xl shadow-[-4px_0_10px_rgba(0,0,0,0.2)] -z-10 border border-slate-300 flex items-center justify-center">
                <div className="w-1 h-6 bg-slate-500 rounded-full opacity-50" />
              </div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-14 bg-gradient-to-l from-slate-400 to-slate-200 rounded-r-xl shadow-[4px_0_10px_rgba(0,0,0,0.2)] -z-10 border border-slate-300 flex items-center justify-center">
                <div className="w-1 h-6 bg-slate-500 rounded-full opacity-50" />
              </div>
            </div>

            {/* Neck Connector */}
            <div className="w-12 h-6 bg-gradient-to-b from-slate-700 to-slate-900 z-20 -mt-2 border-x-2 border-slate-950 flex flex-col justify-evenly items-center py-1">
              <div className="w-10 h-0.5 bg-slate-500/50 rounded-full" />
              <div className="w-10 h-0.5 bg-slate-500/50 rounded-full" />
            </div>
          </motion.div>

          {/* Body Container (for arms and torso) */}
          <div className="relative z-20 flex justify-center -mt-2">
            
            {/* Left Arm */}
            <motion.div 
              animate={getLeftShoulderAnimation()}
              style={{ originX: 0.8, originY: 0.15 }}
              className="absolute -left-16 top-2 flex flex-col items-center z-10"
            >
              {/* Shoulder Joint */}
              <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-400 rounded-full shadow-lg border-2 border-slate-300 z-20 flex items-center justify-center">
                <div className="w-6 h-6 bg-slate-600 rounded-full shadow-inner border border-slate-800" />
              </div>
              
              {/* Upper Arm */}
              <div className="w-7 h-14 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full -mt-3 z-10 border border-slate-400/50 shadow-inner" />
              
              {/* Elbow & Lower Arm Group */}
              <motion.div 
                animate={getLeftElbowAnimation()}
                style={{ originX: 0.5, originY: 0.15 }}
                className="flex flex-col items-center -mt-3 z-20"
              >
                {/* Elbow Joint */}
                <div className="w-9 h-9 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full shadow-md border border-slate-800 flex items-center justify-center">
                  <div className="w-3 h-3 bg-slate-400 rounded-full" />
                </div>
                
                {/* Lower Arm */}
                <div className="w-6 h-14 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full -mt-2 z-10 border border-slate-500/50" />
                
                {/* Hand/Fingers */}
                <div className="w-10 h-10 bg-gradient-to-b from-slate-600 to-slate-800 rounded-t-full rounded-b-xl -mt-2 flex justify-center gap-1.5 pt-5 border border-slate-700 shadow-lg">
                  <div className="w-2.5 h-5 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full shadow-sm" />
                  <div className="w-2.5 h-6 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full shadow-sm" />
                  <div className="w-2.5 h-5 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full shadow-sm" />
                </div>
              </motion.div>
            </motion.div>

            {/* Torso */}
            <div className="relative w-36 h-40 bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] z-20 flex flex-col items-center py-5 border border-white/50">
              
              {/* Chest Plate / Reactor Core */}
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-300 shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] mb-3 relative overflow-hidden">
                <div className="absolute inset-0 border-2 border-slate-600 rounded-full m-2" />
                <motion.div
                  animate={getChestAnimation()}
                  className={`w-10 h-10 rounded-full ${styles.chest} ${styles.chestShadow} blur-[2px]`}
                />
                <motion.div
                  animate={getChestAnimation()}
                  className="absolute w-6 h-6 bg-white rounded-full blur-[1px] opacity-80"
                />
              </div>
              
              {/* Torso Details */}
              <div className="flex gap-3 mt-1">
                <div className="w-5 h-2.5 bg-slate-700 rounded-full shadow-inner border border-slate-800" />
                <div className="w-5 h-2.5 bg-slate-700 rounded-full shadow-inner border border-slate-800" />
                <div className="w-5 h-2.5 bg-slate-700 rounded-full shadow-inner border border-slate-800" />
              </div>
              
              <div className="w-20 h-1.5 bg-slate-400 rounded-full mt-4 shadow-inner opacity-50" />
              <div className="w-16 h-1.5 bg-slate-400 rounded-full mt-1.5 shadow-inner opacity-50" />
            </div>

            {/* Right Arm */}
            <motion.div 
              animate={getRightShoulderAnimation()}
              style={{ originX: 0.2, originY: 0.15 }}
              className="absolute -right-16 top-2 flex flex-col items-center z-10"
            >
              {/* Shoulder Joint */}
              <div className="w-12 h-12 bg-gradient-to-bl from-slate-200 to-slate-400 rounded-full shadow-lg border-2 border-slate-300 z-20 flex items-center justify-center">
                <div className="w-6 h-6 bg-slate-600 rounded-full shadow-inner border border-slate-800" />
              </div>
              
              {/* Upper Arm */}
              <div className="w-7 h-14 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full -mt-3 z-10 border border-slate-400/50 shadow-inner" />
              
              {/* Elbow & Lower Arm Group */}
              <motion.div 
                animate={getRightElbowAnimation()}
                style={{ originX: 0.5, originY: 0.15 }}
                className="flex flex-col items-center -mt-3 z-20"
              >
                {/* Elbow Joint */}
                <div className="w-9 h-9 bg-gradient-to-bl from-slate-500 to-slate-700 rounded-full shadow-md border border-slate-800 flex items-center justify-center">
                  <div className="w-3 h-3 bg-slate-400 rounded-full" />
                </div>
                
                {/* Lower Arm */}
                <div className="w-6 h-14 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full -mt-2 z-10 border border-slate-500/50" />
                
                {/* Hand/Fingers */}
                <div className="w-10 h-10 bg-gradient-to-b from-slate-600 to-slate-800 rounded-t-full rounded-b-xl -mt-2 flex justify-center gap-1.5 pt-5 border border-slate-700 shadow-lg">
                  <div className="w-2.5 h-5 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full shadow-sm" />
                  <div className="w-2.5 h-6 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full shadow-sm" />
                  <div className="w-2.5 h-5 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full shadow-sm" />
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Hip Connector */}
          <div className="w-24 h-12 bg-gradient-to-b from-slate-600 to-slate-800 rounded-b-[2rem] z-10 -mt-3 border-x-2 border-b-2 border-slate-900 flex justify-center gap-6 pt-3 shadow-inner">
            <div className="w-5 h-5 bg-slate-900 rounded-full shadow-inner" />
            <div className="w-5 h-5 bg-slate-900 rounded-full shadow-inner" />
          </div>

          {/* Legs Container */}
          <div className="flex gap-8 -mt-4 z-0">
            
            {/* Left Leg */}
            <motion.div 
              animate={getLeftLegAnimation()}
              style={{ originX: 0.5, originY: 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Hip Joint */}
              <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full shadow-md border border-slate-700 z-20" />
              
              {/* Thigh */}
              <div className="w-8 h-16 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full -mt-4 z-10 border border-slate-400/50 shadow-inner" />
              
              {/* Knee & Calf Group */}
              <motion.div
                animate={getLeftKneeAnimation()}
                style={{ originX: 0.5, originY: 0.15 }}
                className="flex flex-col items-center -mt-3 z-20"
              >
                {/* Knee Joint */}
                <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full shadow-md border border-slate-800 flex items-center justify-center">
                  <div className="w-4 h-4 bg-slate-400 rounded-full" />
                </div>
                
                {/* Calf */}
                <div className="w-7 h-16 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full -mt-3 z-10 border border-slate-500/50" />
                
                {/* Foot */}
                <div className="w-18 h-8 bg-gradient-to-b from-slate-600 to-slate-800 rounded-t-2xl rounded-b-md -mt-2 border-t-2 border-slate-500 shadow-lg flex flex-col items-center justify-end pb-1">
                  <div className="w-14 h-1.5 bg-slate-900 rounded-full opacity-50" />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Leg */}
            <motion.div 
              animate={getRightLegAnimation()}
              style={{ originX: 0.5, originY: 0.1 }}
              className="flex flex-col items-center"
            >
              {/* Hip Joint */}
              <div className="w-10 h-10 bg-gradient-to-bl from-slate-400 to-slate-600 rounded-full shadow-md border border-slate-700 z-20" />
              
              {/* Thigh */}
              <div className="w-8 h-16 bg-gradient-to-b from-slate-300 to-slate-500 rounded-full -mt-4 z-10 border border-slate-400/50 shadow-inner" />
              
              {/* Knee & Calf Group */}
              <motion.div
                animate={getRightKneeAnimation()}
                style={{ originX: 0.5, originY: 0.15 }}
                className="flex flex-col items-center -mt-3 z-20"
              >
                {/* Knee Joint */}
                <div className="w-10 h-10 bg-gradient-to-bl from-slate-500 to-slate-700 rounded-full shadow-md border border-slate-800 flex items-center justify-center">
                  <div className="w-4 h-4 bg-slate-400 rounded-full" />
                </div>
                
                {/* Calf */}
                <div className="w-7 h-16 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full -mt-3 z-10 border border-slate-500/50" />
                
                {/* Foot */}
                <div className="w-18 h-8 bg-gradient-to-b from-slate-600 to-slate-800 rounded-t-2xl rounded-b-md -mt-2 border-t-2 border-slate-500 shadow-lg flex flex-col items-center justify-end pb-1">
                  <div className="w-14 h-1.5 bg-slate-900 rounded-full opacity-50" />
                </div>
              </motion.div>
            </motion.div>
            
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default RobotAnimation;
