// --- DATA & STATE ---
        const initialItinerary = [
            // Original itinerary data remains unchanged
            { id: 'day1', date: "19 - 20 Septembrie", title: "Cluj-Napoca → Tallinn", description: "Pornim după masă din Cluj-Napoca. Pe 20 septembrie ajungem în Tallinn după-masă sau înspre seară.", type: 'route', origin: { name: 'Cluj-Napoca', coords: [46.7712, 23.6236] }, destination: { name: 'Tallinn', coords: [59.4370, 24.7536] } },
            { id: 'day2', date: "21 Septembrie", title: "Tallinn → Helsinki", description: "Din Tallinn luăm ferryboat înspre Helsinki. O scurtă călătorie pe Marea Baltică.", type: 'route', origin: { name: 'Tallinn', coords: [59.4370, 24.7536] }, destination: { name: 'Helsinki', coords: [60.1699, 24.9384] } },
            { id: 'day3', date: "22 Septembrie", title: "Helsinki → Rovaniemi", description: "Din Helsinki pornim spre nord pentru a ajunge seara la Rovaniemi, orașul lui Moș Crăciun.", type: 'route', origin: { name: 'Helsinki', coords: [60.1699, 24.9384] }, destination: { name: 'Rovaniemi', coords: [66.5039, 25.7294] } },
            { id: 'day4', date: "23 Septembrie", title: "Rovaniemi → Tromsø", description: "Continuăm călătoria spre nord, trecând granița în Norvegia, pentru a ajunge seara la Tromsø.", type: 'route', origin: { name: 'Rovaniemi', coords: [66.5039, 25.7294] }, destination: { name: 'Tromsø', coords: [69.6492, 18.9553] } },
            { id: 'day5', date: "24 Septembrie", title: "Explorare Tromsø", description: "Vizităm Tromsø și împrejurimile. Urcăm cu telecabina Fjellheisen pentru panorame spectaculoase.", type: 'location', location: { name: 'Tromsø', coords: [69.6492, 18.9553] } },
            // { id: 'day6', date: "25 Septembrie", title: "Tromsø → Sommarøy & Lofoten", description: "Excursie de o zi din Tromsø spre insula pitorească Sommarøy și explorăm porțiunea nordică a arhipelagului Lofoten.", type: 'route', origin: { name: 'Tromsø', coords: [69.6492, 18.9553] }, waypoints: [{ name: 'Sommarøy', coords: [69.6355, 18.0004] }, { name: 'Svolvær (Lofoten)', coords: [68.2339, 14.5631] }], destination: { name: 'Tromsø', coords: [69.6492, 18.9553] } },
            { id: 'day6a', date: "25 Septembrie", title: "Tromsø → Sommarøy", description: "Excursie de o zi din Tromsø spre insula pitorească Sommarøy.", type: 'route', origin: { name: 'Tromsø', coords: [69.6492, 18.9553] }, destination: { name: 'Sommarøy', coords: [69.6355, 18.0004] } },
            { id: 'day6b', date: "25 Septembrie", title: "Tromsø → Lofoten", description: "Excursie de o zi din Tromsø spre porțiunea nordică a arhipelagului Lofoten.", type: 'route', origin: { name: 'Tromsø', coords: [69.6492, 18.9553] }, destination: { name: 'Svolvær (Lofoten)', coords: [68.2339, 14.5631] } },
            { id: 'day7', date: "26 Septembrie", title: "Obiective lângă Tromsø", description: "Vizităm alte obiective din zona Tromsø, cum ar fi fiordurile din apropiere sau satele de pescari.", type: 'location', location: { name: 'Împrejurimi Tromsø', coords: [69.6492, 18.9553] } },
            { id: 'day8', date: "27 Septembrie", title: "Tromsø → Sud-Vestul Norvegiei (Sugestie)", description: "Pornim de dimineață din Tromsø. Destinația sugerată este <strong>Stavanger</strong>, un punct de plecare excelent pentru a explora fiorduri celebre precum Lysefjord (cu Preikestolen - Pulpit Rock).", type: 'route', origin: { name: 'Tromsø', coords: [69.6492, 18.9553] }, destination: { name: 'Stavanger', coords: [58.9700, 5.7331] } }
        ];
        let userAddedItinerary = [];
        let mainMap;

        // --- MAP ICONS ---
        const startIcon = L.divIcon({ html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-green-500"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clip-rule="evenodd" /></svg>`, className: 'leaflet-div-icon', iconSize: [32, 32], iconAnchor: [16, 32] });
        const endIcon = L.divIcon({ html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-red-500"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.75 4.5a.75.75 0 0 0-1.5 0v5.25H8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 .75-.75V6.75Z" clip-rule="evenodd" /></svg>`, className: 'leaflet-div-icon', iconSize: [32, 32], iconAnchor: [16, 32] });
        const waypointIcon = L.divIcon({ html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-blue-400"><path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 005.169-4.44c1.562-2.224 2.41-4.842 2.41-7.488C20 5.836 16.418 2.25 12 2.25S4 5.836 4 10.375c0 2.646.848 5.264 2.41 7.488a16.975 16.975 0 005.169 4.44zM12 13.5a3.125 3.125 0 100-6.25 3.125 3.125 0 000 6.25z" clip-rule="evenodd" /></svg>`, className: 'leaflet-div-icon', iconSize: [24, 24], iconAnchor: [12, 24] });

        // --- INITIALIZATION & RENDER ---
        document.addEventListener('DOMContentLoaded', () => {
            loadUserItinerary();
            initMainMap();
            renderItineraryList();
            setupEventListeners();
        });

        function renderAll() {
            renderItineraryList();
            initMainMap();
            setupAccordionListeners(); // Re-attach listeners for new elements
        }

        function renderItineraryList() {
            const listContainer = document.getElementById('itinerary-list');
            if (!listContainer) return;

            const fullItinerary = [...initialItinerary, ...userAddedItinerary];
            let content = '';
            fullItinerary.forEach(item => {
                const deleteButton = item.userAdded ? `<button class="delete-btn" data-id="${item.id}">Șterge</button>` : '';
                content += `
                    <div class="bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <div class="accordion-header p-4 cursor-pointer flex justify-between items-center hover:bg-gray-700 transition-colors duration-200" data-target="${item.id}-map-content">
                            <div>
                                <p class="text-sm text-gray-400">${item.date}</p>
                                <h3 class="text-xl font-semibold text-white">${item.title}</h3>
                            </div>
                            <div class="flex items-center space-x-4">
                                ${deleteButton}
                                <svg class="w-6 h-6 transform transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                        <div id="${item.id}-map-content" class="accordion-content px-4 pb-4">
                             <p class="text-gray-300 mb-4">${item.description || 'Fără descriere.'}</p>
                            <div id="${item.id}-map" class="map-container bg-gray-700" data-initialized="false"></div>
                        </div>
                    </div>
                `;
            });
            listContainer.innerHTML = content;
        }

        // --- LOCAL STORAGE ---
        function loadUserItinerary() {
            const saved = localStorage.getItem('userItinerary');
            if (saved) {
                userAddedItinerary = JSON.parse(saved);
            }
        }

        function saveUserItinerary() {
            localStorage.setItem('userItinerary', JSON.stringify(userAddedItinerary));
        }

        // --- MAP FUNCTIONS ---
        function initMainMap() {
            const mapContainer = document.getElementById('main-map-container');
            if (!mapContainer) return;
            if (mainMap) {
                mainMap.remove();
            }
            mainMap = L.map(mapContainer).setView([60, 20], 3);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            }).addTo(mainMap);

            const allPoints = [];
            const fullItinerary = [...initialItinerary, ...userAddedItinerary];
            fullItinerary.forEach(item => {
                if (item.type === 'route') {
                    const routePoints = [];
                    if (item.origin) { routePoints.push(item.origin.coords); allPoints.push(item.origin.coords); L.marker(item.origin.coords, {icon: startIcon}).addTo(mainMap).bindPopup(`<b>${item.origin.name}</b>`); }
                    if (item.waypoints) { item.waypoints.forEach(wp => { routePoints.push(wp.coords); allPoints.push(wp.coords); L.marker(wp.coords, {icon: waypointIcon}).addTo(mainMap).bindPopup(`<b>${wp.name}</b>`); }); }
                    if (item.destination) { routePoints.push(item.destination.coords); allPoints.push(item.destination.coords); L.marker(item.destination.coords, {icon: endIcon}).addTo(mainMap).bindPopup(`<b>${item.destination.name}</b>`); }
                    L.polyline(routePoints, { color: '#3b82f6', weight: 3, opacity: 0.7 }).addTo(mainMap);
                } else if (item.type === 'location') {
                    allPoints.push(item.location.coords);
                    L.marker(item.location.coords, {icon: waypointIcon}).addTo(mainMap).bindPopup(`<b>${item.location.name}</b>`);
                }
            });
            
            if (allPoints.length > 0) {
                mainMap.fitBounds(allPoints, { padding: [50, 50] });
            }
        }

        function initDailyMap(itemId) {
            const mapContainer = document.getElementById(`${itemId}-map`);
            const fullItinerary = [...initialItinerary, ...userAddedItinerary];
            const itemData = fullItinerary.find(d => d.id === itemId);

            if (!mapContainer || !itemData || mapContainer.dataset.initialized === 'true') return;

            const map = L.map(mapContainer);
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>' }).addTo(map);

            const bounds = [];
            if (itemData.type === 'route') {
                const routePoints = [];
                if(itemData.origin) { L.marker(itemData.origin.coords, {icon: startIcon}).addTo(map).bindPopup(itemData.origin.name); bounds.push(itemData.origin.coords); routePoints.push(itemData.origin.coords); }
                if(itemData.waypoints) { itemData.waypoints.forEach(wp => { L.marker(wp.coords, {icon: waypointIcon}).addTo(map).bindPopup(wp.name); bounds.push(wp.coords); routePoints.push(wp.coords); }); }
                if(itemData.destination) { L.marker(itemData.destination.coords, {icon: endIcon}).addTo(map).bindPopup(itemData.destination.name); bounds.push(itemData.destination.coords); routePoints.push(itemData.destination.coords); }
                L.polyline(routePoints, { color: '#3b82f6', weight: 4 }).addTo(map);
            } else if (itemData.type === 'location') {
                L.marker(itemData.location.coords, {icon: waypointIcon}).addTo(map).bindPopup(itemData.location.name);
                bounds.push(itemData.location.coords);
            }

            if (bounds.length > 1) { map.fitBounds(bounds, { padding: [40, 40] }); } 
            else if (bounds.length === 1) { map.setView(bounds[0], 10); }

            mapContainer.dataset.initialized = 'true';
            setTimeout(() => map.invalidateSize(), 10);
        }

        // --- EVENT LISTENERS & ACTIONS ---
        function setupEventListeners() {
            document.getElementById('add-day-form').addEventListener('submit', handleAddDay);
            document.getElementById('itinerary-list').addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-btn')) {
                    handleDeleteDay(e.target.dataset.id);
                }
            });
            setupAccordionListeners();
        }

        function setupAccordionListeners() {
            document.querySelectorAll('.accordion-header').forEach(header => {
                header.addEventListener('click', (e) => {
                    // Prevent accordion toggle when clicking the delete button
                    if (e.target.classList.contains('delete-btn')) return;

                    const content = document.getElementById(header.dataset.target);
                    const icon = header.querySelector('svg:not(.delete-icon)'); // Ensure we don't select a delete icon
                    
                    if (content.classList.contains('expanded')) {
                        content.classList.remove('expanded');
                        if(icon) icon.classList.remove('rotate-180');
                    } else {
                        document.querySelectorAll('.accordion-content.expanded').forEach(openContent => {
                            openContent.classList.remove('expanded');
                            const otherIcon = openContent.previousElementSibling.querySelector('svg:not(.delete-icon)');
                            if(otherIcon) otherIcon.classList.remove('rotate-180');
                        });
                        content.classList.add('expanded');
                        if(icon) icon.classList.add('rotate-180');
                        initDailyMap(content.id.replace('-map-content', ''));
                    }
                });
            });
        }

        async function handleAddDay(event) {
            event.preventDefault();
            const btn = document.getElementById('add-day-btn');
            const errorP = document.getElementById('form-error');
            btn.disabled = true;
            btn.textContent = 'Se adaugă...';
            errorP.textContent = '';

            const originName = document.getElementById('new-origin').value.trim();
            const destName = document.getElementById('new-destination').value.trim();
            const date = document.getElementById('new-date').value.trim();
            const description = document.getElementById('new-description').value.trim();

            if (!originName || !destName || !date) {
                errorP.textContent = 'Data, plecarea și destinația sunt obligatorii.';
                btn.disabled = false;
                btn.textContent = 'Adaugă Rută';
                return;
            }

            try {
                const originCoords = await getCoords(originName);
                if (!originCoords) throw new Error(`Orașul "${originName}" nu a fost găsit.`);
                
                const destCoords = await getCoords(destName);
                if (!destCoords) throw new Error(`Orașul "${destName}" nu a fost găsit.`);

                const newItem = {
                    id: `user-day-${Date.now()}`,
                    date: date,
                    title: `${originName} → ${destName}`,
                    description: description,
                    type: 'route',
                    origin: { name: originName, coords: [originCoords.lat, originCoords.lon] },
                    destination: { name: destName, coords: [destCoords.lat, destCoords.lon] },
                    userAdded: true
                };

                userAddedItinerary.push(newItem);
                saveUserItinerary();
                renderAll();
                document.getElementById('add-day-form').reset();

            } catch (error) {
                errorP.textContent = error.message;
            } finally {
                btn.disabled = false;
                btn.textContent = 'Adaugă Rută';
            }
        }

        function handleDeleteDay(idToDelete) {
            userAddedItinerary = userAddedItinerary.filter(item => item.id !== idToDelete);
            saveUserItinerary();
            renderAll();
        }

        // --- API & HELPERS ---
        async function getCoords(cityName) {
            const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                if (data && data.length > 0) {
                    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
                }
                return null;
            } catch (error) {
                console.error("Geocoding error:", error);
                return null;
            }
        }