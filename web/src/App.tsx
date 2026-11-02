import { useEffect, useState } from 'react'
import './App.css'
import bodyBack from './assets/body/bodyBack.png'
import bodyFront from './assets/body/bodyFront.png'
import forearmFlexorsLeft from './assets/body/front/arms/forearmFlexors-left.png'
import forearmFlexorsRight from './assets/body/front/arms/forearmFlexors-right.png'
import frontBicepLeft from './assets/body/front/arms/frontBicep-left.png'
import frontBicepRight from './assets/body/front/arms/frontBicep-right.png'
import frontDelts from './assets/body/front/arms/frontDelts.png'
import chest from './assets/body/front/torso/chest.png'
import traps from './assets/body/front/torso/traps-transparent.png'
import livleticsLogo from './assets/livleticsLogo.png'
import { getDashboardData } from './application/useCases/getDashboardData'
import type { DashboardData } from './domain/models/dashboard'
import { inMemoryDashboardRepository } from './infrastructure/adapters/inMemoryDashboardRepository'
import { RecoveryCard, InsightCard } from './presentation/components/dashboardCards'

const readinessBars = [92, 86, 78, 94]
const muscleGroups = [
  { id: 'glutes', label: 'Glutes', value: '92% recovered', view: 'back', x: 90, y: 160, width: 60, height: 40, tab: 'lower' },
  { id: 'hamstrings', label: 'Hamstrings', value: '81% recovered', view: 'back', x: 72, y: 200, width: 94, height: 42, tab: 'lower' },
  { id: 'quads', label: 'Quads', value: '63% recovering', view: 'front', x: 72, y: 200, width: 94, height: 42, tab: 'lower' },
  { id: 'traps', label: 'Traps', value: '89% ready', view: 'front', x: 74, y: 58, width: 92, height: 42, tab: 'upper' },
  { id: 'front-delts', label: 'Front delts', value: '97% ready', view: 'front', x: 58, y: 76, width: 124, height: 40, tab: 'upper' },
  { id: 'chest', label: 'Chest', value: '96% ready', view: 'front', x: 72, y: 96, width: 90, height: 46, tab: 'upper' },
  { id: 'shoulders', label: 'Shoulders', value: '97% ready', view: 'front', x: 58, y: 88, width: 120, height: 28, tab: 'upper' },
  { id: 'calves', label: 'Calves', value: '88% recovered', view: 'front', x: 82, y: 250, width: 76, height: 30, tab: 'lower' },
  { id: 'core', label: 'Core', value: '74% recovered', view: 'front', x: 88, y: 116, width: 64, height: 76, tab: 'core' },
  { id: 'back', label: 'Back', value: '84% recovered', view: 'back', x: 74, y: 110, width: 92, height: 52, tab: 'upper' },
  { id: 'biceps', label: 'Biceps', value: '90% ready', view: 'front', x: 52, y: 110, width: 28, height: 52, tab: 'upper' },
  { id: 'triceps', label: 'Triceps', value: '91% ready', view: 'front', x: 160, y: 110, width: 28, height: 52, tab: 'upper' },
  { id: 'forearm-flexors', label: 'Forearm flexors', value: '86% ready', view: 'front', x: 42, y: 152, width: 156, height: 66, tab: 'forearms' },
] as const

const muscleTabs = [
  { id: 'all', label: 'All' },
  { id: 'lower', label: 'Lower body' },
  { id: 'upper', label: 'Upper body' },
  { id: 'forearms', label: 'Forearms' },
  { id: 'core', label: 'Core' },
] as const

function App() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [bodyView, setBodyView] = useState<'front' | 'back'>('front')
  const [selectedMuscle, setSelectedMuscle] = useState<string>('front-delts')
  const [activeMuscleTab, setActiveMuscleTab] = useState<(typeof muscleTabs)[number]['id']>('all')

  const visibleMuscles =
    activeMuscleTab === 'all'
      ? muscleGroups
      : muscleGroups.filter((muscle) => muscle.tab === activeMuscleTab)

  useEffect(() => {
    const loadDashboard = async () => {
      const data = await getDashboardData(inMemoryDashboardRepository)
      setDashboard(data)
      setIsLoading(false)
    }

    void loadDashboard()
  }, [])

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <img src={livleticsLogo} alt="Livletics logo" className="brand-logo" />
        </div>

        <nav className="nav" aria-label="Main navigation">
          <a href="#overview">Overview</a>
          <a href="#training">Training</a>
          <a href="#recovery">Recovery</a>
          <button type="button" className="primary-button">Profile</button>
        </nav>
      </header>

      <main className="dashboard" id="overview">
        <section className="welcome-panel">
          <div>
            <p className="eyebrow accent">Good morning</p>
            <h2>Here&rsquo;s how your body is looking today.</h2>
          </div>
          <button type="button" className="ghost-button">View plan</button>
        </section>

        {isLoading || !dashboard ? (
          <p className="loading-state">Loading dashboard...</p>
        ) : (
          <>
            <section className="readiness-grid">
              <article className="metric-card">
                <p className="card-label">Today&rsquo;s readiness</p>
                <div className="score-block">
                  <strong>{dashboard.readinessScore}</strong>
                </div>
                <div className="mini-bars" aria-label="Readiness score">
                  {readinessBars.map((value, index) => (
                    <span key={index} className={value >= 80 ? 'bar active' : 'bar'} style={{ height: `${value}%` }} />
                  ))}
                </div>
                <p className="status-text">Ready to push</p>
                <div className="status-row">
                  <span>Sleep ✓</span>
                  <span>Recovery ✓</span>
                </div>
              </article>

              <article className="plan-card" id="training">
                <p className="card-label">Today&rsquo;s plan</p>
                <h3>{dashboard.todaysFocus}</h3>
                <p>You&rsquo;re ready for a high-intensity session.</p>
                <button type="button" className="primary-button full-width">Start workout</button>
              </article>
            </section>

            <section className="body-panel" id="recovery">
              <div className="panel-header">
                <p className="eyebrow accent">Your body</p>
                <div className="view-toggle" aria-label="Toggle body view">
                  <button
                    type="button"
                    className={bodyView === 'front' ? 'ghost-button active' : 'ghost-button'}
                    onClick={() => setBodyView('front')}
                  >
                    Front
                  </button>
                  <button
                    type="button"
                    className={bodyView === 'back' ? 'ghost-button active' : 'ghost-button'}
                    onClick={() => setBodyView('back')}
                  >
                    Back
                  </button>
                </div>
              </div>

              <div className="body-figure">
                <div className="figure-column">
                  <div className="muscle-tabs" aria-label="Muscle tabs">
                    {muscleTabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        className={activeMuscleTab === tab.id ? 'muscle-tab active' : 'muscle-tab'}
                        onClick={() => setActiveMuscleTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {visibleMuscles.map((muscle) => (
                    <button
                      key={muscle.id}
                      type="button"
                      className={selectedMuscle === muscle.id ? 'figure-node selected' : 'figure-node'}
                      onClick={() => {
                        setSelectedMuscle(muscle.id)
                        setBodyView(muscle.view)
                      }}
                    >
                      {muscle.label}
                    </button>
                  ))}
                </div>

                <div className="figure-illustration" aria-label="Athlete body map">
                  <div className="body-image-stage">
                    <img
                      src={bodyView === 'front' ? bodyFront : bodyBack}
                      alt={`${bodyView} body view`}
                      className={`body-image ${bodyView}`}
                    />

                    {bodyView === 'front' && selectedMuscle === 'front-delts' ? (
                      <img src={frontDelts} alt="" aria-hidden="true" className="muscle-layer front-delts-layer" />
                    ) : null}

                    {bodyView === 'front' && selectedMuscle === 'chest' ? (
                      <img src={chest} alt="" aria-hidden="true" className="muscle-layer chest-layer" />
                    ) : null}

                    {bodyView === 'front' && selectedMuscle === 'traps' ? (
                      <img src={traps} alt="" aria-hidden="true" className="muscle-layer traps-layer" />
                    ) : null}

                    {bodyView === 'front' && selectedMuscle === 'biceps' ? (
                      <>
                        <img src={frontBicepLeft} alt="" aria-hidden="true" className="muscle-layer front-bicep-layer front-bicep-left-layer" />
                        <img src={frontBicepRight} alt="" aria-hidden="true" className="muscle-layer front-bicep-layer front-bicep-right-layer" />
                      </>
                    ) : null}

                    {bodyView === 'front' && selectedMuscle === 'forearm-flexors' ? (
                      <>
                        <img src={forearmFlexorsLeft} alt="" aria-hidden="true" className="muscle-layer forearm-flexor-layer forearm-flexor-left-layer" />
                        <img src={forearmFlexorsRight} alt="" aria-hidden="true" className="muscle-layer forearm-flexor-layer forearm-flexor-right-layer" />
                      </>
                    ) : null}

                    {muscleGroups
                      .filter((muscle) => muscle.view === bodyView)
                      .map((muscle) => (
                        <button
                          key={muscle.id}
                          type="button"
                          className={[
                            'muscle-hotspot',
                            selectedMuscle === muscle.id ? 'active' : '',
                            ['front-delts', 'chest', 'traps', 'biceps', 'forearm-flexors'].includes(muscle.id) ? 'layer-backed' : '',
                          ].filter(Boolean).join(' ')}
                          aria-label={muscle.label}
                          style={{
                            left: `${(muscle.x / 240) * 100}%`,
                            top: `${(muscle.y / 300) * 100}%`,
                            width: `${(muscle.width / 240) * 100}%`,
                            height: `${(muscle.height / 300) * 100}%`,
                          }}
                          onMouseEnter={() => setSelectedMuscle(muscle.id)}
                          onFocus={() => setSelectedMuscle(muscle.id)}
                          onClick={() => {
                            setSelectedMuscle(muscle.id)
                            setBodyView(muscle.view)
                          }}
                        />
                      ))}
                  </div>
                </div>

                <div className="figure-column right">
                  {visibleMuscles.map((muscle) => (
                    <button
                      key={muscle.id}
                      type="button"
                      className={selectedMuscle === muscle.id ? 'figure-stat selected' : 'figure-stat'}
                      onClick={() => {
                        setSelectedMuscle(muscle.id)
                        setBodyView(muscle.view)
                      }}
                    >
                      {muscle.value}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="recovery-grid">
              {dashboard.recoveryMetrics.map((metric) => (
                <RecoveryCard key={metric.id} metric={metric} />
              ))}
            </section>

            <section className="insights-grid">
              {dashboard.insights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </section>

            <section className="notice-panel">
              <p className="eyebrow accent">Livletics noticed</p>
              <p>
                Your lower-body performance has increased 8% over the last four weeks. Your best sessions followed 2+ days of recovery.
              </p>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App
