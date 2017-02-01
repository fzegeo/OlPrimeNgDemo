import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { TreeNode } from 'primeng/primeng';

declare var ol: any;

@Injectable()
export class NodeService {

    constructor(private http: Http) {}

    getFiles(year: string) {
        console.log(`assets/layertree_${year}.json`);
        return this.http.get(`assets/layertree_${year}.json`)
                .toPromise()
                .then(res => <TreeNode[]> res.json().data)
                .then(data => { return data; });
    }

}
