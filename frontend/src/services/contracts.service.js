import http from "../http-common";

class contractsDataService {
    getAll() {
        return http.get("/contracts");
    }

    get(id) {
        return http.get(`/contracts/${id}`);
    }

    create(data) {
        console.log(data)
        return http.post("/contracts", data);
    }

    update(id, data) {
        return http.put(`/contracts/${id}`, data);
    }

    delete(id) {
        return http.delete(`/contracts/${id}`);
    }

    deleteAll() {
        return http.delete(`/contracts`);
    }

    findByName(name) {
        return http.get(`/contracts?name=${name}`);
    }
}

export default new contractsDataService();
