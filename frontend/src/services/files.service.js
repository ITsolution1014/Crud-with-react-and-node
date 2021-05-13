import http from "../http-common";

class filesDataService {
    getAll() {
        return http.get("/files");
    }

    get(id) {
        return http.get(`/files/${id}`);
    }

    create(data) {
        console.log(data)
        return http.post("/files", data);
    }

    update(id, data) {
        return http.put(`/files/${id}`, data);
    }

    delete(id) {
        return http.delete(`/files/${id}`);
    }

    deleteAll() {
        return http.delete(`/files`);
    }

    findByName(title) {
        return http.get(`/files?title=${title}`);
    }
}

export default new filesDataService();
