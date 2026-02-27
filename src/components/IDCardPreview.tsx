import React from 'react';
import { Flower, Sparkles, Heart, Star, Soup, Sun } from 'lucide-react';
import { cn } from '../lib/utils';
import { IDCardData } from '../types';

interface IDCardPreviewProps {
  data: IDCardData;
  cardRef: React.RefObject<HTMLDivElement>;
  iq: number;
  vibe: string;
  side?: 'front' | 'back';
}

export const IDCardPreview: React.FC<IDCardPreviewProps> = ({ data, cardRef, iq, vibe, side = 'front' }) => {
  const renderFront = () => (
    <div className="absolute top-14 left-0 w-full h-[calc(100%-56px)] pt-4 px-8 pb-8 flex gap-8">
      {/* Photo Section */}
      <div className="flex flex-col gap-4">
        <div className="w-28 h-36 rounded-2xl border-2 border-white bg-stone-50 overflow-hidden relative shadow-inner group">
          {data.photoUrl ? (
            <img 
              src={data.photoUrl} 
              alt="ID Photo" 
              className="w-full h-full object-cover sepia-[0.2] contrast-[1.1] transition-transform duration-200"
              style={{ 
                transform: `scale(${data.photoPosition.zoom}) translate(${(data.photoPosition.x - 50)}%, ${(data.photoPosition.y - 50)}%)`,
                objectPosition: 'center'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-rose-200">
              <Heart className="w-10 h-10 opacity-30 fill-current" />
            </div>
          )}
          <div className="absolute inset-0 border-[6px] border-white/40 pointer-events-none" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Favorite Kink</span>
          <span className="text-sm font-serif italic font-semibold text-rose-600">
            {data.clearance}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="space-y-4">
          <div>
            <h2 className="text-3xl font-display font-bold text-stone-800 tracking-tight leading-none mb-1">
              {data.fullName || 'Lovely Soul'}
            </h2>
            <p className="text-rose-400 font-serif italic text-base">
              {data.role || 'CUMSLUT'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Eye Color</span>
              <span className="text-stone-600 font-semibold text-sm">{data.idNumber}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Hair Color</span>
              <span className="text-stone-600 font-semibold text-sm truncate">{data.department}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Age</span>
              <span className="text-stone-600 font-semibold text-sm">{data.bloodType}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Height</span>
              <span className="text-stone-600 font-semibold text-sm">{data.height}</span>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-rose-100/50 pt-3">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest leading-none">Issued:</span>
              <span className="text-[11px] text-stone-500 font-medium">{data.issueDate}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest leading-none">Expires:</span>
              <span className="text-[11px] text-stone-500 font-medium">{data.expiryDate}</span>
            </div>
          </div>
          <div className="p-1.5 bg-white rounded-lg shadow-sm">
            <Soup className="w-6 h-6 text-rose-400 fill-rose-100" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBack = () => {
    const rawFields = [
      { label: 'IQ', value: data.iqValue, enabled: data.enabledBackFields.iqValue },
      { label: 'Cup Size', value: data.cupSize, enabled: data.enabledBackFields.cupSize },
      { label: 'Tattoos', value: data.tattoos, enabled: data.enabledBackFields.tattoos },
      { label: 'Piercings', value: data.piercings, enabled: data.enabledBackFields.piercings },
      { label: 'Body Mods', value: data.bodyMods, enabled: data.enabledBackFields.bodyMods },
      { label: 'Body Count', value: data.bodyCount, enabled: data.enabledBackFields.bodyCount },
      { label: 'Vaginal', value: data.vaginalGrade, enabled: data.enabledBackFields.vaginalGrade },
      { label: 'Anal', value: data.analGrade, enabled: data.enabledBackFields.analGrade },
      { label: 'Oral', value: data.oralGrade, enabled: data.enabledBackFields.oralGrade },
      { label: 'Tits', value: data.breastGrade, enabled: data.enabledBackFields.breastGrade },
      { label: 'Lactation', value: data.lactation, enabled: data.enabledBackFields.lactation },
      { label: 'Orgasms', value: data.orgasmCount, enabled: data.enabledBackFields.orgasmCount },
      { label: 'Sirs Served', value: data.sirsServed, enabled: data.enabledBackFields.sirsServed },
      { label: 'Safeword', value: data.safeword, enabled: data.enabledBackFields.safeword },
      { label: 'Kinks', value: data.kinks, enabled: data.enabledBackFields.kinks },
      { label: 'Personality', value: data.personality, enabled: data.enabledBackFields.personality },
      { label: 'Certification', value: data.certification, enabled: data.enabledBackFields.certification },
      { label: 'Denial', value: data.orgasmDenial, enabled: data.enabledBackFields.orgasmDenial },
      { label: 'Fav Toy', value: data.favoriteToy, enabled: data.enabledBackFields.favoriteToy },
      { label: 'Trigger #1', value: data.hypnoTrigger1, enabled: data.enabledBackFields.hypnoTrigger1 },
      { label: 'Trigger #2', value: data.hypnoTrigger2, enabled: data.enabledBackFields.hypnoTrigger2 },
    ].filter(f => f.enabled);

    // Calculate "weight" based on content length to decide width
    const fieldsWithWeight = rawFields.map(f => {
      const valLen = String(f.value || '').length;
      const labLen = String(f.label || '').length;
      const totalLen = valLen + labLen;
      
      let weight = 1; // 1/4 width
      if (totalLen > 40 || valLen > 25) weight = 4; // full width
      else if (totalLen > 22 || valLen > 14) weight = 2; // half width
      else if (totalLen > 14 || valLen > 8) weight = 1.33; // 1/3 width
      
      return { ...f, weight };
    });

    // Sort fields by weight to group similar sizes together for better packing
    const sortedFields = [...fieldsWithWeight].sort((a, b) => b.weight - a.weight);

    const count = sortedFields.length;
    
    // Base font sizes that still scale slightly based on total density
    let labelSize = 'text-[7px]';
    let valueSize = 'text-[10px]';

    if (count <= 6) {
      labelSize = 'text-[16px]';
      valueSize = 'text-[26px]';
    } else if (count <= 12) {
      labelSize = 'text-[13px]';
      valueSize = 'text-[20px]';
    } else if (count <= 18) {
      labelSize = 'text-[11px]';
      valueSize = 'text-[16px]';
    } else if (count <= 20) {
      labelSize = 'text-[9px]';
      valueSize = 'text-[13px]';
    }

    return (
      <div className="absolute top-0 left-0 w-full h-full p-2 flex flex-col gap-1">
        {/* Horizontal Photos */}
        <div className="flex justify-center gap-1.5">
          {[
            { label: 'Breasts', url: data.breastPhotoUrl, pos: data.breastPhotoPosition },
            { label: 'Butt', url: data.buttPhotoUrl, pos: data.buttPhotoPosition },
            { label: 'Holes', url: data.holesPhotoUrl, pos: data.holesPhotoPosition },
            { label: 'Pose', url: data.posePhotoUrl, pos: data.posePhotoPosition },
          ].map((photo, i) => (
            <div key={i} className="flex flex-col gap-0.5 items-center">
              <div className="w-[84px] h-[84px] rounded-lg border border-white bg-stone-50 overflow-hidden relative shadow-sm">
                {photo.url ? (
                  <img 
                    src={photo.url} 
                    alt={photo.label} 
                    className="w-full h-full object-cover transition-transform duration-200" 
                    style={{ 
                      transform: `scale(${photo.pos.zoom}) translate(${(photo.pos.x - 50)}%, ${(photo.pos.y - 50)}%)`,
                      objectPosition: 'center'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-rose-100">
                    <Heart className="w-4 h-4 opacity-20 fill-current" />
                  </div>
                )}
              </div>
              <span className="text-[6px] font-bold text-stone-300 uppercase tracking-tighter">{photo.label}</span>
            </div>
          ))}
        </div>

        {/* Back Info Section - Fluid Tag-Style Packing */}
        <div className="flex-1 flex flex-col justify-start pt-1">
          <div className="flex flex-wrap w-full justify-center gap-x-3 gap-y-1 px-2">
            {sortedFields.map((field, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center text-center border-b border-rose-50/20 pb-0.5 min-w-[60px]"
              >
                <span className={cn("font-bold text-stone-400 uppercase tracking-tight leading-none", labelSize)}>{field.label}</span>
                <span className={cn("text-stone-600 font-medium leading-tight break-words", valueSize)} title={field.value}>{field.value}</span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-2 right-3">
            <div className="p-1 bg-white rounded-lg shadow-sm">
              <Soup className="w-4 h-4 text-rose-400 fill-rose-100" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div 
        ref={cardRef}
        className="relative w-[450px] h-[280px] rounded-[2rem] overflow-hidden border border-rose-100 shadow-2xl font-sans text-xs tracking-wide"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 card-bloom" />
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-100 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#FBCFE8_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
        </div>

        {/* Header */}
        {side === 'front' && (
          <div className="absolute top-0 left-0 w-full h-14 border-b border-rose-50/50 flex items-center px-8 justify-between bg-white/40 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Flower className="w-5 h-5 text-rose-400" />
              <span className="font-display italic font-bold text-lg text-rose-500 tracking-tight">Doll ID</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-stone-400 font-medium">
              <div className="flex items-center gap-1">
                <Sun className="w-3 h-3 text-orange-400" />
                <span className="uppercase tracking-widest">Grade: {data.grade}</span>
              </div>
              <div className="px-3 py-1 border border-rose-100 rounded-full bg-white/80 text-rose-400 shadow-sm">
                {data.status}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {side === 'front' ? renderFront() : renderBack()}

        {/* Decorative Corner */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-orange-100/50 rounded-full blur-xl" />
      </div>

      <div className="text-stone-400 text-[10px] flex items-center gap-8 uppercase tracking-[0.2em] font-medium">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-orange-300" />
          <span>Estimated IQ: {iq}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-3 h-3 text-pink-300" />
          <span>Vibe: {vibe}</span>
        </div>
      </div>
    </div>
  );
};
