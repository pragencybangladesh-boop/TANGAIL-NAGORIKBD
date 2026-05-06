import { useEffect, useState } from 'react';
import { Loader2, MapPin, Cloud, Droplets, Wind, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function WeatherPage() {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async (latitude: number, longitude: number) => {
            try {
                // Using internal proxy to avoid CORS/blocked domains
                const res = await fetch(`/api/weather-proxy?lat=${latitude}&lon=${longitude}`);
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.details || errorData.error || 'Weather API failed');
                }
                const data = await res.json();
                
                let cityName = 'Sylhet';
                try {
                    // Fetch city name via internal geocoding proxy
                    const geoRes = await fetch(`/api/reverse-geo?lat=${latitude}&lon=${longitude}`);
                    if (geoRes.ok) {
                        const geoData = await geoRes.json();
                        if (geoData && geoData.address) {
                            cityName = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.county || 'Sylhet';
                        }
                    }
                } catch (geoErr) {
                    console.warn("Could not fetch city name", geoErr);
                }
                
                if (data.current && data.hourly) {
                    // Find the index of the current hour in hourly data
                    const currentHourStr = new Date().toISOString().split(':')[0] + ':00';
                    const startIndex = data.hourly.time.findIndex((t: string) => t.startsWith(currentHourStr));
                    const safeStartIndex = startIndex !== -1 ? startIndex : 0;

                    setWeather({
                        city: cityName,
                        current: data.current,
                        hourly: {
                            time: data.hourly.time.slice(safeStartIndex, safeStartIndex + 12),
                            temperature_2m: data.hourly.temperature_2m.slice(safeStartIndex, safeStartIndex + 12),
                            weather_code: data.hourly.weather_code.slice(safeStartIndex, safeStartIndex + 12)
                        }
                    });
                }
            } catch (err) {
                console.error("Failed to load weather", err);
                setWeather('error'); // Use a sentinel value to show error state
            } finally {
                setLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(latitude, longitude);
            }, () => {
                // Default to Dhaka if location is denied
                fetchWeather(23.8103, 90.4125);
            });
        } else {
            fetchWeather(23.8103, 90.4125);
        }
    }, []);

    const getWeatherDescription = (code: number) => {
        if (code === 0) return 'Clear Sky';
        if (code <= 3) return 'Partly Cloudy';
        if (code <= 48) return 'Foggy';
        if (code <= 55) return 'Drizzle';
        if (code <= 65) return 'Rainy';
        if (code <= 77) return 'Snow';
        if (code <= 82) return 'Heavy Rain';
        if (code >= 95) return 'Thunderstorm';
        return 'Unknown';
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-primary" /></div>;
    if (weather === 'error') return <div className="min-h-screen flex items-center justify-center text-slate-500 italic font-medium">আবহাওয়ার তথ্য লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।</div>;
    if (!weather) return <div className="min-h-screen flex items-center justify-center text-slate-500">আবহাওয়ার তথ্য পাওয়া যায়নি। অনুগ্রহ করে লোকেশন অনুমতি দিন।</div>;

    const { current, hourly, city } = weather;

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                    <Cloud className="text-primary w-10 h-10" /> 
                    {city === 'Sylhet' ? 'সিলেট' : city} আবহাওয়া পূর্বাভাস
                </h1>
                <p className="text-slate-500 mb-10">আগামী ২৪ ঘন্টার বিস্তারিত আবহাওয়ার পূর্বাভাস।</p>

                <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm mb-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <p className="text-sm font-bold uppercase text-slate-500">বর্তমান তাপমাত্রা</p>
                            <h2 className="text-6xl font-bold text-slate-900">{Math.round(current.temperature_2m)}°C</h2>
                            <p className="text-lg text-slate-600 capitalize mt-2">{getWeatherDescription(current.weather_code)}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
                            <div className="flex items-center gap-3">
                                <Droplets className="text-blue-500 w-8 h-8" />
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">আর্দ্রতা</p>
                                    <p className="font-bold text-lg">{current.relative_humidity_2m}%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Wind className="text-slate-500 w-8 h-8" />
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">বাতাসের গতি</p>
                                    <p className="font-bold text-lg">{current.wind_speed_10m} কিমি/ঘন্টা</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-6">পরবর্তী পূর্বাভাস</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {hourly.time.map((time: string, i: number) => (
                        <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
                            <p className="text-xs text-slate-400 font-bold">{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p className="text-2xl font-bold my-2">{Math.round(hourly.temperature_2m[i])}°C</p>
                            <p className="text-xs text-slate-600 truncate">{getWeatherDescription(hourly.weather_code[i])}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
