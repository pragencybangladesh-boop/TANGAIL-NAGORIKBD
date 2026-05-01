import { useEffect, useState } from 'react';
import { Loader2, MapPin, Cloud, Droplets, Wind, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function WeatherPage() {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetch(`/api/weather?lat=${latitude}&lon=${longitude}`)
                    .then(res => res.json())
                    .then(data => {
                        setWeather(data);
                        setLoading(false);
                    })
                    .catch(() => setLoading(false));
            }, () => setLoading(false));
        }
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-primary" /></div>;
    if (!weather) return <div className="min-h-screen flex items-center justify-center text-slate-500">Weather data unavailable.</div>;

    const current = weather.list[0];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                    <Cloud className="text-primary w-10 h-10" /> 
                    {weather.city.name} Weather Forecast
                </h1>
                <p className="text-slate-500 mb-10">Detailed 5-day weather forecast (updated every 3 hours).</p>

                <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm mb-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold uppercase text-slate-500">Current Temperature</p>
                            <h2 className="text-6xl font-bold text-slate-900">{Math.round(current.main.temp)}°C</h2>
                            <p className="text-lg text-slate-600 capitalize mt-2">{current.weather[0].description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center gap-3">
                                <Droplets className="text-blue-500" />
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Humidity</p>
                                    <p className="font-bold">{current.main.humidity}%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Wind className="text-slate-500" />
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Wind Speed</p>
                                    <p className="font-bold">{current.wind.speed} m/s</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-6">Upcoming Forecast</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {weather.list.slice(0, 12).map((item: any, i: number) => (
                        <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
                            <p className="text-xs text-slate-400 font-bold">{new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p className="text-2xl font-bold my-2">{Math.round(item.main.temp)}°C</p>
                            <p className="text-xs text-slate-600 truncate">{item.weather[0].main}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
