import {Repository} from "./Repository";

export class DocumentationRepository extends Repository {
    fetchOpenApiSpecs(): Promise<JSON> {
        return new Promise<JSON>(((resolve, reject) => {
            this
                .get<JSON>('/api/doc.json')
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                })
        }))
    }
}
