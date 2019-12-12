import { TestBed, async, inject } from '@angular/core/testing';

import { CadastroGuard } from './cadastro.guard';

describe('CadastroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CadastroGuard]
    });
  });

  it('should ...', inject([CadastroGuard], (guard: CadastroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
