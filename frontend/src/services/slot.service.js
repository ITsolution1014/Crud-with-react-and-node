import http from "../http-common";

class SlotService {
    getAll() {
        return http.get("/slot");
    }

    get(id) {
        return http.get(`/slot/${id}`);
    }

    create(data) {
        return http.post("/slot", data);
    }

    findSlots(data) {
        return http.post("/slot/findSlots", data)
    }

    update(id, data) {
        return http.put("/slot", data);
    }

    delete(id) {
        return http.delete(`/slot/${id}`);
    }

    deleteAll() {
        return http.delete(`/slot`);
    }

    findByTitle(name) {
        return http.get(`/slot?name=${name}`);
    }
}

export default new SlotService();
