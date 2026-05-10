import { Globe, Clock, MapPin } from "lucide-react";

export function LocationAttachment() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <MapPin className="w-4 h-4 text-navigator" />
        <span className="text-sm font-medium">Edmonton, AB, Canada</span>
      </div>
      <div className="flex items-center gap-3">
        <Clock className="w-4 h-4 text-navigator" />
        <span className="text-sm text-text-muted">UTC-6 (Mountain Time)</span>
      </div>
      <div className="flex items-center gap-3">
        <Globe className="w-4 h-4 text-navigator" />
        <span className="text-sm text-text-muted">
          Dual roots: 🇨🇦 Canada · 🇲🇾 Malaysia
        </span>
      </div>
    </div>
  );
}
