/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Train, 
  Ship, 
  CableCar, 
  MapPin, 
  Clock, 
  CreditCard, 
  Armchair, 
  Info, 
  Tent, 
  Waves, 
  Beer, 
  ShoppingBag, 
  Droplets, 
  ChevronRight,
  Gift,
  ArrowRight,
  Camera,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface TransportLeg {
  type: 'train' | 'boat' | 'cable-car' | 'bus' | 'walk';
  route: string;
  time?: string;
  duration?: string;
  platform?: string; // trainline, SBB, omio
  price?: string;
  seat?: string;
  notes?: string[];
  isHighlight?: boolean;
}

interface DayData {
  date: string;
  title: string;
  legs: TransportLeg[];
  accommodation: {
    name: string;
    details?: string;
  };
}

// --- Data ---
const TRAVEL_DATA: DayData[] = [
  {
    date: '5.9',
    title: '米兰 (Milano) → 因特拉肯 (Interlaken)',
    legs: [
      {
        type: 'train',
        route: '米兰 (Milano) → 因特拉肯 (Interlaken)',
        time: '07:10 - 10:48',
        platform: 'Trainline',
        price: '79 欧 (EUR)',
        seat: '4 车厢 85 座',
        notes: [
          '07:10-09:53 到达 施皮茨 (Spiez)',
          '在 施皮茨 (Spiez) 换乘 (停留 30min)',
          '10:23-10:48 到达 因特拉肯 (Interlaken)'
        ]
      },
      {
        type: 'train',
        route: '因特拉肯东站 (Interlaken Ost) → 施特歇尔贝格 (Stechelberg)',
        time: '11:04 - 11:55',
        platform: 'SBB',
        price: '13.2 CHF',
        notes: [
          '因特拉肯东站 (Interlaken Ost) → 劳特布龙嫩 (Lauterbrunnen) → 施特歇尔贝格 (Stechelberg)',
          '11:04-11:26 第一段',
          '换乘 9min',
          '11:35-11:55 第二段'
        ]
      },
      {
        type: 'cable-car',
        route: '雪朗峰 (Schilthorn) 登顶路线',
        platform: '柜台购票',
        price: '110 CHF (往返 Return)',
        isHighlight: true,
        notes: [
          '步行 2min 到 施特歇尔贝格 (Stechelberg) 缆车站',
          '购票说: "Schilthorn return ticket"',
          '第一段: 施特歇尔贝格 (Stechelberg) → 米伦 (Mürren) (最陡/刺激, 坐右侧)',
          '第二段: 米伦 (Mürren) → 毕格 (Birg) (两边均可)',
          '第三段: 毕格 (Birg) → 雪朗峰 (Schilthorn) (最后一段)'
        ]
      },
      {
        type: 'walk',
        route: '雪朗峰 (Schilthorn) 游玩 & 下山路线',
        notes: [
          'Allmendhubel 方向草地 + 悬崖步道发呆',
          '下山 ①: 雪朗峰 (Schilthorn) → 米伦 (Mürren) (坐左边拍照)',
          '下山 ②: 米伦 (Mürren) → Grütschalp (坐山间小火车, 超美, 靠右坐, 重点看风景)',
          '下山 ③: Grütschalp → 劳特布龙嫩 (Lauterbrunnen) (坐缆车, 靠右坐, 看瀑布谷)'
        ]
      }
    ],
    accommodation: {
      name: 'Backpackers Villa Sonnenhof (因特拉肯青旅)',
      details: '返回因特拉肯时根据情况买票'
    }
  },
  {
    date: '5.10',
    title: '23岁生日快乐！布里恩茨湖 (Lake Brienz)',
    legs: [
      {
        type: 'boat',
        route: '因特拉肯东站 (Interlaken Ost) → 布里恩茨 (Brienz) 游船',
        time: '10:07 - 11:20',
        duration: '1h 10min',
        price: '生日免费！(原价 119 CHF)',
        isHighlight: true,
        notes: [
          '码头在火车站旁边',
          '去柜台出示护照领票',
          '坐在船体右侧，可以自由走动',
          '到岸往右走有湖边栈道可以发呆'
        ]
      },
      {
        type: 'train',
        route: '布里恩茨蒸汽火车 (Rothorn Bahn)',
        time: '13:45 上山 | 16:45 下山',
        price: '8 CHF (生日座位预约费)',
        seat: '坐右边 / 最后一节车厢',
        notes: [
          '13:45 蒸汽火车上山，提前占座',
          '推荐最后一节车厢或连接处拍照',
          '14:15 到达 普拉纳普 (Planalp)',
          '16:45 下山: 坐右边防止蒸汽挡视线',
          '预约 PDF 在微信中, 车站赠送明信片/香皂'
        ]
      }
    ],
    accommodation: {
      name: 'Brienz Youth Hostel (布里恩茨青旅)',
      details: '布里恩茨湖畔'
    }
  },
  {
    date: '5.11',
    title: '施皮茨 (Spiez) 小镇 & 返回米兰 (Milano)',
    legs: [
      {
        type: 'train',
        route: '布里恩茨 (Brienz) → 施皮茨 (Spiez)',
        time: '14:02 - 14:54',
        platform: 'SBB',
        price: '11 CHF',
        notes: [
          '14:02-14:24 到达 因特拉肯东站 (Interlaken Ost)',
          '换乘 5min',
          '14:29-14:54 到达 施皮茨 (Spiez) station'
        ]
      },
      {
        type: 'walk',
        route: '施皮茨 (Spiez) 湖边慢生活',
        duration: '停留约 4h',
        notes: [
          '施皮茨城堡 (Spiez Castle) 下方湖边放松',
          '享受湖景与城堡氛围'
        ]
      },
      {
        type: 'train',
        route: '施皮茨 (Spiez) → 米兰 (Milano Centrale)',
        time: '19:05 - 21:50',
        platform: 'Omio',
        price: '53 欧 (EUR)',
        seat: '5 车厢 21 座',
        notes: [
          '回程长途火车',
          '确认行李寄存/提取时间'
        ]
      }
    ],
    accommodation: {
      name: '旅程结束 (Back Home)',
      details: '回到米兰'
    }
  }
];

const SURVIVAL_TIPS = [
  { icon: <ShoppingBag className="w-5 h-5" />, title: '超市营业时间', content: 'Coop/Migros 18:30-20:00 关门。5.10 周日全部关门。' },
  { icon: <Beer className="w-5 h-5" />, title: '当地食饮', content: 'Feldschlösschen 啤酒, 三明治, Lindt Frey 巧克力。' },
  { icon: <Droplets className="w-5 h-5" />, title: '直饮水指南', content: '带上自用杯！公共喷泉、酒店、火车站洗手间水龙头均可直饮。' },
  { icon: <CreditCard className="w-5 h-5" />, title: '小费文化', content: '瑞士餐厅小费已含在账单内，通常不需要额外支付。' },
  { icon: <Info className="w-5 h-5" />, title: '公共厕所', content: '景区山上大部分免费，超市可能有，但火车站通常要收费。' },
];

// --- Components ---

const TransportIcon = ({ type }: { type: TransportLeg['type'] }) => {
  switch (type) {
    case 'train': return <Train className="text-natural-accent" />;
    case 'boat': return <Waves className="text-natural-accent" />;
    case 'cable-car': return <CableCar className="text-natural-accent" />;
    case 'walk': return <MapPin className="text-natural-accent" />;
    default: return <Clock className="text-natural-accent" />;
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState(0); // 0, 1, 2 = Days, 3 = Travel Tips

  return (
    <div className="min-h-screen bg-natural-bg font-sans text-natural-text pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-natural-bg/90 backdrop-blur-md border-b border-natural-border px-4 py-8 md:px-8">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-natural-highlight text-natural-accent rounded-full text-[10px] font-bold tracking-widest uppercase">Travel Plan</span>
              <span className="text-natural-muted text-xs uppercase tracking-wider">Happy 23rd Birthday</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-natural-accent leading-tight">
              Lorry的23岁生日 - 瑞士
            </h1>
          </div>
          
          <div className="flex gap-2 bg-[#E9E5D9]/30 p-1.5 rounded-full border border-natural-border overflow-x-auto no-scrollbar w-full md:w-auto">
            {TRAVEL_DATA.map((day, idx) => (
              <button
                key={day.date}
                onClick={() => setActiveTab(idx)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all shrink-0 ${
                  activeTab === idx 
                    ? 'bg-natural-accent shadow-sm text-natural-bg' 
                    : 'text-natural-muted hover:text-natural-accent'
                }`}
              >
                {day.date}
              </button>
            ))}
            <button
              onClick={() => setActiveTab(3)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all shrink-0 ${
                activeTab === 3 
                  ? 'bg-natural-accent shadow-sm text-natural-bg' 
                  : 'text-natural-muted hover:text-natural-accent'
              }`}
            >
              生活提示
            </button>
            <div className="w-4 shrink-0" /> {/* Spacer to ensure scroll end is reachable */}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-8 space-y-8">
        <AnimatePresence mode="wait">
          {activeTab < 3 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Day Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4 pb-6 border-b border-natural-border/50">
                <div className="space-y-1">
                  <h2 className="text-3xl font-serif text-natural-accent leading-none">{TRAVEL_DATA[activeTab].title}</h2>
                  <div className="flex items-center gap-2 text-natural-muted">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">{TRAVEL_DATA[activeTab].date} 日程安排</span>
                  </div>
                </div>
                {activeTab === 1 && (
                  <div className="bg-natural-warm/50 px-4 py-1.5 rounded-full flex items-center gap-2 border border-natural-highlight/30">
                    <Star className="w-4 h-4 text-natural-accent fill-natural-accent/20" />
                    <span className="text-[10px] font-bold text-natural-accent uppercase tracking-[0.2em]">Birthday!</span>
                  </div>
                )}
              </div>

              {/* Transport Cards */}
              <div className="space-y-6">
                {TRAVEL_DATA[activeTab].legs.map((leg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`group bg-white rounded-[32px] border border-natural-border p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md ${
                      leg.isHighlight ? 'bg-natural-warm/10 border-natural-highlight' : ''
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-row md:flex-col items-center justify-center md:w-24 shrink-0 md:border-r border-natural-border md:pr-6 gap-4">
                        <div className={`p-4 rounded-2xl ${leg.isHighlight ? 'bg-natural-highlight/30' : 'bg-natural-bg'}`}>
                          <TransportIcon type={leg.type} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-natural-muted leading-none">
                          {leg.type}
                        </span>
                      </div>

                      <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                          <h3 className="font-serif text-2xl md:text-3xl text-natural-accent leading-tight">
                            {leg.route}
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 pt-2">
                            {leg.time && (
                              <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-natural-muted mb-1.5 tracking-tighter">Departure 出发时间</span>
                                <span className="text-xl font-bold text-natural-text leading-none">{leg.time}</span>
                              </div>
                            )}
                            {leg.platform && (
                              <div className="flex flex-col items-start">
                                <span className="text-[10px] uppercase font-bold text-natural-muted mb-1.5 tracking-tighter">Booking App 平台</span>
                                <span className="inline-block px-2 py-0.5 bg-natural-accent text-natural-bg rounded text-[10px] font-bold uppercase">
                                  {leg.platform}
                                </span>
                              </div>
                            )}
                            {leg.duration && (
                              <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-natural-muted mb-1.5 tracking-tighter">Duration 时长</span>
                                <span className="text-xl font-bold text-natural-text leading-none">{leg.duration}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {(leg.price || leg.seat) && (
                          <div className="grid grid-cols-2 gap-8 py-6 border-y border-natural-border/50">
                            {leg.price && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] uppercase font-bold text-natural-muted tracking-tighter block">Price 价格</span>
                                <p className="text-lg font-bold text-natural-accent leading-none">{leg.price}</p>
                              </div>
                            )}
                            {leg.seat && (
                              <div className="space-y-1.5">
                                <span className="text-[10px] uppercase font-bold text-natural-muted tracking-tighter block">Seat 座位</span>
                                <p className="text-lg font-bold text-natural-accent leading-none">{leg.seat}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {leg.notes && leg.notes.length > 0 && (
                          <div className="space-y-3">
                            {leg.notes.map((note, nIdx) => (
                              <div key={nIdx} className="flex gap-4 items-start group/note">
                                <div className="w-1.5 h-1.5 rounded-full bg-natural-muted mt-2 shrink-0 transition-all group-hover/note:bg-natural-accent" />
                                <p className="text-sm text-natural-muted group-hover/note:text-natural-text transition-colors">
                                  {note}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Simplified Accommodation */}
              <div className="bg-white border border-natural-border rounded-[32px] p-6 shadow-sm flex items-center gap-6">
                <div className="bg-natural-bg p-4 rounded-2xl text-natural-accent">
                  <Tent className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-natural-muted block mb-1">今晚住哪</span>
                  <h4 className="text-xl font-serif text-natural-accent leading-none">
                    {TRAVEL_DATA[activeTab].accommodation.name}
                  </h4>
                  <p className="text-xs text-natural-muted mt-1 leading-relaxed italic">
                    {TRAVEL_DATA[activeTab].accommodation.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tips"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10 py-4"
            >
              <div className="text-center space-y-4 max-w-lg mx-auto">
                <h2 className="text-4xl font-serif text-natural-accent">生活提示 / Travel Tips</h2>
                <p className="text-sm italic text-natural-muted">
                  “去感受自然与微风，去体验那些安静思考的时刻。”
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SURVIVAL_TIPS.map((tip, idx) => (
                  <div key={idx} className="tip-card flex gap-4">
                    <div className="bg-natural-bg p-3.5 rounded-2xl text-natural-accent h-fit">
                      {tip.icon}
                    </div>
                    <div className="space-y-1">
                      <h5 className="font-bold text-sm tracking-tight text-natural-accent">{tip.title}</h5>
                      <p className="text-xs text-natural-muted leading-relaxed">
                        {tip.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-dashed border-natural-border rounded-3xl p-8 text-center space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-natural-muted">Birthday Moto</p>
                <p className="text-xl font-serif text-natural-accent italic">
                  “生活就在此刻，不在别处。”
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <footer className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-natural-muted pt-8 border-t border-natural-border">
          <p>© 2026 Swiss Birthday Adventure</p>
          <p className="italic font-bold">Hope you have a wonderful trip</p>
        </footer>
      </main>
    </div>
  );
}
