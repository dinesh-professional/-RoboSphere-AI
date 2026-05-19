"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Activity, Battery, Radio, Settings, ShieldAlert, Thermometer, Wifi,
  Bot, Zap, LayoutDashboard, Box as BoxIcon, Map as MapIcon, Video, AlertTriangle,
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Square, Crosshair, LogOut
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Sphere } from '@react-three/drei';

const performanceData = [
  { time: "00:00", cpu: 40, memory: 60 },
  { time: "04:00", cpu: 30, memory: 55 },
  { time: "08:00", cpu: 60, memory: 70 },
  { time: "12:00", cpu: 45, memory: 65 },
  { time: "16:00", cpu: 80, memory: 85 },
  { time: "20:00", cpu: 55, memory: 60 },
  { time: "24:00", cpu: 70, memory: 75 },
];

const fleetData = [
  { name: 'UNIT_X99', uptime: 98, efficiency: 92 },
  { name: 'UNIT_X42', uptime: 85, efficiency: 78 },
  { name: 'UNIT_A01', uptime: 40, efficiency: 30 },
  { name: 'UNIT_B11', uptime: 99, efficiency: 95 },
];

export default function Dashboard({ onLogout }: { onLogout?: () => void }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }) + '.' + now.getMilliseconds().toString().padStart(3, '0'));
    };
    const timer = setInterval(updateTime, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-r border-r-primary/20 flex flex-col justify-between relative z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 text-primary mb-10">
            <Bot size={32} className="drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
            <h1 className="text-2xl font-bold tracking-wider font-mono">ROBOSPHERE</h1>
          </div>
          
          <nav className="space-y-4">
            <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
            <NavItem icon={<BoxIcon />} label="Fleet Control" active={activeTab === "fleet"} onClick={() => setActiveTab("fleet")} />
            <NavItem icon={<Activity />} label="Analytics" active={activeTab === "analytics"} onClick={() => setActiveTab("analytics")} />
            <NavItem icon={<MapIcon />} label="Simulation" active={activeTab === "simulation"} onClick={() => setActiveTab("simulation")} />
            <NavItem icon={<Settings />} label="Settings" active={activeTab === "settings"} onClick={() => setActiveTab("settings")} />
          </nav>
        </div>
        
        <div className="p-6 border-t border-t-primary/20 bg-black/20 flex flex-col gap-4">
          <button 
            onClick={() => {
              if (onLogout) onLogout();
              else router.push('/');
            }}
            className="flex items-center justify-center gap-2 w-full py-2 rounded bg-alert/10 text-alert border border-alert/30 hover:bg-alert/20 transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <LogOut size={16} /> SYSTEM LOGOUT
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-mono text-gray-400">SYS.ON</span>
            </div>
            <span className="text-xs font-mono text-primary">{time}</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto relative z-10">
        {/* Header */}
        <header className="h-20 glass-panel border-b border-b-primary/20 flex items-center justify-between px-8 sticky top-0 z-30 bg-background/80 backdrop-blur-md">
          <div>
            <h2 className="text-xl font-bold text-white capitalize">{activeTab.replace("-", " ")} Center</h2>
            <p className="text-xs text-gray-400 font-mono">LAT: 37.7749 N | LNG: 122.4194 W</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-primary">
              <Wifi size={18} />
              <span className="text-sm font-mono">1024 Mbps</span>
            </div>
            <div className="h-8 w-[1px] bg-primary/30" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/50 flex items-center justify-center">
                <span className="font-bold text-primary">OP</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-8 space-y-6 flex-1">
          {activeTab === "dashboard" && <OverviewTab />}
          {activeTab === "fleet" && <FleetControlTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "simulation" && <SimulationTab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}

// --- TAB COMPONENTS ---

function OverviewTab() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Active Robots" value="1,204" icon={<Bot />} color="text-primary" />
        <StatCard title="Network Latency" value="12ms" icon={<Radio />} color="text-success" />
        <StatCard title="Critical Alerts" value="3" icon={<ShieldAlert />} color="text-alert" />
        <StatCard title="Total Power Draw" value="1.4 MW" icon={<Zap />} color="text-ai" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-xl p-1 relative overflow-hidden group min-h-[400px]">
          <div className="absolute inset-0 bg-black/40 z-10 flex flex-col p-4 justify-between pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-alert bg-alert/10 px-3 py-1 rounded-full border border-alert/30 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-alert animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-widest">LIVE REC</span>
              </div>
              <Video className="text-white/50" />
            </div>
            <div className="font-mono text-sm text-primary drop-shadow-md">
              CAM_01_UNIT_X99
            </div>
          </div>
          <div className="w-full h-full bg-[#0a0a0a] rounded-lg flex items-center justify-center border border-primary/10 relative">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-luminosity"></div>
             <div className="absolute inset-0 bg-primary/10 mix-blend-color"></div>
             <div className="absolute inset-0 flex items-center justify-center flex-col">
                <Crosshair size={64} className="text-primary/50 animate-pulse" />
             </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <h3 className="font-bold text-white mb-6">Fleet Status</h3>
          <div className="space-y-4">
            <RobotListItem id="UNIT_X99" status="Active" battery={89} temp={42} />
            <RobotListItem id="UNIT_X42" status="Charging" battery={12} temp={31} />
            <RobotListItem id="UNIT_A01" status="Maintenance" battery={0} temp={22} isAlert />
            <RobotListItem id="UNIT_B11" status="Active" battery={65} temp={38} />
          </div>
        </div>
      </div>
    </>
  );
}

function FleetControlTab() {
  const [speed, setSpeed] = useState(50);
  const [telemetry, setTelemetry] = useState<any>(null);
  const [wsStatus, setWsStatus] = useState("CONNECTING...");

  useEffect(() => {
    let mockInterval: NodeJS.Timeout;
    const ws = new WebSocket("ws://localhost:8080/ws/telemetry");
    
    ws.onopen = () => setWsStatus("CONNECTED");
    
    // When deployed on Vercel, the local backend won't exist. Fallback to Demo Mode.
    ws.onclose = () => {
      setWsStatus("DEMO MODE (STANDALONE)");
      mockInterval = setInterval(() => {
        setTelemetry({
          unit_id: "UNIT_X99",
          battery: Math.floor(Math.random() * (100 - 85) + 85),
          temperature: (Math.random() * (45 - 38) + 38).toFixed(1)
        });
      }, 2000);
    };
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTelemetry(data);
    };

    return () => {
      ws.close();
      if (mockInterval) clearInterval(mockInterval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-2 glass-panel rounded-xl flex flex-col overflow-hidden">
        <div className="h-[60%] relative border-b border-primary/20">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-60 grayscale"></div>
             <div className="absolute inset-0 bg-primary/10"></div>
             <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded border border-primary/30 text-primary font-mono text-sm">
                FPV - {telemetry ? telemetry.unit_id : "UNIT_X99"}
             </div>
        </div>
        <div className="p-6 flex-1 grid grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center">
                <p className="text-primary font-mono mb-4 text-sm">MOVEMENT CONTROLS</p>
                <div className="grid grid-cols-3 gap-2">
                    <div />
                    <ControlButton icon={<ArrowUp />} />
                    <div />
                    <ControlButton icon={<ArrowLeft />} />
                    <ControlButton icon={<ArrowDown />} />
                    <ControlButton icon={<ArrowRight />} />
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-primary font-mono mb-4 text-sm">SPEED LIMITER: {speed}%</p>
                <input type="range" min="0" max="100" value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))} className="w-full accent-primary h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer" />
                <div className="flex gap-4 mt-8">
                    <button className="flex-1 bg-success/20 text-success border border-success/50 py-3 rounded hover:bg-success/30 font-bold flex items-center justify-center gap-2"><Play size={18}/> START</button>
                    <button className="flex-1 bg-alert/20 text-alert border border-alert/50 py-3 rounded hover:bg-alert/30 font-bold flex items-center justify-center gap-2"><Square size={18}/> E-STOP</button>
                </div>
            </div>
        </div>
      </div>
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-white flex items-center gap-2"><Activity size={18} className="text-telemetry" /> Live Telemetry</h3>
            <span className={`text-xs font-mono px-2 py-1 rounded ${wsStatus === 'CONNECTED' ? 'bg-success/20 text-success' : 'bg-alert/20 text-alert'}`}>{wsStatus}</span>
        </div>
        <div className="space-y-6">
            <TelemetryRow label="CPU TEMP" value={telemetry ? `${telemetry.temperature} °C` : "-- °C"} />
            <TelemetryRow label="MOTOR 1 RPM" value="1,204" />
            <TelemetryRow label="MOTOR 2 RPM" value="1,198" />
            <TelemetryRow label="LIDAR STATUS" value="OK" color="text-success" />
            <TelemetryRow label="CAMERA FEED" value="STABLE" color="text-success" />
            <TelemetryRow label="BATTERY" value={telemetry ? `${telemetry.battery}%` : "--%"} color={telemetry && telemetry.battery > 20 ? "text-success" : "text-alert"} />
            <TelemetryRow label="LAST ERROR" value="COLLISION_AVERT" color="text-alert" />
        </div>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-xl p-6 min-h-[300px] flex flex-col">
              <h3 className="font-bold text-white mb-6">Fleet Performance (CPU/Mem)</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="time" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(11, 12, 27, 0.9)', borderColor: '#00f0ff' }} />
                    <Line type="monotone" dataKey="cpu" stroke="#00f0ff" strokeWidth={2} name="CPU %" />
                    <Line type="monotone" dataKey="memory" stroke="#b026ff" strokeWidth={2} name="Memory %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="glass-panel rounded-xl p-6 min-h-[300px] flex flex-col">
              <h3 className="font-bold text-white mb-6">Unit Efficiency</h3>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fleetData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(11, 12, 27, 0.9)', borderColor: '#00ff66' }} />
                    <Bar dataKey="efficiency" fill="#00ff66" name="Efficiency Score" />
                    <Bar dataKey="uptime" fill="#00f0ff" name="Uptime %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
        </div>
        <div className="glass-panel rounded-xl p-6">
            <h3 className="font-bold text-white mb-4">Anomaly Detection Logs</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                    <thead className="text-xs uppercase bg-white/5 text-primary border-b border-primary/20">
                        <tr>
                            <th className="px-6 py-3">Timestamp</th>
                            <th className="px-6 py-3">Unit ID</th>
                            <th className="px-6 py-3">Event Type</th>
                            <th className="px-6 py-3">Severity</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono">
                        <tr className="border-b border-white/10 hover:bg-white/5">
                            <td className="px-6 py-4">2026-05-19 14:02:11</td>
                            <td className="px-6 py-4 text-primary">UNIT_A01</td>
                            <td className="px-6 py-4">Battery Voltage Drop</td>
                            <td className="px-6 py-4 text-alert">CRITICAL</td>
                        </tr>
                        <tr className="border-b border-white/10 hover:bg-white/5">
                            <td className="px-6 py-4">2026-05-19 12:45:00</td>
                            <td className="px-6 py-4 text-primary">UNIT_X42</td>
                            <td className="px-6 py-4">Pathfinding Recalculation</td>
                            <td className="px-6 py-4 text-ai">WARNING</td>
                        </tr>
                        <tr className="border-b border-white/10 hover:bg-white/5">
                            <td className="px-6 py-4">2026-05-19 10:12:45</td>
                            <td className="px-6 py-4 text-primary">UNIT_X99</td>
                            <td className="px-6 py-4">Motor Temp Spike</td>
                            <td className="px-6 py-4 text-ai">WARNING</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

function SimulationTab() {
  return (
    <div className="w-full h-full glass-panel rounded-xl flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
            <h2 className="text-2xl font-bold font-mono text-white tracking-widest">
                3D DIGITAL TWIN <span className="text-primary text-sm bg-primary/20 px-2 py-1 ml-2 rounded">ONLINE</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm mt-1">PHYSICS ENGINE: ACTIVE</p>
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="w-full h-full">
            <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#b026ff" />
                
                <group position={[0, -1, 0]}>
                   {/* Base */}
                   <Box args={[2, 0.5, 2]} position={[0, 0.25, 0]}>
                      <meshStandardMaterial color="#1a1c2e" wireframe={false} metalness={0.8} roughness={0.2} />
                   </Box>
                   {/* Body */}
                   <Cylinder args={[0.5, 0.5, 2, 32]} position={[0, 1.5, 0]}>
                      <meshStandardMaterial color="#00f0ff" wireframe={true} />
                   </Cylinder>
                   {/* Head */}
                   <Sphere args={[0.6, 32, 32]} position={[0, 2.8, 0]}>
                      <meshStandardMaterial color="#b026ff" metalness={0.9} roughness={0.1} />
                   </Sphere>
                </group>
                <OrbitControls autoRotate autoRotateSpeed={2} enablePan={false} />
            </Canvas>
        </div>
    </div>
  );
}

function SettingsTab() {
  const [autoPilot, setAutoPilot] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="glass-panel rounded-xl p-8 max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold font-mono text-white mb-8 border-b border-white/10 pb-4">SYSTEM PREFERENCES</h2>
      <div className="space-y-6">
          <div className="flex items-center justify-between">
              <div>
                  <h4 className="text-white font-bold">Auto-Pilot Default</h4>
                  <p className="text-gray-400 text-sm">Robots will auto-navigate unless overridden.</p>
              </div>
              <div 
                onClick={() => setAutoPilot(!autoPilot)}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${autoPilot ? 'bg-primary/20' : 'bg-gray-800'}`}>
                  <div className={`w-6 h-6 rounded-full absolute transition-all duration-300 ${autoPilot ? 'right-0 bg-primary shadow-[0_0_10px_#00f0ff]' : 'left-0 bg-gray-500'}`}></div>
              </div>
          </div>
          
          <div className="flex items-center justify-between">
              <div>
                  <h4 className="text-white font-bold">Critical Notifications</h4>
                  <p className="text-gray-400 text-sm">Push alerts for battery & collision.</p>
              </div>
              <div 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${notifications ? 'bg-primary/20' : 'bg-gray-800'}`}>
                  <div className={`w-6 h-6 rounded-full absolute transition-all duration-300 ${notifications ? 'right-0 bg-primary shadow-[0_0_10px_#00f0ff]' : 'left-0 bg-gray-500'}`}></div>
              </div>
          </div>
          
          <div className="flex items-center justify-between">
              <div>
                  <h4 className="text-white font-bold">High Contrast Mode</h4>
                  <p className="text-gray-400 text-sm">Increase visibility for field operations.</p>
              </div>
              <div 
                onClick={() => setHighContrast(!highContrast)}
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-300 ${highContrast ? 'bg-primary/20' : 'bg-gray-800'}`}>
                  <div className={`w-6 h-6 rounded-full absolute transition-all duration-300 ${highContrast ? 'right-0 bg-primary shadow-[0_0_10px_#00f0ff]' : 'left-0 bg-gray-500'}`}></div>
              </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex justify-end">
              <button className="bg-primary text-black font-bold py-2 px-6 rounded hover:bg-white hover:shadow-[0_0_15px_#fff] transition-all">SAVE CONFIG</button>
          </div>
      </div>
    </div>
  );
}

// --- UTILS & MICRO-COMPONENTS ---

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 ${active ? 'bg-primary/20 text-primary border border-primary/50 translate-x-2' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
      {icon}
      <span className="font-medium">{label}</span>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="glass-panel rounded-xl p-6 relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-current opacity-5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110 ${color}`} />
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-gray-400 text-sm font-mono mb-1">{title}</p>
          <h4 className="text-3xl font-bold text-white">{value}</h4>
        </div>
        <div className={`p-3 rounded-lg bg-white/5 ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function RobotListItem({ id, status, battery, temp, isAlert }: { id: string, status: string, battery: number, temp: number, isAlert?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${isAlert ? 'bg-alert/10 border-alert/30' : 'bg-white/5 border-white/10'} hover:border-primary/50 transition-colors cursor-pointer flex-wrap gap-y-2`}>
      <div className="flex items-center gap-3 shrink-0">
        <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${isAlert ? 'bg-alert/20 text-alert' : 'bg-primary/20 text-primary'}`}>
          <Bot size={20} />
        </div>
        <div>
          <h5 className="font-bold text-white text-sm sm:text-base">{id}</h5>
          <p className={`text-xs font-mono ${isAlert ? 'text-alert' : 'text-gray-400'}`}>{status}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 shrink-0 ml-auto">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300">
          <Battery size={16} className={battery > 20 ? 'text-success' : 'text-alert'} />
          <span>{battery}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300">
          <Thermometer size={16} className={temp > 70 ? 'text-alert' : 'text-telemetry'} />
          <span>{temp}°C</span>
        </div>
      </div>
    </div>
  );
}

function ControlButton({ icon }: { icon: React.ReactNode }) {
    return (
        <button className="w-14 h-14 bg-white/5 border border-white/10 rounded flex items-center justify-center text-primary hover:bg-primary/20 hover:border-primary/50 transition-colors active:scale-95">
            {icon}
        </button>
    )
}

function TelemetryRow({ label, value, color = "text-white" }: { label: string, value: string, color?: string }) {
    return (
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-gray-400 text-sm font-mono">{label}</span>
            <span className={`font-mono font-bold ${color}`}>{value}</span>
        </div>
    )
}
