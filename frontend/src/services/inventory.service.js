import http from "../http-common";

class InventoryDataService {
    getAll() {
        return http.get("/inventory");
    }

    get(id) {
        return http.get(`/inventory/${id}`);
    }

    create(data) {
        return http.post("/inventory", data);
    }

    update(id, data) {
        return http.put(`/inventory/${id}`, data);
    }

    delete(id) {
        return http.delete(`/inventory/${id}`);
    }

    deleteAll() {
        return http.delete(`/inventory`);
    }

    findByTitle(device_type) {
        return http.get(`/inventory?device_type=${device_type}`);
    }
}

export default new InventoryDataService();
