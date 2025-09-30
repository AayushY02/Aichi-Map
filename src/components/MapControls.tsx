// components/MapControls.tsx
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import {
    Layers,
    // Mountain,
    // Ruler,
    Landmark,
    MapPin,
    Building,
    Bus,
    School,
    Hospital,
    Users,
    X,
    Menu,
    BusFront,
    MapPinCheckIcon,
    // User2,
    // Circle,
    // ShoppingBasket,
    // Store,
    // ShoppingBag,
    NotepadTextDashed,
    Mountain,
    MapIcon,
    // TableIcon,
    // Route,

} from 'lucide-react';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
// import { useRecoilState } from 'recoil';
// import { masuoCourseDropLayerVisibleState } from '@/state/layers';
// import { toggleMasuoCourseRideLayer } from '@/layers/busPassengerLayer';
import {  useSetRecoilState } from "recoil";
import { globalVisibleLayersState } from '@/state/activeLayersAtom';
// import { Slider } from './ui/slider';
import { Separator } from '@/components/ui/separator';
// import { SlidersHorizontal, Filter, Type } from 'lucide-react';
import { Input } from './ui/input';
import { LegendRow } from './Legend/LegendGroupTableDialog';
// import { facilityLegendTableOpenState, shopLegendTableOpenState } from '@/state/legendTables';
// import { userLayersPanelOpenAtom } from '@/state/uiAtoms';

// const allCourses = ['逆井 コース', '南増尾 コース', '沼南コース'];


type ChomeMetric = "total" | "aging" | "density" | "total_2040" | "aging_2040";

interface MapControlsProps {
    currentStyle: string;
    onStyleChange: (value: string) => void;
    roadsVisible: boolean;
    toggleRoads: () => void;
    adminVisible: boolean;
    toggleAdmin: () => void;
    // terrainEnabled: boolean;
    // toggleTerrain: () => void;
    fitToBounds: () => void;
    agriLayerVisible: boolean;
    toggleAgri: () => void;
    selectedMetric: string;
    onMetricChange: (val: string) => void;
    styles: Record<string, string>;
    transportVisible: boolean;
    toggleTransport: () => void;
    pbFacilityVisible: boolean;
    togglePbFacility: () => void;
    schoolLayerVisible: boolean;
    toggleSchoolLayer: () => void;
    medicalLayerVisible: boolean;
    toggleMedicalLayer: () => void;
    touristLayerVisible: boolean;
    toggleTouristLayer: () => void;
    roadsideStationLayerVisible: boolean;
    toggleAttractionLayer: () => void;
    attractionLayerVisible: boolean;
    toggleRoadsideStationLayerVisible: () => void;
    busStopsVisible: boolean;
    toggleBusStops: () => void;

    boardingVisible: boolean;
    toggleBoarding: () => void;

    alightingVisible: boolean;
    toggleAlighting: () => void;

    busPickDropLayerVisible: boolean;
    toggleBusPickDropLayerVisible: () => void;
    busPassengerLayerVisible: boolean;
    toggleBusPassengerLayerVisible: () => void;
    sakaeCourseRideLayerVisible: boolean;
    toggleSakaeCourseRideLayerVisible: () => void;
    sakaeCourseDropLayerVisible: boolean;
    toggleSakaeCourseDropLayerVisible: () => void;
    masuoCourseRideLayerVisible: boolean;
    toggleMasuoCourseRideLayerVisible: () => void;
    masuoCourseDropLayerVisible: boolean;
    toggleMasuoCourseDropLayerVisible: () => void;

    shonanCourseRideLayerVisible: boolean;
    toggleShonanCourseRideLayerVisible: () => void;
    shonanCourseDropLayerVisible: boolean;
    toggleShonanCourseDropLayerVisible: () => void;
    captureMapScreenshot: () => void

    newbusLayerVisible: boolean;
    toggleNewBusLayerVisible: () => void;

    newKashiwakuruRideLayerVisible: boolean;
    toggleNewKashiwakuruRideLayerVisible: () => void;

    newKashiwakuruDropLayerVisible: boolean;
    toggleNewKashiwakuruDropLayerVisible: () => void;

    kashiwaPublicFacilityVisible: boolean;
    toggleKashiwaPublicFacilityVisible: (category: string) => void;
    selectedCategories: string[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;

    toggleKashiwaShopsVisible: (category: string) => void;
    selectedShopCategories: string[];

    shonanRouteVisible: boolean;
    toggleShonanRouteVisible: () => void;

    masuoRouteVisible: boolean;
    toggleMasuoRouteVisible: () => void;

    sakaiRouteVisible: boolean;
    toggleSakaiRouteVisible: () => void;

    kashiwakuruOdVisible: boolean;
    toggleKashiwakuruOdVisible: () => void;
    kashiwakuruOdHour: number;
    onKashiwakuruOdHourChange: (h: number) => void;
    onClearOdEndpointHighlight: () => void;
    downloadPpt: () => void;

    kashiwakuruOdFilterOn: boolean;                   // NEW
    onToggleKashiwakuruOdFilter: (on: boolean) => void;

    chomeTotalVisible: boolean;
    toggleChomeTotalVisible: () => void;
    chomeAgingVisible: boolean;
    toggleChomeAgingVisible: () => void;
    chomeDensityVisible: boolean;
    toggleChomeDensityVisible: () => void;

    onChomeStyleChange: (
        metric: ChomeMetric,
        opts: {
            palette?: "Blues" | "Greens" | "Oranges" | "Purples";
            method?: "quantile" | "equal" | "jenks" | "manual"; // ⬅ added manual
            bins?: number;
            breaks?: number[]; // ⬅ new
            opacity?: number;
        }
    ) => void;

    onChomeRangeChange: (
        metric: ChomeMetric,
        min: number | null,
        max: number | null
    ) => void;

    onChomeLabelsChange: (
        visible: boolean,
        mode: "name" | "metric",
        metric: ChomeMetric,
    ) => void;

    chomeTotal2040Visible: boolean;
    toggleChomeTotal2040Visible: () => void;
    chomeAging2040Visible: boolean;
    toggleChomeAging2040Visible: () => void;

    meshVisible: boolean;
    toggleMesh: () => void;

    terrainEnabled: boolean;
    toggleTerrain: () => void;

    passengerLabelsVisible: boolean;
    togglePassengerLabelsVisible: () => void;

    odGridVisible: boolean;
    onToggleOdGrid: () => void;
    odGridFilterOn: boolean;
    onToggleOdGridFilter: (on: boolean) => void;
    odGridHour: number;
    onOdGridHourChange: (h: number) => void;
    odGridShowGrid: boolean;
    onToggleOdGridShowGrid: (on: boolean) => void;
    odGridUndirected: boolean;
    onToggleOdGridUndirected: (on: boolean) => void;
    odGridMinVol: number;
    onOdGridMinVolChange: (n: number) => void;
    odGridFocusMode: "all" | "out" | "in";
    onOdGridFocusModeChange: (m: "all" | "out" | "in") => void;
    onOdGridClearFocus: () => void;
    odGridShowStops: boolean;
    onToggleOdGridShowStops: (on: boolean) => void;

    // To disable 発/着/両方 when a single OD line is isolated
    odGridSingleOD?: boolean;

    busCoverageVisible: boolean;
    toggleBusCoverage: () => void;

    busStopPointsVisible: boolean;        // NEW
    toggleBusStopPoints: () => void;

    cityMaskVisible: boolean;
    toggleCityMask: () => void;

    waniOutboundRideLayerVisible: boolean;
    toggleWaniOutboundRideLayerVisible: () => void;
    waniOutboundDropLayerVisible: boolean;
    toggleWaniOutboundDropLayerVisible: () => void;
    waniReturnRideLayerVisible: boolean;
    toggleWaniReturnRideLayerVisible: () => void;
    waniReturnDropLayerVisible: boolean;
    toggleWaniReturnDropLayerVisible: () => void;
    waniRouteVisible: boolean;
    toggleWaniRouteVisible: () => void;

    busRoutesCommonVisible: boolean;
    toggleBusRoutesCommonVisible: () => void;
    busRoutesOtherVisible: boolean;
    toggleBusRoutesOtherVisible: () => void;

    railLinesVisible: boolean;
    toggleRailLinesVisible: () => void;
    railStationsVisible: boolean;
    toggleRailStationsVisible: () => void;
    stationCoverageVisible: boolean;
    toggleStationCoverageVisible: () => void;

    facilityLegendRows: LegendRow[];
    shopLegendRows: LegendRow[];

    facilityLabelsVisible: boolean;                  // <-- ADD
    toggleFacilityLabelsVisible: () => void;
    shopsLabelsVisible: boolean;
    toggleShopsLabelsVisible: () => void;

    busRoutesHighlightedVisible: boolean;
    toggleBusRoutesHighlightedVisible: () => void;

    stationPassengersVisible: boolean;
    toggleStationPassengersVisible: () => void;

    subdivisionsVisible: boolean;
    toggleSubdivisionsVisible: () => void;

    elevationGridVisible: boolean;
    toggleElevationGrid: () => void;

    chibaRoadsVisible: boolean;
    toggleChibaRoads: () => void;

    busRoutesFrequencyVisible: boolean;
    toggleBusRoutesFrequencyVisible: () => void;
    busRoutesFrequencyDay: "weekday" | "saturday" | "holiday";
    onBusRoutesFrequencyDayChange: (d: "weekday" | "saturday" | "holiday") => void;

    busRoutesFrequencyStyle: {
        thresholds: number[];
        colors: string[];
        widthRange: { min: number; max: number };
    };
    onBusRoutesFrequencyStyleChange: (cfg: {
        thresholds: number[];
        colors: string[];
        widthRange: { min: number; max: number };
    }) => void;

}

export default function MapControls({
    currentStyle,
    onStyleChange,
    // roadsVisible,
    // toggleRoads,
    adminVisible,
    toggleAdmin,
    // terrainEnabled,
    // toggleTerrain,
    fitToBounds,
    // agriLayerVisible,
    // toggleAgri,
    selectedMetric,
    onMetricChange,
    styles,
    transportVisible,
    toggleTransport,
    pbFacilityVisible,
    togglePbFacility,
    schoolLayerVisible,
    toggleSchoolLayer,
    medicalLayerVisible,
    toggleMedicalLayer,
    // touristLayerVisible,
    // toggleTouristLayer,
    roadsideStationLayerVisible,
    toggleRoadsideStationLayerVisible,
    busStopsVisible,
    toggleBusStops,
    toggleAttractionLayer,
    attractionLayerVisible,
    // busPickDropLayerVisible,
    // toggleBusPickDropLayerVisible,
    // busPassengerLayerVisible,
    // toggleBusPassengerLayerVisible,
    // sakaeCourseRideLayerVisible,
    // toggleSakaeCourseRideLayerVisible,
    // sakaeCourseDropLayerVisible,
    // toggleSakaeCourseDropLayerVisible,

    // masuoCourseRideLayerVisible,
    // toggleMasuoCourseRideLayerVisible,
    // masuoCourseDropLayerVisible,
    // toggleMasuoCourseDropLayerVisible,

    // shonanCourseRideLayerVisible,
    // toggleShonanCourseRideLayerVisible,
    // shonanCourseDropLayerVisible,
    // toggleShonanCourseDropLayerVisible,
    downloadPpt,


    // newbusLayerVisible,
    // toggleNewBusLayerVisible,

    // newKashiwakuruRideLayerVisible,
    // toggleNewKashiwakuruRideLayerVisible,

    // newKashiwakuruDropLayerVisible,
    // toggleNewKashiwakuruDropLayerVisible,

    // toggleKashiwaPublicFacilityVisible,
    // selectedCategories,

    // toggleKashiwaShopsVisible,
    // selectedShopCategories,

    // elevationGridVisible,
    // toggleElevationGrid,

    // shonanRouteVisible,
    // toggleShonanRouteVisible,
    // masuoRouteVisible,
    // toggleMasuoRouteVisible,
    // sakaiRouteVisible,
    // toggleSakaiRouteVisible,

    // kashiwakuruOdVisible,
    // toggleKashiwakuruOdVisible,
    // kashiwakuruOdHour,
    // onKashiwakuruOdHourChange,
    // onClearOdEndpointHighlight,
    captureMapScreenshot,
    // kashiwakuruOdFilterOn,
    // onToggleKashiwakuruOdFilter,

    // chomeTotalVisible,
    // toggleChomeTotalVisible,
    // chomeAgingVisible,
    // toggleChomeAgingVisible,
    // chomeDensityVisible,
    // toggleChomeDensityVisible,
    // onChomeStyleChange,

    // onChomeRangeChange,

    // onChomeLabelsChange,
    // chomeTotal2040Visible,
    // toggleChomeTotal2040Visible,
    // chomeAging2040Visible,
    // toggleChomeAging2040Visible,

    meshVisible,
    toggleMesh,

    terrainEnabled,
    toggleTerrain,

    // passengerLabelsVisible,
    // togglePassengerLabelsVisible,

    // odGridVisible,
    // onToggleOdGrid,
    // odGridFilterOn,
    // onToggleOdGridFilter,
    // odGridHour,
    // onOdGridHourChange,
    // odGridShowGrid,
    // onToggleOdGridShowGrid,
    // odGridUndirected,
    // onToggleOdGridUndirected,
    // odGridMinVol,
    // onOdGridMinVolChange,
    // odGridFocusMode,
    // onOdGridFocusModeChange,
    // onOdGridClearFocus,
    // odGridShowStops,
    // onToggleOdGridShowStops,

    // To disable 発/着/両方 when a single OD line is isolated
    // odGridSingleOD,

    busCoverageVisible,            // <-- NEW
    toggleBusCoverage,

    busStopPointsVisible,           // NEW
    toggleBusStopPoints,

    cityMaskVisible,
    toggleCityMask,

    // waniOutboundRideLayerVisible,
    // toggleWaniOutboundRideLayerVisible,
    // waniOutboundDropLayerVisible,
    // toggleWaniOutboundDropLayerVisible,
    // waniReturnRideLayerVisible,
    // toggleWaniReturnRideLayerVisible,
    // waniReturnDropLayerVisible,
    // toggleWaniReturnDropLayerVisible,
    // waniRouteVisible,
    // toggleWaniRouteVisible,

    // busRoutesCommonVisible,
    // toggleBusRoutesCommonVisible,
    // busRoutesOtherVisible,
    // toggleBusRoutesOtherVisible,

    railLinesVisible,
    toggleRailLinesVisible,
    railStationsVisible,
    toggleRailStationsVisible,
    stationCoverageVisible,
    toggleStationCoverageVisible,

    // facilityLabelsVisible,
    // toggleFacilityLabelsVisible,
    // shopsLabelsVisible,
    // toggleShopsLabelsVisible,

    // busRoutesHighlightedVisible,
    // toggleBusRoutesHighlightedVisible,

    stationPassengersVisible,
    toggleStationPassengersVisible,

    subdivisionsVisible,
    toggleSubdivisionsVisible,

    // chibaRoadsVisible,
    // toggleChibaRoads,

    busRoutesFrequencyVisible,
    toggleBusRoutesFrequencyVisible,

    busRoutesFrequencyStyle,
    onBusRoutesFrequencyStyleChange,

    busRoutesFrequencyDay,
    onBusRoutesFrequencyDayChange,
}: MapControlsProps) {

    const [isOpen, setIsOpen] = useState(false);
    const setGlobalVisibleLayers = useSetRecoilState(globalVisibleLayersState);

    // target metric whose style/filter you’re editing
    // const [chomeTarget, ] = useState<ChomeMetric>("total");
    // const isAgingMetric = chomeTarget === "aging" || chomeTarget === "aging_2040";
    // const isDensityMetric = chomeTarget === "density";

    // style controls
    // const [chomePalette, setChomePalette] = useState<"Blues" | "Greens" | "Oranges" | "Purples">("Purples");
    // const [chomeMethod, setChomeMethod] = useState<"quantile" | "equal" | "jenks" | "manual">("quantile");
    // const [chomeBins, setChomeBins] = useState<number>(5);       // 3–7 sensible
    // const [chomeOpacity, setChomeOpacity] = useState<number>(70); // 30–100 as percent

    // range filter
    // const [chomeMin, setChomeMin] = useState<string>("");
    // const [chomeMax, setChomeMax] = useState<string>("");

    // labels
    // const [chomeLabelsOn, setChomeLabelsOn] = useState<boolean>(false);
    // const [chomeLabelsMode, setChomeLabelsMode] = useState<"name" | "metric">("name");
    // const [chomeLabelsMetric, setChomeLabelsMetric] = useState<ChomeMetric>("total");
    // 町丁目フィルターの開閉
    // const [chomeFiltersOpen] = useState(false);

    // const [facilityDialogOpen, setFacilityDialogOpen] = useRecoilState(facilityLegendTableOpenState);
    // const [shopDialogOpen, setShopDialogOpen] = useRecoilState(shopLegendTableOpenState);
    // const setUserPanelOpen = useSetRecoilState(userLayersPanelOpenAtom);

    // const emptyBreaks = (n: number) => Array.from({ length: Math.max(0, n) }, () => "");
    // const [manualBreaksByMetric, setManualBreaksByMetric] = useState<Record<ChomeMetric, string[]>>({
    //     total: emptyBreaks(4),       // default 5 bins → 4 thresholds
    //     aging: emptyBreaks(4),
    //     density: emptyBreaks(4),
    //     total_2040: emptyBreaks(4),
    //     aging_2040: emptyBreaks(4),
    // });

    const [freqThresholdsText, setFreqThresholdsText] = useState(
        busRoutesFrequencyStyle.thresholds.join(",")
    );
    useEffect(() => {
        setFreqThresholdsText(busRoutesFrequencyStyle.thresholds.join(","));
    }, [busRoutesFrequencyStyle.thresholds]);

    const colorBands = useMemo(() => {
        const need = busRoutesFrequencyStyle.thresholds.length + 1;
        const out = [...busRoutesFrequencyStyle.colors];
        while (out.length < need) out.push(out[out.length - 1] ?? "#000000");
        if (out.length > need) out.length = need;
        return out;
    }, [busRoutesFrequencyStyle.colors, busRoutesFrequencyStyle.thresholds]);

    const bandLabel = (i: number) =>
        i === 0
            ? `< ${busRoutesFrequencyStyle.thresholds[0] ?? "t0"}`
            : `[${busRoutesFrequencyStyle.thresholds[i - 1]}, ${busRoutesFrequencyStyle.thresholds[i] ?? "∞"})`;

    const applyThresholdsText = () => {
        const nums = freqThresholdsText
            .split(",")
            .map((s) => Number(s.trim()))
            .filter((n) => Number.isFinite(n))
            .sort((a, b) => a - b);

        const need = nums.length + 1;
        const nextColors = [...busRoutesFrequencyStyle.colors];
        while (nextColors.length < need) nextColors.push(nextColors[nextColors.length - 1] ?? "#000000");
        if (nextColors.length > need) nextColors.length = need;

        onBusRoutesFrequencyStyleChange({
            ...busRoutesFrequencyStyle,
            thresholds: nums,
            colors: nextColors,
        });
    };

    // function resetChomeUIAndLayers() {
    //     // Reset UI state
    //     setChomeTarget("total");
    //     // setChomePalette("Purples");
    //     setChomeMethod("quantile");
    //     setChomeBins(5);
    //     setChomeOpacity(70);
    //     setChomeMin("");
    //     setChomeMax("");
    //     setChomeLabelsOn(false);
    //     setChomeLabelsMode("name");
    //     setChomeLabelsMetric("total");

    //     // Reset layers to defaults (safe regardless of visibility)
    //     const defaults = {
    //         total: { palette: "Purples" as const, method: "quantile" as const, bins: 5, opacity: 0.7 },
    //         aging: { palette: "Greens" as const, method: "quantile" as const, bins: 5, opacity: 0.7 },
    //         density: { palette: "Oranges" as const, method: "quantile" as const, bins: 5, opacity: 0.7 },
    //         total_2040: { palette: "Blues" as const, method: "quantile" as const, bins: 5, opacity: 0.7 },
    //         aging_2040: { palette: "Greens" as const, method: "quantile" as const, bins: 5, opacity: 0.7 },
    //     };

    //     (["total", "aging", "density", "total_2040", "aging_2040"] as const).forEach((metric) => {
    //         onChomeStyleChange(metric, defaults[metric]);   // default palette/method/bins/opacity
    //         onChomeRangeChange(metric, null, null);         // clear range filter
    //     });

    //     // Labels off
    //     onChomeLabelsChange(false, "name", "total");
    // }

    // useEffect(() => {
    //     if (!chomeFiltersOpen) return;

    //     if (chomeMethod === "manual") {
    //         // Collect numbers; require exactly (bins - 1) values
    //         const raw = (manualBreaksByMetric[chomeTarget] ?? [])
    //             .map((s) => s.trim())
    //             .filter((s) => s !== "")
    //             .map((s) => Number(s))
    //             .filter((n) => !Number.isNaN(n));

    //         if (raw.length === Math.max(0, chomeBins - 1)) {
    //             const sorted = [...raw].sort((a, b) => a - b);
    //             onChomeStyleChange(chomeTarget, {
    //                 method: "manual",
    //                 breaks: sorted,
    //                 opacity: chomeOpacity / 100,
    //             });
    //         }
    //     } else {
    //         onChomeStyleChange(chomeTarget, {
    //             method: chomeMethod,
    //             bins: chomeBins,
    //             opacity: chomeOpacity / 100,
    //         });
    //     }
    // }, [chomeFiltersOpen, chomeTarget, chomeMethod, chomeBins, chomeOpacity, manualBreaksByMetric]);


    // useEffect(() => {
    //     if (!chomeFiltersOpen) return;
    //     const rawMin = chomeMin === "" ? null : Number(chomeMin);
    //     const rawMax = chomeMax === "" ? null : Number(chomeMax);
    //     // const toProp = (v: number | null) => (v == null ? null : isAgingMetric ? v / 100 : v); // % → ratio for aging metrics
    //     const toProp = (v: number | null) => {
    //         if (v == null) return null;
    //         if (isAgingMetric) return v / 100; // % → 0..1
    //         if (isDensityMetric) return v * 100; // per ha → per km²
    //         return v;
    //     };

    //     const t = setTimeout(() => {
    //         onChomeRangeChange(chomeTarget, toProp(rawMin), toProp(rawMax));
    //     }, 200);
    //     return () => clearTimeout(t);

    // }, [chomeFiltersOpen, chomeTarget, chomeMin, chomeMax]);

    // useEffect(() => {
    //     if (chomeMethod !== "manual") return;
    //     setManualBreaksByMetric((prev) => {
    //         const need = Math.max(0, chomeBins - 1);
    //         const curr = prev[chomeTarget] ?? [];
    //         const next = Array.from({ length: need }, (_, i) => curr[i] ?? "");
    //         return { ...prev, [chomeTarget]: next };
    //     });
    // }, [chomeMethod, chomeTarget, chomeBins]);


    // useEffect(() => {
    //     if (!chomeFiltersOpen) return;
    //     onChomeLabelsChange(chomeLabelsOn, chomeLabelsMode, chomeLabelsMetric);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [chomeFiltersOpen, chomeLabelsOn, chomeLabelsMode, chomeLabelsMetric]);

    const metricLabels: Record<string, string> = {
        PTN_2020: '総人口（2020年）',
        PTC_2020: '65歳以上の人口（2020年）',
        PTA_2020: '0〜14歳の人口（2020年）',
        ELDERLY_RATIO: '高齢者比率（65歳以上／総人口）',
    };

    function handleLayerToggle(
        layerName: string,
        layerCurrentState: boolean,
        toggleFunction: () => void,
    ) {
        setGlobalVisibleLayers((prev) => {
            if (!layerCurrentState) {
                // Hidden → visible: add to array
                if (!prev.includes(layerName)) {
                    return [...prev, layerName];
                }
                return prev;
            } else {
                // Visible → hidden: remove from array
                return prev.filter((name) => name !== layerName);
            }
        });

        toggleFunction();
    }
    // const anyChomeLayerOn =
    //     chomeTotalVisible ||
    //     chomeAgingVisible ||
    //     chomeDensityVisible ||
    //     chomeTotal2040Visible ||
    //     chomeAging2040Visible;

    // const anyPassengerCircleOn =
    //     sakaeCourseRideLayerVisible ||
    //     sakaeCourseDropLayerVisible ||
    //     masuoCourseRideLayerVisible ||
    //     masuoCourseDropLayerVisible ||
    //     shonanCourseRideLayerVisible ||
    //     shonanCourseDropLayerVisible ||
    //     // ✅ include Wani (市役所線)
    //     waniOutboundRideLayerVisible ||
    //     waniOutboundDropLayerVisible ||
    //     waniReturnRideLayerVisible ||
    //     waniReturnDropLayerVisible;

    return (
        <div data-map-controls className="absolute right-3 top-3 z-10 max-h-screen w-fit flex flex-col items-end">
            {/* Toggle Button */}
            <Button
                className="px-4 py-2 bg-white/50 backdrop-blur-2xl hover:bg-[#f2f2f2] cursor-pointer text-black rounded-full shadow-md text-sm mb-2 flex items-center gap-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="map-controls"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1 }}
                        className="overflow-y-auto px-4 py-4 flex flex-col space-y-3 bg-white/50 backdrop-blur-2xl rounded-2xl shadow-2xl w-72 sm:w-80 max-h-[75vh]"
                    >
                        {/* Map style selector */}
                        <Select value={currentStyle} onValueChange={onStyleChange}>
                            <SelectTrigger className="w-full px-4 py-2 text-sm bg-white rounded-xl text-black shadow border border-gray-200">
                                <SelectValue placeholder="地図スタイルを選択" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(styles).map(([label, url]) => (
                                    <SelectItem key={url} value={url}>{label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Layer Toggles */}
                        <Button className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer" onClick={captureMapScreenshot}>
                            <MapPinCheckIcon />
                            画像をエクスポート
                        </Button>
                        <Button className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer" onClick={downloadPpt}>
                            <NotepadTextDashed />
                            パワーポイントにエクスポート
                        </Button>
                        <Button className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer" onClick={fitToBounds}>
                            <MapPinCheckIcon />
                            柏市にフォーカス
                        </Button>

                        {/* <div className="flex items-center justify-between absolute top-4 right-4 z-50">
                            <Label className="text-sm text-black flex items-center gap-2">
                                <MapPinCheckIcon /> 柏市にフォーカス
                            </Label>
                            <Switch
                                checked={isKashiwaBounds}
                                onCheckedChange={(checked) => {
                                    setIsKashiwaBounds(checked);  // Update the state
                                    fitToBounds(checked);          // Apply bounds change
                                }}
                                className="w-12 h-6 bg-gray-200 rounded-full" // Adjust styling as per your design
                            />
                        </div> */}

                        <Button
                            onClick={() => handleLayerToggle('メッシュ', meshVisible, toggleMesh)}
                            className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer"
                        >
                            <Layers size={16} />
                            {meshVisible ? 'メッシュを非表示' : 'メッシュを表示'}
                        </Button>
                        <Button
                            onClick={() => toggleCityMask()}
                            className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer"
                        >
                            <MapIcon size={16} />
                            {cityMaskVisible ? '柏市マスクを非表示' : '柏市マスクを表示'}
                        </Button>

                        <Button
                            onClick={toggleTerrain}
                            className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer"
                            aria-pressed={terrainEnabled}
                        >
                            <Mountain size={16} />
                            {terrainEnabled ? '3D地形を無効化' : '3D地形を有効化'}
                        </Button>

                        {/* <Button onClick={() => handleLayerToggle('道路', roadsVisible, toggleRoads)} className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer">
                            <Ruler size={16} />
                            {roadsVisible ? '道路を非表示' : '道路を表示'}
                        </Button> */}
                        <Button onClick={() => handleLayerToggle('行政界', adminVisible, toggleAdmin)} className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer"><Layers />{adminVisible ? '行政界を非表示' : '行政界を表示'}</Button>
                        {/* <Button onClick={() => handleLayerToggle('地形', terrainEnabled, toggleTerrain)} className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer"><Mountain />{terrainEnabled ? '地形を非表示' : '地形を表示'}</Button> */}
                        {/* <Button onClick={() => handleLayerToggle('農業レイヤー', agriLayerVisible, toggleAgri)} className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer"><Landmark />{agriLayerVisible ? '農業レイヤーを非表示' : '農業レイヤーを表示'}</Button> */}

                        {/* Transport Accordion */}
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="transportation">
                                <AccordionTrigger className="text-black bg-gray-50 text-sm hover:bg-gray-100 rounded-xl px-4 py-2 hover:no-underline cursor-pointer flex items-center ">
                                    <BusFront size={16} />交通レイヤーの操作
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col space-y-2 bg-white rounded-xl mt-2 px-4 py-2">
                                    {[
                                        { label: '交通レイヤー', checked: transportVisible, onChange: () => handleLayerToggle('交通レイヤー', transportVisible, toggleTransport), icon: <Bus size={16} /> },
                                        { label: 'バス停', checked: busStopsVisible, onChange: () => handleLayerToggle('バス停', busStopsVisible, toggleBusStops), icon: <MapPin size={16} /> },
                                        // { label: 'カシワニクル乗降場', checked: busPickDropLayerVisible, onChange: () => handleLayerToggle('カシワニクル乗降場', busPickDropLayerVisible, toggleBusPickDropLayerVisible), icon: <Users size={16} /> },
                                        // { label: 'バス乗降データ', checked: busPassengerLayerVisible, onChange: () => handleLayerToggle('バス乗降データ', busPassengerLayerVisible, toggleBusPassengerLayerVisible), icon: <Users size={16} /> }
                                        // { label: '降車データ', checked: alightingVisible, onChange: toggleAlighting, icon: <Users size={16} /> },

                                        // {
                                        //     label: '路線（共通コード＋始終点あり）',
                                        //     checked: busRoutesCommonVisible,
                                        //     onChange: () => handleLayerToggle(
                                        //         '路線（共通コード＋始終点あり）',
                                        //         busRoutesCommonVisible,
                                        //         toggleBusRoutesCommonVisible
                                        //     ),
                                        //     icon: <Bus size={16} />
                                        // },
                                        // {
                                        //     label: '路線（無共通コード／始終点欠落）',
                                        //     checked: busRoutesOtherVisible,
                                        //     onChange: () => handleLayerToggle(
                                        //         '路線（無共通コード／始終点欠落）',
                                        //         busRoutesOtherVisible,
                                        //         toggleBusRoutesOtherVisible
                                        //     ),
                                        //     icon: <Bus size={16} />
                                        // },
                                        // {
                                        //     label: '路線（特定 ID 指定）',
                                        //     checked: busRoutesHighlightedVisible,
                                        //     onChange: () => handleLayerToggle(
                                        //         '路線（特定 ID 指定）',
                                        //         busRoutesHighlightedVisible,
                                        //         toggleBusRoutesHighlightedVisible
                                        //     ),
                                        //     icon: <Bus size={16} />
                                        // },
                                        {
                                            label: 'バス停（点）',
                                            checked: busStopPointsVisible,
                                            onChange: () => handleLayerToggle('バス停（点）', busStopPointsVisible, toggleBusStopPoints),
                                            icon: <MapPinCheckIcon size={16} />,
                                        },
                                        { label: 'バス停 300mカバレッジ（合成）', checked: busCoverageVisible, onChange: () => handleLayerToggle('バス停 300mカバレッジ', busCoverageVisible, toggleBusCoverage), icon: <Bus size={16} /> },
                                    ].map(({ label, checked, onChange, icon }) => (
                                        <div key={label} className="flex items-center justify-between">
                                            <Label className="text-sm text-black flex items-center gap-2">{icon} {label}</Label>
                                            <Switch checked={checked} onCheckedChange={onChange} />
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* Other Layer Buttons */}
                        <Button onClick={() => handleLayerToggle('公共施設', pbFacilityVisible, togglePbFacility)} className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer">
                            <Building size={16} />
                            {pbFacilityVisible ? '公共施設を非表示' : '公共施設を表示'}
                        </Button>
                        <Button onClick={() => handleLayerToggle('学校', schoolLayerVisible, toggleSchoolLayer)} className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer">
                            <School size={16} />
                            {schoolLayerVisible ? '学校を隠す' : '学校を表示'}
                        </Button>
                        <Button onClick={() => handleLayerToggle('医療機関', medicalLayerVisible, toggleMedicalLayer)} className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer">
                            <Hospital size={16} />
                            {medicalLayerVisible ? '医療機関を隠す' : '医療機関を表示'}
                        </Button>
                        
                        <Button onClick={() => handleLayerToggle('道の駅', roadsideStationLayerVisible, toggleRoadsideStationLayerVisible)} className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer">
                            <MapPin size={16} />
                            {roadsideStationLayerVisible ? '道の駅を非表示' : '道の駅を表示'}
                        </Button>
                        <Button onClick={() => handleLayerToggle('集客施設レイヤー', attractionLayerVisible, toggleAttractionLayer)} className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer">
                            {/* <Attraction size={16} /> */}
                            {attractionLayerVisible ? '集客施設レイヤーを非表示' : '集客施設レイヤーを表示'}
                        </Button>




                        {/* <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="transportation">
                                <AccordionTrigger className="text-black bg-gray-50 text-sm hover:bg-gray-100 rounded-xl px-4 py-2 hover:no-underline cursor-pointer flex items-center ">
                                    <BusFront size={16} />ワニバースとカシワニクルのバス停毎の乗車数/降車数
                                </AccordionTrigger>

                                <AccordionContent className="flex flex-col space-y-2 bg-white rounded-xl mt-2 px-4 py-2">
                                    {[
                                        {
                                            label: 'バス停レイヤー',
                                            checked: busPassengerLayerVisible,
                                            onChange: () => handleLayerToggle('バス停レイヤー', busPassengerLayerVisible, toggleBusPassengerLayerVisible),
                                            icon: <Bus size={16} />,
                                        },

                                        // ✅ Routes now use handleLayerToggle (fix)
                                        {
                                            label: '逆井コース（ルート）',
                                            checked: sakaiRouteVisible,
                                            onChange: () => handleLayerToggle('逆井コース（ルート）', sakaiRouteVisible, toggleSakaiRouteVisible),
                                            icon: <Bus size={16} />,
                                        },
                                        {
                                            label: '南増尾コース（ルート）',
                                            checked: masuoRouteVisible,
                                            onChange: () => handleLayerToggle('南増尾コース（ルート）', masuoRouteVisible, toggleMasuoRouteVisible),
                                            icon: <Bus size={16} />,
                                        },
                                        {
                                            label: '沼南コース（ルート）',
                                            checked: shonanRouteVisible,
                                            onChange: () => handleLayerToggle('沼南コース（ルート）', shonanRouteVisible, toggleShonanRouteVisible),
                                            icon: <Bus size={16} />,
                                        },

                                        {
                                            label: '逆井 コース - 乗車',
                                            checked: sakaeCourseRideLayerVisible,
                                            onChange: () => handleLayerToggle('逆井 コース - 乗車', sakaeCourseRideLayerVisible, toggleSakaeCourseRideLayerVisible),
                                            icon: <MapPin size={16} />,
                                        },
                                        {
                                            label: '逆井 コース - 降車',
                                            checked: sakaeCourseDropLayerVisible,
                                            onChange: () => handleLayerToggle('逆井 コース - 降車', sakaeCourseDropLayerVisible, toggleSakaeCourseDropLayerVisible),
                                            icon: <MapPin size={16} />,
                                        },
                                        {
                                            label: '南増尾 コース - 乗車',
                                            checked: masuoCourseRideLayerVisible,
                                            onChange: () => handleLayerToggle('南増尾 コース - 乗車', masuoCourseRideLayerVisible, toggleMasuoCourseRideLayerVisible),
                                            icon: <MapPin size={16} />,
                                        },
                                        {
                                            label: '南増尾 コース - 降車',
                                            checked: masuoCourseDropLayerVisible,
                                            onChange: () => handleLayerToggle('南増尾 コース - 降車', masuoCourseDropLayerVisible, toggleMasuoCourseDropLayerVisible),
                                            icon: <MapPin size={16} />,
                                        },
                                        {
                                            label: '沼南コース - 乗車',
                                            checked: shonanCourseRideLayerVisible,
                                            onChange: () => handleLayerToggle('沼南コース - 乗車', shonanCourseRideLayerVisible, toggleShonanCourseRideLayerVisible),
                                            icon: <MapPin size={16} />,
                                        },
                                        {
                                            label: '沼南コース - 降車',
                                            checked: shonanCourseDropLayerVisible,
                                            onChange: () => handleLayerToggle('沼南コース - 降車', shonanCourseDropLayerVisible, toggleShonanCourseDropLayerVisible),
                                            icon: <MapPin size={16} />,
                                        },
                                        {
                                            label: 'ワニバース（市役所線）ルート',
                                            checked: waniRouteVisible,
                                            onChange: () => handleLayerToggle('ワニバース（市役所線）ルート', waniRouteVisible, toggleWaniRouteVisible),
                                            icon: <Bus size={16} />,
                                        },
                                        {
                                            label: 'ワニバース（往路）乗車',
                                            checked: waniOutboundRideLayerVisible,
                                            onChange: () => handleLayerToggle('ワニバース（往路）乗車', waniOutboundRideLayerVisible, toggleWaniOutboundRideLayerVisible),
                                            icon: <MapPin size={16} />,
                                        },
                                        {
                                            label: 'ワニバース（往路）降車',
                                            checked: waniOutboundDropLayerVisible,
                                            onChange: () => handleLayerToggle('ワニバース（往路）降車', waniOutboundDropLayerVisible, toggleWaniOutboundDropLayerVisible),
                                            icon: <MapPin size={16} />,
                                        },
                                        {
                                            label: 'ワニバース（復路）乗車',
                                            checked: waniReturnRideLayerVisible,
                                            onChange: () => handleLayerToggle('ワニバース（復路）乗車', waniReturnRideLayerVisible, toggleWaniReturnRideLayerVisible),
                                            icon: <MapPin size={16} />,
                                        },
                                        {
                                            label: 'ワニバース（復路）降車',
                                            checked: waniReturnDropLayerVisible,
                                            onChange: () => handleLayerToggle('ワニバース（復路）降車', waniReturnDropLayerVisible, toggleWaniReturnDropLayerVisible),
                                            icon: <MapPin size={16} />,
                                        }

                                    ].map(({ label, checked, onChange, icon }) => (
                                        <div key={label} className="flex items-center justify-between">
                                            <Label className="text-sm text-black flex items-center gap-2">
                                                {icon} {label}
                                            </Label>
                                            <Switch checked={checked} onCheckedChange={onChange} />
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm text-black flex items-center gap-2">
                                            <Type className="h-4 w-4 text-muted-foreground" />
                                            バス停の数値ラベルを表示
                                        </Label>
                                        <Switch
                                            checked={passengerLabelsVisible}
                                            onCheckedChange={togglePassengerLabelsVisible}
                                            disabled={!anyPassengerCircleOn}            // ← disabled unless at least one passenger layer is ON
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion> */}

                        {/* <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="transportation">
                                <AccordionTrigger className="text-black bg-gray-50 text-sm hover:bg-gray-100 rounded-xl px-4 py-2 hover:no-underline cursor-pointer flex items-center ">
                                    <BusFront size={16} />カシワニクル乗降場
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col space-y-2 bg-white rounded-xl mt-2 px-4 py-2">
                                    {[
                                        { label: 'バス停レイヤー', checked: newbusLayerVisible, onChange: () => handleLayerToggle('バス停レイヤー', newbusLayerVisible, toggleNewBusLayerVisible), icon: <Bus size={16} /> },
                                        { label: 'カシワニクル乗車', checked: newKashiwakuruRideLayerVisible, onChange: () => handleLayerToggle('カシワニクル乗車', newKashiwakuruRideLayerVisible, toggleNewKashiwakuruRideLayerVisible), icon: <MapPin size={16} /> },
                                        { label: 'カシワニクル降車', checked: newKashiwakuruDropLayerVisible, onChange: () => handleLayerToggle('カシワニクル降車', newKashiwakuruDropLayerVisible, toggleNewKashiwakuruDropLayerVisible), icon: <MapPin size={16} /> },

                                    ].map(({ label, checked, onChange, icon }) => (
                                        <div key={label} className="flex items-center justify-between">
                                            <Label className="text-sm text-black flex items-center gap-2">{icon} {label}</Label>
                                            <Switch checked={checked} onCheckedChange={onChange} />
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion> */}

                        {/* <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="transportation">
                                <AccordionTrigger className="text-black bg-gray-50 text-sm hover:bg-gray-100 rounded-xl px-4 py-2 hover:no-underline cursor-pointer flex items-center justify-between">
                                    <div className='flex space-x-4 w-full'>
                                        <User2 size={16} />
                                        <div>柏市の公共施設</div>
                                    </div>
                                   

                                    <button
                                        type="button"
                                        title="凡例グループ表を開く"
                                        className={`p-1 rounded-lg transition-colors ${facilityDialogOpen
                                            ? "bg-blue-100 hover:bg-blue-200" // 開いているとき
                                            : "hover:bg-white/60"             // 閉じているとき
                                            }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation(); // do not toggle accordion
                                            setFacilityDialogOpen((v) => !v);
                                        }}
                                    >
                                        <TableIcon
                                            className={`h-4 w-4 transition-colors ${facilityDialogOpen ? "text-blue-600" : "text-muted-foreground"
                                                }`}
                                        />
                                    </button>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col space-y-2 bg-white rounded-xl mt-2 px-4 py-2">
                                    {[
                                       

                                        { label: '全て', category: '', color: '#808080' },

                                        { label: '保育園・幼稚園など', category: '保育園・幼稚園など', color: '#0072B2' },
                                        { label: '児童・保育・子育て施設', category: '児童・保育・子育て施設', color: '#E69F00' },
                                        { label: '図書館', category: '図書館', color: '#009E73' },
                                        { label: '市民サービス施設', category: '市民サービス施設', color: '#D55E00' },
                                        { label: '教育施設', category: '教育施設', color: '#CC79A7' },
                                   
                                        { label: '病院・薬局・診療所', category: '病院・薬局・診療所', color: '#ef233c' },


                                    ].map(({ label, category, color }) => (
                                        <div key={label} className="flex items-center justify-between">
                                            <Label className="text-sm text-black flex items-center gap-2">
                                                <Circle className='text-white' fill={color} size={20} />
                                                {label}
                                            </Label>
                                            <Switch
                                                checked={selectedCategories.includes(category)}
                                                onCheckedChange={() => handleLayerToggle(category === '' ? '柏市の公共施設-全て' : category, selectedCategories.includes(category), () => toggleKashiwaPublicFacilityVisible(category))}
                                            />
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm text-black flex items-center gap-2">
                                            施設番号ラベル（NO）
                                        </Label>
                                        <Switch
                                            checked={facilityLabelsVisible}
                                            onCheckedChange={toggleFacilityLabelsVisible}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion> */}

                        {/* <Accordion type="single" collapsible className="w-full"> */}
                            {/* <AccordionItem value="transportation"> */}
                                {/* <AccordionTrigger className="text-black bg-gray-50 text-sm hover:bg-gray-100 rounded-xl px-4 py-2 hover:no-underline cursor-pointer flex items-center justify-between">
                                    <div className='flex space-x-4 w-full'>
                                        <ShoppingBasket size={16} /> <div>柏市のお店</div>
                                    </div>
                                    <button
                                        type="button"
                                        title="凡例グループ表を開く（お店）"
                                        className={`p-1 rounded-lg transition-colors ${shopDialogOpen
                                            ? "bg-green-100 hover:bg-green-200" // 開いているとき
                                            : "hover:bg-white/60"              // 閉じているとき
                                            }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShopDialogOpen((v) => !v);
                                        }}
                                    >
                                        <TableIcon
                                            className={`h-4 w-4 transition-colors ${shopDialogOpen ? "text-green-600" : "text-muted-foreground"
                                                }`}
                                        />
                                    </button>
                                </AccordionTrigger> */}
                                {/* <AccordionContent className="flex flex-col space-y-2 bg-white rounded-xl mt-2 px-4 py-2">
                                    {[
                                        { label: '全て', category: '', icon: <Store size={16} />, color: "#808080" }, // All categories (subete)
                                        { label: 'デパート・ショッピングモール', category: 'デパート・ショッピングモール', icon: <ShoppingBag size={16} />, color: "#FF5733" }, // Shopping Mall
                                        { label: 'スーパーマーケット', category: 'スーパーマーケット', icon: <Store size={16} />, color: "#33FF57" }, // Supermarket
                                        { label: 'その他', category: 'その他', icon: <Store size={16} />, color: "#FF99C8" }
                                    ].map(({ label, category, color }) => ( */}

                                        {/* <div key={label} className="flex items-center justify-between">
                                            <Label className="text-sm text-black flex items-center gap-2"> */}
                                                {/* {icon} */}
                                                {/* <div
                                                    className="w-4 h-4  border-2"
                                                    style={{ backgroundColor: color, borderColor: "white" }}
                                                />
                                                {label}
                                            </Label>
                                            <Switch
                                                checked={selectedShopCategories.includes(category)}
                                                onCheckedChange={() => handleLayerToggle(category === '' ? "柏市のお店-全て" : category, selectedShopCategories.includes(category), () => toggleKashiwaShopsVisible(category))}
                                            />
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm text-black">店舗ラベル</Label>
                                        <Switch checked={shopsLabelsVisible} onCheckedChange={toggleShopsLabelsVisible} />
                                    </div>
                                </AccordionContent>
                            </AccordionItem> */}
                        {/* </Accordion> */}

                        {/* <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="kashiwa-od">
                                <AccordionTrigger className="text-black bg-gray-50 text-sm hover:bg-gray-100 rounded-xl px-4 py-2 hover:no-underline cursor-pointer flex items-center ">
                                    <BusFront size={16} /> カシワニクル OD × 時間帯
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col space-y-3 bg-white rounded-xl mt-2 px-4 py-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm text-black flex items-center gap-2">OD フロー（全データ）</Label>
                                        <Switch checked={kashiwakuruOdVisible} onCheckedChange={toggleKashiwakuruOdVisible} />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm text-black flex items-center gap-2">時間帯でフィルター</Label>
                                        <Switch
                                            checked={kashiwakuruOdFilterOn}
                                            onCheckedChange={onToggleKashiwakuruOdFilter}
                                            disabled={!kashiwakuruOdVisible}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-sm text-black">時間帯（開始）</Label>
                                            <span className="text-xs text-muted-foreground">
                                                {kashiwakuruOdHour}:00 – {kashiwakuruOdHour + 1}:00
                                            </span>
                                        </div>

                                        <Slider
                                            min={8}
                                            max={19}
                                            step={1}
                                            value={[kashiwakuruOdHour]}
                                            onValueChange={(vals) => onKashiwakuruOdHourChange(vals[0])}
                                            className="w-full"
                                            disabled={!kashiwakuruOdFilterOn || !kashiwakuruOdVisible}
                                        />

                                        <div className="flex justify-between text-[10px] text-muted-foreground">
                                            {Array.from({ length: 12 }, (_, i) => 8 + i).map((h) => (
                                                <span key={h}>{h}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={onClearOdEndpointHighlight}
                                            className="px-3 py-1 rounded-md text-xs bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={!kashiwakuruOdVisible}
                                        >
                                            ハイライト解除
                                        </button>
                                    </div>

                                    <Separator className="my-2" />
                                    <div className="text-xs font-semibold text-gray-700">100m メッシュ（集約表示）</div>

                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm text-black">OD（集約）</Label>
                                        <Switch
                                            checked={odGridVisible}
                                            onCheckedChange={() => handleLayerToggle('OD（100mメッシュ）', odGridVisible, onToggleOdGrid)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm text-black">時間帯でフィルター</Label>
                                        <Switch
                                            checked={odGridFilterOn}
                                            onCheckedChange={onToggleOdGridFilter}
                                            disabled={!odGridVisible}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-sm text-black">時間帯（開始）</Label>
                                            <span className="text-xs text-muted-foreground">
                                                {odGridHour}:00 – {odGridHour + 1}:00
                                            </span>
                                        </div>
                                        <Slider
                                            min={8}
                                            max={19}
                                            step={1}
                                            value={[odGridHour]}
                                            onValueChange={(vals) => onOdGridHourChange(vals[0])}
                                            className="w-full"
                                            disabled={!odGridVisible || !odGridFilterOn}
                                        />
                                        <div className="flex justify-between text-[10px] text-muted-foreground">
                                            {Array.from({ length: 12 }, (_, i) => 8 + i).map((h) => (
                                                <span key={h}>{h}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm text-black">100m グリッドを表示</Label>
                                        <Switch
                                            checked={odGridShowGrid}
                                            onCheckedChange={onToggleOdGridShowGrid}
                                            disabled={!odGridVisible}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm text-black">双方向で束ねる</Label>
                                        <Switch
                                            checked={odGridUndirected}
                                            onCheckedChange={onToggleOdGridUndirected}
                                            disabled={!odGridVisible}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm text-black">バス停（O/D）を表示</Label>
                                        <Switch
                                            checked={odGridShowStops}
                                            onCheckedChange={onToggleOdGridShowStops}
                                            disabled={!odGridVisible}
                                        />
                                    </div>

                                    <Separator className="my-2" />

                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm text-black">最小ボリューム</Label>
                                        <span className="text-xs text-muted-foreground">{odGridMinVol}</span>
                                    </div>
                                    <Slider
                                        min={1}
                                        max={50}
                                        step={1}
                                        value={[odGridMinVol]}
                                        onValueChange={(vals) => onOdGridMinVolChange(vals[0])}
                                        className="w-full"
                                        disabled={!odGridVisible}
                                    />
                                    <div className="flex justify-between text-[10px] text-muted-foreground">
                                        <span>1</span><span>10</span><span>20</span><span>30</span><span>40</span><span>50</span>
                                    </div>

                                    <div className="mt-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <Label className="text-sm text-black">フォーカス（クリック時）</Label>
                                            <button
                                                type="button"
                                                onClick={onOdGridClearFocus}
                                                disabled={!odGridVisible}
                                                title="フォーカス解除"
                                                className="px-3 py-1 rounded-md text-xs bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                解除
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onOdGridFocusModeChange("out")}
                                                disabled={!odGridVisible || odGridSingleOD}
                                                aria-pressed={odGridFocusMode === "out"}
                                                className={
                                                    odGridFocusMode === "out"
                                                        ? "px-3 py-1 rounded-md text-xs bg-gray-900 hover:bg-black text-white border border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        : "px-3 py-1 rounded-md text-xs bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                }
                                                title="発：選択セルから出るフロー"
                                            >
                                                発
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onOdGridFocusModeChange("in")}
                                                disabled={!odGridVisible || odGridSingleOD}
                                                aria-pressed={odGridFocusMode === "in"}
                                                className={
                                                    odGridFocusMode === "in"
                                                        ? "px-3 py-1 rounded-md text-xs bg-gray-900 hover:bg-black text-white border border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        : "px-3 py-1 rounded-md text-xs bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                }
                                                title="着：選択セルに入るフロー"
                                            >
                                                着
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => onOdGridFocusModeChange("all")}
                                                disabled={!odGridVisible || odGridSingleOD}
                                                aria-pressed={odGridFocusMode === "all"}
                                                className={
                                                    odGridFocusMode === "all"
                                                        ? "px-3 py-1 rounded-md text-xs bg-gray-900 hover:bg-black text-white border border-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                                                        : "px-3 py-1 rounded-md text-xs bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                                }
                                                title="両方：発・着の両方"
                                            >
                                                両方
                                            </button>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion> */}

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="kashiwa-chome">
                                <AccordionTrigger className="text-black bg-gray-50 text-sm hover:bg-gray-100 rounded-xl px-4 py-2 hover:no-underline cursor-pointer flex items-center ">
                                    町丁目人口
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col space-y-2 bg-white rounded-xl mt-2 px-4 py-2">
                                    {[
                                        // { label: '町丁目：総数（G列）', checked: chomeTotalVisible, onChange: () => handleLayerToggle('町丁目：総数', chomeTotalVisible, toggleChomeTotalVisible) },
                                        // { label: '町丁目：高齢化率（K列）', checked: chomeAgingVisible, onChange: () => handleLayerToggle('町丁目：高齢化率', chomeAgingVisible, toggleChomeAgingVisible) },
                                        // { label: '町丁目：人口密度（L列）', checked: chomeDensityVisible, onChange: () => handleLayerToggle('町丁目：人口密度', chomeDensityVisible, toggleChomeDensityVisible) },
                                        // { label: '町丁目：総数（2040 推計）', checked: chomeTotal2040Visible, onChange: () => handleLayerToggle('町丁目：総数（2040 推計）', chomeTotal2040Visible, toggleChomeTotal2040Visible) },
                                        // { label: '町丁目：高齢化率（2040 推計）', checked: chomeAging2040Visible, onChange: () => handleLayerToggle('町丁目：高齢化率（2040 推計）', chomeAging2040Visible, toggleChomeAging2040Visible) },
                                        { label: '地区区分（17）', checked: subdivisionsVisible, onChange: () => toggleSubdivisionsVisible() },
                                    ].map(({ label, checked, onChange }) => (
                                        <div key={label} className="flex items-center justify-between">
                                            <Label className="text-sm text-black flex items-center gap-2">{label}</Label>
                                            <Switch checked={checked} onCheckedChange={onChange} />
                                        </div>
                                    ))}

                                    {/* <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                                                スタイルとフィルター
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={chomeFiltersOpen}
                                                    disabled={!anyChomeLayerOn}
                                                    onCheckedChange={(next) => {
                                                        if (!next) resetChomeUIAndLayers(); // closing collapses + resets everything
                                                        setChomeFiltersOpen(next);
                                                    }}
                                                />
                                            </div>
                                        </div>



                                        <AnimatePresence initial={false}>
                                            {chomeFiltersOpen && (
                                                <motion.div
                                                    key="chome-filters"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="overflow-hidden space-y-4"
                                                >

                                                    <Separator />
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-12 gap-3">
                                                            <Label className="col-span-4 text-xs text-muted-foreground whitespace-nowrap self-center">対象</Label>
                                                            <div className="col-span-8">
                                                                <Select value={chomeTarget} onValueChange={(v) => setChomeTarget(v as any)}>
                                                                    <SelectTrigger className="h-8 text-xs rounded-lg w-full">
                                                                        <SelectValue placeholder="対象を選択" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="total">総数（G）</SelectItem>
                                                                        <SelectItem value="aging">高齢化率（K）</SelectItem>
                                                                        <SelectItem value="density">人口密度（L）</SelectItem>
                                                                        <SelectItem value="total_2040">総数（2040 推計）</SelectItem>
                                                                        <SelectItem value="aging_2040">高齢化率（2040 推計）</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>

                                                           

                                                            <Label className="col-span-4 text-xs text-muted-foreground whitespace-nowrap self-center">分類</Label>
                                                            <div className="col-span-8">
                                                                <Select value={chomeMethod} onValueChange={(v) => setChomeMethod(v as any)}>
                                                                    <SelectTrigger className="h-8 text-xs rounded-lg w-full">
                                                                        <SelectValue placeholder="分類を選択" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="quantile">分位法</SelectItem>
                                                                        <SelectItem value="equal">等間隔</SelectItem>
                                                                        <SelectItem value="jenks">ジェンクス</SelectItem>
                                                                        <SelectItem value="manual">手動</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        </div>


                                                        <div className="space-y-4">
                                                            <div>
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <Label className="text-xs">ビン数</Label>
                                                                    <span className="text-xs text-muted-foreground">{chomeBins}</span>
                                                                </div>
                                                                <Slider
                                                                    min={3}
                                                                    max={7}
                                                                    step={1}
                                                                    value={[chomeBins]}
                                                                    onValueChange={(v) => setChomeBins(v[0])}
                                                                    className="px-1"
                                                                />
                                                            </div>

                                                            <div>
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <Label className="text-xs">不透明度</Label>
                                                                    <span className="text-xs text-muted-foreground">{chomeOpacity}%</span>
                                                                </div>
                                                                <Slider
                                                                    min={30}
                                                                    max={100}
                                                                    step={1}
                                                                    value={[chomeOpacity]}
                                                                    onValueChange={(v) => setChomeOpacity(v[0])}
                                                                    className="px-1"
                                                                />
                                                            </div>
                                                        </div>

                                                        {chomeMethod === "manual" && (
                                                            <div className="space-y-3">
                                                                <div className="text-xs text-muted-foreground">
                                                                    手動しきい値（{chomeBins}段階 → 閾値 {Math.max(0, chomeBins - 1)}個）。
                                                                    高齢化率（K）は <b>0〜1（例: 0.35）</b> でも <b>%（例: 35）</b> でも入力OKです。
                                                                </div>

                                                                <div className="grid grid-cols-12 gap-2">
                                                                    {Array.from({ length: Math.max(0, chomeBins - 1) }, (_, i) => (
                                                                        <React.Fragment key={`manual-break-${i}`}>
                                                                            <Label className="col-span-4 text-xs text-muted-foreground self-center">
                                                                                閾値 {i + 1}
                                                                            </Label>
                                                                            <Input
                                                                                inputMode="numeric"
                                                                                type="number"
                                                                                step="any"
                                                                                placeholder={
                                                                                    (chomeTarget === "aging" || chomeTarget === "aging_2040") ? "例: 0.3 または 30" : "例: 5000"
                                                                                }
                                                                                className="col-span-8 h-8 text-xs rounded-lg"
                                                                                value={(manualBreaksByMetric[chomeTarget] ?? [])[i] ?? ""}
                                                                                onChange={(e) => {
                                                                                    const v = e.target.value;
                                                                                    setManualBreaksByMetric((prev) => {
                                                                                        const arr = [...(prev[chomeTarget] ?? [])];
                                                                                        arr[i] = v;
                                                                                        return { ...prev, [chomeTarget]: arr };
                                                                                    });
                                                                                }}
                                                                            />
                                                                        </React.Fragment>
                                                                    ))}
                                                                </div>

                                                                <div className="flex gap-2">
                                                                    <button
                                                                        className="rounded-lg flex-1 text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                                                        onClick={() => {
                                                                            // Clear only current metric's manual inputs
                                                                            setManualBreaksByMetric((prev) => ({ ...prev, [chomeTarget]: emptyBreaks(Math.max(0, chomeBins - 1)) }));
                                                                        }}
                                                                    >
                                                                        クリア
                                                                    </button>

                                                                    <button
                                                                        className="rounded-lg flex-1 text-xs px-3 py-1 bg-black text-white hover:bg-black/90"
                                                                        onClick={() => {
                                                                            // Force-apply now (if valid); the effect also applies automatically
                                                                            const raw = (manualBreaksByMetric[chomeTarget] ?? [])
                                                                                .map((s) => s.trim())
                                                                                .filter((s) => s !== "")
                                                                                .map((s) => Number(s))
                                                                                .filter((n) => !Number.isNaN(n));
                                                                            if (raw.length === Math.max(0, chomeBins - 1)) {
                                                                                onChomeStyleChange(chomeTarget, {
                                                                                    method: "manual",
                                                                                    breaks: [...raw].sort((a, b) => a - b),
                                                                                    opacity: chomeOpacity / 100,
                                                                                });
                                                                            }
                                                                        }}
                                                                    >
                                                                        手動しきい値を適用
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}

                                                        <Separator />

                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                                <Filter className="h-4 w-4 text-muted-foreground" />
                                                                範囲フィルター
                                                            </div>

                                                            <div className="grid grid-cols-12 gap-3">
                                                                

                                                                <Label className="col-span-4 text-xs text-muted-foreground self-center">
                                                                    最小{isAgingMetric ? "（%）" : isDensityMetric ? "（人/ha）" : ""}
                                                                </Label>
                                                                <Input
                                                                    inputMode="numeric"
                                                                    type="number"
                                                                    value={chomeMin}
                                                                    onChange={(e) => setChomeMin(e.target.value)}
                                                                    placeholder={isAgingMetric ? "例: 25" : isDensityMetric ? "例: 10" : "例: 1000"}
                                                                    className="col-span-8 h-8 text-xs rounded-lg"
                                                                />

                                                                <Label className="col-span-4 text-xs text-muted-foreground self-center">
                                                                    最大{isAgingMetric ? "（%）" : isDensityMetric ? "（人/ha）" : ""}
                                                                </Label>
                                                                <Input
                                                                    inputMode="numeric"
                                                                    type="number"
                                                                    value={chomeMax}
                                                                    onChange={(e) => setChomeMax(e.target.value)}
                                                                    placeholder={isAgingMetric ? "例: 40" : isDensityMetric ? "例: 25" : "例: 10000"}
                                                                    className="col-span-8 h-8 text-xs rounded-lg"
                                                                />
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <button
                                                                    className="h-8 rounded-lg flex-1 text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                                                    onClick={() => {
                                                                        setChomeMin(''); setChomeMax('');
                                                                        onChomeRangeChange(chomeTarget, null, null);
                                                                    }}
                                                                >
                                                                    解除
                                                                </button>
                                                                <button
                                                                    className="h-8 rounded-lg flex-1 text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                                                    onClick={() => {
                                                                        const rawMin = chomeMin === '' ? null : Number(chomeMin);
                                                                        const rawMax = chomeMax === '' ? null : Number(chomeMax);
                                                                        const toProp = (v: number | null) => {
                                                                            if (v == null) return null;
                                                                            if (isAgingMetric) return v / 100;
                                                                            if (isDensityMetric) return v * 100;
                                                                            return v;
                                                                        };
                                                                        onChomeRangeChange(chomeTarget, toProp(rawMin), toProp(rawMax));
                                                                    }}
                                                                >
                                                                    範囲を適用
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <Separator />

                                                        <div className="space-y-3">
                                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                                <Type className="h-4 w-4 text-muted-foreground" />
                                                                ラベル
                                                            </div>

                                                            <div className="flex items-center justify-between">
                                                                <Label className="text-xs">ラベル表示</Label>
                                                                <Switch
                                                                    checked={chomeLabelsOn}
                                                                    onCheckedChange={(next) => {
                                                                        setChomeLabelsOn(next);
                                                                        onChomeLabelsChange(next, chomeLabelsMode, chomeLabelsMetric);
                                                                    }}
                                                                />
                                                            </div>

                                                            <div className="grid grid-cols-12 gap-3">
                                                                <Label className="col-span-4 text-xs text-muted-foreground self-center">内容</Label>
                                                                <div className="col-span-8">
                                                                    <Select
                                                                        value={chomeLabelsMode}
                                                                        onValueChange={(v) => {
                                                                            const mode = v as 'name' | 'metric';
                                                                            setChomeLabelsMode(mode);
                                                                            onChomeLabelsChange(chomeLabelsOn, mode, chomeLabelsMetric);
                                                                        }}
                                                                    >
                                                                        <SelectTrigger className="h-8 text-xs rounded-lg w-full">
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="name">町丁字名</SelectItem>
                                                                            <SelectItem value="metric">数値</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>

                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div> */}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="railway">
                                <AccordionTrigger className="text-black bg-gray-50 text-sm hover:bg-gray-100 rounded-xl px-4 py-2 hover:no-underline cursor-pointer flex items-center ">
                                    {/* Reuse an icon you already import, e.g. Landmark */}
                                    <Landmark size={16} /> 鉄道路線・駅
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col space-y-2 bg-white rounded-xl mt-2 px-4 py-2">
                                    {[
                                        {
                                            label: "鉄道（ライン）",
                                            checked: railLinesVisible,
                                            onChange: () => handleLayerToggle("鉄道（ライン）", railLinesVisible, toggleRailLinesVisible),
                                            icon: <Landmark size={16} />,
                                        },
                                        {
                                            label: "鉄道駅（点）",
                                            checked: railStationsVisible,
                                            onChange: () => handleLayerToggle("鉄道駅（点）", railStationsVisible, toggleRailStationsVisible),
                                            icon: <MapPin size={16} />,
                                        },
                                        {
                                            label: "駅 800m（柏/柏の葉は1km）カバレッジ",
                                            checked: stationCoverageVisible,
                                            onChange: () =>
                                                handleLayerToggle("駅カバレッジ（800m/1km）", stationCoverageVisible, toggleStationCoverageVisible),
                                            icon: <Landmark size={16} />,
                                        },
                                        {
                                            label: "鉄道駅（利用者数の円）",
                                            checked: stationPassengersVisible,
                                            onChange: () =>
                                                handleLayerToggle("鉄道駅（利用者数）", stationPassengersVisible, toggleStationPassengersVisible),
                                            icon: <Users size={16} />,
                                        },
                                    ].map(({ label, checked, onChange, icon }) => (
                                        <div key={label} className="flex items-center justify-between">
                                            <Label className="text-sm text-black flex items-center gap-2">{icon} {label}</Label>
                                            <Switch checked={checked} onCheckedChange={onChange} />
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {/* <Button
                            onClick={() => handleLayerToggle('柏市 標高グリッド', elevationGridVisible, toggleElevationGrid)}
                            className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer"
                        >
                            <Mountain size={16} />
                            {elevationGridVisible ? '標高グリッドを非表示' : '標高グリッドを表示'}
                        </Button> */}

                        {/* <Button
                            onClick={() =>
                                handleLayerToggle("千葉県 道路", chibaRoadsVisible, toggleChibaRoads)
                            }
                            className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer"
                        >
                            <Route size={16} />
                            {chibaRoadsVisible ? "道路を非表示" : "道路を表示"}
                        </Button> */}

                        {/* Metric Selector */}
                        <Select value={selectedMetric} onValueChange={(value) => {
                            const label = metricLabels[value];

                            setGlobalVisibleLayers([label]); // Replace all layers with the new one
                            onMetricChange(value);           // Call your metric change logic
                        }}>
                            <SelectTrigger className="w-full px-4 py-2 text-sm bg-white rounded-xl text-black shadow border border-gray-200">
                                <SelectValue placeholder="表示する人口指標" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PTN_2020">総人口（2020年）</SelectItem>
                                <SelectItem value="PTC_2020">65歳以上の人口（2020年）</SelectItem>
                                <SelectItem value="PTA_2020">0〜14歳の人口（2020年）</SelectItem>
                                <SelectItem value="ELDERLY_RATIO">高齢者比率（65歳以上／総人口）</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* <Button
                            onClick={() => setUserPanelOpen(v => !v)}
                            className="flex items-center gap-2 bg-white rounded-2xl text-black hover:bg-[#f2f2f2] cursor-pointer"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                            Data & Styles
                        </Button> */}


                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="bus-frequency">
                                <AccordionTrigger className="text-black bg-gray-50 text-sm hover:bg-gray-100 rounded-xl px-4 py-2 hover:no-underline cursor-pointer flex items-center ">
                                    <Bus size={16} />
                                    バス路線（本数スタイル）
                                </AccordionTrigger>

                                <AccordionContent className="flex flex-col space-y-3 bg-white rounded-xl mt-2 px-4 py-3">
                                    {/* Row: toggle + day select */}
                                    <div className="flex flex-col justify-between w-full">
                                        <div className="flex justify-between space-y-4 items-center gap-2">
                                            <Label className="text-sm text-black flex items-center gap-2">
                                                <Bus size={16} /> 路線（本数スタイル）
                                            </Label>
                                            <Switch
                                                checked={busRoutesFrequencyVisible}
                                                onCheckedChange={() =>
                                                    handleLayerToggle(
                                                        "路線（本数スタイル）",
                                                        busRoutesFrequencyVisible,
                                                        toggleBusRoutesFrequencyVisible
                                                    )
                                                }
                                            />
                                        </div>

                                        {/* shadcn Select for day */}
                                        <div className="flex w-full justify-between items-center gap-2">
                                            <Label className="text-xs text-muted-foreground">対象日</Label>
                                            <Select
                                                value={busRoutesFrequencyDay}
                                                onValueChange={(v) => onBusRoutesFrequencyDayChange(v as "weekday" | "saturday" | "holiday")}
                                            >
                                                <SelectTrigger className="h-8 w-36 text-sm">
                                                    <SelectValue placeholder="選択" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="weekday">平日</SelectItem>
                                                    <SelectItem value="saturday">土曜</SelectItem>
                                                    <SelectItem value="holiday">日祝</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    {busRoutesFrequencyVisible && (
                                        <>
                                            <Separator />
                                            {/* Thresholds */}
                                            <div className="rounded-lg space-y-2">
                                                <Label className="text-xs text-muted-foreground">レンジ区分（カンマ区切り）</Label>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        value={freqThresholdsText}
                                                        onChange={(e) => setFreqThresholdsText(e.target.value)}
                                                        onBlur={applyThresholdsText}
                                                        placeholder="例: 10,20,30,40,60"
                                                        className="h-9"
                                                    />
                                                    <Button variant="secondary" className="h-9" onClick={applyThresholdsText}>
                                                        反映
                                                    </Button>
                                                </div>
                                                <p className="text-[11px] text-muted-foreground">
                                                    区間は <code className="px-1 rounded bg-gray-100">[前値, 次値)</code> で扱います。
                                                </p>
                                            </div>

                                            {/* Colors (1 per band) */}
                                            <div className="rounded-lg space-y-2">
                                                <Label className="text-xs text-muted-foreground">色（各レンジ）</Label>
                                                <div className="grid grid-cols-1 gap-1">
                                                    {colorBands.map((c, i) => (
                                                        <div key={i} className="flex items-center justify-between gap-3 rounded-md p-1">
                                                            <div className="text-xs text-gray-600">{bandLabel(i)}</div>
                                                            <div className="flex items-center gap-2">
                                                                {/* hex text */}
                                                                <Input
                                                                    value={c}
                                                                    onChange={(e) => {
                                                                        const next = [...colorBands];
                                                                        next[i] = e.target.value;
                                                                        onBusRoutesFrequencyStyleChange({ ...busRoutesFrequencyStyle, colors: next });
                                                                    }}
                                                                    className="h-8 w-28"
                                                                />
                                                                {/* native color input (shadcn Input styles still apply) */}
                                                                <Input
                                                                    type="color"
                                                                    value={c}
                                                                    onChange={(e) => {
                                                                        const next = [...colorBands];
                                                                        next[i] = e.target.value;
                                                                        onBusRoutesFrequencyStyleChange({ ...busRoutesFrequencyStyle, colors: next });
                                                                    }}
                                                                    className="h-8 w-12 p-1 border-0 "
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Widths + reset */}
                                            <div className="rounded-lg space-y-3">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <Label className="text-xs text-muted-foreground mb-1 block">最小太さ (px)</Label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={busRoutesFrequencyStyle.widthRange.min}
                                                            onChange={(e) =>
                                                                onBusRoutesFrequencyStyleChange({
                                                                    ...busRoutesFrequencyStyle,
                                                                    widthRange: { ...busRoutesFrequencyStyle.widthRange, min: Number(e.target.value) || 0 },
                                                                })
                                                            }
                                                            className="h-9"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className="text-xs text-muted-foreground mb-1 block">最大太さ (px)</Label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={busRoutesFrequencyStyle.widthRange.max}
                                                            onChange={(e) =>
                                                                onBusRoutesFrequencyStyleChange({
                                                                    ...busRoutesFrequencyStyle,
                                                                    widthRange: { ...busRoutesFrequencyStyle.widthRange, max: Number(e.target.value) || 0 },
                                                                })
                                                            }
                                                            className="h-9"
                                                        />
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="secondary"
                                                    onClick={() =>
                                                        onBusRoutesFrequencyStyleChange({
                                                            thresholds: [10, 20, 30, 40, 60],
                                                            colors: ["#000000", "#91bfdb", "#4575b4", "#fee090", "#fc8d59", "#d73027"],
                                                            widthRange: { min: 1.0, max: 4.2 },
                                                        })
                                                    }
                                                    className="h-9 w-full"
                                                >
                                                    既定値にリセット
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>



                    </motion.div>
                )}
            </AnimatePresence>

            {/* <LegendGroupTableDialog
                title="公共施設 — 凡例グループ × 施設番号 × 施設名"
                open={facilityDialogOpen}
                onOpenChange={setFacilityDialogOpen}
                rows={facilityLegendRows}
            />
            <LegendGroupTableDialog
                title="お店 — 凡例グループ × 施設番号 × 施設名"
                open={shopDialogOpen}
                onOpenChange={setShopDialogOpen}
                rows={shopLegendRows}
            /> */}
        </div>
    );
}
