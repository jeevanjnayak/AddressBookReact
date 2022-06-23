import axios from "axios";

class BookService{
    baseUrl ="http://localhost:8075/person"

    addPerson(data) {
        return axios.post(`${this.baseUrl}/add`, data);
      }

    getAll() {
        return axios.get(`${this.baseUrl}/showall`);
      }

      getPersonById(personId) {
        return axios.get(`${this.baseUrl}/show/${personId}`);
      }

      editPerson(personId,data) {
        return axios.put(`${this.baseUrl}/edit/${personId}`, data);
      }

      deletePerson(personId) {
        return axios.delete(`${this.baseUrl}/delete/${personId}`);
      }
}

export default new BookService();