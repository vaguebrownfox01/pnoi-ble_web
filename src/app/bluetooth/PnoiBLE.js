const {
	BLE_SERVICE_UUID,
	BLE_DEV_NAME,
	BLE_CHAR_LED_WRITE_UUID,
} = require("./config");

class PnoiPhoneBLE {
	constructor(callback) {
		this.device = null;
		this.onDisconnected = this.onDisconnected.bind(this);
		this.onDisconnectCallback = callback;
	}

	request() {
		let options = {
			filters: [
				{
					name: BLE_DEV_NAME,
					services: [BLE_SERVICE_UUID],
				},
			],
		};
		return navigator.bluetooth.requestDevice(options).then((device) => {
			this.device = device;
			this.device.addEventListener(
				"gattserverdisconnected",
				this.onDisconnected
			);
			return this.device;
		});
	}

	writeLed(data) {
		const byteArray = new TextEncoder().encode(data);
		const buffer = byteArray.buffer;
		return this.device.gatt
			.getPrimaryService(BLE_SERVICE_UUID)
			.then((service) =>
				service.getCharacteristic(BLE_CHAR_LED_WRITE_UUID)
			)
			.then((characteristic) => characteristic.writeValue(buffer));
	}

	connect() {
		if (!this.device) {
			return Promise.reject("Device is not connected.");
		}
		return this.device.gatt.connect();
	}
	disconnect() {
		if (!this.device) {
			return Promise.reject("Device is not connected.");
		}
		return this.device.gatt.disconnect();
	}

	onDisconnected() {
		this.device = null;
		console.log("Device is disconnected.");
		this.onDisconnectCallback();
	}
}

module.exports.PnoiPhoneBLE = PnoiPhoneBLE;
