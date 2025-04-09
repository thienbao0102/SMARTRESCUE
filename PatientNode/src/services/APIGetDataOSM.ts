
const fetchNearbyHospitalsOSM = async (latitude, longitude) => {
    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:5000, ${latitude}, ${longitude});
        way["amenity"="hospital"](around:5000, ${latitude}, ${longitude});
        relation["amenity"="hospital"](around:5000, ${latitude}, ${longitude});
      );
      out center;
    `;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.elements.map(el => ({
            name: el.tags.name || 'Bệnh viện không có tên',
            lat: el.lat || el.center?.lat,
            lon: el.lon || el.center?.lon,
        }));
    } catch (error) {
        console.error('Lỗi lấy danh sách bệnh viện từ OSM:', error);
        return [];
    }
};

module.exports ={fetchNearbyHospitalsOSM};