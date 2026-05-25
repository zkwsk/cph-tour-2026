import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const numberedIcon = (number) =>
  L.divIcon({
    className: 'numbered-marker',
    html: `<div style="background:#111827;color:white;border:2px solid white;box-shadow:0 4px 12px rgba(0,0,0,.25);width:30px;height:30px;border-radius:9999px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;">${number}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -16]
  });

const stops = [
  {
    name: 'Hotel Manon Les Suites',
    coords: [55.6767, 12.5627],
    mode: 'start / walk',
    desc: 'Starting point — and eventual elevator maze finale.',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Istedgade → Kødbyen',
    coords: [55.6686, 12.5581],
    mode: 'walk',
    desc: 'Walked through Istedgade into Copenhagen’s meatpacking district.',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Kaktus Towers & Cykelslangen',
    coords: [55.6652, 12.5667],
    mode: 'walk',
    desc: 'Passed beneath the iconic bicycle bridge before crossing Bryggebroen.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Islands Brygge & Gemini Residence',
    coords: [55.6623, 12.5708],
    mode: 'walk',
    desc: 'Harbourfront walk with industrial architecture and canal views.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Amager Fælled',
    coords: [55.6548, 12.5922],
    mode: 'walk',
    desc: 'Nature reserve and grazing field — horse-free on this visit.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Københavns Universitet & DR Byen',
    coords: [55.6596, 12.5893],
    mode: 'walk',
    desc: 'Bike and walking paths toward the university campus and TV station.',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Christianshavn',
    coords: [55.6737, 12.5968],
    mode: 'metro',
    desc: 'Metro from DR Byen to Christianshavn before entering Christiania.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Christiania: Pusher Street, Månefiskeren & Morgenstedet',
    coords: [55.6766, 12.6117],
    mode: 'walk',
    desc: 'Explored Christiania, crossed Dyssebroen, and continued through Midtdyssen and Norddyssen.',
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Refshaleøen & Reffen Street Food Market',
    coords: [55.6929, 12.6153],
    mode: 'walk',
    desc: 'Street food, harbour views, a glance at Alchemist, and a mysterious top-secret interlude nearby.',
    image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Nyhavn',
    coords: [55.6798, 12.5910],
    mode: 'harbour bus',
    desc: 'Arrived by harbour bus and observed the colourful waterfront houses.',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Marmorkirken & Amalienborg',
    coords: [55.6848, 12.5932],
    mode: 'walk',
    desc: 'Royal Copenhagen finale before taking the metro back toward Rådhuspladsen.',
    image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=1200&auto=format&fit=crop'
  },
  {
    name: 'Rådhuspladsen → Manon Les Suites',
    coords: [55.6761, 12.5683],
    mode: 'metro / walk',
    desc: 'Returned to the hotel and got lost in an elevator.',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop'
  }
];

const route = stops.map((stop) => stop.coords);

export default function App() {
  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <section className="rounded-3xl bg-white p-8 shadow-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">Copenhagen · visual route summary</p>
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">Copenhagen Walking Tour</h1>
          <p className="max-w-4xl text-lg leading-relaxed text-neutral-600">
            An all-day urban expedition through Vesterbro, Kødbyen, Islands Brygge, Amager Fælled,
            Christiania, Refshaleøen, Nyhavn, Marmorkirken, Amalienborg, and finally back to Manon Les Suites.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl lg:col-span-2">
            <div className="border-b border-neutral-200 p-5">
              <h2 className="text-2xl font-semibold">Interactive route map</h2>
              <p className="text-sm text-neutral-500">Approximate path with walking, metro, and harbour bus segments.</p>
            </div>

            <div className="h-[720px] w-full">
              <MapContainer center={[55.674, 12.589]} zoom={13} scrollWheelZoom className="h-full w-full">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline positions={route} pathOptions={{ color: '#111827', weight: 4, opacity: 0.85 }} />
                {stops.map((stop, index) => (
                  <Marker key={stop.name} position={stop.coords} icon={numberedIcon(index + 1)}>
                    <Popup>
                      <strong>{index + 1}. {stop.name}</strong><br />
                      <em>{stop.mode}</em><br />
                      {stop.desc}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <aside className="rounded-3xl bg-white p-6 shadow-xl">
            <h2 className="mb-6 text-2xl font-semibold">Tour timeline</h2>
            <div className="max-h-[920px] space-y-5 overflow-y-auto pr-2">
              {stops.map((stop, index) => (
                <article key={stop.name} className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">{stop.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">{stop.mode}</p>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{stop.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-3xl font-bold">Point-of-interest gallery</h2>
            <p className="mt-1 text-neutral-600">A visual mood board for the stops along the route.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {stops.map((stop) => (
              <article key={stop.name} className="overflow-hidden rounded-3xl bg-white shadow-lg transition-shadow hover:shadow-2xl">
                <img src={stop.image} alt={stop.name} className="h-64 w-full object-cover" />
                <div className="p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">{stop.mode}</p>
                  <h3 className="text-xl font-semibold">{stop.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{stop.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-neutral-950 p-8 text-white shadow-xl">
          <h2 className="mb-3 text-2xl font-semibold">Tour statistics</h2>
          <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div><div className="text-4xl font-bold">~20 km</div><div className="mt-1 text-neutral-300">Estimated walking</div></div>
            <div><div className="text-4xl font-bold">12</div><div className="mt-1 text-neutral-300">Route stops</div></div>
            <div><div className="text-4xl font-bold">2</div><div className="mt-1 text-neutral-300">Metro rides</div></div>
            <div><div className="text-4xl font-bold">1</div><div className="mt-1 text-neutral-300">Secret mission</div></div>
          </div>
        </section>
      </div>
    </main>
  );
}
