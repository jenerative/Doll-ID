import React, { useState } from 'react';
import { Camera, Upload, Trash2, Settings2, ChevronDown, ChevronUp } from 'lucide-react';
import { IDCardData } from '../types';
import { cn } from '../lib/utils';

interface IDFormProps {
  data: IDCardData;
  onChange: (data: IDCardData) => void;
}

const PositionControls = ({ 
  field, 
  label, 
  data, 
  onChange 
}: { 
  field: string; 
  label: string; 
  data: IDCardData; 
  onChange: (data: IDCardData) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pos = data[field as keyof IDCardData] as { x: number; y: number; zoom: number };

  const handlePositionChange = (axis: 'x' | 'y' | 'zoom', value: number) => {
    onChange({
      ...data,
      [field]: {
        ...pos,
        [axis]: value
      }
    });
  };

  return (
    <div className="mt-4 space-y-3 bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-2">
          <Settings2 className="w-3 h-3 text-rose-400" />
          <span className="text-[9px] font-bold text-rose-400 uppercase tracking-widest">{label} Framing</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-3 h-3 text-stone-400 group-hover:text-rose-400 transition-colors" />
        ) : (
          <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-rose-400 transition-colors" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-4 pt-2 border-t border-rose-100/30">
          <div className="flex justify-end">
            <button 
              onClick={() => onChange({ ...data, [field]: { x: 50, y: 50, zoom: 1 } })}
              className="text-[8px] font-bold text-stone-400 hover:text-rose-500 uppercase tracking-widest transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[8px] font-bold text-stone-400 uppercase tracking-tighter">
                <span>Zoom</span>
                <span>{pos.zoom.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="0.01"
                value={pos.zoom}
                onChange={(e) => handlePositionChange('zoom', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[8px] font-bold text-stone-400 uppercase tracking-tighter">
                <span>Horizontal</span>
                <span>{pos.x}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={pos.x}
                onChange={(e) => handlePositionChange('x', parseInt(e.target.value))}
                className="w-full h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[8px] font-bold text-stone-400 uppercase tracking-tighter">
                <span>Vertical</span>
                <span>{pos.y}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={pos.y}
                onChange={(e) => handlePositionChange('y', parseInt(e.target.value))}
                className="w-full h-1.5 bg-rose-100 rounded-lg appearance-none cursor-pointer accent-rose-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const IDForm: React.FC<IDFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof IDCardData) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (field: keyof IDCardData) => {
    onChange({ ...data, [field]: null });
  };

  const toggleField = (field: keyof IDCardData['enabledBackFields']) => {
    onChange({
      ...data,
      enabledBackFields: {
        ...data.enabledBackFields,
        [field]: !data.enabledBackFields[field]
      }
    });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/60 border border-rose-100 rounded-3xl p-8 space-y-8 backdrop-blur-md shadow-sm">
        <div className="space-y-2">
          <h3 className="text-xl font-display font-semibold text-stone-800">True Feminism</h3>
          <p className="text-sm text-stone-500">Create your Doll ID and expose yourself.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Photo Upload */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">
              Facial Photo
            </label>
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/30 overflow-hidden flex items-center justify-center transition-colors group-hover:border-rose-300">
                  {data.photoUrl ? (
                    <img src={data.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-8 h-8 text-rose-200" />
                  )}
                </div>
                {data.photoUrl && (
                  <button
                    onClick={() => removePhoto('photoUrl')}
                    className="absolute -top-2 -right-2 p-1.5 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition-colors shadow-lg"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="flex-1">
                <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl cursor-pointer transition-all text-sm font-semibold shadow-sm border border-rose-100 active:scale-95">
                  <Upload className="w-4 h-4" />
                  Choose Image
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'photoUrl')} />
                </label>
                <p className="mt-2 text-[10px] text-stone-400 uppercase tracking-wider font-medium">
                  Ahegao Recommended
                </p>
              </div>
            </div>
            {data.photoUrl && <PositionControls field="photoPosition" label="Facial" data={data} onChange={onChange} />}
          </div>

          {/* Text Fields */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Name</label>
              <input
                type="text"
                name="fullName"
                value={data.fullName}
                onChange={handleChange}
                placeholder="e.g. JANE DOE"
                className="w-full bg-white/50 border border-rose-100 rounded-xl px-4 py-2.5 text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Designation</label>
              <input
                type="text"
                name="role"
                value={data.role}
                onChange={handleChange}
                placeholder="e.g. CUMSLUT"
                className="w-full bg-white/50 border border-rose-100 rounded-xl px-4 py-2.5 text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Grade</label>
              <select
                name="grade"
                value={data.grade}
                onChange={handleChange}
                className="w-full bg-white/50 border border-rose-100 rounded-xl px-4 py-2.5 text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all appearance-none"
              >
                {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Favorite Kink</label>
              <input
                type="text"
                name="clearance"
                value={data.clearance}
                onChange={handleChange}
                placeholder="e.g. Brainwashing"
                className="w-full bg-white/50 border border-rose-100 rounded-xl px-4 py-2.5 text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Age</label>
                <input
                  type="text"
                  name="bloodType"
                  value={data.bloodType}
                  onChange={handleChange}
                  placeholder="21"
                  className="w-full bg-white/50 border border-rose-100 rounded-xl px-4 py-2.5 text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Height</label>
                <input
                  type="text"
                  name="height"
                  value={data.height}
                  onChange={handleChange}
                  placeholder="170 CM"
                  className="w-full bg-white/50 border border-rose-100 rounded-xl px-4 py-2.5 text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Eye Color</label>
                <input
                  type="text"
                  name="idNumber"
                  value={data.idNumber}
                  onChange={handleChange}
                  placeholder="e.g. BLUE"
                  className="w-full bg-white/50 border border-rose-100 rounded-xl px-4 py-2.5 text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Hair Color</label>
                <input
                  type="text"
                  name="department"
                  value={data.department}
                  onChange={handleChange}
                  placeholder="e.g. BLONDE"
                  className="w-full bg-white/50 border border-rose-100 rounded-xl px-4 py-2.5 text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Issued:</label>
                <input
                  type="text"
                  name="issueDate"
                  value={data.issueDate}
                  onChange={handleChange}
                  className="w-full bg-white/50 border border-rose-100 rounded-xl px-4 py-2.5 text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Expires:</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={data.expiryDate}
                  onChange={handleChange}
                  className="w-full bg-white/50 border border-rose-100 rounded-xl px-4 py-2.5 text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Status</label>
              <div className="flex gap-4">
                {['Owned', 'Unowned'].map((status) => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={data.status === status}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2 border-rose-200 flex items-center justify-center transition-all",
                      data.status === status && "border-rose-400 bg-rose-400/20"
                    )}>
                      {data.status === status && <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />}
                    </div>
                    <span className={cn(
                      "text-xs font-semibold transition-colors",
                      data.status === status ? "text-rose-500" : "text-stone-400 group-hover:text-stone-600"
                    )}>
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reverse Side Section */}
      <div className="bg-white/60 border border-rose-100 rounded-3xl p-8 space-y-8 backdrop-blur-md shadow-sm">
        <div className="space-y-2">
          <h3 className="text-xl font-display font-semibold text-stone-800">Sluttiness Showcase</h3>
          <p className="text-sm text-stone-500">Share more stats and info.</p>
        </div>

        {/* Reverse Photo Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Breast Photo', field: 'breastPhotoUrl' },
            { label: 'Butt Photo', field: 'buttPhotoUrl' },
            { label: 'Holes Photo', field: 'holesPhotoUrl' },
            { label: 'Pose Photo', field: 'posePhotoUrl' },
          ].map(({ label, field }) => (
            <div key={field} className="space-y-3">
              <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                {label}
              </label>
              <div className="relative group">
                <div className="w-full aspect-square rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/30 overflow-hidden flex items-center justify-center transition-colors group-hover:border-rose-300">
                  {data[field as keyof IDCardData] ? (
                    <img src={data[field as keyof IDCardData] as string} alt={label} className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-6 h-6 text-rose-200" />
                  )}
                </div>
                {data[field as keyof IDCardData] && (
                  <button
                    onClick={() => removePhoto(field as keyof IDCardData)}
                    className="absolute -top-2 -right-2 p-1.5 bg-rose-400 text-white rounded-full hover:bg-rose-500 transition-colors shadow-lg"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                <label className="absolute inset-0 cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, field as keyof IDCardData)} />
                </label>
              </div>
              {data[field as keyof IDCardData] && (
                <PositionControls 
                  field={field.replace('Url', 'Position')} 
                  label={label.split(' ')[0]} 
                  data={data}
                  onChange={onChange}
                />
              )}
            </div>
          ))}
        </div>

        {/* Reverse Text Fields with Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'IQ', field: 'iqValue' },
            { label: 'Cup Size', field: 'cupSize' },
            { label: 'Tattoos', field: 'tattoos' },
            { label: 'Piercings', field: 'piercings' },
            { label: 'Body Mods', field: 'bodyMods' },
            { label: 'Body Count', field: 'bodyCount' },
            { label: 'Vaginal Grade', field: 'vaginalGrade' },
            { label: 'Anal Grade', field: 'analGrade' },
            { label: 'Oral Grade', field: 'oralGrade' },
            { label: 'Breast Grade', field: 'breastGrade' },
            { label: 'Lactation', field: 'lactation' },
            { label: 'Orgasm Count', field: 'orgasmCount' },
            { label: 'Sirs Served', field: 'sirsServed' },
            { label: 'Safeword', field: 'safeword' },
            { label: 'Kinks', field: 'kinks' },
            { label: 'Personality', field: 'personality' },
            { label: 'Hypno Trigger #1', field: 'hypnoTrigger1' },
            { label: 'Hypno Trigger #2', field: 'hypnoTrigger2' },
            { label: 'Certification', field: 'certification' },
            { label: 'Longest Orgasm Denial', field: 'orgasmDenial' },
            { label: 'Favorite Toy', field: 'favoriteToy' },
          ].map(({ label, field }) => (
            <div key={field} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{label}</label>
                <button
                  onClick={() => toggleField(field as keyof IDCardData['enabledBackFields'])}
                  className={cn(
                    "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition-all",
                    data.enabledBackFields[field as keyof IDCardData['enabledBackFields']]
                      ? "bg-rose-400 text-white"
                      : "bg-stone-100 text-stone-400"
                  )}
                >
                  {data.enabledBackFields[field as keyof IDCardData['enabledBackFields']] ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              <input
                type="text"
                name={field}
                value={data[field as keyof IDCardData] as string}
                onChange={handleChange}
                disabled={!data.enabledBackFields[field as keyof IDCardData['enabledBackFields']]}
                className={cn(
                  "w-full bg-white/50 border border-rose-100 rounded-xl px-4 py-2.5 text-stone-700 focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all",
                  !data.enabledBackFields[field as keyof IDCardData['enabledBackFields']] && "opacity-50 cursor-not-allowed"
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
