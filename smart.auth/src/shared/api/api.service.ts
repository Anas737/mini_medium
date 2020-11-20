import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
    API_URL: string;

    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
    ) {
        this.API_URL = this.configService.get('API_URL');
    }

    get(route: string, query: any = null): Promise<any> {
        return this.toData(
            this.httpService.get(`${this.API_URL}/${route}`, { params: query }),
        );
    }

    post(route: string, body: any = null): Promise<any> {
        return this.toData(
            this.httpService.post(`${this.API_URL}/${route}`, body),
        );
    }

    put(route: string, body: any = null): Promise<any> {
        return this.toData(
            this.httpService.put(`${this.API_URL}/${route}`, body),
        );
    }

    delete(route: string): Promise<any> {
        return this.toData(this.httpService.delete(`${this.API_URL}/${route}`));
    }

    toData(req: Observable<any>) {
        return req.toPromise().then(resp => resp.data);
    }
}
