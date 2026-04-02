const fs = require('fs');
const path = require('path');

const runtimeDataPath = path.join(__dirname, '../user_data.json');

/**
 * Ensure runtime file exists
 */
function ensureRuntimeFile() {
    if (!fs.existsSync(runtimeDataPath)) {
        fs.writeFileSync(runtimeDataPath, JSON.stringify({}, null, 2));
    }
}

/**
 * Write vendor organization name into runtimeData.json
 * @param {string} vendorName
 */
function writeVendorOrganization(vendorName) {
    ensureRuntimeFile();
    const data = JSON.parse(fs.readFileSync(runtimeDataPath, 'utf-8'));

    data.vendor_name = vendorName;

    fs.writeFileSync(runtimeDataPath, JSON.stringify(data, null, 2));
    console.log(`Vendor organization saved to runtimeData.json: ${vendorName}`);
}

/**
 * Read vendor organization name
 */
function readVendorOrganization() {
    if (!fs.existsSync(runtimeDataPath)) return null;
    const data = JSON.parse(fs.readFileSync(runtimeDataPath, 'utf-8'));
    return data.vendor_name;
}

module.exports = {
    writeVendorOrganization,
    readVendorOrganization
};