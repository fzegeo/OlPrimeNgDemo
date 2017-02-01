/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NodeTemplateService } from './node-template.service';

describe('NodeTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NodeTemplateService]
    });
  });

  it('should ...', inject([NodeTemplateService], (service: NodeTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
