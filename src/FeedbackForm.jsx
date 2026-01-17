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
  const [thinkingTextIndex, setThinkingTextIndex] = useState(0);

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
        { 
          header: 'Adjust Text Size', 
          subhead: 'Customize your reading experience',
          type: 'free',
          steps: ['Open Settings from the menu', 'Navigate to Display Settings', 'Use the Text Size slider to adjust', 'Changes apply instantly'] 
        },
        { 
          header: 'Old Mode', 
          subhead: 'Bigger text, simpler layout, easier reading.',
          type: 'paid',
          price: 9,
          steps: ['Go to Settings', 'Select Display Options', 'Enable Old Mode', 'Enjoy the classic reading interface'] 
        }
      ]
    },
    'Dark Mode / Brightness': {
      icon: '🌙',
      title: 'Theme Customization',
      subtitle: 'Switch between Light, Dark, or Auto themes',
      options: [{ 
        header: 'Change Theme', 
        subhead: 'Personalize your app appearance',
        type: 'free',
        steps: ['Go to Settings', 'Select Display Settings', 'Choose Light, Dark, or System', 'Theme changes immediately'] 
      }]
    },
    'Notifications Issues': {
      icon: '🔔',
      title: 'Notification Controls',
      subtitle: 'Manage frequency and types of alerts',
      options: [{ 
        header: 'Adjust Notifications', 
        subhead: 'Control your alerts',
        type: 'paid',
        price: 29,
        steps: ['Open Settings', 'Tap Notification Preferences', 'Toggle Breaking News, Daily Digest, etc.', 'Set quiet hours if needed'] 
      }]
    },
    'Images Not Loading': {
      icon: '🖼️',
      title: 'Image Loading Settings',
      subtitle: 'Optimize for your network connection',
      options: [{ 
        header: 'Data Saver Mode', 
        subhead: 'Save data while browsing',
        type: 'free',
        steps: ['Go to Settings', 'Enable Data Saver', 'Images load in lower quality', 'Faster loading on slow networks'] 
      }]
    },
    'App Crashing / Freezing': {
      icon: '⚡',
      title: 'Quick Fixes',
      subtitle: 'Common solutions for stability issues',
      options: [{ 
        header: 'Update App', 
        subhead: 'Get the latest version',
        type: 'free',
        steps: ['Open your app store', 'Search for the app', 'Tap Update if available', 'Restart after updating'] 
      }]
    },
    'Login / Sync Issues': {
      icon: '🔄',
      title: 'Sync Your Content',
      subtitle: 'Refresh and re-sync your data',
      options: [{ 
        header: 'Force Refresh', 
        subhead: 'Resync your data',
        type: 'paid',
        price: 49,
        steps: ['Go to your home screen', 'Pull down to refresh', 'Wait for sync to complete', 'Check if issue persists'] 
      }]
    }
  };

  useEffect(() => {
    if (selectedSubtype && solutions[selectedSubtype]) {
      setIsAnalyzing(true);
      setShowHelp(false);
      setIsHelpExpanded(true);
      setThinkingTextIndex(0);
      
      // Change text after 1.5 seconds
      const textTimer = setTimeout(() => {
        setThinkingTextIndex(1);
      }, 1500);
      
      // Show help after 2.5 seconds total
      const helpTimer = setTimeout(() => {
        setIsAnalyzing(false);
        setShowHelp(true);
      }, 2500);
      
      return () => {
        clearTimeout(textTimer);
        clearTimeout(helpTimer);
      };
    } else {
      setShowHelp(false);
      setIsAnalyzing(false);
      setThinkingTextIndex(0);
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
          <div style={{ width: '60%', overflow: 'hidden', borderRadius: '8px' }}>
            <img src={image} alt="Feedback illustration" style={{ width: '100%', height: 'auto', transform: 'scale(1.2)', transformOrigin: 'center', border: 'none' }} />
          </div>
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

        {/* Analyzing/Help Block - Combined container that expands - Always in DOM above screenshot */}
        <div 
          style={{
            marginBottom: ((isAnalyzing || showHelp) && solutions[selectedSubtype]) ? '20px' : '0',
            border: ((isAnalyzing || showHelp) && solutions[selectedSubtype]) ? '1px solid #e5e5e5' : 'transparent',
            borderRadius: '8px',
            overflow: 'hidden',
            opacity: ((isAnalyzing || showHelp) && solutions[selectedSubtype]) ? 0 : 0,
            animation: ((isAnalyzing || showHelp) && solutions[selectedSubtype]) ? 'fadeIn 0.3s ease-in-out forwards' : 'none',
            position: 'relative',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            minHeight: ((isAnalyzing || showHelp) && solutions[selectedSubtype]) ? 'auto' : '0',
            maxHeight: ((isAnalyzing || showHelp) && solutions[selectedSubtype]) ? '1000px' : '0'
          }}
        >
          {(isAnalyzing || showHelp) && solutions[selectedSubtype] && (
            <>
            {isAnalyzing && (
              <div style={{ 
                padding: '14px 16px', 
                background: '#fafafa',
                position: 'relative',
                zIndex: 1,
                opacity: isAnalyzing ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: showHelp ? 'translateY(-100%)' : 'translateY(0)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span style={{ width: '5px', height: '5px', background: '#a3a3a3', borderRadius: '50%', animation: 'pulse 1.4s infinite' }} />
                    <span style={{ width: '5px', height: '5px', background: '#a3a3a3', borderRadius: '50%', animation: 'pulse 1.4s infinite 0.15s' }} />
                    <span style={{ width: '5px', height: '5px', background: '#a3a3a3', borderRadius: '50%', animation: 'pulse 1.4s infinite 0.3s' }} />
                  </div>
                  <span 
                    style={{ 
                      fontSize: '13px', 
                      color: '#737373',
                      position: 'relative',
                      display: 'inline-block',
                      minWidth: '200px'
                    }}
                  >
                    <span
                      key={thinkingTextIndex}
                      style={{
                        display: 'inline-block',
                        opacity: 0,
                        animation: 'fadeInText 0.5s ease-in-out forwards'
                      }}
                    >
                      {thinkingTextIndex === 0 ? 'Checking for quick solutions...' : 'We might have a solve for this'}
                    </span>
                  </span>
                </div>
              </div>
            )}
            {showHelp && (
              <div style={{ 
                position: 'relative',
                zIndex: 2,
                opacity: 0,
                animation: 'fadeIn 0.4s ease-in-out 0.2s forwards',
                transform: isAnalyzing ? 'translateY(-20px)' : 'translateY(0)',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
              }}>
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                      {solutions[selectedSubtype].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => openSolution(option)}
                          style={{
                            position: 'relative',
                            width: '100%',
                            aspectRatio: '1',
                            padding: '12px',
                            background: '#fafafa',
                            border: '1px solid #e5e5e5',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                            textAlign: 'left',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f5f5f5';
                            e.currentTarget.style.borderColor = '#d4d4d4';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#fafafa';
                            e.currentTarget.style.borderColor = '#e5e5e5';
                          }}
                        >
                          <div style={{ flex: 1, width: '100%' }}>
                            <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#171717', margin: '0 0 4px', lineHeight: '1.3' }}>
                              {option.header || option.title}
                            </h4>
                            <p style={{ fontSize: '11px', color: '#737373', margin: 0, lineHeight: '1.4' }}>
                              {option.subhead || ''}
                            </p>
                          </div>
                          <div style={{ 
                            width: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            marginTop: '8px'
                          }}>
                            {option.type === 'paid' && (
                              <span style={{ fontSize: '12px', fontWeight: 600, color: '#171717' }}>
                                ₹{option.price}
                              </span>
                            )}
                            {option.type === 'free' && (
                              <span style={{ width: '1px' }}></span>
                            )}
                            <span style={{
                              fontSize: '11px',
                              fontWeight: 500,
                              color: '#fff',
                              background: option.type === 'free' ? '#171717' : '#171717',
                              padding: '4px 10px',
                              borderRadius: '12px'
                            }}>
                              {option.type === 'free' ? 'Claim' : 'Unlock'}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            </>
          )}
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
                <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#171717', margin: 0 }}>{selectedSolution.header || selectedSolution.title}</h2>
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
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInText { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
};

export default FeedbackForm;
