//API gửi thông báo đển người thân khi có sự cố xảy ra với người dùng
export function sendWarning() {
    const relativeId = '12345'; // ID của người thân

    fetch(`http://192.168.0.102:8000/warning/${relativeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'Warning: High temperature detected!',
        }),
    })
    .then(response => {
        if (!response.ok) {
            // log cụ thể hơn trước khi throw
            console.warn('Fetch response not ok:', response.status);
            return response.text().then(text => {
                throw new Error(`Server responded with status ${response.status}: ${text}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Warning sent successfully:', data);
    })
    .catch(error => {
        // tránh truy cập .stack trực tiếp
        console.error('Error sending warning:', error?.message ?? error);
        console.log('Full error object:', JSON.stringify(error, null, 2));
    });
}

//API cập nhật vị trí mới của patient lên server
export function updateLocation(location: any) {
    if(location === null) return;
    const patientId = '12345'; // ID của bệnh nhân

    fetch(`http://192.168.0.102:8000/updateLocation/${patientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            location: location,
        }),
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log('Location from sever', data.location);
    })
    .catch(error => {
        console.error('Error sending warning:', error?.message ?? error);
        console.log('Full error object:', JSON.stringify(error, null, 2));
    });
}

