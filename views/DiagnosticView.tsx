
import React, { useState, useRef } from 'react';
import { getDiagnostic } from '../services/geminiService';
import { DiagnosticResult } from '../types';

const DiagnosticView: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnose = async () => {
    if (!image && !symptoms) {
      setError("Please provide an image or describe symptoms.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const b64 = image?.split(',')[1];
      const data = await getDiagnostic(b64, symptoms);
      setResult(data);
    } catch (err) {
      setError("Failed to generate diagnostic. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">AI Vet Assistant</h2>
        <p className="text-slate-600">Get an instant screening for your birds by uploading a photo or describing what's wrong.</p>
      </div>

      {!result ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50/50 h-[300px] ${image ? 'border-blue-500' : 'border-slate-300'}`}
            >
              {image ? (
                <div className="absolute inset-0 p-2">
                  <img src={image} className="w-full h-full object-cover rounded-xl" alt="Preview" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setImage(null); }}
                    className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
              ) : (
                <>
                  <i className="fa-solid fa-cloud-arrow-up text-4xl text-slate-300 mb-4"></i>
                  <span className="text-slate-600 font-medium">Upload photo of bird, comb, or droppings</span>
                  <span className="text-slate-400 text-xs mt-2">Max size: 5MB</span>
                </>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Describe Symptoms</label>
              <textarea 
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Example: The birds are lethargic, sneezing, and have ruffled feathers. Egg production has dropped significantly."
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
              />
            </div>

            {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2"><i className="fa-solid fa-triangle-exclamation"></i> {error}</div>}

            <button 
              onClick={handleDiagnose}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 transform hover:-translate-y-1'}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-spinner animate-spin"></i> Analyzing...
                </span>
              ) : 'Run Analysis'}
            </button>
          </div>

          {/* Quick Guide */}
          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fa-solid fa-info-circle text-blue-400"></i>
              Diagnostic Guide
            </h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">1</div>
                <div>
                  <h4 className="font-bold mb-1">Clear Photos</h4>
                  <p className="text-slate-400 text-sm">Take photos in bright light. Close-ups of eyes, legs, or droppings help the AI identify specific pathologies.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">2</div>
                <div>
                  <h4 className="font-bold mb-1">Detail Symptoms</h4>
                  <p className="text-slate-400 text-sm">Mention duration of illness, percentage of flock affected, and any recent changes in feed or water.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">3</div>
                <div>
                  <h4 className="font-bold mb-1">Immediate Isolation</h4>
                  <p className="text-slate-400 text-sm">Always isolate symptomatic birds while waiting for a diagnosis to prevent disease spread.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in zoom-in-95 duration-500">
          {/* Result Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className={`p-6 flex items-center justify-between ${
              result.urgency === 'Critical' ? 'bg-red-600 text-white' : 
              result.urgency === 'High' ? 'bg-orange-500 text-white' : 
              'bg-blue-600 text-white'
            }`}>
              <div>
                <span className="text-xs uppercase font-bold opacity-75">Suspected Condition</span>
                <h3 className="text-2xl font-bold">{result.disease}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase font-bold opacity-75">Urgency Level</span>
                <div className="text-xl font-bold">{result.urgency}</div>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-clipboard-list text-blue-600"></i>
                  Clinical Analysis
                </h4>
                <p className="text-slate-600 leading-relaxed mb-6">{result.explanation}</p>
                
                <h4 className="font-bold text-slate-900 mb-4">Observed Symptoms</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {result.symptoms.map((s, i) => (
                    <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
                      {s}
                    </span>
                  ))}
                </div>
                
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-800 font-bold mb-2">
                    <i className="fa-solid fa-bullseye"></i> Confidence: {(result.confidence * 100).toFixed(1)}%
                  </div>
                  <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${result.confidence * 100}%` }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-prescription-bottle-medical text-green-600"></i>
                  Treatment Recommendation
                </h4>
                <ul className="space-y-3 mb-8">
                  {result.recommendedTreatments.map((t, i) => (
                    <li key={i} className="flex gap-3 text-slate-600">
                      <i className="fa-solid fa-circle-check text-green-500 mt-1"></i>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs leading-relaxed">
                  <i className="fa-solid fa-triangle-exclamation text-amber-500 mr-2"></i>
                  <strong>Important Disclaimer:</strong> This diagnostic tool is for educational and screening purposes only. It is powered by AI and can be incorrect. Please verify with a licensed veterinarian before administering any medicine.
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setResult(null)}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              Start New Analysis
            </button>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
              <i className="fa-solid fa-download"></i> Save Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticView;
