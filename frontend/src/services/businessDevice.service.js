import http from "../http-common";

class BusinessDeviceService {
  getAll() {
    return http.get("/businessDevices");
  }

  get(id) {
    return http.get(`/businessDevices/${id}`);
  }

  create(data) {
    // console.log(data)
    return http.post("/businessDevices", data);
  }

  update(id, data) {
    // alert(data.businessId)
    return http.put(`/businessDevices/${id}`, data);
  }

  deleteAll() {
    return http.delete(`/businessDevices`);
  }

  findByTitle(location_id) {
    return http.get(`/businessDevices?location_id=${location_id}`);
  }
}

export default new BusinessDeviceService();
