import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { DemoTrack } from '../types';

interface AudioPlayerProps {
    track: DemoTrack;
}

// 1. Mise à jour de la signature du composant pour accepter la fonction de clic
const AudioPlayer: React.FC<AudioPlayerProps & { onPlayClick: (id: string) => void }> = ({ track, onPlayClick }) => {
    
    // Le composant gère toujours son état local (pour l'icône et l'effet visuel)
    const [isPlaying, setIsPlaying] = useState(false);

    // Fonction pour gérer le clic sur le bouton
    const handlePlayClick = () => {
        // 2. Appel de la fonction globale (qui joue le son et gère l'arrêt du précédent)
        onPlayClick(track.id);
        
        // 3. Mise à jour de l'état local pour changer l'icône
        setIsPlaying(prev => !prev);
    };

  
    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all group">
            <button 
                // 4. Le bouton est branché à la nouvelle fonction
                onClick={handlePlayClick} 
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                    isPlaying ? 'bg-brand-accent text-white scale-105' : 'bg-slate-100 text-brand-dark group-hover:bg-brand-primary group-hover:text-white'
                }`}
            >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
            </button>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-brand-dark truncate pr-2">{track.title}</h4>
                    <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-0.5 rounded">{track.category}</span>
                </div>
                
                {/* Fake Visualizer */}
                <div className="h-8 flex items-center gap-0.5">
                    {Array.from({ length: 40 }).map((_, i) => {
                        // Generate a pseudo-random height for the bar based on index and track title length
                        const height = Math.max(20, Math.min(100, ((i * track.title.length * 7) % 80) + 20));
                        return (
                            <div 
                                key={i} 
                                className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse bg-brand-primary' : 'bg-gray-200'}`}
                                style={{ 
                                    height: `${height}%`,
                                    opacity: isPlaying ? 1 : 0.6
                                }}
                            ></div>
                        );
                    })}
                </div>
            </div>

            <div className="text-xs font-semibold text-gray-400 w-10 text-right">
                {track.duration}
            </div>
        </div>
    );
};

export default AudioPlayer;