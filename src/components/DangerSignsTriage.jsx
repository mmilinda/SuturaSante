import React, { useState } from 'react';
import { AlertCircle, PhoneCall, Check, RotateCcw } from 'lucide-react';
import AudioPlayerButton from './AudioPlayerButton';

export default function DangerSignsTriage({ t, lang, onActionTrack }) {
  const [answers, setAnswers] = useState({
    bleeding: false,
    severeHeadache: false,
    fever: false,
    decreasedMovement: false,
    intensePain: false
  });

  const [triageStatus, setTriageStatus] = useState(null);

  const toggleQuestion = (key) => {
    setAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const evaluateTriage = () => {
    // Si saignements ou maux de tête violents ou baisse mouvements -> ROUGE
    if (answers.bleeding || answers.severeHeadache || answers.decreasedMovement) {
      setTriageStatus('red');
      if (onActionTrack) onActionTrack('emergency_red');
    } else if (answers.fever || answers.intensePain) {
      setTriageStatus('yellow');
      if (onActionTrack) onActionTrack('triage_yellow');
    } else {
      setTriageStatus('green');
      if (onActionTrack) onActionTrack('triage_green');
    }
  };

  const resetTriage = () => {
    setAnswers({
      bleeding: false,
      severeHeadache: false,
      fever: false,
      decreasedMovement: false,
      intensePain: false
    });
    setTriageStatus(null);
  };

  const questions = [
    { id: 'bleeding', label: t.triage.q1, urgent: true },
    { id: 'severeHeadache', label: t.triage.q2, urgent: true },
    { id: 'decreasedMovement', label: t.triage.q4, urgent: true },
    { id: 'fever', label: t.triage.q3, urgent: false },
    { id: 'intensePain', label: t.triage.q5, urgent: false }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-xl shadow-amber-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-md mb-2">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Dépistage Immédiat • 100% Confidentiel</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">{t.triage.title}</h2>
            <p className="text-amber-100 text-sm mt-1 max-w-xl">{t.triage.subtitle}</p>
          </div>
          <AudioPlayerButton
            textToSpeak={`${t.triage.title}. ${t.triage.subtitle}`}
            lang={lang}
            label={lang === 'wo' ? "Déglu mandarga yi" : "Écouter les consignes"}
            onPlayRecord={() => onActionTrack && onActionTrack('audio_listen')}
          />
        </div>
      </div>

      {/* Checklist des signes */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <p className="text-sm font-semibold text-slate-700">
          {lang === 'wo' 
            ? "Bësal li nga yëg ci yaram bi (mën nga tànn lu ëpp benn) :" 
            : "Cochez ce que vous ressentez actuellement :"}
        </p>

        <div className="space-y-2.5">
          {questions.map((q) => {
            const isChecked = answers[q.id];
            return (
              <div
                key={q.id}
                onClick={() => toggleQuestion(q.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                  isChecked
                    ? 'border-amber-500 bg-amber-50/60 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                      isChecked
                        ? 'bg-amber-600 border-amber-600 text-white'
                        : 'border-slate-300 bg-slate-50'
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <span className={`text-sm ${isChecked ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                    {q.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-3">
          <button
            onClick={evaluateTriage}
            className="flex-1 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-2xl shadow-lg shadow-amber-200 transition active:scale-95 text-center text-sm"
          >
            {t.triage.evalBtn}
          </button>
          {triageStatus && (
            <button
              onClick={resetTriage}
              className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition flex items-center justify-center gap-2 text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.triage.resetBtn}</span>
            </button>
          )}
        </div>

        {/* Bloc Résultat du triage */}
        {triageStatus === 'red' && (
          <div className="mt-6 p-6 rounded-3xl bg-red-600 text-white shadow-xl shadow-red-200 animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-2xl">
                <AlertCircle className="w-8 h-8 text-white animate-bounce" />
              </div>
              <div className="space-y-3 flex-1">
                <h3 className="font-extrabold text-lg sm:text-xl tracking-tight">{t.triage.alertRedTitle}</h3>
                <p className="text-red-100 text-xs sm:text-sm leading-relaxed">{t.triage.alertRedDesc}</p>
                <div className="pt-2">
                  <a
                    href="tel:1515"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-red-700 font-extrabold rounded-2xl shadow-lg hover:bg-red-50 transition active:scale-95 text-sm pulse-emergency"
                  >
                    <PhoneCall className="w-5 h-5 text-red-600 fill-red-600" />
                    <span>{t.triage.callSamu}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {triageStatus === 'yellow' && (
          <div className="mt-6 p-6 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 animate-fadeIn">
            <h3 className="font-bold text-base text-amber-900">{t.triage.alertYellowTitle}</h3>
            <p className="text-xs sm:text-sm text-amber-800 mt-1.5">{t.triage.alertYellowDesc}</p>
          </div>
        )}

        {triageStatus === 'green' && (
          <div className="mt-6 p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-900 animate-fadeIn">
            <h3 className="font-bold text-base text-emerald-900">{t.triage.alertGreenTitle}</h3>
            <p className="text-xs sm:text-sm text-emerald-800 mt-1.5">{t.triage.alertGreenDesc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
