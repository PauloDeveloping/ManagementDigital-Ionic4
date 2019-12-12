import { TestBed } from '@angular/core/testing';

import { CadastroFuncionarioService } from './cadastro-funcionario.service';

describe('CadastroFuncionarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroFuncionarioService = TestBed.get(CadastroFuncionarioService);
    expect(service).toBeTruthy();
  });
});
