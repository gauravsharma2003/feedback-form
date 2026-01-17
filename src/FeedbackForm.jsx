import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Camera, Send, ArrowLeft } from 'lucide-react';
import image from './assets/image.png';

const FeedbackForm = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedSubtype, setSelectedSubtype] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isHelpExpanded, setIsHelpExpanded] = useState(true);
  const [feedbackText, setFeedbackText] = useState('');
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);

  const problemTypes = [
    { id: 'content', label: 'Content & Credibility' },
    { id: 'reading', label: 'Reading Experience' },
    { id: 'performance', label: 'Performance & Technical' },
    { id: 'features', label: 'Features & Requests' }
  ];

  const subTypes = {
    content: [
      'Factual Error / Misinformation',
      'Typo or Grammar',
      'Biased / Slanted Language',
      'Irrelevant to Me',
      'Inappropriate Content',
      'Outdated News'
    ],
    reading: [
      'Font Size / Readability',
      'Dark Mode / Brightness',
      'Text Alignment / Layout',
      'Images Not Loading',
      'Too Many Ads'
    ],
    performance: [
      'App Crashing / Freezing',
      'Slow Loading / Lag',
      'Battery Drain',
      'Login / Sync Issues',
      'Download Failure'
    ],
    features: [
      'Bookmarking Not Saving',
      'Notifications Issues',
      'Search Results Poor',
      'Feature Request'
    ]
  };

  const solutions = {
    'Font Size / Readability': {
      icon: '🔤',
      title: 'Text Size Settings Available',
      subtitle: 'You can customize font size to your preference',
      options: [
        { title: 'Adjust Text Size', steps: ['Open Settings from the menu', 'Navigate to Display Settings', 'Use the Text Size slider to adjust', 'Changes apply instantly'] },
        { title: 'Reading Mode', steps: ['Tap any article to open', 'Look for the "Aa" icon at the top', 'Choose from preset sizes', 'Enable Reader Mode for cleaner layout'] }
      ]
    },
    'Dark Mode / Brightness': {
      icon: '🌙',
      title: 'Theme Customization',
      subtitle: 'Switch between Light, Dark, or Auto themes',
      options: [{ title: 'Change Theme', steps: ['Go to Settings', 'Select Display Settings', 'Choose Light, Dark, or System', 'Theme changes immediately'] }]
    },
    'Notifications Issues': {
      icon: '🔔',
      title: 'Notification Controls',
      subtitle: 'Manage frequency and types of alerts',
      options: [{ title: 'Adjust Notifications', steps: ['Open Settings', 'Tap Notification Preferences', 'Toggle Breaking News, Daily Digest, etc.', 'Set quiet hours if needed'] }]
    },
    'Images Not Loading': {
      icon: '🖼️',
      title: 'Image Loading Settings',
      subtitle: 'Optimize for your network connection',
      options: [{ title: 'Data Saver Mode', steps: ['Go to Settings', 'Enable Data Saver', 'Images load in lower quality', 'Faster loading on slow networks'] }]
    },
    'App Crashing / Freezing': {
      icon: '⚡',
      title: 'Quick Fixes',
      subtitle: 'Common solutions for stability issues',
      options: [{ title: 'Update App', steps: ['Open your app store', 'Search for the app', 'Tap Update if available', 'Restart after updating'] }]
    },
    'Login / Sync Issues': {
      icon: '🔄',
      title: 'Sync Your Content',
      subtitle: 'Refresh and re-sync your data',
      options: [{ title: 'Force Refresh', steps: ['Go to your home screen', 'Pull down to refresh', 'Wait for sync to complete', 'Check if issue persists'] }]
    }
  };

  useEffect(() => {
    if (selectedSubtype && solutions[selectedSubtype]) {
      setIsAnalyzing(true);
      setShowHelp(false);
      setIsHelpExpanded(true);
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        setShowHelp(true);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setShowHelp(false);
      setIsAnalyzing(false);
    }
  }, [selectedSubtype]);

  const handleImageUpload = () => {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);background:#262626;color:#fff;font-size:14px;padding:10px 16px;border-radius:8px;z-index:9999;';
    toast.textContent = 'Image upload not available in this demo';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.2s';
      setTimeout(() => toast.remove(), 200);
    }, 2000);
  };

  const openSolution = (solution) => {
    setSelectedSolution(solution);
    setShowBottomSheet(true);
  };

  const canSubmit = selectedType && selectedSubtype;

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Sticky Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: '#fff',
        borderBottom: '1px solid #f5f5f5',
        padding: '12px 20px'
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              background: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <ArrowLeft style={{ width: '18px', height: '18px', color: '#171717' }} />
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#171717', margin: 0 }}>
            Send Feedback
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <img src={image} alt="Feedback illustration" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        {/* Dropdowns Row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#737373', marginBottom: '6px' }}>
              Issue type
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value); setSelectedSubtype(''); }}
                style={{
                  width: '100%', height: '44px', padding: '0 32px 0 12px', fontSize: '14px',
                  background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: '8px',
                  appearance: 'none', cursor: 'pointer', outline: 'none',
                  color: selectedType ? '#171717' : '#a3a3a3'
                }}
              >
                <option value="">Select...</option>
                {problemTypes.map(type => (
                  <option key={type.id} value={type.id} style={{ color: '#171717' }}>{type.label}</option>
                ))}
              </select>
              <ChevronDown style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#a3a3a3', pointerEvents: 'none' }} />
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#737373', marginBottom: '6px' }}>
              Specific issue
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedSubtype}
                onChange={(e) => setSelectedSubtype(e.target.value)}
                disabled={!selectedType}
                style={{
                  width: '100%', height: '44px', padding: '0 32px 0 12px', fontSize: '14px',
                  background: selectedType ? '#fafafa' : '#f5f5f5',
                  border: '1px solid', borderColor: selectedType ? '#e5e5e5' : '#f5f5f5',
                  borderRadius: '8px', appearance: 'none',
                  cursor: selectedType ? 'pointer' : 'not-allowed', outline: 'none',
                  color: !selectedType ? '#d4d4d4' : selectedSubtype ? '#171717' : '#a3a3a3'
                }}
              >
                <option value="">{selectedType ? 'Select...' : 'Select type first'}</option>
                {selectedType && subTypes[selectedType].map(subtype => (
                  <option key={subtype} value={subtype} style={{ color: '#171717' }}>{subtype}</option>
                ))}
              </select>
              <ChevronDown style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: selectedType ? '#a3a3a3' : '#d4d4d4', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>

        {/* Screenshot Upload - Always visible */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#737373', marginBottom: '6px' }}>
            Screenshot (optional)
          </label>
          <button
            onClick={handleImageUpload}
            style={{
              width: '100%', height: '80px', border: '1px dashed #d4d4d4', borderRadius: '8px',
              background: 'transparent', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer'
            }}
          >
            <Camera style={{ width: '20px', height: '20px', color: '#a3a3a3' }} />
            <span style={{ fontSize: '12px', color: '#737373' }}>Tap to upload</span>
          </button>
        </div>

        {/* Feedback Text - Always visible */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#737373', marginBottom: '6px' }}>
            Describe the issue
          </label>
          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Tell us what happened..."
            style={{
              width: '100%', height: '100px', padding: '12px', fontSize: '14px',
              background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: '8px',
              resize: 'none', outline: 'none', color: '#171717', lineHeight: '1.5'
            }}
          />
        </div>

        {/* Analyzing State */}
        {isAnalyzing && (
          <div style={{ marginBottom: '20px', padding: '14px 16px', background: '#fafafa', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '5px', height: '5px', background: '#a3a3a3', borderRadius: '50%', animation: 'pulse 1.4s infinite' }} />
                <span style={{ width: '5px', height: '5px', background: '#a3a3a3', borderRadius: '50%', animation: 'pulse 1.4s infinite 0.15s' }} />
                <span style={{ width: '5px', height: '5px', background: '#a3a3a3', borderRadius: '50%', animation: 'pulse 1.4s infinite 0.3s' }} />
              </div>
              <span style={{ fontSize: '13px', color: '#737373' }}>Checking for quick solutions...</span>
            </div>
          </div>
        )}

        {/* Help Block */}
        {showHelp && solutions[selectedSubtype] && (
          <div style={{ marginBottom: '20px', border: '1px solid #e5e5e5', borderRadius: '8px', overflow: 'hidden' }}>
            <button
              onClick={() => setIsHelpExpanded(!isHelpExpanded)}
              style={{
                width: '100%', padding: '14px 16px', background: '#fafafa', border: 'none',
                display: 'flex', alignItems: 'flex-start', gap: '12px', textAlign: 'left', cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '22px', lineHeight: 1 }}>{solutions[selectedSubtype].icon}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#171717', margin: 0 }}>
                  {solutions[selectedSubtype].title}
                </h3>
                <p style={{ fontSize: '12px', color: '#737373', margin: '2px 0 0' }}>
                  {solutions[selectedSubtype].subtitle}
                </p>
              </div>
              {isHelpExpanded ? (
                <ChevronUp style={{ width: '16px', height: '16px', color: '#a3a3a3', marginTop: '2px' }} />
              ) : (
                <ChevronDown style={{ width: '16px', height: '16px', color: '#a3a3a3', marginTop: '2px' }} />
              )}
            </button>

            {isHelpExpanded && (
              <div style={{ padding: '14px 16px', borderTop: '1px solid #f5f5f5' }}>
                <p style={{ fontSize: '11px', color: '#a3a3a3', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick solutions</p>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                  {solutions[selectedSubtype].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => openSolution(option)}
                      style={{
                        flexShrink: 0, padding: '10px 14px', background: '#f5f5f5', border: 'none',
                        borderRadius: '6px', fontSize: '13px', fontWeight: 500, color: '#525252', cursor: 'pointer'
                      }}
                    >
                      {option.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          disabled={!canSubmit}
          style={{
            width: '100%', height: '44px', background: canSubmit ? '#171717' : '#e5e5e5',
            color: canSubmit ? '#fff' : '#a3a3a3', fontSize: '14px', fontWeight: 500,
            border: 'none', borderRadius: '8px', cursor: canSubmit ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'background 0.2s, color 0.2s'
          }}
        >
          <Send style={{ width: '16px', height: '16px' }} />
          Send Feedback
        </button>
      </div>

      {/* Bottom Sheet */}
      {showBottomSheet && selectedSolution && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} onClick={() => setShowBottomSheet(false)} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '16px 16px 0 0', maxHeight: '80vh', overflowY: 'auto' }}>
            <div style={{ padding: '12px 20px 16px', borderBottom: '1px solid #f5f5f5' }}>
              <div style={{ width: '36px', height: '4px', background: '#e5e5e5', borderRadius: '2px', margin: '0 auto 14px' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#171717', margin: 0 }}>{selectedSolution.title}</h2>
                <button onClick={() => setShowBottomSheet(false)} style={{ padding: '6px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <X style={{ width: '20px', height: '20px', color: '#737373' }} />
                </button>
              </div>
            </div>
            <div style={{ padding: '16px 20px' }}>
              {selectedSolution.steps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '22px', height: '22px', background: '#171717', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 600, flexShrink: 0 }}>
                    {idx + 1}
                  </div>
                  <p style={{ fontSize: '14px', color: '#525252', margin: 0, paddingTop: '1px', lineHeight: '1.4' }}>{step}</p>
                </div>
              ))}
            </div>
            <div style={{ padding: '8px 20px 28px' }}>
              <button onClick={() => setShowBottomSheet(false)} style={{ width: '100%', height: '44px', background: '#f5f5f5', color: '#171717', fontSize: '14px', fontWeight: 500, border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
};

export default FeedbackForm;
