

const FIELD_NAMES = ["Time", "Source_IP", "Source_Port", "Source_Country", "Source_Region", "Source_City", "Source_Latitude", "Source_Longitude", "Destination_IP", "Destination_Port", "HTTP_Method", "HTTP_Request_URI", "Status_Code", "Backend", "Frontend", "ID"]
const FIELD_DISPLAY_NAMES = ["Time", "Source IP", "Source Port", "Country", "State/Region", "City", "Latitude", "Longitude", "Destination IP", "Destination Port", "HTTP Method", "HTTP Request URI", "Status Code", "Backend", "Frontend", "ID"]
//const FIELD_NAMES = ["Time", "Source", "Destination", "HTTP_Method", "HTTP_Request_URI", "Status_Code", "Backend", "Frontend", "ID"]

async function fetchConfig(username, user_token) {
    return await fetch('/config', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": username, "token":user_token})
    }).then(res => res.json()).then(res => {return res})
}


function fetchAndLoadNewData(username, user_token, tableHandler) {
    fetch('/live', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"ref_id": tableHandler.getLatestRowID(), "username":username, "token":user_token})
    }).then(res => res.json()).then(res => {
        let new_data = res.data;
        for (let i = 0; i < new_data.length; i++) {
            let row = new Row();
            content = new_data[i];
            row.setID(content[content.length - 1]);
            for (let i = 0; i < content.length; i++) {
                row.addField(FIELD_NAMES[i], content[i]);
            }
            tableHandler.addRow(row);
        } 
        tableHandler.refreshTable();
    })
}

function BeginLiveListener(username, user_token, tableHandler) {
    fetchAndLoadNewData(username, user_token, tableHandler);
}
