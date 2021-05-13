import http from "../http-common";

class BusinessDataService {
    getAll() {
        return http.get("/businesses");
    }

    get(id) {
        return http.get(`/businesses/${id}`);
    }

    create(data) {
        console.log(data)
        return http.post("/businesses", data);
    }

    update(id, data) {
        return http.put(`/businesses/${id}`, data);
    }

    delete(id) {
        return http.delete(`/businesses/${id}`);
    }

    deleteAll() {
        return http.delete(`/businesses`);
    }

    findByTitle(company_name) {
        return http.get(`/businesses?company_name=${company_name}`);
    }
}

export default new BusinessDataService();
