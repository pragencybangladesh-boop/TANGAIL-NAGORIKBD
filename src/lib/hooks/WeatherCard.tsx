import { useEffect, useState } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WeatherCardProps {
    city?: string;
}

export default function WeatherCard({ city }: WeatherCardProps = {}) {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            try {
                let lat = 23.8103, lon = 90.4125; // Default Dhaka
                if (navigator.geolocation) {
                    try {
                      const position = await new Promise<GeolocationPosition>((resolve, reject) => 
                          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
                      );
                      lat = position.coords.latitude;
                      lon = position.coords.longitude;
                    } catch (geoErr) {
                      console.warn("Geolocation failed, using default:", geoErr);
                    }
                }
                
                const res = await fetch(`/api/weather-proxy?lat=${lat}&lon=${lon}`);
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(errorData.details || errorData.error || "Failed to fetch weather");
                }
                const data = await res.json();
                setWeather(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [city]);

    if (loading) return <div className="p-4 bg-white/50 border border-slate-200 flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
    
    if (!weather || !weather.current) return null;

    const current = weather.current;

    const getWeatherDescription = (code: number) => {
        if (code === 0) return 'পরিষ্কার আকাশ';
        if (code <= 3) return 'আংশিক মেঘলা';
        if (code <= 48) return 'কুয়াশা';
        if (code <= 65) return 'বৃষ্টি';
        if (code >= 95) return 'বজ্রপাত';
        return 'মেঘলা';
    };

    return (
        <div 
            onClick={() => navigate('/weather')}
            className="bg-white/70 backdrop-blur-sm border border-slate-100 shadow-sm flex items-center justify-between gap-4 cursor-pointer hover:border-primary transition-all p-2 rounded-none"
        >
            <div className="flex items-center gap-2">
                <MapPin className="text-primary w-3 h-3" />
                <div>
                  <p className="font-bold text-[10px] text-slate-900">নাগরিক আবহাওয়া</p>
                  <p className="text-[9px] text-slate-500 capitalize">{getWeatherDescription(current.weather_code)}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{Math.round(current.temperature_2m)}°C</p>
            </div>
        </div>
    );
}
