import { useState, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Camera, Send, ArrowLeft, Type, Moon, Bell, Image as ImageIcon, Zap, RefreshCw, Sparkles } from 'lucide-react';
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
  const [showStillFacingIssue, setShowStillFacingIssue] = useState(false);

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
      icon: Type,
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
          header: 'Senior Citizens Mode',
          subhead: 'Bigger text, simpler layout, easier reading.',
          type: 'free',
          steps: ['Go to Settings', 'Select Display Options', 'Enable Senior Citizens Mode', 'Enjoy the classic reading interface']
        }
      ]
    },
    'Dark Mode / Brightness': {
      icon: Moon,
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
      icon: Bell,
      title: 'Notification Controls',
      subtitle: 'Manage frequency and types of alerts',
      options: [{
        header: 'Adjust Notifications',
        subhead: 'Control your alerts',
        type: 'free',
        steps: ['Open Settings', 'Tap Notification Preferences', 'Toggle Breaking News, Daily Digest, etc.', 'Set quiet hours if needed']
      }]
    },
    'Images Not Loading': {
      icon: ImageIcon,
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
      icon: Zap,
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
      icon: RefreshCw,
      title: 'Sync Your Content',
      subtitle: 'Refresh and re-sync your data',
      options: [{
        header: 'Force Refresh',
        subhead: 'Resync your data',
        type: 'free',
        steps: ['Go to your home screen', 'Pull down to refresh', 'Wait for sync to complete', 'Check if issue persists']
      }]
    },
    'Too Many Ads': {
      icon: Zap,
      title: 'Ad-Free Reading Options',
      subtitle: 'Enjoy uninterrupted reading experience',
      options: [
        {
          header: 'TOI+ / ET Prime',
          subhead: 'Premium ad-free experience',
          type: 'free',
          steps: ['Subscribe to TOI+ or ET Prime', 'Access exclusive content', 'Enjoy ad-free reading', 'Support quality journalism']
        },
        {
          header: 'Weekend Pass',
          subhead: 'Ad-free weekends',
          type: 'paid',
          price: 9,
          steps: ['Purchase Weekend Pass', 'Valid for Saturday & Sunday', 'Enjoy ad-free browsing', 'Auto-expires Monday']
        }
      ]
    },
    'Irrelevant to Me': {
      icon: Type,
      title: 'Get Quality Articles',
      subtitle: 'Personalize your news feed for better content',
      options: [
        {
          header: 'TOI+ / ET Prime',
          subhead: 'Curated quality articles',
          type: 'free',
          steps: ['Subscribe to TOI+ or ET Prime', 'Access handpicked stories', 'Get in-depth journalism', 'Quality over quantity']
        },
        {
          header: 'Weekend Pass',
          subhead: 'Quality reads for weekends',
          type: 'paid',
          price: 9,
          steps: ['Purchase Weekend Pass', 'Access premium articles', 'Curated weekend reads', 'Valid Sat-Sun only']
        }
      ]
    }
  };

  useEffect(() => {
    if (selectedSubtype) {
      if (solutions[selectedSubtype]) {
        // Has solution - show thinking animation
        setIsAnalyzing(true);
        setShowHelp(false);
        setIsHelpExpanded(true);
        setThinkingTextIndex(0);
        setShowStillFacingIssue(false);
        
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
        // No solution - show feedback form immediately
        setShowHelp(false);
        setIsAnalyzing(false);
        setThinkingTextIndex(0);
        setShowStillFacingIssue(true); // Show feedback form
      }
    } else {
      // No subtype selected - reset everything
      setShowHelp(false);
      setIsAnalyzing(false);
      setThinkingTextIndex(0);
      setShowStillFacingIssue(false);
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
        padding: '10px 16px'
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            style={{
              width: '32px',
              height: '32px',
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
            <ArrowLeft style={{ width: '16px', height: '16px', color: '#171717' }} />
          </button>
          <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#171717', margin: 0 }}>
            Send Feedback
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '16px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
          <div style={{ width: '40%', overflow: 'hidden', borderRadius: '6px' }}>
            <img src={image} alt="Feedback illustration" style={{ width: '100%', height: 'auto', transform: 'scale(1.2)', transformOrigin: 'center', border: 'none' }} />
          </div>
        </div>

        {/* Dropdowns Row */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: '#737373', marginBottom: '6px' }}>
              Issue type
            </label>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value); setSelectedSubtype(''); }}
                style={{
                  width: '100%', height: '40px', padding: '0 32px 0 10px', fontSize: '13px',
                  background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: '6px',
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
                  width: '100%', height: '40px', padding: '0 32px 0 10px', fontSize: '13px',
                  background: selectedType ? '#fafafa' : '#f5f5f5',
                  border: '1px solid', borderColor: selectedType ? '#e5e5e5' : '#f5f5f5',
                  borderRadius: '6px', appearance: 'none',
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

        {/* Thinking Animation - Show when solution exists (stays visible even after CTA click) */}
        {solutions[selectedSubtype] && (isAnalyzing || showHelp) && (
          <div
            style={{
              marginBottom: '10px',
              padding: '10px 12px',
              background: '#fafafa',
              border: '1px solid #e5e5e5',
              borderRadius: '6px',
              opacity: isAnalyzing ? 0 : 1,
              animation: isAnalyzing ? 'fadeIn 0.3s ease-in-out forwards' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isAnalyzing && (
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span style={{ width: '5px', height: '5px', background: '#a3a3a3', borderRadius: '50%', animation: 'pulse 1.4s infinite' }} />
                  <span style={{ width: '5px', height: '5px', background: '#a3a3a3', borderRadius: '50%', animation: 'pulse 1.4s infinite 0.15s' }} />
                  <span style={{ width: '5px', height: '5px', background: '#a3a3a3', borderRadius: '50%', animation: 'pulse 1.4s infinite 0.3s' }} />
                </div>
              )}
              <span 
                style={{ 
                  fontSize: '13px', 
                  color: '#737373',
                  position: 'relative',
                  display: 'inline-block',
                  minWidth: '200px'
                }}
              >
                {isAnalyzing ? (
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
                ) : (
                  <span>We might have a solve for this</span>
                )}
              </span>
            </div>
          </div>
        )}

        {/* Help Block - Show when solution exists (stays visible even after CTA click) */}
        {solutions[selectedSubtype] && showHelp && (
          <div
            style={{
              marginBottom: '10px',
              border: '1px solid #e5e5e5',
              borderRadius: '6px',
              overflow: 'hidden',
              opacity: 0,
              animation: 'fadeIn 0.3s ease-in-out forwards',
              position: 'relative'
            }}
          >
            <div style={{ 
              position: 'relative',
              zIndex: 2,
              opacity: 0,
              animation: 'fadeIn 0.4s ease-in-out 0.2s forwards'
            }}>
              <button
                onClick={() => setIsHelpExpanded(!isHelpExpanded)}
                style={{
                  width: '100%', padding: '10px 12px', background: '#fafafa', border: 'none',
                  display: 'flex', alignItems: 'flex-start', gap: '10px', textAlign: 'left', cursor: 'pointer'
                }}
              >
                {(() => {
                  const IconComponent = solutions[selectedSubtype].icon;
                  return IconComponent ? <IconComponent style={{ width: '18px', height: '18px', color: '#171717', flexShrink: 0 }} /> : null;
                })()}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 500, color: '#171717', margin: 0 }}>
                    {solutions[selectedSubtype].title}
                  </h3>
                  <p style={{ fontSize: '11px', color: '#737373', margin: '1px 0 0' }}>
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
                <div style={{ padding: '10px 12px', borderTop: '1px solid #f5f5f5' }}>
                  <p style={{ fontSize: '10px', color: '#a3a3a3', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick solutions</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {solutions[selectedSubtype].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => openSolution(option)}
                        style={{
                          position: 'relative',
                          width: '100%',
                          padding: '10px',
                          background: '#fafafa',
                          border: '1px solid #e5e5e5',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          minHeight: '90px'
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
                          <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#171717', margin: '0 0 2px', lineHeight: '1.3' }}>
                            {option.header || option.title}
                          </h4>
                          <p style={{ fontSize: '10px', color: '#737373', margin: 0, lineHeight: '1.3' }}>
                            {option.subhead || ''}
                          </p>
                        </div>
                        <div style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '6px'
                        }}>
                          {option.type === 'paid' && (
                            <span style={{ fontSize: '11px', fontWeight: 600, color: '#171717' }}>
                              ₹{option.price}
                            </span>
                          )}
                          {option.type === 'free' && (
                            <span style={{ width: '1px' }}></span>
                          )}
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 500,
                            color: '#fff',
                            background: '#171717',
                            padding: '3px 8px',
                            borderRadius: '10px'
                          }}>
                            {option.type === 'free' ? 'Claim' : 'Unlock'}
                          </span>
                        </div>
                      </button>
                    ))}
                    {/* Explore All Tools - Constant last box */}
                    <button
                      onClick={() => {
                        const toast = document.createElement('div');
                        toast.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);background:#262626;color:#fff;font-size:14px;padding:10px 16px;border-radius:8px;z-index:9999;';
                        toast.textContent = 'Exploring all tools...';
                        document.body.appendChild(toast);
                        setTimeout(() => {
                          toast.style.opacity = '0';
                          toast.style.transition = 'opacity 0.2s';
                          setTimeout(() => toast.remove(), 200);
                        }, 2000);
                      }}
                      style={{
                        position: 'relative',
                        width: '100%',
                        padding: '10px',
                        background: 'linear-gradient(135deg, #f8f7ff 0%, #f0f4ff 50%, #f7f0ff 100%)',
                        border: '1px solid #e0e0f0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        transition: 'all 0.3s ease',
                        minHeight: '90px',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#c0c0e0';
                        e.currentTarget.style.boxShadow = '0 2px 12px rgba(120, 100, 200, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e0e0f0';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '200%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                        animation: 'shimmer 3s infinite',
                        pointerEvents: 'none'
                      }} />
                      <div style={{ flex: 1, width: '100%', position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                          <Sparkles style={{ width: '12px', height: '12px', color: '#7c6eaa' }} />
                          <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#171717', margin: 0, lineHeight: '1.3' }}>
                            Personalize your app
                          </h4>
                        </div>
                        <p style={{ fontSize: '10px', color: '#737373', margin: 0, lineHeight: '1.3' }}>
                          Discover tools that work your way
                        </p>
                      </div>
                      <div style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginTop: '6px',
                        position: 'relative',
                        zIndex: 1
                      }}>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 500,
                          color: '#7c6eaa',
                          background: 'rgba(124, 110, 170, 0.1)',
                          padding: '3px 8px',
                          borderRadius: '10px'
                        }}>
                          Explore
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Still Facing Issue CTA - Show when solution exists and user hasn't clicked it */}
        {solutions[selectedSubtype] && showHelp && !showStillFacingIssue && (
          <button
            onClick={() => setShowStillFacingIssue(true)}
            style={{
              width: '100%',
              padding: '10px 14px',
              background: '#171717',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 500,
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              marginBottom: '12px',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#262626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#171717';
            }}
          >
            Still facing the issue?
          </button>
        )}

        {/* Feedback Form - Show when no solution OR user clicked "Still facing the issue" */}
        {(!solutions[selectedSubtype] || showStillFacingIssue) && selectedSubtype && (
          <>
            {/* Feedback Text */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#737373', marginBottom: '4px' }}>
                Describe the issue
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell us what happened..."
                style={{
                  width: '100%', height: '70px', padding: '10px', fontSize: '13px',
                  background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: '6px',
                  resize: 'none', outline: 'none', color: '#171717', lineHeight: '1.4'
                }}
              />
            </div>

            {/* Screenshot Upload */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 500, color: '#737373', marginBottom: '4px' }}>
                Screenshot (optional)
              </label>
              <button
                onClick={handleImageUpload}
                style={{
                  width: '100%', height: '56px', border: '1px dashed #d4d4d4', borderRadius: '6px',
                  background: 'transparent', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '2px', cursor: 'pointer'
                }}
              >
                <Camera style={{ width: '18px', height: '18px', color: '#a3a3a3' }} />
                <span style={{ fontSize: '11px', color: '#737373' }}>Tap to upload</span>
              </button>
            </div>
          </>
        )}

        {/* Submit Button - Only show when feedback form is visible */}
        {(!solutions[selectedSubtype] || showStillFacingIssue) && selectedSubtype && (
          <button
            disabled={!canSubmit}
            style={{
              width: '100%', height: '38px', background: canSubmit ? '#171717' : '#e5e5e5',
              color: canSubmit ? '#fff' : '#a3a3a3', fontSize: '13px', fontWeight: 500,
              border: 'none', borderRadius: '19px', cursor: canSubmit ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              transition: 'background 0.2s, color 0.2s'
            }}
          >
            <Send style={{ width: '14px', height: '14px' }} />
            Send Feedback
          </button>
        )}
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
        @keyframes shimmer { 0% { transform: translateX(0); } 100% { transform: translateX(100%); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
};

export default FeedbackForm;
