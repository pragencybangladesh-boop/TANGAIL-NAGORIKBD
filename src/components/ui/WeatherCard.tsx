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
                let url = '/api/weather?';
                if (city) {
                    url += `q=${city}`;
                } else if (navigator.geolocation) {
                    const position = await new Promise<GeolocationPosition>((resolve, reject) => 
                        navigator.geolocation.getCurrentPosition(resolve, reject)
                    );
                    url += `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
                } else {
                    setLoading(false);
                    return;
                }
                const res = await fetch(url);
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
    
    if (weather && weather.cod !== "200" && weather.cod !== 200) {
        console.error("Weather API error:", weather);
        return <div className="p-4 bg-red-50 text-red-500 text-xs border border-red-100 rounded-xl">Weather unavailable</div>;
    }
    
    if (!weather) return null;

    const current = weather.list[0];

    return (
        <div 
            onClick={() => navigate('/weather')}
            className="bg-white/70 backdrop-blur-sm border border-slate-100 shadow-sm flex items-center justify-between gap-4 cursor-pointer hover:border-primary transition-all p-2 rounded-none"
        >
            <div className="flex items-center gap-2">
                <MapPin className="text-primary w-3 h-3" />
                <div>
                  <p className="font-bold text-[10px] text-slate-900">{weather.city.name}</p>
                  <p className="text-[9px] text-slate-500 capitalize">{current.weather[0].description}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm font-bold text-slate-900">{Math.round(current.main.temp)}°C</p>
            </div>
        </div>
    );
}
